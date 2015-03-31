base.portal.DcRpsDomainResDetail=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
				 var cachable= new Ext.ux.seraph.DictCombo( { 
						url :
						'parmInfoProvider.do?parmType=YES_NO', 
						displayField : 'parmName',
					    valueField : 'parmCode'			        
					 }); 
					 var isinner= new Ext.ux.seraph.DictCombo( { 
							url :
							'parmInfoProvider.do?parmType=ISINNER', 
							displayField : 'parmName',
						    valueField : 'parmCode'			        
						 });
	                 var column=[
                                 new Ext.grid.RowNumberer(), 
                                 {header:'URL',dataIndex:'url',hidden:false,width:210},
                                 {header:'MD5值',dataIndex:'md5value',hidden:false,width:80},
                                 {header:'maxage',dataIndex:'maxage',hidden:false,width:80},
                                 {header:'是否可缓存',dataIndex:'cachable',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(cachable)},
                                 {header:'类型',dataIndex:'content_type',hidden:false,width:80},
                                 {header:'长度',dataIndex:'content_length',hidden:false,width:80},
                                 {header:'域名',dataIndex:'domain',hidden:false},
                                 {header:'内、外链',dataIndex:'isinner',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(isinner)},
                                 {header:'上报日期',dataIndex:'ds',hidden:false}                                 
	                             ];
	                     var self=this;
	                     this.data={};
	                     this.detailGrid = new Ext.ux.Grid({
	                    		dataMethod:'dcDomainResourceAction.getListRpsDomainResDetail',
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