/**
 * stDomain.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var stDomain = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'stDomainListProvider.do',
	action : 'stDomainAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "域名",          
	2: "子域名",          
	3: "IP",          
	4: "IDC占比"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "domain",          
	2: "subdomain",          
	3: "ip",          
	4: "idc",          
	5: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "64",          
	2: "64",          
	3: "65",          
	4: "7"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
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
    {name: EN[5], type: TY[0]}   
];

var defaultData = {        
   id:'',   					     
   domain:'',   					     
   subdomain:'',   					     
   ip:'',   					     
   idc:'' 					     
};


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 180, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: 180, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: 180, sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: 180, sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
   {text: CN[1]},           
   {
		xtype:'textfield',
		id: '#'+EN[1],
   		width: 90
   	}                   
];

// 
var queryParms = [
	{name: EN[1], indicator: 'EXAMPLE_LIKE'}                  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();

    Ext.override(Ext.ux.self.FormEditorGrid,{
	    buildTbar : function(queryFields) {
	    	var gridSelf = this;
	    	return [queryFields, {
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
    	defaultData: defaultData,
    	queryFields: queryFields,
    	formFields:[],
    	queryParms: queryParms,
    	columns: userColumns,
    	url: URL,
    	pk: PK
    });
    userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
});