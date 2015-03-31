base.portal.dmWebSiteBelongEvalSystem = Ext.extend(Main.portal.PortalPage, {
					 init : function(params){
						var system = new Ext.ux.seraph.DictCombo( {
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						 });
	                      var columns = [
                                         new Ext.grid.RowNumberer(),
	                                     {header:'全网系统',dataIndex:'system',hidden:false,width:85,renderer:Ext.ux.renderer.Combo(system)},
	                                     {header:'网站数量',dataIndex:'webSiteNum',hidden:false,width:85},
	                                     {header:'热点匹配度',dataIndex:'hotMatchDegree',hidden:false,width:85/*,renderer:Main.fun.getPerByReal(v)*/,
	                             			renderer: function(v, p, record, rowIndex, index, store){
	                                     	return ['<a href="#"><span>', Main.fun.getPerByReal(v) , '</span></a>&nbsp;'].join('');
	                             		}},
	                                     {header:'更新日期',dataIndex:'updateDate',hidden:false,width:85}	                                    
	                                     ];
					                  	this.data = {};
					            		var self = this;
									    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'dmBelongEvalOverviewAction.getListWebSiteBelongEvalSystem',
									    	viewData:false,
											frame : false,
											border: false,
											columns:columns,
									    	columnLines : true,
									    	litePagingBar:true,									    	
									    	sortBar : false,
									    	fetchSize : 10,
											//width : 1100,
											height:260,
											listeners:{
									    	 cellclick:function(data,row,col){
									    	      var grid=self.detailGrid;
									    	      var record = grid.getSelectionModel().getSelected();
									    	      self.data.system = record.data.system;
									    	      if(col!=3){
									    		  self.notice(self.data);
									    	      }else{
									    	    	  var conf = {
													      	     href : 'portalAssemble.do?portalCode=dmWebSiteView&uxParams='+ encodeURI(Ext.encode(self.data)),
													      	     text:  '全网系统网站视图',
													   				icon: '',
													   				tipinfo: '',
													   				params: self.data
													   			};
													      	   Main.fun.openWin(conf, 'tab' );
									    	      }
									    	 }
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
											/* listeners : 
											{	
											  rowclick : Main.fun.Fun(self, self.onRowClick)
										    } 
								    	});
									    }, 
										onRowClick:function(data){
									      	 var detailGrid=this.detailGrid;
									      	 var record = detailGrid.getSelectionModel().getSelected();
									      	 this.data.system = record.data.system;
									      	 alert(record.data.system);
									      	 var conf = {
									      	     href : 'portalAssemble.do?portalCode=dmWebSiteView&uxParams='+ encodeURI(Ext.encode(this.data)),
									      	     text:  '全网系统网站视图',
									   				icon: '',
									   				tipinfo: '',
									   				params: this.data
									   			};
									      	   Main.fun.openWin(conf, 'tab' );
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
										});*/
