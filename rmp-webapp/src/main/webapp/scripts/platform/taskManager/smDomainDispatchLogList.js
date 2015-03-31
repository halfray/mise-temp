//调度策略数据字典
var policyName = new Ext.ux.seraph.DictCombo( {
	name : 'policyname',
	fieldLabel : '调度策略',
	allowBlank : false,
	url : 'dispatchPolicyProvider.do',
	displayField : 'policyName',
	valueField : 'policyID',
	width : 150
});
//所属场景
var sceneField = new Ext.ux.seraph.DictCombo( {
	name:'scene',
	url : 'parmInfoProvider.do?parmType=DOMAIN_DISPATCH_SENCE',
	width:140,
	displayField : 'parmName',
	valueField : 'parmCode'
});
//是否字典
var ynField = new Ext.ux.seraph.DictCombo( {
	name:'scene',
	url : 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',
	width:140,
	displayField : 'parmName',
	valueField : 'parmCode'
});
//省份数据字典
var provinceField = new Ext.ux.seraph.DictCombo( {
	name:'province',
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

//运营商数据字典
var operatorCodeField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
//系统数据字典
var systemParamsField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});


var resultColumns = [ new Ext.grid.RowNumberer(), {
	header : 'logid',
	hidden:true,
	sortable : true,
	width : 100,
	dataIndex : 'logid'
},{
	header : '域名',
	sortable : true,
	width : 100,
	dataIndex : 'domain'
}, {
	header : '应用场景',
	width : 150,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(sceneField),
	dataIndex : 'scene'
},  {
	header : '关注省份',
	width : 80,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(provinceField),
	dataIndex : 'province',
},{
	header : '调度策略',
	width : 120,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(policyName),
	dataIndex : 'policy'
}, {
	header : '批次号',
	width : 130,
	sortable : true,
	dataIndex : 'batchno'
}, {
	header : '批次日期',
	width : 130,
	sortable : true,
	dataIndex : 'tim'
}, {
	header : '是否自动任务',
	width : 100,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(ynField),
	dataIndex : 'isAuto'
},{
	header : '是否完成调度',
	width : 100,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(ynField),
	dataIndex : 'doDisp'
},{
	header : '是否已回滚',
	width : 100,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(ynField),
	dataIndex : 'dispatchType'
} ,{
	header : '操作',
	width : 100,
	sortable : true,
	renderer: function(v, p, record, rowIndex, index, store){
		var logid = record.data.logid;
		var domain = record.data.domain;
		var userprovince = record.data.province;
		return ['<a href="#" onclick="showDetail(\''+domain+'\',\''+logid+'\',\''+userprovince+'\')"><span>', 'IP调度前后对比' , '</span></a>&nbsp;'].join('');
	},
	dataIndex : 'doDisp'
}];

var detailBefCol = [ new Ext.grid.RowNumberer(), {
	header : '调度前IP',
	sortable : true,
	//width : 130,
	width : 110,
	dataIndex : 'ip'
}, {
	header : '所属运营商',
	//width : 100,
	width : 70,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(operatorCodeField),
	dataIndex : 'operator'
},  {
	header : '所属省份',
	width : 60,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(provinceField),
	dataIndex : 'province',
},{
	header : '所属系统',
	//width : 100,
	width : 60,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(systemParamsField),
	dataIndex : 'system'
}, {
	header : '质量分',
	//width : 100,
	width : 80,
	sortable : true,
	dataIndex : 'quaScore'/*,
	renderer : function(value){
		return value.toFixed(2);
	}*/
}];

var detailAftCol = [ new Ext.grid.RowNumberer(), {
	header : '调度后IP',
	sortable : true,
	//width : 130,
	width : 110,
	dataIndex : 'ip'
}, {
	header : '所属运营商',
	width : 70,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(operatorCodeField),
	dataIndex : 'operator'
},  {
	header : '所属省份',
	width : 60,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(provinceField),
	dataIndex : 'province',
},{
	header : '所属系统',
	//width : 70,
	width : 60,
	sortable : true,
	renderer : Ext.ux.renderer.Combo(systemParamsField),
	dataIndex : 'system'
}, {
	header : '质量分',
	//width : 100,
	width : 80,
	sortable : true,
	dataIndex : 'quaScore'
}];


var befGrid = new Ext.ux.Grid({
	//title:'调度前',
	dataMethod : 'smDomainDispatchLogAction.getBefList',
	//dataMethod:'allIpDetailAction.getListOutIPDetail',
	columns : detailBefCol,
	border : false,
	frame : false,
	sortBar : false,
	fetchSize : 20,
	litePagingBar:true,
	width:410,
	//width:500,
	height:320,
	columnLines : true
});
var aftGrid = new Ext.ux.Grid({
	//title:'调度后',
	dataMethod : 'smDomainDispatchLogAction.getAftList',
	columns : detailAftCol,
	border : false,
	frame : false,
	sortBar : false,
	fetchSize : 20,
	litePagingBar:true,
	width:410,
	//width:500,
	height:320,
	columnLines : true
});
var detPanel = new Ext.Panel({
	layout : 'column',
	autoScroll : true,
	border: false,
	bodyBorder: false,
	items : [{columnWidth:.5,items:[befGrid]},{columnWidth:.5,items:[aftGrid]}]
});
var win = new Ext.Window({
	title:'调度前后对比情况',
	//width:1010,
	width:820,
	height:370,
	hidden:true,
	hideMode :"display",
	closeAction:'hide',
	items:[detPanel]
});
//展示调度前后详细信息
function showDetail(domain,logid,userprovince)
{
	befGrid.updateParams({logid : logid,domain : domain,userprovince : userprovince});
	//befGrid.updateParams({domain : domain,userprovince : userprovince});
	aftGrid.updateParams({logid : logid});
	win.show();
}
var grid = new Ext.ux.Grid({
	dataMethod : 'smDomainDispatchLogAction.getList',
	dataParams:paramsData,
	columns : resultColumns,
	border : false,
	frame : false,
	sortBar : false,
	fetchSize : 20,
	columnLines : true
});

Ext.onReady(function(){
	  var panel = new Ext.Panel({
			renderTo : 'user-grid',
			layout : 'fit',
			autoScroll : true,
			border: false,
			bodyBorder: false,
			items : [grid]
		});
	  panel.setHeight(Ext.get("content").getHeight());
	 grid.setWidth(Ext.get("content").getWidth());
});