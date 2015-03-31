/**
 * scRoleMenu.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scRoleMenu = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scRoleMenu',
	action : 'baseRecordAction.do?bean=scRoleMenu&pk=roleId|menuId'
};

// -> Primary key
var PK = ["roleId","menuId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "角色ID",          
	1: "菜单ID"        
};

// -> Column name in English
var EN = {
	0: "roleId",          
	1: "menuId",          
	2: "roleId_old",     
	3: "menuId_old"   
};

// -> Cell width
var WD = {
	0: "22",          
	1: "22"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
    {name: EN[2], type: TY[0]},     
    {name: EN[3], type: TY[1]}   
];

var defaultData = {        
   roleId:'',   					     
   menuId:'' 					     
};

var roleIdField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ROLE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var menuIdField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_TREE_MENU_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(roleIdField), editor: roleIdField},  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(menuIdField), editor: menuIdField}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[0]},           
    {
		xtype: 'selectcombo',
		id: '#roleId',
       	name: EN[0],
       	hiddenName: EN[0],
		fieldLabel: CN[0],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_ROLE_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
,  
	{text: CN[1]},           
    {
		xtype: 'selectcombo',
		id: '#menuId',
       	name: EN[1],
       	hiddenName: EN[1],
		fieldLabel: CN[1],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_TREE_MENU_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
 
];

// 
var queryParms = [
    {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
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