var addClass = function(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
var mainWindow;
function showApproveDetail(domain,province,taskid,batchid,batchno,tim,scene,policy,logid,isAuto,dispatchType){
	if(isAuto == '1'){//是
		var logDetailData = {};
		logDetailData.domain = domain;
		logDetailData.taskid = taskid;
		var conf = {
				href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logDetailData)),
				text:  '调度明细',
				icon: '',
				tipinfo: ''
			};
		Main.fun.openWin(conf, 'tab');
	}else{
		if(dispatchType == '1'){
			Ext.Msg.alert('温馨提示','已经做过回滚操作,请到调度明细查看具体信息',function(btn){
				if(btn == 'ok'){
					var logData = {};
					logData.domain = domain;
					logData.taskid = taskid;
					var conf = {
							href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logData)),
							text:  '调度明细',
							icon: '',
							tipinfo: ''
					};
					Main.fun.openWin(conf, 'tab');
				}
			});
		}else{
			var provinceName = M.rpc._call("domainDispatchTaskDetailAction.getProvinceName",province);
			
			var sceneMap = {};
			sceneMap.type_code = 'DOMAIN_DISPATCH_SENCE';
			sceneMap.parm_code = scene;
			var sceneName = M.rpc._call("scParamInfoAciton.getParamNameByTypeAndCode",{javaClass:'java.util.Map',map:sceneMap});
			
			var cardPage = getCardPage(domain,province,taskid,batchid,policy,logid,scene,dispatchType);
			/*省份：'+provinceName+'&nbsp;&nbsp;'+'调度场景：'+sceneName*/
			/*'域名：'+domain+'&nbsp;&nbsp;'+'批次：'+batchno+'&nbsp;&nbsp;批次日期：'+tim*/
			
			var titlePanel = new Ext.Panel({
				width : 620,
				baseCls : 'x-plain',
				html : '<div class="flow_title">'+
					    '<ul class="flow_top_ul">'+
				        '<li>域名:'+domain+'</a> </li>'+
				        '<li>批次:'+batchno+'</a> </li>'+
				        '<li>批次日期:'+tim+'</a> </li>'+
					    '</ul>'+
					    '<div class="flow_btn1" id="flow_btn1"></div>'+
					    '<div class="flow_btn2 juli" id="flow_btn2"></div>'+
					    '<div class="flow_btn3 juli" id="flow_btn3"></div>'+
					    '<div class="flow_btn4 juli" id="flow_btn4"></div>'+
					    '<div class="flow_btn5 juli" id="flow_btn5"></div>'+
					  '</div>'
			});
			
			mainWindow = new Ext.Window({
				//layout : 'fit',
				width : 620,
				border : false,
				height : 440,
				title : '调度控制流程',
				items : [titlePanel,cardPage.panel]
			});
			mainWindow.show();
			
			cardPage.resetAll();
			
			//addClass(document.getElementById('flow_btn1'),'flow_btn1');
		}
	}
}

