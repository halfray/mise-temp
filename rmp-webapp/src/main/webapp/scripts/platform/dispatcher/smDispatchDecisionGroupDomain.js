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
				var id = grid.getSelectionModel().getSelected().data.smdispatchdecisiongroupdomainid;
				var map = {smDispatchDecisionGroupDomainId : id};
				var res = M.rpc._call("smDispatchDecisionGroupDomainAction.getDomainsById", {
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
				queryList : 'dmHotdomainSortProvinceListProvider.do',
				action : 'dmHotdomainSortProvinceAction.do'
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
				3: "domaindnsresolnum",          
				4: "dnsinresolnum",          
				5: "dnspercentage"   
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
			
			var systemDeloyProvince =M.rpc._call("smDispatchDecisionGroupDomainAction.getSystemDeployProvince");
			
			
			var queryFields = [{
						text : "域名"
					}, {
						xtype : 'textfield',
						id : '#domain',
						width : 120
					}, {
						xtype : 'textfield',
						id : '#province',
						value : systemDeloyProvince,
						hidden : true
					}];

			// 
			var queryParms = [{
						name : 'domain',
						indicator : 'EXAMPLE_LIKE'
					}, {
						name : 'province',
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
			this.leftgrid = new Ext.grid.GridPanel({
				width : 150,
				height : 300,
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
var policyName = new Ext.ux.seraph.DictCombo( {
	name : 'policyname',
	fieldLabel : '调度策略',
	allowBlank : false,
	url : 'dispatchPolicyProvider.do',
	displayField : 'policyName',
	valueField : 'policyID',
	width : 150
});
function operate(val,cell,record,rowIndex,columnIndex,store){
	var smid = record.get("smdispatchdecisiongroupdomainid");
	var contentId = Ext.id();   
	var btn = createGridButton.defer(1, this, [contentId]);   
	function createGridButton(){   
	 return new Ext.Button({   
		text: '审批明细',   
		handler: function(){   
		    approveDetail(smid);
		}   
	}).render(document.body, contentId);   
	}   
	return('<div id="'+contentId+'"/>');  
}

function approveDetail(smid){
	var province = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue' ,
	    value : '510000',
	    width : 120,
	    name : 'provinceName'
	 });

	var operator = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue' ,
	    name : 'operator'
	 });
	var system = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue' ,
	    name : 'system'
	 });
	
	var issuedState = new Ext.ux.seraph.DictCombo( {
		url : 'parmInfoProvider.do?parmType=ISSUED_STATE',
		displayField : 'parmName',
		valueField : 'parmCode'
	});
	
	var detailColumns = [new Ext.grid.RowNumberer(),{
		header : '调度策略组ID',
		sortable : true,
		hidden : true,
		dataIndex : 'smDispatchDecisionGroupDomainId'
	},{
		header : '域名',
		sortable : true,
		width : 140,
		dataIndex : 'domain'
	},{
		header : '可以下发的IP个数',
		sortable : true,
		width : 110,
		dataIndex : 'ipNum'
	},{
		header : '任务执行时间',
		sortable : true,
		width : 130,
		dataIndex : 'taskTime'
	}];
	
	var detailGrid = new Ext.ux.Grid( {
		dataMethod : 'smDispatchDecisionGroupDomainAction.getApproveDetail',
		viewData:false,
		columns : detailColumns,
		//border : false,
		frame : false,
		height : 330,
		width : 410,
		fetchSize : 10,
		columnLines : true,
		litePagingBar : true,
		sortBar : false,
		sm : new Ext.grid.CheckboxSelectionModel( {
			singleSelect : true
		}),
		tbar : [new Ext.Button({})],
		colspan : 8,
		listeners : {
			rowclick : function(){
				getIpDetail();
			}
		}
	});
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var ipColumns = [new Ext.grid.RowNumberer(),sm,{
		header : 'ID',
		sortable : true,
		hidden : true,
		dataIndex : 'id'
	},{
		header : '调度策略组ID',
		sortable : true,
		hidden : true,
		dataIndex : 'smDispatchDecisionGroupDomainId'
	},{
		header : 'IP',
		sortable : true,
		width : 120,
		dataIndex : 'ip'
	},{
		header : 'IP所属运营商',
		sortable : true,
		width : 90,
		dataIndex : 'operator',
		renderer: Ext.ux.renderer.Combo(operator)
	},{
		header : 'IP所属省份',
		sortable : true,
		width : 80,
		dataIndex : 'province',
		renderer: Ext.ux.renderer.Combo(province)
	},{
		header : 'IP所属系统',
		sortable : true,
		width : 80,
		dataIndex : 'system',
		renderer: Ext.ux.renderer.Combo(system)
	},{
		header : 'IP质量分',
		sortable : true,
		width : 70,
		dataIndex : 'quaStore'
	},{
		header : '数据更新日期',
		sortable : true,
		width : 100,
		dataIndex : 'dataUpdate'
	},{
		header : '状态',
		sortable : true,
		width : 60,
		dataIndex : 'state',
		renderer: Ext.ux.renderer.Combo(issuedState)
	},{
		header : '下发时间',
		sortable : true,
		width : 130,
		dataIndex : 'issuedTime'
	}];
	
	var approve = new Ext.Button({
		text : '审批通过',
		iconCls: 'dataTableList-add-icon', 
		handler : approveDetail
	});
	
	var toolbar = [ approve ];
	
	var ipGrid = new Ext.ux.Grid( {
		dataMethod : 'smDispatchDecisionGroupDomainAction.getIPDetail',
		columns : ipColumns,
		//border : false,
		frame : false,
		height : 330,
		width : 520,
		fetchSize : 10,
		columnLines : true,
		litePagingBar : true,
		sortBar : false,
		viewData : false,
		sm : sm,
		tbar : toolbar,
		colspan : 8
	});
	
	var panel = new Ext.Panel({
    	autoHeight:true,
    	layout : 'table',
    	border : false,
    	bodyBorder : false,
    	items : [detailGrid,ipGrid]
    });
	
	var windowsDetail = new Ext.Window({
  		xtype : "window",
  		title : "审批明细",
  		width : 940,
  		height : 374,
  		border: false,
  		bodyBorder: false,
  		autoScroll : true,
  		closeAction : 'hide',
  		items : [panel ]
  	  });
	  
	windowsDetail.show();
	
	updateDetailGrid();
	
	function updateDetailGrid(){
		var data = {};
		data.smDispatchDecisionGroupDomainId = smid;
		detailGrid.setParams(data);
		detailGrid.doSearchList();
	}
	
	function getIpDetail(){
		var record = detailGrid.getSelected();
		var data = {};
		data.domain = record.data.domain;
		data.taskTime = record.data.taskTime;
		data.smDispatchDecisionGroupDomainId = record.data.smDispatchDecisionGroupDomainId;
		ipGrid.setParams(data);
		ipGrid.doSearchList();
	}
	
	function approveDetail(){
		var records = ipGrid.getSelections();
		if(records.length == 0){
			Ext.Msg.alert('温馨提示','请选中要审核的数据');
			return;
		}
		
		var ips = '';
		var quaScores = '';
		var ids = '';
		var detailRes = detailGrid.getSelected();
		var domain = detailRes.data.domain;
		
		for(var i = 0;i < records.length;i++){
			if(i == records.length - 1){
				ids += records[i].get('id');
				ips += records[i].get('ip');
				if(records[i].get('quaScore') == undefined){
					quaScores += '0';
				}else{
					quaScores += records[i].get('quaScore');
				}
			}else{
				ids += records[i].get('id')+',';
				ips += records[i].get('ip')+' ';
				if(records[i].get('quaScore') == undefined){
					quaScores += '0'+ ' ';
				}else{
					quaScores += records[i].get('quaScore')+' ';
				}
			}
		}
		var map = {};
		map.ips = ips;
		map.quaScores = quaScores;
		map.domain = domain;
		map.ids = ids;
		map.smdispatchdecisiongroupdomainid = smid;
		map.issuedTime = new Date().format('Ymd H:i:s');
		
		M.rpc._call(confirmDispatchCallBack,'smDispatchDecisionGroupDomainAction.confirmDispatch',{
			javaClass : 'java.util.HashMap',map : map
		});
		
		function confirmDispatchCallBack(result){
			if(result == true){
				//windowsDetail.close();
				var data = {};
				ipGrid.doSearchList();
				showTipWindow('审核成功','comment','温馨提示');
			}else{
				showTipWindow('审核失败','comment','温馨提示');
			}
		}
	}
}

