base.portal.DispCorrErrEvalCache = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	        	var columns = [
	        	  {header:'id',dataIndex:'domainHitCacheID',hidden:true},
	        	  {header:'域名',dataIndex:'domain',hidden:false},
	        	  {header:'网站',dataIndex:'webSiteName',hidden:false,width:140},
	        	  {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false},
	        	  {header:'Cache资源命中次数',dataIndex:'domainCacheRitNum',hidden:false,width:126},
	        	  {header:'Cache资源命中率',dataIndex:'domainCacheRitRate',hidden:false,width:120,renderer:function(value){return (value*100).toFixed(2)+'%'}},
	        	  {header:'请求次数',dataIndex:'domainReqNum',hidden:false},
	        	  {header:'总流量',dataIndex:'domainAllFlow',hidden:false},
	        	  {header:'上行流量',dataIndex:'domainUpFlow',hidden:false},
	        	  {header:'下行流量',dataIndex:'domainDownFlow',hidden:false},
	        	  {header:'省份名称',dataIndex:'provinceName',hidden:false},
	        	  {header:'更新日期',dataIndex:'updateData',hidden:false}
	        	];
	        	var self=this;
	        	    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmmDispCorrErrEvalActoin.getListCache',
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
});