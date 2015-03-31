var websites = new  Ext.ux.SearchComboBox({
	dataMethod:'dmNetsiteLibrariesDetailAction.searchWebSiteForGrid',
	width:120,
	valueField:'webSiteId',
	displayField:'name',
	fieldLabel : '网站',
	defaultFirstValue : true,
	name : 'websites',
	listeners : {
		select : function(value) {
			queryForAll(value);
		}
	}
});
function queryForAll(value){
	var data = {};
	data.webSiteId = value.value;
	showViews(data);
	updateWebLevelTreeData();
	updateWebDomainTreeData();
}

var queryForm = new Ext.form.FormPanel({
	width : 990,
	colspan : 8,
	layout : 'form',
	labelWidth : 60,
	labelAlign : "right",
	frame : false,
	border : false,
	borderBody : false,
	items : [{
		layout : 'column',
		items : [
		         {
		        	 //columnWidth : .20,
		        	 layout : 'form',
		        	 items : [ websites ]
		         }
		       ]
	}]
});

//根据选择的网站，显示所有的相关信息
function showViews(data)
{
	showTreeView(data);
}
function showTreeView(data)
{
	M.rpc._call(updateTreeView,'dmNetsiteLibrariesDetailAction.getTreeRootNode',{javaClass:'java.util.HashMap',map:data});
}
function updateTreeView(data,error)
{
	createD3Tree('d3Tree',data);
}
var treePanel = new Ext.Panel({
			height : 660,
			title:'网站域名资源关系图',
			colspan : 8,
			html : '<div id="d3Tree" style="background: url(images/platform/texture-noise.png);"></div>'
		});
		
//----网站下域名级别资源汇总
function getFormatTpl(value)
{
	return new Ext.XTemplate('{'+value+':this.formatlocalRequestCount}', {
                formatlocalRequestCount: function(v) {
                return (v*100).toFixed(2) + "%";
                }
            });
}
var webLevelColumns = [{
			header : "网站名称",
			dataIndex : "name",
			width : 200
		},{
			header : "域名总计",
			dataIndex : "domainResourceTotal",
			width : 80
		}, {
			header : "域名网内数量",
			dataIndex : "domainInCount",
			width : 80
		}, {
			header : "域名网内占比",
			dataIndex : "domainInProportion",
			tpl:getFormatTpl('domainInProportion'),
			width : 80
		}, {
			header : "URL总计",
			dataIndex : "urlCount",
			width : 70
		}, {
			header : "URL网内数量",
			dataIndex : "urlInCount",
			width : 80
		}, {
			header : "URL网内占比",
			dataIndex : "urlInProportion",
			tpl:getFormatTpl('urlInProportion'),
			width : 80
		}, {
			header : "访问次数总计",
			dataIndex : "visitTotal",
			width : 80
		}, {
			header : "本网访问次数",
			dataIndex : "visitCount",
			width : 80
		}, {
			header : "本网访问次数占比",
			dataIndex : "visitProportion",
			tpl:getFormatTpl('visitProportion'),
			width : 100
		}, {
			header : "更新日期",
			dataIndex : "updateDate",
			hidden:true,
			width : 80
		}, {
			header : "type",
			dataIndex : "type",
			hidden:true,
			width : 80
		}];
var webLevelRoot = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '根节点',
			attribute:{type:0},
			draggable : false,
			expanded : true
		});
// 创建动态加载树
var webLevelTreeLoader = new Ext.tree.TreeLoader({
	    	dataUrl :M.rpc.path
		});
webLevelTreeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.method = "'dmNetsiteLibrariesDetailAction.getListForWebLevelTree'";
			treeLoader.baseParams.result = "'direct'";
			var params = {};
			params.javaClass = "java.util.HashMap";
			var data = {};
			data.webSiteId = queryForm.getForm().findField('websites').getValue();
			params.map = data;//websites.getValues();//webSiteGrid.getSelected()?webSiteGrid.getSelected().data:{};
			params.map.type = node.attributes.type;
			params.map.value = node.attributes.value;
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, webLevelTreeLoader);

var webLevelTree = new Ext.ux.tree.TreeGrid({
			title:'网站下域名级别资源汇总',
			width : 990,
			height : 400,
			autoLoad :false,
			rootVisible: false,
			frame:true,
			loader : webLevelTreeLoader,
			border : false,
			enableSort : false,
			root : webLevelRoot,
			columns : webLevelColumns,
			colspan : 8
		});
