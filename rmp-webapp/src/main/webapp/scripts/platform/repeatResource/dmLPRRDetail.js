/**
 * 省内资源重复情况的详细列表
 */
base.portal.dmLPRRDetail = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '域名',
			width : 300,
			sortable : true,
			dataIndex : 'domain',
			hidden : false,
			hideable : false
		}, {
			header : '省份',
			width : 130,
			sortable : true,
			dataIndex : 'province',
			hidden : true,
			hideable : false
		}, {
			header : '网站ID',
			width : 130,
			sortable : true,
			dataIndex : 'webSite_Id',
			hidden : true,
			hideable : false
		}, {
			header : 'ID',
			width : 130,
			sortable : true,
			dataIndex : 'ID',
			hidden : true,
			hideable : false
		}];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmLocalProviceRepeatResourceAction.getListForDetailGrid',
			columns:gridColumns,
			height:255,
			frame : false,
			border: false,
			//bodyBorder: false,
			fetchSize:10,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData:false
		});
	},
	getGridData : function() {
		var self = this;
		var data = this.data;
		
		if (Ext.isEmpty(data.webSite_Id))
			return;
		this.grid.setParams(data);
		this.grid.doSearchList();
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		this.data = data;
		this.getGridData();
	}
});