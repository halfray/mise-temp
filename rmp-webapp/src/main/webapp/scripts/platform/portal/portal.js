var MIN_COLUMN_WIDTH = 0.33;
var MAX_COLUMN_WIDTH = 1;

var MIN_STYLE = 'padding:10px 0 10px 10px';
var MAX_STYLE = 'padding:10px 25px 10px 10px';

Ext.ns("Ext.home.ContentPanel");

Ext.home.ContentPanel = {

	create : function() {

		var originHeight = 200;
		var changeHeight = 491;

		function setColumnWidth(panel, cw) {
			var container = panel.findParentByType('portal');
            container.items.each(function(item, index, length) {
				item.columnWidth = cw;
			});
			contentArea.render();
		}
	
	    var tools = [{
            id: 'minimize',
            handler: function(e, target, panel){
	    		var container = Ext.getCmp('portal-panel');
	            container.items.each(function(item, index, length) {
					item.columnWidth = MIN_COLUMN_WIDTH;
					item.items.each(function(item, index, length) {
						item.setHeight(originHeight);
					});
				});
				contentArea.render();
            }
        },{
            id: 'maximize',
            handler: function(e, target, panel){
				var container = Ext.getCmp('portal-panel');
	            container.items.each(function(item, index, length) {
					item.columnWidth = MAX_COLUMN_WIDTH;
					item.items.each(function(item, index, length) {
						item.setHeight(changeHeight);
					});
				});
				contentArea.render();
            }
        },{
	        id:'refresh',
	        handler: function(e, target, panel){
	            var frameId = 'content' + panel.getId();
                $(frameId).src = $(frameId).src;
        	}
	    }];
	
		var HtmlCreator = {
			create : function(id, href) {
				return '<iframe id=\'content' + id + '\' scrolling="auto" width="100%" height="100%" src=' + href + '></iframe>';		
			}
		}
	
		var contentArea = new Ext.Viewport({
	        layout:'fit',
	        defaults: {bodyStyle: 'background-color: #dfe8f6'},
	        items:[{
		        id: 'portal-panel',
	            border: false,
	            xtype:'portal',
	            region:'center'
	        }]
	    });

		var portalPanel = Ext.getCmp('portal-panel');

		var a = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '3',
                title: '参数信息',
                tools: tools,
                html: HtmlCreator.create('3', 'baseRecordList.do?bean=scParmInfo')
            }]
        });

		var b = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '4',
                title: '参数类型',
                tools: tools,
                html: HtmlCreator.create('4', 'baseRecordList.do?bean=scParmType')
            }]
        });

		var c = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '1',
                title: 'Dashboards demo',
                tools: tools,
                html: HtmlCreator.create('1', 'chart.do?viewName=simpleDashboards2DChart')
            }]
        });

		var d = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '2',
                title: '状态查看',
                tools: tools,
                html: HtmlCreator.create('2', 'authUserGroupList.do')
            }]
    	});

		var e = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '5',
                title: '状态查看',
                tools: tools,
                html: HtmlCreator.create('5', 'authUserGroupList.do')
            }]
    	});

		var f = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '6',
                title: '状态查看',
                tools: tools,
                height: 300,
                html: HtmlCreator.create('6', 'authUserGroupList.do')
            }]
    	});

		var g = new Ext.ux.PortalColumn({
            columnWidth: .33,
            style: MAX_STYLE,
            items:[{
                id: '7',
                title: '状态查看',
                tools: tools,
                html: HtmlCreator.create('7', 'authUserGroupList.do')
            }]
    	});
		
		portalPanel.items.add(a);
		portalPanel.items.add(b);
		portalPanel.items.add(c);
		portalPanel.items.add(d);
		portalPanel.items.add(e);
		portalPanel.items.add(f);
		portalPanel.items.add(g);
		
		// AssembleRobot.assemble(portalPanel.items);
		
		portalPanel.doLayout(true);

    }
}