function updateWebLevelTreeData()
{
	webLevelTreeLoader.load(webLevelRoot);	
}
var selectData = [["1", "本级域名"], ["0", "下级域名"]];
var selectStore = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : selectData
		});
var selectComboBox = new Ext.form.ComboBox({
			fieldLabel:'类型',
			hiddenName : 'dataType',
			valueField : 'value',
			displayField : 'name',
			typeAhead : true,
			mode : 'local',
			store : selectStore,
			triggerAction : 'all',
			value : '1',
			selectOnFocus : true,
			listeners : {
				select : function() {
					webDomainTreeLoader.load(webDomainRoot);
				}
			},
			width : 190
		});
var selectForm = new Ext.Panel({
			width : 950,
			baseCls: 'x-plain',
			layout : 'column',
			defaults : {
				columnWidth : .5,
				layout : 'form'
			},
			colspan : 8,
			items : [{
						items : [selectComboBox]
					}]
		});

var webDomainColumns = [{
			header : "网站名称",
			dataIndex : "name",
			width : 200
		},{
			header : "域名",
			hidden:true,
			dataIndex : "domain",
			width : 120
		},{
			header : "域名级别",
			dataIndex : "domainLevel",
			width : 80
		},  {
			header : "域名总计",
			dataIndex : "domainResourceTotal",
			width : 80
		}, {
			header : "域名网内数量",
			dataIndex : "domainInCount",
			width : 80
		}, {
			header : "域名网内占比",
			dataIndex : "domainInProportion",
			tpl:getFormatTpl('domainInProportion'),
			width : 80
		}, {
			header : "URL总计",
			dataIndex : "urlCount",
			width : 70
		}, {
			header : "URL网内数量",
			dataIndex : "urlInCount",
			width : 80
		}, {
			header : "URL网内占比",
			dataIndex : "urlInProportion",
			tpl:getFormatTpl('urlInProportion'),
			width : 80
		}, {
			header : "访问次数总计",
			dataIndex : "visitTotal",
			width : 80
		}, {
			header : "本网访问次数",
			dataIndex : "visitCount",
			width : 80
		}, {
			header : "本网访问次数占比",
			dataIndex : "visitProportion",
			tpl:getFormatTpl('visitProportion'),
			width : 100
		}, {
			header : "更新日期",
			hidden:true,
			dataIndex : "updateDate",
			width : 80
		}, {
			header : "type",
			dataIndex : "type",
			hidden:true,
			width : 80
		}];
var webDomainRoot = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '根节点',
			draggable : false,
			expanded : true
		});
// 创建动态加载树
var webDomainTreeLoader = new Ext.tree.TreeLoader({
	    	dataUrl :M.rpc.path
		});
webDomainTreeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.method = "dmNetsiteLibrariesDetailAction.getListForWebDomainTree";
			treeLoader.baseParams.result = "direct";
			var params = {};
			params.javaClass = "java.util.HashMap";
			var data = {};
			//data.webSiteId = websites.getValues();
			data.webSiteId = queryForm.getForm().findField('websites').getValue();
			params.map = data;//websites.getValues();//webSiteGrid.getSelected()?webSiteGrid.getSelected().data:{};
			params.map.dataType = selectComboBox.getValue();
			params.map.type = node.attributes.type;
			params.map.domain = node.attributes.domain;
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, webDomainTreeLoader);

var webDomainTree = new Ext.ux.tree.TreeGrid({
			title:'网站下域名资源情况',
			width : 990,
			height : 400,
			autoLoad :false,
			rootVisible: false,
			frame:true,
			loader : webDomainTreeLoader,
			border : false,
			enableSort : false,
			root : webDomainRoot,
			columns : webDomainColumns,
			colspan : 8
		});
		
function updateWebDomainTreeData() {
	webDomainTreeLoader.load(webDomainRoot);
};

var panel = new Ext.Panel({
			id : 'main-panel',
			frame : true,
			autoHeight:true,
			layout : 'table',
			layoutConfig : {
				columns : 8
			},
			defaults : {
				frame : true
			},
			items : [queryForm,treePanel,webLevelTree,webDomainTree]
		});

Ext.onReady(function() {
			panel.render('user-grid');
			Main.fun.showLoadProcessWait();
			setTimeout(function(){
	        	Main.fun.closeLoadProcessWait();
	        	var data = {};
	        	data.webSiteId = queryForm.getForm().findField('websites').getValue();
	        	showViews(data);
	        	updateWebLevelTreeData();
				updateWebDomainTreeData();
	        },5000);
		});
