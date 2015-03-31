/**
 * rmWebsiteManager.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var rmWebsiteManager = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'rmImportantResourceTotalListProvider.do',
	action : 'rmImportantResourceTotalAction.do'
};

// -> Primary key
var PK = ["websiteId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
		0:"资源",
		1:"资源名称",
		2:"资源类型",
		3:"域名",
		4:"所属网站",
		5:"所属区域",
		6:"所属运营商",
		7:"所属系统",
		8:"备注"
};

// -> Column name in English
var EN = {
		0:"ipid", 
		1:"name", 
		2:"type", 
		3:"domainname", 
		4:"websitename", 
		5:"area", 
		6:"yys", 
		7:"system", 
		8:"remark"
};

// -> Cell width
var WD = {
	0: "19",          
	1: "15",          
	2: "15",          
	3: "15",          
	4: "1",          
	5: "10",          
	6: "10",          
	7: "255",
	8: 200
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
	8: "string"
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
	{name: EN[8], type: TY[8]}
];

var ipsName=[];
var ipsValue=[];

var orgCodeField = new Ext.ux.seraph.DictCombo( {
	id:'#area',
	width:100,
	showAllSelect:true,
	url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var operatorCodeField = new Ext.ux.seraph.DictCombo( {
	id:'#yys',
	width:100,
	showAllSelect:true,
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var systemParamsField = new Ext.ux.seraph.DictCombo( {
	id:'#system',
	width:100,
	showAllSelect:true,
	url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
var resourceType = new Ext.ux.seraph.DictCombo( {
	id:'#type',
	width:100,
	showAllSelect:true,
	url : "systemParmsProvider.do?type=TB_IP_W_0003_LIST",
	displayField : 'codeLabel',
	valueField : 'codeValue'
});

var formFields = [
	  {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
	  {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
	 // {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  
	  new Ext.ux.seraph.DictCombo( {
		    id: EN[2],
		    name: EN[2],
		    fieldLabel:CN[2],
		    //readOnly: true,
		    editable: true,
		    hideTrigger :true,
			url : "systemParmsProvider.do?type=TB_IP_W_0003_LIST",
			displayField : 'codeLabel',
			valueField : 'codeValue'
		}),
	  {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
	  {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
	  {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
	  {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
	  {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
	  {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'}
  ];	


var userColumns =[ 
    {header: CN[0], width: 150, sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 150, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(resourceType)},  
//    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[4], width: 100, sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(operatorCodeField)},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(orgCodeField) },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(systemParamsField)},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [

{
	text : '资源'
}, 
{
	xtype : 'textfield',
	id : '#ipvalue',
	width : 90
},
{
	text : '资源类型'
},
resourceType
,
{
	text : '运营商'
},
operatorCodeField
,
{
	text : '区域'
},
orgCodeField
,
{
	text : '系统'
},systemParamsField
];


var queryParms = [
{
	name : 'ipvalue',
	indicator : 'EXAMPLE_LIKE'
},
{
	name : 'area',
	indicator : 'EXAMPLE_EQUALS'
},
{
	name : 'yys',
	indicator : 'EXAMPLE_EQUALS'
},
{
	name : 'system',
	indicator : 'EXAMPLE_EQUALS'
},
{
	name : 'type',
	indicator : 'EXAMPLE_EQUALS'
}
];


function upload(){
	var form = uploadForm();
	   var wWindow = new Ext.Window	({									//定义对象
	  	    width: 500,													//宽度
	  	    height:200,													//高度
	  	    layout: 'fit',												//布局方式		
	  	    plain:true,													//
	  	    modal : true,												//产出阴影,遮盖其他部分
	  	    bodyStyle:'padding:5px;',													
	  	    buttonAlign:'center',										//按钮摆放位置
	  	    items: form,											//将定义的form放在window上	
	  	    buttons: [{													//按钮
	  	      text: '提交',
	  	      handler: createObject//按钮触发的方法
	  	    },{
	  	      text: '取消',
	  	      handler: cancel
	  	    }]
	  	  });
	  	  
	  	  wWindow.show();
		  function cancel(){wWindow.close();}
		  function createObject(){
			 if(form.getForm().isValid()){
				form.getForm().submit({
					waitTitle:'信息',
                waitMsg:'正在提交，请稍候……',
					url:"uploadImportantResource.do",//uploadImportantResource.do
					success:function(form,action){
						if(action.result.msg == 'checkFaile'){//
							
							Ext.Msg.alert("内容", '上传文件校验没通过,点击确定导出校验结果',
									function() {
								           wWindow.close();
								           window.open('exportCheckResourceMsg.do');
									});
							
						}else{
							
							Ext.Msg.alert("内容", action.result.msg,
									function() {
										wWindow.close();
										userGrid.getStore().reload();
									});
							
						}
						
					},
					failure : function(form, action) {
						Ext.Msg.alert("内容", action.result.msg);
					}
				 });
			  }
		  }
	function uploadForm(){	
			var name = new Ext.form.TextField({
				allowBlank : false,
				inputType:'file',
				fieldLabel : '上传文件',
				blankText : "请选择上传的文件",
				invalidText : "上传文件不能为空",
				name : 'uploadFile',
				anchor : '90%'
			});
			var objectForm = new Ext.form.FormPanel({
				frame:true,
				baseCls: 'x-plain',
				fileUpload:true,			//设置为上传
				items : [name]
			});
			return objectForm;
	}
}

Ext.onReady(function() {
	
    Ext.QuickTips.init();
 /*
    var selfGrid =  Ext.extend(Ext.ux.self.FormEditorGrid,{
    	 buildTbar : function(queryFields) {
    	var gridSelf = this;
    	return [
    	   queryFields, {
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
    */
    Ext.override(Ext.ux.seraph.FormEditorGrid,{
        initComponent : function() {
        	
    		// build selection model
    		this.sm = this.buildSelectionModel();
    		// build columns model
    		var originCM = this.buildColumnModels();
    		var customerCM = this.columns;
    		this.columns = originCM.concat(customerCM);
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
    	id:'userGrid',
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
        	return [
        	   queryFields, {
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
            }
            ,'-',{
        		text:'上传',
        		iconCls:'toolbar-up-icon',
        		handler:upload
        	    }
            ]
        },
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
   // userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
    
});