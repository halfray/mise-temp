base.portal.DcIcprrSiteTopnSystemDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
					var column=[
				                new Ext.grid.RowNumberer(),
				                {header:'NODEID',dataIndex:'nodeid',hidden:false},
				                {header:'顶级域名',dataIndex:'topdomain',hidden:false},
				                {header:'网站名称',dataIndex:'websitename',hidden:false,width:90},
				                {header:'备案号',dataIndex:'icpnum',hidden:false},
				                {header:'域名',dataIndex:'domainname',hidden:false},
				                {header:'域名等级',dataIndex:'domaingrade',hidden:false,width:90},
				                {header:'IP值',dataIndex:'ipvalue',hidden:false,width:90},
				                {header:'所属地市',dataIndex:'icpaddr',hidden:false,width:80},
				                {header:'域名访问量',dataIndex:'domainhitnum',hidden:false,width:80},
				                {header:'上报日期',dataIndex:'ds',hidden:false,width:90}
				                ];
					             var self=this;
			                     this.data={};
			                     this.detailGrid = new Ext.ux.Grid({
			                    		dataMethod:'dcIcprrSiteTopnSystemAction.getListIcprrSiteTopnSystem',
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