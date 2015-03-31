base.portal.DmIpLibraryPattern= Ext.extend(Main.portal.PortalPage, {
	             init : function(params) {
					 
						var province = new Ext.ux.seraph.DictCombo( { 
							url :
							'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
							displayField : 'codeLabel',
						    valueField : 'codeValue' 						   
						 });
	                    var columns =[
	                          new Ext.grid.RowNumberer(),	                          
	                          {header:'省份',dataIndex:'local',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	                          {header:'合计IP数量',dataIndex:'sumnum',hidden:false},
	                          {header:'IDC',dataIndex:'IDC',hidden:false},
	                          {header:'Cache',dataIndex:'Cache',hidden:false},
	                          {header:'对等直连',dataIndex:'PDC',hidden:false},
	                          {header:'CDN',dataIndex:'CDN',hidden:false},
	                          {header:'其他',dataIndex:'Other',hidden:false}
	                          ];
    		        var column = [
							 {header: '',colspan: 1,align: 'center'},
							 {header: '',colspan: 1,align: 'center'},	
							 {header: '',colspan: 1,align: 'center'},							 
							 {header: 'IP数量',colspan: 5,align: 'center'}
							 ];
    		        var groupDetail = new Ext.ux.grid.ColumnHeaderGroup({
	                    rows: [column]
	                });
    		        var self=this;
			    	this.data={};
			    	this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'dmIpOverviewAction.getList',
				    	viewData:false,
						frame : false,
						border: false,
						columns:columns,
						plugins: groupDetail,
				    	columnLines : true,
				    	litePagingBar :true,
				    	sortBar : false,
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