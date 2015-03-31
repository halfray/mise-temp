function openTab(domain){
	var data = {};
	data.domain = domain;
	data.system = '1200';//Cache
	data.flag = '1';//使跳转的页面的刷新功能消失
	data.setNull = false;//查询条件置空
	var conf = {
			href : 'portalAssemble.do?portalCode=domainDetail&uxParams='+ encodeURI(Ext.encode(data)),
			text:  '域名详细',
			icon: '',
			tipinfo: ''
		};
	   Main.fun.openWin(conf, 'tab');
}

function openDispatchTab(province,domain){
	var data = {};
	data.domain = domain;
	data.province = province;
	var conf = {
			href : 'domainDispatchTaskDetail.do?uxParams='+ encodeURI(Ext.encode(data)),
			text:  '调度详细信息',
			icon: '',
			tipinfo: ''
		};
	   Main.fun.openWin(conf, 'tab');
}

var province = new Ext.ux.seraph.DictCombo( { 
	id : 'province',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
  //value : '510000',
    value : orgCode,
    width : 120,
    name : 'province'
 });

var sm = new Ext.grid.CheckboxSelectionModel({
	singleSelect : true
});
var columns = [new Ext.grid.RowNumberer(),sm,
  {header:'ID',dataIndex:'smInCacheResourceOutId',hidden:true},
  {header:'域名',dataIndex:'domain',hidden:false,width:160,
	  renderer: function(v, p, record, rowIndex, index, store){
  		return ['<a href="#" onclick="openTab(\''+v+'\')"><span>', v , '</span></a>&nbsp;'].join('');
	  }
  },
  {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:180},
  {header:'出网DNS解析次数',dataIndex:'outDnsNum',hidden:false,width:180},
  //{header:'出网次数',dataIndex:'outNum',hidden:false},
  //{header:'出网流量(MB)',dataIndex:'outFlow',hidden:false,width:120,renderer:Main.fun.getMFromByte},
  {header:'所属网站',dataIndex:'webSite',hidden:false,width:180},
  {header:'网内资源数量',dataIndex:'inResourceNum',hidden:false,width:180},
  {header:'调度任务',dataIndex:'isDispatch',hidden:false,width:180,
	  renderer: function(v, p, record, rowIndex, index, store){
	  	if(v > 0){
	  		var province = Ext.getCmp('province').getValue();
	  		var domain = record.data.domain;
	  		return ['<a href="#" onclick="openDispatchTab(\''+province+'\',\''+domain+'\')"><span>', '调度明细' , '</span></a>&nbsp;'].join('');
	  	}else{
	  		return "无调度";
	  	}
  	 }
  }
];

var dispatcher = new Ext.Button({
	text : '调度',
	iconCls: 'dataTableList-modify-icon', 
	handler : operateDispatch
});

var domain = new Ext.form.TextField({
	name : 'domain',
	width : 120
});

var hotBasis = new Ext.ux.seraph.DictCombo( { 
	url :'parmInfoProvider.do?parmType=OUT_BASIS', 
	displayField : 'parmName',
    valueField : 'parmCode' ,
    value : 'outDnsNum',
    width : 150,
    name : 'hotBasis'
 });

var configPolicy = new Ext.Button({
	text : '配置策略',
	iconCls: 'dataTableList-modify-icon', 
	handler : configPolicy
});

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

   var toolbar = [dispatcher,'-',{
		text : '域名'
   },domain,{
	text : '省份'
}, province,{
	text : '热点排序'
},hotBasis,'-',configPolicy,'-',search,'-', reset];
   
   var grid = new Ext.ux.Grid({
    dataMethod:'smInCacheResourceOutAction.getList',
	viewData:false,
	frame : false,
	border: false,
	columns:columns,
	columnLines : true,
	fetchSize : 15,
	sm : sm,
	tbar : toolbar
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
	data.system = '1200';//Cache
	return data;
}

function updateGrid(data) {
	grid.setParams(data);
	grid.doSearchList();
}

var formPanel;
function getFormPanel(){
	if(Ext.isEmpty(formPanel)){
		
		var taskName = new Ext.form.TextField({
			name : 'taskName',
			width : 150,
			fieldLabel : '任务名称',
			allowBlank : false
		});
		
		/*var cronExpression = new Ext.form.TextField({
			name : 'cronexpression',
			width : 150,
			allowBlank : false,
			fieldLabel : '定时方式'
		});*/
		
		var hour = new Ext.ux.seraph.DictCombo( { 
			fieldLabel : '小时',
			url :'parmInfoProvider.do?parmType=DIALTEST_HOUR', 
			displayField : 'parmName',
		    valueField : 'parmCode' ,
		    width : 140,
		    allowBlank : false,
		    name : 'hour'
		 });
		
		var minute = new Ext.ux.seraph.DictCombo( { 
			fieldLabel : '分钟',
			url :'parmInfoProvider.do?parmType=DIALTEST_MINUTE', 
			displayField : 'parmName',
		    valueField : 'parmCode' ,
		    width : 140,
		    allowBlank : false,
		    name : 'minute'
		 });
		
		formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
			autoWidth: true,
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [taskName,{
				xtype : 'fieldset',
				title : '定时方式(每日执行)',
				layout : 'column',
				items : [{
					xtype : 'panel',
					baseCls: 'x-plain',
					layout : 'form',
					items : [hour]
				},{
					xtype : 'panel',
					baseCls: 'x-plain',
					layout : 'form',
					items : [minute]
				}]
			}]
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
  		x : windows.x+310,
  		y : windows.y,
  		width : 310,
  		height : 190,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [commentPanel ]
  	  });
	  
	  commentWindows.show();
}

