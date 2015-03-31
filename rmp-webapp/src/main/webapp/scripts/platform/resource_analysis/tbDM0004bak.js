/**
 * tbDM0004.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDM0004 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDM0004ListProvider.do',
	action : 'tbDM0004Action.do'
};

// -> Primary key
var PK = ["pp0105","dd0001","ip0001"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "探测批次",          
	1: "探测时间",          
	2: "域名编号",          
	3: "域名名称",          
	4: "IP地址",          
	5: "运营商编码",          
	6: "地域编码",          
	7: "运营商系统编码",          
	8: "内容资源归属编码",          
	9: "就近标志",          
	10: "响应时间",          
	11: "速度",          
	12: "域名质量分数",          
	13: "域名质量分数",          
	17: "域名级别"        
};

// -> Column name in English
var EN = {
	0: "pp0001",          
	1: "pp0105",          
	2: "dd0001",          
	3: "dd0002",          
	4: "ip0001",          
	5: "op0001",          
	6: "op0201",          
	7: "op0101",          
	8: "op0301",          
	9: "ip000c",          
	10: "ddX002",          
	11: "ddX003",          
	12: "ddY001",          
	13: "op0304",          
	14: "pp0105_old",     
	15: "dd0001_old",     
	16: "ip0001_old",          
	17: "domainLevel"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "20",          
	2: "19",          
	3: 300,          
	4: 150,          
	5: "4",          
	6: "10",          
	7: "4",          
	8: "4",          
	9: "10",          
	10: "10",          
	11: "18",          
	12: "18",          
	13: "18",          
	17: "18"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "-5",          
	3: "string",          
	4: "string",          
	5: "1",          
	6: "1",          
	7: "1",          
	8: "1",          
	9: "int",          
	10: "int",          
	11: "int",          
	12: "int",          
	13: "int",          
	17: "string"        
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
	{name: EN[13], type: TY[13]},          
    {name: EN[14], type: TY[1]},     
    {name: EN[15], type: TY[2]},     
    {name: EN[16], type: TY[4]},     
    {name: EN[17], type: TY[17]}  
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
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield'},  	
     {id: EN[13], name: EN[13], fieldLabel:CN[13], xtype: 'textfield'} 	
];	

function rendererHref(value, metaData, record){
	var domainName=record.get('dd0002');
	return "<a onclick=\"javascript:showCharts()\">"+value+"</a>";
};

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,renderer:rendererHref},
    {header: CN[17], width: WD[17], sortable: true, dataIndex: EN[17], hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#dd0002',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
];

function showCharts(domainName){
	
	var testWindow=new Ext.Window({
		id : 'VideoUrlDetailWin',
		title : '链接地址',
		width :1050,
		height : 600,
		draggable:true,
		constrain:true,// 将拖动范围限制在容器内
		autoDestroy:false,
		closeAction: 'close',
	    modal : true 
    });
	testWindow.html="<iframe id='myFrame' name='myFrame' width='100%' height='100%' src='portalPixel.do?portalCode=tbDM0004Chart'/>";
	testWindow.show();
};

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
            
        	//this.on('rowdblclick', this.onUpdate, this);
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
    	url: URL,
        
        buildTbar : function(queryFields) {
        	var gridSelf = this;
        	return [ queryFields, {
            	text: '查询', 
            	iconCls: 'dataTable-preview-icon', 
            	handler : function() {
            		gridSelf.loadData();
            	}
            }]
        }
    });
});