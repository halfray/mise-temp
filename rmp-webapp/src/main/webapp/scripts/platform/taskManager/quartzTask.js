
function download(val,cell,record,rowIndex,columnIndex,store){
			var taskId = record.get("id");
			var jobName = record.get("jobName");
			var ips = record.get("ips");
			var contentId = Ext.id();   
			var btn = createGridButton.defer(1, this, [contentId]);   
			function createGridButton(){   
			 return new Ext.Button({   
				text: '查看详细',   
				width:'100%',
				//iconCls: 'addItem',   
				handler: function(){   
				    //window.location=Main.contextPath + "/FtpDownFile?file_id="+bookfilerel_id;  
				    getQuartzCheckIpResult(taskId,ips,jobName);
				}   
			}).render(document.body, contentId);   
			}   
			return('<div id="'+contentId+'"/>');  
		}
var ipregex = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;

var ipManagerformPanel;
function getIpManagerFormPanel(){
	function changeIp(ip) {
		var ips = ip.split('.');
		var ipvalue = 0;
		for ( var n = 0; n < ips.length; n++) {
			ipvalue += ips[n]*Math.pow(256,3 - n);
		}
		return ipvalue;
	}
	
	var getMask = function() {
		var value = '';
		var ipstart = Ext.getCmp('ipStart');
		var ipend = Ext.getCmp('ipEnd');
		var ipstartint = Ext.getCmp('ipStartInt');
		var ipendint = Ext.getCmp('ipEndInt');
		var mask = Ext.getCmp('ipMask');
		var maskint = Ext.getCmp('ipMaskInt');
		if (ipstart.validate() && ipend.validate()) {
			var startvalue = ipstart.getValue();
			var endvalue = ipend.getValue();
			ipstartint.setValue(changeIp(startvalue));
			ipendint.setValue(changeIp(endvalue));
			var res = new Ajax('commonAction.do').call('getMask', {
				ipStart : startvalue,
				ipEnd : endvalue
			});
			mask.setValue(res);
			maskint.setValue(changeIp(res));
		}
	}
	
	if(Ext.isEmpty(ipManagerformPanel)){
		var ipStart = new Ext.form.TextField({
			id : 'ipStart',
			name : 'ipStart',
			width : 150,
			fieldLabel : 'IP起始地址段',
			regex : ipregex,
			regexText : 'ip格式无效',
			allowBlank : false,
			readOnly : true,
			listeners : {
				change : getMask
			}
		});
		var ipEnd = new Ext.form.TextField({
			id : 'ipEnd',
			name : 'ipEnd',
			width : 150,
			fieldLabel : 'IP终止地址段',
			regex : ipregex,
			regexText : 'ip格式无效',
			allowBlank : false,
			readOnly : true,
			listeners : {
				change : getMask
			}
		});
		var operator = new Ext.ux.seraph.DictCombo( {
			id : '#operator',
			name : 'operator',
			fieldLabel : '所属运营商',
			allowBlank : false,
			width : 150,
			url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
			displayField : 'codeLabel',
			valueField : 'codeValue'
		});
		
		var lacation = new Ext.ux.seraph.DictCombo( {
			id : '#lacation',
			name : 'lacation',
			fieldLabel : '所属区域',
			allowBlank : false,
			width : 150,
			url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
			displayField : 'codeLabel',
			valueField : 'codeValue'
		});
		
		var system = new Ext.ux.seraph.DictCombo( {
			id : '#system',
			name : 'system',
			fieldLabel : '所属系统',
			allowBlank : false,
			width : 150,
			url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
			displayField : 'codeLabel',
			valueField : 'codeValue'
		})
		var ipDesc = new Ext.form.TextArea({
			name : 'ipDesc',
			width : 150,
			fieldLabel : '备注'
		});
		
		var ipId = new Ext.form.TextField({
			name : 'ipId',
			hidden : true
		});
		var ipStartInt = new Ext.form.TextField({
			id : 'ipStartInt',
			name : 'ipStartInt',
			hidden : true
		});
		var ipEndInt = new Ext.form.TextField({
			id : 'ipEndInt',
			name : 'ipEndInt',
			hidden : true
		});
		var ipMask = new Ext.form.TextField({
			name : 'ipMask',
			hidden : true
		});
		var ipMaskInt = new Ext.form.TextField({
			name : 'ipMaskInt',
			hidden : true
		});
		var ipState = new Ext.form.TextField({
			name : 'ipState',
			hidden : true
		});
		
		ipManagerformPanel = new Ext.form.FormPanel({
			//baseCls: 'x-plain',
			title : '纠错',
			labelWidth: 100,
			width : 284,
			height : 288,
			frame:true,
			autoScroll: true,
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			buttonAlign : 'center',
			items: [ipStart,ipEnd,operator,lacation,system,ipDesc,ipId,ipStartInt,ipEndInt,ipMask,ipMaskInt,ipState],
			buttons : [{
				text : '保存',
				handler : function(){
					saveIpManager();
				}
			},{
				text : '重置',
				handler : function(){
					ipManagerformPanel.getForm().reset();
				}
			}]
		});
	}
	
	return ipManagerformPanel;
}

