/**
 * rmDomainManager.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var rmDomainManager = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'rmDomainManagerListProvider.do',
	action : 'rmDomainManagerAction.do'
};

//
var lvlurl = 'systemParmsProvider.do?type=TB_WS_W_0004_LIST';
// -> Primary key
var PK = ["domainId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "域名ID",          
	1: "域名地址",          
	2: "域名名称",          
	3: "域名级别",          
	4: "域名状态",          
	5: "父域名id",          
	6: "父域名",          
	7: "泛域名ID",          
	8: "泛域名",          
	9: "创建时间",          
	10: "修改时间",          
	11: "操作人",          
	12: "数据来源",          
	13: "备注"        
};

// -> Column name in English
var EN = {
	0: "domainId",          
	1: "domainUrl",          
	2: "domainName",          
	3: "domainLevel",          
	4: "domainState",          
	5: "fatherDomainId",          
	6: "fatherDomainUrl",          
	7: "mainDomainId",          
	8: "mainDomainurl",          
	9: "createTime",          
	10: "updateTime",          
	11: "operatorUser",          
	12: "dataSource",          
	13: "domainDesc",          
	14: "domainId_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: 200,          
	2: 200,          
	3: "2",          
	4: "1",          
	5: "19",          
	6: 200,          
	7: "19",          
	8: 200,          
	9: "10",          
	10: "10",          
	11: "255",          
	12: "2",          
	13: "255"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "string",          
	3: "1",          
	4: "1",          
	5: "-5",          
	6: "string",          
	7: "-5",          
	8: "string",          
	9: "date",          
	10: "date",          
	11: "string",          
	12: "1",          
	13: "string"        
};

var lvlfield =  new Ext.ux.seraph.DictCombo( {
	 id:EN[3],
	 name: EN[3],
	 allowBlank:false,
	 
	 fieldLabel:CN[3],
		url : lvlurl,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
/*var par =  new Ext.ux.seraph.DictCombo( {
	id: "fatherDomainId", name: "fatherDomainId", fieldLabel:"父域名",allowBlank:false,
	url : "rmDomainManagerActions.do?method=getDomain",
	displayField : 'domainName',
	valueField : 'domainId',
	listeners:
		{
		select:function()
			{
				var url = new Ajax('rmDomainManagerActions.do?').call("getUrlById",{domainId:this.getValue()});
				Ext.getCmp(EN[6]).setValue(url);
			}
		}
});
var fan =  new Ext.ux.seraph.DictCombo( {
	id: 'mainDomainId', name: 'mainDomainId', fieldLabel:'泛域名',allowBlank:false,
	url : "rmDomainManagerActions.do?method=getDomain",
	displayField : 'domainName',
	valueField : 'domainId',
	listeners:
	{
		select:function()
		{
			var url = new Ajax('rmDomainManagerActions.do?').call("getUrlById",{domainId:this.getValue()});
			Ext.getCmp(EN[8]).setValue(url);
		}
	}
});*/



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
    {name: EN[14], type: TY[0]} ,
    {name: 'webSiteName', type: 'string'},
    {name: 'ips', type: 'string'}
];

var lvlfield =  new Ext.ux.seraph.DictCombo( {
	 id:EN[3],
	 name: EN[3],allowBlank:false,
	 
	 fieldLabel:CN[3],
		url : lvlurl,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header:'父域名', width: WD[5], sortable: true, dataIndex: EN[5], hidden: true, hideable: false,editor: {xtype: 'textfield'}  },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '泛域名', width: WD[7], sortable: true, dataIndex: EN[7], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '所属网站', width: WD[7], sortable: true, dataIndex: 'webSiteName', hidden: false, hideable: false},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: true, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(lvlfield) },
    {header: 'IP', width: WD[3], sortable: true, dataIndex: 'ips', hidden: true, hideable: false}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#domainUrl',
		width: 90
	},  
	{text: CN[3]},           
	new Ext.ux.seraph.DictCombo( {
		id:'#domainLevel',
		url : 'systemParmsProvider.do?type=TB_WS_W_0004_LIST',
		showAllSelect:true,
		width: 80,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	})
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
];



Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGridSlef = Ext.extend(Ext.ux.self.FormEditorGrid,{
    	 buildTbar : function(queryFields) {
    	var gridSelf = this;
    	return [{
    		text:'下载模板',
    		iconCls:'toolbar-down-icon',
    		handler:function()
    		{
    			window.open(path+'/scripts/platform/resource_manager/domainManagerTemplate.xls');
    		}
    	},{
    		text:'上传文件',
    		iconCls:'toolbar-up-icon',
    		handler:upload
    	},
    	        {
            text: '删除',
            iconCls: 'dataTableList-delete-icon',
            scope: this,
            handler : gridSelf.onDelete
	    }, '-', queryFields, {
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
        }/*,{
        	text: '计算', 
        	iconCls: 'role-user-reset', 
        	handler : function() {
        		new Ajax('rmDomainManagerActions.do').call('UpdateIpInt',{a:'a'});
        	}
        }*/]
    }
    });
    var formFields = [];
    var userGrid = new userGridSlef({
//        renderTo: 'user-grid',
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
    userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
    userGrid.on('rowdblclick',function(){
    	var record = this.getSelectionModel().getSelected();
    	showIpRelation(record.data.domainUrl);
    });
 userGrid.on('render', function(grid) {   
       var store = grid.getStore();  
       var view = grid.getView();       
       grid.tip = new Ext.ToolTip({   
           target: view.mainBody,      
           delegate: '.x-grid3-row', 
           trackMouse: true,     
           renderTo: document.body,   	     
           listeners: {   
               beforeshow: function updateTipBody(tip) {   
                   var rowIndex = view.findRowIndex(tip.triggerElement);   
                   var record = store.getAt(rowIndex);
                   tip.body.dom.innerHTML = "加载中...";
                    var ips = M.rpc._call('rmDomainManagerAction.getIpsByDomainId',record.data.domainUrl);
                   tip.body.dom.innerHTML = "关联IP：<br>"+ips.split(",").join("<br>");
               }   
           }   
       });   
   });
    userGrid.render('user-grid');
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
    						url:path+"/commonuploadAction.do",
    						params: {
    							action: 'CommonUploadActionController.uploadFile'
    						    },
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

    function showIpRelation(value)
    {
    	var ips = M.rpc._call('rmDomainManagerAction.getIpsByDomainId',value);
    	if(Ext.isEmpty(ips) || !Ext.isString(ips)) {ips=""} ;
    	var ipsarea = new Ext.form.TextArea({fieldLabel:'关联IP',value:ips.split(",").join("\r\n"),height :120,width:200});
    	var formp = new Ext.form.FormPanel({
    		baseCls: 'x-plain',
			autoHeight :true,
	        autoWidth: true,
	        frame:true,
    		items:[ipsarea]
    	});
    	var win = new Ext.Window({
    		title:'IP关联信息',
    		frame:true,
    		width:323,
    		autoHeight:true,
    		items:[formp],
    		buttons:[{
    			text:'确定',handler:closeWin
    		}]
    	})
    	win.show();
    	function closeWin()
    	{
    		win.close();
    	}
    }
});