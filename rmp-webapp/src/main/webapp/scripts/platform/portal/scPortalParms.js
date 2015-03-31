/**
 * scPortalParms.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var scPortalParms = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'scPortalParmsListProvider.do',
	action : 'scPortalParmsAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "Portal代码",          
	2: "参数代码",          
	3: "参数中文名",          
	4: "参数类型",          
	5: "参数默认值",          
	6: "字典表链接",         
	7: "字典展示名",          
	8: "字典数据名",          
	9: "排序",          
	10: "描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "portalCode",          
	2: "parmCode",          
	3: "parmName",          
	4: "parmType",          
	5: "parmValue",          
	6: "dicUrl",          
	7: "dicDisplayField",          
	8: "dicValueField",          
	9: "sort",          
	10: "description",          
	11: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "100",          
	2: "100",          
	3: "100",          
	4: "10",          
	5: "200",          
	6: "200",          
	7: "100",          
	8: "100",          
	9: "10",          
	10: "500"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "int",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "int",          
	10: "string"        
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
    {name: EN[11], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel: CN[0], xtype: 'textfield', hidden: true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'selectcombo', hiddenName: EN[1], url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST', displayField: 'codeLabel', valueField: 'codeValue'}, 			
     {id: EN[2], name: EN[2], fieldLabel: CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel: CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel: CN[4], xtype: 'selectcombo', hiddenName: EN[4], url: 'parmInfoProvider.do?parmType=XTYPE', displayField: 'parmName', valueField: 'parmCode'},  	
     {id: EN[5], name: EN[5], fieldLabel: CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel: CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel: CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel: CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel: CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'} 	
];	

var portalCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST', displayField: 'codeLabel', valueField: 'codeValue'});
var parmTypeField = new Ext.ux.seraph.DictCombo({url: 'parmInfoProvider.do?parmType=XTYPE', displayField: 'parmName', valueField: 'parmCode'});

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: true,  editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(portalCodeField), editor: portalCodeField},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(parmTypeField), editor: parmTypeField},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false, editor: {xtype: 'textfield'} },   
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false, editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false, editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text:  CN[1]},  
	{
		xtype: 'selectcombo',
		id: '#portalCode',
	    name: "portalCode",
	    hiddenName: "portalCode",
		fieldLabel: "portalCode",
		value:'',
		width: 240,
	    url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST',
	    displayField: 'codeLabel',
	    valueField: 'codeValue'
	 },' ',
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
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
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