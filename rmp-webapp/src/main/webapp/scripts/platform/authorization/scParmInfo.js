/**
 * scParmInfo.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scParmInfo = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scParmInfo',
	action : 'baseRecordAction.do?bean=scParmInfo&pk=typeCode|parmCode|'
};

// -> Primary key
var PK = ["typeCode","parmCode"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "参数类型",          
	1: "参数顺序",          
	2: "参数代码",          
	3: "参数名称",          
	4: "参数备注"        
};

// -> Column name in English
var EN = {
	0: "typeCode",          
	1: "parmSort",          
	2: "parmCode",          
	3: "parmName",          
	4: "description",          
	5: "typeCode_old",     
	6: "parmCode_old"   
};

// -> Cell width
var WD = {
	0: "30",          
	1: "22",          
	2: "60",          
	3: "200",          
	4: "200"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "int",          
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
    {name: EN[5], type: TY[0]},     
    {name: EN[6], type: TY[2]}   
];

var defaultData = {        
   typeCode:'',   					     
   parmSort:'',   					     
   parmCode:'',   					     
   parmName:'',   					     
   description:'' 					     
};

var typeCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_PARM_TYPE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(typeCodeField), editor: typeCodeField },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[0]},           
    {
		xtype : 'selectcombo',
		id : '#typeCode',
		name : EN[0],
		hiddenName : EN[0],
		fieldLabel : CN[0],
		width : 90,
		url : 'systemParmsProvider.do?type=SC_PARM_TYPE_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	},  
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#parmCode',
		width: 90
	},  
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#parmName',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
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