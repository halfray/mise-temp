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
	0: "用户ID",          
	1: "用户名称",          
	2: "机构编码",          
	3: "用户密码",          
	4: "电子邮箱",          
	5: "联系电话",          
	6: "启用日期",          
	7: "结束日期",          
	8: "IP地址",          
	9: "用户启用",          
	10: "用户过期",          
	11: "用户锁定",          
	12: "权限过期"        
};

// -> Column name in English
var EN = {
	0: "userId",          
	1: "userName",          
	2: "organizationId",          
	3: "password",          
	4: "email",          
	5: "phoneNumber",          
	6: "startDate",          
	7: "endDate",          
	8: "ip",          
	9: "accountEnabled",          
	10: "accountExpired",          
	11: "accountLocked",          
	12: "credentialsExpired",          
	13: "userId_old"   
};

// -> Cell width
var WD = {
	0: "50",          
	1: "50",          
	2: "50",          
	3: "50",          
	4: "50",          
	5: "20",          
	6: "7",          
	7: "7",          
	8: "20",          
	9: "22",          
	10: "22",          
	11: "22",          
	12: "22"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "date",          
	7: "date",          
	8: "string",          
	9: "int",          
	10: "int",          
	11: "int",          
	12: "int"        
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
    {name: EN[13], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield', inputType: 'password'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
	 {id: EN[6], name: EN[6], fieldLabel:CN[6],format:'Y-m-d', xtype: 'datefield'},  	
	 {id: EN[7], name: EN[7], fieldLabel:CN[7],format:'Y-m-d', xtype: 'datefield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], url: 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',displayField: 'parmName',valueField: 'parmCode', xtype: 'selectcombo'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], url: 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',displayField: 'parmName',valueField: 'parmCode', xtype: 'selectcombo'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], url: 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',displayField: 'parmName',valueField: 'parmCode', xtype: 'selectcombo'},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], url: 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',displayField: 'parmName',valueField: 'parmCode', xtype: 'selectcombo'} 	
];	

function renderPwd(record){   
    return '******'  
}  

var booleanValueField = new Ext.ux.seraph.DictCombo({
	url : 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',
	displayField : 'parmName',
	valueField : 'parmCode'
});

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'}, renderer: renderPwd },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,renderer:Ext.util.Format.dateRenderer('Y-m-d'),editor: {xtype:'datefield', editable: false, format: 'Y-m-d'}},  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,renderer:Ext.util.Format.dateRenderer('Y-m-d'),editor: {xtype:'datefield', editable: false, format: 'Y-m-d'}},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,renderer : Ext.ux.renderer.Combo(booleanValueField),editor: booleanValueField },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,renderer : Ext.ux.renderer.Combo(booleanValueField),editor: booleanValueField },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,renderer : Ext.ux.renderer.Combo(booleanValueField),editor: booleanValueField },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,renderer : Ext.ux.renderer.Combo(booleanValueField),editor: booleanValueField }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[0]},           
    {
		xtype:'textfield',
		id: '#userId',
		width: 90
	},  
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#userName',
		width: 90
	},  
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#organizationId',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'}  
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