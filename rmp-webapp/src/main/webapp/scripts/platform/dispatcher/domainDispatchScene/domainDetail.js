base.portal.domainDetail = Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			   var operators = new Ext.ux.seraph.DictCombo( { 
					url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
					displayField : 'codeLabel',
					valueField : 'codeValue' 					 			
				});
			   var province = new Ext.ux.seraph.DictCombo( { 
				  url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				  displayField : 'codeLabel',
			      valueField : 'codeValue' 					 			
			   });
			   var system = new Ext.ux.seraph.DictCombo( { 
				  url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
				  displayField : 'codeLabel',
			      valueField : 'codeValue' 					 			
			   });
		   
	       var columns = [ new Ext.grid.RowNumberer(),
	                       {header:'IP',dataIndex:'ip',hidden:false,width:180},
                           {header:'运营商',dataIndex:'operatorsName',hidden:false,width:180/*,renderer:Ext.ux.renderer.Combo(operators)*/},
                           {header:'省份',dataIndex:'provinceName',hidden:false,width:180/*,renderer:Ext.ux.renderer.Combo(province)*/},
                           {header:'系统',dataIndex:'systemName',hidden:false,width:180/*,renderer:Ext.ux.renderer.Combo(system)*/},
                           {header:'质量分数',dataIndex:'quaScore',hidden:true,width:160},
                           {header:'更新日期',dataIndex:'updateDate',hidden:false,width:160}
	              ];
		       	var self=this;
		       	var data={};
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'allIpDetailAction.getListIPQua',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	sortBar : false,
			    	fetchSize : 15,		
					height:386
		    	});
	           },
				render : function(div) {
					this.detailGrid.render(div);
				},
				refresh : function(data) {
					this.updateData(data);
				}, 
				updateData : function(data) {
					if(Ext.isEmpty(data.domain)){
						Ext.Msg.alert('温馨提示','请输入域名之后,重新查询');
						return;
					}
					this.detailGrid.updateParams(data);
				}
			});
