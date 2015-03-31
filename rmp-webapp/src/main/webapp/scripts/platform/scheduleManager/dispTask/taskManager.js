/**
 * 调度任务管理 用展现目前系统中任务及对其进行管理操作
 */

//调度策略数据字典
var policyName = new Ext.ux.seraph.DictCombo( {
	name : 'policyname',
	fieldLabel : '调度策略',
	allowBlank : false,
	url : 'dispatchPolicyProvider.do',
	displayField : 'policyName',
	valueField : 'policyID',
	width : 150
});
//运行状态数据字典
var operatingState = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=OPERATING_STATE',
	displayField : 'parmName',
	valueField : 'parmCode'
});
//所属场景
var sceneField = new Ext.ux.seraph.DictCombo( {
	name:'scene',
	url : 'parmInfoProvider.do?parmType=DOMAIN_DISPATCH_SENCE',
	width:160,
	displayField : 'parmName',
	valueField : 'parmCode'
});
//省份数据字典
var provinceField = new Ext.ux.seraph.DictCombo( {
	name:'province',
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	  //value : '510000',
    value : orgCode,
});


//定义查询按钮
var search = new Ext.Button({
	text : '<span style="margin-left:20px;">查询</span>',
	cls:'search-button',
	minWidth:82,
	height:27,
	handler : upData
});
var reset = new Ext.Button({
	text : '<span style="margin-left:20px;">刷新</span>',
	cls: 'refresh-button', 
	minWidth:82,
	height:27,
	handler : function()
	{
		var tbar = taskGrid.getTopToolbar();
		var queryFields = tbar.findByType('field');
		for(var i = 0; i < queryFields.length;i++)
		{
			queryFields[i].reset();
		}
		upData();
	}
});

var pause = new Ext.Button({
	text : '暂停',
	iconCls: 'pause-icon', 
	handler : pauseDispatchTask
});
var recover = new Ext.Button({
	text : '恢复',
	iconCls: 'restart-icon', 
	handler : recoverDispatchTask
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delDispatchTask
});

var toolbar = [pause,'-',recover,'-',del,'-',
    {text : '关注省份'}, 
   	provinceField,
	{text : '调度场景'}, 
	sceneField,
	search, '-', reset 
  ];

function openDispatchTab(taskid){
	var data = {};
	data.taskid = taskid;
	var conf = {
			href : 'domainDispatchTaskDetail.do?uxParams='+ encodeURI(Ext.encode(data)),
			text:  '调度详细信息',
			icon: '',
			tipinfo: ''
		};
	Main.fun.openWin(conf, 'tab');
}

//选取方式:单选
var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
// 定义展示列
var taskColumns = [ new Ext.grid.RowNumberer(), sm,{
	header : 'taskId',
	sortable : true,
	hidden : true,
	dataIndex : 'taskId'
}, {
	header : '任务名称',
	width : 200,
	sortable : true,
	dataIndex : 'taskName',
	renderer: function(v, p, record, rowIndex, index, store){
		var taskid = record.data.taskId;
		return ['<a href="#" onclick="openDispatchTab(\''+taskid+'\')"><span>', v , '</span></a>&nbsp;'].join('');
	 }
}, {
	header : '关注省份',
	width : 100,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(provinceField),
	dataIndex : 'province',
}, {
	header : '包含域名数量',
	width : 100,
	sortable : true,
	dataIndex : 'dispatchDomainNum',
}, {
	header : '所属场景',
	width : 130,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(sceneField),
	dataIndex : 'scene'
}, {
	header : '调度策略',
	width : 140,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(policyName),
	dataIndex : 'policy'
}, {
	header : '时间周期',
	width : 80,
	sortable : true,
	dataIndex : 'cycle',
	renderer : function(value){
		var arr = value.split(' ');
		return arr[2]+'时'+arr[1]+'分';
	}
}, {
	header : '下发时间',
	width : 130,
	sortable : true,
	dataIndex : 'issueTime'
}, {
	header : '最后批次日期',
	width : 130,
	sortable : true,
	dataIndex : 'lastBatchTime'
}, {
	header : '运行状态',
	width : 80,
	sortable : true,
	dataIndex : 'status',
	renderer : Ext.ux.renderer.Combo(operatingState)
}];

