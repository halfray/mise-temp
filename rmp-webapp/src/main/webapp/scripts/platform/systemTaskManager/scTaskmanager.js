var ipManagerformPanel;
var systemSignField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var operatingState = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=OPERATING_STATE',
	displayField : 'parmName',
	valueField : 'parmCode'
});
var userColumns = [ new Ext.grid.RowNumberer(),/*new Ext.grid.CheckboxSelectionModel(),*/ {
		header : 'ID',
		sortable : true,
		hidden : true,
		dataIndex : 'taskmanager_id'
	}, {
		header : '任务名称',
		width : 120,
		sortable : true,
		dataIndex : 'jobName'
	}, {
		header : '频率',
		width : 100,
		sortable : true,
		dataIndex : 'cronExpression'
	}, {
		header : '所要启动任务的类名称',
		sortable : true,
		width : 500,
		dataIndex : 'className'
	}, {
		header : '是否有效',
		width : 80,
		sortable : true,
		hidden : true,
		dataIndex : 'jobIsvalid'/*,
		renderer: Ext.ux.renderer.Combo(systemSignField)*/
	}, {
		header : '开始时间',
		width : 150,
		sortable : true,
		dataIndex : 'startTime'
	}, {
		header : '运行状态',
		width : 80,
		sortable : true,
		dataIndex : 'jobstate',
		renderer: Ext.ux.renderer.Combo(operatingState)
	}, {
		header : '触发器名称',
		sortable : true,
		hidden : true,
		dataIndex : 'cronTrigger'
	}];

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
		var tbar = grid.getTopToolbar();
		var queryFields = tbar.findByType('field');
		for(var i = 0; i < queryFields.length;i++)
		{
			queryFields[i].reset();
		}
		upData();
	}
});

var add = new Ext.Button({
	text : '添加',
	iconCls: 'dataTableList-add-icon', 
	handler : addSystemTasks
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editSystemTasks
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delSystemTasks
});
var start = new Ext.Button({
	text : '启动',
	iconCls: 'control-icon', 
	handler : startSystemTasks
});
var pause = new Ext.Button({
	text : '暂停',
	iconCls: 'pause-icon', 
	handler : pauseSystemTasks
});
var recover = new Ext.Button({
	text : '恢复',
	iconCls: 'restart-icon', 
	handler : recoverSystemTasks
});

var jobName = new Ext.form.TextField({
	name : 'jobName',
	width : 120
});

var toolbar = [ add,'-',edit,'-',del,'-',start,'-',pause,'-',recover,'-',{
	text : '任务名称'
	}, 
	jobName,
	search, '-', reset 
  ];

var grid = new Ext.ux.Grid( {
	dataMethod : 'systemTaskManagerAction.getSystemTasks',
	columns : userColumns,
	border : false,
	frame : false,
	fetchSize : 20,
	columnLines : true,
	sm : new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true
	}),
	tbar : toolbar,
	colspan : 8,
	listeners : {
		dblclick : function(){
			editSystemTasks();
		}
	}
});


function upData() {
	var data = getData();
	updateGrid(data);
}

function getData() {
	var tbar = grid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = {};
	for(var i = 0; i < queryFields.length;i++)
	{
		data[queryFields[i].getName()] = queryFields[i].getValue();
	}
	return data;
}

function updateGrid(data) {
	grid.setParams(data);
	grid.doSearchList();
}

var formPanel;
function getFormPanel(){
	if(Ext.isEmpty(formPanel)){
		
		var id = new Ext.form.TextField({
			name : 'taskmanager_id',
			fieldLabel : 'ID',
			hidden : true
		});
		var jobName = new Ext.form.TextField({
			name : 'jobName',
			width : 150,
			fieldLabel : '任务名',
			allowBlank : false,
			listeners : {
				change : function(oldvalue,newvalue){
					var map = {};
					map.jobName = newvalue;
					var message = M.rpc._call("systemTaskManagerAction.checkJobName",{javaClass : 'java.util.HashMap',map : map});
					if(message != null){
						Ext.Msg.alert('温馨提示',message);
						getFormPanel().getForm().findField("jobName").setValue('');
						return;
					}
				}
			}
		});
		var cronExpression = new Ext.form.TextField({
			name : 'cronExpression',
			width : 150,
			allowBlank : false,
			fieldLabel : '定时方式'
		});
		var cronTrigger = new Ext.form.TextField({
			name : 'cronTrigger',
			width : 150,
			hidden : true,
			fieldLabel : '触发器名称'
		});
		var className = new Ext.form.TextField({
			name : 'className',
			width : 150,
			allowBlank : false,
			fieldLabel : '类名称'
		});
		var jobIsvalid = new Ext.ux.seraph.DictCombo( {
			name : 'jobIsvalid',
			fieldLabel : '是否启动',
			allowBlank : false,
			url : 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',
			displayField : 'codeLabel',
			valueField : 'codeValue',
			width : 150
		});
		formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
			autoWidth: true,
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			//defaults: {width: grid.formItemWith},
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [id,jobName,className,{
				xtype : 'panel',
				baseCls: 'x-plain',
				layout : 'column',
				items : [ {
					columnWidth : .98,
					xtype : 'panel',
					layout : 'form',
					baseCls: 'x-plain',
					items : [cronExpression]},{
								xtype : 'button',
								text : ' ',
								iconCls:'x-button-style',
								handler:function(){
									getCronExpressionComment();
								}
							} ]
	          },jobIsvalid,cronTrigger]
		});
		
	}
	return formPanel;
}

