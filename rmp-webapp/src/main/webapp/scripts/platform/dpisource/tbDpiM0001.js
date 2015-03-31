/**
 * tbDpiM0001.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDpiM0001 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDpiM0001ListProvider.do',
	action : 'tbDpiM0001Action.do'
};

// -> Primary key
var PK = ["tbId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "时间",          
	2: "URL",          
	3: "保留字段",          
	4: "访问次数",          
	5: "总流量",          
	6: "上行流量",          
	7: "下行流量",          
	8: "IP地址",          
	9: "IP归属",          
	10: "域名",          
	11: "地域ID"        
};

// -> Column name in English
var EN = {
	0: "tbId",          
	1: "createTime",          
	2: "url",          
	3: "keepField",          
	4: "visitCount",          
	5: "allFlow",          
	6: "upFlow",          
	7: "downFlow",          
	8: "ipAdd",          
	9: "ipBelong",          
	10: "domain",          
	11: "areaId",          
	12: "tbId_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "10",          
	2: "255",          
	3: "20",          
	4: "10",          
	5: "32",          
	6: "32",          
	7: "32",          
	8: "20",          
	9: "80",          
	10: "80",          
	11: "10"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "int",          
	5: "int",          
	6: "int",          
	7: "int",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "int"        
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
    {name: EN[12], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'hidden'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'datefield',format:'Y-m-d',value:new Date()},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield',allowBlank:false,maxLength:200},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: true,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: 160, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5]+'(M)', width: WD[5]+'', sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Main.fun.getMFromByte  },  
    {header: CN[6]+'(M)', width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Main.fun.getMFromByte },  
    {header: CN[7]+'(M)', width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Main.fun.getMFromByte },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden:true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#url',
		width: 90
	},  
	{text: CN[10]},           
    {
		xtype:'textfield',
		id: '#domain',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[10], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.self.FormEditorGrid({
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