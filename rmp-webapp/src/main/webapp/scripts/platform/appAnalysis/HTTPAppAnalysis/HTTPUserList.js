base.portal.HTTPUserList = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '应用类型',
			width : 150,
			sortable : true,
			dataIndex : 'appName'
		}, {
			header : '月均值',
			width : 150,
			sortable : true,
			dataIndex : 'monthlyMean'
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
				return value*100+'%';
			}
		}];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getAppDetailGrid',
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
		data.protocolType = 'HTTP';
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