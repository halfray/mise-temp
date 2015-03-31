/**
 * rmIpManager.js Power by YUI-EXT and JSON.
 * 
 * @author
 * @email
 */
var rmIpManager = {
	author : "xxx",
	version : "1.0"
};

// -> Action URL
var URL = {
	queryList : 'rmIpManagerListProvider.do',
	action : 'rmIpManagerAction.do'
};

// -> Primary key
var PK = [ "ipId" ];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0 : "IP主键",
	1 : "IP起始地址段",
	2 : "IP终止地址段",
	3 : "掩码范围",
	4 : "IP起始地址段_INT",
	5 : "IP终止地址段_INT",
	6 : "掩码范围_INT",
	7 : "所属运营商",
	8 : "所属区域",
	9 : "所属系统",
	10 : "状态",
	11 : "创建时间",
	12 : "修改时间",
	13 : "操作人",
	14 : "数据来源",
	15 : "备注"
};

// -> Column name in English
var EN = {
	0 : "ipId",
	1 : "ipStart",
	2 : "ipEnd",
	3 : "ipMask",
	4 : "ipStartInt",
	5 : "ipEndInt",
	6 : "ipMaskInt",
	7 : "operator",
	8 : "lacation",
	9 : "system",
	10 : "ipState",
	11 : "createTime",
	12 : "updateTime",
	13 : "operatorUser",
	14 : "dataSource",
	15 : "ipDesc",
	16 : "ipId_old"
};

// -> Cell width
var WD = {
	0 : "10",
	1 : "15",
	2 : "15",
	3 : "15",
	4 : "20",
	5 : "20",
	6 : "20",
	7 : "4",
	8 : "10",
	9 : "4",
	10 : "1",
	11 : "10",
	12 : "10",
	13 : "255",
	14 : "2",
	15 : "255"
};

// -> Data type e.g: float,int,string
var TY = {
	0 : "int",
	1 : "string",
	2 : "string",
	3 : "string",
	4 : "string",
	5 : "string",
	6 : "string",
	7 : "1",
	8 : "1",
	9 : "1",
	10 : "1",
	11 : "string",
	12 : "string",
	13 : "string",
	14 : "1",
	15 : "string"
};

var ipregex = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
var maskregex=/^[1-3][0-9]$/;

var storeFields = [ {
	name : EN[0],
	type : TY[0]
}, {
	name : EN[1],
	type : TY[1]
}, {
	name : EN[2],
	type : TY[2]
}, {
	name : EN[3],
	type : TY[3]
}, {
	name : EN[4],
	type : TY[4]
}, {
	name : EN[5],
	type : TY[5]
}, {
	name : EN[6],
	type : TY[6]
}, {
	name : EN[7],
	type : TY[7]
}, {
	name : EN[8],
	type : TY[8]
}, {
	name : EN[9],
	type : TY[9]
}, {
	name : EN[10],
	type : TY[10]
}, {
	name : EN[11],
	type : TY[11]
}, {
	name : EN[12],
	type : TY[12]
}, {
	name : EN[13],
	type : TY[13]
}, {
	name : EN[14],
	type : TY[14]
}, {
	name : EN[15],
	type : TY[15]
}, {
	name : EN[16],
	type : TY[0]
} ];

var orgCodeField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var operatorCodeField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var systemParamsField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

var getMask = function() {
	var value = '';
	var ipstart = Ext.getCmp(EN[1]);
	var ipend = Ext.getCmp(EN[2]);
	var ipstartint = Ext.getCmp(EN[4]);
	var ipendint = Ext.getCmp(EN[5]);
	var mask = Ext.getCmp(EN[3]);
	var maskint = Ext.getCmp(EN[6]);
	if (ipstart.validate() && ipend.validate()) {
		var startvalue = ipstart.getValue();
		var endvalue = ipend.getValue();
		ipstartint.setValue(changeIp(startvalue));
		ipendint.setValue(changeIp(endvalue));
		var res = new Ajax('commonAction.do').call('getMask', {
			ipStart : startvalue,
			ipEnd : endvalue
		});
		//mask.setValue(res);
		maskint.setValue(changeIp(res));
	}
}
/*
 * ipStart ip起始地址，
 * netMask 掩码范围
 */
