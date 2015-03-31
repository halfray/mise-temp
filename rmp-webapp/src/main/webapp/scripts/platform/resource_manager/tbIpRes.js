/**
 * tbIpRes.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbIpRes = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbIpResListProvider.do',
	action : 'tbIpResAction.do'
};

// -> Primary key
var PK = ["ipId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "IP起始地址段",          
	2: "IP终止地址段",          
	3: "IP起始地址段_INT",          
	4: "IP终止地址段_INT",          
	5: "掩码范围",          
	6: "运营商编码",          
	7: "地域编码(省)",          
	8: "归属系统",          
	9: "状态",          
	10: "启用时间",          
	11: "停用时间",          
	12: "地区",          
	13: "系统描述",          
	14: "创建时间",          
	15: "修改时间",          
	16: "操作人"        
};

// -> Column name in English
var EN = {
	0: "ipId",          
	1: "ipStart",          
	2: "ipEnd",          
	3: "ipStartInt",          
	4: "ipEndInt",          
	5: "ipMask",          
	6: "operator",          
	7: "lacation",          
	8: "system",          
	9: "ipState",          
	10: "ipStartTime",          
	11: "ipEndTime",          
	12: "ipLacationDetail",          
	13: "ipSystemDetail",          
	14: "createTime",          
	15: "updateTime",          
	16: "operatorUser",          
	17: "ipId_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "15",          
	2: "15",          
	3: "10",          
	4: "10",          
	5: "10",          
	6: "4",          
	7: "10",          
	8: "4",          
	9: "1",          
	10: "10",          
	11: "10",          
	12: "255",          
	13: "255",          
	14: "10",          
	15: "10",          
	16: "255"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "int",          
	4: "int",          
	5: "int",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "string",          
	12: "string",          
	13: "string",          
	14: "string",          
	15: "string",          
	16: "string"        
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
	{name: EN[14], type: TY[14]},          
	{name: EN[15], type: TY[15]},          
	{name: EN[16], type: TY[16]},          
    {name: EN[17], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield'},  	
     {id: EN[13], name: EN[13], fieldLabel:CN[13], xtype: 'textfield'},  	
     {id: EN[14], name: EN[14], fieldLabel:CN[14], xtype: 'textfield'},  	
     {id: EN[15], name: EN[15], fieldLabel:CN[15], xtype: 'textfield'},  	
     {id: EN[16], name: EN[16], fieldLabel:CN[16], xtype: 'textfield'} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[14], width: WD[14], sortable: true, dataIndex: EN[14], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[15], width: WD[15], sortable: true, dataIndex: EN[15], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[16], width: WD[16], sortable: true, dataIndex: EN[16], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[6]},           
    {
		xtype:'textfield',
		id: '#operator',
		width: 90
	},  
	{text: CN[8]},           
    {
		xtype:'textfield',
		id: '#system',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[6], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[8], indicator: 'EXAMPLE_LIKE'}  
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