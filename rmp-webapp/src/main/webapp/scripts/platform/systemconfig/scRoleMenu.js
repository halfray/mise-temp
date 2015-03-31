var scRole = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'baseRecordListProvider.do?bean=scRole',
	action : 'baseRecordAction.do?bean=scRole&pk=id|'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "角色名称",          
	2: "角色别名",          
	3: "角色描述"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "roleName",          
	2: "roleAlias",          
	3: "description",          
	4: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "30",          
	2: "30",          
	3: "50"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "string"        
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
    {name: EN[4], type: TY[0]}   
];

var defaultData = {        
   id:'',   					     
   roleName:'',   					     
   roleAlias:'',   					     
   description:'' 					     
};


var roleNameField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_ROLE_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var menuIdField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=SC_TREE_MENU_INFO_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  

/*var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(roleNameField), editor: roleNameField}//,  
    //{header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, renderer: Ext.ux.renderer.Combo(menuIdField), editor: menuIdField}
];*/
var userColumns = [ new Ext.grid.RowNumberer(), {
	header : CN[0],
	width : WD[0],
	sortable : true,
	dataIndex : EN[0],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[1],
	width : WD[1],
	sortable : true,
	dataIndex : EN[1],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : WD[2],
	sortable : true,
	dataIndex : EN[2],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[3],
	width : WD[3],
	sortable : true,
	dataIndex : EN[3],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
} ];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype: 'selectcombo',
		id: '#roleName',
       	name: EN[1],
       	hiddenName: EN[1],
		fieldLabel: CN[1],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_ROLE_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}
/*,  
	{text: CN[2]},           
    {
		xtype: 'selectcombo',
		id: '#menuId',
       	name: EN[2],
       	hiddenName: EN[2],
		fieldLabel: CN[2],
		width: 90,
        url: 'systemParmsProvider.do?type=SC_TREE_MENU_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
	}*/
 
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'}/*,   
    {name: EN[2], indicator: 'EXAMPLE_LIKE'} */  
];

//显示提示窗口
function showTipWindow(tipinfo,iconCls,title,time){
	var window = new Ext.Window( {
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
    
    var treeColumns = [ {
    	header : '菜单名称',
    	width : 350,
    	sortable : true,
    	dataIndex : 'text'
    }];

    var root = new Ext.tree.AsyncTreeNode({
    	id : '0',
    	text : '根节点',
    	draggable : false,
    	expanded : true
    });
    //创建动态加载树
    var treeLoader = new Ext.tree.TreeLoader({
    	dataUrl :M.rpc.path
    });
    treeLoader.on("beforeload", function(treeLoader, node) {
    	var record = userGrid.getSelectionModel().getSelected();
    	if(Ext.isEmpty(record)){
    		return false;
    	}
    	treeLoader.baseParams.method = "'scRoleMenuAction.getListForTree'";
    	treeLoader.baseParams.result = "'direct'";
    	var params = {};
    	params.javaClass = "java.util.HashMap";
    	params.map = {};
    	if(record != null){
    		params.map.type = record.data.roleName;
    	}
    	params.map.id = (typeof(node.attributes.id) =="undefined" ? "0": node.attributes.id);
    	treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
    	//treeLoader.baseParams.id = (typeof(node.attributes.menuId) =="undefined" ? "0": node.attributes.menuId);
    }, treeLoader);
    //treeLoader.on("load",function(obj,res,mes)
    		//{
    			/*for(var p in mes)
    				{alert(p + ":" + mes[p]);}*/
    		//})
    var tree = new Ext.tree.TreePanel({
    	width : Ext.get("content").getWidth()/2+20,
    	height : Ext.get("content").getHeight(),
    	//autoLoad :true,
    	rootVisible: false,
    	//baseCls : 'x-plain',
    	loader : treeLoader,
    	autoScroll : true,
    	enableSort : false,
    	//enableDD : true,
    	root : root,
    	columns : treeColumns,
    	colspan : 8,
    	listeners:{  
            "checkchange": function(node, state) {//选择父节点勾选所有子节点；勾除所有子节点取出父节点勾选  
                if (node.parentNode != null) {  
                    node.cascade(function(node){  
                        node.attributes.checked=state;    
                        node.ui.checkbox.checked=state;  
                        return true;  
                    });  
                    var pNode=node.parentNode;  
                    if(state==true){  
                        var cb = pNode.ui.checkbox;  
                        if(cb) {  
                            cb.checked = state;  
                            cb.defaultChecked = state;  
                        }  
                        pNode.attributes.checked=state;  
                    }else{  
                        var _miss=false;  
                        for(var i=0;i<pNode.childNodes.length;i++){  
                            if(pNode.childNodes[i].attributes.checked!=state) _miss=true;  
                        }  
                        if(!_miss){  
                            pNode.ui.toggleCheck(state);  
                            pNode.attributes.checked=state;  
                        }  
                    }  
                }    
            }  
        } ,
    	tbar: [{
            text: '保存',
            iconCls: 'save-icon',
            handler : function(){
    			Main.fun.showLoadProcessWait('正在处理, 请稍候 ...');
	    		var b = tree.getChecked();
	            var checkid = new Array;// 存放选中id的数组
	            for (var i = 0; i < b.length; i++) {
		            if(b[i].getUI().checkbox.indeterminate){
		            	continue;
		            }
		            checkid.push(b[i].id);// 添加id到数组
	            }
	            var record = userGrid.getSelectionModel().getSelected();
	            var data = {};
	            data.idList = checkid.toString();
	            data.roleName = record.data.roleName;
	            M.rpc._call(saveCallBack,'scRoleMenuAction.saveRoleMenu', {
	        		javaClass : 'java.util.HashMap',
	        		map : data
	        	});
	        	
	        	function saveCallBack(result){
	    			if(result){
	    				var data = {};
	    				data.type = record.data.roleName;
	    				getTreeData(data);
	    				Main.fun.closeLoadProcessWait();
	    				showTipWindow('保存成功','comment','温馨提示');
	    			}
	    		}
            }
        }
        ]
    });
    function getTreeData(data) {
    	treeLoader.load(root);
    };
    
    var userGrid = new Ext.ux.seraph.RowEditorGrid({
        //renderTo: 'user-grid',
        width: Ext.get("content").getWidth()/2-20,
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	defaultData: defaultData,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	url: URL,
    	pk: PK,
    	border : true,
    	bodyBorder : true,
    	listeners : {
    		click : function(userGrid){
    			var record = this.getSelectionModel().getSelected();
    			var data = {};
    			data.id = '0';
    			getTreeData(data);
    		}
    	}
    });
    
    var panel = new Ext.Panel({
    	id : 'main-panel',
    	renderTo : 'user-grid',
    	autoHeight:true,
    	layout : 'table',
    	border : false,
    	bodyBorder : false,
    	items : [userGrid,/*detailGrid*/tree]
    });
});