base.portal.DmDomainipHotDetail = Ext.extend(Main.portal.PortalPage, {
	              init : function(params) {
					var operator = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
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
					var orgCodeField = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
						displayField : 'codeLabel',
						valueField : 'codeValue'
					 });
	                 var columns = [
	                                new Ext.grid.RowNumberer(),
	                               {header:'IP',dataIndex:'ip',hidden:false,width:180},
	                               {header:'所属运营商',dataIndex:'operator',hidden:false,width:180,renderer:Ext.ux.renderer.Combo(operator)},
	                               {header:'所属区域',dataIndex:'area',hidden:false,width:180,renderer:Ext.ux.renderer.Combo(province)},
	                               {header:'所属系统',dataIndex:'system',hidden:false,width:180,renderer:Ext.ux.renderer.Combo(orgCodeField)},
	                               {header:'更新日期',dataIndex:'updatedate',hidden:false,width:180},
	                               ];
					                 var self=this;
								    	this.data={};					   
							    	    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'dmDomainDetailAction.getListDomainHot',
									    	viewData:false,
											frame : false,
											border: false,
											columns:columns,
									    	columnLines : true,
									    	fetchSize : 15,
											width : 1100
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