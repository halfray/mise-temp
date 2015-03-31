
function openQueryWindow(taskNo){
	var data = {};
	data.taskID = taskNo;
	
	autoCheckedTask(data);
	
	function autoCheckedTask(data){
		M.rpc._call(success, 'exceptionFlowCheckedAction.autoCheckedTask',{
			javaClass : 'java.util.HashMap',
			map : data
		});
	}
	
	var time = 1000;
	function success(data){
		var taskMask; 
		var scanTime = 10000;
		time += scanTime;
		if(time >= 30*scanTime){ //五分钟后结束扫描
	        taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
	        taskMask.hide();
	        Ext.MessageBox.alert("提示", '数据超时，未返回实时结果!');
			time = 1000;
			return;
		}
	    if (data.flag > 0 ) {
	    	getListData(data);
	    	taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
	        taskMask.hide();
			time = 1000;
	    }else {     
			Ext.Msg.alert('提示信息','该任务数据未上报,请稍后查询');
	    }            
	}
}
var operator = new Ext.ux.seraph.DictCombo( {
	url: 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField: 'codeLabel',
	valueField: 'codeValue'
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
function getListData(data){
	var booleanValue = new Ext.ux.seraph.DictCombo( {
		url : 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',
		displayField : 'parmName',
		valueField : 'parmCode'
	});
	
	var listColumns = [new Ext.grid.RowNumberer(), {
		header: '任务号',
		width: 120,
		sortable: true,
		hidden: true,
		dataIndex: 'taskNo'
	}, {
		header: '资源',
		width: 120,
		sortable: true,
		dataIndex: 'url'
	}, {
		header: '原始大小(byte)',
		width: 120,
		sortable: true,
		dataIndex: 'realSize',
		renderer: function(v, p, record, rowIndex, index, store){
			var taskNo = record.data.taskNo;
			var url = record.data.url;
			var hostIp = record.data.hostIp;
			return ['<a href="#" onclick="getListData2(\''+taskNo+'\',\''+url+'\',\''+hostIp+'\')"><span>', v , '</span></a>&nbsp;'].join('');
		}
	}, {
		header: '广东Cache大小(byte)',
		width: 120,
		sortable: true,
		dataIndex: 'gdCacheSize',
		renderer: function(v, p, record, rowIndex, index, store){
			var taskNo = record.data.taskNo;
			var url = record.data.url;
			var gdHostIp = record.data.gdHostIp;
			return ['<a href="#" onclick="getListData2(\''+taskNo+'\',\''+url+'\',\''+gdHostIp+'\')"><span>', v , '</span></a>&nbsp;'].join('');
		}
	}, {
		header: '四川Cache大小(byte)',
		width: 120,
		sortable: true,
		dataIndex: 'sichuanCacheSize',
		renderer: function(v, p, record, rowIndex, index, store){
			var taskNo = record.data.taskNo;
			var url = record.data.url;
			var sichuanHostIp = record.data.sichuanHostIp;
			return ['<a href="#" onclick="getListData2(\''+taskNo+'\',\''+url+'\',\''+sichuanHostIp+'\')"><span>', v , '</span></a>&nbsp;'].join('');
		}
	}, {
		header: '是否相同',
		width: 80,
		sortable: true,
		dataIndex: 'same',
		renderer: Main.fun.booleanToStr
	}, {
		header: '差异率',
		width: 80,
		sortable: true,
		dataIndex: 'rate',
		renderer: function(v){
			if(v>0.02){
				return "<font color='red'>"+Main.fun.getPerByReal(v)+"</font>";
			}else{
				return Main.fun.getPerByReal(v);
			}
			
		}
	},{
		header: 'hostIp',
		width: 120,
		sortable: true,
		hidden: true,
		dataIndex: 'hostIp'
	},{
		header: 'gdHostIp',
		width: 120,
		sortable: true,
		hidden: true,
		dataIndex: 'gdHostIp'
	},{
		header: 'sichuanHostIp',
		width: 120,
		sortable: true,
		hidden: true,
		dataIndex: 'sichuanHostIp'
	}];

	var listGrid = new Ext.ux.Grid( {
		dataMethod : 'exceptionFlowCheckedAction.getReturnList',
		columns : listColumns,
		border : false,
		frame : false,
		fetchSize : 15,
		height : 368,
		columnLines : true,
		sortBar : false,
		colspan : 8,
		viewData : false
	});
	var detailWin = new Ext.Window({
		title : '任务结果',
		xtype : "window",
		width : 700,
		height : 420,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		closeAction : 'hide',
		items : [listGrid ]
	});
	listGrid.setParams(data);
	listGrid.doSearchList();
	detailWin.show();
	
	
}

function getListData2(taskID, url, ip){
	
	var listColumns = [new Ext.grid.RowNumberer(), {
		header: 'IP',
		width: 120,
		sortable: true,
		dataIndex: 'ip'
	},{
		header: '所属运营商',
		width: 120,
		sortable: true,
		dataIndex: 'operator',
		renderer:Ext.ux.renderer.Combo(operator)
	},{
		header: '所属区域',
		width: 120,
		sortable: true,
		dataIndex: 'lacation',
		renderer:Ext.ux.renderer.Combo(province)
	},{
		header: '所属系统',
		width: 120,
		sortable: true,
		dataIndex: 'system',
		renderer:Ext.ux.renderer.Combo(system)
	}];

	var listGrid = new Ext.ux.Grid( {
		dataMethod : 'exceptionFlowCheckedAction.getCheckedIPList',
		columns : listColumns,
		border : false,
		frame : false,
		fetchSize : 15,
		height : 368,
		columnLines : true,
		sortBar : false,
		colspan : 8,
		viewData : false
	});
	var detailWin = new Ext.Window({
		title : '归属信息',
		xtype : "window",
		width : 600,
		height : 420,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		closeAction : 'hide',
		items : [listGrid ]
	});
	var data = {};
	data.taskID = taskID;
	data.url = url;
	data.ip = ip;
	
	listGrid.setParams(data);
	listGrid.doSearchList();
	detailWin.show();
	
	
}

var userColumns = [new Ext.grid.RowNumberer(), {
	header: '任务ID',
	width: 260,
	sortable: true,
	hidden : true,
	dataIndex: 'ID'
}, {
	header: '任务号',
	width: 260,
	sortable: true,
	hidden : true,
	dataIndex: 'taskNo'
}, {
	header: 'URL',
	width: 260,
	sortable: true,
	dataIndex: 'url'
}, {
	header: '探测时间(ms)',
	width: 260,
	sortable: true,
	dataIndex: 'maxRunTime'
}, {
	header: '下发时间',
	width: 260,
	sortable: true,
	dataIndex: 'updateDate'
}, {
	header: '操作',
	width: 260,
	sortable: true,
	dataIndex: 'flag',
	renderer: function(v, p, record, rowIndex, index, store){
		var btn = '查询';
		var taskNo = record.data.taskNo;
		if(v==0){
			return btn='等待上报';
		}else{
			btn='查看结果';
			return ['<a href="#" onclick="openQueryWindow(\''+taskNo+'\')"><span>', btn , '</span></a>&nbsp;'].join('');
		}
	}
}];

var add = new Ext.Button({
	text : '添加',
	iconCls: 'dataTableList-add-icon', 
	handler : addTask
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editTask
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delTask
});

var tbar = [add,'-',{text: 'URL'},
	{
		xtype : 'textfield',
		id : 'url',
		width : 120
	},
	{
		text : '查询',
		iconCls : 'search-button',
		handler : function() {
			updateGrid();
		}
	}, '-', {
		text: '刷新', 
		iconCls: 'refresh-button', 
		handler : function() {
			//Ext.getCmp('taskNo').setValue('');
			Ext.getCmp('url').setValue('');
			updateGrid();
		}
	}];

var grid = new Ext.ux.Grid( {
	dataMethod : 'exceptionFlowCheckedAction.getTaskList',
	columns : userColumns,
	border : false,
	frame : false,
	fetchSize : 20,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	tbar : tbar,
	columnLines : true,
	colspan : 8
});

function updateGrid() {
	var data = getData();
	//autoCheckedTask(data);
	searchGrid(data);
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

function searchGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}

var formPanel;
function getFormPanel(){
	if(Ext.isEmpty(formPanel)){
		
		/*var id = new Ext.form.TextField({
			name : 'ID',
			fieldLabel : 'ID',
			hidden : true
		});*/
		/*var taskNo = new Ext.form.TextField({
			name : 'taskNo',
			width : 150,
			allowBlank : false,
			fieldLabel : '任务号',
			listeners : {
				change : function(value,newvalue,oldvalue){
					var flag = M.rpc._call('exceptionFlowCheckedAction.checkTaskNo',newvalue);
					if(flag > 0){
						Ext.Msg.alert('温馨提示','不能有重复的任务号');
						taskNo.setValue('');
					}
				}
			}
		});*/
		var url = new Ext.form.TextField({
			name : 'url',
			width : 150,
			allowBlank : false,
			fieldLabel : 'URL'
		});
		var maxRunTime = new Ext.form.NumberField({
			name : 'maxRunTime',
			width : 150,
			allowBlank : false,
			fieldLabel : '探测时间(ms)'
		});
		formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
			autoWidth: true,
			labelWidth: 90,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [/*id,taskNo,*/url,maxRunTime]
		});
		
	}
	return formPanel;
}

