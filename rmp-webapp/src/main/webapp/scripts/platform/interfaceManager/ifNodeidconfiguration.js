/**
 * ifNodeidconfiguration.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var ifNodeidconfiguration = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'ifNodeidconfigurationListProvider.do',
	action : 'ifNodeidconfigurationAction.do'
};

// -> Primary key
var PK = ["nodeidconfigurationId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "NODEID",          
	2: "厂商",          
	3: "系统",          
	4: "IP",          
	5: "是否有效",          
	6: "创建时间"        
};

// -> Column name in English
var EN = {
	0: "nodeidconfigurationId",          
	1: "nodeid",          
	2: "manufacturer",          
	3: "system",          
	4: "ip",          
	5: "isvalid",          
	6: "createtime",          
	7: "nodeidconfigurationId_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "200",          
	2: "50",          
	3: "20",          
	4: "50",          
	5: "1",          
	6: "19"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string"        
};

var system = new Ext.ux.seraph.DictCombo( {
	id : '#system',
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

var systemSignField = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
	{name: EN[5], type: TY[5]},          
	{name: EN[6], type: TY[6]},          
    {name: EN[7], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield',hidden:true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield',allowBlank : false,},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield',allowBlank : false,},  	
     new Ext.ux.seraph.DictCombo( {
    		id : EN[3],
    		name : EN[3],
    		fieldLabel : CN[3],
    		allowBlank : false,
    		url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
    		displayField : 'codeLabel',
    		valueField : 'codeValue'
    	}),
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield',allowBlank : false,},  	
     //{id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     new Ext.ux.seraph.DictCombo( {
    	 	id: EN[5],
    	 	name: EN[5],
    	 	fieldLabel:CN[5],
    	 	allowBlank : false,
    		url : 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',
    		displayField : 'codeLabel',
    		valueField : 'codeValue'
    	}),
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield',hidden:true} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 120, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: 120, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(system) },  
    {header: CN[4], width: 100, sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: 80, sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(systemSignField) },  
    {header: CN[6], width: 130, sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [{
	text : '所属系统'
}, system
];

// 
var queryParms = [{
	name : 'system',
	indicator : 'EXAMPLE_EQUALS'
}
];

function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGridSlef = Ext.extend(Ext.ux.self.FormEditorGrid,{
	   	buildTbar : function(queryFields) {
	    	var gridSelf = this;
		   	return [{
		           text: '添加',
		           iconCls: 'dataTableList-add-icon',
		           scope: this,
		           handler : gridSelf.onCreate
			    }, '-', {
			        text: '修改',
			        iconCls: 'dataTableList-modify-icon',
		           scope: this,
			        handler: gridSelf.onUpdate
			    }, '-', {
		           text: '删除',
		           iconCls: 'dataTableList-delete-icon',
		           scope: this,
		           handler : gridSelf.onDelete
			    },'-', queryFields, {
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
			       	    gridSelf.clearData();
			       }
		       }]
		   }
	   });
	 
	Ext.ux.self.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor, {
		doSave : function() {
			var windowSelf = this;
			this.formPanel.getForm().findField('createtime').setValue(new Date().format('Y-m-d H:m:s'));
			if (this.formPanel.getForm().isValid()) {
				if (Ext.isEmpty(trim(this.formPanel.getForm().findField('nodeid').getValue()))) {
					Ext.Msg.alert('Error', 'nodeID不能为空格');
					return false;
				}
				if (Ext.isEmpty(trim(this.formPanel.getForm().findField('manufacturer').getValue()))) {
					Ext.Msg.alert('Error', '厂商不能为空格');
					return false;
				}
				
				var record = this.formPanel.form.getFieldValues(); // 修改行,获取valueField数据
				var old_record = this.formPanel.oldRecord;
				if (old_record) {
					this.setOldValues(record, old_record);
				}
	
				this.formPanel.form.submit( {
					url : windowSelf.gridPanel.url.action,
					method : 'post',
					success : function(form, action) {
						windowSelf.hide();
						windowSelf.gridPanel.store.reload();
					},
					failure : function(form, action) {
						windowSelf.hide();
						Ext.Msg.alert('Error', action.result.msg);
					},
					params : {
						action : this.formPanel.actionType,
						record : Ext.util.JSON.encode(record)
					},
					clientValidation : true,
					waitMsg : Message.waitMsg
				});
			}
		}
	});
    
    var userGrid = new userGridSlef({
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