base.portal.P2PFlowUserList = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '用户类型',
			width : 150,
			sortable : true,
			dataIndex : 'userTypeName'
		}, {
			header : '月均值',
			width : 150,
			sortable : true,
			dataIndex : 'monthlyMean',
			renderer:function(value){
				return value.toFixed(2);
			}
		}, {
			header : '上行日均值',
			width : 150,
			sortable : true,
			dataIndex : 'upDailyAvg'
		}, {
			header : '下行日均值',
			width : 150,
			sortable : true,
			dataIndex : 'downDailyAvg'
		}, {
			header : '总流量占比',
			width : 150,
			sortable : true,
			dataIndex : 'flowTotalPro',
			renderer:function(value){
				return (value * 100).toFixed(2) + "%";
			}
		}];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getUserTypeDetailGrid',
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