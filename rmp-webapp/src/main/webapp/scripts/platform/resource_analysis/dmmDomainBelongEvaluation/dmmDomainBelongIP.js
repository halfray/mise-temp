/**
 * 移动域名归属评估-IP
 */
base.portal.dmmDomainBelongIP = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: 'IP',
			width: 200,
			sortable: true,
			dataIndex: 'IP',
			hidden: false,
			hideable: false
		}, {
			header: '域名数量',
			width: 130,
			sortable: true,
			dataIndex: 'domainNum',
			align: 'right',
			hidden: false,
			hideable: false
		}, {
			header: '热点匹配度',
			width: 130,
			sortable: true,
			dataIndex: 'hotMatchDegree',
			align: 'right',
			hidden: false,
			hideable: false,
			renderer: function(value){
				
				return (value*100).toFixed(2)+'%'
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
			dataMethod:'dmmDomainBelongEvaluationAction.getListDomainBelongProvinceSystemIP',
			columns:gridColumns,
			height: 265,
			frame : false,
			border: false,
			//bodyBorder: false,
			fetchSize:10,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData:true
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