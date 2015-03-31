base.portal.DmDomainHotProvinceSystem = Ext.extend(Main.portal.PortalPage, {
	               init : function(params) {
						var orgCodeField = new Ext.ux.seraph.DictCombo( {
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						 });
				    	var province = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' ,
						    value : '100000',
						    width : 120				
						 });
						var columns =[new Ext.grid.RowNumberer(),
                                  {header:'省份',dataIndex:'province',width:90,hidden:false,renderer:Ext.ux.renderer.Combo(province)},
                                  {header:'系统',dataIndex:'system',hidden:false,width:90,renderer:Ext.ux.renderer.Combo(orgCodeField)},
                                  {header:'域名',dataIndex:'domain',hidden:false,width:130},
                                  {header:'网站',dataIndex:'webSiteName',hidden:false,width:200},
	                              {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false,width:200},
	                             // {header:'请求次数',dataIndex:'domainReqNum',hidden:false,width:80},
	                             // {header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte,width:90},
	                             // {header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte,width:90},
	                             // {header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte,width:90},
	                              {header:'更新日期',dataIndex:'updateDate',hidden:false,width:200}                                 
						          ]; 
						            var self=this;
	      					    	this.data={};
	    				    	    this.detailGrid = new Ext.ux.Grid({
	    						    	dataMethod:'dmDomainViewAction.getListDomainHotprovince',
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
	    				    	    	if(!Ext.isEmpty(data)){
	    				    	    		if(data.domainNum == null){
	    				    	    			return;
	    				    	    		}
	    				    	    	}
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

