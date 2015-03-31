Ext.app.TabCloseMenu = function() {
	var tabs, menu, ctxItem;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	}
	function onContextMenu(ts, item, e) {
		tabs.activate(item);
		if (!menu) {
			menu = new Ext.menu.Menu([{
						id : tabs.id + '-close',
						text : '关闭当前页',
						handler : function() {
							tabs.remove(ctxItem);
						}
					}, {
						id : tabs.id + '-close-others',
						text : '关闭其他页',
						handler : function() {
							tabs.items.each(function(item) {
										if (item.closable && item != ctxItem) {
											tabs.remove(item);
										}
									});
						}
					}, {
						id : tabs.id + '-close-all',
						text : '关闭所有',
						handler : function() {
							tabs.items.each(function(item) {
										if (item.closable) {
											tabs.remove(item);
										}
									});
						}
					}, {
						id : tabs.id + '-refresh',
						text : '刷新',
						handler : function() {
							Frame.MainPanel.TabRefresh(ctxItem);
						}
					}, '-', {
						id : 'maximize-mainpanel',
						text : '最大化窗口',
						handler : function() {
							if (!Ext.getCmp('mainLeftPanel').collapsed)
								Ext.getCmp('mainLeftPanel').collapse(true);
						}
					}, {
						id : 'restore-mainpanel',
						text : '复原窗口',
						handler : function() {
							if (Ext.getCmp('mainLeftPanel').collapsed)
								Ext.getCmp('mainLeftPanel').expand(true);
						}
					}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each(function() {
					if (this != item && this.closable) {
						disableOthers = false;
						return false;
					}
				});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		menu.showAt(e.getPoint());
	}
};
var scrollerMenu = new Ext.ux.TabScrollerMenu({
			maxText : 15,
			pageSize : 5
		});
Frame.MainPanel = function() {
	Frame.MainPanel.superclass.constructor.call(this, {
				id : "main.frame.centerPanel",
				autoScroll : true,
				margins : '0 5 1 0',
				resizeTabs : true,
				enableTabScroll : true,
				activeTab : 0,
				plugins : [scrollerMenu,new Ext.app.TabCloseMenu()],
		        minTabWidth: 115,
		        tabWidth: 145,
				autoWidth: true,
				bodyBorder: false,
		        defaults: {autoScroll:true},
				region : 'center'
			});
};
/**
 * item - 被刷新的tab
 */
Frame.MainPanel.TabRefresh = function(item) {
	
	var activeTab=Ext.getCmp('main.frame.centerPanel').getActiveTab();
	
	var tmpId=activeTab.id;
	var tmpTitle=activeTab.title;
	var tmpTabTip=activeTab.tabTip;
	var tmpIconCls=activeTab.iconCls;
	
	var tmpConf = {
			href : tmpId,
			text:  tmpTitle,
			icon: tmpIconCls ,
			tipinfo: tmpTabTip	
		};
	
	Main.frame.centerPanel.remove(item);
	Main.frame.centerPanel.loadPage(tmpConf);
}
Ext.extend(Frame.MainPanel, Ext.TabPanel, {
	/**
	 * conf - 配置信息
	 * href = 链接 nid = id 唯一标识 text = 标题 iconCls = 图标 tipinfo = 提示信息 closable =是否可关闭
	 * 是否可关闭
	 */
	loadPage : function(conf) {
		var href = Ext.isEmpty(conf.href)?"":conf.href;
		var text = Ext.isEmpty(conf.text)?"":conf.text;
		var iconCls = Ext.isEmpty(conf.iconCls)?"":conf.iconCls;
		var tipinfo = Ext.isEmpty(conf.tipinfo)?"":conf.tipinfo;
		var closable = Ext.isEmpty(conf.closable)?true:conf.closable;
		
		var self = this;

		if (closable == undefined)
			closable = true;
		var id = 'tab-' + conf.href;
		var tab = this.getComponent(id);
		if (!tab) {
			// 第一种格式 : frame-url 创建frame 进行加载
			if ('iframe' == conf.href.split('-')[0] || conf.href.indexOf('.do') > -1) {
				this.addIframeUrl(conf.href, text,iconCls, tipinfo, closable);
			}
			// 第二种格式: *.jsp 直接加载jsp信息
			else if (href.indexOf('.jsp') > -1) {
				this.addJspUrl(href, text,iconCls, tipinfo, closable);
			}
			// 第三种格式 *.html 直接加载信息
			else if (href.indexOf('.html') > -1) {
				this.addHTMLUrl(href,text);
			}
			// 第四种格式 *.js 加载js文件,利用与文件名相同的函数名来进行调用
			else {
				if (href.indexOf('?') > -1) {
					var params = {};
					var paramsValue = href.substr(href.indexOf('?') + 1);
					href = href.substr(0, href.indexOf('?'));
					if (paramsValue) {
						ar = paramsValue.split("&");
						for (var i = 0; i < ar.length; i++) {
							var va = ar[i].split('=');
							params[va[0]] = va[1];
						}
					}
				}
				this.addJsUrl(href, params, text,iconCls, tipinfo, closable);
			}
		} else {
			this.remove(tab);
			this.loadPage(conf);
		}
	},
	addJspUrl : function(href, text, iconCls,tipinfo, closable) {
		var tab = this.getComponent('tab-' + href);
		if (!tab) {
			var params = {};
			if (href.indexOf('?') > -1) {
				var paramsValue = href.substr(href.indexOf('?') + 1);
				href = href.substr(0, href.indexOf('?'));
				if (paramsValue) {
					ar = paramsValue.split("&");
					for (var i = 0; i < ar.length; i++) {
						var va = ar[i].split('=');
						params[va[0]] = va[1];
					}
				}
			}
			params.subMainId = href;
			tab = new Ext.Panel({
						id : href,
						title : text,
						tabTip : tipinfo,
						iconCls:iconCls,
						border : false,
						autoScroll : true,
						autoLoad : {
							url : Main.contextPath + href,
							scripts : true,
							nocache : true,
							params : params
						},
						closable : closable
					});
			this.add(tab);
			this.setActiveTab(tab);
		} else {
			this.remove(tab);
			this.addJspUrl(href, text, iconCls,tipinfo, closable);
		}
	},
	addIframeUrl : function(href, text, iconCls,tipinfo, closable) {
		var tab = this.getComponent('tab-' + href);
		if (!tab) {
			tab = new Ext.Panel({
				id : href,
				title : text,
				tabTip : tipinfo,
				iconCls:iconCls,
				border : false,
				layout : 'fit',
				html : '<iframe name='
						+ href
						+ ' scrolling="auto" marginwidth="0" hspace="0" frameborder="0" width="100%" height="100%" src="'
						+ Main.contextPath
						+ (href.indexOf("/") > 0 || href.indexOf("/") == -1
								? "/"
								: "")
						+ (!(new RegExp("^" + "iframe-").test(href)) ? href : href
								.split('-')[1]) + '"></iframe>',
				closable : closable
			});
			this.add(tab).show();
		} else {
			this.remove(tab);
			this.addIframeUrl(href, text,iconCls, tipinfo, closable);
		}
	},
	addJsUrl : function(href, params, text, iconCls,tipinfo, closable) {
		var tab = this.getComponent('tab-' + href);
		if (!tab) {
			Main.fun.showLoadProcessWait();
			var self = this;
			var loader = new Main.frame.PageLoader(href, params);
			loader.success = function() {
				var tab = new Ext.Panel({
							id : href,
							title : text,
							tabTip : tipinfo,
							iconCls:iconCls,
							border : false,
							autoScroll : true,
							closable : closable,
							items : [loader.getPanel()],
							listeners : {
								close : function() {
									loader.destory();
								}
							}
						});
				self.add(tab);
				self.setActiveTab(tab);
				loader.run();
				Main.fun.closeLoadProcessWait();
			}
			loader.load();
		} else {
			this.remove(tab);
			this.addJsUrl(href, params, text, iconCls,tipinfo, closable);
		}
	},
	addHTMLUrl : function(href,text) {
		var tab = this.getComponent('tab-' + href);
		if (!tab) {
			var self = this;
			var tab = new Ext.Panel({
						id : href,
						title : text,
						border : false,
						autoScroll : true,
						closable : true,
						html:'<iframe src='+href+' width=100% height=100%></iframe>'
					});
			self.add(tab);
			self.setActiveTab(tab);
			setTimeout('Ext.Viewport.setMasked(false)',1000);
		} else {
			this.remove(tab);
			this.addHTMLUrl(href,text);
		}
	},
	/**
	 * 动态添加对象到centerPanel
	 * 
	 * @param {}
	 *            obj
	 */
	setCenterPanelItem : function(obj) {
		this.getActiveTab().add(obj);
		this.doLayout();
	},
	// getRootCallBack
	closeActiveTab : function() {
		Ext.getCmp('centerPanel').remove(Ext.getCmp('centerPanel')
				.getActiveTab());
	}

});