function getEndIP(){
	var ipStart=Ext.getCmp(EN[1]);
	var netMask=Ext.getCmp(EN[3]);
	
	var ipStartValue=ipStart.getValue();
	var netMaskValue=netMask.getValue();

	if(ipStart.validate() && netMaskValue!=null && netMaskValue!=""){
		Ext.Ajax.request({
			url:'rmIpManagerGetIP.do',
			success:function(response){
				Ext.getCmp(EN[2]).setValue(response.responseText);
			},
			failure:function(response){
				Ext.Msg.alert('失败',response.responseText);
			},
			params:{ipStart:ipStartValue,netMask:netMaskValue}
	     });
	}
		
}


var formFields = [ {
	id : EN[0],
	name : EN[0],
	maxLength :WD[0],
	hidden : true,
	fieldLabel : CN[0],
	xtype : 'textfield'
}, {
	id : EN[1],
	name : EN[1],
	fieldLabel : CN[1],
	maxLength :WD[1],
	regex : ipregex,
	regexText : 'ip格式无效',
	allowBlank : false,
	xtype : 'textfield',
	listeners : {
		change : getMask
	}
}, {
	id : EN[2],
	name : EN[2],
	fieldLabel : CN[2],
	maxLength :WD[2],
	xtype : 'textfield',
	regex : ipregex,
	allowBlank : false,
	regexText : 'ip格式无效',
	selectOnFocus : true,
	listeners : {
		change : getMask,
		focus:getEndIP
	}

},
{
	id : EN[3],
	name : EN[3],
	maxLength :WD[3],
	fieldLabel : CN[3],
	regex : maskregex,
	regexText : '掩码范围格式无效',
	allowBlank : true,
	xtype : 'textfield'
}, 
	{
	id : EN[4],
	name : EN[4],
	hidden : true,
	allowBlank : false,
	fieldLabel : CN[4],
	xtype : 'textfield'
}, {
	id : EN[5],
	name : EN[5],
	maxLength :WD[5],
	hidden : true,
	allowBlank : false,
	fieldLabel : CN[5],
	xtype : 'textfield'
}, {
	id : EN[6],
	name : EN[6],
	maxLength :WD[6],
	hidden : true,
	allowBlank : true,
	fieldLabel : CN[6],
	xtype : 'textfield'
}, new Ext.ux.seraph.DictCombo( {
	id : EN[7],
	name : EN[7],
	fieldLabel : CN[7],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}), new Ext.ux.seraph.DictCombo( {
	id : EN[8],
	name : EN[8],
	fieldLabel : CN[8],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}),

new Ext.ux.seraph.DictCombo( {
	id : EN[9],
	name : EN[9],
	fieldLabel : CN[9],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}), {
	id : EN[10],
	name : EN[10],
	maxLength :WD[10],
	fieldLabel : CN[10],
	hidden:true,
	value:1,
	xtype : 'textfield'
}, {
	id : EN[11],
	name : EN[11],
	fieldLabel : CN[11],
	format:'Y-m-d',
	value:new Date(),
	hidden:true,
	xtype : 'datefield'
}, {
	id : EN[12],
	name : EN[12],
	fieldLabel : CN[12],
	format:'Y-m-d',
	value:new Date(),
	hidden:true,
	xtype : 'datefield'
}, {
	id : EN[13],
	name : EN[13],
	fieldLabel : CN[13],
	hidden:true,
	xtype : 'textfield'
}, {
	id : EN[14],
	name : EN[14],
	fieldLabel : CN[14],
	hidden:true,
	value:1,
	xtype : 'textfield'
}, {
	id : EN[15],
	name : EN[15],
	fieldLabel : CN[15],
	maxLength :WD[15],
	xtype : 'textarea'
} ];
var checkFormFields = [ {
	name : EN[0],
	maxLength :WD[0],
	hidden : true,
	fieldLabel : CN[0],
	xtype : 'textfield'
}, {
	name : EN[1],
	fieldLabel : CN[1],
	maxLength :WD[1],
	regex : ipregex,
	regexText : 'ip格式无效',
	allowBlank : false,
	xtype : 'textfield',
	listeners : {
		change : getMask
	}
}, {
	name : EN[2],
	fieldLabel : CN[2],
	maxLength :WD[2],
	xtype : 'textfield',
	regex : ipregex,
	allowBlank : false,
	regexText : 'ip格式无效',
	listeners : {
		change : getMask
	}

},
{
	name : EN[3],
	maxLength :WD[3],
	fieldLabel : CN[3],
	cls : 'x-item-disabled',
	value:'255.255.255.255',
	readOnly : true,
	allowBlank : false,
	xtype : 'hidden'
}, 
	{
	name : EN[4],
	hidden : true,
	allowBlank : false,
	fieldLabel : CN[4],
	xtype : 'textfield'
}, {
	name : EN[5],
	maxLength :WD[5],
	hidden : true,
	allowBlank : false,
	fieldLabel : CN[5],
	xtype : 'textfield'
}, {
	name : EN[6],
	maxLength :WD[6],
	hidden : true,
	allowBlank : false,
	fieldLabel : CN[6],
	xtype : 'textfield'
}, new Ext.ux.seraph.DictCombo( {
	name : EN[7],
	fieldLabel : CN[7],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}), new Ext.ux.seraph.DictCombo( {
	name : EN[8],
	fieldLabel : CN[8],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}),

new Ext.ux.seraph.DictCombo( {
	name : EN[9],
	fieldLabel : CN[9],
	allowBlank : false,
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
}), {
	name : EN[10],
	maxLength :WD[10],
	fieldLabel : CN[10],
	hidden:true,
	value:1,
	xtype : 'textfield'
}, {
	name : EN[11],
	fieldLabel : CN[11],
	format:'Y-m-d',
	value:new Date(),
	hidden:true,
	xtype : 'datefield'
}, {
	name : EN[12],
	fieldLabel : CN[12],
	format:'Y-m-d',
	value:new Date(),
	hidden:true,
	xtype : 'datefield'
}, {
	name : EN[13],
	fieldLabel : CN[13],
	hidden:true,
	xtype : 'textfield'
}, {
	name : EN[14],
	fieldLabel : CN[14],
	hidden:true,
	value:1,
	xtype : 'textfield'
}, {
	name : EN[15],
	fieldLabel : CN[15],
	maxLength :WD[15],
	xtype : 'textarea'
} ];

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
	width : 140,
	sortable : true,
	dataIndex : EN[1],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : 140,
	sortable : true,
	dataIndex : EN[2],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[3],
	width : 140,
	sortable : true,
	dataIndex : EN[3],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[4],
	width : WD[4],
	sortable : true,
	dataIndex : EN[4],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[5],
	width : WD[5],
	sortable : true,
	dataIndex : EN[5],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[6],
	width : WD[6],
	sortable : true,
	dataIndex : EN[6],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[7],
	width : 140,
	sortable : true,
	dataIndex : EN[7],
	renderer: Ext.ux.renderer.Combo(operatorCodeField),
	hidden : false,
	hideable : false,
	
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[8],
	width : 140,
	sortable : true,
	dataIndex : EN[8],
	renderer: Ext.ux.renderer.Combo(orgCodeField),
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[9],
	width : 140,
	sortable : true,
	dataIndex : EN[9],
	renderer: Ext.ux.renderer.Combo(systemParamsField),
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[10],
	width : 140,
	sortable : true,
	dataIndex : EN[10],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[11],
	width : WD[11],
	sortable : true,
	dataIndex : EN[11],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[12],
	width : WD[12],
	sortable : true,
	dataIndex : EN[12],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[13],
	width : WD[13],
	sortable : true,
	dataIndex : EN[13],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[14],
	width : WD[14],
	sortable : true,
	dataIndex : EN[14],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[15],
	width : 140,
	sortable : true,
	dataIndex : EN[15],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
} ];

