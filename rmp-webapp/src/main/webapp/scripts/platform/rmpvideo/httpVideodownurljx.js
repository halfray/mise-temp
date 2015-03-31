/**
 * httpVideodownurl.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var httpVideodownurl = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'httpVideodownurlListProviderjx.do?hvd_qurey_params='+hvd_qurey_params,
	action : 'httpVideodownurlAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "自动增加ID标识",          
	1: "索引关联http_playurl中的ID",          
	2: "清晰度",          
	3: "分片序号",          
	4: "文件大小(M)",          
	5: "链接地址",          
	6: "下载IP",          
	7: "idc"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "httpid",          
	2: "dpi",          
	3: "seg",          
	4: "size",          
	5: "downloadurl",          
	6: "downloadIp",          
	7: "idc",          
	8: "id_old"   
};

// -> Cell width
var WD = {
	0: "20",          
	1: "20",          
	2: "300",          
	3: "10",          
	4: "300",          
	5: "300",          
	6: "65",          
	7: "7"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "-5",          
	2: "int",          
	3: "int",          
	4: "string",          
	5: "string",          
	6: "-1",          
	7: "7"        
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
    {name: EN[8], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'} 	
];	


var userColumns =[ 
    {header: CN[5], width: 500, sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },    
    {header: CN[4], width: 100, sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Main.fun.getMFromByte},     
    {header: CN[2], width: 100, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
];

// 
var queryParms = [
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    Ext.override(Ext.ux.seraph.FormEditorGrid,{
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
            //this.tbar = this.buildTbar(this.queryFields);
            
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
        }
    }); 
    
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
    userGrid.purgeListeners();
    
});