var windows;
function operateDispatch(){
	var records = grid.getSelections();
	if(records.length == 0){
		Ext.Msg.alert('温馨提示','请选中要调度的数据');
		return;
	}
	for(var i = 0;i < records.length;i++){
		if(records[i].get('isDispatch') > 0){
			Ext.Msg.alert('温馨提示','选中的数据中包含已调度的数据，请重新选择未调度的数据');
			return;
		}
	}
	
	var formPanel = getFormPanel();
	formPanel.getForm().reset();
	
	if(Ext.isEmpty(windows)){
		windows = new Ext.Window({
			xtype : "window",
			title : "调度详细",
			width : 310,
			height : 260,
			border: false,
			bodyBorder: false,
			autoScroll : true,
			closeAction : 'hide',
			items : [formPanel ],
			buttons : [{
				text : '保存',
				handler : function(){
					onBoSave();
				}
			},{
				text : '取消',
				handler : function(){
					windows.hide();
					//commentWindows.hide();
			}
			}]
		});
	}
	windows.show();
	
	
	function onBoSave(){
		M.rpc._call(queryPolicyCallBack,'smInCacheResourceOutAction.getConfigPolicy', '2');
		function queryPolicyCallBack(result){
			if(result){
				var form = formPanel.getForm();
				if(form.isValid()){
					var data = {};
					data.policyId = result.policyId;
					var taskName = form.findField('taskName').getValue();
					var hour = form.findField('hour').getValue();
					var minute = form.findField('minute').getValue();
					
					var records = grid.getSelections();
					if(records.length == 0){
						Ext.Msg.alert('温馨提示','请选中要调度的数据');
						return;
					}
					
					var domains = '';
					
					for(var i = 0;i < records.length;i++){
						if(i == records.length - 1){
							domains += records[i].get('domain');
						}else{
							domains += records[i].get('domain')+',';
						}
					}
					
					var province = grid.getTopToolbar().findById('province').getValue();
					data.province = province;
					
					data.domains = domains;
					data.taskName = taskName;
					data.hour = hour;
					data.minute = minute;
					data.scene = '2';//Cache
					
					var flag = M.rpc._call('dispTaskAction.checkDialtestNum', '0 '+minute+' '+hour+' * * ?');
					if(flag == false){
						Ext.Msg.alert('温馨提示','同一时间下发任务过多，请重新选择时间');
						return;
					}
					
					M.rpc._call(saveDispatchCallBack,'smInCacheResourceOutAction.saveDispatch', {
						javaClass:'java.util.Map',map:data
					});
				}
				
			}else{
				Ext.Msg.alert('温馨提示','还没有设定配置策略!');
				return;
			}
		}
		
		function saveDispatchCallBack(result){
			if(result == 'dispatchSuccess'){
				upData();
				windows.hide();
				showTipWindow('调度成功','comment','温馨提示');
				//commentWindows.hide();
			}else{
				upData();
				windows.hide();
				showTipWindow('调度失败,请重新调度','comment','温馨提示');
				//commentWindows.hide();
			}
		}
	}
}

function configPolicy(){
	var policyID;
	var smDispatchConfigId;
	M.rpc._call(queryPolicyCallBack,'smInCacheResourceOutAction.getConfigPolicy', '2');
	function queryPolicyCallBack(result){
		if(result){
			policyID = result.policyId;
			smDispatchConfigId = result.smDispatchConfigId;
		}
		
		var policyName = new Ext.ux.seraph.DictCombo( {
			name : 'policyname',
			fieldLabel : '调度策略',
			allowBlank : false,
			url : 'dispatchPolicyProvider.do',
			displayField : 'policyName',
			valueField : 'policyID',
			value : policyID,
			width : 160
		});
		
		var dispatchSence = new Ext.form.TextField({
			name : 'dispatchSence',
			width : 150,
			hidden : true,
			value : '2',
			fieldLabel : '调度场景'
		});
		
		var smDispatchConfigId = new Ext.form.TextField({
			name : 'smDispatchConfigId',
			width : 150,
			hidden : true,
			value : smDispatchConfigId,
			fieldLabel : '系统配置策略ID'
		});
		var formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
			autoWidth: true,
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [policyName,dispatchSence,smDispatchConfigId]
		});
		
		var windows = new Ext.Window({
			xtype : "window",
			title : "配置策略",
			width : 320,
			height : 150,
			border: false,
			bodyBorder: false,
			autoScroll : true,
			closeAction : 'hide',
			items : [formPanel ],
			buttons : [{
				text : '保存',
	        	handler : function(){
					savePolicy();
				}
			},{
				text : '取消',
	        	handler : function(){
					windows.close();
				}
			}]
		});
		
		windows.show();
		
		function savePolicy(){
			var form = formPanel.getForm();
			if(form.isValid()){
				var dispatchSence = form.findField('dispatchSence').getValue();
				var policyName = form.findField('policyname').getValue();
				var id = form.findField('smDispatchConfigId').getValue();
				
				var policyData = {};
				policyData.dispatchSence = dispatchSence;
				policyData.policyId = policyName;
				policyData.id = id;
				
				M.rpc._call(savepolicyCallBack,'smInCacheResourceOutAction.savePolicy', {
					javaClass : 'java.util.HashMap',map : policyData
				});
			}
			function savepolicyCallBack(result){
				if(result){
					if(result == 'insertSuccess'){
						showTipWindow('保存成功','comment','温馨提示');
					}else if(result == 'updateSuccess'){
						showTipWindow('修改成功','comment','温馨提示');
					}
					windows.close();
				}
			}
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
    
    upData();
});