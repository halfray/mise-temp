/**
 * ifReceinterfaceServerInfo.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var ifReceinterfaceServerInfo = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'ifReceinterfaceServerInfoListProvider.do',
	action : 'ifReceinterfaceServerInfoAction.do'
};

// -> Primary key
var PK = ["receinteserverid"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "接口类型",          
	2: "接口名称",          
	3: "服务器URL",          
	4: "服务器所在省份",          
	5: "服务器NODEID",          
	6: "SessionKey",          
	7: "接口厂商",          
	8: "用户名",          
	9: "密码",          
	10: "描述",          
	11: "是否生效"        
};

// -> Column name in English
var EN = {
	0: "receinteserverid",          
	1: "receinfoid",          
	2: "name",          
	3: "url",          
	4: "area",          
	5: "nodeid",          
	6: "sessionkey",          
	7: "companyname",          
	8: "username",          
	9: "pwd",          
	10: "receinteserverdesc",          
	11: "able",          
	12: "receinteserverid_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "19",          
	2: "2,000",          
	3: "2,000",          
	4: "200",          
	5: "2,000",          
	6: "20",          
	7: "2,000",          
	8: "2,000",          
	9: "2,000",          
	10: "2,000",          
	11: "1"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "string"        
};

var typeStore = new Ext.data.JsonStore({
	fields : [{name:'interfacename'}, {name:'receinfoid'}]
});
var ifType = M.rpc._call(function(resultList,error){typeStore.loadData(resultList);},'receInterfaceInfoAction.getAllList');
var typeCombo = new Ext.form.ComboBox({
	id: EN[1],
	name: EN[1],
	fieldLabel:CN[1],
	allowBlank : false,
	typeAhead : true,
	mode : 'local',
	triggerAction : 'all',
	selectOnFocus : true,
	editable : false,
	displayField : 'interfacename',
	valueField : 'receinfoid',
	forceSelection: true,
    selectOnFocus: true,
	showAllSelect : false,
	store:typeStore
});

//省份
var areaField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	id: EN[4], name: EN[4], fieldLabel:CN[4],
	allowBlank : false,
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
//是否生效
var yesNoField = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=YES_NO',
	id: EN[11], name: EN[11], fieldLabel:CN[11],
	allowBlank : false,
	displayField : 'parmName',
	valueField : 'parmCode'
});
var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
	{name: EN[5], type: TY[5]},          
	{name: EN[6], type: TY[6]},          
	{name: EN[7], type: TY[7]},          
	{name: EN[8], type: TY[8]},          
	{name: EN[9], type: TY[9]},          
	{name: EN[10], type: TY[10]},          
	{name: EN[11], type: TY[11]},          
    {name: EN[12], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield',hidden:true},  	
     typeCombo,  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield',allowBlank : false},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield',allowBlank : false},  	
     areaField,  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     yesNoField	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(typeCombo) },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(areaField) },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(yesNoField)  }
];


// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},     
	 new Ext.form.ComboBox({
		 id: '#receinfoid',
			name: EN[1],
			fieldLabel:CN[1],
			typeAhead : true,
			mode : 'local',
			width:175,
			triggerAction : 'all',
			selectOnFocus : true,
			editable : false,
			displayField : 'interfacename',
			valueField : 'receinfoid',
			forceSelection: true,
		    selectOnFocus: true,
			showAllSelect : false,
			store:typeStore
		}),
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#name',
		width: 90
	},  
	{text: CN[4]},   
	new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		id: '#area',name: EN[4], fieldLabel:CN[4],
		displayField : 'codeLabel',
		valueField : 'codeValue'
	}),
	{text: CN[7]},           
    {
		xtype:'textfield',
		id: '#companyname',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_EQUALS'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_EQUALS'},   
    {name: EN[7], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGridSlef = Ext.extend(Ext.ux.self.FormEditorGrid,{
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
	    },'-', queryFields, {
	   		text : '<span style="margin-left:20px;">查询</span>',
	   		cls:'search-button',
	   		minWidth:82,
	   		height:27,
	       	handler : function() {
	       		gridSelf.loadData();
	       	}
	       }, '-', {
	       	text : '<span style="margin-left:20px;">刷新</span>',
	       	cls: 'refresh-button', 
	       	minWidth:82,
	       	height:27,
	       	handler : function() {
	       		gridSelf.clearData();
	       	}
	       }]
	   }
   });
    
    Ext.ux.self.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor, {
		doSave1 : function() {
    	var windowSelf = this;
    	

    	var record = this.formPanel.form.getValues();
    	record.receinfoid = Ext.getCmp('receinfoid').getValue();
    	record.area = Ext.getCmp('area').getValue();
    	record.able = Ext.getCmp('able').getValue();
    	var old_record = this.formPanel.oldRecord;
    	if(old_record) {
    		this.setOldValues(record, old_record);		
    	}
    	/***验证form，如果所有item为空则不能提交 added by shiym 2013-12-24***/
    	var itemLength = this.formPanel.items.length;
    	var tmp = 0;
    	this.formPanel.items.each(function(item) {
    		if(item.getValue() == ''){
    			tmp++;
    		}
    	});
    	if(itemLength == tmp){
    		Ext.Msg.alert('提示', '请至少输入一个元素再提交！');
    		return;
    	}
    	/***验证form，如果所有item为空则不能提交 added by shiym 2013-12-24***/
    	if (this.formPanel.getForm().isValid()){
	    	this.formPanel.form.submit({
	    		url: windowSelf.gridPanel.url.action,
	    		method: 'post',
	    		success: function(form, action) {
	    			windowSelf.hide();
	    			windowSelf.gridPanel.store.reload();
	    		},
	    		failure: function(form, action) {
	    			windowSelf.hide();
					Ext.Msg.alert('Error', action.result.msg);
	    		},
	    		params: {
	   				action: this.formPanel.actionType,
	   				record: Ext.util.JSON.encode(record)
	  			},
	    		clientValidation: true,
	    		waitMsg: Message.waitMsg,
	    		waitTitle: Message.waitTitle
	    	});
	      }
    }
	});
    
    var userGrid = new userGridSlef({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	pk: PK,
    	url: URL
    });
    
});