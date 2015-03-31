var userColumns = [new Ext.grid.RowNumberer(), {
	header: '策略ID',
	width: 130,
	sortable: true,
	dataIndex: 'policyID',
	hidden: true,
	hideable: false
	
}, {
	header: '策略名称',
	width: 200,
	sortable: true,
	dataIndex: 'policyName',
	hidden: false,
	hideable: false
	
}, {
	header: '策略说明',
	width: 300,
	sortable: true,
	dataIndex: 'policyDsc',
	hidden: false,
	hideable: false
	
}, {
	header: '模板编码',
	width: 200,
	sortable: true,
	dataIndex: 'templateCode',
	hidden: true,
	hideable: false
	
}, {
	header: '使用模板',
	width: 200,
	sortable: true,
	dataIndex: 'templateName',
	hidden: false,
	hideable: false
	
}, {
	header: '创建日期',
	width: 200,
	sortable: true,
	dataIndex: 'updateDate',
	hidden: false,
	hideable: false
	
}];



var queryFields = [
{
	text : '添加',
	iconCls : 'dataTableList-add-icon',
	handler: function(){
		showPolicy('add')
	}
}, '-', 
{
	text: '修改',
	iconCls: 'dataTableList-modify-icon',
	handler: function(){
		showPolicy('update')
	}
}, '-', {
	text : '删除',
	iconCls : 'dataTableList-delete-icon',
	scope : this,
	handler : deletePolicy
}, '-',
{text: '策略名称'},
{
	xtype : 'textfield',
	id : 'policyName',
	width : 90
}, '-',
{
	text : '<span style="margin-left:20px;">查询</span>',
	cls:'search-button',
	minWidth:82,
	height:27,
	handler : function() {
		initGrid();
	}
}, '-', {
	text : '<span style="margin-left:20px;">刷新</span>',
	cls: 'refresh-button', 
	minWidth:82,
	height:27,
	handler : function() {
		Ext.getCmp('policyName').setValue('');
		initGrid();
	}
}];
var formPanel;
var tabPanel;
var win;
this.operate;
function showPolicy(operate) {
	if(operate == 'update'){
		var record = grid.getSelectionModel().getSelected();
		if(!record){
			Ext.Msg.alert('温馨提示','请先选中一条数据');
			return;
		}
	}
	this.operate = operate;
	if(!Ext.isDefined(formPanel)){
		formPanel = new Ext.FormPanel({
			baseCls: 'x-plain',
			border: false,
	        labelAlign: 'right',
	        buttonAlign: 'center',
	        bodyStyle: 'padding: 0px, 17px, 0px, 0px',
	        labelWidth: 80,
	        // 渲染表单背景
	        baseCls: 'x-panel-mc',
	        items: [{
	            layout: 'column',
	            style:'background-color:#f8f8f8',
	            bodyStyle:'background:transparent',
	            defaults: {
	                layout: 'form'
	            },
	            items: [{
	                columnWidth: .8,
	                items: [{
	                    xtype: 'textfield', 
	                    fieldLabel: '策略ID',
						name: 'policyID',
						hidden: true,
	                    maxLength: 128,
	                    anchor: '95%'
	                }]
	            },{
	                columnWidth: .8,
	                items: [{
	                    xtype: 'textfield', 
	                    fieldLabel: '策略名称',
						name: 'policyName',
						allowBlank: false,
						blankText: "策略名称不能为空！",
						hidden: false,
	                    maxLength: 128,
	                    anchor: '95%'
	                }]
	            }, {
	                columnWidth: .8,
	                items: [{
	                    xtype: 'textarea', 
	                    fieldLabel: '策略说明',
						name: 'policyDsc',
						allowBlank: true,
						hidden: false,
	                    maxLength: 1000,
	                    anchor: '95%'
	                }]
	            }, {
	                columnWidth: .8,
	                items: [new Ext.form.ComboBox({
								id: 'templateCode',
							    hiddenName: 'templateCode',
							    store: System.common.states.stores.TEMPLATE_TYPE,
							    fieldLabel: '模板',
							    anchor: '95%',
							    editable: false,
							    valueField: 'ITEM_CODE',
							    displayField: 'ITEM_NAME',
								value: 'TB_S_W_0004',
							    emptyText: '***请选择***',
							    triggerAction: 'all',
							    mode: 'local',
								listeners: {
									"select": function(obj) {
										InitEnableOrDisable(obj.value);
									} 
								}
							})
					]
	            }]
			}]
		})
	}
	
	if(!Ext.isDefined(tabPanel)){
		tabPanel = new Ext.TabPanel({
			tabWidth: 120,
			height: 200,
	        border: false,
	        resizeTabs: false,
			enableTabScroll:true,
//			wangning 2013-12-20 解决tab页面中的gridpanel中的pagepanel的每页显示下拉框的问题。
//			deferredRender:false, 
	        layoutOnTabChange: true,
			activeTab: 1,
	        defaults: {
	            layout: 'fit'
//				autoScroll:true
	        },
	        items: [
	    	{
				id:'tab01ID',
	            title: '质量',
				iconCls: 'icon-002',
				bodyStyle:'border: 1px solid #e1e1e1',
	            layout: 'fit',
				border: false,
				margins: '0 5 0 5',
				items: [qualityGrid]
	    	},
{
				id:'tab02ID',
	            title: '成本',
				iconCls: 'icon-002',
	            layout: 'fit',
				border: false,
				margins: '0 0 0 0',
				items: [costingPanel]
	    	}
			]
		})
	}
	if(!Ext.isDefined(win)){
		win = new Ext.Window({
			id : 'win',
			plain: true,
	        layout: 'border',
	        bodyStyle:'background: none repeat scroll 0 0 rgba(0, 0, 0, 0);',
	        style:'border:none',
			width : 650,
			height : 455,
			border : false,
			title : '策略配置',
			closeAction : 'hide',
			items : [{
		        region: 'north',
		        iconCls: 'panel-search-icon',
		        height: 130,
		        margins: '12 5 5 12',
//		        collapsible: true,
		        layout: 'fit',
		        items: formPanel
		    }, {
		        region: 'center',
		        iconCls: 'panel-grid-icon',
		        autoScroll: true,
		        margins: '0 5 5 12',
		        layout: 'fit',
		        // 设置默认查询条件
		        items: tabPanel
		    }],
			buttons : [{
				text : '保存',
				handler : function(){
					onBoSave();
				}
			},{
				text : '取消',
				handler : function(){
					win.hide();
				}
			}]
		});
	}
	var form = formPanel.getForm();
	if(operate == 'add'){
		form.reset();
		form.findField('policyID').setValue('');
		form.findField('policyName').setValue('');
		form.findField('policyDsc').setValue('');
		form.findField('templateCode').setValue('TB_S_W_0004');
		var data = {};
		costingDesGrid.setParams(data);
		costingDesGrid.doSearchList();
		
		Ext.getCmp('expressions').setValue('');
	}else{
		var record = grid.getSelectionModel().getSelected();
		//表单初始化值
		form.findField('policyID').setValue(record.get('policyID'));
		form.findField('policyName').setValue(record.get('policyName'));
		form.findField('policyDsc').setValue(record.get('policyDsc'));
		form.findField('templateCode').setValue(record.get('templateCode'));
		
		var data = {};
		data.policyID = record.get('policyID');
		data.templateCode = record.get('templateCode');
		costingDesGrid.setParams(data);
		costingDesGrid.doSearchList();
		if(data.templateCode !== 'TB_S_W_0004'){
			M.rpc._call(setQualityExpressions, 'domainDispatchPolicyConfAction.getQualityExpressions',{
    			javaClass : 'java.util.HashMap', map : data
			});
		}
	}
	
	var templateCode = Ext.getCmp('templateCode').value;
	InitEnableOrDisable(templateCode)
	win.show();
}

