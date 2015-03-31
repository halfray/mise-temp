
var URL = {
	queryList : 'rmImportantResourceManagerListProvider.do',
	action : 'rmImportantResourceManagerAction.do'
};

// -> Primary key
var PK = ["imResourceId"];

var typeurl = "systemParmsProvider.do?type=TB_IP_W_0003_LIST"
// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "资源",          
	2: "资源名称",          
	3: "资源类型",          
	4: "域名ID",          
	5: "网站ID",          
	6: "创建时间",          
	7: "修改时间",          
	8: "操作人",          
	9: "数据来源",          
	10: "备注",          
	11: "ipdomain",          
	12: "IPID"        
};

// -> Column name in English
var EN = {
	0: "imResourceId",          
	1: "imResourceIp",          
	2: "imResourceName",          
	3: "resourceType",          
	4: "domainId",          
	5: "websiteId",          
	6: "createTime",          
	7: "updateTime",          
	8: "operatorUser",          
	9: "dataSource",          
	10: "imResourceDesc",          
	11: "ipDomainFlg",          
	12: "ipId",          
	13: "imResourceId_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "5,000",          
	2: "250",          
	3: "2",          
	4: "19",          
	5: "19",          
	6: "10",          
	7: "10",          
	8: "255",          
	9: "2",          
	10: "255",          
	11: "1",          
	12: "19"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "1",          
	4: "-5",          
	5: "-5",          
	6: "date",          
	7: "date",          
	8: "string",          
	9: "1",          
	10: "string",          
	11: "1",          
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
    {name: EN[13], type: TY[0]}   
];

var ipregex = /^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/;
var domainregex = /^([\w-]+\.)+((com)|(net)|(org)|(gov\.cn)|(info)|(cc)|(com\.cn)|(net\.cn)|(org\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\.tw)|(hk)|(com\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\.uk)|(org\.uk)|(ltd\.uk)|(plc\.uk)|(in)|(eu)|(it)|(jp))$/

	var typeField = new Ext.ux.seraph.DictCombo( {
		url : typeurl,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield',hidden:true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], maxLength :WD[1],xtype: 'textfield',allowBlank:false,listeners:{
    	 change:function(){
    	 		var value = this.getValue();
    	 		var ipmatch = ipregex.test(value);
    	 		var domainmatch = domainregex.test(value);
    	 		if(!ipmatch && !domainmatch)
    	 			{
    	 				Ext.Msg.alert('提示','输入资源有误,必须为IP或域名！');
    	 				this.setValue();
    	 				this.focus(true);
    	 				return;
    	 			}
    	 		var ipdomainflag = ipmatch?0:domainmatch?1:-1;
    	 		Ext.getCmp(EN[11]).setValue(ipdomainflag);
    	 		var ipid = Ext.getCmp(EN[12]);
    	 		var domainid = Ext.getCmp(EN[4]);
    	 		var websiteid = Ext.getCmp(EN[5]);
    	 		if(ipmatch)
    	 			{
    	 				var res = new Ajax("rmImportantResourceManagerActions.do").call("getRelationByIp",{ipvalue:value});
    	 				ipid.setValue(res.ipId);
    	 				domainid.setValue(res.domainId);
    	 				websiteid.setValue(res.websiteId);
    	 			}else if(domainmatch)
    	 				{
	    	 				var res = new Ajax("rmImportantResourceManagerActions.do").call("getRelationByDomain",{domainvalue:value});
	    	 				ipid.setValue(res.ipId);
	    	 				domainid.setValue(res.domainId);
	    	 				websiteid.setValue(res.websiteId);
    	 				}
     	}
     }},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], maxLength :WD[2],xtype: 'textfield',allowBlank:false},  	
     //{id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield',allowBlank:false},
 		new Ext.ux.seraph.DictCombo( {
 			id: EN[3], name: EN[3], fieldLabel:CN[3],allowBlank:false,
		url : 'systemParmsProvider.do?type=TB_IP_W_0003_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	}),
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield',hidden:true},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield',hidden:true},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'datefield',format:'Y-m-d',value:new Date(),hidden:true},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'datefield',format:'Y-m-d',value:new Date(),hidden:true},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield',hidden:true},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield',hidden:true},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], maxLength :WD[10],xtype: 'textarea'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield',hidden:true},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield',hidden:true} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 200, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: 200, sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: 200, sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(typeField)},  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: 300, sortable: true, dataIndex: EN[10], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#imResourceIp',
		width: 90
	},  
	{text: CN[3]},           
//    {
//		xtype:'textfield',
//		id: '#resourceType',
//		width: 90
//	} 
	new Ext.ux.seraph.DictCombo( {
	id: '#resourceType', 
	showAllSelect:true,
	url : typeurl,
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width: 110,
	emptyText : '--全部--'
})
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_EQUALS'}  
];

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
	    },'-',{
    		text:'下载模板',
    		iconCls:'toolbar-down-icon',
    		handler:function()
    		{
    			window.open(path+'/scripts/platform/resource_manager/重要资源库明细(模板).xls');
    		}
    	},'-',{
    		text:'上传文件',
    		iconCls:'toolbar-up-icon',
    		handler:upload
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
    		doSave1 : function() {
        	var windowSelf = this;

        	var record = this.formPanel.form.getFieldValues();
        	var old_record = this.formPanel.oldRecord;

        	if(old_record) {
        		this.setOldValues(record, old_record);		
        	}

        	if (this.formPanel.getForm().isValid()){
    	    	this.formPanel.form.submit({
    	    		url: windowSelf.gridPanel.url.action,
    	    		method: 'post',
    	    		success: function(form, action) {
    	    			windowSelf.hide();
    	    			windowSelf.gridPanel.store.reload();
    	    		},
    	    		failure: function(form, action) {
    	    			windowSelf.hide();
    					Ext.Msg.alert('Error', action.result.msg);
    	    		},
    	    		params: {
    	   				action: this.formPanel.actionType,
    	   				record: Ext.util.JSON.encode(record)
    	  			},
    	    		clientValidation: true,
    	    		waitMsg: Message.waitMsg,
    	    		waitTitle: Message.waitTitle
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
    
    
    function upload()
    {
    	var form = uploadForm();
    	   var wWindow = new Ext.Window										//定义对象
    	   ({
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
    			function createObject()
    			{
    				if(form.getForm().isValid())
    				{
    					form.getForm().submit(
    					{
    						waitTitle:'信息',
                            waitMsg:'正在提交，请稍候……',
    						url:path+"/impResourceUploadAction.do",
    						success:function(form,action){Ext.Msg.alert("内容",action.result.msg,function(){wWindow.close();userGrid.getStore().reload();});},
    						failure:function(form,action){Ext.Msg.alert("内容",action.result.msg);}
    					}
    					);
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
    
});