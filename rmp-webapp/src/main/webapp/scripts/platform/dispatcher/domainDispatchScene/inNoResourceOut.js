
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

var booleanValue = new Ext.ux.seraph.DictCombo( { 
	url :'systemParmsProvider.do?type=boolean_value_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' 
 });
var sm = new Ext.grid.CheckboxSelectionModel({
	singleSelect : true
});
var columns = [new Ext.grid.RowNumberer(),sm,
  {header:'ID',dataIndex:'smInNoResourceOutId',hidden:true},
  {header:'域名',dataIndex:'domain',hidden:false,width:160},
  {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:120},
  //{header:'出网次数',dataIndex:'outNum',hidden:false},
  //{header:'出网流量(MB)',dataIndex:'outFlow',hidden:false,width:120,renderer:Main.fun.getMFromByte},
  {header:'出网DNS解析次数',dataIndex:'outDnsNum',hidden:false,width:150},
  {header:'所属网站',dataIndex:'webSite',hidden:false,width:150},
  {header:'可缓存占比',dataIndex:'cacheProportion',hidden:false,width:150,
	  renderer:function(value){
		return (value*100).toFixed(2)+'%';
	  }
  },
  {header:'是否下发缓存任务',dataIndex:'isIssue',width:130,hidden:false,renderer:Ext.ux.renderer.Combo(booleanValue),width:140},
  {header:'是否已缓存',dataIndex:'isCached',hidden:false,renderer:Ext.ux.renderer.Combo(booleanValue),width:140}
];

var issueDispatch = new Ext.Button({
	text : '调度下发',
	iconCls: 'dataTableList-modify-icon', 
	handler : issueDispatch
});
var qualityCheck = new Ext.Button({
	text : '质量检查',
	iconCls: 'dataTableList-modify-icon', 
	handler : qualityCheck
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

   var toolbar = [issueDispatch,'-',qualityCheck,'-',{
		text : '域名'
   },domain,{
	text : '省份'
}, province,{
	text : '热点排序'
},hotBasis,'-',search,'-', reset];
   
   var grid = new Ext.ux.Grid({
    dataMethod:'smInNoResourceOutAction.getList',
	viewData:false,
	frame : false,
	border: false,
	columns:columns,
	columnLines : true,
	sm : sm,
	fetchSize : 15,
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
	return data;
}

function updateGrid(data) {
	grid.setParams(data);
	grid.doSearchList();
}

function issueDispatch(){
	var record = grid.getSelected();
	if(record){
		var isIssue = record.get('isIssue');
		if(isIssue == '1'){
			Ext.Msg.alert('温馨提示','该域名已经下发调度，不能重复下发');
			return;
		}
		Main.fun.showProcessWait('正在下发,请稍后...');
		var data = {};
		data.smInNoResourceOutId = record.get('smInNoResourceOutId');
		data.domain = record.get('domain');
		data.province = record.get('province');
		M.rpc._call(issueDispatchCallBack,'smInNoResourceOutAction.issueDispatch', {javaClass:'java.util.HashMap',map:data});
	}else{
		Ext.Msg.alert('温馨提示','请选择要调度下发的数据');
		return;
	}
	function issueDispatchCallBack(result){
		Main.fun.closeProcessWait();
		upData();
		if(result == true){
			showTipWindow('调度下发成功','comment','温馨提示');
		}else{
			showTipWindow('调度下发失败','comment','温馨提示');
		}
	}
}

function qualityCheck(){
	var record = grid.getSelected();
	if(record){
		var isCached = record.get('isCached');
		if(isCached == '0'){
			Ext.Msg.alert('温馨提示','该域名还未缓存，不能查看质量结果');
			return;
		}
		
		var data = {};
		data.domain = record.get('domain');
		data.province = record.get('province');
		var checkColumns = [ new Ext.grid.RowNumberer(), {
			header : 'IP',
			sortable : true,
			dataIndex : 'ip',
			width : 130,
		}, {
			header : '下载用时',
			width : 100,
			sortable : true,
			dataIndex : 'downloadTime'
		}, {
			header : 'TTL',
			width : 100,
			sortable : true,
			dataIndex : 'ttl'
		}, {
			header : '网络延时',
			width : 100,
			sortable : true,
			dataIndex : 'networkDelay'
		}, {
			header : 'web延时',
			width : 100,
			sortable : true,
			dataIndex : 'webDelay'
		}, {
			header : 'ping延时',
			width : 100,
			sortable : true,
			dataIndex : 'pingTimeDelay'
		}, {
			header : '质量分',
			width : 100,
			sortable : true,
			dataIndex : 'score'
		}];
		var checkGrid = new Ext.ux.Grid({
		    dataMethod:'smInNoResourceOutAction.qualityCheck',
			viewData:false,
			frame : false,
			border: false,
			width : 760,
			height : 369,
			columns:checkColumns,
			columnLines : true,
			root : 'result',
			fetchSize : 15
		 });
		
		var windows = new Ext.Window({
			xtype : "window",
			title : "质量详细",
			width : 772,
			height : 400,
			border: false,
			bodyBorder: false,
			autoScroll : true,
			closeAction : 'hide',
			items : [checkGrid ]
		});
		windows.show();
		
		checkGrid.setParams(data);
		checkGrid.doSearchList();
	}else{
		Ext.Msg.alert('温馨提示','请选择要质量检查的数据');
		return;
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