base.portal.DmHotbomainSort = Ext.extend(Main.portal.PortalPage, {
	             init : function(params) {
	               var columns = [
	                              new Ext.grid.RowNumberer(),
	                              {header:'域名',dataIndex:'domain',hidden:false,width:200},
	                              {header:'网站',dataIndex:'webSite',hidden:false,width:200},
	                              {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false,width:250},
	                              //{header:'请求次数',dataIndex:'req_Count',hidden:false},
	                              //{header:'总流量(MB)',dataIndex:'all_Flow',hidden:false,renderer:Main.fun.getMFromByte},
	                              //{header:'上行流量(MB)',dataIndex:'upload_Flow',hidden:false,renderer:Main.fun.getMFromByte},
	                              //{header:'下行流量(MB)',dataIndex:'download_Flow',hidden:false,renderer:Main.fun.getMFromByte},
	                              {header:'更新日期',dataIndex:'updateDate',hidden:false,width:250},
	                              ];
					               var self=this;
							    	this.data={};					   
						    	    this.detailGrid = new Ext.ux.Grid({
								    	dataMethod:'dmDomainDetailAction.getListHotDomainSort',
								    	viewData:false,
										frame : false,
										border: false,
										columns:columns,
								    	columnLines : true,
								    	fetchSize : 15,
										width : 1100,
										height:260,
										listeners : {
						    	    	      rowclick:Main.fun.Fun(self,function(data){
								    	    	 var grid=this.detailGrid;
										    	 var record = grid.getSelectionModel().getSelected();			    		
										    	 this.data.domainIP = record.data.domain;										    	
										    	 this.notice(this.data);	
						    	               })
									    }
										});								  
						    	    },				 
						    	    getGridData : function() {
						    			var self = this;
						    			var data = this.data;						    			
						    			this.detailGrid.setParams(data);
						    			this.detailGrid.doSearchList();
						    		},
						    		render : function(div) {
						    			var obj = (Ext.getDom(div));
                						this.detailGrid.width = obj.offsetWidth-15;
                						this.detailGrid.height = obj.offsetHeight-15;
						    			this.detailGrid.render(div);
						    		},
						    		refresh : function(data) {
						    			this.data = data;
						    			this.getGridData();
						    		}						       
							});