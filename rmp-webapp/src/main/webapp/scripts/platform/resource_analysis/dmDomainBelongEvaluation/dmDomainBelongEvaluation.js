/**
 * 域名归属评估-热点域名列表
 */
base.portal.dmDomainBelongEvaluation = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var webSiteType = new Ext.ux.seraph.DictCombo( {
			url: 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
			displayField: 'codeLabel',
			valueField: 'codeValue'
		});
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: '域名',
			width: 200,
			sortable: true,
			dataIndex: 'domain',
			hidden: false,
			hideable: false
		}, {
			header: '网站',
			width: 170,
			sortable: true,
			dataIndex: 'webSite',
			hidden: false,
			hideable: false
		}, {
			header: '网站类型',
			width: 170,
			sortable: true,
			dataIndex: 'webSiteType',
			hidden: false,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(webSiteType)
		}, {
			header: 'DNS解析次数',
			width: 170,
			sortable: true,
			dataIndex: 'domainDNSResolNum',
			hidden: false,
			align: 'right',
			hideable: false
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
		}, */{
			header: 'ID',
			width: 170,
			sortable: true,
			dataIndex: 'ID',
			hidden: true,
			hideable: false
		}, {
	        header: '更新日期',
	        width: 170,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmDomainBelongEvaluationAction.getListHotDomain',
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