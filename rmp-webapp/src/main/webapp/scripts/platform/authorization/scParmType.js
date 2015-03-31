/**
 * scParmType.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scParmType = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scParmType',
	action : 'baseRecordAction.do?bean=scParmType&pk=typeCode|'
};

// -> Primary key
var PK = ["typeCode"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "参数类型ID",          
	1: "参数类型描述"        
};

// -> Column name in English
var EN = {
	0: "typeCode",          
	1: "typeName",          
	2: "typeCode_old"   
};

// -> Cell width
var WD = {
	0: "30",          
	1: "100"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
    {name: EN[2], type: TY[0]}   
];

var defaultData = {        
   typeCode:'',   					     
   typeName:'' 					     
};

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[0]},           
    {
		xtype: 'selectcombo',
		id: '#typeCode',
       	name: EN[0],
       	hiddenName: EN[0],
		fieldLabel: CN[0],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_PARM_TYPE_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
,  
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#typeName',
		width: 90
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