base.portal.dmWebSiteBelongEvalProvinceSystem = Ext.extend(Main.portal.PortalPage, {
					init : function(params){	 
						var system = new Ext.ux.seraph.DictCombo( {
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						 });
	                     var columns = [
                                        new Ext.grid.RowNumberer(),
                                        {header:'系统',dataIndex:'system',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(system)},
                                        {header:'省份',dataIndex:'province',hidden:true},
                                        {header:'网站数量',dataIndex:'webSiteNum',hidden:false,width:80},
                                        {header:'热点匹配度',dataIndex:'hotMatchDegree',hidden:false,width:80,	                                    	
	                                    	  renderer: function(v, p, record, rowIndex, index, store){
	                                     	return Main.fun.getPerByReal(v);
	                             	    }},
                                        {header:'热点依据',dataIndex:'hotBasis',hidden:true},
	                                    {header:'topN',dataIndex:'topN',hidden:true},
                                        {header:'更新日期',dataIndex:'updateDate',hidden:false,width:80}
	                                    ];
				                   	var self=this;
							       	this.data={};
								    this.detailGrid = new Ext.ux.Grid({
										sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
								    	dataMethod:'dmBelongEvalOverviewAction.getListWebSiteBelongEvalProvinceSystem',
								    	viewData:false,
										frame : false,
										border: false,
										columns:columns,
								    	columnLines : true,
								    	litePagingBar:true,
								    	sortBar : false,
								    	fetchSize : 10,
								    	height:260,
//										listeners:{
//								   	    cellclick:function(data,row,col){
//							    	      var grid=self.detailGrid;
//							    	      var record = grid.getSelectionModel().getSelected();
//							    	      self.data.system=record.data.system;
//							    		  self.data.province=record.data.province;
//							    		  self.data.hotBasis=record.data.hotBasis;
//							    		  self.data.topN=record.data.topN;
//							    	      if(col!=4){
//							    		  self.notice(self.data);
//							    	      }else{
//							    	    	  var conf = {
//											      	     href : 'portalAssemble.do?portalCode=dmWebsiteProvinceView&uxParams='+ encodeURI(Ext.encode(self.data)),
//											      	     text:  '分省网站视图',
//											   				icon: '',
//											   				tipinfo: '',
//											   				params: self.data
//											   			};
//											      	   Main.fun.openWin(conf, 'tab' );
//							    	      }
//							    	 }
//							    },
								listeners: {	
									rowclick: Main.fun.Fun(self, self.onRowClick)
							    }
						    	}); 
							    },  
	onRowClick: function(data) {
		var grid=this.detailGrid;
		this.data.province = grid.getSelect('province')
		this.data.system = grid.getSelect('system')
		this.data.hotBasis = grid.getSelect('hotBasis')
		this.data.topN = grid.getSelect('topN')
		this.notice(this.data);	
		
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