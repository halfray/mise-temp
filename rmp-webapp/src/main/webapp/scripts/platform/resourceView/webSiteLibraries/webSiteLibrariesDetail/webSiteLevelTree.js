function openTab(webSite_Id,name){
	var data = {};
	data.webSiteId = webSite_Id;
	data.webSite = name;
	var conf = {
			href : 'portalAssemble.do?portalCode=dmProvinceUnintroduceHotdomainAnalysis&uxParams='+ encodeURI(Ext.encode(data)),
			text:  '各省未引入热点域名分析',
			icon: '',
			tipinfo: ''
		};
	   Main.fun.openWin(conf, 'tab');
}
base.portal.webSiteLevelTree = Ext.extend(Main.portal.PortalPage, {
	 getParams : function() {
		return this.params;
	 },
     init : function(params) {
		var self = this;
	
		function getFormatTpl(value) {
			return new Ext.XTemplate('{'+value+':this.formatlocalRequestCount}', {
		                formatlocalRequestCount: function(v) {
		                return (v*100).toFixed(2) + "%";
		                }
		            });
		}
		
		function getIntroduceSuggest(value) {
			return new Ext.XTemplate('{'+value+':this.introduceSuggest}', {
					introduceSuggest: function(v, record) {
						  var websitename = record.name;
						  return ['<a href="#" onclick="openTab('+record.webSite_Id+',\''+websitename+'\');"><span style="color:blue;">', v , '</span></a>&nbsp;'].join('')
		                }
		            });
		}
		
		var webLevelColumns = [{
			header : "网站",
			dataIndex : "name",
			width : 180,
			tpl:changeColor('name')
		},{
			header : "域名总计",
			dataIndex : "domainResourceTotal",
			width : 180
		}, {
			header : "域名网内数量",
			dataIndex : "domainInCount",
			width : 180
		}, {
			header : "域名网内占比",
			dataIndex : "domainInProportion",
			tpl:getFormatTpl('domainInProportion'),
			width : 180
		}, {
			header : "URL总计",
			hidden : true,
			dataIndex : "urlCount",
			width : 150
		}, {
			header : "URL网内数量",
			hidden : true,
			dataIndex : "urlInCount",
			width : 150
		}, {
			header : "URL网内占比",
			hidden : true,
			dataIndex : "urlInProportion",
			tpl:getFormatTpl('urlInProportion'),
			width : 150
		}, /*{
			header : "请求次数总计",
			dataIndex : "visitTotal",
			width : 110
		},*//* {
			header : "本网请求次数",
			dataIndex : "visitCount",
			width : 110
		}, *//*{
			header : "本网请求次数占比",
			dataIndex : "visitProportion",
			tpl:getFormatTpl('visitProportion'),
			width : 110
		},*/ {
			header : "更新日期",
			dataIndex : "updateDate",
			hidden:true,
			width : 150
		}, {
			header : "引入建议",
			dataIndex : "introduceSuggest",
			width : 180,
			tpl:getIntroduceSuggest('introduceSuggest','webSite_Id')
		}, {
			header : "type",
			dataIndex : "type",
			hidden:true,
			width : 80
		}, {
			header : "网站ID",
			dataIndex : "webSite_Id",
			hidden:true,
			width : 80
		}];
		this.webLevelRoot = new Ext.tree.AsyncTreeNode({
					id : '0',
					text : '根节点',
					attribute:{type:0},
					draggable : false,
					expanded : true
				});
		// 创建动态加载树
		this.webLevelTreeLoader = new Ext.tree.TreeLoader({
			    	dataUrl :M.rpc.path
				});
		this.webLevelTreeLoader.on("beforeload", function(treeLoader, node) {
				    var data = self.getParams();
				    if(!Ext.isDefined(data)){
				    	return false;
				    }
				    if(!Ext.isDefined(data.webSiteId)){
				    	return false;
				    }
					treeLoader.baseParams.method = "'dmNetsiteLibrariesDetailAction.getListForWebLevelTree'";
					treeLoader.baseParams.result = "'direct'";
					var params = {};
					params.javaClass = "java.util.HashMap";
					params.map = {};
					Ext.apply(params.map,data);
					params.map.province = '000000';
					params.map.type = node.attributes.type;
					params.map.value = node.attributes.value;
					treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
				}, this.webLevelTreeLoader);
		
		this.webLevelTree = new Ext.ux.tree.TreeGrid({
					width : 990,
					height : 400,
					autoLoad :false,
					rootVisible: false,
					frame:false,
					loader : this.webLevelTreeLoader,
					border : false,
					enableSort : false,
					root : this.webLevelRoot,
					columns : webLevelColumns,
					colspan : 8
				});		
		
		//修改树形节点字体颜色2013-11-28
		function changeColor(value)
		{
			return new Ext.XTemplate('{'+value+':this.changeColor}', {
		                changeColor: function(v) {
		                	return '<span style="color:#434343;">' + v + '</span>';
		                }
		            });
		}
    },		
	render : function(div) {
		var obj = (Ext.getDom(div));
		this.webLevelTree.width = obj.offsetWidth;
		this.webLevelTree.height = obj.offsetHeight;
		this.webLevelTree.render(div);
	},
	refresh : function(data) {
		this.params = data;
		this.webLevelTreeLoader.load(this.webLevelRoot);
	}						       
});