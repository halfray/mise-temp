var URL = {
	queryList : 'rmTaskGroupListProvider.do',
	action : 'rmTaskGroupAction.do'
};
// -> Primary key
var PK = ["taskId"];

var storeFields = [{
			name : 'taskId',
			type : 'string'
		}, {
			name : 'taskGroupType',
			type : 'string'
		}, {
			name : 'taskState',
			type : 'string'
		}, {
			name : 'taskGroupName',
			type : 'string'
		}, {
			name : 'maxAge',
			type : 'string'
		}, {
			name : 'contentLength',
			type : 'string'
		}, {
			name : 'method',
			type : 'string'
		}, {
			name : 'lastDayId'
		}];

var state = new Ext.ux.seraph.DictCombo({
			url : 'rmTaskGroups.do?method=getTaskStates&&params={type:1}', // 任务状态????
			displayField : 'codeLabel',
			valueField : 'codeValue'
		});

var formFields = [];

var userColumns = [{
			header : "taskId",
			sortable : true,
			dataIndex : 'taskId',
			hidden : true,
			hideable : false
		}, {
			header : "任务组名称",
			width : 260,
			sortable : true,
			dataIndex : 'taskGroupName',
			hidden : false,
			hideable : false,
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : "探测方式",
			sortable : true,
			width : 120,
			dataIndex : 'taskGroupType',
			hidden : false,
			hideable : false,
			renderer : function(value) {
				if (value == "1")
					return "通用方式";
				else if (value == "2")
					return "集团方式";
				else
					return "";
			}
		}, {
			header : "max-age",
			width : 120,
			sortable : true,
			dataIndex : 'maxAge',
			hidden : false,
			hideable : false,
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : "内容长度",
			width : 120,
			sortable : true,
			dataIndex : 'contentLength',
			hidden : false,
			hideable : false,
			editor : {
				xtype : 'textfield'
			}
		}, {
			header : "获取方式",
			width : 120,
			sortable : true,
			dataIndex : 'method',
			hidden : false,
			hideable : false,
			editor : {
				xtype : 'textfield'
			},
			renderer : function(value) {
				if (value == '1')
					return 'HEAD';
				else if (value == '2')
					return 'GET';
			}
		}, {
			header : "状态",
			width : 80,
			sortable : true,
			dataIndex : 'taskState',
			hidden : false,
			hideable : false,
			renderer : Ext.ux.renderer.Combo(state)
		}, {
			header : '最后一次调度时间',
			width : 120,
			sortable : true,
			dataIndex : 'lastDayId',
			hidden : false,
			hideable : false
		}];

var queryFields = [{
			text : '任务组名称'
		}, {
			xtype : 'textfield',
			id : '#taskGroupName',
			width : 90
		}, {
			text : '任务状态'
		}, new Ext.ux.seraph.DictCombo({
					id : '#taskState',
					showAllSelect : true,
					url : 'rmTaskGroups.do?method=getTaskStates&&params={type:1}', // 任务状态
					displayField : 'codeLabel',
					valueField : 'codeValue',
					width : 90
				})];

// 
var queryParms = [{
			name : 'taskGroupName',
			indicator : 'EXAMPLE_LIKE'
		}, {
			name : 'taskState',
			indicator : 'EXAMPLE_EQUALS'
		}];

var cardPage = getCardPage();
var win = new Ext.Window({
			id : 'win',
			layout : 'fit',
			width : 613,
			border : false,
			autoHeight : true,
			title : '任务组管理配置',
			items : [cardPage.panel],
			closeAction : 'hide'
		});
function chgWin(width, height) {
	win.setSize(width + 5, height);
	cardPage.panel.setSize(width, height);
}
function create() {
	win.show();
	chgWin(614, 430);
	cardPage.resetAll();
	cardPage.setAction('saveTask');
}
function update(value) {
	alert(value);
	win.show();
	chgWin(614, 430);
	cardPage.reset();
	cardPage.resetAll();
	cardPage.setAllValues(value);
	cardPage.setAction('updateTask');
}

