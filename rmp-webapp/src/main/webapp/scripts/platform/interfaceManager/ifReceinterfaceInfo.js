/**
 * ifReceinterfaceInfo.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var ifReceinterfaceInfo = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'ifReceinterfaceInfoListProvider.do',
	action : 'ifReceinterfaceInfoAction.do'
};

// -> Primary key
var PK = ["receinfoid"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "",          
	1: "接口系统",          
	2: "接口名称",          
	3: "接口编码",          
	4: "命令类型",          
	5: "协议类型",          
	6: "功能描述"        
};

// -> Column name in English
var EN = {
	0: "receinfoid",          
	1: "system",          
	2: "interfacename",          
	3: "interfacecode",          
	4: "commandtype",          
	5: "protocoltype",          
	6: "receinodesc",          
	7: "receinfoid_old"   
};

// -> Cell width
var WD = {
	0: 100,          
	1: 200,          
	2: 150,          
	3: 150,          
	4: 150,          
	5: 100,          
	6: 200        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
	{name: EN[5], type: TY[5]},          
	{name: EN[6], type: TY[6]},          
    {name: EN[7], type: TY[0]}   
];

//接口系统
var system = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=IF_SYSTEM_TYPE',
	name:'system',
	allowBlank : false,
	fieldLabel:CN[1],
	displayField : 'parmName',
	valueField : 'parmCode'
});
//协议类型
var protocol = new Ext.ux.seraph.DictCombo( {
	url : 'parmInfoProvider.do?parmType=IF_PROTOCOL_TYPE',
	name:'protocoltype',
	fieldLabel:CN[5],
	allowBlank : false,
	displayField : 'parmName',
	valueField : 'parmCode'
});
var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'hidden'},  	
     system, 	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield',allowBlank : false},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield',allowBlank : false},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield',allowBlank : false},  	
     protocol, 	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(system)},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(protocol)},  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},
	 new Ext.ux.seraph.DictCombo( {
			url : 'parmInfoProvider.do?parmType=IF_SYSTEM_TYPE',
			id: '#system',
			displayField : 'parmName',
			valueField : 'parmCode',
			width: 130
		}),          
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#interfacename',
		width: 90
	},  
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#interfacecode',
		width: 90
	},  
	{text: CN[4]},           
    {
		xtype:'textfield',
		id: '#commandtype',
		width: 90
	},  
	{text: CN[5]},     
	new Ext.ux.seraph.DictCombo( {
		url : 'parmInfoProvider.do?parmType=IF_PROTOCOL_TYPE',
		id: '#protocoltype',
		displayField : 'parmName',
		valueField : 'parmCode',
		width: 90
	})
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[5], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.extend.FormEditorGrid({
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