/**
 * tbWsM0001.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbWsM0001 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbWsM0001ListProvider.do',
	action : 'tbWsM0001Action.do'
};

// -> Primary key
var PK = ["ws0001","cc0003","icp0301"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "网站编号",          
	1: "网站名称",          
	2: "网内网外标志",          
	3: "网站类型编码",          
	4: "网站类型名称",          
	5: "内容资源类型编码",          
	6: "内容资源类型名称",          
	7: "内容资源归属编码",          
	8: "内容资源归属",          
	9: "资源数量",          
	10: "资源大小",          
	11: "资源流量",          
	12: "请求次数",          
	13: "服务器IP个数",          
	14: "域名数量",          
	15: "大文件数量",          
	16: "可缓存资源数量",          
	17: "可缓存资源大小"        
};

// -> Column name in English
var EN = {
	0: "ws0001",          
	1: "ws0002",          
	2: "ws0003",          
	3: "ws0004",          
	4: "ws0005",          
	5: "cc0003",          
	6: "cc0004",          
	7: "icp0301",          
	8: "icp0302",          
	9: "rrX101",          
	10: "rrX102",          
	11: "rrX103",          
	12: "uuX001",          
	13: "ipX001",          
	14: "ddX001",          
	15: "rrZ104",          
	16: "rrZ108",          
	17: "rrZ109",          
	18: "ws0001_old",     
	19: "cc0003_old",     
	20: "icp0301_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "255",          
	2: "1",          
	3: "4",          
	4: "20",          
	5: "4",          
	6: "20",          
	7: "4",          
	8: "20",          
	9: "10",          
	10: "32",          
	11: "32",          
	12: "10",          
	13: "10",          
	14: "10",          
	15: "10",          
	16: "10",          
	17: "32"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "1",          
	3: "1",          
	4: "string",          
	5: "1",          
	6: "string",          
	7: "1",          
	8: "string",          
	9: "int",          
	10: "int",          
	11: "int",          
	12: "int",          
	13: "int",          
	14: "int",          
	15: "int",          
	16: "int",          
	17: "int"        
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
	{name: EN[17], type: TY[17]},          
    {name: EN[18], type: TY[0]},     
    {name: EN[19], type: TY[5]},     
    {name: EN[20], type: TY[7]}   
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
     {id: EN[16], name: EN[16], fieldLabel:CN[16], xtype: 'textfield'},  	
     {id: EN[17], name: EN[17], fieldLabel:CN[17], xtype: 'textfield'} 	
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
    {header: CN[16], width: WD[16], sortable: true, dataIndex: EN[16], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[17], width: WD[17], sortable: true, dataIndex: EN[17], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
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