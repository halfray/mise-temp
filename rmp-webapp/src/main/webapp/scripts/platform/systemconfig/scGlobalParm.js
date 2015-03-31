/**
 * scGlobalParm.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scGlobalParm = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scGlobalParm',
	action : 'baseRecordAction.do?bean=scGlobalParm&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "参数代码",          
	2: "参数名称",          
	3: "参数值",          
	4: "描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "parmCode",          
	2: "parmName",          
	3: "parmValue",          
	4: "description",          
	5: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "50",          
	3: "50",          
	4: "100"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "4",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
    {name: EN[5], type: TY[0]}   
];

var defaultData = {        
   id:'',   					     
   parmCode:'',   					     
   parmName:'',   					     
   parmValue:'',   					     
   description:'' 					     
};


var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#parmCode',
		width: 90
	},  
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#parmName',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.seraph.RowEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	defaultData: defaultData,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	url: URL,
    	pk: PK
    });
    
});