var trigger = Ext.extend(Ext.form.TriggerField, {
    	hideTrigger:true,
		defaultAutoCreate : {tag: "textarea", autocomplete: "off",rows:6},
		triggerClass : 'x-form-ref-trigger',
		ipsName:[],
		ipsValue:[],
		setValue : function(value) {
			this.setRawValue('');
			this.ipsName=[];
			this.ipsValue=[];
			Ext.form.TriggerField.superclass.initComponent.call(this);
			this.userGrid.getStore().reload();
			if(!Ext.isEmpty(value))
			{
				//var res = new Ajax("rmDomainManagerActions.do").call('getDomainsByIds',{ids:value});
				//var id = Ext.getCmp('smdispatchdecisiongroupdomainid').getValue();
				var id = grid.getSelectionModel().getSelected().data.domaindeepevaluationtaskid;
				var map = {domainDeepEvaluationTaskId : id};
				var res = M.rpc._call("smDomainDeepEvaluationTaskAction.getDomainsById", {
							javaClass : "java.util.HashMap",
							map : map
						});
				
				if(Ext.isEmpty(res)) res = [];
				
				this.leftgrid.getStore().loadData({list:res});
				
				this.ipsValue = value.split(",");
				ipsName = [];
				for(var i = 0; i<res.length;i++)
				{
					ipsName[i] = res[i].domain;
				}
				Ext.form.ComboBox.superclass.setValue.call(this,value);
				this.setRawValue(ipsName.join("\r\n"));
			}else
			{
				Ext.form.ComboBox.superclass.setValue.call(this,value);
				this.setRawValue();
				this.leftgrid.getStore().loadData({list:[]});
			}
		  },
		getValue: function()
		{
			return this.ipsValue.join(",");
		},
		initComponent : function() {
			Ext.form.TriggerField.superclass.initComponent.call(this);

			var newURL = {
				queryList : 'dmHotdomainSortListProvider.do',
				action : 'dmHotdomainSortAction.do'
			};
			var PK = ["id"];

			// -> Column name in Chinese. e.g: CN[1]
			var CN = {
				0: "ID",          
				1: "域名",          
				2: "网站",          
				3: "DNS解析次数",          
				4: "DNS网内次数",
				5: "DNS网内占比"
			};

			// -> Column name in English
			var EN = {
				0: "id",          
				1: "domain",          
				2: "website",          
				3: "DNSResolNum",          
				4: "DNSInResolNum",          
				5: "DNSInResolProportion"   
			};

			// -> Cell width
			var WD = {
				0: "2,000",          
				1: "19",          
				2: "20",          
				3: "2,000",          
				4: "20",          
				5: "19"    
			};

			// -> Data type e.g: float,int,string
			var TY = {
				0: "string",          
				1: "-5",          
				2: "string",          
				3: "string",          
				4: "string",          
				5: "-5"        
			};

			var storeFields = [	    
				{name: EN[0], type: TY[0]},          
				{name: EN[1], type: TY[1]},          
				{name: EN[2], type: TY[2]},          
				{name: EN[3], type: TY[3]},          
				{name: EN[4], type: TY[4]},          
				{name: EN[5], type: TY[5]} 
			];

			var formFields = [
			     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
			     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
			     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
			     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
			     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
			     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'}
			];	


			var userColumns = [ {
				header : CN[0],
				width : WD[0],
				sortable : true,
				dataIndex : EN[0],
				hidden : true,
				hideable : false,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : CN[1],
				width : 150,
				sortable : true,
				dataIndex : EN[1],
				hidden : false,
				hideable : false,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : CN[2],
				width : 130,
				sortable : true,
				dataIndex : EN[2],
				hidden : false,
				hideable : false,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : CN[3],
				width : WD[3],
				sortable : true,
				dataIndex : EN[3],
				hidden : false,
				hideable : false,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : CN[4],
				width : WD[4],
				sortable : true,
				dataIndex : EN[4],
				hidden : false,
				hideable : false,
				editor : {
					xtype : 'textfield'
				}
			}, {
				header : CN[5],
				width : WD[5],
				sortable : true,
				dataIndex : EN[5],
				hidden : false,
				hideable : false,
				editor : {
					xtype : 'textfield'
				},
				renderer : function(value) {
					return (value * 100).toFixed(2) + '%';
				}
			} ];
			
			//var systemDeloyProvince =M.rpc._call("smDispatchDecisionGroupDomainAction.getSystemDeployProvince");
			
			
			var queryFields = [{
						text : "域名"
					}, {
						xtype : 'textfield',
						id : '#domain',
						width : 120
					}, {
						xtype : 'textfield',
						id : '#selectComboBox',
						value : 'domainDNSResolNum',
						hidden : true
					}, {
						xtype : 'textfield',
						id : '#dialtestTaskGroupCheckDomain',
						value : 'dialtestTaskGroupCheckDomain',
						hidden : true
					}];

			// 
			var queryParms = [{
						name : 'domain',
						indicator : 'EXAMPLE_LIKE'
					}, {
						name : 'selectComboBox',
						indicator : 'EXAMPLE_EQUALS'
					}, {
						name : 'dialtestTaskGroupCheckDomain',
						indicator : 'EXAMPLE_EQUALS'
					}];
			var leftstore = new Ext.data.JsonStore({
						root : 'list',
						totalProperty : 'totalCount',
						fields : storeFields
					});
			var self = this;
			var userGridSelf = Ext.extend(Ext.ux.self.FormEditorGrid, {
				buildSelectionModel : function() {
			    	return new Ext.grid.CheckboxSelectionModel();
			    },
						buildTbar : function(queryFields) {
							var gridSelf = this;
							return [{
								text : '添加',
								iconCls : 'dataTableList-add-icon',
								handler : function() {
									var recordArray = gridSelf.getSelectionModel().getSelections()
									if(Ext.isArray(recordArray))
									{
										for(var i = 0; i<recordArray.length;i++)
										{
											var record = recordArray[i];
											addDomainStore(leftstore,record);
										}
									}
								}
							}, '-', queryFields, {
								text : '查询',
								iconCls : 'dataTable-preview-icon',
								handler : function() {
									gridSelf.loadData();
								}
							}, '-', {
								text : '刷新',
								iconCls : 'role-user-reset',
								handler : function() {
									gridSelf.clearData();
								}
							}]
						}
					});
			var formFields = [];
			this.userGrid = new userGridSelf({
						width : 300,
						height : 430,
						baseCls: 'x-plain',
						storeFields : storeFields,
						formFields : formFields,
						queryFields : queryFields,
						queryParms : queryParms,
						columns : userColumns,
						pk : PK,
						url : newURL
					});
			this.userGrid.un('rowdblclick', this.userGrid.onUpdate,
					this.userGrid);

			var sm = new Ext.grid.CheckboxSelectionModel();
			this.leftgrid = new Ext.grid.GridPanel({
				width : 150,
				height : 430,
				border: false,
				style:'border-right:solid 1px #add9c0;',
				columns : [sm].concat([{
						header : '域名',
						width : 240,
						sortable : true,
						dataIndex : "domain"
					}]),
				sm : sm,
				tbar : [/*{
		    		text:'下载模板',
		    		iconCls:'toolbar-down-icon',
		    		handler:function()
		    		{
		    			window.open(path+'/scripts/platform/schedule_manager/domainTemplate.xls');
		    		}
		    	},{
		    		text:'上传文件',
		    		iconCls:'toolbar-up-icon',
		    		handler:function(){upload(self);}
		    	},*/{
					text : '删除',
					iconCls : 'dataTableList-delete-icon',
					scope : this,
					handler : function() {

						var gridSelf = this.leftgrid;

						var record = gridSelf.getSelectionModel().getSelections();
						if (!record) {
							Ext.Msg.alert('提示', '请先选择一条记录！');
							return;
						}
						for(var i = 0;i < record.length;i++){
							gridSelf.getStore().remove(record[i]);
						}
					}
				}],
				store : leftstore
			});
		},
		addList:function(list)
		{
			var recordTmp = Ext.data.Record.create([
			     {name: 'domainId', mapping: 'domainId'},
				{name: 'domainUrl', mapping: 'domainUrl'}
				]);
			for(var i = 0;i < list.length;i++)
			{
				var record = new recordTmp(list[i]);
				addDomainStore(this.leftgrid.getStore(),record);
			}
		},
		onTriggerClick : function() {
			var self = this;
			self.userGrid.loadData();
			var win = new Ext.Window({
				width : 950,
//				height : 500,
				autoHeight:true,
				closeAction : 'hide',
				buttonAlign : 'center',
				title:'域名配置',
				items : [{
							xtype : 'panel',
							layout : 'column',
							baseCls: 'x-plain',
							items : [{
										layout : 'fit',
										columnWidth : .3,
										baseCls: 'x-plain',
										items : [self.leftgrid]
									},{
										layout : 'fit',
										columnWidth : .7,
										baseCls: 'x-plain',
										items : [self.userGrid]
									}]
						}],
				buttons : [{
					text : '确定',
					handler : function() {
						self.ipsName = [];
						self.ipsValue = [];
						var store = self.leftgrid.getStore();
						store.each(function(record) {
									self.ipsName[self.ipsName.length] = record.data.domain;
									self.ipsValue[self.ipsValue.length] = record.data.domain;
								});
						self.setRawValue(self.ipsName.join("\r\n"));
						win.hide();
					}
				}, {
					text : '取消',
					handler : function() {
						win.hide();
					}
				}]

			});
			win.show();
		}
	});

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

