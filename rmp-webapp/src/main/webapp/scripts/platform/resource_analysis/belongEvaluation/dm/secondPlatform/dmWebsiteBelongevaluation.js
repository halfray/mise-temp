base.portal.dmWebsiteBelongevaluation = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	
			var webSiteType = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'网站',dataIndex:'webSite',hidden:false,width: 190},
    		{header:'网站类型',dataIndex:'webSite_Type',hidden:false,renderer:Ext.ux.renderer.Combo(webSiteType),width: 170},
    		{header:'域名数量',dataIndex:'domainNum',hidden:false,width: 170},
    		{header:'DNS解析次数',dataIndex:'DNSResolNum',hidden:false,width: 170},
    		/*{header:'请求次数',dataIndex:'req_Count',hidden:false},
    		{header:'总流量(MB)',dataIndex:'all_Flow',hidden:false,renderer:Main.fun.getMFromByte},
    		{header:'上行流量(MB)',dataIndex:'upload_Flow',hidden:false,renderer:Main.fun.getMFromByte},
    	    {header:'下行流量(MB)',dataIndex:'download_Flow',hidden:false,renderer:Main.fun.getMFromByte},*/
    		{header:'更新日期',dataIndex:'updateDate',hidden:false,width: 170}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmWebSiteBelongEvaluation2Action.getWebSiteList',
				frame : false,
				border: false,
				bodyBorder : false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15,
				width : 970,
				height:366,
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
			   this.data.province = this.mapData.province;
			   this.data.domainNum = record.data.domainNum;
			   this.notice(this.data);		
		    },
           updateData : function(data) {
		    	this.mapData = data;
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