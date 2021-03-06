base.portal.DmBigFileResType = Ext.extend(Main.portal.PortalPage, {
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
					  var columns = [ 
					                  new Ext.grid.RowNumberer(),
	                                  {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},	                                  
	                                  {header:'系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(orgCodeField)},
	                                  {header:'大文件数量',dataIndex:'TotalBigFileNum',hidden:false},
	                                  {header:'URL数量',dataIndex:'TotalurlNum',hidden:false},
	                                  {header:'大文件数量',dataIndex:'videoBigFileNum',hidden:false},
	                                  {header:'大文件数量占比',dataIndex:'videoBigFileNumPro',hidden:false,renderer:Main.fun.getPerByReal},
	                                  {header:'大文件数量',dataIndex:'audioBigFileNum',hidden:false},
	                                  {header:'大文件数量占比',dataIndex:'audioBigFileNumPro',hidden:false,renderer:Main.fun.getPerByReal},
	                                  {header:'大文件数量',dataIndex:'imageBigFileNum',hidden:false},
	                                  {header:'大文件数量占比',dataIndex:'imageBigFileNumPro',hidden:false,renderer:Main.fun.getPerByReal},
	                                  {header:'大文件数量',dataIndex:'applicationBigFileNum',hidden:false},
	                                  {header:'大文件数量占比',dataIndex:'applicationBigFileNumPro',hidden:false,renderer:Main.fun.getPerByReal},
	                                  {header:'更新日期',dataIndex:'updateDate',hidden:false}
	                                ];
				        var column = [
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
				     				
				        var groupDetail = new Ext.ux.grid.ColumnHeaderGroup({
		                    rows: [column]
		                });		               
		                var self=this;
				    	this.data={};
				    	this.detailGrid = new Ext.ux.Grid({
					    	dataMethod:'dmBigFileOverviewAction.getListResBigFileNum',
					    	viewData:false,
							frame : false,
							border: false,
							columns:columns,
							plugins: groupDetail,
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