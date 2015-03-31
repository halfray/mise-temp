function getData() {
	var data = {};
	/*var systemValue = systemParamsField.getValue();
	var webvalue = websiteName.getValue();
	data.system = systemValue;
	data.webSite = webvalue;

	var selectValue = numGroup.getValue();
	if (selectValue)
		data.selectValue = selectValue;*/
	var barValue = selectComboBox.getValue();
	data.barValue = barValue;
	
	return data;
}

var barData = new BarData();
var barPanel = new Ext.Panel({
			html : '<div style="width:900;overflow:auto"> <div id="barChart" style="width:4000"></div></div>'
		});
var barChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
barChart.width = '100%';
barChart.wMode = 'Transparent';
barData.setXaxisName('省份');
barData.setYaxisName('网站引入数量');
barData.updateValuePer(0);


var selectData = [["count(domainCount)", "网站引入数量"],["sum(domainCount)", "域名引入数量"], ["sum(urlCount)", "URL引入数量"],
		["(sum(domainCount)/sum(domain_All_Count))*100", "域名本网引入率"], ["(sum(local_Request_Count)/sum(all_Request_Count))*100", "本网请求次数占比"]];
var selectStore = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : selectData
		});
var selectComboBox = new Ext.form.ComboBox({
			fieldLabel:'类型',
			hiddenName : 'selectValue',
			valueField : 'value',
			displayField : 'name',
			typeAhead : true,
			mode : 'local',
			store : selectStore,
			triggerAction : 'all',
			value : 'count(domainCount)',
			selectOnFocus : true,
			listeners : {
				select : function(value) {
					if('count(domainCount)' == value.value){
						barData.setYaxisName('网站引入数量');
						barData.updateValuePer(0);
					}else if('sum(domainCount)' == value.value){
						barData.setYaxisName('域名引入数量');
						barData.updateValuePer(0);
					}else if('sum(urlCount)' == value.value){
						barData.setYaxisName('URL引入数量');
						barData.updateValuePer(0);
					}else if('(sum(domainCount)/sum(domain_All_Count))*100' == value.value){
						barData.setYaxisName('域名本网引入率');
						barData.updateValuePer(2);
					}else{
						barData.setYaxisName('本网请求次数占比');
						barData.updateValuePer(2);
					}
					var data = getData();
					getBarData(data);
				}
			},
			width : 190
		});
var selectForm = new Ext.Panel({
			width : 950,
			baseCls : 'x-plain',
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
var barPanel = new Ext.Panel({
//			tbar : [selectComboBox],
			width : 950,
			frame:true,
			baseCls : 'x-plain',
			items : [barPanel],
			colspan : 8
		});
function getBarData(data) {
	M.rpc._call(updateBarData,
			'allProvinceResourcesContrastAction.getAllListForBar', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}
function updateBarData(data) {
	if (!data || data.length == 0)
		data = [{}];
	barData.setSeries(data,true);
	barChart.setJSData(barData.getData());
}

var columns = [{
			header : "省份",
			dataIndex : "name",
			width : 180,
			align : 'center'
		},{
			header : "网站数量",
			dataIndex : "websiteCount",
			width : 180,
			align : 'center'
		}, {
			header : "域名数量",
			dataIndex : "domainCount",
			width : 100,
			align : 'center'
		}, {
			header : "URL数量",
			dataIndex : "urlCount",
			width : 100,
			align : 'center'
		}, {
			header : "域名本网引入率",
			dataIndex : "domainLocalCount",
			width : 100,
			tpl: new Ext.XTemplate('{domainLocalCount:this.formatDomainLocalCount}', {
                formatDomainLocalCount: function(v) {
                return (v*100).toFixed(2) + "%";
                }
            }),
			align : 'center'
		}, {
			header : "本网请求次数占比",
			dataIndex : "localRequestCount",
			tpl: new Ext.XTemplate('{localRequestCount:this.formatlocalRequestCount}', {
                formatlocalRequestCount: function(v) {
					if(v == null){
						return '0.00%';
					}else{
						return (v*100).toFixed(2) + "%";
					}
                }
            }),
			width : 100,
			align : 'center'
		}, {
			header : "更新日期",
			dataIndex : "date",
			width : 100,
			align : 'center'
		}, {
			header : "type",
			dataIndex : "type",
			hidden : true,
			width : 100,
			align : 'center'
		}, {
			header : "value",
			dataIndex : "value",
			hidden : true,
			width : 100,
			align : 'center'
		}];
var root = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '根节点',
			draggable : false,
			expanded : true
		});
// 创建动态加载树
var treeLoader = new Ext.tree.TreeLoader({
	    	dataUrl :M.rpc.path
		});
treeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.method = "'allProvinceResourcesContrastAction.getAllListForTree'";
			treeLoader.baseParams.result = "'direct'";
			var params = {};
			params.javaClass = "java.util.HashMap";
			params.map = getData();
			params.map.type = node.attributes.type;
			params.map.value = node.attributes.value;
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, treeLoader);

var tree = new Ext.ux.tree.TreeGrid({
			width : 950,
			height : 400,
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
//			height : 900,
			autoHeight:true,
			layout : 'table',
			layoutConfig : {
				columns : 8
			},
			defaults : {
				frame : true
			},
			items : [selectForm, barPanel,tree]
		});

Ext.onReady(function() {
			panel.render('user-grid');
//			barChart.setJSData(barData.getData());
//			mapDetailChart.write('mapdetailchart');
			barChart.write('barChart');
			
			var data = getData();
			//getMapData(data);
			getBarData(data);
			//getTreeData(data);
		});
