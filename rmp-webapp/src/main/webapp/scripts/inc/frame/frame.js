Ext.onReady(function() {
	
			Ext.QuickTips.init();
	
			//初始化各展示组件
			Main.frame.centerPanel = new Frame.MainPanel();
			Main.frame.leftPanel = new Frame.getLeftPanel();
			Main.frame.topPanel = new Frame.getTopPanel();
			Main.frame.bottomPanel = new Frame.getBottomPanel();
			
			var centerShowPanel= new Ext.Panel({
		    	layout: 'fit',
		        region: 'center',
		        deferredRender: false,
		        border: false,
		        style:'padding:2px 0px 3px 0px',
		        activeTab:0,
		        items:[Main.frame.centerPanel]
		    });
			//定义展示主框架
			var viewport = new Ext.Viewport({
						layout : 'border',
						items : [Main.frame.topPanel,Main.frame.leftPanel, centerShowPanel]
					});

			// 获取当前用户
					
			//获取当期页面高度
			Main.cts.Height = Main.frame.centerPanel.getInnerHeight() - 20;
			
			//加载首页
//			Main.frame.centerPanel.loadPage({href:'portalAssemble.do?portalCode=monitorBoard',text:'监控面板',closable:false,iconCls:'welcome-tab-icon'});
		})