function getCardPage() {
	var cardPage = {
		action : 'saveTask'
	};
	cardPage.setAction = function(value) {
		this.action = value;
	}
	var preButton = new Ext.Button({
				text : "上一页",
				hidden : true,
				handler : changePage
			})
	var nexButton = new Ext.Button({
				text : "下一页",
				handler : changePage
			})
	cardPage.page0 = getPage0();
	cardPage.page1 = getPage1();
	cardPage.page2 = getPage2();
	cardPage.page3 = getPage3();
	cardPage.page4 = getPage4();
	cardPage.page5 = getPage5();
	cardPage.pages = [cardPage.page0];
	cardPage.panel = new Ext.Panel({
				frame : true,
				width : 600,
				height : 400,
				layout : "card",
				border : false,
				activeItem : 0,
				items : cardPage.pages,
				buttons : [preButton, nexButton]
			});

	cardPage.reset = function() {
		for (var i = 0; i < cardPage.pages.length; i++) {
			cardPage.pages[i].re();
		}
		resetPanel();
	}
	cardPage.resetAll = function() {
		resetSelectPage();
		resetPanel();
	}
	cardPage.setAllValues = setAllValues;
	return cardPage;

	function resetSelectPage() {
		cardPage.page1.re();
		cardPage.page2.re();
		cardPage.page3.re();
		cardPage.page4.re();
		cardPage.page5.re();
	}
	function resetPanel() {
		cardPage.panel.layout.setActiveItem(0);
		cardPage.panel.buttons[0].hide();
		cardPage.panel.buttons[1].setText('下一页');
		cardPage.panel.buttons[1].handler = changePage;
	}
	function getAllValues() {
		var values = {};
		for (var i = 0; i < cardPage.pages.length; i++) {
			Ext.apply(values, cardPage.pages[i].getAllValues());
		}
		return values;
	}
	function setAllValues(values) {
		cardPage.page0.setAllValues(values);
		cardPage.page1.setAllValues(values);
		cardPage.page2.setAllValues(values);
		cardPage.page3.setAllValues(values);
		cardPage.page4.setAllValues(values);
		cardPage.page5.setAllValues(values);
	}
	function changePage(btn) {
		var panel = cardPage.panel;
		var index = cardPage.pages.indexOf(panel.layout.activeItem);
		if (index == 0 && btn.text == "下一页") {
			Main.fun.showProcessWait('初始化界面中...');
			// 初始化
			cardPage.pages = [cardPage.page0];
			var values = panel.layout.activeItem.getAllValues();
			if (values.taskType == '1')
				cardPage.pages = cardPage.pages.concat(cardPage.page1)
						.concat(cardPage.page2).concat(cardPage.page3)
						.concat(cardPage.page4);
			else
				cardPage.pages = cardPage.pages.concat(cardPage.page5)
						.concat(cardPage.page3);
			panel.items.clear();
			panel.items.addAll(cardPage.pages);
		}
		if (btn.text == "上一页") {
			index -= 1;
			if (index <= 0) {
				index = 0;
			}
		} else {
			if (!panel.layout.activeItem.isValueValid())
				return;
			index += 1;
			if (index >= cardPage.pages.length) {
				index = cardPage.pages.length;
			}
		}
		if (index == 0) {
			preButton.hide();
		} else if (index == cardPage.pages.length - 1) {
			nexButton.setText('确定');
			nexButton.handler = function() {
				if (!panel.layout.activeItem.isValueValid())
					return;
				var values = getAllValues();
				doTask(cardPage.action, values);
			}
		} else {
			preButton.show();
			nexButton.setText('下一页');
			nexButton.handler = changePage
		}
		chgWin(cardPage.pages[index].getWinWidth(), cardPage.pages[index]
						.getWinHeight());
		panel.layout.setActiveItem(index);
		Main.fun.closeProcessWait();
	}
}
function doTask(action, values) {
	Main.fun.showProcessWait();
	Ext.Ajax.request({
				url : 'rmTaskGroups.do',
				success : function(response) {
					object = response.responseText.evalJSON();
					if (object.result == true) {
						Ext.getCmp('usergrid').reload();
						win.hide();
					} else {
						Ext.Msg.alert('提示', '操作失败!');
					}

					Main.fun.closeProcessWait();
				},
				failure : function() {
					Main.fun.closeProcessWait();
					Ext.Msg.alert({
								title : '提示',
								content : '出现错误！'
							})
				},
				params : {
					method : action,
					params : Ext.util.JSON.encode(values)
				}
			});
}
Ext.onReady(function() {

	Ext.QuickTips.init();

	var userGridSlef = Ext.extend(Ext.ux.self.FormEditorGrid, {
		buildTbar : function(queryFields) {
			var gridSelf = this;
			return [{
						text : '添加',
						iconCls : 'dataTableList-add-icon',
						handler : create
					}, {
						text : '修改',
						iconCls : 'dataTableList-modify-icon',
						handler : function() {
							var record = gridSelf.getSelectionModel()
									.getSelected();
							if (!record) {
								Ext.Msg.alert('提示', '请先选择一条记录！');
								return;
							}
							var taskId = record.data.taskId;
							var result = new Ajax('rmTaskGroups.do').call(
									'getRmTaskGroup', {
										taskId : taskId
									});
							update(result);
						}
					}, {
						text : '删除',
						iconCls : 'dataTableList-delete-icon',
						scope : this,
						handler : function() {
							var gridSelf = this;
							var record = this.getSelectionModel().getSelected();
							if (!record) {
								Ext.Msg.alert('提示', '请先选择一条记录！');
								return;
							}

							Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(
											val) {
										if (val == 'yes') {
											var res = new Ajax('rmTaskGroups.do')
													.call('delTaskGroup',
															record.data);
											if (res == true) {
												Ext.Msg.alert('提示 ', '删除成功!')
												gridSelf.store.reload();
											} else {
												Ext.Msg.alert('提示', '操作失败!');
											}
										}
									});

						}
					}, {
						text : '启动',
						iconCls : 'control-icon',
						handler : function() {
							var record = gridSelf.getSelectionModel()
									.getSelected();
							if (!record) {
								Ext.Msg.alert('提示', '请先选择一条记录！');
								return;
							}
							var taskId = record.data.taskId;
							var result = new Ajax('rmTaskGroups.do').call(
									'runRmTaskGroup', {
										taskId : taskId
									});
							if (result == true) {
								Ext.Msg.alert('提示', '启动成功');
								gridSelf.loadData();
							} else {
								Ext.Msg.alert('提示', '启动失败');
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
	var userGrid = new userGridSlef({
				id : 'usergrid',
				renderTo : 'user-grid',
				width : Ext.get("content").getWidth(),
				height : Ext.get("content").getHeight(),
				storeFields : storeFields,
				formFields : formFields,
				queryFields : queryFields,
				queryParms : queryParms,
				columns : userColumns,
				pk : PK,
				url : URL
			});
	userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
	userGrid.on('rowdblclick', function() {

				var record = userGrid.getSelectionModel().getSelected();
				if (!record) {
					Ext.Msg.alert('提示', '请先选择一条记录！');
					return;
				}
				var taskId = record.data.taskId;
				var result = new Ajax('rmTaskGroups.do').call('getRmTaskGroup',
						{
							taskId : taskId
						});
				update(result);

			});
});