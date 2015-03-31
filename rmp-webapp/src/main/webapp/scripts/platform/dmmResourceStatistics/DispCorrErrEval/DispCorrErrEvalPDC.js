base.portal.DispCorrErrEvalPDC = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	        	var columns = [
	        	  {header:'id',dataIndex:'domainHitPdcID',hidden:true},
	        	  {header:'域名',dataIndex:'domain',hidden:false},
	        	  {header:'网站',dataIndex:'webSiteName',hidden:false,width:120},
	        	  {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false},
	        	  {header:'对等直连资源命中次数',dataIndex:'domainPDCRitNum',hidden:false,width:140},
	        	  {header:'对等直连资源命中率',dataIndex:'domainPDCRitRate',hidden:false,width:140,renderer:function(value){return (value*100).toFixed(2)+'%'}},      	  
	              {header:'请求次数',dataIndex:'domainReqNum',hidden:false},
	        	  {header:'总流量',dataIndex:'domainAllFlow',hidden:false},
	        	  {header:'上行流量',dataIndex:'domainUpFlow',hidden:false},
	        	  {header:'下行流量',dataIndex:'domainDownFlow',hidden:false},
	        	  {header:'省份名称',dataIndex:'provinceName',hidden:false},
	        	  {header:'访问省份名称',dataIndex:'reqProvinceName',hidden:false}	,
	        	  {header:'更新日期',dataIndex:'updateData',hidden:false}
	        	];
	        	var self=this;
	        	    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmmDispCorrErrEvalActoin.getListPDC',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	fetchSize : 10,
					width : 1100,
					height:260
			    	});	
			   
			   this.province = new Ext.ux.seraph.DictCombo( {			
				   url :
				  'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				   displayField : 'codeLabel',
			       valueField : 'codeLabel' ,
			       value : '北京市',
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
				this.detailGrid.height = obj.offsetHeight-28 ;
				this.mainPanel.render(div);
			},
		    
			run : function(data){
				this.getMapData(data);
			},
			refresh:function(data)
			{
				this.data = data;
				this.getMapData();
			}		
});