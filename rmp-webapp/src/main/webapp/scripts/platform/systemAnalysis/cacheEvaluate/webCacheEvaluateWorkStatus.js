var refreshGrid;
base.portal.webCacheEvaluateWorkStatus = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		this.threshold = {}
		var self = this;
		
		var basicWorkStateColumns = [ new Ext.grid.RowNumberer(),  {
			header : '流量',
			width : 130,
			sortable : true,
			dataIndex : 'cacheFlow'
		}, {
			header : '磁盘空间',
			width : 130,
			sortable : true,
			dataIndex : 'diskSpace',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				if(record.get('diskSpaceFlag') == '1'){
					return '<span style="background:red">'+value+'</span>';
				}else{
					return value;
				}
			}
		}, {
			header : '磁盘空间高亮显示标示',
			dataIndex : 'diskSpaceFlag',
			hidden : true
		}, {
			header : '内存',
			width : 130,
			sortable : true,
			dataIndex : 'memorySize',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				if(record.get('memorySizeFlag') == '1'){
					return '<span style="background:red">'+value+'</span>';
				}else{
					return value;
				}
			}
		}, {
			header : '内存高亮显示标示',
			dataIndex : 'memorySizeFlag',
			hidden : true
		}, {
			header : 'CPU占有率',
			width : 130,
			sortable : true,
			dataIndex : 'cpuRate',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				if(record.get('cpuRateFlag') == '1'){
					return '<span style="background:red">'+value+'%</span>';
				}else{
					return value+'%';
				}
			}
		}, {
			header : 'CPU高亮显示标示',
			dataIndex : 'cpuRateFlag',
			hidden : true
		}, {
			header : '重定向报文个数',
			width : 130,
			sortable : true,
			dataIndex : 'redirectMessageCount',
			renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
				if(record.get('redirectMessageCountFlag') == '1'){
					return '<span style="background:red">'+value+'</span>';
				}else{
					return value;
				}
			}
		}, {
			header : '重定向报文个数高亮显示标示',
			dataIndex : 'redirectMessageCountFlag',
			hidden : true
		}, {
			header : 'DNS时延',
			width : 130,
			sortable : true,
			dataIndex : 'dnsDelay'
		}, {
			header : '服务器响应时延',
			width : 130,
			sortable : true,
			dataIndex : 'serverResponseDelay'
		}];
		
		this.basicWorkStateGrid = new Ext.ux.Grid({
			dataMethod:'webCacheAction.getBasicWorkState',
			columns:basicWorkStateColumns,
			root : 'result',
			height:150,
			fetchSize:10,
			frame : false,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			showPagingBar : false,
			columnLines : true,
			tbar : [{
				text : '设定阀值',
				iconCls: 'dataTableList-modify-icon', 
				handler : function() {
					self.setThreshold();
				}
			}]
		});
		
		var businessStateColumns = [ new Ext.grid.RowNumberer(),  {
			header : 'TOPN首页打开时延',
			width : 130,
			sortable : true,
			dataIndex : 'topnDelay'
		}, {
			header : '返回代码比例-5XX',
			width : 130,
			sortable : true,
			dataIndex : 'returnCodeRate5xx'
		}, {
			header : '返回代码比例-2XX',
			width : 130,
			sortable : true,
			dataIndex : 'returnCodeRate2xx'
		}, {
			header : '返回代码比例-4XX',
			width : 130,
			sortable : true,
			dataIndex : 'returnCodeRate4xx'
		}];
		
		this.businessStateGrid = new Ext.ux.Grid({
			dataMethod:'webCacheAction.getBusinessState',
			columns:businessStateColumns,
			root : 'result',
			height:150,
			fetchSize:10,
			frame : false,
			border: false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			showPagingBar : false,
			columnLines : true
		});
		
		this.panel = new Ext.Panel({
			autoScroll : true,
			border: false,
			bodyBorder: false,
			items : [{
				items : [{
						xtype : 'fieldset',
						title : '基本工作状态',
						autoHeight : true,
						layout : 'column',
						items : [this.basicWorkStateGrid]
					
					},{
						xtype : 'fieldset',
						title : '业务状态',
						autoHeight : true,
						layout : 'column',
						items : [this.businessStateGrid]
					}
				 ]
			}]
		});
		
	},
	getGridData : function(data) {
		this.data = data;
		
		this.basicWorkStateGrid.updateParams(data);
		this.businessStateGrid.updateParams(data);
		
		refreshGrid = this.basicWorkStateGrid;
	},
	setThreshold : function() {
		var cacheEvaluateSetThresholdId = new Ext.form.TextField({
			name : 'cacheEvaluateSetThresholdId',
			width : 150,
			fieldLabel : '主键',
			allowBlank : false,
			hidden : true
		});
		var diskSpace = new Ext.form.TextField({
			name : 'diskSpace',
			width : 150,
			fieldLabel : '磁盘空间',
			allowBlank : false
		});
		var memorySize = new Ext.form.TextField({
			name : 'memorySize',
			width : 150,
			fieldLabel : '内存',
			allowBlank : false
		});
		var cpuRate = new Ext.form.TextField({
			name : 'cpuRate',
			width : 150,
			fieldLabel : 'CPU占有率',
			allowBlank : false
		});
		var redirectMessageCount = new Ext.form.TextField({
			name : 'redirectMessageCount',
			width : 150,
			allowBlank : false,
			fieldLabel : '重定向报文个数'
		});
		var formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			height :240,
			autoWidth: true,
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [cacheEvaluateSetThresholdId,diskSpace,memorySize,cpuRate,redirectMessageCount]
		});
		
		var cacheType = 'webcache';
		M.rpc._call(getThresholdCallBack,'webCacheAction.getThreshold',cacheType);
		
		function getThresholdCallBack(result){
			formPanel.getForm().setValues(result);
		}
		
		var mapdata = this.data;
		
		var mywindow = new Ext.Window( { 
			title :'阀值',
			border :true, 
			buttonAlign:'center',
			modal:true,
			width:300,
			height:260,
			items : [formPanel],
			buttons : [{
				text : '保存',
				handler : function(){
					saveThreshold(mywindow,mapdata);
				}
			},{
				text : '取消',
				handler : function(){
				mywindow.close();
			}
			}]
		});
		
		mywindow.show();
		
		function saveThreshold(mywindow,mapdata){
			var threshold = {};
			threshold.id = formPanel.getForm().findField('cacheEvaluateSetThresholdId').getValue();
			threshold.diskSpace = formPanel.getForm().findField('diskSpace').getValue();
			threshold.memorySize = formPanel.getForm().findField('memorySize').getValue();
			threshold.cpuRate = formPanel.getForm().findField('cpuRate').getValue();
			threshold.redirectMessageCount = formPanel.getForm().findField('redirectMessageCount').getValue();
			threshold.cacheType = 'webcache';
			M.rpc._call(saveThresholdCallBack,'webCacheAction.saveThreshold', {
				javaClass : 'java.util.HashMap',
				map : threshold
			});
			function saveThresholdCallBack(result){
				refreshGrid.updateParams(mapdata);
				mywindow.close();
			}
		}
	},
	render : function(div) {
		this.panel.render(div);
	},
	refresh : function(data) {
		this.getGridData(data);
	}
});