// TODO: default xtype, width
var queryFields = [ {
	text : 'IP地址'
}, {
	xtype : 'textfield',
	regex : ipregex,
	regexText : 'ip格式无效',
	id : '#ipvalue',
	width : 90

}, {
	xtype : 'hidden',
	id : '#ip'

},
{
	text : CN[7]
},

new Ext.ux.seraph.DictCombo( {
	id : '#operator',
	width : 90,
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue'
}),

{
	text : CN[8]
}, new Ext.ux.seraph.DictCombo( {
	id : '#lacation',
	width : 90,
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue'
})

,  {
	text : CN[9]
}, new Ext.ux.seraph.DictCombo( {
	id : '#system',
	width : 90,
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue'
}) ];

// 
var queryParms = [ {
	name : 'ipvalue',
	indicator : 'EXAMPLE_IGNORE'
}, {
	name : 'ip',
	indicator : 'EXAMPLE_BETWEEN'
}, {
	name : EN[8],
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : EN[9],
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : EN[7],
	indicator : 'EXAMPLE_EQUALS'
} ];

function changeIp(ip) {
	var ips = ip.split('.');
	var ipvalue = 0;
	for ( var n = 0; n < ips.length; n++) {
		ipvalue += ips[n]*Math.pow(256,3 - n);
	}
	return ipvalue;
}

