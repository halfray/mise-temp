/**
 * httpDomain44.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var httpDomain44 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'httpDomain44ListProvider.do?provinceString='+provinceString,
	action : 'httpDomain44Action.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "域名",          
	2: "IP",          
	3: "泛域名",          
	4: "本省本网IDC占比",          
	5: "本省本网缓存占比",          
	6: "省份",          
	7: "本网占比",          
	8: "本省本网直连占比"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "domain",          
	2: "ip",          
	3: "site",          
	4: "idc",          
	5: "cache",          
	6: "province",          
	7: "net",          
	8: "direct",          
	9: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "255",          
	2: "65,535",          
	3: "255",          
	4: "7",          
	5: "7",          
	6: "7",          
	7: "7",          
	8: "7"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "-1",          
	3: "string",          
	4: "7",          
	5: "7",          
	6: "7",          
	7: "7",          
	8: "7"        
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
    {name: EN[9], type: TY[0]}   
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
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'} 	
];	


var userColumns =[   
new Ext.grid.RowNumberer(),
    {header: CN[1], width: 180, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: 150, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: 150, sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: 120, sortable: true, dataIndex: EN[4],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: 120, sortable: true, dataIndex: EN[5],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },   
    {header: CN[8], width: 120, sortable: true, dataIndex: EN[8],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[7], width: 120, sortable: true, dataIndex: EN[7],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
                	{text: CN[1]},           
                 {
                		xtype:'textfield',
                		id: '#domain',
                		width: 90
                	}];

// 
var queryParms = [{name: EN[1], indicator: 'EXAMPLE_LIKE'}
];

Ext.onReady(function() {
	
Ext.QuickTips.init();
    
    Ext.override(Ext.ux.self.FormEditorGrid,{
        initComponent : function() {
        	
    		// build selection model
    		this.sm = this.buildSelectionModel();
    		// build columns model
    		var originCM = this.buildColumnModels();
    		var customerCM = this.columns;
    		//this.columns = originCM.concat(customerCM);
    		this.columns = customerCM;

    		// build form
    		this.formPanel = this.buildForm();
    		
            // build editor
        	this.editor = this.buildEditor();
            
            // build Tbar
            this.tbar = this.buildTbar(this.queryFields);
            
            // build store
            this.store = this.buildStore();
            
            // build pagingToolbar
            this.pagingToolbar = this.buildPagingToolbar();
            this.bbar = this.pagingToolbar;

            // Set auto-column width, viewConfig: {forceFit:true}
            // this.getView().forceFit = true;
            
        	//this.on('rowdblclick', userGrid.showVideoUrlDetail, this);
        	this.on('load', this.loadData(), this);
            
            // super
            Ext.ux.seraph.FormEditorGrid.superclass.initComponent.apply(this, arguments);
        },    	   	
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
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	pk: PK,
    	url: URL
    });
    
});