function getCardPage(domain,province,taskid,batchid,policy,logid,scene,dispatchType){
	
	var cardPage = {};
	
	var nexButton = new Ext.Button({
		text : "下一步",
		handler : changePage
	});
	var rollbackButton = new Ext.Button({
		text : "回滚",
		handler : rollback
	});
	var ipDetailGrid = getPage0();
	
	var data = {};
	data.domain = domain;
	data.taskid = taskid;
	data.batchid = batchid;
	
	ipDetailGrid.setParams(data);
	ipDetailGrid.doSearchList();
	
	cardPage.page0 = ipDetailGrid;
	
	var ipQuaScoreGrid = getPage1();
	ipQuaScoreGrid.setParams(data);
	ipQuaScoreGrid.doSearchList();
	
	cardPage.page1 = ipQuaScoreGrid;
	
	//获取质量分数大于
	var policyMap = {};
	policyMap.policyID = policy;
	var qualityExpressions = M.rpc._call('domainDispatchPolicyConfAction.getQualityExpressions',{
		javaClass : 'java.util.HashMap', map : policyMap
	});

	//获取成本列表
	var policyList = M.rpc._call('domainDispatchTaskDetailAction.getCostingDesList',{
		javaClass : 'java.util.HashMap', map : policyMap
	});
	var costDesList = '';
	for(var i in policyList){
		if(policyList[i].SS_0003 != undefined){
			if(i == policyList.length - 1){
				costDesList += policyList[i].SS_0003;
			}else{
				costDesList += policyList[i].SS_0003+'\n';
			}
		}
	}
	//获取策略配置名称
	var policyName = M.rpc._call('domainDispatchTaskDetailAction.getPolicyNameByPolicyID',{
		javaClass : 'java.util.HashMap', map : policyMap
	});
	cardPage.page2 = getPage2(qualityExpressions,costDesList,policyName);
	//通过域名筛选IP
	var ipInfoGrid = getPage3();
	
	var conditions = {};
	conditions.domain = domain;
	conditions.taskid = taskid;
	conditions.batchid = batchid;
	conditions.policyID = policy;
	ipInfoGrid.setParams(conditions);
	ipInfoGrid.doSearchList();
	
	cardPage.page3 = ipInfoGrid;
	
	var dispatchAfterDetailGrid = getPage4();
	
	cardPage.page4 = dispatchAfterDetailGrid;
	//cardPage.page5 = getPage5();
	cardPage.pages = [cardPage.page0];
	cardPage.panel = new Ext.Panel({
				width : 600,
				height : 330,
				layout : "card",
				border : false,
				activeItem : 0,
				items : [cardPage.pages],
				buttonAlign : 'center',
				buttons : [rollbackButton, nexButton ]
			});

	cardPage.resetAll = function() {
		cardPage.panel.layout.setActiveItem(0);
		cardPage.panel.buttons[0].hide();
		cardPage.panel.buttons[1].setText('下一步');
		cardPage.panel.buttons[1].handler = changePage;
	}
	return cardPage;

	function changePage(btn,type,ips) {
		var path = Main.contextPath;//
		
		var panel = cardPage.panel;
		var index = cardPage.pages.indexOf(panel.layout.activeItem);
		if (index == 0 && btn.text == "下一步") {
			Main.fun.showProcessWait('初始化界面中...');
			// 初始化
			cardPage.pages = [cardPage.page0];
			cardPage.pages = cardPage.pages.concat(cardPage.page1)
			.concat(cardPage.page2).concat(cardPage.page3)
			.concat(cardPage.page4);//.concat(cardPage.page5);
			panel.items.clear();
			panel.items.addAll(cardPage.pages);
		}
		
		rollbackButton.hide();
		
		index += 1;
		
		if (index >= cardPage.pages.length) {
			index = cardPage.pages.length;
		}
		
		panel.layout.setActiveItem(index);
		Main.fun.closeProcessWait();
		if(index == 1){
			nexButton.setText('下一步');
			document.getElementById('flow_btn1').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/1.png) no-repeat';
			document.getElementById('flow_btn2').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/2_a.png) no-repeat';
			document.getElementById('flow_btn3').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/3.png) no-repeat';
			document.getElementById('flow_btn4').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/4.png) no-repeat';
			document.getElementById('flow_btn5').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/5.png) no-repeat';
		}else if(index == 2){
			nexButton.setText('下一步');
			document.getElementById('flow_btn1').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/1.png) no-repeat';
			document.getElementById('flow_btn2').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/2.png) no-repeat';
			document.getElementById('flow_btn3').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/3_a.png) no-repeat';
			document.getElementById('flow_btn4').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/4.png) no-repeat';
			document.getElementById('flow_btn5').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/5.png) no-repeat';
		}else if(index == 3){
			nexButton.setText('下发DNS调度');
			document.getElementById('flow_btn1').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/1.png) no-repeat';
			document.getElementById('flow_btn2').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/2.png) no-repeat';
			document.getElementById('flow_btn3').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/3.png) no-repeat';
			document.getElementById('flow_btn4').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/4_a.png) no-repeat';
			document.getElementById('flow_btn5').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/5.png) no-repeat';
			nexButton.handler = function(){
				issuedDNSDispatch(nexButton);
			}
		}else if(index == 4){
			rollbackButton.show();
			nexButton.setText('下一步');
			document.getElementById('flow_btn1').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/1.png) no-repeat';
			document.getElementById('flow_btn2').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/2.png) no-repeat';
			document.getElementById('flow_btn3').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/3.png) no-repeat';
			document.getElementById('flow_btn4').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/4.png) no-repeat';
			document.getElementById('flow_btn5').style = 'background:url('+path+'/scripts/platform/dispatcher/domainDispatchScene/images/5_a.png) no-repeat';
			nexButton.handler = changePage;
		}else if(index == 5){
			if(type == 'rollback'){
				Ext.Msg.alert('温馨提示','如下IP:'+ips+'已经被回滚,请到调度明细查看具体信息',function(btn){
					if(btn == 'ok'){
						var logData = {};
						logData.domain = domain;
						logData.taskid = taskid;
						var conf = {
								href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logData)),
								text:  '调度明细',
								icon: '',
								tipinfo: ''
						};
						Main.fun.openWin(conf, 'tab');
					}
				});
				upData();
				mainWindow.close();
			}else{
				mainWindow.close();
				Ext.Msg.confirm('温馨提示','是否允许对该域名的调度策略自动执行,不在需要人为的手动干预',function(btn){
					if(btn == 'yes'){
						var logData = {};
						logData.logid = logid;
						logData.domain = domain;
						logData.isauto = '1';//1：是；0：否
						javaClass : 'com.neteast.rmp.dao.domain.SmDomainDispatchLog';
						
						M.rpc._call(updateLogDoCallBack,'domainDispatchTaskDetailAction.updateLogDo',logData);
						
					}else{
						var logData = {};
						logData.domain = domain;
						logData.taskid = taskid;
						var conf = {
								href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logData)),
								text:  '调度明细',
								icon: '',
								tipinfo: ''
						};
						Main.fun.openWin(conf, 'tab');
					}
				});
			}
			
			function updateLogDoCallBack(){
				upData();
				
				var logDetailData = {};
				logDetailData.domain = domain;
				logDetailData.taskid = taskid;
				var conf = {
						href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logDetailData)),
						text:  '调度明细',
						icon: '',
						tipinfo: ''
					};
				Main.fun.openWin(conf, 'tab');
			}
		}else{
			nexButton.setText('下一步');
			nexButton.handler = changePage;
		}
	}
	
	function issuedDNSDispatch(nexButton){
		var records = ipInfoGrid.getSelections();
		if(records.length == 0){
			Ext.Msg.alert('温馨提示','请选择要下发的IP信息');
			return;
		}
		var ips = '';
		var quaScores = '';
		var local = '';
		
		for(var i = 0;i < records.length;i++){
			if(i == records.length - 1){
				ips += records[i].get('ip');
				local += records[i].get('province');
				if(records[i].get('quaScore') == undefined){
					quaScores += '0';
				}else{
					quaScores += records[i].get('quaScore');
				}
			}else{
				ips += records[i].get('ip')+',';
				local += records[i].get('province')+',';
				if(records[i].get('quaScore') == undefined){
					quaScores += '0'+ ' ';
				}else{
					quaScores += records[i].get('quaScore')+',';
				}
			}
		}
		var dnsMap = {};
		dnsMap.domain = domain;
		dnsMap.province = province;
		dnsMap.ips = ips;
		dnsMap.quaScores = quaScores;
		dnsMap.logid = logid;
		dnsMap.taskid = taskid;
		dnsMap.batchid = batchid;
		dnsMap.scene = scene;
		dnsMap.local = local;
		Main.fun.showProcessWait('正在下发DNS,请稍后...');
		M.rpc._call(issuedDNSDispatchCallBack,'domainDispatchTaskDetailAction.issuedDNSDispatch',{
			javaClass : 'java.util.HashMap', map : dnsMap
		});
		
		function issuedDNSDispatchCallBack(){
			Main.fun.closeProcessWait();
			changePage(nexButton,'','');
			var afterData = {};
			afterData.logid = logid;
			dispatchAfterDetailGrid.setParams(afterData);
			dispatchAfterDetailGrid.doSearchList();
		}
		/*changePage(nexButton,'','');
		var afterData = {};
		afterData.logid = logid;
		dispatchAfterDetailGrid.setParams(afterData);
		dispatchAfterDetailGrid.doSearchList();*/
	}
	
	function rollback(){
		var count = dispatchAfterDetailGrid.getStore().getCount();
		var ips = '';
		var list = [];
		for(var i = 0;i < count;i++){
			var record = dispatchAfterDetailGrid.getStore().getAt(i);
			if(i == count-1){
				ips += record.get('ip');
			}else{
				ips += record.get('ip')+',';
			}
			var object = {};
			object.logid = logid;
			object.ip = record.get('ip');
			object.operator = record.get('operator');
			object.province = record.get('province');
			object.system = record.get('system');
			object.costscore = record.get('costscore');
			object.downloadtim = record.get('downloadtim');
			object.ttl = record.get('ttl');
			object.netdelay = record.get('netDelay');
			object.webdelay = record.get('webDelay');
			object.pingdelay = record.get('pingDelay');
			object.quascore = record.get('quaScore');
			object.dispatchtype = '1';
			object.javaClass = 'com.neteast.rmp.dao.domain.SmDispatchBeforeDetailInfo';
			list[i] = object;
		}
		var formObject = {};
		formObject.list = [];
		formObject.list = list;
		formObject.javaClass = "java.util.ArrayList";
		
		M.rpc._call(rollbackCallBack,'domainDispatchTaskDetailAction.rollback',formObject);
		
		function rollbackCallBack(){
			changePage(nexButton,'rollback',ips);
		}
	}
	
	
}

