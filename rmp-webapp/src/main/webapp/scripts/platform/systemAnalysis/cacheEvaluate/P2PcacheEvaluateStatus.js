/**
 *  工作状态
 * */
var refreshGrid;
var mydata;
base.portal.P2PcacheEvaluateStatus = Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/PieData.js'],
	init : function(params) {
	 			var columns = [ 
				    new Ext.grid.RowNumberer(),
	               {
				   	   header:'重定向成功率',
					   dataIndex:'redirectSuccessRate',
					   hidden:false,
					   width: 90
				   }, {
						header: '大文件平均下载速度(KB/S)',
						width: 160,
						sortable: true,
						dataIndex: 'bigFileAvgDownLoadSpeed',
						hidden: false
						
					}
		              ];
	 			
	 			var columns1 = [ 
	 						    new Ext.grid.RowNumberer(),
	 			               {
	 						   	   header:'流量',
	 							   dataIndex:'cacheFlow',
	 							   hidden:false,
	 							   width: 90
	 						   }, {
	 								header: '磁盘空间',
	 								width: 80,
	 								sortable: true,
	 								dataIndex: 'diskSpace',
	 								hidden: false,
	 								renderer : function(value, cellmeta, record, rowIndex, columnIndex, store){
		 								if(record.get('memorySizeFlag') == '1'){
		 									return '<span style="background:red">'+value+'</span>';
		 								}else{
		 									return value;
		 								}
		 							}
	 							},
	 							{
	 						   	   header:'内存',
	 							   dataIndex:'memorySize',
	 							   hidden:false,
	 							   width: 90
	 						   }, {
	 								header: 'CPU占用率',
	 								width: 80,
	 								sortable: true,
	 								dataIndex: 'cpuRate',
	 								hidden: false
	 							},
	 							{
	 						   	   header:'重定向报文个数',
	 							   dataIndex:'redirectMessageCount',
	 							   hidden:false,
	 							   width: 90
	 						   }, {
	 								header: '监听报文个数',
	 								width: 80,
	 								sortable: true,
	 								dataIndex: 'monitorMessageCount',
	 								hidden: false
	 								
	 							}
	 				              ];
	 			this.data = {};
	 			var self=this;
		    	
		    	this.grid = new Ext.ux.Grid({
		  	    	dataMethod:'p2PcacheEvaluateAction.getP2PAnalysisWorkStatus',
		  	    	frame : false,
					border: false,
		  			columns:columns1,
		  	    	columnLines : true,
		  	    	fetchSize : 15,
		  	    	height:150,
		  			tbar : [ '-',{
						text : '设定阀值',
						iconCls: 'dataTableList-modify-icon', 
						handler : function() {
		  					inputFunction();
						}
					},'-']
		  			});	
		    	
		    	this.detailGrid = new Ext.ux.Grid( {
		    		dataMethod:'p2PcacheEvaluateAction.getP2PAnalysisBizStatus',
		    		frame : false,
					border: false,
		  			columns:columns,
		  	    	columnLines : true,
		  	    	fetchSize : 15,
		  	    	height:150
				});
		    	
		    	this.panel= new Ext.Panel({
					autoScroll : true,
					border: false,
					bodyBorder: false,
					items : [{
						items : [{
								xtype : 'fieldset',
								title : '基本工作状态',
								autoHeight : true,
								layout : 'column',
								items : [this.grid]
							
							},{
								xtype : 'fieldset',
								title : '业务状态',
								autoHeight : true,
								layout : 'column',
								items : [this.detailGrid]
							}
						 ]
					}]
				});
	 
					
	},
	render : function(div) {
		var obj = (Ext.getDom(div));
		this.panel.width = obj.offsetWidth;
		this.panel.height = obj.offsetHeight;
		this.panel.render(div);
	},
	refresh : function(data) {
		refreshGrid = this.grid;
		mydata = data;
		this.grid.updateParams(data);
		this.detailGrid.updateParams(data);
	}
});

function inputFunction(){
	
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
		items: [diskSpace,memorySize,cpuRate,redirectMessageCount]
	});
	
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
		    	var threshold = {};
				threshold.diskSpace = formPanel.getForm().findField('diskSpace').getValue();
				threshold.memorySize = formPanel.getForm().findField('memorySize').getValue();
				threshold.cpuRate = formPanel.getForm().findField('cpuRate').getValue();
				threshold.redirectMessageCount = formPanel.getForm().findField('redirectMessageCount').getValue();
				threshold.cacheType = 'P2PCache';
		    	M.rpc._call(saveThresholdCallBack,'p2PcacheEvaluateAction.saveThreshold', {
					javaClass : 'java.util.HashMap',
					map : threshold
				});
		    	function saveThresholdCallBack(result){
		    		refreshGrid.updateParams(mydata);
		    		mywindow.close();
				}
	    		
			}
		 },{
			text : '取消',
			handler : function(){
				mywindow.close();
		 	}
		}]
    });
	
	mywindow.show();
	
}