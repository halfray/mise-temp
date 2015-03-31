base.portal.DcCacheBlackWhiteListSetReqDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
					var column=[
								new Ext.grid.RowNumberer(),
								{header:'名单类型',dataIndex:'listtype',hidden:false,width:180},
								{header:'上报内容类型',dataIndex:'itemtype',hidden:false,width:180},
								{header:'上报内容IP地址',dataIndex:'itemaddr',hidden:false,width:180},
								{header:'上报内容名称',dataIndex:'itemname',hidden:false,width:180},
								{header:'上报日期',dataIndex:'ds',hidden:false,width:180}
                              ];
					            var self=this;
			                     this.data={};
			                     this.detailGrid = new Ext.ux.Grid({
			                    		dataMethod:'dcCacheBlackWhiteListSetReqAction.getListCacheBlackWhiteListSetReq',
			                    		viewData:false,
			        					frame : false,
			        					border: false,
			        					showPagingBar:false,
			        					columns:column,
			        			    	columnLines : true,
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
					