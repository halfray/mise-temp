base.portal.dmmWebSiteBelongEvalProvince = Ext.extend(Main.portal.PortalPage, {
					   init : function(params){
						var province = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' 
						    	});
	                       var columns = [
	                                      new Ext.grid.RowNumberer(),
	                                      {header:'区域',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:120},
	                                      {header:'网站数量',dataIndex:'webSiteNum',hidden:false,width:120},
	                                      {header:'热点匹配度',dataIndex:'hotMatchDegree',hidden:false,renderer:Main.fun.getPerByReal,width:120},
	                                      {header:'热点依据',dataIndex:'hotBasis',hidden:true,width:120},
	                                      {header:'topN',dataIndex:'topN',hidden:true,width:120},
	                                      {header:'更新日期',dataIndex:'updateDate',hidden:false,width:120}
	                                      ];	
				                     	var self=this;
								       	this.data={};
									    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'dmmBelongEvalOverviewAction.getListWebSiteBelongEvalProvince',
									    	viewData:false,
											frame : false,
											border: false,
											columns:columns,
									    	columnLines : true,
									    	litePagingBar:true,
									    	sortBar : false,
									    	fetchSize : 10,						
											height:260,
											listeners:{
									    	 rowclick:Main.fun.Fun(self,function(data){
									    		  var grid=this.detailGrid;
									    		  var record = grid.getSelectionModel().getSelected();
									    		  this.data.province=record.data.province;
									    		  this.data.hotBasis=record.data.hotBasis;
									    		  this.data.topN=record.data.topN;
									    		  this.notice(this.data);	
									    	 })
									    }
								    	}); 
									    },
									    render : function(div) {
											this.detailGrid.render(div);
										},
										refresh : function(data) {
											this.updateData(data);
										},										
										updateData : function(data) {
											this.detailGrid.updateParams(data);
										}
										});