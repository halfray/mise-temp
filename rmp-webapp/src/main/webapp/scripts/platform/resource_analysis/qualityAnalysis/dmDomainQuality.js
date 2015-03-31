var operators = new Ext.ux.seraph.DictCombo( { 
	fieldLabel : '所属运营商',
	url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue',
    width : 120
 });
var local = new Ext.ux.seraph.DictCombo( { 
	fieldLabel : '所属区域',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue',
    width : 120
 });
var system = new Ext.ux.seraph.DictCombo( { 
	fieldLabel : '所属系统',
	url :'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue',
    width : 120
 });
var queryForm = getQueryform();
function getQueryform(){

	//字段信息
	
	var quality_Store = new Ext.form.NumberField( {
		fieldLabel : '质量分数小于',
		width:120,
	    allowDecimals:false,               //不允许输入小数   
	    nanText:'请输入有效整数',           //无效数字提示   
	    allowNegative:false,    
		name:'quality_Store'
	});
	
	var query_form1 = new Ext.form.FormPanel( {
		id:"queryForm",
		title : "查询条件",
		labelWidth : 80,
		viewConfig : {
			forceFit : true
		},
		height:180,
		width:260,
		titleCollapse : true,
		margins : '0 3 3 3',
		cmargins : '3 3 3 3',
		labelAlign : "right",
		frame : true,
		layout : 'form',
		buttonAlign : 'center',
		items : [ {
			layout : 'column',
			items : [
			         {
			        	 //columnWidth : .50,
			        	 layout : 'form',
			        	 items : [ operators,local,system,quality_Store]
			         }/*, {
			        	 columnWidth : .50,
			        	 layout : 'form',
			        	 items : [  belongToSystem,quality_Store]
			         }*/
			       ]
		}],
		buttons : [ {
			text : '<span style="margin-left:20px;">查询</span>',
			cls:'search-button',
			minWidth:82,
			height:27,
			handler : queryList
		}, {
			text : '<span style="margin-left:20px;">刷新</span>',
			cls: 'refresh-button', 
			minWidth:82,
			height:27,
			handler : queryformreset
		} ]
	});
	return query_form1;
	
}

var userColumns = [ new Ext.grid.RowNumberer(),{
	header : '域名',
	width : 150,
	sortable : true,
	dataIndex : 'domain'
}, {
	header : '网站',
	width : 150,
	sortable : true,
	dataIndex : 'webSite'
}, {
	header : 'IP',
	width : 150,
	sortable : true,
	dataIndex : 'ip'
}, {
	header : '所属运营商',
	width : 100,
	sortable : true,
	dataIndex : 'operators',
	renderer:Ext.ux.renderer.Combo(operators)
}, {
	header : '所属区域',
	width : 100,
	sortable : true,
	dataIndex : 'belongToArea',
	renderer:Ext.ux.renderer.Combo(local)
}, {
	header : '所属系统',
	width : 100,
	sortable : true,
	dataIndex : 'belongToSystem',
	renderer:Ext.ux.renderer.Combo(system)
}, {
	header : '质量分数',
	width : 100,
	sortable : true,
	dataIndex : 'quality_Store',
	renderer : function(value){
		return value.toFixed(2);
	}
}, {
	header: 'DNS解析次数',
	width: 120,
	sortable: true,
	dataIndex: 'DNSResolNum',
	hidden: false,
	hideable: false
}, {
	header : '更新日期',
	width : 100,
	sortable : true,
	dataIndex : 'updateDate'
}/*, {
	header : '总流量',
	width : 100,
	sortable : true,
	dataIndex : 'all_Flow'
}, {
	header : '上行流量',
	width : 100,
	sortable : true,
	dataIndex : 'upload_Flow'
}, {
	header : '下行流量',
	width : 100,
	sortable : true,
	dataIndex : 'download_Flow'
}, {
	header : '请求次数',
	width : 100,
	sortable : true,
	dataIndex : 'req_Count'
} */];

//TODO: default xtype, width
var province = new Ext.ux.seraph.DictCombo( { 
	name : 'province',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    value : '510000',
    width : 120
 });

/*var websiteType = new Ext.ux.seraph.DictCombo( {
	name : 'websiteType',
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120
});*/

var websiteType = new Ext.ux.TreeField({
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	width : 120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250,
	name : 'websiteType'
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


var selectData = [/*["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["visit_Tount", "请求次数"], */["DNSResolNum", "DNS解析次数"]];
var selectStore = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : selectData
		});
var selectComboBox = new Ext.form.ComboBox({
			name : 'selectValue',
			valueField : 'value',
			displayField : 'name',
			typeAhead : true,
			width : 120,
			value : 'DNSResolNum',
			mode : 'local',
			store : selectStore,
			triggerAction : 'all'
		});

var websiteName = new Ext.ux.SearchComboBox( {
	dataMethod : 'domainQualityAnalysisAction.getWebSiteList',
	width : 300,
	valueField : 'name',
	displayField : 'name',
	fieldLabel : '网站',
	name : 'webSite'
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
		queryForm.getForm().reset();
		upData();
	}
});
var grid = getGrid();
function getGrid(){
	var grid = new Ext.ux.Grid( {
		dataMethod : 'domainQualityAnalysisAction.getList',
		columns : userColumns,
		border : false,
		frame : false,
		fetchSize : 20,
		sm : new Ext.grid.RowSelectionModel( {
			singleSelect : true
		}),
		tbar : new Ext.Toolbar({}),
		colspan : 8,
		columnLines : true,
		viewData : true,
		listeners : {
			dblclick : function() {
				var record = grid.getSelected();
				getDetailList(record);
			}
		}
	});
	grid.getTopToolbar().add("省份：");
	grid.getTopToolbar().add(province);
	grid.getTopToolbar().add("网站：");
	grid.getTopToolbar().add(websiteName);
	grid.getTopToolbar().add("网站分类：");
	grid.getTopToolbar().add(websiteType);
	grid.getTopToolbar().add("TOP：");
	grid.getTopToolbar().add(selectComboBox);
	grid.getTopToolbar().add({
		name : 'limit',
		xtype : 'numberfield',
		width : 90,
		value : '1000'
	});
	var menu = new Ext.menu.Menu({
        items: [queryForm]
    });
	menu.on('show',function(){
		if(grid.id != 'menu_grid'){
			grid.id = 'menu_grid';
		}
	});
	
	grid.getTopToolbar().add({
		text :' ',
		width:82,
		height:27,
		cls:'btn_more_background',
        menu: menu
    });
	grid.getTopToolbar().add(search);
	grid.getTopToolbar().addSeparator();
	grid.getTopToolbar().add(reset);
	
	return grid;
}

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
	if(grid.id == 'menu_grid'){
		data.operators = operators.value;
		data.belongToArea = local.value;
		data.belongToSystem = system.value;
		var formObject = queryForm.getForm().getValues();
		data.quality_Store = formObject.quality_Store;
	}
	return data;
}

function updateGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}

function queryList(){
	var data = getData();
	updateGrid(data);
}
//查询表单重置
function queryformreset(){
	queryForm.getForm().reset();
	grid.getTopToolbar().items.each(function(index){
		if(index.name == 'province'){
			index.setValue('');
		}
		if(index.name == 'webSite'){
			index.setValue('');
		}
		if(index.name == 'websiteType'){
			index.setValue('');
		}
		if(index.name == 'selectValue'){
			index.setValue('');
		}
		if(index.name == 'limit'){
			index.setValue('1000');
		}
	});
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