/**
 * scUserRole.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scUserRole = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scUserRole',
	action : 'baseRecordAction.do?bean=scUserRole&pk=id'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID", 
	1: "用户",
	2: "角色名称"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "userName",          
	2: "roleName",     
	3: "id_old"   
};

// -> Cell width
var WD = {
	0: "22", 
	1: "22", 
	2: "50"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",     
	0: "string",
	1: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
    {name: EN[2], type: TY[0]},     
    {name: EN[3], type: TY[1]}   
];

var defaultData = {        
		userName:'',   					     
		roleName:'' 					     
};

var roleIdField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ROLE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var userIdField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_USER_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} }, 
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(userIdField), editor: userIdField},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(roleIdField), editor: roleIdField}
];

// TODO: default xtype, width
var queryFields = [
   {text: CN[1]},           
   {
	   xtype: 'selectcombo',
	   id: '#userName',
	   name: EN[1],
	   hiddenName: EN[1],
	   fieldLabel: CN[1],
	   width: 110,
	   url: 'systemParmsProvider.do?type=SC_USER_LIST',
	   displayField: 'codeLabel',
	   valueField: 'codeValue'
   } ,
	{text: CN[2]},           
    {
		xtype: 'selectcombo',
		id: '#roleName',
       	name: EN[2],
       	hiddenName: EN[2],
		fieldLabel: CN[2],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_ROLE_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
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