function checkIp(record)
{
	Main.fun.showProcessWait();
	var formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
	        autoWidth: true,
	        labelWidth: 80,
	        bodyStyle:'padding:10px; border: 0px solid;',
			autoScroll: true,
	        defaults: {width: 210},
	        defaultType: 'textfield',
			bodyBorder: false,
			border: false,
	        items: [checkFormFields]
	    });
	    
	    var checkPanel = new Ext.Panel({
			baseCls: 'x-plain',
			autoHeight :true,
	        autoWidth: true,
	        bodyStyle:'padding:10px; border: 0px solid;',
			autoScroll: true,
			bodyBorder: false,
			border: false,
	        html: "获取数据中..."
	    });
	   
	    formPanel.getForm().setValues(record.data);
	    var ipStartCheck = M.rpc._call("rmIpManagerAction.checkIp",record.data.ipStart);
	    var ipEndCheck = M.rpc._call("rmIpManagerAction.checkIp",record.data.ipEnd);
	    
	    var html = "从网络获取数据：<br>";
	    	  html += record.data.ipStart +  " :<br>  " + ipStartCheck + "</br>"; 
	    	  html += record.data.ipEnd +  " : <br> " + ipEndCheck + "</br>"; 
	    
	checkPanel.html = html;
	
	var window = new Ext.Window({
		title:'IP校验及修改',
		layout: 'column',
		width:500,
		autoHeight :true,
		resizable : true,
		closeAction: 'hide',
		items:[
			{baseCls: 'x-plain',columnWidth:.7,items:[formPanel]},
			{baseCls: 'x-plain',columnWidth:.3,items:[checkPanel]}
		],
		buttons:[
			{text:'确定',handler:saveCheckValue},
			{text:'取消',handler:function(){window.hide();}}
		]
	});
	Main.fun.closeProcessWait();
	window.show();
	
	
	function saveCheckValue()
	{
    	var record =formPanel.getForm().getValues();

    	if (formPanel.getForm().isValid()){
	    	formPanel.form.submit({
	    		url: URL.action,
	    		method: 'post',
	    		success: function(form, action) {
	    			window.hide();
	    			userGrid.store.reload();
	    		},
	    		failure: function(form, action) {
	    			window.hide();
					Ext.Msg.alert('Error', action.result.msg);
	    		},
	    		params: {
	   				action:'update',
	   				record: Ext.util.JSON.encode(record)
	  			},
	    		clientValidation: true,
	    		waitMsg: Message.waitMsg
	    	});
	      }
    
	}
}



