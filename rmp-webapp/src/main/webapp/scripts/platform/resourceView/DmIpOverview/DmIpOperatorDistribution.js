base.portal.DmIpOperatorDistribution = Ext.extend(Main.portal.PortalPage, {
				 init : function(params) {
				 var operator = new Ext.ux.seraph.DictCombo( { 
					 url :
					 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
					 displayField : 'codeLabel',
				     valueField : 'codeValue' 					 			
				  });
	               var columns =[
	                  new Ext.grid.RowNumberer(),
	                  {header:'所属运营商',dataIndex:'operator',hidden:false,width:160,renderer:Ext.ux.renderer.Combo(operator)},
	                  {header:'IP数量',dataIndex:'IPNum',hidden:false,width:160},
	                  {header:'更新日期',dataIndex:'updateDate',hidden:false}
	                  ];
	                    var self=this;
				    	this.data={};          
		        	    this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'dmIpOverviewAction.getListIpOperatorDistr',
				     	viewData:false,
						frame : false,
						border: false,
						columns:columns,
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