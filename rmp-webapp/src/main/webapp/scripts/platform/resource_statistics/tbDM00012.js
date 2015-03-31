/**
 * tbDM00012.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDM00012 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDM00012ListProvider.do',
	action : 'tbDM00012Action.do'
};

// -> Primary key
var PK = ["dd0001","cc0003","op0001","op0201","op0101"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "域名编号",          
	1: "域名",          
	2: "内容资源类型编码",          
	3: "内容资源类型",          
	4: "网站编号",          
	5: "所属网站",          
	6: "运营商编码",          
	7: "地域编码",          
	8: "运营商系统编码",          
	9: "内容资源归属编码",          
	10: "网内网外标志",          
	11: "资源数量",          
	12: "资源大小",          
	13: "可缓存资源数量",          
	14: "可缓存资源大小",          
	15: "可缓存资源数量占比",          
	16: "可缓存资源大小占比"        
};

// -> Column name in English
var EN = {
	0: "dd0001",          
	1: "dd0002",          
	2: "cc0003",          
	3: "cc0004",          
	4: "ws0001",          
	5: "ws0002",          
	6: "op0001",          
	7: "op0201",          
	8: "op0101",          
	9: "op0301",          
	10: "op0004",          
	11: "rrX101",          
	12: "rrX102",          
	13: "rrZ109",          
	14: "rrZ10a",          
	15: "rrZ10e",          
	16: "rrZ10f",          
	17: "dd0001_old",     
	18: "cc0003_old",     
	19: "op0001_old",     
	20: "op0201_old",     
	21: "op0101_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "255",          
	2: "4",          
	3: "20",          
	4: "19",          
	5: "255",          
	6: "4",          
	7: "10",          
	8: "4",          
	9: "4",          
	10: "4",          
	11: "19",          
	12: "32",          
	13: "19",          
	14: "32",          
	15: "32",          
	16: "32"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "1",          
	3: "string",          
	4: "-5",          
	5: "string",          
	6: "1",          
	7: "1",          
	8: "1",          
	9: "1",          
	10: "1",          
	11: "-5",          
	12: "int",          
	13: "-5",          
	14: "int",          
	15: "float",          
	16: "float"        
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
	{name: EN[14], type: TY[14]},          
	{name: EN[15], type: TY[15]},          
	{name: EN[16], type: TY[16]},          
    {name: EN[17], type: TY[0]},     
    {name: EN[18], type: TY[2]},     
    {name: EN[19], type: TY[6]},     
    {name: EN[20], type: TY[7]},     
    {name: EN[21], type: TY[8]}   
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
     {id: EN[13], name: EN[13], fieldLabel:CN[13], xtype: 'textfield'},  	
     {id: EN[14], name: EN[14], fieldLabel:CN[14], xtype: 'textfield'},  	
     {id: EN[15], name: EN[15], fieldLabel:CN[15], xtype: 'textfield'},  	
     {id: EN[16], name: EN[16], fieldLabel:CN[16], xtype: 'textfield'} 	
];	
var addCodeField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var operatorCodeField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var systemParamsField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

var belongParamsField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

 
var userColumns =[ 
    {header: CN[1], width: 130, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },    
    {header: CN[3], width: 120, sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },    
    {header: CN[5], width: 150, sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: "所属运营商", width: WD[6], sortable: true, dataIndex: EN[6],renderer: Ext.ux.renderer.Combo(operatorCodeField), hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: "所属区域", width: WD[7], sortable: true, dataIndex: EN[7],renderer: Ext.ux.renderer.Combo(addCodeField),hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: "所属系统", width: WD[8], sortable: true, dataIndex: EN[8],renderer: Ext.ux.renderer.Combo(systemParamsField), hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: "内容资源归属", width: WD[9], sortable: true, dataIndex: EN[9],renderer:Ext.ux.renderer.Combo(belongParamsField), hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:function(value){if(value=='0')return '网外';else if(value=='1')return '网内';else return value}},   
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[15], width: 150, sortable: true, dataIndex: EN[15],renderer: function(value){return value*100+"%";}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12]+'(M)', width: 150, sortable: true, dataIndex: EN[12],hidden: false, hideable: false,renderer:Main.fun.getMFromByte,editor: {xtype: 'textfield'} },
    {header: CN[14]+'(M)', width: 120, sortable: true, dataIndex: EN[14], hidden: false, hideable: false,renderer:Main.fun.getMFromByte,editor: {xtype: 'textfield'} },  
    {header: CN[16], width: 150, sortable: true, dataIndex: EN[16],renderer: function(value){return value*100+"%";},hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];



//TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
 {
		xtype:'textfield',
		id: '#dd0002',
		width: 90
	},{ 
		text : "运营商"
	},

	new Ext.ux.seraph.DictCombo( {
		id : "#op0001",
		width : 90,
		url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
		showAllSelect:true,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	}), {
		text : "区域"
	}, new Ext.ux.seraph.DictCombo( {
		id : "#op0201",
		width : 90,
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		showAllSelect:true,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	}) 

	, {
		text : "系统"
	}, new Ext.ux.seraph.DictCombo( {
		id : "#op0101",
		width : 90,
		url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
		showAllSelect:true,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	}) 
	];
//
var queryParms = [
 {name: EN[1], indicator: 'EXAMPLE_LIKE'},
 {name: EN[6], indicator: 'EXAMPLE_EQUALS'},
 {name: EN[7], indicator: 'EXAMPLE_EQUALS'},
 {name: EN[8], indicator: 'EXAMPLE_EQUALS'}];

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
            this.on('rowdblclick', this.onUpdate, this);
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
    Ext.override(Ext.ux.seraph.FormEditor,{
        buildButtons : function() {
        	return [{
    		    text: '关闭',
    		    scope: this,
    		    handler: this.doCancel
    		}];
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
        formLabelWidth:120,
        formWinWidth:400,
    	url: URL,
        onUpdate : function(btn, ev) {
        	
    		var record = this.getSelectionModel().getSelected();
    		if(!record) {
    			Ext.Msg.alert('提示', '请先选择一条记录！'); 
    			return;
    		}
    		
    		this.editor.setTitle('查看信息');
    		this.editor.show();
    		this.editor.formPanel.actionType = ACTION.update;
    		this.formPanel.oldRecord = record;
    		this.formPanel.getForm().setValues(record.json);
        }
    });
    
});