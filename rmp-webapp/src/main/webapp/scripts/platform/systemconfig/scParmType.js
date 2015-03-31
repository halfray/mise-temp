/**
 * scParmType.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var scParmType = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scParmType',
	action : 'baseRecordAction.do?bean=scParmType&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "类型代码",          
	2: "类型名称",          
	3: "是否系统类型"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "typeCode",          
	2: "typeName",          
	3: "systemSign",          
	4: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "50",          
	2: "100",          
	3: "10"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "4",          
	1: "string",          
	2: "string",          
	3: "4"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
    {name: EN[4], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield', hidden: true},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
	 {name: EN[3],hiddenName: EN[3], fieldLabel:CN[3],url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST',displayField: 'codeLabel',valueField: 'codeValue', xtype: 'selectcombo'}
 	
];	

var systemSignField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=BOOLEAN_VALUE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(systemSignField), editor: systemSignField}
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#typeCode',
		width: 90
	},  
	{text: CN[2]},           
    {
		xtype:'textfield',
		id: '#typeName',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'}  
];

var gridColumns = [ new Ext.grid.RowNumberer(),  {
	header : '序号',
	width : 50,
	sortable : true,
	dataIndex : 'id',
	hidden : true,
	hideable : false
}, {
	header : '参数代码',
	width : 70,
	sortable : true,
	dataIndex : 'parm_code',
	hidden : false,
	hideable : false
}, {
	header : '参数名称',
	width : 130,
	sortable : true,
	dataIndex : 'parm_name',
	hidden : false,
	hideable : false
}, {
	header : '类型代码',
	width : 130,
	sortable : true,
	dataIndex : 'type_code',
	hidden : false,
	hideable : false
}, {
	header : '排序',
	width : 50,
	sortable : true,
	dataIndex : 'parm_sort',
	hidden : false,
	hideable : false
}, {
	header : '描述',
	width : 140,
	sortable : true,
	dataIndex : 'description',
	hidden : false,
	hideable : false
}];

//查询详细信息
function getDetailGrid(record,detailGrid){
	var data = getData(record);
	detailGrid.setParams(data);
	detailGrid.doSearchList();
}
function getData(record){
	var data = {};
	data.typeCode = record.data.typeCode;
	return data;
}
var formPanel;
function getFormPanel(){
	if(Ext.isEmpty(formPanel)){
		var id = new Ext.form.TextField({
			name : 'id',
			fieldLabel : 'ID',
			width : 130,
			hidden : true
		});
		var parm_code = new Ext.form.TextField({
			name : 'parm_code',
			width : 150,
			fieldLabel : '参数代码'
		});
		var parm_name = new Ext.form.TextField({
			name : 'parm_name',
			width : 150,
			fieldLabel : '参数名称'
		});
		var type_code = new Ext.form.TextField({
			name : 'type_code',
			width : 150,
			readOnly : true,
			fieldLabel : '类型代码'
		});
		var description = new Ext.form.TextField({
			name : 'description',
			width : 150,
			fieldLabel : '描述'
		});
		
		formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
			autoWidth: true,
			labelWidth: 70,
			frame:true,
			bodyStyle:'padding:10px; border: 0px solid;',
			autoScroll: true,
			//defaults: {width: grid.formItemWith},
			defaultType: 'textfield',
			labelAlign : 'right',
			bodyBorder: false,
			border: false,
			items: [id,parm_code,parm_name,type_code,description]
		});
		
	}
	return formPanel;
}
//显示提示窗口
function showTipWindow(tipinfo,iconCls,title,time){
	var window = new Ext.Window( {
		// contentEl : Ext.getBody(),
		width : 250,
		height : 150,
		shadow : false,
		html : tipinfo,
		title : "温馨提示:"
	});
	window.iconCls = iconCls; 
	window.title = title;
	function show() {
		this.el.alignTo(Ext.getBody(), 'br-br');
		this.el.fadeIn('b', {
			easing : 'easeOut',
			endOpacity: 1, 
			duration: 5,
			callback : function() {
				alert();
				this.close.defer(time, this); // 定时关闭窗口
		},
		scope : this,
		duration : 1
		});

	}
	function hide() {
		if (this.isClose === true) { // 防止点击关闭和定时关闭处理
			return false;
		}
		this.isClose = true;
		this.el.fadeOut('b', {
			easing : 'easeOut',
			callback : function() {
				this.un('beforeclose', hide, this);
				this.close();
			},
			scope : this,
			duration : 2
		});
		return false;
	}
	window.on('show', show, window);
	window.on('beforeclose', hide, window);
	window.show();
	var delay = new Ext.util.DelayedTask(function(){
		window.close();
	});
	delay.delay(2000);
}
Ext.onReady(function() {
	
    Ext.QuickTips.init();
    var add = new Ext.Button({
    	text : '添加',
    	iconCls: 'dataTableList-add-icon', 
    	handler : addParamInfo
    });
    var edit = new Ext.Button({
    	text : '修改',
    	iconCls: 'dataTableList-modify-icon', 
    	handler : editParamInfo
    });
    var del = new Ext.Button({
    	text : '删除',
    	iconCls: 'dataTableList-delete-icon', 
    	handler : delParamInfo
    });
    var up = new Ext.Button({
    	text : '上移',
    	iconCls: 'toolbar-up-icon', 
    	handler : upMethod
    });
    var down = new Ext.Button({
    	text : '下移',
    	iconCls: 'toolbar-down-icon', 
    	handler : downMethod
    });
    var saveSort = new Ext.Button({
    	text : '保存排序',
    	iconCls: 'save-icon', 
    	handler : saveSort
    });
    var toolBar = [add,'-',edit,'-',del,'-',up,'-',down,'-',saveSort];
    
    var detailGrid = new Ext.ux.Grid({
    	dataMethod:'scParamInfoAciton.getParamInfoList',
    	columns:gridColumns,
    	height:Ext.get("content").getHeight(),
    	width:Ext.get("content").getWidth()/2+30,
    	fetchSize:20,
    	sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    	colspan : 8,
    	columnLines : true,
    	frame : false,
    	//border : false,
    	//bodyBorder : false,
    	tbar : toolBar,
    	viewData:false,
    	listeners : {
    		dblclick : function(){
    			editParamInfo();
    		}
    	}
    	});
    
    var windows;
    function addParamInfo(){
    	var record = userGrid.getSelectionModel().getSelected();
    	if(!record){
    		Ext.Msg.alert('温馨提示','请先选中参数类型');
    		return;
    	}
    	var formPanel = getFormPanel();
    	formPanel.getForm().reset();
    	var typecode = record.data.typeCode
    	formPanel.getForm().findField('type_code').setValue(typecode);
    	if(Ext.isEmpty(windows))
    		{
	    	windows = new Ext.Window({
	    		xtype : "window",
	    		title : "添加记录",
	    		width : 300,
	    		height : 240,
	    		border: false,
	    		bodyBorder: false,
	    		autoScroll : true,
	    		closeAction : 'hide',
	    		items : [formPanel ],
	    		buttons : [{
	    			text : '保存',
	            	handler : function(){
	    				onBoSave(windows);
	    			}
	    		},{
	    			text : '取消',
	            	handler : function(){
	    				windows.hide();
	    			}
	    		}]
	    	});
    		}
    	windows.show();
    }
    
    function editParamInfo(){
    	var record = detailGrid.getSelectionModel().getSelected();
    	if(!record){
    		Ext.Msg.alert('温馨提示','请先选中一条数据');
    		return;
    	}
    	var formPanel = getFormPanel();
    	if(Ext.isEmpty(windows)){
    		windows = new Ext.Window({
    			xtype : "window",
    			title : "修改记录",
    			width : 300,
    			height : 200,
    			border: false,
    			bodyBorder: false,
    			autoScroll : true,
    			items : [formPanel ],
    			buttons : [{
    				text : '保存',
    				handler : function(){
    				onBoSave(windows);
    			}
    			},{
    				text : '取消',
    				handler : function(){
    				windows.hide();
    			}
    			}]
    		});
    	}
    	formPanel.getForm().reset();
		formPanel.getForm().setValues(record.json);
    	windows.show();
    }
    
    function onBoSave(windows){
    	var form = getFormPanel().getForm();
    	var data = {};
    	var id = form.findField('id').getValue();
    	var parmCode = form.findField('parm_code').getValue();
    	var parmName = form.findField('parm_name').getValue();
    	var typeCode = form.findField('type_code').getValue();
    	var description = form.findField('description').getValue();
    	data.id = id;
    	data.parmCode = parmCode;
    	data.parmName = parmName;
    	data.typeCode = typeCode;
    	data.description = description;
    	
    	M.rpc._call(saveCallBack,'scParamInfoAciton.editParamInfo', {
    		javaClass : 'java.util.HashMap',
    		map : data
    	});
    	
    	function saveCallBack(result){
			if(result){
				var record = userGrid.getSelectionModel().getSelected();
				var data = {};
				data.typeCode = record.data.typeCode;
				detailGrid.setParams(data);
				detailGrid.doSearchList();
				windows.hide();
				form.reset();
				showTipWindow('保存成功','comment','温馨提示');
			}
		}
    }
    
    function delParamInfo(){
    	var record = detailGrid.getSelectionModel().getSelected();
    	if(!record){
    		Ext.Msg.alert('温馨提示','请选中一条数据');
    		return;
    	}
    	Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
    		if(btn == 'yes'){
    	    	var data = {};
    	    	data.id = record.data.id;
    	    	M.rpc._call(delCallBack,'scParamInfoAciton.delParamInfo',{
    	    		javaClass : 'java.util.HashMap',map : data
    	    	});
    	    }
    		function delCallBack(result){
    			if(result){
    				var record = userGrid.getSelectionModel().getSelected();
    				var data = {};
    				data.typeCode = record.data.typeCode;
    				detailGrid.setParams(data);
    				detailGrid.doSearchList();
    				showTipWindow('删除成功','comment','温馨提示');
    			}
    		}
    	});
    }
    
    function upMethod(){
    	var record = detailGrid.getSelectionModel().getSelected();  
    	var index = detailGrid.getStore().indexOf(record);
    	//alert(index);
        //var index = dsN.indexOf(record);  
        if (index > 0) {  
        	detailGrid.getStore().removeAt(index);  
        	detailGrid.getStore().insert(index - 1, record);  
        	detailGrid.getView().refresh();  
        	detailGrid.getSelectionModel().selectRow(index - 1);  
        }  
    }
    function downMethod(){
    	var record = detailGrid.getSelectionModel().getSelected();  
    	var index = detailGrid.getStore().indexOf(record);
        if (index < detailGrid.getStore().getCount() - 1) {  
        	detailGrid.getStore().removeAt(index);  
        	detailGrid.getStore().insert(index + 1, record);  
        	detailGrid.getView().refresh();//刷新行号  
        	detailGrid.getSelectionModel().selectRow(index + 1);  
        }  
    }
    
    function saveSort(){
    	var gridObject = {};
    	gridObject.list = [];
    	var list = [];
    	var count = detailGrid.store.getCount();
    	for(var i = 0;i < count;i++){
    		var record = detailGrid.store.getAt(i);
    		var data = {map:{}};
    		data.map.id = record.get('id');
    		data.javaClass = 'java.util.HashMap';
    		list[i] = data;
    	}
    	gridObject.list = list;
    	gridObject.javaClass = "java.util.ArrayList";
    	M.rpc._call(saveSortCallBack,'scParamInfoAciton.saveSort',gridObject);
    	
    	function saveSortCallBack(result){
    		if(result){
    			var record = userGrid.getSelectionModel().getSelected();
				var data = {};
				data.typeCode = record.data.typeCode;
				detailGrid.setParams(data);
				detailGrid.doSearchList();
				showTipWindow('排序保存成功','comment','温馨提示');
    		}
    	}
    	
    }
    
    var userGrid = new Ext.ux.seraph.FormEditorGrid({
        //renderTo: 'user-grid',
        width: Ext.get("content").getWidth()/2-20,
        height: Ext.get("content").getHeight(),
        frame : false,
    	storeFields: storeFields,
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	border : true,
    	bodyBorder : true,
    	pk: PK,
    	url: URL,
    	listeners : {
    		click : function(userGrid){
    			var record = this.getSelectionModel().getSelected();
    			getDetailGrid(record,detailGrid);
    		}
    	},
    	onDelete : function(btn, ev) {
        	
        	var gridSelf = this;
        	
        	var record = this.getSelectionModel().getSelected();
        	if (!record) {
        		Ext.Msg.alert('提示', '请先选择一条记录！'); 
                return;
            }
        	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
        		if(val == 'yes'){
        			
    			 	Ext.Ajax.request({
    				   	url: gridSelf.url.action,
    	   				success: function(response) {
    		   				var baseResponse = response.responseText.evalJSON();
    		   				if (baseResponse.success) {
    		   					gridSelf.store.remove(record);
    		   				} else {
    		   					Ext.Msg.alert('提示', baseResponse.msg);
    		   				}
    		   				gridSelf.store.reload();
    		   				detailGrid.setParams({});
    		   				detailGrid.doSearchList();
    	   				},
    	   				failure: Ext.emptyFn,
           				params: {
           					action: ACTION.del,    	    	       
           					record: Ext.util.JSON.encode(record.data)
                  		}
    				});
        		}
        	});
        }
    });
    
    var panel = new Ext.Panel({
    	id : 'main-panel',
    	renderTo : 'user-grid',
    	autoHeight:true,
    	layout : 'table',
    	border : false,
    	bodyBorder : false,
    	items : [userGrid,detailGrid]
    });
});