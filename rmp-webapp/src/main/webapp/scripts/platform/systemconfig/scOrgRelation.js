/**
 * scOrgRelation.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scOrgRelation = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scOrgRelation',
	action : 'baseRecordAction.do?bean=scOrgRelation&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "本级机构",          
	2: "上级机构",          
	3: "有无下级机构"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "currOrgCode",          
	2: "parentOrgCode",          
	3: "leafSign",          
	4: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "50",          
	3: "10"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "int"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
    {name: EN[4], type: TY[0]}   
];

var defaultData = {        
   id:'',   					     
   currOrgCode:'',   					     
   parentOrgCode:'',   					     
   leafSign:'' 					     
};

var currOrgCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ORG_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var parentOrgCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ORG_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var leafSignField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(currOrgCodeField), editor: currOrgCodeField},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(parentOrgCodeField), editor: parentOrgCodeField},  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(leafSignField), editor: leafSignField}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype: 'selectcombo',
		id: '#currOrgCode',
       	name: EN[1],
       	hiddenName: EN[1],
		fieldLabel: CN[1],
		width: 130,
        url: 'systemParmsProvider.do?type=SC_ORG_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
,  
	{text: CN[2]},           
    {
		xtype: 'selectcombo',
		id: '#parentOrgCode',
       	name: EN[2],
       	hiddenName: EN[2],
		fieldLabel: CN[2],
		width: 130,
        url: 'systemParmsProvider.do?type=SC_ORG_LIST',
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