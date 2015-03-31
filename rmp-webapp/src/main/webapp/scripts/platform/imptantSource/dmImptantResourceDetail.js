/**
 * dmImptantResourceDetail.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var dmImptantResourceDetail = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'dmImptantResourceDetailListProvider.do',
	action : 'dmImptantResourceDetailAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "所属运营商",          
	1: "所属区域",          
	2: "所属系统",          
	3: "网站",          
	4: "域名",          
	5: "IP",          
	6: "端口号",          
	7: "资源类型",          
	8: "资源名称",          
	9: "NODEID",          
	10: "数据来源",          
	11: "更新日期",          
	12: ""        
};

// -> Column name in English
var EN = {
	0: "operator",          
	1: "area",          
	2: "system",          
	3: "websitename",          
	4: "domain",          
	5: "ip",          
	6: "port",          
	7: "restype",          
	8: "resname",          
	9: "nodeid",          
	10: "datasource",          
	11: "updatedate",          
	12: "id",          
	13: "id_old"   
};

// -> Cell width
var WD = {
	0: "20",          
	1: "20",          
	2: "20",          
	3: "2,000",          
	4: "2,000",          
	5: "20",          
	6: "20",          
	7: "20",          
	8: "2,000",          
	9: "20",          
	10: "20",          
	11: "20",          
	12: "19"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "string",          
	12: "-5"        
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
    {name: EN[13], type: TY[12]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield'} 	
];	

var operatorField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	id: '#operator',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width: 90
});
var areaField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	id: '#area',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width: 90
});
var systemField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	id: '#system',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width: 90
});
var resourceType = 	new Ext.ux.seraph.DictCombo( {
	id: '#restype', 
	url : "systemParmsProvider.do?type=TB_IP_W_0003_LIST",
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width: 90
})

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(operatorField) },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(areaField)},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(systemField) },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(resourceType) },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[0]},           
   operatorField,   
	{text: CN[1]},           
   areaField,
	{text: CN[2]},           
   systemField,  
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#websitename',
		width: 90
	},  
	{text: CN[4]},           
    {
		xtype:'textfield',
		id: '#domain',
		width: 90
	},  
	{text: CN[5]},           
    {
		xtype:'textfield',
		id: '#ip',
		width: 90
	},  
	{text: CN[7]},           
    resourceType
];

// 
var queryParms = [
    {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[5], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[7], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
        Ext.override(Ext.ux.self.FormEditorGrid,{
    	buildTbar : function(queryFields) {
			var gridSelf = this;
			return [
			queryFields, {
		    	text: '查询', 
		    	iconCls: 'dataTable-preview-icon', 
		    	handler : function() {
		    		gridSelf.loadData();
		    	}
		    }, '-', {
		    	text: '刷新', 
		    	iconCls: 'role-user-reset', 
		    	handler : function() {
		    		gridSelf.clearData();
		    	}
		    }]
		}
    });
    
    var userGrid = new Ext.ux.self.FormEditorGrid({
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