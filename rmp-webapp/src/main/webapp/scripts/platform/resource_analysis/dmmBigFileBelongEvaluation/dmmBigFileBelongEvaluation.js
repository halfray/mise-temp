/**
 * 大文件归属评估-热点大文件列表
 */
base.portal.dmmBigFileBelongEvaluation = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var gridColumns = [ new Ext.grid.RowNumberer(), {
			header: 'URL',
			width: 160,
			sortable: true,
			dataIndex: 'url',
			hidden: false,
			hideable: false
		}, {
			header: '网站',
			width: 120,
			sortable: true,
			dataIndex: 'webSite',
			hidden: false,
			hideable: false
		}, {
			header: '域名',
			width: 120,
			sortable: true,
			dataIndex: 'domain',
			hidden: false,
			hideable: false
		}, {
			header: 'IP',
			width: 120,
			sortable: true,
			dataIndex: 'ip',
			hidden: true,
			hideable: false
		}, {
			header: '大小(MB)',
			width: 80,
			sortable: true,
			dataIndex: 'fileSize',
			hidden: false,
			align: 'right',
			hideable: false, renderer:Main.fun.getMFromByte
		
		}, {
			header: 'DNS解析次数',
			width: 120,
			sortable: true,
			dataIndex: 'DNSResolNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '请求次数',
			width: 80,
			sortable: true,
			dataIndex: 'reqCount',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '总流量(MB)',
			width: 110,
			sortable: true,
			dataIndex: 'allFlow',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(value){
				
				return Main.fun.getMFromByte(value);
			}
		}, {
			header: '上行流量(MB)',
			width: 110,
			sortable: true,
			dataIndex: 'uploadFlow',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(value){
				
				return Main.fun.getMFromByte(value);
			}
		}, {
			header: '下行流量(MB)',
			width: 110,
			sortable: true,
			dataIndex: 'downloadFlow',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(value){
				
				return Main.fun.getMFromByte(value);
			}
		}, {
	        header: '更新日期',
	        width: 90,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmmBigFileBelongEvaluationAction.getListHotBigFile',
			columns:gridColumns,
			height: 400,
			frame : false,
			border: false,
			//bodyBorder: false,
			fetchSize:15,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData: false
		});
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		this.updateData(data);
	},
	run : function(data){
//		this.updateData(data);
	},
	updateData : function(data) {
		this.grid.updateParams(data);
	}
});