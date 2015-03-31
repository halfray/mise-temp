
var row = [
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: '', colspan: 1, align: 'center' },
	{ header: 'DNS解析次数', colspan: 3, align: 'center' },
	{ header: '请求次数', colspan: 3, align: 'center' },
	{ header: '总流量', colspan: 3, align: 'center' },
	{ header: '上行流量', colspan: 3, align: 'center' },
	{ header: '下行流量', colspan: 3, align: 'center' },
	{ header: '', colspan: 1, align: 'center' }
];

var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});

var webSiteType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120,
	id:'websiteType'
});

var userColumns = [new Ext.grid.RowNumberer(), {
	header: '网站',
	width: 130,
	sortable: true,
	dataIndex: 'webSite',
	hidden: false,
	hideable: false
	
}, {
	header: '网站类型',
	width: 130,
	sortable: true,
	dataIndex: 'webSiteType',
	hidden: false,
	hideable: false,
	renderer:Ext.ux.renderer.Combo(webSiteType)
	
}, {
	header: '解析次数',
	width: 130,
	sortable: true,
	dataIndex: 'DNSResolNum',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数',
	width: 130,
	sortable: true,
	dataIndex: 'DNSInResolNum',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数占比',
	width: 130,
	sortable: true,
	dataIndex: 'DNSInResolProportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '请求次数',
	width: 130,
	sortable: true,
	dataIndex: 'reqCount',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数',
	width: 130,
	sortable: true,
	dataIndex: 'reqInCount',
	hidden: false,
	hideable: false
	
}, {
	header: '网内次数占比',
	width: 130,
	sortable: true,
	dataIndex: 'reqInProportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'allFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'allInFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'allInProportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '上行总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'uploadFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'uploadInFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'uploadInProportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '下行总流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'downloadFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量(MB)',
	width: 130,
	sortable: true,
	dataIndex: 'downloadInFlow',
	hidden: false,
	hideable: false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	}
	
}, {
	header: '网内流量占比',
	width: 130,
	sortable: true,
	dataIndex: 'downloadInProportion',
	hidden: false,
	hideable: false,renderer:Main.fun.getPerByReal
	
}, {
	header: '更新日期',
	width: 130,
	sortable: true,
	dataIndex: 'updatedate',
	hidden: false,
	hideable: false
	
}];

var selectData = [
	["all_Flow", "总流量"], 
	["upload_Flow", "上行流量"], 
	["download_Flow", "下行流量"], 
	["req_Count", "请求次数"], 
	["DNSResolNum", "DNS解析次数"]
];
var selectStore = new Ext.data.ArrayStore({
	fields : ['value', 'name'],
	data : selectData
});

var typeList = new Ext.ux.TreeField({
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	width : 120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250,
	id:'websiteType'
});
var selectComboBox = new Ext.form.ComboBox({
	id : '#selectComboBox',
	hiddenName : 'selectComboBox',
	valueField : 'value',
	displayField : 'name',
	typeAhead : true,
	width : 120,
	value : 'DNSResolNum',
	mode : 'local',
	store : selectStore,
	triggerAction : 'all'
});

var topN = new Ext.form.NumberField({
	id : '#top',
    fieldLabel:'整数',   
    allowDecimals:false,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false,                //不允许输入负数   
    width:90,
    value : '1000'
});

var queryFields = [
{text: '网站类型'}, typeList, 
{text: 'TOP'},
selectComboBox, topN,
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
		Ext.getCmp('#selectComboBox').setValue('DNSResolNum');
		Ext.getCmp('#top').setValue('1000');
		initGrid();
	}
},'-', {
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "dmmHotwebsiteSortAction.do?param="+getExcelData();
		window.open(url);
	}
}
];

var grid = new Ext.ux.Grid( {
	dataMethod : 'dmmHotwebsiteSortAction.getHotwebsiteSortList',
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