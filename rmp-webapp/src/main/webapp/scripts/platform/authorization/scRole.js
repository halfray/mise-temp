/**
 * scRole.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scRole = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scRole',
	action : 'baseRecordAction.do?bean=scRole&pk=roleId|'
};

// -> Primary key
var PK = ["roleId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "角色ID",          
	1: "角色名",          
	2: "角色中文名",          
	3: "描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "roleName",          
	2: "roleAlias",          
	3: "description",          
	4: "id_old"   
};

// -> Cell width
var WD = {
	0: "22",          
	1: "30",          
	2: "30",          
	3: "50"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
    {name: EN[4], type: TY[0]}   
];

var defaultData = {        
   roleId:'',   					     
   roleName:'',   					     
   roleAlias:'',   					     
   description:'' 					     
};


var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
/*	{text: CN[0]},           
    {
		xtype:'textfield',
		id: '#roleId',
		width: 90
	},  */
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#roleName',
		width: 90
	} 
];

// 
var queryParms = [
   // {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[1], indicator: 'EXAMPLE_LIKE'}  
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