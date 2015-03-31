var param={};
base.portal.dmDomainBetterResDetail = Ext.extend(Main.portal.PortalPage, {
	              init : function(params) {
	
	var self = this;
	var queryFields = [
{
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "domainBetterResViewAction.do?param="+encodeURI(Ext.encode(param));
		window.open(url);
	}
}
];
						var operator = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' 					 			
						 });
						var area = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' 					 			
						 });
						var system = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' 					 			
						 });					
	                 var columns = [
	                                new Ext.grid.RowNumberer(),
	                               {header:'网站',dataIndex:'webSiteName',hidden:false,width:120},
	                               {header:'域名',dataIndex:'domain',hidden:false,width:150},
	                               {header:'IP地址',dataIndex:'IP',hidden:false,width:120},
	                               {header:'所属运营商',dataIndex:'operator',hidden:false,renderer:Ext.ux.renderer.Combo(operator)},
	                               {header:'所属区域',dataIndex:'area',hidden:false,renderer:Ext.ux.renderer.Combo(area)},
	                               {header:'所属系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system)},	                               
	                               {header:'更新日期',dataIndex:'updatedate',hidden:false}
	                               ];
					                 var self=this;
								    	this.data={};					   
							    	    this.detailGrid = new Ext.ux.Grid({
									    	dataMethod:'iDCCacheShare.getListDetail',
									    	viewData:false,
											frame : false,
											border: false,
											columns:columns,
									    	columnLines : true,
									    	fetchSize : 15,
									    	tbar: queryFields,
											width : 1100
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
                						param = data;
                						this.updateData(data);
                					},
                					getExcelData: function() {
    					    			var grid=this.detailGrid;
    					    			var tbar = grid.getTopToolbar();
    					    			var queryFields = tbar.findByType('field');
    					    			var data = '{';
    					    			for(var i = 0; i < queryFields.length;i++)
    					    			{
    					    				data= data+ queryFields[i].getName() + " : '" + queryFields[i].getValue()+"' ,";
    					    				if(i == queryFields.length-1){
    					    					data= data.substr(0,data.lastIndexOf(','));
    					    				}
    					    			}
    					    			data = data+'}'
    					    			return data;
    					    		}
                					});