function saveIpManager(){
	var ipManagerformPanel = getIpManagerFormPanel();
	var form = ipManagerformPanel.getForm();
	if(form.isValid()){
		var formObject = form.getValues();
		formObject.system = Ext.getCmp('#system').getValue();
		formObject.operator = Ext.getCmp('#operator').getValue();
		formObject.lacation = Ext.getCmp('#lacation').getValue();
		formObject.javaClass = 'com.neteast.rmp.dao.domain.RmIpManager';
		M.rpc._call(updateFormObject,"checkIpTaskAction.updateIpManager",formObject);
	}
	
	function updateFormObject(result){
		if(result){
			ipManagerformPanel.getForm().reset();
			showTipWindow('修改成功，请到资源视图--IP库--IP地址库明细下查看详情','comment','温馨提示');
		}
	}
}

function getQuartzCheckIpResult(taskId,ips,jobName){
	
	var operator = new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
	
	var lacation = new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
	
	var system = new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
	
	var resultColumns = [new Ext.grid.RowNumberer(),{
		header : 'IP',
		sortable : true,
		width : 100,
		dataIndex : 'ip'
	}, {
		header : '核查结果',
		width : 150,
		sortable : true,
		dataIndex : 'result'
	}, {
		header : '所属运营商',
		width : 70,
		sortable : true,
		dataIndex : 'operator',
		renderer: Ext.ux.renderer.Combo(operator)
	}, {
		header : '所属区域',
		width : 60,
		sortable : true,
		dataIndex : 'lacation',
		renderer: Ext.ux.renderer.Combo(lacation)
	}, {
		header : '所属系统',
		width : 60,
		sortable : true,
		dataIndex : 'system',
		renderer: Ext.ux.renderer.Combo(system)
	}, {
		header : '最新核查时间',
		width : 130,
		sortable : true,
		dataIndex : 'time'
	}];
	
	var resultGrid = new Ext.ux.Grid({
		dataMethod : 'checkIpTaskAction.getCheckIPResult',
		columns : resultColumns,
		width : 595,
		height : 286,
		border : false,
		frame : false,
		sortBar : false,
		litePagingBar : true,
		//tbar : [],
		fetchSize : 10,
		columnLines : true,
		sm : new Ext.grid.CheckboxSelectionModel( {
			singleSelect : true
		}),
		colspan : 8,
		listeners : {
			rowclick : function(grid,rowIndex){
				viewObject(grid.getSelect('ip'));
			}
		}
	});
	
	var ipManagerformPanel = getIpManagerFormPanel();
	ipManagerformPanel.getForm().reset();
	
	function viewObject(ip){
		var map = {};
		map.ip = ip;
		M.rpc._call(getIpManagerCallBack,"checkIpTaskAction.getIpManager",
				{javaClass : 'java.util.HashMap',map : map}
		);
		
		function getIpManagerCallBack(result){
			if(result){
				ipManagerformPanel.getForm().reset();
				ipManagerformPanel.getForm().setValues(result);
			}
		}
	}
	
	var panel = new Ext.Panel({
		//width : 720,
		//height : 280,
    	layout : 'table',
    	border : false,
		frame : false,
		bodyBorder: false,
    	items : [resultGrid,ipManagerformPanel]
    });
	
	var windows = new Ext.Window({
		xtype : "window",
		title : "核查结果--"+jobName,
		width : 895,
		height : 330,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		closeAction : 'hide',
		items : [panel ]
	});
	
	
	var ipgroup = "";
	var ip = ips.split(',');
	for(var i = 0;i < ip.length;i++){
		if(i == ip.length - 1){
			ipgroup += "'"+ip[i]+"'";
		}else{
			ipgroup += "'"+ip[i]+"',";
		}
	}
	var map = {};
	map.taskId = taskId;
	map.ips = ipgroup;
	resultGrid.setParams(map);
	resultGrid.doSearchList();
	
	windows.show();
	
}

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
		dataIndex : 'id'
	}, {
		header : '任务名称',
		width : 120,
		sortable : true,
		dataIndex : 'jobName'
	}, {
		header : 'IP地址',
		allowBlank : false,
		width : 200,
		sortable : true,
		dataIndex : 'ips'
	}, {
		header : '频率',
		width : 100,
		sortable : true,
		dataIndex : 'cronExpression'
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
		header : '最近核查时间',
		width : 150,
		sortable : true,
		dataIndex : 'time'
	}, {
		header : '核查结果',
		width : 150,
		sortable : true,
		dataIndex : 'result',
		renderer : download
	}, {
		header : '触发器名称',
		sortable : true,
		hidden : true,
		dataIndex : 'cronTrigger'
	}, {
		header : '类名称',
		sortable : true,
		hidden : true,
		dataIndex : 'className'
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
	handler : addQuartzTask
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editQuartzTask
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delQuartzTask
});
var start = new Ext.Button({
	text : '启动',
	iconCls: 'control-icon', 
	handler : startQuartzTask
});
/*var startAll = new Ext.Button({
	text : '启动所有任务',
	iconCls: 'dataTableList-delete-icon', 
	handler : startAllQuartzTask
});*/
var pause = new Ext.Button({
	text : '暂停',
	iconCls: 'pause-icon', 
	handler : pauseQuartzTask
});
var recover = new Ext.Button({
	text : '恢复',
	iconCls: 'restart-icon', 
	handler : recoverQuartzTask
});