var userColumns = [ new Ext.grid.RowNumberer(),{
		header : 'ID',
		sortable : true,
		hidden : true,
		dataIndex : 'domaindeepevaluationtaskid'
	}, {
		header : '任务名称',
		width : 120,
		sortable : true,
		dataIndex : 'taskname'
	}, {
		header : '网站数量',
		width : 120,
		sortable : true,
		dataIndex : 'domainnum'
	}, {
		header : '定时方式',
		width : 100,
		sortable : true,
		dataIndex : 'cronexpression'
	}, {
		header : '上一执行时间',
		width : 130,
		sortable : true,
		dataIndex : 'lasttime'
	}, {
		header : '创建时间',
		width : 130,
		sortable : true,
		dataIndex : 'starttime'
	}, {
		header : '运行状态',
		width : 80,
		sortable : true,
		dataIndex : 'jobstate',
		renderer: Ext.ux.renderer.Combo(operatingState)
	}, {
		header : '是否开启',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'isstart'
	}/*, {
		header : '操作',
		width : 80,
		sortable : true,
		dataIndex : 'operate',
		renderer : operate
	}*/, {
		header : '关联域名',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'domains'
	}, {
		header : '触发器名称',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'triggername'
	}, {
		header : '类名称',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'classname'
	}, {
		header : '层数',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'layersnum'
	}, {
		header : 'URL数量',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'urlnum'
	}, {
		header : '任务超时时间(秒)',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'tasktimeout'
	}];

