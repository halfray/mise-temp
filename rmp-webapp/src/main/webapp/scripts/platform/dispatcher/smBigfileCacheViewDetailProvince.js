base.portal.smBigfileCacheViewDetailProvince = Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			var province = new Ext.ux.seraph.DictCombo( { 
				url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				displayField : 'codeLabel',
			    valueField : 'codeValue' 					 			
			 });
			var sm = new Ext.grid.CheckboxSelectionModel();
	       var columns = [ new Ext.grid.RowNumberer(),sm,
	             {header:'省份',dataIndex:'province',width:140,hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	              ];
		       	var self=this;
		       	var data={};
		       	var search = new Ext.Button({
		       		text : '查询',
		       		iconCls: 'dataTable-preview-icon'//, 
		       		//handler : upData
		       	});
		       	var reset = new Ext.Button({
		       		text : '刷新',
		       		iconCls: 'role-user-reset'/*, 
		       		handler : function()
		       		{
		       			var tbar = grid.getTopToolbar();
		       			var queryFields = tbar.findByType('field');
		       			for(var i = 0; i < queryFields.length;i++)
		       			{
		       				queryFields[i].reset();
		       			}
		       			upData();
		       		}*/
		       	});
		       	var toolbar = [ search, '-', reset ];
			    this.provinceGrid = new Ext.ux.Grid({
			    	dataMethod:'smBigfileCacheViewDetailAction.getProvinceList',
			    	viewData:false,
					frame : false,
					//border: false,
					columns:columns,
			    	columnLines : true,
			    	tbar : toolbar,
			    	showPagingBar : false,
			    	sm : sm,
			    	root : 'result',
			    	width : 240,
					height:356
		    	});
			    
			    var detailColumns = [ new Ext.grid.RowNumberer(),
			        {header:'省份',dataIndex:'province',width:150,hidden:false,renderer:Ext.ux.renderer.Combo(province)},
			        {header:'资源所在省份',dataIndex:'resProvince',width:150,hidden:false,renderer:Ext.ux.renderer.Combo(province)},
			        {header:'回源流量',dataIndex:'backSourceFlow',width:150,hidden:false}
			    ];
			    var nothing = new Ext.Button({});
			    var detailToolbar = [ nothing ];
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'smBigfileCacheViewDetailAction.getBackSourceFlowList',
			    	viewData:false,
					frame : false,
					border: true,
					columns:detailColumns,
			    	columnLines : true,
			    	showPagingBar : false,
			    	tbar : detailToolbar,
			    	width : 740,
					height:356
		    	});
			    
			    this.panel = new Ext.Panel({
			    	id : 'main-panel',
			    	//renderTo : 'user-grid',
			    	autoHeight:true,
			    	layout : 'table',
			    	border : false,
			    	bodyBorder : false,
			    	items : [this.provinceGrid,this.detailGrid]
			    });
			    
	           },
				render : function(div) {
	        	   this.panel.render(div);
				},
				refresh : function(data) {
					this.updateData(data);
				}, 
				updateData : function(data) {
					this.provinceGrid.updateParams(data);
				}
			});