var jobName = new Ext.form.TextField({
	name : 'jobName',
	width : 120
});

var toolbar = [ add,'-',edit,'-',del,'-',start,'-',/*startAll,'-',*/pause,'-',recover,'-',{
	text : '任务名称'
	}, 
	jobName,
	search, '-', reset 
  ];

var grid = new Ext.ux.Grid( {
	dataMethod : 'checkIpTaskAction.getCheckIPTasks',
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
			editQuartzTask();
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
			name : 'id',
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
					var message = M.rpc._call("checkIpTaskAction.checkJobName",{javaClass : 'java.util.HashMap',map : map});
					if(message != null){
						Ext.Msg.alert('温馨提示',message);
						getFormPanel().getForm().findField("jobName").setValue('');
						return;
					}
				}
			}
		});
		var ips = new Ext.form.TextArea({
			name : 'ips',
			width : 150,
			hight : 120,
			allowBlank : false,
			fieldLabel : 'IP地址'
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
			hidden : true,
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
			items: [id,jobName,{
				xtype : 'panel',
				baseCls: 'x-plain',
				layout : 'column',
				items : [ {
					columnWidth : .98,
					xtype : 'panel',
					layout : 'form',
					baseCls: 'x-plain',
					items : [ips]},{
								xtype : 'button',
								text : ' ',
								iconCls:'x-button-style',
								handler:function(){
									getIpComment();
								}
							} ]
	          },{
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
	          },jobIsvalid,cronTrigger,className]
		});
		
	}
	return formPanel;
}
var commentIPWindows;
function getIpComment(){
	if(!Ext.isEmpty(commentIPWindows)){
		commentIPWindows.close();
	}
	var IPCommentPanel = new Ext.Panel({
		baseCls: 'x-plain',
		autoHeight :true,
        autoWidth: true,
        bodyStyle:'padding:10px; border: 0px solid;',
		autoScroll: true,
		bodyBorder: false,
		border: false
    });
	
	 var html = "IP格式：</br>"; 
	  html += "" +
	  		"每个IP之间用逗号分隔  </br> " +
	  		"例如：1.1.1.1,2.2.2.2  </br> "
	  IPCommentPanel.html = html;
	  
	  commentIPWindows = new Ext.Window({
  		xtype : "window",
  		title : "IP填写说明",
  		//x : 720,
  		x : windows.x+310,
  		y : windows.y,
  		width : 285,
  		height : 300,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [IPCommentPanel ]
  	  });
	  
	  commentIPWindows.show();
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
  		x : windows.x+310,
  		y : windows.y,
  		width : 285,
  		height : 300,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [commentPanel ]
  	  });
	  
	  commentWindows.show();
}

