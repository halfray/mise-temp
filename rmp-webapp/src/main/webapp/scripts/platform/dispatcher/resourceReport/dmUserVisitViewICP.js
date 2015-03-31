base.portal.dmUserVisitViewICP = Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			
		  var row = [
		       { colspan: 1},
	           { colspan: 1},
	           { header: '总体情况', colspan: 6, align: 'center'},
	           { header: '流量占比情况', colspan: 11, align: 'center' },
	           { header: '点击量占比情况', colspan: 11, align: 'center' },
	           { colspan: 1}
		  ];
		  var group = new Ext.ux.grid.ColumnHeaderGroup({
		       rows: [row]
		  });
			
	       var columns = [ new Ext.grid.RowNumberer(),
	             {header:'ID',dataIndex:'dmuservisitviewicpid',hidden:true},
	             {header:'ICP',dataIndex:'icp',width:120,hidden:false},
	             {header:'请求次数',dataIndex:'reqnum',width:100,hidden:false},
	             {header:'总流量(MB)',dataIndex:'allflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'上行流量(MB)',dataIndex:'uploadflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'下行流量(MB)',dataIndex:'downloadflow',hidden:false,width:100,renderer:Main.fun.getMFromByte},
	             {header:'DNS解析次数',dataIndex:'dnsresolnum',hidden:false,width:100},
	             {header:'省内IDC',dataIndex:'flowpercentlocalidc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内Cache',dataIndex:'flowpercentlocalcache',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内CDN',dataIndex:'flowpercentlocalcdn',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内直连',dataIndex:'flowpercentlocaldirectconnection',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'外省IDC',dataIndex:'flowpercentotheridc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'外省直连',dataIndex:'flowpercentotherdirectconnection',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'移动',dataIndex:'flowpercentcmcc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'联通',dataIndex:'flowpercentcucc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'电信',dataIndex:'flowpercentct',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'铁通',dataIndex:'flowpercentctt',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'其他',dataIndex:'flowpercentother',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内IDC',dataIndex:'clickpercentlocalidc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内Cache',dataIndex:'clickpercentlocalcache',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内CDN',dataIndex:'clickpercentlocalcdn',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'省内直连',dataIndex:'clickpercentlocaldirectconnection',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'外省IDC',dataIndex:'clickpercentotheridc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'外省直连',dataIndex:'clickpercentotherdirectconnection',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'移动',dataIndex:'clickpercentcmcc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'联通',dataIndex:'clickpercentcucc',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'电信',dataIndex:'clickpercentct',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'铁通',dataIndex:'clickpercentctt',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'其他',dataIndex:'clickpercentother',hidden:false,width:100,renderer:Main.fun.getPerByReal},
	             {header:'更新日期',dataIndex:'updatedate',hidden:false,width:100}
	              ];
		       	var self=this;
		       	var data={};
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'dmUserVisitAnalysisReportAction.getICPList',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	sortBar : false,
			    	plugins: group,
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
					this.detailGrid.updateParams(data);
				}
			});
