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
			this.ipsValue = value.split(",");
			var map = {domains : value};
			var res = M.rpc._call("smDomainCrawlerTaskAction.getDomainList", {
						javaClass : "java.util.HashMap",
						map : map
					});
			
			if(Ext.isEmpty(res)) res = [];
			
			this.leftgrid.getStore().loadData({list:res});
			
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
							text : '<span style="margin-left:20px;">查询</span>',
							cls:'search-button',
							minWidth:82,
							height:27,
							handler : function() {
								gridSelf.loadData();
							}
						}, '-', {
							text : '<span style="margin-left:20px;">刷新</span>',
							cls: 'refresh-button', 
							minWidth:82,
							height:27,
							handler : function() {
								gridSelf.clearData();
							}
						}]
					}
				});
		var formFields = [];
		this.userGrid = new userGridSelf({
					width : 300,
					height : 300,
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
		this.leftgrid = new Ext.grid.EditorGridPanel({
			width : 150,
			height : 300,
			border: false,
			style:'border-right:solid 1px #add9c0;',
			columns : [sm].concat([{
					header : '域名',
					width : 240,
					sortable : true,
					dataIndex : "domain",
					editor:new Ext.form.TextField({
						name:'domainId'
					})
				}]),
			sm : sm,
			tbar : [{
	    		text:'添加',
	    		iconCls:'dataTableList-add-icon',
	    		scope : this,
	    		handler:function(){
					var gridSelf = this.leftgrid;
					
					var record = new Ext.data.Record({
						domain : ''
					});
					gridSelf.getStore().add(record);
	    		}
	    	},{
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
//			height : 500,
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

function openWin(taskNo){
	var data = {};
	data.taskNo = taskNo;
	var conf = {
			href : 'queryCrawlerTask.do?uxParams='+ encodeURI(Ext.encode(data)),
			text:  '查询爬虫任务详细',
			icon: '',
			tipinfo: ''
		};
	Main.fun.openWin(conf, 'tab');
}

var cawlerType = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=CRAWLER_TYPE',
	displayField : 'parmName',
	valueField : 'parmCode'
});

var userColumns = [ new Ext.grid.RowNumberer(),{
		header : 'ID',
		sortable : true,
		hidden : true,
		dataIndex : 'smCrawlerTaskid'
	}, {
		header : '任务号',
		width : 100,
		sortable : true,
		dataIndex : 'taskNo'
	}, {
		header : '任务名称',
		width : 120,
		sortable : true,
		dataIndex : 'taskName'
	}, {
		header : '描述',
		width : 120,
		sortable : true,
		dataIndex : 'description'
	}, {
		header : '下发域名',
		sortable : true,
		width : 150,
		dataIndex : 'domains'
	}, {
		header : '测试周期(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'timeInterval'
	}, {
		header : '测试时长(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'lifeTime'
	}, {
		header : '执行次数',
		width : 70,
		sortable : true,
		dataIndex : 'executeCount'
	}, {
		header : '开始时间',
		width : 70,
		sortable : true,
		dataIndex : 'beginTime'
	}, {
		header : '爬虫类型',
		width : 70,
		sortable : true,
		dataIndex : 'method',
		renderer: Ext.ux.renderer.Combo(cawlerType)
	}, {
		header : '下发时间',
		width : 130,
		sortable : true,
		dataIndex : 'createTime'
	}, {
		header : '任务查询',
		width : 80,
		sortable : true,
		dataIndex : 'query',
		renderer: function(v, p, record, rowIndex, index, store){
			var taskNo = record.data.taskNo
  			return ['<a href="#" onclick="openWin(\''+taskNo+'\')"><span>', '查询' , '</span></a>&nbsp;'].join('');
	  	}
	}];

var search = new Ext.Button({
	text : '查询',
	iconCls: 'search-button', 
	handler : upData
});
var reset = new Ext.Button({
	text : '刷新',
	iconCls: 'refresh-button', 
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
	handler : addCrawlerTask
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editCrawlerTask
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delCrawlerTask
});

var taskName = new Ext.form.TextField({
	name : 'taskName',
	width : 120
});

var domains = new Ext.form.TextField({
	name : 'domains',
	width : 120
});

var toolbar = [ add,'-',edit,'-',del,'-',{
		text : '任务名称'
	}, 
	taskName,{
		text : '包含域名'
	}, 
	domains,
	search, '-', reset 
  ];

var grid = new Ext.ux.Grid( {
	dataMethod : 'smDomainCrawlerTaskAction.getList',
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
			editCrawlerTask();
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

Ext.form.NumberField.prototype.size = 20;
Ext.form.NumberField.prototype.initValue = function()
{
    if(this.value !== undefined){
        this.setValue(this.value);
    }else if(this.el.dom.value.length > 0){
        this.setValue(this.el.dom.value);
    }
    this.el.dom.size = this.size;
    if (!isNaN(this.maxLength) && (this.maxLength *1) > 0 && (this.maxLength != Number.MAX_VALUE)) {
        this.el.dom.maxLength = this.maxLength *1;
    }
        
};

var regex=/^\S*$/;
var formPanel;
function getFormPanel(){
	if(Ext.isEmpty(formPanel)){
		
		var smCrawlerTaskid = new Ext.form.TextField({
			name : 'smCrawlerTaskid',
			fieldLabel : 'ID',
			hidden : true
		});
		var taskNo = new Ext.form.TextField({
			name : 'taskNo',
			width : 150,
			allowBlank : false,
			regex : regex,
			regexText : '任务号中不能包含空格!',
			fieldLabel : '任务号'
		});
		var taskName = new Ext.form.TextField({
			name : 'taskName',
			width : 150,
			allowBlank : false,
			fieldLabel : '任务名称'
		});
		var description = new Ext.form.TextField({
			name : 'description',
			width : 150,
			fieldLabel : '任务描述'
		});
		var domains = new trigger({
			fieldLabel : '下发域名',
			name : 'domains',
			width : 150,
			allowBlank : false,
			editable:false
		});
		var timeInterval = new Ext.form.NumberField({
			name : 'timeInterval',
			width : 150,
			allowBlank : false,
			allowNegative : false,
			maxLength : 15,
			allowBlank : false,
			fieldLabel : '测试周期(ms)'
		});
		var lifeTime = new Ext.form.NumberField({
			name : 'lifeTime',
			width : 150,
			allowBlank : false,
			fieldLabel : '测试时长(ms)'
		});
		var executeCount = new Ext.form.NumberField({
			name : 'executeCount',
			width : 150,
			allowBlank : false,
			fieldLabel : '执行次数'
		});
		var beginTime = new Ext.form.NumberField({
			name : 'beginTime',
			width : 150,
			allowBlank : false,
			fieldLabel : '开始时间'
		});
		var method = new Ext.ux.seraph.DictCombo( {
			name : 'method',
			fieldLabel : '爬虫类型',
			width : 150,
			url : 'parmInfoProvider.do?parmType=CRAWLER_TYPE',
			displayField : 'parmName',
			valueField : 'parmCode',
			value : '0'
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
			items: [smCrawlerTaskid,taskNo,taskName,description,domains,timeInterval,lifeTime,executeCount,beginTime,method]
		});
		
	}
	return formPanel;
}

var windows;
function addCrawlerTask(){
	var formPanel = getFormPanel();
	formPanel.getForm().reset();
	
	formPanel.getForm().findField('domains').setValue('');
	var fields = formPanel.findByType('field');
	for(var i = 0; i < fields.length;i++)
	{
		if(fields[i].getName() == 'lifeTime'){
			fields[i].setValue('0');
		}else if(fields[i].getName() == 'executeCount'){
			fields[i].setValue('0');
		}else if(fields[i].getName() == 'beginTime'){
			fields[i].setValue('0');
		}else{
			fields[i].setValue('');
		}
	}
	
	
	if(Ext.isEmpty(windows))
		{
    	windows = new Ext.Window({
    		xtype : "window",
    		title : "添加记录",
    		width : 330,
    		height : 426,
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
		}else{
			windows.setTitle('添加记录');
		}
	windows.show();
}

function editCrawlerTask(){
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
			width : 330,
    		height : 426,
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
			}
			}]
		});
	}else{
		windows.setTitle('修改记录');
	}
	formPanel.getForm().reset();
	formPanel.getForm().setValues(record.json);
	windows.show();
}

function onBoSave(windows){
	var form = getFormPanel().getForm();
	if(form.isValid()){
		var data = {};
		data.smCrawlerTaskid = form.findField('smCrawlerTaskid').getValue();
		data.taskNo = form.findField('taskNo').getValue();
		data.taskName = form.findField('taskName').getValue();
		data.domains = form.findField('domains').getValue();
		data.description = form.findField('description').getValue();
		data.timeInterval = form.findField('timeInterval').getValue();
		data.lifeTime = form.findField('lifeTime').getValue();
		data.executeCount = form.findField('executeCount').getValue();
		data.beginTime = form.findField('beginTime').getValue();
		data.method = form.findField('method').getValue();
		data.createTime = new Date().format('Y-m-d H:i:s');
		data.command = 'add';
		
		data.javaClass = 'com.neteast.rmp.dao.domain.SmCrawlerTask';
		
		
		M.rpc._call(saveCallBack,'smDomainCrawlerTaskAction.onBoSave', data);
		
	}
	function saveCallBack(result){
		windows.hide();
		form.reset();
		if(result){
			if(result == 'success'){
				showTipWindow('保存成功,任务已运行','comment','温馨提示');
			}
		}else{
			showTipWindow('下发爬虫失败,请重新下发','comment','温馨提示');
		}
		upData();
	}
}

function delCrawlerTask(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.smCrawlerTaskid = record.data.smCrawlerTaskid;
	    	data.taskNo = record.data.taskNo;
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmCrawlerTask';
			
	    	M.rpc._call(delCallBack,'smDomainCrawlerTaskAction.onBoDel',data);
	    }
		function delCallBack(result){
			if(result){
				if(result == 'success'){
					showTipWindow('删除成功','comment','温馨提示');
				}
			}else{
				showTipWindow('删除失败','comment','温馨提示');
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