var userColumns = [ new Ext.grid.RowNumberer(),{
		header : 'ID',
		sortable : true,
		hidden : true,
		dataIndex : 'smdispatchdecisiongroupdomainid'
	}, {
		header : '调度组名称',
		width : 120,
		sortable : true,
		dataIndex : 'dispatchgroupname'
	}, {
		header : '使用策略',
		width : 100,
		sortable : true,
		dataIndex : 'policyname',
		renderer: Ext.ux.renderer.Combo(policyName)
	}, {
		header : '调度域名个数',
		width : 120,
		sortable : true,
		dataIndex : 'dispatchdomainnum'
	}, {
		header : '定时方式',
		width : 100,
		sortable : true,
		dataIndex : 'cronexpression'
	}, {
		header : '开始时间',
		width : 130,
		sortable : true,
		dataIndex : 'dispatchdate'
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
	}, {
		header : '操作',
		width : 80,
		sortable : true,
		dataIndex : 'operate',
		renderer : operate
	}, {
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
		dataIndex : 'triggerName'
	}, {
		header : '类名称',
		width : 80,
		hidden : true,
		sortable : true,
		dataIndex : 'className'
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
	handler : addDispatchGroup
});
var edit = new Ext.Button({
	text : '修改',
	iconCls: 'dataTableList-modify-icon', 
	handler : editDispatchGroup
});
var del = new Ext.Button({
	text : '删除',
	iconCls: 'dataTableList-delete-icon', 
	handler : delDispatchGroup
});
var start = new Ext.Button({
	text : '启动',
	iconCls: 'control-icon', 
	handler : startDispatchGroup
});
var pause = new Ext.Button({
	text : '暂停',
	iconCls: 'pause-icon', 
	handler : pauseDispatchGroup
});
var recover = new Ext.Button({
	text : '恢复',
	iconCls: 'restart-icon', 
	handler : recoverDispatchGroup
});