function showDispatchDetail(domain,taskid){
	var logDetailData = {};
	logDetailData.domain = domain;
	logDetailData.taskid = taskid;
	var conf = {
			href : 'smDomainDispatchLogList.do?uxParams='+ encodeURI(Ext.encode(logDetailData)),
			text:  '调度明细',
			icon: '',
			tipinfo: ''
		};
	Main.fun.openWin(conf, 'tab');
}


var province = new Ext.ux.seraph.DictCombo( { 
	id : 'province',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    value : resultJsonObject.province,
    width : 120,
    name : 'province'
 });

var booleanValue = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',
	displayField : 'parmName',
	valueField : 'parmCode'
});

function approveDetail(val,cell,record,rowIndex,columnIndex,store){
	var province = record.data.province;
	var domain = record.data.domain;
	var taskid = record.data.taskid;
	var batchid = record.data.batchid;
	var batchno = record.data.batchno;
	var tim = record.data.tim;
	var scene = record.data.scene;
	var policy = record.data.policy;
	var logid = record.data.logid;
	var isAuto = record.data.isAuto;
	var dispatchType = record.data.dispatchType;
	var contentId = Ext.id();   
	var btn = createGridButton.defer(1, this, [contentId]);   
	function createGridButton(){
		var button = new Ext.Button({   
			text: '审核',   
			handler: function(){  
			    showApproveDetail(domain,province,taskid,batchid,batchno,tim,scene,policy,logid,isAuto,dispatchType);
			}   
		}).render(document.body, contentId);
		if(isAuto == '1'){
			button.disable();
		}else{
			button.enable();
		}
		return button;
	}   
	return('<div id="'+contentId+'"/>');  
}

