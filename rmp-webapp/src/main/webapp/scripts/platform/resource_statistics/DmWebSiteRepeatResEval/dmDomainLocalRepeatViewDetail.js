base.portal.dmDomainLocalRepeatViewDetail = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
		var province = new Ext.ux.seraph.DictCombo( { 
			url :
			'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
			displayField : 'codeLabel',
		    valueField : 'codeValue' 
		});
		var system = new Ext.ux.seraph.DictCombo( { 
			url :
			'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
			displayField : 'codeLabel',
		    valueField : 'codeValue' 					 			
		 });
    		var columns = [
    		            new Ext.grid.RowNumberer(),
			    		{header:'省份',dataIndex:'province',hidden:false,width:140,renderer:Ext.ux.renderer.Combo(province)},
			    		{header:'域名',dataIndex:'domain',hidden:false,width:160},
			    		{header:'IP',dataIndex:'ip',hidden:false,width:160},
			    		{header:'所在系统',dataIndex:'system',hidden:false,width:130,renderer:Ext.ux.renderer.Combo(system)},
			    		//{header:'请求次数',dataIndex:'reqNum',hidden:false,width:120},
			    		{header:'质量分',dataIndex:'quaScore',hidden:false,width:140},
			    		{header:'更新日期',dataIndex:'updateDate',hidden:false,width:140}
    		];
		       var self=this;
		       this.data = {};
	    	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'dmWebSiteRepeatResEvalAction.getListDomainLocalRepeatViewDetail',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 10,
				width : 1100,
				height:260			
		    });
        },
        updateData : function(data) {
			this.detailGrid.updateParams(data);
		},
		render : function(div) {
			var obj = (Ext.getDom(div));
			this.detailGrid.width = obj.offsetWidth;
			this.detailGrid.height = obj.offsetHeight;
			this.detailGrid.render(div);
		},
	
		run : function(data){
			this.updateData(data);
		},
		refresh:function(data)
		{
			this.updateData(data);
		}
})