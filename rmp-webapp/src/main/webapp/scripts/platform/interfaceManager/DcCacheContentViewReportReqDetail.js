base.portal.DcCacheContentViewReportReqDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
					var column=[
								new Ext.grid.RowNumberer(),
								{header:'上报服务器NodeID',dataIndex:'bodynodeid',hidden:false,width:130},
								{header:'资源编号',dataIndex:'contentid',hidden:false},
								{header:'服务器IP列表',dataIndex:'serveriplist',hidden:false},
								{header:'文件缓存协议',dataIndex:'cachedprotocol',hidden:false},
								{header:'传输层协议',dataIndex:'transportprotocol',hidden:false},
								{header:'文件名称',dataIndex:'filename',hidden:false},
								{header:'文件大小',dataIndex:'filesize',hidden:false},
								{header:'内容副本个数',dataIndex:'contentcopies',hidden:false},
								{header:'内容热点',dataIndex:'contentheat',hidden:false},
								{header:'内容总流量',dataIndex:'contentpercentage',hidden:false},
								{header:'内容统计开始日期',dataIndex:'starttime',hidden:false,width:120},
								{header:'内容统计结束日期',dataIndex:'endtime',hidden:false,width:120},
								{header:'内容标示',dataIndex:'contentlist',hidden:false}	,	
								{header:'上报日期',dataIndex:'ds',hidden:false}	
								];
					            var self=this;
			                     this.data={};
			                     this.detailGrid = new Ext.ux.Grid({
			                    		dataMethod:'dcCacheContentViewReportReqAction.getListCacheContentViewReportReq',
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
					