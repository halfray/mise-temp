/**
 * 大文件归属评估二级平台-热点大文件列表
 */
base.portal.dmBigFileBelongEvaluation = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var gridColumns = [ new Ext.grid.RowNumberer(), {
			header: 'URL',
			width: 200,
			sortable: true,
			dataIndex: 'url',
			hidden: false,
			hideable: false
		}, {
			header: '网站',
			width: 180,
			sortable: true,
			dataIndex: 'webSite',
			hidden: false,
			hideable: false
		}, {
			header: '域名',
			width: 170,
			sortable: true,
			dataIndex: 'domain',
			hidden: false,
			hideable: false
		}, {
			header: '大小(MB)',
			width: 170,
			sortable: true,
			dataIndex: 'fileSize',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(value){
				
				return Main.fun.getMFromByte(value);
			}
		}, /*{
			header: '请求次数',
			width: 80,
			sortable: true,
			dataIndex: 'reqCount',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '总流量(MB)',
			width: 100,
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
			width: 100,
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
			width: 100,
			sortable: true,
			dataIndex: 'downloadFlow',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(value){
				
				return Main.fun.getMFromByte(value);
			}
		},*/ {
	        header: '更新日期',
	        width: 170,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmBigFileBelongEvaluation2Action.getListHotBigFile',
			columns:gridColumns,
			height: 260,
			frame : false,
			border: false,
			//bodyBorder: false,
			fetchSize:10,
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