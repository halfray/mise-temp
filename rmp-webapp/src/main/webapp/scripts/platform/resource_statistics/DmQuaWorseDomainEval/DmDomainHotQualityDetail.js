base.portal.DmDomainHotQualityDetail= Ext.extend(Main.portal.PortalPage, {
	                  init : function(params) {
							this.data = {};
							var province = new Ext.ux.seraph.DictCombo( { 
								url :
								'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
								displayField : 'codeLabel',
							    valueField : 'codeValue'						 
							 });
	                         var columns = [
	                                        new Ext.grid.RowNumberer(),
	                                        {header:'域名',dataIndex:'domain',hidden:false,width:130},
	                                        {header:'网站',dataIndex:'webSite',hidden:false,width:130},
	                                        {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:130},
	                                        {header:'质量分数',dataIndex:'qualityScore',hidden:false,width:120},
	                                        {header:'IP',dataIndex:'IP',hidden:false,width:130},
	                                        {header:'DNS解析次数 ',dataIndex:'domainDNSResolNum',hidden:false,width:120},
	                                        //{header:'请求次数 ',dataIndex:'domainReqNum',hidden:false},
	                                        //{header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte},
	                                        //{header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte},
	                                        //{header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte},
	                                        {header:'更新日期',dataIndex:'updateDate',hidden:false,width:120}	                                        
	                                     ];
					                   	   var self=this;					                   	   
								    	    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'dmQuaWorseDomainEvalAction.getListQuaWorseDomainEval',
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
	                          			});