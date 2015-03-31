base.portal.DmWebsiteSystemMatchDetail = Ext.extend(Main.portal.PortalPage, {
	  init : function(params) {
				 	var orgCodeField = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
						displayField : 'codeLabel',
						valueField : 'codeValue'
						});
	           var columns = [new Ext.grid.RowNumberer(),
                            {header:'id',dataIndex:'systemWebSiteMatchDetailID',hidden:true},
                            {header:'系统',dataIndex:'system',width:200,hidden:false,renderer:Ext.ux.renderer.Combo(orgCodeField)},
                            {header:'网站',dataIndex:'webSiteName',hidden:false,width:250},
                            {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false,width:250},
                           // {header:'请求次数',dataIndex:'domainReqNum',hidden:false,width:110},
                           // {header:'总流量(MB)',dataIndex:'domainAllFlow',width:110,hidden:false,renderer:Main.fun.getMFromByte},
                           // {header:'上行流量(MB)',dataIndex:'domainUpFlow',width:110,hidden:false,renderer:Main.fun.getMFromByte},
                           // {header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,width:110,renderer:Main.fun.getMFromByte},
                            {header:'更新日期',dataIndex:'updateDate',hidden:false,width:200}
	                      ];
					       	var self=this;
					    	this.data={};
				    	    this.detailGrid = new Ext.ux.Grid({
						    	dataMethod:'dmWebsiteSystemViewAction.getListDetail',
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