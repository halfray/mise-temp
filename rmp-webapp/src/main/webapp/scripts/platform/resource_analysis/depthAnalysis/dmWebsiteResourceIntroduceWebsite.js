var website = new  Ext.ux.SearchComboBox({
	id : '#website',
	dataMethod:'webSiteRIAAction.getWebSiteList',
	width:120,
	valueField:'name',
	displayField:'name',
	fieldLabel : '网站',
	name : 'website'
	});
var typeList = new Ext.ux.TreeField({
	id : '#typeList',
	fieldLabel : '网站分类',
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	width : 120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250
});
var province = new Ext.ux.seraph.DictCombo( { 
	id : '#local',
	fieldLabel : '省份',
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    value : '510000',
    width : 120
 });
var selectData = [["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["req_Count", "请求次数"]];
var selectStore = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : selectData
		});
var selectComboBox = new Ext.form.ComboBox({
			id : '#selectComboBox',
			fieldLabel:'TOP',
			hiddenName : 'selectValue',
			valueField : 'value',
			displayField : 'name',
			typeAhead : true,
			mode : 'local',
			value : 'all_Flow',
			store : selectStore,
			triggerAction : 'all',
			selectOnFocus : true,
			width : 125
		});
var topN = new Ext.form.NumberField({
	id : '#topN',
    allowDecimals:false,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false,                //不允许输入负数   
    width:90,
    value : '100'
});
var search = new Ext.Button({
	text : '查询',
	iconCls: 'dataTable-preview-icon', 
	handler : queryList
})
var reset = new Ext.Button({
	text : '刷新',
	iconCls: 'role-user-reset', 
	handler : reset
})
var selectForm = new Ext.form.FormPanel({
			width : 1150,
			colspan : 8,
			layout : 'form',
			labelWidth : 60,
			labelAlign : "right",
			frame : false,
			border : false,
			borderBody : false,
			/*items : [{
						items : [website,typeList,province,selectComboBox,topN]
					}]*/
			
			items : [{
				layout : 'column',
				items : [
				         {
				        	 columnWidth : .20,
				        	 layout : 'form',
				        	 items : [ website ]
				         }, {
				        	 columnWidth : .20,
				        	 layout : 'form',
				        	 items : [typeList]
				         }, {
				        	 columnWidth : .20,
				        	 layout : 'form',
				        	 items : [ province]
				         },{
				        	 columnWidth : .17,
				        	 layout : 'form',
				        	 items : [selectComboBox]
				         },{
				        	 columnWidth : .20,
				        	 layout : 'column',
				        	 items : [topN,search,reset]
				         }
				       ]
			}]
		});
var columns = [{
	header : "网站",
	dataIndex : "webSite",
	width : 180
}, {
	header : "网站ID",
	dataIndex : "webSite_Id",
	width : 130,
	hidden : true
},{
	header : "域名数量",
	dataIndex : "domain_Count",
	width : 100
}, {
	header : "URL资源数量",
	dataIndex : "url_Count",
	width : 100
}, {
	header : "URL资源大小",
	dataIndex : "url_Size",
	width : 100
}, {
	header : "可缓存资源数量",
	dataIndex : "cache_Count",
	width : 100
}, {
	header : "可缓存资源大小",
	dataIndex : "cache_Size",
	width : 100
}, {
	header : "可缓存资源数量占比",
	dataIndex : "cache_Count_Proportion",
	tpl: new Ext.XTemplate('{cache_Count_Proportion:this.formatlocalRequestCount}', {
        formatlocalRequestCount: function(v) {
			if(v == null){
				return '0.00%';
			}else{
				return (v*100).toFixed(2) + "%";
			}
        }
    }),
	width : 130
}, {
	header : "可缓存资源大小占比",
	dataIndex : "cache_Size_Proportion",
	tpl: new Ext.XTemplate('{cache_Size_Proportion:this.formatlocalRequestCount}', {
        formatlocalRequestCount: function(v) {
			if(v == null){
				return '0.00%';
			}else{
				return (v*100).toFixed(2) + "%";
			}
        }
    }),
	width : 130
}, {
	header : "引入建议",
	dataIndex : "introduce_Suggest",
	width : 100
}, {
	header : "更新日期",
	dataIndex : "updateDate",
	width : 100
}, {
	header : "总流量",
	dataIndex : "all_Flow",
	width : 100
}, {
	header : "上行流量",
	dataIndex : "upload_Flow",
	width : 100
}, {
	header : "下行流量",
	dataIndex : "download_Flow",
	width : 100
}, {
	header : "请求次数",
	dataIndex : "req_Count",
	width : 100
}, {
	header : "type",
	dataIndex : "type",
	hidden : true,
	width : 100
}, {
	header : "value",
	dataIndex : "value",
	hidden : true,
	width : 100
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
	treeLoader.baseParams.method = "'webSiteRIAAction.getWebSiteRIATree'";
	treeLoader.baseParams.result = "'direct'";
	var params = {};
	params.javaClass = "java.util.HashMap";
	params.map = getData();
	params.map.domain = node.attributes.webSite;
	params.map.webSite_Id = node.attributes.webSite_Id;
	params.map.type = node.attributes.type;
	params.map.value = node.attributes.value;
	treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
}, treeLoader);
function queryList(){
	var data = getData();
	getTreeData(data);
}
function reset(){
	Ext.getCmp('#local').setValue('510000');
	Ext.getCmp('#website').setValue();
	Ext.getCmp('#typeList').setValue('');
	Ext.getCmp('#selectComboBox').setValue('');
	Ext.getCmp('#topN').setValue('100');
	
	var data = getData();
	getTreeData(data);
}
function getData() {
	var data = {};
	data.website = website.getValue();
	data.typeList = typeList.getValue();
	data.local = province.getValue();
	data.top = topN.getValue();
	data.selectComboBox = selectComboBox.getValue();
	return data;
}
var tree = new Ext.ux.tree.TreeGrid({
	autoLoad :false,
	rootVisible: false,
	frame:true,
	baseCls : 'x-plain',
	loader : treeLoader,
	border : false,
	enableSort : false,
	root : root,
	columns : columns,
	colspan : 8
});

function getTreeData(data) {
	treeLoader.load(root);
};

var panel = new Ext.Panel({
	id : 'main-panel',
	frame : true,
//	height : 900,
//	autoHeight:true,
	layout : 'table',
	layoutConfig : {
		columns : 8
	},
	defaults : {
		frame : true
	},
	items : [selectForm,tree]
});

Ext.onReady(function() {
    panel.render('user-grid');
    panel.setHeight(Ext.get("content").getHeight());
    tree.setHeight(Ext.get("content").getHeight()-52);
    tree.setWidth(Ext.get("content").getWidth()-20);
});