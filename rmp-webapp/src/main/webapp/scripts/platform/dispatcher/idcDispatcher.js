var province = new Ext.ux.seraph.DictCombo( { 
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
  //value : '510000',
    value : orgCode,
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

function dispatchDetail(val,cell,record,rowIndex,columnIndex,store){
	var domain = record.get("domain");
	var contentId = Ext.id();   
	var btn = createGridButton.defer(1, this, [contentId]);   
	function createGridButton(){   
	 return new Ext.Button({   
		text: '查看详细',   
		handler: function(){   
		 	getDispatchResult(domain);
		}   
	}).render(document.body, contentId);   
	}   
	return('<div id="'+contentId+'"/>');  
}
function getDispatchResult(domain){
	
	var resultColumns = [new Ext.grid.RowNumberer(),
	  {header:'被调度IP',dataIndex:'ip',hidden:false,width:120},
	  {header:'所属运营商',dataIndex:'operator',hidden:false,renderer:Ext.ux.renderer.Combo(operator),width:70},
	  {header:'所属区域',dataIndex:'area',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:70},
	  {header:'所属系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system),width:70},
	  {header:'质量分',dataIndex:'quaScore',hidden:false,width:70},
	  {header:'调度时间',dataIndex:'dispatchDate',hidden:false,width:130}];
	
	var resultGrid = new Ext.ux.Grid({
		dataMethod : 'dmDispCorrErrEvalActoin.getDispatchResult',
		columns : resultColumns,
		width : 586,
		height : 276,
		border : false,
		frame : false,
		sortBar : false,
		litePagingBar : true,
		fetchSize : 10,
		columnLines : true,
		colspan : 8
	});
	
	var windows = new Ext.Window({
		xtype : "window",
		title : "调度详细--"+domain,
		width : 600,
		height : 328,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		closeAction : 'hide',
		items : [resultGrid ]
	});
	
	var map = {};
	map.domain = domain;
	resultGrid.setParams(map);
	resultGrid.doSearchList();
	
	windows.show();
	
}

var columns = [new Ext.grid.RowNumberer(),
  {header:'id',dataIndex:'domainHitIDCID',hidden:true},
  {header:'域名',dataIndex:'domain',hidden:false,width:140},
  {header:'网站',dataIndex:'webSiteName',hidden:false,width:140},
  {header:'DNS解析次数',dataIndex:'domainDNSResolNum',hidden:false,width:140},
  {header:'IDC资源命中次数',dataIndex:'domainIDCRitNum',hidden:false,width:140},
  {header:'IDC资源命中率',dataIndex:'domainIDCRitRate',hidden:false,width:130,renderer:function(value){return (value*100).toFixed(2)+'%'}},
  /*{header:'请求次数',dataIndex:'domainReqNum',hidden:false,width:70},
  {header:'总流量(MB)',dataIndex:'domainAllFlow',hidden:false,renderer:Main.fun.getMFromByte,width:85},
  {header:'上行流量(MB)',dataIndex:'domainUpFlow',hidden:false,renderer:Main.fun.getMFromByte,width:85},
  {header:'下行流量(MB)',dataIndex:'domainDownFlow',hidden:false,renderer:Main.fun.getMFromByte,width:85},*/
  {header:'最后一次调度时间',dataIndex:'dispatchDate',hidden:false,width:130},
  {header:'调度详细',renderer : dispatchDetail,width:70},
  //{header:'省份名称',dataIndex:'provinceName',hidden:true,renderer:Ext.ux.renderer.Combo(province)},
  //{header:'访问省份名称',dataIndex:'reqProvinceName',hidden:true,renderer:Ext.ux.renderer.Combo(province)},
  {header:'更新日期',dataIndex:'updateData',hidden:false}
];

var dispatcher = new Ext.Button({
	text : '手动调度',
	iconCls: 'dataTableList-modify-icon', 
	handler : operateDispatch
});

var domain = new Ext.form.TextField({
	name : 'domain',
	width : 120
});

var hotBasis = new Ext.ux.seraph.DictCombo( { 
	url :'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 
	displayField : 'parmName',
    valueField : 'parmCode' ,
    value : 'DNSResolNum',
    width : 120,
    name : 'hotOrderBy'
 });
var topN = new Ext.ux.seraph.DictCombo( { 
	url :'parmInfoProvider.do?parmType=TOPN', 
	displayField : 'parmName',
    valueField : 'parmCode' ,
    value : '1000',
    width : 120,
    name : 'topN'
 });

var reqProvinceName = new Ext.form.TextField({
	hidden : true,
	name : 'reqProvinceName',
	value : '510000',
	width : 120
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

   var toolbar = [dispatcher,'-',{
	text : '省份'
}, province,{
	text : '域名'
},domain,{
	text : 'TOP'
},hotBasis,topN,reqProvinceName,'-',search,'-', reset];
   
   var grid = new Ext.ux.Grid({
    dataMethod:'dmDispCorrErrEvalActoin.getListIDCForIDCDispatcher',
	viewData:false,
	frame : false,
	border: false,
	columns:columns,
	columnLines : true,
	fetchSize : 10,
	tbar : toolbar/*,
	listeners : {
   		dblclick : 
	}*/
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

function operateDispatch(){
	var record = grid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请选中一条数据');
		return;
	}
	
	var sm = new Ext.grid.CheckboxSelectionModel();
	
	var dispatchColumns = [
		sm,
		{header:'IP',dataIndex:'ip',hidden:false,width:130},
		{header:'系统',dataIndex:'system',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(system)},
		{header:'区域',dataIndex:'area',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(province)},
		{header:'质量分',dataIndex:'quaScore',hidden:false,width:80},
		{header:'更新日期',dataIndex:'updateDate',hidden:false,width:80}
	];
	var dispatchGrid = new Ext.ux.Grid({
    	dataMethod:'dmOutgoingDomainEvalAction.getListIPQuaForDispatch',
    	viewData:false,
		frame : false,
		border: false,
		width : 500,
		height : 350,
		sm : sm,
		columns:dispatchColumns,
    	columnLines : true,
    	root : 'result.list',
    	showPagingBar : false
	});
	
	var data = {};
	data.domain = record.data.domain;
	data.operator = '0101';//中国移动
	
	dispatchGrid.setParams(data);
	dispatchGrid.doSearchList();
	
	var windows = new Ext.Window({
		xtype : "window",
		title : '域名：'+record.data.domain,
		width : 514,
		height : 446,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		items : [dispatchGrid],
		buttons : [{
			text : '确认调度',
			handler : function(){
				confirmDispatch(dispatchGrid,record.data.domain,record.data.domainHitIDCID,windows);
			}
		},{
			text : '取消',
			handler : function(){
				windows.close();
			}
		}]
	});
	
	windows.show();
}

function confirmDispatch(dispatchGrid,domain,domainHitIDCID,windows){
	var ips = '';
	var quaScores = '';
	var systems = '';
	var areas = '';
	var records = dispatchGrid.getSelections();
	
	if(records.length == 0){
		Ext.Msg.alert('温馨提示','请选中要调度的数据');
		return;
	}
	var value = Math.round(100/records.length);
	for(var i = 0;i < records.length;i++){
		if(i == records.length - 1){
			ips += records[i].get('ip');
			quaScores += value;//records[i].get('quaScore');
			systems += records[i].get('system');
			areas += records[i].get('area');
		}else{
			ips += records[i].get('ip')+' ';
			quaScores += value+' ';//records[i].get('quaScore')+' ';
			systems += records[i].get('system')+' ';
			areas += records[i].get('area')+' ';
		}
	}
	var data = {};
	data.domainHitIDCID = domainHitIDCID;
	data.ips = ips;
	data.quaScores = quaScores;
	data.domain = domain;
	data.operator = '0101';
	data.systems = systems;
	data.areas = areas;
	data.dispatchDate = new Date().format('Y-m-d H:i:s');
	
	M.rpc._call(confirmDispatchCallBack,'dmDispCorrErrEvalActoin.confirmDispatch',{
		javaClass : 'java.util.HashMap',map : data
	});
	
	function confirmDispatchCallBack(result){
		windows.close();
		var tbar = grid.getTopToolbar();
		var queryFields = tbar.findByType('field');
			for(var i = 0; i < queryFields.length;i++)
			{
				queryFields[i].reset();
			}
			upData();
		if(result == true){
			showTipWindow('调度成功','comment','温馨提示');
		}else{
			showTipWindow('调度失败','comment','温馨提示');
		}
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