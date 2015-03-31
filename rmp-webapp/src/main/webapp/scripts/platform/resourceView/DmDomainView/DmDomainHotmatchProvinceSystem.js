base.portal.DmDomainHotmatchProvinceSystem = Ext.extend(Main.portal.PortalPage, {
                init : function(params) {
					var orgCodeField = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
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
                  var columns = [new Ext.grid.RowNumberer(),
                                 {header:'省份',dataIndex:'province',hidden:false,width:170,renderer:Ext.ux.renderer.Combo(province)},
                                 {header:'系统',dataIndex:'system',hidden:false,width:170,renderer:Ext.ux.renderer.Combo(orgCodeField)},
                                 {header:'域名数量',dataIndex:'domainNum',hidden:false,width:170},
                                 {header:'热点匹配度',dataIndex:'HotMatchingDegree',hidden:false,width:170,renderer:Main.fun.getPerByReal},
                                 {header:'更新日期',dataIndex:'updatedate',hidden:false,width:170}
                                 ];
                                var self=this;
						    	this.data={};
						    	this.detailGrid = new Ext.ux.Grid({
							    	dataMethod:'dmDomainViewAction.getListDomainHotMatchDegree',
							    	viewData:false,
									frame : false,
									border: false,
									columns:columns,
							    	columnLines : true,
							    	fetchSize : 15,
									width : 1100,
									height:200,
									listeners : {
					  	    		rowclick : Main.fun.Fun(self, self.onRowClick)
					  		    }
					  			});	
						    	
						    	/*this.system = new Ext.ux.seraph.DictCombo( { 
						    		url :
									  'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
									   displayField : 'codeLabel',
								       valueField : 'codeValue' ,
								       value : '0000',
								       width : 120,
								       id:'#local',
								       listeners:{
								       	 select:function(){
								       	 	self.getMapData();
								       	 }
								       }
						    	});
						    	this.mainPanel = new Ext.Panel({
									layout : 'fit',
									frame : true,
									baseCls : 'x-plain',
									tbar : [{
												text : '系统'
											}, this.system],												
									items : [this.detailGrid]
								});*/
					  	    },		
					  	    onRowClick:function(data){
					  		       var grid=this.detailGrid;
					  			   var record = grid.getSelectionModel().getSelected();			    		
					  			   this.data.system = record.data.system;
					  		       this.data.domainNum = record.data.domainNum;
					  		       this.data.province=record.data.province;
					  			   this.notice(this.data);
					  		    },
					  		getParams:function(){	
								/*var value = this.system.getValue();
								this.data.system = value;*/
								return this.data 	
							},
					  		getMapData : function() {
								var sels=this;
							 	var data=this.getParams();
							    this.detailGrid.updateParams(data);
							    this.notice({});
							},
					  		render : function(div) {
					  			var obj = (Ext.getDom(div));
					  			this.detailGrid.width = obj.offsetWidth-15;
					  			this.detailGrid.height = obj.offsetHeight-45;
					  			this.detailGrid.render(div);
					  			//this.mainPanel.render(div);
					  		},
					  		refresh : function(data) {
					  			this.data=data;
								this.getMapData(data);
					  		}						       
					  });				             	
									/*
									listeners : {					    	    	
										   rowclick :Main.fun.Fun(self,function(data){
											   var grid=this.detailGrid;
											   var record = grid.getSelectionModel().getSelected();
				
											   this.data.system = record.data.system;
											   this.data.domainNum = record.data.domainNum;
											   this.notice(this.data);	
										   })
									    }
						    	}); 
							    	this.system = new Ext.ux.seraph.DictCombo( { 
							    		url :
										  'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
										   displayField : 'codeLabel',
									       valueField : 'codeValue' ,
									       value : '0000',
									       width : 120,
									       listeners:{
									       	 select:function(){
									       	 	self.getMapData();
									       	 }
									       }
							    	});
							    	 this.province = new Ext.ux.seraph.DictCombo( { 
										   url :
										  'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
										   displayField : 'codeLabel',
									       valueField : 'codeValue' ,
									       value : '510000',
									       width : 120,
									       listeners:{
									       	 select:function(){
									       	 	self.getMapData();
									       	 }
									       }
									 });
							    	this.mainPanel = new Ext.Panel({
										layout : 'fit',
										frame : true,
										baseCls : 'x-plain',
										tbar : [{
													text : '系统'
												}, this.system,{
													text:'省份'
												},this.province],												
										items : [this.detailGrid]
									});	
							    	},
							    	getParams:function()
									 {	
										var value = this.system.getValue();
										var value1=this.province.getValue();
										this.data.system = value;
										this.data.province = value1;
										return this.data 	
									 },
									 getMapData : function() {
										 	var sels=this;
										 	var data=this.getParams();
										    this.detailGrid.updateParams(data);
										    this.notice({});
										},
										render : function(div) {
											var obj = (Ext.getDom(div));
											this.detailGrid.width = obj.offsetWidth;
											this.detailGrid.height = obj.offsetHeight-28;
											this.mainPanel.render(div);
										},
									
										run : function(data){
											this.getMapData(data);
										},
										refresh:function(data)
										{
											this.data=data;
											this.getMapData(data);
										}
                          
});*/