/*var webtype = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_BIG_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});*/

var userColumns = [ {
	header : '网站类型',
	width : 150,
	sortable : true,
	dataIndex : 'name',
	tpl:changeColor('name')
}, {
	header : '总计',
	width : 150,
	sortable : true,
	dataIndex : 'type_Count'
}, {
	header : '网内数量',
	width : 150,
	sortable : true,
	dataIndex : 'type_In_Count'
}, {
	header : '网内网外数量',
	width : 150,
	sortable : true,
	dataIndex : 'type_In_Out_Count'
}, {
	header : '网外数量',
	width : 150,
	sortable : true,
	dataIndex : 'type_Out_Count'
}, {
	header : '类型',
	sortable : true,
	hidden : true,
	dataIndex : 'type'
}, {
	header : '分类值',
	sortable : true,
	hidden : true,
	dataIndex : 'value'
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
	treeLoader.baseParams.method = "'dmNetsiteLibrariesDetailAction.getListForTree'";
	treeLoader.baseParams.result = "'direct'";
	var params = {};
	params.javaClass = "java.util.HashMap";
	params.map = {};
	params.map.province = '000000';
	params.map.type = node.attributes.type;
	params.map.value = node.attributes.value;
	treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
}, treeLoader);

var tree = new Ext.ux.tree.TreeGrid({
	width : 770,
	//height : 400,
	autoLoad :false,
	rootVisible: false,
	frame:true,
	baseCls : 'x-plain',
	loader : treeLoader,
	border : false,
	enableSort : false,
	root : root,
	columns : userColumns,
	listeners:{
		click:function(node)
		{
			findchildnode(root);
			node.getUI().addClass("addSelected");
			if(node.attributes.leaf === true){
				getDetail(node,"true");
			}else{
				getDetail(node,"false");
			}
		}
	},
	colspan : 8
});
function getTreeData(data) {
	treeLoader.load(root);
};

//获取所有的子节点 
function findchildnode(node){
	 var childnodes = node.childNodes;
	 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
		 var nd = this;
		 nd.getUI().removeClass("addSelected");
		 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
			 nd.getUI().removeClass("addSelected");
			 findchildnode(nd); //如果存在子节点 递归
		 }
	 });
}

//修改树形节点字体颜色2013-11-18
function changeColor(value)
{
	return new Ext.XTemplate('{'+value+':this.changeColor}', {
                changeColor: function(v) {
                	return '<span style="color:#434343;">' + v + '</span>';
                }
            });
}	

function getDetail(node,leafFlag){
	var record = node.attributes;
	
	var gridColumns = [new Ext.grid.RowNumberer(),
	{
		header : "网站类型",
		sortable : true,
		hidden:true,
		dataIndex : "webSite_Type",
		width : 100
	},
	   {
		header : "网站",
		sortable : true,
		dataIndex : "webSiteName",
		width : 140
	}, {
		header : "域名数量",
		sortable : true,
		dataIndex : "domainCount",
		width : 95
	}, {
		header : "引入域名数量",
		sortable : true,
		dataIndex : "domain_in_Count",
		width : 100
	}, {
		header : "引入域名占比",
		sortable : true,
		dataIndex : "domain_Proportion",
		renderer:function(value){
			return (value*100).toFixed(2)+'%';
		}, 
		width : 100
	},
	/*, {
		header : "网内网外域名数量",
		sortable : true,
		dataIndex : "domian_in_out_count",
		width : 120
	} , {
		header : "网内网外域名占比",
		sortable : true,
		dataIndex : "domian_in_out_Proportion",
		renderer:function(value){
			return (value*100).toFixed(2)+'%';
		}, 
		width : 120
	}, {
		header : "网外域名数量",
		sortable : true,
		dataIndex : "domain_out_count",
		width : 100
	}, {
		header : "网外域名占比",
		sortable : true,
		dataIndex : "domian_out_Proportion",
		renderer:function(value){
			return (value*100).toFixed(2)+'%';
		}, 
		width : 100
	}, {
		header : "请求次数",
		sortable : true,
		dataIndex : "visit_Count",
		width : 100
	}, {
		header : "总流量(MB)",
		sortable : true,
		dataIndex : "all_Flow",
		renderer:Main.fun.getMFromByte,
		width : 100
	}, {
		header : "上行流量(MB)",
		sortable : true,
		dataIndex : "upload_Flow",
		renderer:Main.fun.getMFromByte,
		width : 100
	}, {
		header : "下行流量(MB)",
		sortable : true,
		dataIndex : "download_Flow",
		renderer:Main.fun.getMFromByte,
		width : 100
	}*/ ];
	
	var detailGrid = new Ext.ux.Grid({
		//tbar:queryFields,
		dataMethod:'dmNetsiteLibrariesDetailAction.searchHotWebSite',
		columns:gridColumns,
		height :405,
        autoWidth: true,
		fetchSize:15,
		frame : false,
		border: false,
		bodyBorder: false,
		sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
		colspan : 8,
		columnLines : true,
		viewData: false
		});
	
	var windows = new Ext.Window({
		xtype : "window",
		title : record.name+"--网站详细",
		//width : 910,
		height : 456,
		//frame : true,
		//bodyBorder: false,
		border: false,
		bodyBorder: false,
		autoScroll : true,
		items : [detailGrid]
	});
	windows.show();
	
	var data = getData(record,leafFlag);
	updateGrid(data,detailGrid);

}

function updateGrid(data,detailGrid){
	detailGrid.setParams(data);
	detailGrid.doSearchList();
}

function getData(record,leafFlag) {
	var data = {};
	data.websiteType = record.webSite_Type;
	data.leafFlag = leafFlag;
	data.province = '000000';
	return data;
};

var panel = new Ext.Panel({
	id : 'main-panel',
	frame : false,
	border : false,
	bodyBorder : false,
	layout : 'table',
	layoutConfig : {
		columns : 8
	},
	defaults : {
		frame : false
	},
	items : [tree]
});
Ext.onReady(function() {
	panel.render('user-grid');
	panel.setHeight(Ext.get('content').getHeight());
	tree.setHeight(Ext.get('content').getHeight()-15);
	tree.setWidth(Ext.get('content').getWidth());
});