function dispatchDetail(val,cell,record,rowIndex,columnIndex,store){
	var contentId = Ext.id();   
	var domain = record.data.domain;
	var taskid = record.data.taskid;
	var isAuto = record.data.isAuto;
	var btn = createGridButton.defer(1, this, [contentId]);   
	function createGridButton(){   
		var button = new Ext.Button({   
			text: '调度明细',   
			handler: function(){  
			    showDispatchDetail(domain,taskid);
			}   
		}).render(document.body, contentId);
		if(isAuto == '1'){
			button.enable();
		}else{
			button.disable();
		}
		return button;
	}
	return('<div id="'+contentId+'"/>');  
}

var columns = [new Ext.grid.RowNumberer(),
  {header:'日志ID',dataIndex:'logid',hidden:true},
  {header:'任务ID',dataIndex:'taskid',hidden:true},
  {header:'批次ID',dataIndex:'batchid',hidden:true},
  {header:'应用场景',dataIndex:'scene',hidden:true},
  {header:'调度策略ID',dataIndex:'policy',hidden:true},
  {header:'类型',dataIndex:'dispatchType',hidden:true},
  {header:'域名',dataIndex:'domain',hidden:false,width:160},
  {header:'批次名称',dataIndex:'batchno',hidden:false,width:140},
  {header:'省份',dataIndex:'province',hidden:false,width:80,renderer: Ext.ux.renderer.Combo(province)},
  {header:'最近一次调度',dataIndex:'tim',hidden:false,width:120},
  {header:'是否自动',dataIndex:'isAuto',hidden:false,width:80,renderer: Ext.ux.renderer.Combo(booleanValue)},
  {header:'是否完成调度任务',dataIndex:'doDisp',hidden:false,width:120,renderer: Ext.ux.renderer.Combo(booleanValue)},
  {header:'操作',dataIndex:'operator',hidden:false,width:50,
	  renderer: function(v, p, record, rowIndex, index, store){
	  	var province = record.data.province;
		var domain = record.data.domain;
		var taskid = record.data.taskid;
		var batchid = record.data.batchid;
		var batchno = record.data.batchno;
		var tim = record.data.tim;
		var scene = record.data.scene;
		var policy = record.data.policy;
		var logid = record.data.logid;
		var isAuto = record.data.isAuto;
		var dispatchType = record.data.dispatchType;
		if(isAuto == '1'){
			return ['<span>', '审核' , '</span>&nbsp;'].join('');
		}else{
			return ['<a href="#" onclick="showApproveDetail(\''+domain+'\',\''+province+'\',\''+taskid+'\',\''+batchid+'\',\''+batchno+'\',\''+tim+'\',\''+scene+'\',\''+policy+'\',\''+logid+'\',\''+isAuto+'\',\''+dispatchType+'\')"><span>', '审核' , '</span></a>&nbsp;'].join('');
		}
	  }
  },
  {header:'操作',dataIndex:'operator1',hidden:false,width:70,
	  renderer: function(v, p, record, rowIndex, index, store){
	  	var domain = record.data.domain;
		var taskid = record.data.taskid;
		var isAuto = record.data.isAuto;
		if(isAuto == '1'){
			return ['<a href="#" onclick="showDispatchDetail(\''+domain+'\',\''+taskid+'\')"><span>', '调度明细' , '</span></a>&nbsp;'].join('');
		}else{
			return ['<span>', '调度明细' , '</span></a>&nbsp;'].join('');
		}
	  }
  }
];

var domain = new Ext.form.TextField({
	name : 'domain',
	value : resultJsonObject.domain,
	width : 120
});

var taskid = new Ext.form.TextField({
	hidden : true,
	name : 'taskid',
	value : resultJsonObject.taskid,
	width : 120
});

var search = new Ext.Button({
	text : '查询',
	iconCls: 'dataTable-preview-icon', 
	handler : upData
});
var reset = new Ext.Button({
	text : '刷新',
	iconCls: 'role-user-reset', 
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

   var toolbar = [{
		text : '域名'
   },domain,{
	text : '省份'
}, province,taskid,'-',search,'-', reset];
   
   var grid = new Ext.ux.Grid({
    dataMethod:'domainDispatchTaskDetailAction.getDomainList',
	viewData:false,
	frame : false,
	border: false,
	columns:columns,
	columnLines : true,
	fetchSize : 15,
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