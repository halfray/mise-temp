base.portal.dmmWebsiteBelongevaluation = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	
			var webSiteType = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'网站',dataIndex:'webSite',hidden:false},
    		{header:'网站分类',dataIndex:'webSite_Type',hidden:false,renderer:Ext.ux.renderer.Combo(webSiteType)},
    		{header:'域名数量',dataIndex:'domainNum',hidden:false},
    		{header:'DNS解析次数',dataIndex:'DNSResolNum',hidden:false},
    		{header:'请求次数',dataIndex:'req_Count',hidden:false},
    		{header:'总流量(MB)',dataIndex:'all_Flow',hidden:false,renderer:Main.fun.getMFromByte},
    		{header:'上行流量(MB)',dataIndex:'upload_Flow',hidden:false,renderer:Main.fun.getMFromByte},
    	    {header:'下行流量(MB)',dataIndex:'download_Flow',hidden:false,renderer:Main.fun.getMFromByte},
    		{header:'更新日期',dataIndex:'updateDate',hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmmWebSiteBelongEvaluationAction.getWebSiteList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	sortBar : false,
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
			   this.data.webSiteId = record.data.webSiteId;
			   this.data.domainNum = record.data.domainNum;
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
				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})