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
	action : 'baseRecordAction.do?bean=scParmInfo&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "参数代码",          
	2: "参数名称",          
	3: "参数类型",          
	4: "排序",          
	5: "描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "parmCode",          
	2: "parmName",          
	3: "typeCode",          
	4: "parmSort",          
	5: "description",          
	6: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "100",          
	3: "50",          
	4: "10",          
	5: "200"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "4",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "4",          
	5: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
	{name: EN[5], type: TY[5]},          
    {name: EN[6], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield', hidden: true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
	 {name: EN[3],hiddenName: EN[3], fieldLabel:CN[3],url: 'parmTypeProvider.do',displayField: 'typeName',valueField: 'typeCode', xtype: 'selectcombo'}
,  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'} 	
];	

var typeCodeField = new Ext.ux.seraph.DictCombo({url: 'parmTypeProvider.do', displayField: 'typeName', valueField: 'typeCode'});	    	  

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(typeCodeField), editor: typeCodeField},  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#parmName',
		width: 90
	},  
	{text: CN[3]},           
    {
		xtype: 'selectcombo',
		id: '#typeCode',
       	name: EN[3],
       	hiddenName: EN[3],
		fieldLabel: CN[3],
		width: 90,
        url: 'parmTypeProvider.do',
        displayField: 'typeName',
        valueField: 'typeCode'
	}
 
];

// 
var queryParms = [
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
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