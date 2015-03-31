base.portal.optimizationTipsList = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var gridIpColumns = [ new Ext.grid.RowNumberer(),  {
			header : 'IP地址',
			width : 180,
			sortable : true,
			dataIndex : 'ip'
		}, {
			header : '当前疏导方式',
			width : 180,
			sortable : true,
			dataIndex : 'currentDredgeWay'
		}, {
			header : '优化建议',
			width : 180,
			sortable : true,
			dataIndex : 'optimizationTips'
		}];
		
		this.ipGrid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getOptimizationTipsIp',
			columns:gridIpColumns,
			height:150,
			fetchSize:10,
			frame : false,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			showPagingBar : false,
			columnLines : true
		});
		
		var gridDomainColumns = [ new Ext.grid.RowNumberer(),  {
			header : '域名',
			width : 180,
			sortable : true,
			dataIndex : 'domain'
		}, {
			header : '当前疏导方式',
			width : 180,
			sortable : true,
			dataIndex : 'currentDredgeWay'
		}, {
			header : '优化建议',
			width : 180,
			sortable : true,
			dataIndex : 'optimizationTips'
		}];
		
		this.domainGrid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getOptimizationTipsDomain',
			columns:gridDomainColumns,
			height:150,
			fetchSize:10,
			frame : false,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			showPagingBar : false,
			columnLines : true
		});
		
		var gridBigFileColumns = [ new Ext.grid.RowNumberer(),  {
			header : '文件名称',
			width : 180,
			sortable : true,
			dataIndex : 'bigFileName'
		}, {
			header : '当前疏导方式',
			width : 180,
			sortable : true,
			dataIndex : 'currentDredgeWay'
		}, {
			header : '优化建议',
			width : 180,
			sortable : true,
			dataIndex : 'optimizationTips'
		}];
		
		this.bigFileGrid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getOptimizationTipsBigFile',
			columns:gridBigFileColumns,
			height:150,
			fetchSize:10,
			frame : false,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			showPagingBar : false,
			columnLines : true
		});
		
		this.panel = new Ext.Panel({
			autoScroll : true,
			border: false,
			bodyBorder: false,
			items : [{
				items : [{
						xtype : 'fieldset',
						title : 'IP优化建议',
						autoHeight : true,
						layout : 'column',
						items : [this.ipGrid]
					
					},{
						xtype : 'fieldset',
						title : '域名优化建议',
						autoHeight : true,
						layout : 'column',
						items : [this.domainGrid]
					
					},{
						xtype : 'fieldset',
						title : '文件优化建议',
						autoHeight : true,
						layout : 'column',
						items : [this.bigFileGrid]
					}
				 ]
			}]
		});
		
	},
	getGridData : function(data) {
		this.ipGrid.setParams(data);
		this.ipGrid.doSearchList();
		
		this.domainGrid.setParams(data);
		this.domainGrid.doSearchList();
		
		this.bigFileGrid.setParams(data);
		this.bigFileGrid.doSearchList();
	},
	render : function(div) {
		this.panel.render(div);
	},
	refresh : function(data) {
		this.getGridData(data);
	}
});