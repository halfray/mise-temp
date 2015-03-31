base.portal.hostIPdetail = Ext.extend(Main.portal.PortalPage, {
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
	             {header:'ID',dataIndex:'dmhostipdetailid',hidden:true},
	             {header:'Host',dataIndex:'host',hidden:false},
	             {header:'Host IP',dataIndex:'hostip',width:140,hidden:false},
	             {header:'归属频道',dataIndex:'affiliationchannel',hidden:true,width:100},
	             {header:'所属ICP',dataIndex:'affiliationicp',hidden:false,width:100},
	             {header:'请求次数',dataIndex:'reqnum',width:100,hidden:false},
	             {header:'总流量(MB)',dataIndex:'allflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'上行流量(MB)',dataIndex:'uploadflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'下行流量(MB)',dataIndex:'downloadflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'DNS解析次数',dataIndex:'dnsresolnum',hidden:false,width:100},
	             {header:'所属运营商',dataIndex:'affiliationoperators',hidden:false,width:100,renderer: Ext.ux.renderer.Combo(operators)},
	             {header:'所属区域',dataIndex:'affiliationprovince',hidden:false,width:100,renderer: Ext.ux.renderer.Combo(province)},
	             {header:'所属系统',dataIndex:'affiliationsystem',hidden:false,width:100,renderer: Ext.ux.renderer.Combo(system)},
	             {header:'更新日期',dataIndex:'updatedate',hidden:false,width:100}
	              ];
		       	var self=this;
		       	var data={};
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmUserVisitAnalysisReportAction.getHostIPList',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	sortBar : false,
			    	fetchSize : 15,		
					height:362
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
