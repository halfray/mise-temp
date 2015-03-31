base.portal.DcDnsSubmitTopDomainResDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
	                   var column=[
									new Ext.grid.RowNumberer(),
									{header:'URL',dataIndex:'url_0002',hidden:false,width:150},
									{header:'域名',dataIndex:'dd_0002',hidden:false,width:150},
									{header:'服务器IP',dataIndex:'ip_0001',hidden:false,width:100},
									{header:'资源上行流量',dataIndex:'rr_x104',hidden:false},
									{header:'资源下行流量',dataIndex:'rr_x105',hidden:false,width:100},
									{header:'资源总流量',dataIndex:'rr_x103',hidden:false,width:100},
									{header:'开始时间',dataIndex:'pp_0803',hidden:false,width:110},
									{header:'结束时间',dataIndex:'pp_0804',hidden:false,width:110}
	                               ];	
	                   var self=this;
	                     this.data={};
	                     this.detailGrid = new Ext.ux.Grid({
	                    		dataMethod:'dcHotDataReportAction.getListHotDataReport',
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