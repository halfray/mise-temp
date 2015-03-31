base.portal.dmmWebSiteBelongEvalOper= Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			var operator = new Ext.ux.seraph.DictCombo( { 
				url :
				'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
				displayField : 'codeLabel',
			    valueField : 'codeValue' 					 			
			 });
			var columns = [
	                         new Ext.grid.RowNumberer(),
	                         {header:'运营商',dataIndex:'operator',width:120,hidden:false,renderer:Ext.ux.renderer.Combo(operator)},
	                         {header:'网站数量',dataIndex:'webSiteNum',width:120,hidden:false},
	                         {header:'热点匹配度',dataIndex:'hotMatchDegree',width:120,hidden:false,renderer:Main.fun.getPerByReal},
	                         {header:'更新日期',dataIndex:'updateDate',hidden:false,width:120}
		                      ];
					       	var self=this;
					       	var data={};
						    this.detailGrid = new Ext.ux.Grid({
						    	dataMethod:'dmmBelongEvalOverviewAction.getListWebSiteBelongEvalOper',
						    	viewData:false,
								frame : false,
								border: false,
								columns:columns,
						    	columnLines : true,
						    	litePagingBar:true,
						    	sortBar : false,
						    	fetchSize : 10,						
								height:260
					    	});
	                       },
							render : function(div) {
								this.detailGrid.render(div);
							},
							refresh : function(data) {
								this.updateData(data);
							}, 
							updateData : function(data) {
								this.detailGrid.updateParams(data);
							}
							});