var windows;
function addTask(){
	var formPanel = getFormPanel();
	formPanel.getForm().reset();
	
	var fields = formPanel.findByType('field');
	for(var i = 0; i < fields.length;i++)
	{
		if(fields[i].getName() != 'maxRunTime'){
			fields[i].setValue('');
		}else{
			fields[i].setValue('120000');
		}
	}
	
	if(Ext.isEmpty(windows)){
		windows = new Ext.Window({
			xtype : "window",
			title : "添加记录",
			width : 310,
			height : 176,
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
				}
			}]
		});
	}else{
		windows.setTitle('添加记录');
	}
	windows.show();
}

function editTask(){
	var record = grid.getSelectionModel().getSelected();
	
	var formPanel = getFormPanel();
	
	if(Ext.isEmpty(windows)){
		windows = new Ext.Window({
			xtype : "window",
			title : "修改记录",
			width : 305,
			height : 170,
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
				}
			}]
		});
	}else{
		windows.setTitle('修改记录');
	}
	
	formPanel.getForm().reset();
	formPanel.getForm().setValues(record.json);
	
	/*formPanel.getForm().findField('taskNo').setReadOnly(true);
	formPanel.getForm().findField('taskNo').addClass('readonly');*/
	
	windows.show();
	
	
}

function onBoSave(windows){
	var form = getFormPanel().getForm();
	if(form.isValid()){
		var data = {};
		//data.id = form.findField('ID').getValue();
		//data.taskNo = form.findField('taskNo').getValue();
		data.url = form.findField('url').getValue();
		data.maxRunTime = form.findField('maxRunTime').getValue();
		data.updateDate = new Date().format('Y-m-d H:i:s');
		
		M.rpc._call(saveCallBack,'exceptionFlowCheckedAction.saveTask', {
			javaClass : 'java.util.HashMap',
			map: data
		});
	}
	
	function saveCallBack(result){
		windows.hide();
		updateGrid();
		if(result == 'success'){
			showTipWindow('保存成功','comment','温馨提示');
		}else{
			showTipWindow('保存失败','comment','温馨提示');
		}
	}
}