//定义展示列表
var taskGrid = new Ext.ux.Grid( {
	dataMethod : 'dispTaskAction.getTaskDetailList',
	columns : taskColumns,
	frame : false,
	height : 330,
	width : 520,
	fetchSize : 20,
	columnLines : true,
	sortBar : false,
	viewData : true,
	sm : sm,
	tbar : toolbar
});



//暂停任务
function pauseDispatchTask(){
	var record = taskGrid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	if(record.data.state == '3'){
		Ext.Msg.alert('温馨提示','该任务还未启动，不能暂停');
		return;
	}else if(record.data.state == '2'){
		Ext.Msg.alert('温馨提示','该任务已经暂停');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要暂停任务',function(btn){
		if(btn == 'yes'){
			var data = {};
			data.taskId = record.data.taskId;
			data.scene = record.data.scene;
	    	M.rpc._call(pauseCallBack,'dispTaskAction.onBoPause',{javaClass : 'java.util.HashMap',map:data});
	    }
		function pauseCallBack(result){
			if(result == true){
				Main.fun.showTipWindow('暂停成功','comment','温馨提示');
			}else{
				Main.fun.showTipWindow('暂停失败,请重新暂停','comment','温馨提示');
			}
			upData();
		}
	});
}

//恢复任务
function recoverDispatchTask(){
	var record = taskGrid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	if(record.data.state == '1'){
		Ext.Msg.alert('温馨提示','该任务正在运行中,无需恢复');
		return;
	}else if(record.data.state == '3'){
		Ext.Msg.alert('温馨提示','该任务还未启动,请先启动');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要恢复任务',function(btn){
		if(btn == 'yes'){
			var data = {};
			data.taskId = record.data.taskId;
			data.scene = record.data.scene;
	    	M.rpc._call(recoverCallBack,'dispTaskAction.onBoRecover',{javaClass : 'java.util.HashMap',map:data});
	    }
		function recoverCallBack(result){
			if(result == true){
				Main.fun.showTipWindow('恢复成功','comment','温馨提示');
			}else{
				Main.fun.showTipWindow('恢复失败,请重新恢复','comment','温馨提示');
			}
			upData();
		}
	});
}

function delDispatchTask(){
	var record = taskGrid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要删除任务',function(btn){
		if(btn == 'yes'){
			var data = {};
			data.taskId = record.data.taskId;
			data.scene = record.data.scene;
	    	M.rpc._call(recoverCallBack,'dispTaskAction.onBoDel',{javaClass : 'java.util.HashMap',map:data});
	    }
		function recoverCallBack(result){
			if(result == true){
				Main.fun.showTipWindow('删除成功','comment','温馨提示');
			}else{
				Main.fun.showTipWindow('删除失败,请重新恢复','comment','温馨提示');
			}
			upData();
		}
	});
}

//查询方法
function upData() {
	var data = getData();
	updateGrid(data);
}

function getData() {
	var tbar = taskGrid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = {};
	for(var i = 0; i < queryFields.length;i++)
	{
		data[queryFields[i].getName()] = queryFields[i].getValue();
	}
	return data;
}

function updateGrid(data) {
	taskGrid.setParams(data);
	taskGrid.doSearchList();
}
Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var panel = new Ext.Panel({
		renderTo : 'user-grid',
		layout : 'fit',
		autoScroll : true,
		//frame : true,
		border: false,
		bodyBorder: false,
		items : [taskGrid]
	});
	taskGrid.setHeight(Ext.get("content").getHeight());
	taskGrid.setWidth(Ext.get("content").getWidth());
	
	upData();
});