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
	queryList : 'rmWebsiteTotalListProvider.do',
	action : 'rmWebsiteTotalAction.do'
};

// -> Primary key
var PK = ["websiteId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
		1:"网站名称",
		2:"网站类型",
		3:"网站类型",
		4:"内容资源类型编码",
		5:"内容资源类型",
		6:"运营商编码",
		7:"地域编码",
		8:"运营商系统编码",
		9:"内容资源归属编码",
		10:"网内网外标志",
		11:"资源数量	",
		12:"资源大小(M)",
		13:"域名数量",
		14:"可缓存资源数量",
		15:"可缓存资源大小(M)",
		16:"可缓存资源数量占比",
		17:"可缓存资源大小占比"   
};

// -> Column name in English
var EN = {
		0:"WS_0001", 
		1:"WS_0002", 
		2:"WS_0004", 
		3:"WS_0005", 
		4:"CC_0003", 
		5:"CC_0004", 
		6:"OP_0001", 
		7:"OP_0201", 
		8:"OP_0101", 
		9:"OP_0301", 
		10:"OP_0004",
		11:"RR_X101",
		12:"RR_X102",
		13:"DD_X001",
		14:"RR_Z109",
		15:"RR_Z10A",
		16:"RR_Z10E",
		17:"RR_Z10F" 
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
	8: "2",          
	9: "255",
	10: "19",          
	11: "15",          
	12: "15",          
	13: "15",          
	14: 100,          
	15: 100,          
	16: 120,          
	17: 120       
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
	12: "string",          
	13: "string",          
	14: "string",          
	15: "string",          
	16: "string",          
	17: "string" 
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
	{name: EN[17], type: TY[17]}       
];

var ipsName=[];
var ipsValue=[];

var webtype = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});



var formFields = [];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width:158, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(webtype)},  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: true, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[14], width: WD[14], sortable: true, dataIndex: EN[14], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[16], width: WD[16], sortable: true, dataIndex: EN[16], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value){return (value*100).toFixed(2)+'%'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value){return (value/1024/1024).toFixed(2)}  },  
    {header: CN[15], width: 130, sortable: true, dataIndex: EN[15], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value){return (value/1024/1024).toFixed(2)}   },  
    {header: CN[17], width: WD[17], sortable: true, dataIndex: EN[17], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value){return (value*100).toFixed(2)+'%'} }
];

var typeList = new Ext.ux.seraph.DictCombo( {
	id :'#ws_0004',
	name : EN[2],
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue'
});
	
// TODO: default xtype, width
var queryFields = [
{
	text : '网站名称'
}, {
	xtype : 'textfield',
	id : '#ws_0002',
	width : 90
},
{
	text : '网站类型'
}, 
typeList
];


var queryParms = [
{
	name : 'ws_0002',
	indicator : 'EXAMPLE_LIKE'
},
{
	name : 'ws_0004',
	indicator : 'EXAMPLE_EQUALS'
}
];


function getTreeGrid(websiteId,websiteName)
{
	//定义树的加载器 
    var treeloader = new Ext.ux.tree.TreeGridLoader({ 
        dataUrl : "websiteDomainTreeProvider.do?websiteid="+websiteId+"&&domainid=0"
    }); 
    
  //定义treegrid 
    var treeGrid = new Ext.ux.tree.TreeGrid({ 
        width:740,
        height: 400,
        animate : true, 
        enableDD : true, 
        rootVisible : false, 
        containerScroll : true, 
//        autoScroll : 'auto',
        enableSort:false,           //默认为true，控件根据列的内容排序；置为false，则按照数据顺序显示
        columns : [{ 
            header : '域名名称', 
            dataIndex : 'DD_0002', 
            width : 400
        },{ 
            header : '流量', 
            dataIndex : 'LY', 
            width : 100
        } ,{ 
            header : '访问次数', 
            dataIndex : 'FWCS', 
            width : 100
        },{ 
            header : '流量的本地化率', 
            dataIndex : 'BDHL', 
            renderer:function(value){return value.toFixed(2) + '%'; },
            width : 100
        } ], 
        loader : treeloader 
        //绑定加载器 
    }); 
    
    // 异步加载根节点 
    var rootnode = new Ext.tree.AsyncTreeNode({ 
        text : websiteName, 
        draggable : false,// 根节点不容许拖动 
        expanded : true
    }); 
  //设置节点属性 
    rootnode.attributes = { 
    	DD_0001 : null,
    	DD_0002 : websiteName
    }; 
    
    // 为tree设置根节点 
    treeGrid.setRootNode(rootnode); 
    
 // 响应加载前事件，传递node参数 
    treeGrid.on(
        'beforeload',
        function(node) { 
            var sysid = node.attributes["DD_0001"];
            if(Ext.isEmpty(sysid))
            	treeGrid.loader.dataUrl = "websiteDomainTreeProvider.do?websiteid="+websiteId; // 定义子节点的Loader
            else
            	treeGrid.loader.dataUrl = "websiteDomainTreeProvider.do?websiteid="+websiteId+"&&domainid="+sysid; // 定义子节点的Loader
            	
        },
        treeloader
    );
    
    var win = new Ext.Window({
//    	frame:true,
		title:'域名信息',
    	border:false,
    	width:750,
    	height:430,
    	items:treeGrid
    });
    win.show();
    treeGrid.expand(false,false);
   
}

Ext.onReady(function() {
	
    Ext.QuickTips.init();
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
    
    var userGrid = new selfGrid({
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
    	url: URL
    });
    userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
    userGrid.on('rowdblclick', function(){
    	var record = this.getSelectionModel().getSelected();
    	getTreeGrid(record.data.WS_0001,record.data.WS_0002);
    });
    
    userGrid.getStore().load({
    	callback :function()
    	{
    	 	//其他页面调用该页面时，赋值
    	    if(!Ext.isEmpty(type) && type!='null')
    	    {
    	    	typeList.setValue(type);
    	    	userGrid.loadData();
    	    }
    	}

    });
});