function delTask(){
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
			var record = grid.getSelectionModel().getSelected();
			var data = {};
			data.ID = record.data.ID;
			data.taskNo = record.data.taskNo;
			M.rpc._call(delCallBack,'exceptionFlowCheckedAction.delTask', {
				javaClass : 'java.util.HashMap',
				map : data
			});
	    }
	});
	
	function delCallBack(result){
		updateGrid();
		if(result == "success"){
			showTipWindow('删除成功','comment','温馨提示');
		}else{
			showTipWindow('删除失败','comment','温馨提示');
		}
	}
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
	grid.setHeight(Ext.get("content").getHeight());
	var panel = new Ext.Panel({
		renderTo : 'user-grid',
		layout : 'fit',
		autoScroll : true,
		border: false,
		bodyBorder: false,
		items : [grid]
	});
	updateGrid();
});
/*function autoCheckedTask(mapData){
	M.rpc._call(success, 'realTimeErrorsCheckedAction.autoCheckedTask',{
		javaClass : 'java.util.HashMap',
		map : mapData
	});
}*/
/*var time = 1000;
function success(data) {
	var taskMask; 
	var scanTime = 10000;
	time += scanTime;
	if(time >= 30*scanTime){ //五分钟后结束扫描
        taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
        taskMask.hide();
        Ext.MessageBox.alert("提示", '数据超时，未返回实时结果!');
		time = 1000;
		return;
	}
    if (data.flag > 0 ) {
    	searchGrid(data);
    	taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
        taskMask.hide();
		time = 1000;
    }else {     
		taskMask = new Ext.LoadMask(Ext.getBody(), {msg:"数据正在生成，请等待…!"})
		taskMask.show();
		setTimeout(function() { autoCheckedTask(data); }, scanTime); //每10秒扫描一次
    }            
}*/
/*var userColumns = [new Ext.grid.RowNumberer(), {
	header: '任务ID',
	width: 130,
	sortable: true,
	dataIndex: 'taskID',
	hidden: true,
	hideable: false
}, {
	header: 'URL',
	width: 150,
	sortable: true,
	dataIndex: 'url',
	hidden: false,
	hideable: false
}, {
	header: '探测省份',
	width: 150,
	sortable: true,
	dataIndex: 'province',
	hidden: false,
	hideable: false
}, {
	header: '访问结果',
	width: 150,
	sortable: true,
	dataIndex: 'accessResults',
	hidden: false,
	hideable: false
}, {
	header: 'DNS解析时间(ms)',
	width: 150,
	sortable: true,
	dataIndex: 'DNSResolveTime',
	hidden: true,
	hideable: false
}, {
	header: '建链时间(ms)',
	width: 150,
	sortable: true,
	dataIndex: 'createLinkTime',
	hidden: false,
	hideable: false
}, {
	header: '首字节时间',
	width: 150,
	sortable: true,
	dataIndex: 'firstByteTime',
	hidden: false,
	hideable: false
}, {
	header: '完整时间',
	width: 150,
	sortable: true,
	dataIndex: 'allTime',
	hidden: false,
	hideable: false
}, {
	header: '资源大小',
	width: 150,
	sortable: true,
	dataIndex: 'resSize',
	hidden: false,
	hideable: false
}];



var queryFields = [
{text: 'URL'},
{
	xtype : 'textfield',
	id : 'url',
	width : 200
}, '-',
{
	text : '查询',
	iconCls : 'dataTable-preview-icon',
	handler : function() {
		initGrid();
	}
}, '-', {
	text: '刷新', 
	iconCls: 'role-user-reset', 
	handler : function() {
		Ext.getCmp('url').setValue('');
		initGrid();
	}
}];

var grid = new Ext.ux.Grid( {
	dataMethod : 'realTimeErrorsCheckedAction.getRealTimeErrorsCheckedList',
	columns : userColumns,
	border : false,
	frame : false,
	fetchSize : 20,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	//loadMask : true,
	tbar : queryFields,
	colspan : 8,
	viewData : false
});
function initGrid() {
	var data = getData();
	autoCheckedTask(data);
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

function searchGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}
Ext.onReady(function() {
	grid.setHeight(Ext.get("content").getHeight());
	var panel = new Ext.Panel({
		renderTo : 'user-grid',
		layout : 'fit',
		autoScroll : true,
		//frame : true,
		border: false,
		bodyBorder: false,
		items : [grid]
	});
//	initGrid();
});
function autoCheckedTask(mapData){
	M.rpc._call(success, 'realTimeErrorsCheckedAction.autoCheckedTask',{
		javaClass : 'java.util.HashMap',
		map : mapData
	});
}
var time = 1000;
function success(data) {
	var taskMask; 
	var scanTime = 10000;
	time += scanTime;
	if(time >= 30*scanTime){ //五分钟后结束扫描
        taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
        taskMask.hide();
        Ext.MessageBox.alert("提示", '数据超时，未返回实时结果!');
		time = 1000;
		return;
	}
    if (data.flag > 0 ) {
    	searchGrid(data);
    	taskMask = new Ext.LoadMask(Ext.getBody(), {msg:""});
        taskMask.hide();
		time = 1000;
    }else {     
		taskMask = new Ext.LoadMask(Ext.getBody(), {msg:"数据正在生成，请等待…!"})
		taskMask.show();
		setTimeout(function() { autoCheckedTask(data); }, scanTime); //每10秒扫描一次
    }            
}
*/