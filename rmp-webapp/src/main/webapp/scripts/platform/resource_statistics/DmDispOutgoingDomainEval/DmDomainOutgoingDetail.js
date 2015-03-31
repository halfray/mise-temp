base.portal.DmDomainOutgoingDetail = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
		    	var province = new Ext.ux.seraph.DictCombo( { 
				url :
				'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				displayField : 'codeLabel',
			    valueField : 'codeValue' ,
			    value : '510000',
			    width : 120,
			    id:'#local'
			 });
	    	 var enableCache= new Ext.ux.seraph.DictCombo( { 
					url :
					'parmInfoProvider.do?parmType=YES_NO', 
					displayField : 'parmName',
				    valueField : 'parmCode'			        
				 });
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'id',dataIndex:'domainOutgoingID',hidden:true},
    		{header:'域名',dataIndex:'domain',hidden:false,width:130},
    		{header:'网站',dataIndex:'webSiteName',hidden:false,width:130},
    		{header:'出网IP',dataIndex:'outgoingIp',hidden:false,width:130},
    		{header:'质量分数',dataIndex:'quaScore',hidden:false},
    		{header:'是否适合缓存',dataIndex:'enableCache',hidden:false,renderer:Ext.ux.renderer.Combo(enableCache)},
    		{header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false},
    		//{header:'请求次数',dataIndex:'domainReqNum',hidden:false},
    	    //{header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte},
    	    //{header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte},
    	    //{header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte},
    		{header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
    		{header:'更新日期',dataIndex:'updateDate',hidden:false}
    		];
		       var self=this;
		       this.data = {};
	    	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'dmOutgoingDomainEvalAction.getListOutgoing',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15,
				width : 1100,
				height:260,
				listeners : 
				{	
				  rowclick : Main.fun.Fun(self, self.onRowClick)
			    }				
		    	});
		    },      
		    onRowClick:function(data){
		       var grid=this.detailGrid;
			   var record = grid.getSelectionModel().getSelected();			    		
			   this.data.domain = record.data.domain;
			   this.notice(this.data);		
		    },
           updateData : function(data) {
				this.detailGrid.updateParams(data);
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.detailGrid.width = obj.offsetWidth-15;
				this.detailGrid.height = obj.offsetHeight-15;
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