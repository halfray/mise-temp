/**
 * 移动域名归属评估-运营商
 */
base.portal.dmmDomainBelongOperator = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var operator = new Ext.ux.seraph.DictCombo( { 
			url :
			'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
			displayField : 'codeLabel',
		    valueField : 'codeValue' 					 			
		 });
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: '运营商',
			width: 200,
			sortable: true,
			dataIndex: 'operator',
			hidden: false,
			hideable: false,renderer:Ext.ux.renderer.Combo(operator)
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
			header: 'topN',
			width: 130,
			sortable: true,
			dataIndex: 'topN',
			hidden: true,
			hideable: false
		}, {
			header: '热点依据',
			width: 130,
			sortable: true,
			dataIndex: 'hotBasis',
			hidden: true,
			hideable: false
		}, {
	        header: '更新日期',
	        width: 90,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmmDomainBelongEvaluationAction.getListDomainBelongOperator',
			columns:gridColumns,
			height: 265,
			frame : false,
			border: false,
			litePagingBar: true,
			sortBar : false,
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