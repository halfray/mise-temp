/**
 * scTreeMenu.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var scTreeMenu = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scTreeMenu',
	action : 'baseRecordAction.do?bean=scTreeMenu&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "菜单ID",          
	2: "父菜单ID",          
	3: "菜单名称",          
	4: "是否叶子结点",          
	5: "禁用",          
	6: "节点样式",          
	7: "节点图标",          
	8: "链接",          
	9: "可见",          
	10: "菜单类型",          
	11: "排序",          
	12: "链接目标"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "menuId",          
	2: "parentId",          
	3: "text",          
	4: "leaf",          
	5: "disabled",          
	6: "cls",          
	7: "iconCls",          
	8: "href",          
	9: "visibility",          
	10: "type",          
	11: "sort",          
	12: "hrefTarget",          
	13: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "10",          
	2: "10",          
	3: "50",          
	4: "5",          
	5: "5",          
	6: "10",          
	7: "50",          
	8: "100",          
	9: "10",          
	10: "10",          
	11: "10",          
	12: "100"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int",          
	2: "int",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "int",          
	12: "string"        
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
	{name: EN[11], type: TY[11]},          
	{name: EN[12], type: TY[12]},          
    {name: EN[13], type: TY[0]}   
];

var defaultData = {        
   id:'',   					     
   menuId:'',   					     
   parentId:'',   					     
   text:'',   					     
   leaf:'',   					     
   disabled:'',   					     
   cls:'',   					     
   iconCls:'',   					     
   href:'',   					     
   visibility:'',   					     
   type:'',   					     
   sort:'',   					     
   hrefTarget:'' 					     
};

var leafField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var disabledField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var visibilityField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(leafField), editor: leafField},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(disabledField), editor: disabledField},  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(visibilityField), editor: visibilityField},  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
];

// 
var queryParms = [
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