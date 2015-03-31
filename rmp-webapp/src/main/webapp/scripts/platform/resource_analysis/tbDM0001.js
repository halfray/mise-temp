/**
 * tbDM0001.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDM0001 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDM0001ListProvider.do',
	action : 'tbDM0001Action.do'
};

// -> Primary key
var PK = ["dd0001","cc0003","icp0301"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "域名编号",          
	1: "域名名称",          
	2: "内容资源类型编码",          
	3: "内容资源类型名称",          
	4: "内容资源归属编码",          
	5: "内容资源归属",          
	6: "资源数量",          
	7: "资源大小",          
	8: "资源流量",          
	9: "请求次数",          
	10: "服务器IP个数",          
	11: "可缓存资源数量",          
	12: "可缓存资源大小"        
};

// -> Column name in English
var EN = {
	0: "dd0001",          
	1: "dd0002",          
	2: "cc0003",          
	3: "cc0004",          
	4: "icp0301",          
	5: "icp0302",          
	6: "rrX101",          
	7: "rrX102",          
	8: "rrX103",          
	9: "uuX001",          
	10: "ipX001",          
	11: "rrZ108",          
	12: "rrZ109",          
	13: "dd0001_old",     
	14: "cc0003_old",     
	15: "icp0301_old"   
};

// -> Cell width
var WD = {
	0: "255",          
	1: "255",          
	2: "4",          
	3: "20",          
	4: "4",          
	5: "20",          
	6: "10",          
	7: "32",          
	8: "32",          
	9: "10",          
	10: "10",          
	11: "10",          
	12: "32"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string",          
	2: "1",          
	3: "string",          
	4: "1",          
	5: "string",          
	6: "int",          
	7: "int",          
	8: "int",          
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
    {name: EN[13], type: TY[0]},     
    {name: EN[14], type: TY[2]},     
    {name: EN[15], type: TY[4]}   
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
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield'} 	
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
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
];

// 
var queryParms = [
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