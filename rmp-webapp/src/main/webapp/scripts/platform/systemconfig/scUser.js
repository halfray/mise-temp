/**
 * scUser.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var scUser = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scUser',
	action : 'baseRecordAction.do?bean=scUser&pk=userId|'
};

// -> Primary key
var PK = ["userId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "用户名",          
	2: "所属机构",          
	3: "用户中文名",          
	4: "用户密码",          
	5: "移动电话",          
	6: "固定电话",          
	7: "电子邮箱",          
	8: "启用日期",          
	9: "结束日期",          
	10: "用户启用",          
	11: "用户失效",          
	12: "用户锁定",          
	13: "权限失效"        
};

// -> Column name in English
var EN = {
	0: "userId",          
	1: "userName",          
	2: "orgCode",          
	3: "userAlias",          
	4: "password",          
	5: "cellphoneNum",          
	6: "phoneNum",          
	7: "email",          
	8: "startDate",          
	9: "endDate",          
	10: "accountEnabled",          
	11: "accountExpired",          
	12: "accountLocked",          
	13: "credentialsExpired",          
	14: "userId_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "50",          
	3: "50",          
	4: "50",          
	5: "20",          
	6: "20",          
	7: "50",          
	8: "10",          
	9: "10",          
	10: "10",          
	11: "10",          
	12: "10",          
	13: "10"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "int",          
	11: "int",          
	12: "int",          
	13: "int"        
};

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
	{name: EN[12], type: TY[12]},          
	{name: EN[13], type: TY[13]},          
    {name: EN[14], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield', hidden: true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
	 {name: EN[2],hiddenName: EN[2], fieldLabel:CN[2],url: 'systemParmsProvider.do?type=SC_ORG_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
,  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield', inputType:'password'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
	 {id: EN[8], name: EN[8], fieldLabel:CN[8],format:'Y-m-d', xtype: 'datefield'}		
,  	
	 {id: EN[9], name: EN[9], fieldLabel:CN[9],format:'Y-m-d', xtype: 'datefield'}		
,  	
	 { name: EN[10],hiddenName: EN[10], fieldLabel:CN[10],url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
,  	
	 { name: EN[11],hiddenName: EN[11], fieldLabel:CN[11],url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
,  	
	 {name: EN[12],hiddenName: EN[12], fieldLabel:CN[12],url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
,  	
	 { name: EN[13],hiddenName: EN[13], fieldLabel:CN[13],url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
 	
];	

var orgCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ORG_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var accountEnabledField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var accountExpiredField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var accountLockedField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var credentialsExpiredField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(orgCodeField), editor: orgCodeField},  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(accountEnabledField), editor: accountEnabledField},  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(accountExpiredField), editor: accountExpiredField},  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(accountLockedField), editor: accountLockedField},  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(credentialsExpiredField), editor: credentialsExpiredField}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#userName',
		width: 90
	},  
	{text: CN[2]},           
    {
		xtype: 'selectcombo',
		id: '#orgCode',
       	name: EN[2],
       	hiddenName: EN[2],
		fieldLabel: CN[2],
		width: 130,
        url: 'systemParmsProvider.do?type=SC_ORG_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
,  
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#userAlias',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.seraph.FormEditorGrid({
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