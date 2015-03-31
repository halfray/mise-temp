base.portal.RmImportantResourceManagerOverview= Ext.extend(Main.portal.PortalPage, {
                  init : function(params) {				  
				 	var RESOURCE_TYPE = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_IP_W_0003_LIST',
						displayField : 'codeLabel',
						valueField : 'codeValue'
						});
	                var columns = [
	                               new Ext.grid.RowNumberer(),
	                               {header:'资源类型',dataIndex:'RESOURCE_TYPE',hidden:false,width:300,renderer:Ext.ux.renderer.Combo(RESOURCE_TYPE)},
	                               {header:'重要域名数量',dataIndex:'imptant_domainNum',hidden:false,width:300},
	                               {header:'重要IP数量',dataIndex:'imptant_IpNum',hidden:false,width:300}
	                            ];
				                var self=this;
						    	this.data={};
					    	    this.detailGrid = new Ext.ux.Grid({
							    	dataMethod:'rmImportantResOverviewAction.getListImportantResOverview',
							    	viewData:false,
									frame : false,
									border: false,
									columns:columns,
							    	columnLines : true,
							    	//litePagingBar :true,
							    	//sortBar : false,
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