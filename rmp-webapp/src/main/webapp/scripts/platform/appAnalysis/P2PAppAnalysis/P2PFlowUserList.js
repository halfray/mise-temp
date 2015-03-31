base.portal.P2PFlowUserList = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '协议',
			width : 150,
			sortable : true,
			dataIndex : 'protocolType'
		}, {
			header : '占比',
			width : 150,
			sortable : true,
			dataIndex : 'flowRate'
		}, {
			header : '流量',
			width : 150,
			sortable : true,
			dataIndex : 'singleFlowSize'
		}, {
			header : '增长减少占比',
			width : 150,
			sortable : true,
			dataIndex : 'growthReductionFlowRate'
		}, {
			header : '增长减少流量',
			width : 150,
			sortable : true,
			dataIndex : 'growthReductionFlow'
		}];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'p2PAppAnalysisAction.getP2PAppAnalysisDetailGrid',
			columns:gridColumns,
			height:345,
			fetchSize:20,
			frame : false,
			border: false,
			//bodyBorder: false,
			showPagingBar : false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true
		});
	},
	getGridData : function(data) {
		data.businessDate = data.bizDate;
		data.protocolType = 'P2P';
		this.grid.setParams(data);
		this.grid.doSearchList();
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		this.getGridData(data);
	}
});