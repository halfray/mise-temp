base.portal.dmmWebSiteBelongEvalSystem = Ext.extend(Main.portal.PortalPage, {
					 init : function(params){
						var system = new Ext.ux.seraph.DictCombo( {
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						 });
	                      var columns = [
                                         new Ext.grid.RowNumberer(),
	                                     {header:'全网系统',dataIndex:'system',hidden:false,width:90,renderer:Ext.ux.renderer.Combo(system)},
	                                     {header:'网站数量',dataIndex:'webSiteNum',hidden:false,width:90},
	                                     {header:'热点匹配度',dataIndex:'hotMatchDegree',hidden:false,width:90,renderer:Main.fun.getPerByReal},
	                                     {header:'更新日期',dataIndex:'updateDate',hidden:false,width:87}	                                    
	                                     ];
					                  	var self=this;
								       	var data={};
									    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'dmmBelongEvalOverviewAction.getListWebSiteBelongEvalSystem',
									    	viewData:false,
											frame : false,
											border: false,
											columns:columns,
									    	columnLines : true,
									    	litePagingBar:true,									    	
									    	sortBar : false,
									    	fetchSize : 10,
											width : 1100,
											height:260
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
