base.portal.DmDispCorrErrEvalCache = Ext.extend(Main.portal.PortalPage, {
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
	        	  {header:'id',dataIndex:'domainHitCacheID',hidden:true},
	        	  {header:'域名',dataIndex:'domain',hidden:false,width:140},
	        	  {header:'网站',dataIndex:'webSiteName',hidden:false,width:140},
	        	  {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false,width:120},
	        	  {header:'Cache资源命中次数',dataIndex:'domainCacheRitNum',hidden:false,width:126},
	        	  {header:'Cache资源命中率',dataIndex:'domainCacheRitRate',hidden:false,width:120,renderer:function(value){return (value*100).toFixed(2)+'%'}},
	        	  //{header:'请求次数',dataIndex:'domainReqNum',hidden:false},
	        	  //{header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  //{header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  //{header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte},
	        	  {header:'省份',dataIndex:'provinceName',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:120},
	        	  {header:'更新日期',dataIndex:'updateData',hidden:false}
	        	];
	        	var self=this;
	        	    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmDispCorrErrEvalActoin.getListCache',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	fetchSize : 15,
					width : 1100,
					height:260
			    	});
			    	
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
});