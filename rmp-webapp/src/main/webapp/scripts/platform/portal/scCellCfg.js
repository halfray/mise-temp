/**
 * scCellCfg.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var scCellCfg = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'scCellCfgListProvider.do',
	action : 'scCellCfgAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "父Cell序号",          
	2: "Portal代码",          
	3: "Cell标题",          
	4: "链接",          
	5: "行宽",          
	6: "列宽",          
	7: "单元格宽",          
	8: "单元格高",          
	9: "参数刷新",          
	10: "排序",          
	11: "描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "parentId",          
	2: "portalCode",          
	3: "cellTitle",          
	4: "href",          
	5: "rowNum",          
	6: "colNum",          
	7: "width",          
	8: "height",          
	9: "noticeMe",          
	10: "sort",          
	11: "description",          
	12: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "10",          
	2: "100",          
	3: "100",          
	4: "500",          
	5: "10",          
	6: "10",          
	7: "10",          
	8: "10",          
	9: "10",          
	10: "10",          
	11: "500"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "int",          
	6: "int",          
	7: "int",          
	8: "int",          
	9: "int",          
	10: "int",          
	11: "string"        
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
    {name: EN[12], type: TY[0]}   
];
var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield', hidden: true},  	
     {   id: EN[1],
    	 name: EN[1],
    	 fieldLabel:CN[1],  	 
    	 xtype: 'numberfield'    	    	
     },  	
     {   id: EN[2], 
    	 name: EN[2],
    	 fieldLabel:CN[2],
    	 xtype: 'selectcombo',
    	 hiddenName: EN[2],
    	 url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST',
    	 displayField: 'codeLabel',
    	 valueField: 'codeValue',
    	 allowBlank : false
      }, 	 	
     {  id: EN[3],
    	name: EN[3],
    	fieldLabel:CN[3],
    	xtype: 'textfield',	
		allowBlank : false
     },  	
     {  id: EN[4],
    	name: EN[4],
    	fieldLabel:CN[4],
    	xtype: 'textfield',   	
		allowBlank : false
      },  	
     { id: EN[5], 
       name: EN[5],
       fieldLabel:CN[5],
       xtype: 'numberfield'       	   
     },  	
     { id: EN[6],
       name: EN[6],
       fieldLabel:CN[6],
       xtype: 'numberfield'    	      	   
     },  	
     { id: EN[7], 
       name: EN[7], 
       fieldLabel:CN[7], 
       xtype: 'numberfield'       	  
     },  	
     { id: EN[8], 
       name: EN[8], 
       fieldLabel:CN[8], 
       xtype: 'numberfield'       	  	
     },  	
     { id: EN[9],
       name: EN[9],
       fieldLabel:CN[9], 
       xtype: 'selectcombo', 
       hiddenName: EN[9], 
       url: 'parmInfoProvider.do?parmType=NOTICE_ME', 
       displayField: 'parmName', 
       valueField: 'parmCode',     
	   allowBlank : false 
      },
     { id: EN[10], 
       name: EN[10], 
       fieldLabel:CN[10], 
       xtype: 'numberfield',
       allowBlank : false 
     }//,  	
//     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'} 	
];	

var portalCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST', displayField: 'codeLabel', valueField: 'codeValue'});
var noticeMeField = new Ext.ux.seraph.DictCombo({url: 'parmInfoProvider.do?parmType=NOTICE_ME', displayField: 'parmName', valueField: 'parmCode'});

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(portalCodeField), editor: portalCodeField},   
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(noticeMeField), editor: noticeMeField},  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} }//,  
    //{header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

//TODO: default xtype, width
var queryFields = [
{
	text: '添加描述',
	iconCls: 'dataTableList-modify-icon',
	handler: function(){
		var userGrid = Ext.getCmp('userGrid');
		var record = userGrid.getSelectionModel().getSelected();
		if(Ext.isDefined(record)){
			editDescription(record);
		}else{
			Main.fun.commonAlert();
		}
	}
},'-',
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#parentId',		     
		width: 90
	},' ',
	{text:  CN[2]},  
	{
		xtype: 'selectcombo',
		id: '#portalCode',
	    name: "portalCode",
	    hiddenName: "portalCode",
		fieldLabel: "portalCode",
		value:'',
		width: 240,
	    url: 'systemParmsProvider.do?type=SC_PORTAL_STY_LIST',
	    displayField: 'codeLabel',
	    valueField: 'codeValue'
	 },' ',
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#cellTitle',
		width: 90
	},' ',  
	{text: CN[4]},           
    {
		xtype:'textfield',
		id: '#href',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_EQUALS'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[4], indicator: 'EXAMPLE_LIKE'}  
];
var formPanel;
var windows;
function editDescription(record){
	if(!formPanel){
	formPanel = new Ext.form.FormPanel({
        frame:true,
		baseCls: 'x-plain',
		autoHeight: true,
        autoWidth: true,
        bodyStyle:'padding:2px; border: 0px solid;',
		autoScroll: true,
        defaultType: 'textfield',
		bodyBorder: false,
		border: false,
		layout: 'fit',
        items: [{
            xtype: 'htmleditor', 
			id: 'description_edit',
			name: 'description',
			value: record.get('description'),
			height: 300,
            anchor: '95%'
        }, {
			id: 'id_edit',
			name: 'id',
			hidden: true,
			value: record.get('id'),
			anchor: '95%'
        }]
    });
	}
	if(!windows){
	 windows = new Ext.Window({
        title: "添加描述信息",
        width: 600,
        height: 370,
        border: false,
        bodyBorder: false,
        autoScroll: true,
		modal: true,
		closeAction: 'hide',
        items: [formPanel],
		buttons: [{
            text: '保存',
            type: 'button',
            scope: this,
            handler: function(btn, e){
                if (formPanel.getForm().isValid()) {
                    onBoSave(windows);
                }else{
					Ext.ux.MessageBox.info("请按要求输入数据！");
				}
            }
        }, {
            text: '取消',
            type: 'reset',
            scope: this,
            handler: function(btn, e){
                windows.hide();
            }
        }]
    });
	
	}
	Ext.getCmp('description_edit').setValue(record.get('description'));
	Ext.getCmp('id_edit').setValue(record.get('id'));
    windows.show();
}
function onBoSave(windows){
	
	var data = {};
	data.description = Ext.getCmp('description_edit').getValue();
	data.id = Ext.getCmp('id_edit').getValue();
	
	M.rpc._call(saveCallBack,'scCellCfgActionController.editDescription', {
		javaClass : 'java.util.HashMap',
		map : data
	});
		
	function saveCallBack(result){
		if(result.success){
//			var tbar = grid.getTopToolbar();
//			var queryFields = tbar.findByType('field');
//			var data = {};
//			for(var i = 0; i < queryFields.length;i++)
//			{
//				data[queryFields[i].getName()] = queryFields[i].getValue();
//			}
//			grid.setParams(data);
			windows.hide();
			var userGrid = Ext.getCmp('userGrid');
			userGrid.loadData();
			Ext.Msg.alert('提示', result.msg)
		}
	}
}
Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.seraph.FormEditorGrid({
		id: 'userGrid',
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