/**
 * tbWsM0003.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbWsM0003 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbWsM0003DListProvider.do?'+hvd_qurey_params,
	action : 'tbWsM0003DAction.do'
};

// -> Primary key
var PK = ["pp0101","op0001","op0201","op0101","pp0902"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "统计周期",          
	1: "网站类型",          
	2: "网站名称",          
	3: "所属运营商",          
	4: "所属省份",          
	5: "所属系统",          
	6: "内容资源归属",          
	7: "网内网外",          
	8: "资源流量 (M)",          
	9: "资源上行流量",          
	10: "资源下行流量",          
	11: "资源请求次数",          
	12: "热点依据"        
};

// -> Column name in English
var EN = {
	0: "pp0101",          
	1: "ws0001",          
	2: "ws0002",          
	3: "op0001",          
	4: "op0201",          
	5: "op0101",          
	6: "op0301",          
	7: "op0004",          
	8: "rrX103",          
	9: "rrX104",          
	10: "rrX105",          
	11: "rrX106",          
	12: "pp0902",          
	13: "pp0101_old",     
	14: "op0001_old",     
	15: "op0201_old",     
	16: "op0101_old",     
	17: "pp0902_old"   
};

// -> Cell width
var WD = {
	0: "8",          
	1: "10",          
	2: "255",          
	3: "4",          
	4: "10",          
	5: "4",          
	6: "4",          
	7: "1",          
	8: "32",          
	9: "32",          
	10: "32",          
	11: "10",          
	12: "5"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "int",          
	2: "string",          
	3: "1",          
	4: "1",          
	5: "1",          
	6: "1",          
	7: "1",          
	8: "int",          
	9: "int",          
	10: "int",          
	11: "int",          
	12: "5"        
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
    {name: EN[13], type: TY[0]},     
    {name: EN[14], type: TY[3]},     
    {name: EN[15], type: TY[4]},     
    {name: EN[16], type: TY[5]},     
    {name: EN[17], type: TY[12]}   
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

var webTypeCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_WS_W_0003_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	   
var orgCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	   
var operatorCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var osCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var contentCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0003_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
function typeValueChange(value){
	if(value=="0"){
		return "网外";
	}else if(value=="1"){
		return "网内";
	}else{
		return "网内网外";
	}
}
function hotFoundationChange(value){
	if(value=="1"){
		return "流量";
	}else{
		return "请求次数";
	}
}

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: true, hideable: false,renderer: Ext.ux.renderer.Combo(webTypeCodeField),editor: webTypeCodeField}, 
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(operatorCodeField),editor: operatorCodeField}, 
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(orgCodeField),editor: orgCodeField},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(osCodeField),editor: osCodeField},  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(contentCodeField),editor: contentCodeField},
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,renderer:typeValueChange },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,renderer:hotFoundationChange }
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
});