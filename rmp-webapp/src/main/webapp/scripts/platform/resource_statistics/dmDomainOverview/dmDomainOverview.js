var row = [
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '<font color="#ee006e">URL资源</font>', colspan: 2, align: 'center' },
           { header: '<font color="#ee006e">网内资源</font>', colspan: 2, align: 'center' },
           //{ header: '<font color="#ee006e">请求次数</font>', colspan: 3, align: 'center' },
           { header: '', colspan: 1, align: 'center' }
          ];
var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});

/*Ext.grid.RowNumberer = Ext.extend(Ext.grid.RowNumberer, {  
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){  
		var start = 0;
		if(store.lastOptions.params != null){
			start = store.lastOptions.params.start;
		}
		return start + rowIndex + 1;  
	}  
});*/
var userColumns = [ new Ext.grid.RowNumberer(),{
	header : '域名',
	width : 150,
	sortable : true,
	dataIndex : 'domain',
	hidden : false,
	hideable : false
}, {
	header : '网站',
	width : 150,
	sortable : true,
	dataIndex : 'webSite_name',
	hidden : false,
	hideable : false
}, {
	header : '总数',
	width : 150,
	sortable : true,
	dataIndex : 'url_count_all',
	align: 'right',
	hidden : false,
	hideable : false
}, {
	header : '大小(MB)',
	width : 150,
	sortable : true,
	dataIndex : 'url_resource_size',
	align: 'right',
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : 'URL资源数量',
	width : 150,
	sortable : true,
	dataIndex : 'url_count_local',
	align: 'right',
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : 'URL资源占比',
	width : 150,
	sortable : true,
	dataIndex : 'url_Domain_Proportion',
	align: 'right',
	hidden : false,
	hideable : false,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, /*{
	header : '共计',
	width : 100,
	sortable : true,
	dataIndex : 'visit_count_all',
	align: 'right',
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : '本网次数',
	width : 100,
	sortable : true,
	dataIndex : 'visit_count_local',
	align: 'right',
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : '本网次数占比',
	width : 100,
	sortable : true,
	dataIndex : 'visit_Proportion',
	align: 'right',
	hidden : false,
	hideable : false,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
},*/ {
	header : '更新日期',
	width : 150,
	sortable : true,
	dataIndex : 'date',
	hidden : false,
	hideable : false
} ];

//TODO: default xtype, width
var province = new Ext.ux.seraph.DictCombo( { 
	name : 'province',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    value : orgCode,
    width : 120
 });
var websiteType = new Ext.ux.TreeField({
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	width : 120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250,
	name:'websiteType'
});

websiteType.on('expand',function(){
	var root = websiteType.root;
	findchildnode(root);
	root.collapseChildNodes(true);
})

	//获取所有的子节点 
function findchildnode(node){
	 var childnodes = node.childNodes;
	 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
		 var nd = this;
		 nd.getUI().addClass("x-treenodeColor");
		 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
			 nd.expand(false,false,function(){
				 findchildnode(nd); //如果存在子节点 递归
			 });
		 }
	 });
}

var websiteName = new Ext.ux.SearchComboBox( {
	dataMethod : 'dmNetsiteLibrariesDetailAction.getDomainLibraryWebSiteList',
	width : 300,
	valueField : 'name',
	displayField : 'name',
	fieldLabel : '网站',
	name : 'websiteName'
});

var topN =new Ext.form.NumberField({
	name : 'topN',
	fieldLabel : 'TOP',
	width: 120,
	value:1000
});

var search = new Ext.Button({
	text : '<span style="margin-left:20px;">查询</span>',
	cls:'search-button',
	minWidth:82,
	height:27,
	handler : upData
});
var reset = new Ext.Button({
	text : '<span style="margin-left:20px;">刷新</span>',
	cls: 'refresh-button', 
	minWidth:82,
	height:27,
	handler : function()
	{
		var tbar = grid.getTopToolbar();
		var queryFields = tbar.findByType('field');
		for(var i = 0; i < queryFields.length;i++)
		{
			queryFields[i].reset();
		}
		upData();
	}
});
var queryFields = [ {
	text : '省份'
}, province, {
	text : '网站'
}, websiteName, {
	text : '域名'
}, 
 {
	name : 'domain',
	xtype : 'textfield',
	width : 90
},
{text: '网站类型'}, websiteType,
{text: 'TOP'}, topN,
 search, '-', reset ];



var grid = new Ext.ux.Grid( {
	dataMethod : 'dmNetsiteLibrariesDetailAction.getDomainLibraryList',
	columns : userColumns,
	border : false,
	frame : false,
	fetchSize : 15,
	plugins : group,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	//loadMask : true,
	tbar : queryFields,
	colspan : 8,
		listeners : {
		dblclick : function() {
			var record = grid.getSelected();
//			getIpDetail(record);
		}
	},
	viewData : false
});

function upData() {
	var data = getData();
	updateGrid(data);
}

function getData() {
	var tbar = grid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = {};
	for(var i = 0; i < queryFields.length;i++)
	{
		data[queryFields[i].getName()] = queryFields[i].getValue();
	}
	return data;
}

function updateGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}

Ext.onReady(function() {
	grid.setHeight(Ext.get("content").getHeight());
	//grid.setWidth(Ext.get("content").getWidth());
	var panel = new Ext.Panel({
		renderTo : 'user-grid',
		layout : 'fit',
		autoScroll : true,
		//frame : true,
		border: false,
		bodyBorder: false,
		items : [grid]
	});
	upData();
});