var dispatchGroupName = new Ext.form.TextField({
	name : 'dispatchGroupName',
	width : 120
});

var toolbar = [ add,'-',edit,'-',del,'-',start,'-',pause,'-',recover,'-',{
	text : '调度组名称'
	}, 
	dispatchGroupName,
	search, '-', reset 
  ];

var grid = new Ext.ux.Grid( {
	dataMethod : 'smDispatchDecisionGroupDomainAction.getList',
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
			editDispatchGroup();
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
		
		var smDispatchDecisionGroupDomainId = new Ext.form.TextField({
			id : 'smdispatchdecisiongroupdomainid',
			name : 'smdispatchdecisiongroupdomainid',
			fieldLabel : 'ID',
			hidden : true
		});
		var dispatchGroupName = new Ext.form.TextField({
			name : 'dispatchgroupname',
			width : 150,
			fieldLabel : '组名称',
			allowBlank : false
		});
		
		var domains = new trigger({
			fieldLabel : '域名配置',
			name : 'domains',
			width : 150,
			editable:false,
			allowBlank : false
		});
		var cronExpression = new Ext.form.TextField({
			name : 'cronexpression',
			width : 150,
			allowBlank : false,
			fieldLabel : '定时方式'
		});
		var triggerName = new Ext.form.TextField({
			name : 'triggerName',
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
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:13px; border: 0px solid;',
			autoScroll: true,
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [smDispatchDecisionGroupDomainId,dispatchGroupName,policyName,
			        domains,{
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
  		x : windows.x+320,
  		y : windows.y,
  		width : 320,
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
function addDispatchGroup(){
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
    		width : 320,
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
		}else{
			windows.setTitle('添加记录');
		}
	windows.show();
}

function editDispatchGroup(){
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
			width : 350,
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
		
		var dispatchGroupName = form.findField('dispatchgroupname').getValue();
		data.smdispatchdecisiongroupdomainid = form.findField('smdispatchdecisiongroupdomainid').getValue();
		data.dispatchgroupname = dispatchGroupName;
		data.policyname = form.findField('policyname').getValue();
		data.domains = form.findField('domains').getValue();
		data.cronexpression = form.findField('cronexpression').getValue();
		data.triggerName = dispatchGroupName+'Trigger';	
		data.className = 'com.neteast.rmp.web.taskManager.DispatchDecisionGroupJob';
		
		var isStart = form.findField('isstart').getValue();
		data.isstart = isStart;
		
		if(isStart == '1'){
			data.jobstate = '1';
		}else{
			data.jobstate = '3';
		}
		data.dispatchdate = new Date().format('Y-m-d H:i:s');
		data.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchDecisionGroupDomain';
		
		
		M.rpc._call(saveCallBack,'smDispatchDecisionGroupDomainAction.onBoSave', data);
		
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

function delDispatchGroup(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.smdispatchdecisiongroupdomainid = record.data.smdispatchdecisiongroupdomainid;
	    	data.triggerName = record.data.triggerName;
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchDecisionGroupDomain';
			
	    	M.rpc._call(delCallBack,'smDispatchDecisionGroupDomainAction.onBoDel',data);
	    }
		function delCallBack(result){
			if(result != 'delFail'){
				showTipWindow('删除成功','comment','温馨提示');
			}else{
				showTipWindow('删除失败','comment','温馨提示');
			}
			upData();
		}
	});
}

function startDispatchGroup(){
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
	    	data.smdispatchdecisiongroupdomainid = record.data.smdispatchdecisiongroupdomainid;
			data.dispatchgroupname = record.data.dispatchgroupname;
			data.cronexpression = record.data.cronexpression;
			data.triggerName = record.data.triggerName;
			data.domains = record.data.domains;
			data.policyname = record.data.policyname;
			data.className = 'com.neteast.rmp.web.taskManager.DispatchDecisionGroupJob';
			data.jobstate = '1';
			data.dispatchdate = new Date().format('Y-m-d H:i:s');
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchDecisionGroupDomain';
			
	    	M.rpc._call(startCallBack,'smDispatchDecisionGroupDomainAction.onBoStart',data);
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

function pauseDispatchGroup(){
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
	    	data.smdispatchdecisiongroupdomainid = record.data.smdispatchdecisiongroupdomainid;
			data.triggerName = record.data.triggerName;
			//2为暂停
			data.jobstate = '2';
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchDecisionGroupDomain';
			
	    	M.rpc._call(pauseCallBack,'smDispatchDecisionGroupDomainAction.onBoPause',data);
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

function recoverDispatchGroup(){
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
	    	data.smdispatchdecisiongroupdomainid = record.data.smdispatchdecisiongroupdomainid;
			data.triggerName = record.data.triggerName;
			data.jobstate = '1';
			
			data.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchDecisionGroupDomain';
			
	    	M.rpc._call(recoverCallBack,'smDispatchDecisionGroupDomainAction.onBoRecover',data);
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