/**
 * tbRM0001.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbRM0001 = { 
	author: "xxx",
	version: "1.0"
};

Ext.override(Ext.form.TextField, {
	unitText : '',
	onRender : function(ct, position) {
		Ext.form.TextField.superclass.onRender.call(this, ct,position);
		// 如果单位字符串已定义 则在后方增加单位对象
		if (this.unitText != '') {
			this.unitEl = ct.createChild({
						tag : 'div',
						html : this.unitText
					});
			this.unitEl.addClass('x-form-unit');
			// 同时修改错误提示图标的位置
			this.alignErrorIcon = function() {
				this.errorIcon
						.alignTo(this.unitEl, 'tl-tr', [2, 0]);
			};
		}
	}
});

// -> Action URL
var URL = {
	queryList : 'tbRM0001ListProvider.do',
	action : 'tbRM0001Action.do'
};

// -> Primary key
var PK = ["PP_0101","URl_0002"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "统计周期",          
	1: "URL地址",            
	2: "协议类型",          
	3: "内容编号",        
	4: "内容",      
	5: "内容资源类型编码",          
	6: "内容资源类型",          
	7: "网站编号",         
	8: "所属网站",         
	9: "域名编号",         
	10: "所属域名",        
	11: "NodeID",         
	12: "资源大小"   
};

// -> Column name in English
var EN = {
	0: "PP_0101",          
	1: "url0002",          
	2: "url0004",          
	3: "CC_0001",          
	4: "cc0002",          
	5: "CC_0003",          
	6: "cc0004",          
	7: "WS_0001",          
	8: "ws0002",          
	9: "DD_0001",          
	10: "dd0002",          
	11: "op0401",          
	12: "rrX102" ,
	13: "op0001",   
	14:	"op0201",  
	15:	"op0101"   
};

// -> Cell width
var WD = {
	0: "255",          
	1: "400",          
	2: "10",          
	3: "255",          
	4: "4",          
	5: "20",          
	6: "10",          
	7: "255",          
	8: "4",          
	9: "20",          
	10: "15",          
	11: "4",          
	12: "10"         
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
	{name: EN[12], type: TY[12]}          
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
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield',unitText:"(B)"}	
];	

//重写下拉框,注意type是local-resource.xml中的id
var state1 = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	id:'#'+EN[13],
	displayField : 'codeLabel',
	width: 90,
	showAllSelect:true,
	valueField : 'codeValue'
});

var state2 = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
	displayField : 'codeLabel',
	id:'#'+EN[14],
	width: 90,
	showAllSelect:true,
	valueField : 'codeValue'
});

var state3 = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0003_LIST', 
	id:'#'+EN[15],
	displayField : 'codeLabel',
	width: 90,
	showAllSelect:true,
	valueField : 'codeValue'
});

var userColumns =[ 
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: 'IP', width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){return record.data.url0002.substring(0,record.data.url0002.indexOf('/'))} },
    {header: CN[12]+'(M)', width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,renderer:Main.fun.getMFromByte}, 
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:function(){return 'HTTP';}}, 
    {header: '来源', width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,renderer:function(){return 'Cache'}},
    {header: CN[1], width: 400, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: true, hideable: false,editor: {xtype: 'textfield'} }, 
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: true, hideable: false,editor: {xtype: 'textfield'}	},
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'}	},
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'}	}
//
//    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
//    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
//    {header: CN[15], width: WD[15], sortable: true, dataIndex: EN[15], hidden: true, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(state2) },  
//    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
//    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
        {text: CN[1]+':'},           
            	{
            		xtype:'textfield',
            		id: '#'+EN[1],
            	   	width: 90
            	 }
          ,  
        {text: '资源大于'},           
            	 {
            	   	xtype:'textfield',
            	   	id: '#'+EN[12],
            	   	value:'10',
            	   	width: 90
         }
        ,
        {text:'MB'}/*,'-',
        {text: '所属运营商'+':'},           
        	state2
        ,
        {text: '所属区域'+':'},           
        	state1
        ,
        {text:'归属'+':'},
        	state3*/
        
];

// 
var queryParms = [
	{name: EN[1], indicator: 'EXAMPLE_LIKE'}, 
	{name: EN[12], indicator: 'EXAMPLE_GREATER_THAN'}/*,
	{name: EN[13], indicator: 'EXAMPLE_EQUALS'}, 
	{name: EN[14], indicator: 'EXAMPLE_EQUALS'}, 
	{name: EN[15], indicator: 'EXAMPLE_EQUALS'}*/
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
//    	this.on('load', this.loadData(), this);
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
	        	Ext.getCmp('#'+EN[12]).setValue('100');
        		gridSelf.loadData();
        	}}]
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
    	url: URL,
    	formLabelWidth:100,
    	formWinWidth:400,
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
    userGrid.loadData();
});