var search = new Ext.Button({
	text : '查询',
	iconCls: 'dataTable-preview-icon', 
	handler : upData
});
var reset = new Ext.Button({
	text : '刷新',
	iconCls: 'role-user-reset', 
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
	handler : addTaskGroup
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editTaskGroup
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delTaskGroup
});
var start = new Ext.Button({
	text : '启动',
	iconCls: 'control-icon', 
	handler : startTaskGroup
});
var pause = new Ext.Button({
	text : '暂停',
	iconCls: 'pause-icon', 
	handler : pauseTaskGroup
});
var recover = new Ext.Button({
	text : '恢复',
	iconCls: 'restart-icon', 
	handler : recoverTaskGroup
});

var taskName = new Ext.form.TextField({
	name : 'taskName',
	width : 120
});

var toolbar = [ add,'-',edit,'-',del,'-',start,'-',pause,'-',recover,'-',{
	text : '任务名称'
	}, 
	taskName,
	search, '-', reset 
  ];

var grid = new Ext.ux.Grid( {
	dataMethod : 'smDomainDeepEvaluationTaskAction.getList',
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
			editTaskGroup();
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
		
		var domainDeepEvaluationTaskId = new Ext.form.TextField({
			name : 'domaindeepevaluationtaskid',
			fieldLabel : 'ID',
			hidden : true
		});
		var taskName = new Ext.form.TextField({
			name : 'taskname',
			width : 150,
			fieldLabel : '任务名称',
			allowBlank : false
		});
		
		var domains = new trigger({
			fieldLabel : '域名配置',
			name : 'domains',
			width : 150,
			editable:false
		});
		var cronExpression = new Ext.form.TextField({
			name : 'cronexpression',
			width : 150,
			allowBlank : false,
			fieldLabel : '定时方式'
		});
		var triggerName = new Ext.form.TextField({
			name : 'triggername',
			width : 150,
			hidden : true,
			fieldLabel : '触发器名称'
		});
		var className = new Ext.form.TextField({
			name : 'classname',
			width : 150,
			hidden : true,
			fieldLabel : '类名称'
		});
		var taskTimeout = new Ext.form.TextField({
			name : 'tasktimeout',
			width : 150,
			allowBlank : false,
			fieldLabel : '超时时间(毫秒)'
		});
		/*var executeCount = new Ext.form.TextField({
			name : 'executeCount',
			width : 150,
			allowBlank : false,
			fieldLabel : '执行次数'
		});
		var interval = new Ext.form.TextField({
			name : 'interval',
			width : 150,
			allowBlank : false,
			fieldLabel : '周期'
		});
		var lifeTime = new Ext.form.TextField({
			name : 'lifeTime',
			width : 150,
			allowBlank : false,
			fieldLabel : '时长单位(毫秒)'
		});
		var beginTime = new Ext.form.TextField({
			name : 'beginTime',
			width : 150,
			allowBlank : false,
			fieldLabel : '开始时间'
		});
		var method = new Ext.form.TextField({
			name : 'method',
			width : 150,
			allowBlank : false,
			fieldLabel : '资源分析'
		});*/
		var isStart = new Ext.ux.seraph.DictCombo( {
			name : 'isstart',
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
			labelWidth: 90,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [domainDeepEvaluationTaskId,taskName,
			        domains,taskTimeout,/*executeCount,interval,lifeTime,beginTime,method,*/{
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
										text : '...',
										handler:function(){
											getCronExpressionComment();
										}
									} ]
			          },isStart,triggerName,className]
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
  		x : windows.x+305,
  		y : windows.y,
  		width : 305,
  		height : 370,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [commentPanel ]
  	  });
	  
	  commentWindows.show();
}

