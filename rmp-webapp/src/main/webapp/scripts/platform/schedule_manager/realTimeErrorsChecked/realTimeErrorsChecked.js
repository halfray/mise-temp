function openQueryWindow(taskNo,IP,province){
	var data = {};
	data.taskID = taskNo;
	data.IP = IP;
	data.province = province;
	getListData(data);
}
function getListData(data){
	
	var listColumns = [new Ext.grid.RowNumberer(), {
		header: '跳数',
		width: 60,
		sortable: true,
		dataIndex: 'record'
	},{
		header: '请求时间1(ms)',
		width: 100,
		sortable: true,
		dataIndex: 'reqTime1'
	},{
		header: '请求时间2(ms)',
		width: 100,
		sortable: true,
		dataIndex: 'reqTime2'
	},{
		header: '请求时间3(ms)',
		width: 100,
		sortable: true,
		dataIndex: 'reqTime3'
	},{
		header: 'IP',
		width: 120,
		sortable: true,
		dataIndex: 'reqIp'
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
		dataIndex: 'area',
		renderer:Ext.ux.renderer.Combo(province)
	},{
		header: '所属系统',
		width: 120,
		sortable: true,
		dataIndex: 'system',
		renderer:Ext.ux.renderer.Combo(system)
	}];

	var listGrid = new Ext.ux.Grid( {
		dataMethod : 'realTimeErrorsCheckedAction.getRealTimeErrorsTracertList',
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
		title : '经过路由',
		xtype : "window",
		width : 900,
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

var returnResult = new Ext.ux.seraph.DictCombo( {
		url : 'parmInfoProvider.do?parmType=RETURN_RESULT',
		displayField : 'parmName',
		valueField : 'parmCode'
	});

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
var userColumns = [new Ext.grid.RowNumberer(), {
	header: '探测省份',
	width: 70,
	sortable: true,
	dataIndex: 'province',
	renderer: Ext.ux.renderer.Combo(province),
	hidden: false,
	hideable: false
}, {
	header: '任务ID',
	width: 130,
	sortable: true,
	dataIndex: 'taskID',
	hidden: true,
	hideable: false
}, {
	header: 'URL',
	width: 160,
	sortable: true,
	dataIndex: 'url',
	hidden: false,
	hideable: false
},{
	header: '解析IP',
	width: 130,
	sortable: true,
	dataIndex: 'IP'
},{
	header: '所属运营商',
	width: 70,
	sortable: true,
	dataIndex: 'operator',
	renderer:Ext.ux.renderer.Combo(operator)
},{
	header: '所属区域',
	width: 65,
	sortable: true,
	dataIndex: 'area',
	renderer:Ext.ux.renderer.Combo(province)
},{
	header: '所属系统',
	width: 65,
	sortable: true,
	dataIndex: 'system',
	renderer:Ext.ux.renderer.Combo(system)
},{
	header: '请求结果',
	width: 65,
	sortable: true,
	dataIndex: 'reqResult'
}, {
	header: '经过路由',
	width: 65,
	sortable: true,
	hidden: false,
	hideable: false,
	renderer: function(v, p, record, rowIndex, index, store){
		var taskID = record.data.taskID;
		var IP = record.data.IP;
		var province = record.data.province;
		return ['<a href="#" onclick="openQueryWindow(\''+taskID+'\',\''+IP+'\',\''+province+'\')"><span>', '经过路由' , '</span></a>&nbsp;'].join('');
	}
}, {
	header: '访问结果',
	width: 65,
	sortable: true,
	dataIndex: 'accessResults',
	renderer: Ext.ux.renderer.Combo(returnResult),
	hidden: false,
	hideable: false
}, {
	header: 'DNS解析时间(ms)',
	width: 90,
	sortable: true,
	dataIndex: 'DNSResolveTime',
	hidden: true,
	hideable: false
}, {
	header: '建链时间(ms)',
	width: 90,
	sortable: true,
	dataIndex: 'createLinkTime',
	hidden: false,
	hideable: false
}, {
	header: '首字节时间(ms)',
	width: 90,
	sortable: true,
	dataIndex: 'firstByteTime',
	hidden: false,
	hideable: false
}, {
	header: '完整时间(ms)',
	width: 90,
	sortable: true,
	dataIndex: 'allTime',
	hidden: false,
	hideable: false
}, {
	header: '资源大小(MB)',
	width: 90,
	sortable: true,
	dataIndex: 'resSize',
	renderer:Main.fun.getMFromByte,
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
	text : '探测',
	iconCls : 'search-button',
	handler : function() {
		var data = getData();
		var flag= verify(data.url)
		if(flag){
			initGrid();
		}else{
//			Ext.Msg.alert("提示","请输入正确的Url和域名，例：http://www.baidu.com,www.baidu.com");
			Ext.ux.MessageBox.error("提示", "请输入正确的Url和域名，例：http://www.baidu.com,www.baidu.com", (function(){
	            }).createDelegate(this));
		}
		
	}
}/**, '-', {
	text: '刷新', 
	iconCls: 'refresh-button', 
	handler : function() {
		Ext.getCmp('url').setValue('');
		initGrid();
	}
}*/
];

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
	var scanTime = 30000;
	time += scanTime;
	if(time >= 10*scanTime){ //五分钟后结束扫描
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
var domainregex = /^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
function verify(str)
{
   var myReg=new RegExp(domainregex);
   return myReg.test(str);
}
