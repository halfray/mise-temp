/**
 * scOrg.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scOrg = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scOrg',
	action : 'baseRecordAction.do?bean=scOrg&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "机构代码",          
	2: "机构名称",          
	3: "机构简称",          
	4: "机构等级"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "orgCode",          
	2: "orgName",          
	3: "orgShortName",          
	4: "orgLevel",          
	5: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "50",          
	3: "20",          
	4: "10"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "4",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "4"        
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
   orgCode:'',   					     
   orgName:'',   					     
   orgShortName:'',   					     
   orgLevel:'' 					     
};

var orgLevelField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ORG_LEVEL_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(orgLevelField), editor: orgLevelField}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#orgCode',
		width: 90
	},  
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#orgName',
		width: 90
	},  
	{text: CN[4]},           
    {
		xtype: 'selectcombo',
		id: '#orgLevel',
       	name: EN[4],
       	hiddenName: EN[4],
		fieldLabel: CN[4],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_ORG_LEVEL_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_EQUALS'}  
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