var windows;
function addTaskGroup(){
	var formPanel = getFormPanel();
	formPanel.getForm().reset();
	
	formPanel.getForm().findField('domains').setValue('');
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
    		width : 305,
    		height : 370,
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

function editTaskGroup(){
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
			width : 305,
			height : 370,
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
		
		data.domaindeepevaluationtaskid = form.findField('domaindeepevaluationtaskid').getValue();
		var taskName = form.findField('taskname').getValue();
		data.taskname = taskName;
		data.domains = form.findField('domains').getValue();
		data.layersnum = form.findField('layersnum').getValue();
		data.urlnum = form.findField('urlnum').getValue();
		data.tasktimeout = form.findField('tasktimeout').getValue();
		data.cronexpression = form.findField('cronexpression').getValue();
		data.triggername = taskName+'Trigger';	
		data.classname = 'com.neteast.rmp.web.taskManager.DomainDeepEvaluationTaskJob';
		
		var isStart = form.findField('isstart').getValue();
		data.isstart = isStart;
		
		if(isStart == '1'){
			data.jobstate = '1';
		}else{
			data.jobstate = '3';
		}
		data.starttime = new Date().format('Y-m-d H:i:s');
		data.javaClass = 'com.neteast.rmp.dao.domain.SmDomaindeepEvaluationTask';
		
		
		M.rpc._call(saveCallBack,'smDomainDeepEvaluationTaskAction.onBoSave', data);
		
	}
	function saveCallBack(result){
		windows.hide();
		form.reset();
		if(result == 'startSuccess'){
			if(isStart == '1'){
				showTipWindow('保存成功,任务已运行','comment','温馨提示');
			}else{
				showTipWindow('保存成功','comment','温馨提示');
			}
		}else if(result == 'startFail'){
			showTipWindow('保存成功，启动失败','comment','温馨提示');
		}
		upData();
		commentWindows.close();
	}
}

