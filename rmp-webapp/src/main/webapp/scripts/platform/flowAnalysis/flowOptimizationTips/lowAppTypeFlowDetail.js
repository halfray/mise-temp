base.portal.lowAppTypeFlowDetail = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		var row = [{ header: '', colspan: 4, align: 'center' },
		           { header: '<font color = #ee006e>CACHE</font>', colspan: 2, align: 'center' },
		           { header: '<font color = #ee006e>IDC引入</font>', colspan: 2, align: 'center' },
		           { header: '<font color = #ee006e>对等互联</font>', colspan: 2, align: 'center' },
				   { header: '<font color = #ee006e>第三方出口</font>', colspan: 2, align: 'center' },
		           { header: '<font color = #ee006e>CMNET</font>', colspan: 2, align: 'center' }
				  ];
		var group = new Ext.ux.grid.ColumnHeaderGroup({
		    rows: [row]
		});
		
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '应用名称',
			width : 100,
			sortable : true,
			dataIndex : 'appName'
		},{
			header : '应用ID',
			hidden : true,
			sortable : true,
			dataIndex : 'appID'
		}, {
			header : '总流量',
			width : 80,
			sortable : true,
			dataIndex : 'totalFlow'
		}, {
			header : '流量',
			width : 65,
			sortable : true,
			dataIndex : 'cacheFlow',
		}, {
			header : '占比',
			width : 65,
			sortable : true,
			dataIndex : 'cacheFlowPro',
			renderer:function(value){
				if(value > 0.5){
					return '<span style="background:red">'+(value * 100).toFixed(2) + "%"+'</span>';
				}else{
					return (value * 100).toFixed(2) + "%";
				}
			}
		}, {
			header : '流量',
			width : 65,
			sortable : true,
			dataIndex : 'idcFlow',
		}, {
			header : '占比',
			width : 65,
			sortable : true,
			dataIndex : 'idcFlowPro',
			renderer:function(value){
				if(value > 0.5){
					return '<span style="background:red">'+(value * 100).toFixed(2) + "%"+'</span>';
				}else{
					return (value * 100).toFixed(2) + "%";
				}
			}
		}, {
			header : '流量',
			width : 65,
			sortable : true,
			dataIndex : 'peeringFlow',
		}, {
			header : '占比',
			width : 65,
			sortable : true,
			dataIndex : 'peeringFlowPro',
			renderer:function(value){
				if(value > 0.5){
					return '<span style="background:red">'+(value * 100).toFixed(2) + "%"+'</span>';
				}else{
					return (value * 100).toFixed(2) + "%";
				}
			}
		}, {
			header : '流量',
			width : 65,
			sortable : true,
			dataIndex : 'thirdExportFlow',
		}, {
			header : '占比',
			width : 65,
			sortable : true,
			dataIndex : 'thirdExportFlowPro',
			renderer:function(value){
				if(value > 0.5){
					return '<span style="background:red">'+(value * 100).toFixed(2) + "%"+'</span>';
				}else{
					return (value * 100).toFixed(2) + "%";
				}
			}
		}, {
			header : '流量',
			width : 65,
			sortable : true,
			dataIndex : 'cmnetFlow'
		}, {
			header : '占比',
			width : 65,
			sortable : true,
			dataIndex : 'cmnetFlowPro',
			renderer:function(value){
				if(value > 0.5){
					return '<span style="background:red">'+(value * 100).toFixed(2) + "%"+'</span>';
				}else{
					return (value * 100).toFixed(2) + "%";
				}
			}
		}];
		
		var self=this;
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'flowAnalysisAllAction.getAppTypeFlowDetail',
			columns:gridColumns,
			height:345,
			fetchSize:20,
			frame : false,
			plugins: group,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			listeners: {	
				rowclick: Main.fun.Fun(self, self.onRowClick)
		    }
		});
	},
	onRowClick: function() {
		var grid=this.grid;
		this.data.appID = grid.getSelect('appID');
		this.notice(this.data);	
		
	},
	getGridData : function(data) {
		this.data = data;
		this.grid.setParams(data);
		this.grid.doSearchList();
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		this.getGridData(data);
	}
});