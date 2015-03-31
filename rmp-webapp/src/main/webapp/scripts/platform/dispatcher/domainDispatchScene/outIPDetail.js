base.portal.outIPDetail = Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			   var operators = new Ext.ux.seraph.DictCombo( { 
					url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
					displayField : 'codeLabel',
					valueField : 'codeValue' 					 			
				});
		   
	       var columns = [ new Ext.grid.RowNumberer(),
	                       {header:'IP',dataIndex:'ip',hidden:false,width:180},
                           {header:'运营商',dataIndex:'operatorsName',hidden:false,width:180/*,renderer:Ext.ux.renderer.Combo(operators)*/},
                           {header:'访问省份',dataIndex:'userProvinceName',hidden:false,width:200},
                           {header:'DNS解析次数',dataIndex:'outDnsNum',hidden:false,width:170},
                           //{header:'流量(MB)',dataIndex:'outflow',hidden:false,renderer:Main.fun.getMFromByte},
                           {header:'更新日期',dataIndex:'updateDate',hidden:false,width:150}
	              ];
		       	var self=this;
		       	var data={};
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'allIpDetailAction.getListOutIPDetail',
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
						//Ext.Msg.alert('温馨提示','没有域名的查询数据量会很大,暂不支持');
						return;
					}
					this.detailGrid.updateParams(data);
				}
			});
