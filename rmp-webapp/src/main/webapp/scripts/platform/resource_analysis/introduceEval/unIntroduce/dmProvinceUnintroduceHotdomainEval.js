base.portal.dmProvinceUnintroduceHotdomainEval = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	
			 var enableCache= new Ext.ux.seraph.DictCombo( { 
					url :
					'parmInfoProvider.do?parmType=DOMAIN_INTRO_SUG', 
					displayField : 'parmName',
				    valueField : 'parmCode'			        
				 });
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'dmProvinceUnintroduceHotdomainAnalysisId',hidden:true},
    		{header:'域名',dataIndex:'domain',hidden:false,width:200},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'网站',dataIndex:'webSite',hidden:false,width:200},
    		{header:'DNS解析次数',dataIndex:'DNSResolNum',hidden:false,width:170},
    		//{header:'请求次数',dataIndex:'reqNum',hidden:false},
    		//{header:'总流量(MB)',dataIndex:'allFlow',hidden:false,renderer:Main.fun.getMFromByte},
    		//{header:'上行流量(MB)',dataIndex:'uploadFlow',hidden:false,renderer:Main.fun.getMFromByte},
    	    //{header:'下行流量(MB)',dataIndex:'downloadFlow',hidden:false,renderer:Main.fun.getMFromByte},
    	    {header:'引入建议',dataIndex:'introduceSuggest',hidden:false,renderer:Ext.ux.renderer.Combo(enableCache),width:150},
    		{header:'更新日期',dataIndex:'updateDate',hidden:false,width:150}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmProvinceUnintroduceHotdomainEvalAction.getList',
				frame : false,
				border: false,
				sortBar : false,
				columns:columns,
		    	columnLines : true,
				viewData: false,
		    	fetchSize : 15,
				width : 570,
				height:364,
				listeners : 
				{	
				  rowclick : Main.fun.Fun(self, self.onRowClick)
			    }				
		    	});
		    },      
		    onRowClick:function(data){
		       var grid=this.grid;
			   var record = grid.getSelectionModel().getSelected();			    		
			   this.data.domain = record.data.domain;
			   this.notice(this.data);		
		    },
           updateData : function(data) {
				this.grid.updateParams(data);
			},
			render : function(div) {
				this.grid.setHeight(Ext.get(div).getHeight());
				this.grid.render(div);
			},
		
			run : function(data){
//				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})