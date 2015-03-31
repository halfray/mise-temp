base.portal.TBRW0005=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
					var column=[
								new Ext.grid.RowNumberer(),
								{header:'NODEID',dataIndex:'op_0401',hidden:false},
								{header:'URL地址',dataIndex:'url_0002',hidden:false,width:270},
								{header:'协议类型编码',dataIndex:'url_0004',hidden:false},
								{header:'父级URL地址',dataIndex:'url_0008',hidden:false},
								{header:'服务器IP地址',dataIndex:'ip_0001',hidden:false},
								{header:'服务器端口号',dataIndex:'ip_0003',hidden:false},
								{header:'用户IP地址',dataIndex:'ip_0004',hidden:false},
								{header:'用户端口号',dataIndex:'ip_0006',hidden:false},
								{header:'域名名称',dataIndex:'dd_0002',hidden:false},
								{header:'资源流量',dataIndex:'rr_x103',hidden:false},
								{header:'资源上行流量',dataIndex:'rr_x104',hidden:false},
								{header:'资源下行流量',dataIndex:'rr_x105',hidden:false},								
								{header:'开始时间',dataIndex:'pp_0803',hidden:false,width:140},
								{header:'结束时间',dataIndex:'pp_0804',hidden:false,width:140}
								];
					            var self=this;
			                     this.data={};
			                     this.detailGrid = new Ext.ux.Grid({
			                    		dataMethod:'dpiSystemAction.getDpiSystem',
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
					