var commentWindows;
function getCronExpressionComment(){
	if(!Ext.isEmpty(commentWindows)){
		commentWindows.close();
	}
	var commentPanel = new Ext.Panel({
		baseCls: 'x-plain',
		autoHeight :true,
        autoWidth: true,
        bodyStyle:'padding:10px; border: 0px solid;',
		autoScroll: true,
		bodyBorder: false,
		border: false
    });
	
	 var html = "定时方式：</br>"; 
	  html += "" +
	  		"下面是一些完整的例子:  表达式 含义  </br> " +
	  		"0 0 12 * * ? 每天中午十二点触发  </br>" +
	  		"0 15 10 ? * MON-FRI 每个周一、周二、周三、周四、周五的10：15触发  </br>" +
	  		"0 15 10 15 * ? 每月15号的10：15触发  </br>" +
	  		"0 15 10 L * ? 每月的最后一天的10：15触发  </br>"
	  commentPanel.html = html;
	  
	  commentWindows = new Ext.Window({
  		xtype : "window",
  		title : "定时方式说明",
  		//x : 720,
  		x : windows.x+285,
  		y : windows.y,
  		width : 285,
  		height : 232,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [commentPanel ]
  	  });
	  
	  commentWindows.show();
}

var windows;
function addSystemTasks(){
	var formPanel = getFormPanel();
	formPanel.getForm().reset();
	
	var fields = formPanel.findByType('field');
	for(var i = 0; i < fields.length;i++)
	{
		fields[i].setValue('');
	}
	
	if(Ext.isEmpty(windows))
		{
    	windows = new Ext.Window({
    		xtype : "window",
    		title : "添加记录",
    		width : 320,
    		height : 260,
    		border: false,
    		bodyBorder: false,
    		autoScroll : true,
    		closeAction : 'hide',
    		items : [formPanel ],
    		buttons : [{
    			text : '保存',
            	handler : function(){
    				onBoSave(windows);
    			}
    		},{
    			text : '取消',
            	handler : function(){
    				windows.hide();
    				commentWindows.close();
    			}
    		}]
    	});
		}
	windows.show();
}

function editSystemTasks(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请先选中一条数据');
		return;
	}
	var formPanel = getFormPanel();
	
	if(Ext.isEmpty(windows)){
		windows = new Ext.Window({
			xtype : "window",
			title : "修改记录",
			width : 320,
			height : 260,
			border: false,
			bodyBorder: false,
			autoScroll : true,
			items : [formPanel],
			buttons : [{
				text : '保存',
				handler : function(){
					onBoSave(windows);
				}
			},{
				text : '取消',
				handler : function(){
					windows.hide();
					commentWindows.close();
			}
			}]
		});
	}
	formPanel.getForm().reset();
	formPanel.getForm().setValues(record.json);
	windows.show();
}

function onBoSave(windows){
	var form = getFormPanel().getForm();
	if(form.isValid()){
		var data = {};
		var taskmanager_id = form.findField('taskmanager_id').getValue();
		var jobName = form.findField('jobName').getValue();
		var cronExpression = form.findField('cronExpression').getValue();
		var jobIsvalid = form.findField('jobIsvalid').getValue();
		var className = form.findField('className').getValue();
		data.taskmanager_id = taskmanager_id;
		data.jobName = jobName;
		data.cronExpression = cronExpression;
		data.cronTrigger = jobName+'Trigger';
		data.className = className;	
		data.jobIsvalid = jobIsvalid;
		if(jobIsvalid == '1'){
			data.jobstate = '1';
		}else{
			data.jobstate = '3';
		}
		data.startTime = new Date().format('Y-m-d H:i:s');
		
		M.rpc._call(saveCallBack,'systemTaskManagerAction.saveSystemTask', {
			javaClass : 'java.util.HashMap',
			map : data
		});
		
	}
	function saveCallBack(result){
		if(result){
			var tbar = grid.getTopToolbar();
			var queryFields = tbar.findByType('field');
			var data = {};
			for(var i = 0; i < queryFields.length;i++)
			{
				data[queryFields[i].getName()] = queryFields[i].getValue();
			}
			grid.setParams(data);
			grid.doSearchList();
			windows.hide();
			form.reset();
			if(jobIsvalid == '1'){
				showTipWindow('保存成功,任务已运行','comment','温馨提示');
			}else{
				showTipWindow('保存成功','comment','温馨提示');
			}
		}
	}
}

function delSystemTasks(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.taskmanager_id = record.data.taskmanager_id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	M.rpc._call(delCallBack,'systemTaskManagerAction.delSystemTask',{
	    		javaClass : 'java.util.HashMap',map : data
	    	});
	    }
		function delCallBack(result){
			if(result){
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				grid.setParams(data);
				grid.doSearchList();
				showTipWindow('删除成功','comment','温馨提示');
			}
		}
	});
}

