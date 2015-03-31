base.portal.dmmWebSiteBelongEvalProvinceSystem= Ext.extend(Main.portal.PortalPage, {
					init : function(params){	 
						var system = new Ext.ux.seraph.DictCombo( {
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						 });
	                     var columns = [
                                        new Ext.grid.RowNumberer(),
                                        {header:'系统',dataIndex:'system',hidden:false,width:90,renderer:Ext.ux.renderer.Combo(system)},
                                        {header:'省份',dataIndex:'province',hidden:true},
                                        {header:'网站数量',dataIndex:'webSiteNum',hidden:false,width:90},
                                        {header:'热点匹配度',dataIndex:'hotMatchDegree',hidden:false,width:90,renderer:Main.fun.getPerByReal},
                                        {header:'热点依据',dataIndex:'hotBasis',hidden:true},
	                                    {header:'topN',dataIndex:'topN',hidden:true},
                                        {header:'更新日期',dataIndex:'updateDate',hidden:false,width:80}
	                                    ];
				                   	var self=this;
							       	this.data={};
								    this.detailGrid = new Ext.ux.Grid({
								    	dataMethod:'dmmBelongEvalOverviewAction.getListWebSiteBelongEvalProvinceSystem',
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
								    		  this.data.system=record.data.system;
								    		  this.data.province=record.data.province;
								    		  this.data.hotBasis=record.data.hotBasis;
								    		  this.data.topN=record.data.topN;
								    		  this.notice(this.data);	
								    	 })
								    }
							    	});
								    },
								    updateData : function(data) {
								    	this.detailGrid.updateParams(data);
								    },
									render : function(div) {
										this.detailGrid.render(div);
									},
									refresh : function(data) {
										this.updateData(data);
									}
									});