/**
 * 移动域名归属评估-全网系统
 */
base.portal.dmmDomainBelongSystem = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var system = new Ext.ux.seraph.DictCombo( {
			url: 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
			displayField: 'codeLabel',
			valueField: 'codeValue'
		});
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: '全网系统',
			width: 90,
			sortable: true,
			dataIndex: 'system',
			hidden: false,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(system)
		}, {
			header: '域名数量',
			width: 80,
			sortable: true,
			dataIndex: 'domainNum',
			align: 'right',
			hidden: false,
			hideable: false
		}, {
			header: '热点匹配度',
			width: 90,
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
			dataMethod:'dmmDomainBelongEvaluationAction.getListDomainBelongSystem',
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