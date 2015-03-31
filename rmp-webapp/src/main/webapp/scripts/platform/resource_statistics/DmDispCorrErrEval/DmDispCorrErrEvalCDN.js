base.portal.DmDispCorrErrEvalCDN = Ext.extend(Main.portal.PortalPage, {
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
	        	var columns = [new Ext.grid.RowNumberer(),
	        	  {header:'id',dataIndex:'domainHitCDNID',hidden:true},
	        	  {header:'域名',dataIndex:'domain',hidden:false,width:140},
	        	  {header:'网站',dataIndex:'webSiteName',hidden:false},
	        	  {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false},
	        	  {header:'CDN资源命中次数',dataIndex:'domainCDNRitNum',hidden:false,width:120},
	        	  {header:'CDN资源命中率',dataIndex:'domainCDNRitRate',hidden:false,width:120,renderer:Main.fun.getPerByReal},
	        	  //{header:'请求次数',dataIndex:'domainReqNum',hidden:false},
	        	  //{header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  //{header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  //{header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  {header:'省份',dataIndex:'provinceName',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	        	  {header:'访问省份',dataIndex:'reqProvinceName',hidden:false,renderer:Ext.ux.renderer.Combo(province)},	   
	        	  {header:'更新日期',dataIndex:'updateData',hidden:false}
	        	];
	        	var self=this;
	        	    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmDispCorrErrEvalActoin.getListCDN',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	fetchSize : 15,
					width : 1100,
					height:260
			    	});
			    this.province = new Ext.ux.seraph.DictCombo( { 
				   url :
				  'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				   displayField : 'codeLabel',
			       valueField : 'codeValue' ,
			       value : '510000',
			       width : 120,
			       id:'#local',
			       listeners:{
			       	 select:function(){
			       	 	self.getMapData();
			       	 }
			       }
			 });
			 this.mainPanel = new Ext.Panel({
							layout : 'fit',
							frame : true,
							baseCls : 'x-plain',
							tbar : [{
										text : '访问省份'
									}, this.province],												
							items : [this.detailGrid]
						});
	        },	
	        getParams:function()
			 {	
				var value = this.province.getValue();
				this.data.reqProvinceName = value;
				return this.data 	
			 },
			 getMapData : function() {
			 	var sels=this;
			 	var data=this.getParams();
			    this.detailGrid.updateParams(data);
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.detailGrid.width = obj.offsetWidth;
				this.detailGrid.height = obj.offsetHeight-56;
				this.mainPanel.render(div);
			},
		
			run : function(data){
				this.getMapData(data);
			},
			refresh:function(data)
			{
				this.data=data;
				this.getMapData(data);
			}
});