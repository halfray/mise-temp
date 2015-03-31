base.portal.DmBigFileSizeResType= Ext.extend(Main.portal.PortalPage, {
	           init : function(params) {
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
					   var columnsBigfileSize=[
                                               new Ext.grid.RowNumberer(),
												{header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},	                                  
												{header:'系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(orgCodeField)},
												{header:'大文件大小(MB)',dataIndex:'TotalBigfileSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'URL大小(MB)',dataIndex:'TotalurlSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'大文件大小(MB)',dataIndex:'videoBigfileSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'大文件大小占比',dataIndex:'videoBigfileSizePro',hidden:false,renderer:Main.fun.getPerByReal},
												{header:'大文件大小(MB)',dataIndex:'audioBigfileSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'大文件大小占比',dataIndex:'audioBigfileSizePro',hidden:false,renderer:Main.fun.getPerByReal},
												{header:'大文件大小(MB)',dataIndex:'imageBigfileSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'大文件大小占比',dataIndex:'imageBigfileSizePro',hidden:false,renderer:Main.fun.getPerByReal},
												{header:'大文件大小(MB)',dataIndex:'applicationBigfileSize',hidden:false,renderer:Main.fun.getMFromByte},
												{header:'大文件大小占比',dataIndex:'applicationBigfileSizePro',hidden:false,renderer:Main.fun.getPerByReal},
												{header:'更新日期',dataIndex:'updateDate',hidden:false}
										];
				        var columnBigfileSize = [
										 {header: '',colspan: 1,align: 'center'},
										 {header: '',colspan: 1,align: 'center'},
										 {header: '',colspan: 1,align: 'center'},
										 {header: '合计',colspan: 2,align: 'center'},
										 {header: '视频',colspan: 2,align: 'center'},
										 {header: '声音',colspan: 2,align: 'center'},
										 {header: '图片',colspan: 2,align: 'center'},
										 {header: '应用',colspan: 2,align: 'center'},
										 {header: '',colspan: 1,align: 'center'}										 
		                             ];		
				        var group =new Ext.ux.grid.ColumnHeaderGroup({
		                	rows: [columnBigfileSize]
		                });
					        var self=this;
					    	this.data={};
					        this.gridtwo=new Ext.ux.Grid({
				                    	dataMethod:'dmBigFileOverviewAction.getListResBigfileSize',
				                    	viewData:false,
										frame : false,
										border: false,
										columns:columnsBigfileSize,
										plugins: group,
								    	columnLines : true,
								    	fetchSize : 15,
										width : 1100,
										height:260
		                    });
                           },
							 updateData : function(data) {
								this.gridtwo.updateParams(data);
							},
							render : function(div) {
								var obj = (Ext.getDom(div));
								this.gridtwo.width = obj.offsetWidth-15;
								this.gridtwo.height = obj.offsetHeight-15;
								this.gridtwo.render(div);
							},						
							run : function(data){
								this.updateData(data);
							},
							refresh:function(data)
							{ 						
								this.updateData(data);
							}
							 
							});