Ext.onReady(function() {

	Ext.QuickTips.init();

	var selfGrid = Ext.extend(Ext.ux.self.FormEditorGrid,{
		buildTbar : function(queryFields) {
	var gridSelf = this;
	return [{
		 text: '添加',
		 iconCls: 'dataTableList-add-icon',
	     scope: this,
	     handler : gridSelf.onCreate
    }, '-', {
        text: '修改',
        iconCls: 'dataTableList-modify-icon',
        scope: this,
        handler: gridSelf.onUpdate
    }, '-', {
        text: '删除',
        iconCls: 'dataTableList-delete-icon',
        scope: this,
        handler : gridSelf.onDelete
    },'-', {
        text: '校验',
        iconCls: 'card-address-icon',
        scope: this,
        handler : function()
        {
        	var record = this.getSelectionModel().getSelected();
			if(!record) {
				Ext.Msg.alert('提示', '请先选择一条记录！'); 
				return;
			}
			checkIp(record);
        }
    }, '-', {
    	text: '批量校验', 
    	iconCls: 'card-address-icon',
    	scope: this,
    	handler : function() {
    		window.open('exportValidateIps.do');
    	}
    },'-',{
		text:'上传文件',
		iconCls:'toolbar-up-icon',
		handler:upload
	}
//    ,'-',{
//		text:'校验数据',
//		iconCls:'toolbar-up-icon',
//		handler:checkUploadIps
//	}
    ,'-', queryFields, {
    	text: '查询', 
    	cls: 'search-button', 
    	minWidth:87,
    	height:27,
    	//iconCls: 'dataTable-preview-icon', 
    	handler : function() {
    		gridSelf.loadData();
    	}
    }, '-', {
    	text: '刷新', 
    	cls: 'refresh-button', 
    	minWidth:87,
    	height:27,
    	//iconCls: 'role-user-reset', 
    	handler : function() {
    		gridSelf.clearData();
    	}
    }]
},
		onUpdate:function(btn, ev) {
		var record = this.getSelectionModel().getSelected();
		if(!record) {
			Ext.Msg.alert('提示', '请先选择一条记录！'); 
			return;
		}
		
		this.editor.setTitle('修改记录');
		this.editor.show();
		this.editor.formPanel.actionType = ACTION.update;
		this.formPanel.oldRecord = record;
		record.data.ipState = 1;//状态默认为1
		this.formPanel.getForm().setValues(record.data);
    }
});
	
	
	  function checkUploadIps(){
		  
		  function uploadForm(){	
  			var name = new Ext.form.TextField({
					allowBlank : false,
					inputType:'file',
					fieldLabel : '校验文件',
					blankText : "请选择校验的文件",
					invalidText : "校验文件不能为空",
					name : 'uploadFile2',
					anchor : '90%'
				});
  			var objectForm = new Ext.form.FormPanel({
					frame:true,
					baseCls: 'x-plain',
					id:'checkFormID',
					fileUpload:true,			//设置为上传
					items : [name]
				});
  			return objectForm;
  	      }
		  
	    	var form = uploadForm();
	    	   var wWindow = new Ext.Window	({									//定义对象
	    	  	    width: 500,													//宽度
	    	  	    height:200,													//高度
	    	  	    layout: 'fit',												//布局方式		
	    	  	    plain:true,													//
	    	  	    modal : true,												//产出阴影,遮盖其他部分
	    	  	    bodyStyle:'padding:5px;',													
	    	  	    buttonAlign:'center',										//按钮摆放位置
	    	  	    items: form,											//将定义的form放在window上	
	    	  	    buttons: [{													//按钮
	    	  	      text: '提交',
	    	  	      handler: createObject//按钮触发的方法
	    	  	    },{
	    	  	      text: '取消',
	    	  	      handler: cancel
	    	  	    }]
	    	  	  });
	    	  	  
	    	  	  wWindow.show();
	    		  function cancel(){wWindow.close();}
	    		  function createObject(){
				 if(form.getForm().isValid()){
					form.getForm().submit({
						waitTitle:'信息',
                        waitMsg:'正在提交，请稍候……',
						url:"uploadForCheckIps.do",
						success:function(form,action){
							Ext.Msg.alert("内容", '点击确定导出校验结果',
									function() {
								           wWindow.close();
								           window.open('exportCheckUploadIpMsg.do');
									});
							
						},
						failure:function(form, action) {
								Ext.Msg.alert("内容", action.result.msg);
							}
					 });
					 
				    }//if
	    		  }//createObject
	    	
	    }
	
	    function upload(){
	    	var form = uploadForm();
	    	   var wWindow = new Ext.Window	({									//定义对象
	    	  	    width: 500,													//宽度
	    	  	    height:200,													//高度
	    	  	    layout: 'fit',												//布局方式		
	    	  	    plain:true,													//
	    	  	    modal : true,												//产出阴影,遮盖其他部分
	    	  	    bodyStyle:'padding:5px;',													
	    	  	    buttonAlign:'center',										//按钮摆放位置
	    	  	    items: form,											//将定义的form放在window上	
	    	  	    buttons: [{													//按钮
	    	  	      text: '提交',
	    	  	      handler: createObject//按钮触发的方法
	    	  	    },{
	    	  	      text: '取消',
	    	  	      handler: cancel
	    	  	    }]
	    	  	  });
	    	  	  
	    	  	  wWindow.show();
	    		  function cancel(){wWindow.close();}
	    		  function createObject(){
  				 if(form.getForm().isValid()){
  					form.getForm().submit({
  						waitTitle:'信息',
                        waitMsg:'正在提交，请稍候……',
  						url:"uploadIp.do",
  						success:function(form,action){
  							if(action.result.msg == 'checkFaile'){//
  								
  								Ext.Msg.alert("内容", '上传文件校验没通过,点击确定导出校验结果',
  										function() {
  									           wWindow.close();
  									           window.open('exportCheckIpMsg.do');
  										});
  								
  							}else{
  							
  								Ext.Msg.alert("内容", action.result.msg,
  										function() {
  											wWindow.close();
  											userGrid.getStore().reload();
  										});
  								
  							}
  							
  						},
  						failure : function(form, action) {
								Ext.Msg.alert("内容", action.result.msg);
							}
  					 });
  				  }
	    		  }
	    	function uploadForm(){	
	    			var name = new Ext.form.TextField({
						allowBlank : false,
						inputType:'file',
						fieldLabel : '上传文件',
						blankText : "请选择上传的文件",
						invalidText : "上传文件不能为空",
						name : 'uploadFile',
						anchor : '90%'
					});
	    			var objectForm = new Ext.form.FormPanel({
						frame:true,
						baseCls: 'x-plain',
						fileUpload:true,			//设置为上传
						items : [name]
					});
	    			return objectForm;
	    	}
	    }

Ext.ux.self.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor, {
		doSave1 : function() {
			var windowSelf = this;

            var ipId = this.formPanel.getForm().findField('ipId').getValue();
            var ipStart = this.formPanel.getForm().findField('ipStart').getValue();
            var ipEnd = this.formPanel.getForm().findField('ipEnd').getValue();
            var ipMask=this.formPanel.getForm().findField('ipMask').getValue();
            
            var operator = this.formPanel.getForm().findField('operator').getValue();
            var lacation = this.formPanel.getForm().findField('lacation').getValue();
            var system = this.formPanel.getForm().findField('system').getValue();
            
            if(changeIp(ipStart) > changeIp(ipEnd)){
            	Ext.Msg.alert('提示信息', 'IP起始段地址不能大于IP终止段地址!');
            	return;
            }
            //
			if(ipStart !=null && ipStart!='' && ipEnd !=null && ipEnd !='' 
					&& operator !=null && operator !='' && lacation !=null 
					&& lacation !='' && system !=null && system !='') {
				//this.formPanel.getForm().isValid()
				var record=this.formPanel.getForm().getValues();
				Ext.Ajax.request({
					url:'checkIp.do',
					async :  false, 
					success:function(response){
						var msg=response.responseText;
						if('true'==msg){
							
							Ext.Ajax.request({
								url:windowSelf.gridPanel.url.action,
								async :  false, 
								success:function(response){
									windowSelf.hide();
									windowSelf.gridPanel.store.reload();
								},
								failure:function(response){
									Ext.Msg.alert('失败',response.responseText);
								},
							    params:{
							    	action : windowSelf.formPanel.actionType,
									record : Ext.util.JSON.encode(record)
							    }
							});
							
						}else{
//							Ext.MessageBox.confirm("提示",msg, function(btn){
//								if(btn == 'yes'){
//									
//									Ext.Ajax.request({
//										url:windowSelf.gridPanel.url.action,
//										async :  false, 
//										success:function(response){
//											windowSelf.hide();
//											windowSelf.gridPanel.store.reload();
//										},
//										failure:function(response){
//											Ext.Msg.alert('失败',response.responseText);
//										},
//									    params:{
//									    	action : windowSelf.formPanel.actionType,
//											record : Ext.util.JSON.encode(record)
//									    }
//									});
//									
//								}
//							});
							
							Ext.MessageBox.alert("提示",msg, function(btn){
								if(btn == 'yes'){	
									windowSelf.hide();
									windowSelf.gridPanel.store.reload();
								}
							});
						}

					},
					failure:function(response){
						Ext.Msg.alert('失败',response.responseText);
					},
					params:{ipId:ipId,ipStart:ipStart,ipEnd:ipEnd,ipMask:ipMask,operator:operator,lacation:lacation,system:system}
			     });
				
				
			}else {
				Ext.Msg.alert('提示', "IP地址和掩码范围不能为空！");
			}
		}
});
	
 userGrid = new selfGrid({renderTo : 'user-grid',
		width : Ext.get("content").getWidth(),
		height : Ext.get("content").getHeight(),
		storeFields : storeFields,
		formFields : formFields,
		queryFields : queryFields,
		queryParms : queryParms,
		columns : userColumns,
		formLabelWidth:100,
		formWinWidth:380,
		pk : PK,
		url : URL});
	
	var item = userGrid.getTopToolbar().items.find(function(item) {
		if (item.text == '查询') {
			return true;
		}
		return false;
	}, this)
	item.handler = function(obj) {

		var ipvalue = Ext.getCmp('#ipvalue');
		if (!ipvalue.validate()) {
			Ext.Msg.alert('提示信息', '输入数据有误，请重新输入!');
			ipvalue.focus();
		} else {
			var ip = Ext.getCmp('#ip');
			if (!Ext.isEmpty(ipvalue.getValue())) {
				ip.setValue(changeIp(ipvalue.getValue()));
			} else {
				ip.setValue('')
			}
			userGrid.loadData();
		}
	};
	
	

});