function delTaskGroup(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.domaindeepevaluationtaskid = record.data.domaindeepevaluationtaskid;
	    	data.triggername = record.data.triggername;
	    	//data.domains = record.data.domains;
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDomaindeepEvaluationTask';
			
	    	M.rpc._call(delCallBack,'smDomainDeepEvaluationTaskAction.onBoDel',data);
	    }
		function delCallBack(result){
			if(result == 'delSuccess'){
				showTipWindow('删除成功','comment','温馨提示');
			}else{
				showTipWindow('删除失败','comment','温馨提示');
			}
			upData();
		}
	});
}

function startTaskGroup(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
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
	    	data.domaindeepevaluationtaskid = record.data.domaindeepevaluationtaskid;
			data.taskgroupname = record.data.taskgroupname;
			data.cronexpression = record.data.cronexpression;
			data.triggername = record.data.triggername;
			data.domains = record.data.domains;
			data.classname = 'com.neteast.rmp.web.taskManager.DomainDeepEvaluationTaskJob';
			data.jobstate = '1';
			data.dispatchdate = new Date().format('Y-m-d H:i:s');
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDomaindeepEvaluationTask';
			
	    	M.rpc._call(startCallBack,'smDomainDeepEvaluationTaskAction.onBoStart',data);
	    }
		function startCallBack(result){
			if(result == "startSuccess"){
				showTipWindow('开启成功','comment','温馨提示');
			}else{
				showTipWindow('开启失败,请重新开启','comment','温馨提示');
			}
			upData();
		}
	});
}

function pauseTaskGroup(){
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
	    	data.domaindeepevaluationtaskid = record.data.domaindeepevaluationtaskid;
			data.triggername = record.data.triggername;
			//2为暂停
			data.jobstate = '2';
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDomaindeepEvaluationTask';
			
	    	M.rpc._call(pauseCallBack,'smDomainDeepEvaluationTaskAction.onBoPause',data);
	    }
		function pauseCallBack(result){
			if(result == "pauseSuccess"){
				showTipWindow('暂停成功','comment','温馨提示');
			}else{
				showTipWindow('暂停失败,请重新暂停','comment','温馨提示');
			}
			upData();
		}
	});
}

function recoverTaskGroup(){
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
	    	data.domaindeepevaluationtaskid = record.data.domaindeepevaluationtaskid;
			data.triggername = record.data.triggername;
			data.jobstate = '1';
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDomaindeepEvaluationTask';
			
	    	M.rpc._call(recoverCallBack,'smDomainDeepEvaluationTaskAction.onBoRecover',data);
	    }
		function recoverCallBack(result){
			if(result == "recoverSuccess"){
				showTipWindow('恢复成功','comment','温馨提示');
			}else{
				showTipWindow('恢复失败,请重新恢复','comment','温馨提示');
			}
			upData();
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