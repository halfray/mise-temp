base.portal.resourceViewMapDetail = Ext.extend(Main.portal.PortalPage, {
	              init : function(params) {	  
						var province = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' ,
						    value : '510000',
						    width : 120,
						    id:'#local'
						 });
	                   var columns = [   
	                               new Ext.grid.RowNumberer(),
                                   {header:'省份',dataIndex:'local',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
                                   {header:'网站数量',dataIndex:'webSiteNum'},
                                   {header:'域名数量',dataIndex:'domainCount'},
                                   {header:'URL数量',dataIndex:'urlCount'},
                                   {header:'大文件数量',dataIndex:'bigFileCount'},
                                   {header:'本网请求次数',dataIndex:'inRequestNum'},
                                   {header:'本省用户感知质量',dataIndex:'inCustQuaScore',width:120}                                  
	                             ];
				    		       var self=this;
				    		       this.data = {};
				    	    	    this.detailGrid = new Ext.ux.Grid({
					    		    	dataMethod:'allProvinceResourcesContrastAction.getList',
					    		    	viewData:false,
					    				frame : false,
					    				border: false,
					    				columns:columns,
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
				    					this.detailGrid.width = obj.offsetWidth;
				    					this.detailGrid.height = obj.offsetHeight;
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