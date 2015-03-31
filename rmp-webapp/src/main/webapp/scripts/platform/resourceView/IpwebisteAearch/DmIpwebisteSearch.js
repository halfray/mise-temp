base.portal.DmIpwebisteSearch = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {	
	  var ipregex = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;	
	  var columns = [
	                 new Ext.grid.RowNumberer(),
	                 {header:'IP地址',dataIndex:'IP',hidden:false,width:300},
	                 {header:'网站',dataIndex:'webSiteName',hidden:false,width:300},
	                 {header:'更新日期',dataIndex:'updateDate',hidden:false,width:300}
	                ];
	  var self = this;
	    var queryFields = [{text:'IP地址'},
						   {
					    	xtype : 'textfield',
					    	regex : ipregex,
					    	regexText : 'ip格式无效',
					    	id : '#IP',
					    	width : 90						
						    }
	                       ,{  text : '<span style="margin-left:20px;">查询</span>',
	                    	   cls:'search-button',
	                    	   minWidth:82,
	           				   height:27,
	           		    	   handler : function() {
	                    	   var ip = Ext.getCmp('#IP'); 
	                    	   if(ip.isValid())
                    		   {
                    		   	self.detailGrid.updateParams({IP:ip.getValue()});
                    		   }else
                    		   {
                    			   Ext.Msg.alert('提示','IP地址无效!');
                    		   }
	                          }
	                       }
	                       //{text:'查询',xtype:'button',iconCls:'dataTable-preview-icon',click()}
	                       ];
					  var self=this;
					    this.detailGrid = new Ext.ux.Grid({
				  	    dataMethod:'ipwebisteAearchAction.getListIpwebisteAearch',
				  	    viewData:false,
						frame : false,
						border: false,
						columns:columns,	
						tbar:queryFields,
				  	    columnLines : true,
				  	    fetchSize : 15					
				  	});					   
					    
              },
	           updateData : function(data) {
	  				this.detailGrid.updateParams(data);
	  			},
	  			render : function(div) {
	  				var obj = (Ext.getDom(div));
	  				this.detailGrid.width = obj.offsetWidth-15;
	  				this.detailGrid.height = obj.offsetHeight-15;
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