function startSystemTasks(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	/*if(record.data.jobIsvalid == '0'){
		Ext.Msg.alert('温馨提示','该任务未生效,不能启动');
		return;
	}*/
	
	if(record.data.jobstate == '1'){
		Ext.Msg.alert('温馨提示','该任务已经启动,正在运行中');
		return;
	}else if(record.data.jobstate == '2'){
		Ext.Msg.alert('温馨提示','该任务已经启动,暂停中...,请点击恢复,启动该任务');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要启动任务',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.taskmanager_id = record.data.taskmanager_id;
	    	data.jobName = record.data.jobName;
	    	data.cronTrigger = record.data.cronTrigger;
	    	data.cronExpression = record.data.cronExpression;
	    	data.className = record.data.className;
	    	data.jobstate = '1';
	    	M.rpc._call(pauseCallBack,'systemTaskManagerAction.startSystemTask',{
	    		javaClass : 'java.util.HashMap',map : data
	    	});
	    }
		function pauseCallBack(result){
			
			var tbar = grid.getTopToolbar();
			var queryFields = tbar.findByType('field');
			var data = {};
			for(var i = 0; i < queryFields.length;i++)
			{
				data[queryFields[i].getName()] = queryFields[i].getValue();
			}
			grid.setParams(data);
			grid.doSearchList();
			
			if(result == "开启成功"){
				showTipWindow('开启成功','comment','温馨提示');
			}else{
				showTipWindow('开启失败,请重新开启','comment','温馨提示');
			}
		}
	});
}

function pauseSystemTasks(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	if(record.data.jobstate == '3'){
		Ext.Msg.alert('温馨提示','该任务还未启动，不能暂停');
		return;
	}else if(record.data.jobstate == '2'){
		Ext.Msg.alert('温馨提示','该任务已经暂停');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要暂停任务',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	var data = {};
	    	data.taskmanager_id = record.data.taskmanager_id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	//2为暂停
	    	data.jobstate = '2';
	    	M.rpc._call(pauseCallBack,'systemTaskManagerAction.pauseSystemTask',{
	    		javaClass : 'java.util.HashMap',map : data
	    	});
	    }
		function pauseCallBack(result){
			if(result == "暂停成功"){
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				grid.setParams(data);
				grid.doSearchList();
				showTipWindow('暂停成功','comment','温馨提示');
			}else{
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				grid.setParams(data);
				grid.doSearchList();
				showTipWindow('暂停失败,请重新暂停','comment','温馨提示');
			}
		}
	});
}

function recoverSystemTasks(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	if(record.data.jobstate == '1'){
		Ext.Msg.alert('温馨提示','该任务正在运行中,无需恢复');
		return;
	}else if(record.data.jobstate == '3'){
		Ext.Msg.alert('温馨提示','该任务还未启动,请先启动');
		return;
	}
	
	Ext.Msg.confirm('温馨提示','是否要恢复任务',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.taskmanager_id = record.data.taskmanager_id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	//1为运行
	    	data.jobstate = '1';
	    	M.rpc._call(pauseCallBack,'systemTaskManagerAction.recoverSystemTask',{
	    		javaClass : 'java.util.HashMap',map : data
	    	});
	    }
		function pauseCallBack(result){
			if(result == "恢复成功"){
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				grid.setParams(data);
				grid.doSearchList();
				showTipWindow('恢复成功','comment','温馨提示');
			}else{
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				grid.setParams(data);
				grid.doSearchList();
				showTipWindow('恢复失败,请重新恢复','comment','温馨提示');
			}
		}
	});
}

//显示提示窗口
function showTipWindow(tipinfo,iconCls,title,time){
	var window = new Ext.Window( {
		width : 250,
		height : 150,
		shadow : false,
		html : tipinfo,
		title : "温馨提示:"
	});
	window.iconCls = iconCls; 
	window.title = title;
	function show() {
		this.el.alignTo(Ext.getBody(), 'br-br');
		this.el.fadeIn('b', {
			easing : 'easeOut',
			endOpacity: 1, 
			duration: 5,
			callback : function() {
				alert();
				this.close.defer(time, this); // 定时关闭窗口
		},
		scope : this,
		duration : 1
		});

	}
	function hide() {
		if (this.isClose === true) { // 防止点击关闭和定时关闭处理
			return false;
		}
		this.isClose = true;
		this.el.fadeOut('b', {
			easing : 'easeOut',
			callback : function() {
				this.un('beforeclose', hide, this);
				this.close();
			},
			scope : this,
			duration : 2
		});
		return false;
	}
	window.on('show', show, window);
	window.on('beforeclose', hide, window);
	window.show();
	var delay = new Ext.util.DelayedTask(function(){
		window.close();
	});
	delay.delay(3000);
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
		items : [grid]
	});
    grid.setHeight(Ext.get("content").getHeight());
    grid.setWidth(Ext.get("content").getWidth());
    
});