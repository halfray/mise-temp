base.portal.DcDnslLog_systemDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
					var column=[
								new Ext.grid.RowNumberer(),
								{header:'源IP',dataIndex:'ip_source',hidden:false,width:150},
								{header:'域名',dataIndex:'dd_nm',hidden:false,width:150},
								{header:'时间戳',dataIndex:'dd_time_collect',hidden:false,width:130},
								{header:'解析的IP',dataIndex:'ip_parse',hidden:false,width:140},
								{header:'目标IP',dataIndex:'ip_target',hidden:false,width:130},
								{header:'解析状态码',dataIndex:'dns_parse_statue',hidden:false},
								{header:'上报日期',dataIndex:'ds',hidden:false,width:120}								
					            ];
					             var self=this;
			                     this.data={};
			                     this.detailGrid = new Ext.ux.Grid({
			                    		dataMethod:'dcDnslLogSystemAction.getListDnslLogSystem',
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