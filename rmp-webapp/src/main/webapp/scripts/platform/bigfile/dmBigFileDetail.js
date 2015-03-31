/**
 * dmBigFileDetail.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
 //
var dmBigFileDetail = { 
	author: "xxx",
	version: "1.0"
};


// -> Action URL
var URL = {
	queryList : 'dmBigFileDetailListProvider.do',
	action : 'dmBigFileDetailAction.do'
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
	5: "协议",          
	6: "URL",          
	7: "URL大小",          
	8: "IP",          
	9: "NodeID",          
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
	5: "protocol",          
	6: "url",          
	7: "urlsize",          
	8: "ip",          
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
	6: "2,000",          
	7: "10",          
	8: "20",          
	9: "20",          
	10: "200",          
	11: "10",          
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
	7: "int",          
	8: "string",          
	9: "string",          
	10: "-3",          
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

var ipregex = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
var domainregex = /^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/;
var formFields = [ 
     new Ext.ux.seraph.DictCombo({
	    id: EN[0],
		fieldLabel:CN[0],
		name: EN[0],
		url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue',
		width: 90
	}),  
	
	new Ext.ux.seraph.DictCombo( {	
		id: EN[1],
		fieldLabel:CN[1],
		name: EN[1],	
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue',
		width: 90
    }),
    new Ext.ux.seraph.DictCombo( {
    	id: EN[2],
		fieldLabel:CN[2],
		name: EN[2],
	    url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',	
		displayField : 'codeLabel',
		valueField : 'codeValue',
	    width: 90
    }), 
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     //{id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  
     new Ext.ux.seraph.DictCombo( {
    	id:EN[5],
    	fieldLabel:CN[5],
		name: EN[5],
		url:'systemParmsProvider.do?type=tb_url_w_0001_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue',
	    width: 90
     }),
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: 'oldurlsize', name: 'oldurlsize', fieldLabel:CN[7]+"(MB)", xtype: 'textfield'},     
     {   id: EN[8], 
    	 name: EN[8],
    	 fieldLabel:CN[8],
    	 xtype: 'textfield',
    	 regex : ipregex,
    	 regexText : 'IP地址无效',
    	 allowBlank : true
     },     
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield',hidden:true} 	
];	
var operatorField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	id: '#operator',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	value : '0101',
	width: 90
});
var areaField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true',
	id: '#area',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	//value : '510000',
	value : orgCode,
	width: 90
});
var systemField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	id: '#system',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	value : '0000',
	width: 90
});
var protolType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=tb_url_w_0001_LIST',
	id:'#protocol',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	value : '1',
	width: 90
});

var userColumns =[ 
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7]+'(MB)', width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,renderer:Main.fun.getMFromByte,editor: {xtype: 'textfield'}},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(protolType) },  
    {header: CN[4], width: 130, sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'}  },  
    {header: CN[8], width: 120, sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(operatorField) },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(areaField)},  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(systemField) },  
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
		regex: domainregex,
		regexText:'域名格式无效',
		id: '#domain',
		width: 90
	},  
	{text: CN[5]},  
	protolType
   /*{
		xtype:'textfield',
		id: '#protocol',
		width: 90
	}*/,
	{text: CN[8]},           
    {
		xtype:'textfield',
		regex : ipregex,
		regexText : 'ip格式无效',
		id: '#ip',
		width: 90
	} 
];


var queryParms = [
    {name: EN[0], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[5], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[8], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    Ext.override(Ext.ux.self.FormEditorGrid,{
    	buildTbar : function(queryFields) {
			var gridSelf = this;
			return [
			queryFields, {
				text : '<span style="margin-left:20px;">查询</span>',
				cls:'search-button',
				minWidth:82,
				height:27,
		    	handler : function() {
		    		gridSelf.loadData();
		    	}
		    }, '-', {
		    	text : '<span style="margin-left:20px;">刷新</span>',
		    	cls: 'refresh-button', 
		    	minWidth:82,
		    	height:27,

		    	handler : function() {		    		
			    	var tbar = gridSelf.getTopToolbar();
					var queryFields = tbar.findByType('field');
					for(var i = 0; i < queryFields.length;i++)
					{
						queryFields[i].reset();					
					}
					gridSelf.loadData();
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
    	url: URL,
    	formLabelWidth:100,
    	formWinWidth:400,
        onUpdate : function(btn, ev) {
    		this.formPanel.getForm().reset();
    		var record = this.getSelectionModel().getSelected();
    		if(!record) {
    			Ext.Msg.alert('提示', '请先选择一条记录！'); 
    			return;
    		}
    		
    		this.editor.setTitle('查看信息');
    		this.editor.show();
    		this.editor.formPanel.actionType = ACTION.update;
    		this.formPanel.oldRecord = record;
    		
    		record.json.oldurlsize  = Main.fun.getMFromByte(record.json.urlsize);
    		this.formPanel.getForm().setValues(record.json);
        }	
    });
    
});