function InitEnableOrDisable(templateCode) {
	if(templateCode == 'TB_S_W_0004'){ // 当模板选择成本时
		tabPanel.setActiveTab('tab02ID');
		tabPanel.getItem('tab02ID').enable();
		tabPanel.getItem('tab01ID').disable();
	} else if(templateCode == 'TB_S_W_0007'){
		tabPanel.setActiveTab('tab01ID');
		tabPanel.getItem('tab01ID').enable();
		tabPanel.getItem('tab02ID').disable();
		
	} else{ //ALL
		tabPanel.setActiveTab('tab01ID');
		tabPanel.getItem('tab01ID').enable();
		tabPanel.getItem('tab02ID').enable();
	}
}
function setQualityExpressions(result){
	Ext.getCmp('expressions').setValue(result);
}
function deletePolicy(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	Ext.Msg.confirm('温馨提示','是否要删除一条数据？',function(btn){
		if(btn == 'yes'){
	    	var data = {};
	    	data.policyID = record.get('policyID')
	    	M.rpc._call(delCallBack,'domainDispatchPolicyConfAction.deletePolicyConf',{
	    		javaClass : 'java.util.HashMap',map : data
	    	});
	    }
		function delCallBack(result){
			if(result == 'sucess'){
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				Ext.ux.MessageBox.info("提示", "删除成功！", (function(){
					grid.setParams(data);
					grid.doSearchList();
	            }).createDelegate(this));
				
			}
		}
	});
}
function onBoSave(){
	var form = formPanel.getForm();
	if(form.isValid()){
		var data = {};
		var policyID = form.findField('policyID').getValue();
		var policyName = form.findField('policyName').getValue();
		var policyDsc = form.findField('policyDsc').getValue();
		var templateCode = form.findField('templateCode').getValue();
		var templateName = form.findField('templateCode').el.dom.value;
		
		data.policyID = policyID;
		data.policyName = policyName;
		data.policyDsc = policyDsc;
		data.templateCode = templateCode;
		data.templateName = templateName;
		data.operate = this.operate;
		
		if (templateCode == 'TB_S_W_0004') {
			data.policyConfCode = getCostingDesPolicyConfCode();
			if(Ext.isEmpty(getCostingDesPolicyConfCode())){
				Ext.Msg.alert('提示', '必须选择一个成本！');
				return;
			}
			
		}else if(templateCode == 'TB_S_W_0007') {
			data.expressions = getQualityExpressions();
			if(Ext.isEmpty(getQualityExpressions())){
				Ext.Msg.alert('提示', '质量分数表达式不能为空！');
				return;
			}
			
		}else{ //ALL
			if(Ext.isEmpty(getQualityExpressions())){
				Ext.Msg.alert('提示', '质量分数表达式不能为空！');
				return;
			}
			if(Ext.isEmpty(getCostingDesPolicyConfCode())){
				Ext.Msg.alert('提示', '必须选择一个成本！');
				return;
			}
			data.policyConfCode = getCostingDesPolicyConfCode();
			data.expressions = getQualityExpressions();
		}
		
		//检查是否重名
		M.rpc._call(function(result){
			if(result != 'ok'){
				Ext.Msg.alert('提示', result);
				flag = true;
			}else{
				M.rpc._call(saveCallBack,'domainDispatchPolicyConfAction.savePolicyConf', {
					javaClass : 'java.util.HashMap',
					map : data
				});
			}
		},'domainDispatchPolicyConfAction.checkReName', {
			javaClass : 'java.util.HashMap',
			map : data
		});
	}
	function saveCallBack(result){
		if(result == "sucess"){
			var tbar = grid.getTopToolbar();
			var queryFields = tbar.findByType('field');
			var data = {};
			for(var i = 0; i < queryFields.length;i++)
			{
				data[queryFields[i].getName()] = queryFields[i].getValue();
			}
			Ext.ux.MessageBox.info("提示", "保存成功！", (function(){
				grid.setParams(data);
				grid.doSearchList();
				win.hide();
            }).createDelegate(this));
		}
		
	}
}
var grid = new Ext.ux.Grid( {
	dataMethod : 'domainDispatchPolicyConfAction.getDomainDispatchPolicyList',
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

grid.on("dblclick", function() {
	showPolicy('update');
})
function initGrid() {
	var data = getData();
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
	initGrid();
});