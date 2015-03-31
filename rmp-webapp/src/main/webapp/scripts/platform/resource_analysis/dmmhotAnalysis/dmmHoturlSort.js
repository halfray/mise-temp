var row = [
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '请求次数', colspan: 3, align: 'center' },
	{ header: '总流量', colspan: 3, align: 'center' },
	{ header: '上行流量', colspan: 3, align: 'center' },
	{ header: '下行流量', colspan: 3, align: 'center' },
	{ header: '', colspan: 1, align: 'center' }
];

var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});

var resourceType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_C_W_0101_LIST', 
	name:'resourceType',
	id:'resourceType',
	displayField : 'codeLabel',
	valueField : 'codeValue'
 
});
var url_Type = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=tb_url_w_0001_LIST', 
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var userColumns = [new Ext.grid.RowNumberer(), {
	header: 'URL',
	width: 130,
	sortable: true,
	dataIndex: 'url',
	hidden: false,
	hideable: false
	
}, {
	header: '网站',
	width: 130,
	sortable: true,
	dataIndex: 'webSite',
	hidden: false,
	hideable: false
	
}, {
	header: '协议类型',
	width: 130,
	sortable: true,
	dataIndex: 'url_Type',
	hidden: false,
	hideable: false,renderer: Ext.ux.renderer.Combo(url_Type)
	
}, {
	header: '资源类型',
	width: 130,
	sortable: true,
	dataIndex: 'resourceType',
	hidden: false,
	hideable: false,
	renderer: Ext.ux.renderer.Combo(resourceType)
	
}, {
	header: '文件大小(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'fileSize',
	hidden: false,
	hideable: false,renderer:Main.fun.getMFromByte
	
}, {
	header: '请求次数',
	width: 130,
	sortable: true,
	dataIndex: 'req_Count',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数',
	width: 130,
	sortable: true,
	dataIndex: 'req_In_Count',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数占比',
	width: 130,
	sortable: true,
	dataIndex: 'req_In_Proportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'all_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'all_In_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'all_In_Proportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '上行总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'upload_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'upload_In_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'upload_In_Proportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '下行总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'download_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'download_In_Flow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'download_In_Proportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '更新日期',
	width: 130,
	sortable: true,
	dataIndex: 'updateDate',
	hidden: false,
	hideable: false
	
}];

var selectData = [
    ["DNSResolNum","DNS解析次数"],
	["all_Flow", "总流量"], 
	["upload_Flow", "上行流量"], 
	["download_Flow", "下行流量"], 
	["req_Count", "请求次数"]
];
var selectStore = new Ext.data.ArrayStore({
	fields : ['value', 'name'],
	data : selectData
});
var selectComboBox = new Ext.form.ComboBox({
	id: '#selectComboBox',
	hiddenName: 'selectComboBox',
	valueField: 'value',
	displayField: 'name',
	typeAhead: true,
	width: 120,
	value: 'DNSResolNum',
	mode: 'local',
	store: selectStore,
	triggerAction: 'all'
});

var topN = new Ext.form.NumberField({
	id: '#top',
	name: 'top',
    fieldLabel: '整数',   
    nanText: '请输入有效整数',           //无效数字提示   
    width: 90,
    value: '1000'
});

//协议类型
var urlType = new Ext.ux.seraph.DictCombo( {
	url: 'systemParmsProvider.do?type=tb_url_w_0001_LIST',
	name:'urlType',
	showAllSelect: true,
	displayField: 'codeLabel',
	valueField: 'codeValue',
	width: 120,
	id: 'urlType'
});

var fileSize = new Ext.form.NumberField({
	id: 'fileSize',
	name: 'fileSize',
    fieldLabel: '文件大小',
	allowDecimals: true,               //不允许输入小数   
    nanText: '请输入有效整数',           //无效数字提示   
	value: '0',              //不允许输入负数   
    width: 90
});

var queryFields = [
{text : '协议类型'}, urlType, 
{text: '资源类型'}, resourceType,
{text : 'TOP'}, selectComboBox, topN ,
{text: '文件大小(M)>'}, fileSize,
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
		Ext.getCmp('urlType').setValue('');
		Ext.getCmp('resourceType').setValue('');
		Ext.getCmp('fileSize').setValue('');
		Ext.getCmp('#selectComboBox').setValue('all_Flow');
		Ext.getCmp('#top').setValue('1000');
		initGrid();
	}
},'-', {
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "dmmHoturlSortAction.do?param="+getExcelData();
		window.open(url);
	}
}
];

var grid = new Ext.ux.Grid( {
	dataMethod : 'dmmHoturlSortAction.getHoturlSortList',
	columns : userColumns,
	border : false,
	frame : false,
	fetchSize : 20,
	plugins : group,
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

function getExcelData() {
	var tbar = grid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = '{';
	for(var i = 0; i < queryFields.length;i++)
	{
		data= data+ queryFields[i].getName() + " : '" + queryFields[i].getValue()+"' ,";
		if(i == queryFields.length-1){
			data= data.substr(0,data.lastIndexOf(','));
		}
	}
	data = data+'}'
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