var windows;
function addQuartzTask(){
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
    		width : 310,
			height : 300,
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
    				commentIPWindows.close();
    			}
    		}]
    	});
		}else{
			windows.setTitle("添加记录");
		}
	windows.show();
}

function editQuartzTask(){
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
			width : 310,
			height : 290,
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
					commentIPWindows.close();
			}
			}]
		});
	}else{
		windows.setTitle("修改记录");
	}
	formPanel.getForm().reset();
	formPanel.getForm().setValues(record.json);
	windows.show();
}

function onBoSave(windows){
	var form = getFormPanel().getForm();
	if(form.isValid()){
		var data = {};
		var id = form.findField('id').getValue();
		var jobName = form.findField('jobName').getValue();
		var ips = form.findField('ips').getValue();
		var cronExpression = form.findField('cronExpression').getValue();
		var cronTrigger = form.findField('cronTrigger').getValue();
		var jobIsvalid = form.findField('jobIsvalid').getValue();
		var className = form.findField('className').getValue();
		data.id = id;
		data.jobName = jobName;
		data.ips = ips;
		data.cronExpression = cronExpression;
		data.cronTrigger = cronTrigger;
		data.className = className;	
		data.jobIsvalid = jobIsvalid;
		if(jobIsvalid == '1'){
			data.jobstate = '1';
		}else{
			data.jobstate = '3';
		}
		data.startTime = new Date().format('Y-m-d H:i:s');
		
		M.rpc._call(saveCallBack,'checkIpTaskAction.onBoSave', {
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
			commentWindows.close();
			commentIPWindows.close();
		}
	}
}

function delQuartzTask(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.id = record.data.id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	M.rpc._call(delCallBack,'checkIpTaskAction.onBoDel',{
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

function startQuartzTask(){
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
	    	data.id = record.data.id;
	    	data.jobName = record.data.jobName;
	    	data.ips = record.data.ips;
	    	data.cronTrigger = record.data.cronTrigger;
	    	data.cronExpression = record.data.cronExpression;
	    	data.className = record.data.className;
	    	data.jobstate = '1';
	    	M.rpc._call(pauseCallBack,'checkIpTaskAction.onBoStart',{
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

/*function startAllQuartzTask(){
	var ids = "";
	var count = grid.getStore().getCount();
	if(count > 0){
		for(var i = 0;i < count;i++){
			var record = grid.getStore().getAt(i);
			if(record.get('jobstate') != '2' && record.get('jobstate') != '3'){
				if(i == count-1){
					ids += record.get('id');
				}else{
					ids += record.get('id')+',';
				}
			}
		}
		Ext.Msg.confirm('温馨提示','是否要启动所有未开启的任务',function(btn){
			if(btn == 'yes'){
		    	var data = {};
		    	data.ids = ids;
		    	M.rpc._call(startAllCallBack,'checkIpTaskAction.onBoStartAll',{
		    		javaClass : 'java.util.HashMap',map : data
		    	});
		    }
			function startAllCallBack(result){
				
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
					showTipWindow('开启所有任务成功','comment','温馨提示');
				}else{
					showTipWindow('开启所有任务失败,请确定所有任务都是未启动状态','comment','温馨提示');
				}
			}
		});
		
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
		showTipWindow('没有要开启的数据','comment','温馨提示');
	}
	
}*/

function pauseQuartzTask(){
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
	    	data.id = record.data.id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	//2为暂停
	    	data.jobstate = '2';
	    	M.rpc._call(pauseCallBack,'checkIpTaskAction.onBoPause',{
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

function recoverQuartzTask(){
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
	    	data.id = record.data.id;
	    	data.cronTrigger = record.data.cronTrigger;
	    	//1为运行
	    	data.jobstate = '1';
	    	M.rpc._call(pauseCallBack,'checkIpTaskAction.onBoRecover',{
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