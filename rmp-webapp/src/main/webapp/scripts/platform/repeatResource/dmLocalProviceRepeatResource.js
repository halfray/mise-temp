/**
 * 省内资源重复情况的列表
 */
base.portal.dmLocalProviceRepeatResource = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '网站名称',
			width : 150,
			sortable : true,
			dataIndex : 'webSite_Name',
			hidden : false,
			hideable : false
		}, {
			header : 'Cache数量',
			width : 100,
			sortable : true,
			dataIndex : 'cache_num',
			hidden : false,
			hideable : false
		}, {
			header : 'IDC数量',
			width : 100,
			sortable : true,
			dataIndex : 'idc_num',
			hidden : false,
			hideable : false
		}, {
			header : 'Cache与IDC重复数量',
			width : 130,
			sortable : true,
			dataIndex : 'cache_idc_repeat_num',
			hidden : false,
			hideable : false
		}/*, {
			header : '总流量',
			width : 100,
			sortable : true,
			dataIndex : 'all_Flow',
			hidden : false,
			hideable : false
		}, {
			header : '上行流量',
			width : 100,
			sortable : true,
			dataIndex : 'upload_Flow',
			hidden : false,
			hideable : false
		}, {
			header : '下行流量',
			width : 100,
			sortable : true,
			dataIndex : 'download_Flow',
			hidden : false,
			hideable : false
		}, {
			header : '请求次数',
			width : 100,
			sortable : true,
			dataIndex : 'req_num',
			hidden : false,
			hideable : false
		}*/, {
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
			dataMethod:'dmLocalProviceRepeatResourceAction.getListForGrid',
			columns:gridColumns,
			height:555,
			fetchSize:20,
			frame : false,
			border: false,
			//bodyBorder: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData:false,
	    	listeners : {
				rowclick : Main.fun.Fun(self, self.onRowClick)
			}
		});
	},
	onRowClick : function(event) {
		var grid = this.grid;
		var record = grid.getSelectionModel().getSelected();
		this.data.ID = record.data.ID;
		this.data.province = record.data.province;
		this.data.webSite_Id = record.data.webSite_Id;
		this.run();
		this.notice(this.data);
	},
	getGridData : function() {
		var self = this;
		var data = this.data;
		if (Ext.isEmpty(data.province))
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