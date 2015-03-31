Ext.override(Ext.form.RadioGroup, {
			getValue : function() {
				var v;
				if (this.rendered) {
					this.items.each(function(item) {
								if (!item.getValue())
									return true;
								v = item.getRawValue();
								return false;
							});
				} else {
					for (var k in this.items) {
						if (this.items[k].checked) {
							v = this.items[k].inputValue;
							break;
						}
					}
				}
				return v;
			},
			setValue : function(v) {
				if (this.rendered)
					this.items.each(function(item) {
								item.setValue(item.getRawValue() == v);
							});
				else {
					for (var k in this.items) {
						this.items[k].checked = this.items[k].inputValue == v;
					}
				}
			}
		});
// 系统
var systemParamsField = new Ext.ux.seraph.DictCombo({
			fieldLabel : '系统',
			url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
			name : 'system',
			displayField : 'codeLabel',
			value : '0000',
			valueField : 'codeValue'
		});
var domain = new Ext.ux.SearchComboBox({
			fieldLabel : '域名',
			name : 'domain',
			dataMethod:'allProvinceDomainResourcesContrastAction.getAllDomainList',
			displayField:'name',
			valueField:'name',
			value : 't.cn'
});
var urlNum = new Ext.form.Radio({
			name : "countSelect",
			inputValue : "urlCount",
			checked : true,
			boxLabel : "URL数量"
		});
var numGroup = new Ext.form.RadioGroup({
			width : 300,
			items : [urlNum]
		});
var search = new Ext.Button({
			text : '查询',
			handler : upData
		})
var searchForm = new Ext.Panel({
			width : 950,
			baseCls : 'x-plain',
			layout : 'column',
			defaults : {
				columnWidth : .25,
				layout : 'form'
			},
			colspan : 8,
			items : [{
						items : [domain]
					}, {
						labelWidth : 50,
						items : [systemParamsField]
					}, {
						columnWidth : .45,
						items : [numGroup]
					}, {
						columnWidth : .05,
						items : search
					}]
		});

function onPointClick(event) {
	if (event.data) {
		var idxml = event.data.Attributes['id'];
		var id = AnyChartUtil.getAttributeValue(idxml, "id");
		M.rpc._call(updateMapDetailData,
				'allProvinceDomainResourcesContrastAction.getDetailFromMap', id);
	}
}
var chinaMapData = new MapData();
var chinaMapPanel = new Ext.Panel({
			id : 'mapchart',
			title : '热点数据',
			colspan : 8,
			html : 'any chart show there'
		});
var chinaMapChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
chinaMapChart.width = '100%';
chinaMapChart.height=600;
chinaMapChart.addEventListener('pointClick', onPointClick);
chinaMapChart.wMode = 'Transparent';

var mapDetailData = new PieData();
var mapDetailPanel = new Ext.Panel({
			id : 'mapdetailchart',
//			colspan : 3,
			html : 'any chart show there'
		});
var mapDetailChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
mapDetailChart.width = '100%';
mapDetailChart.wMode = 'Transparent';

var mapDetailWindow = new Ext.Window({
	width:600,
	height:450,
	hidden:true,
	hideMode :"display",
	closeAction:'hide',
	listeners:{
		afterrender:function(){
			mapDetailChart.write('mapdetailchart');
		}
	},
	items:[mapDetailPanel]
});
function validData() {
	if (Ext.isEmpty(domain.getValue())) {
		Ext.Msg.alert('提示', '请输入要查询的域名信息');
		return false;
	}
	if (Ext.isEmpty(systemParamsField.getValue())) {
		Ext.Msg.alert('提示', '请输入要查询的系统信息');
		return false;
	}
	return true;
}
function getData() {
	var data = {};
	var systemValue = systemParamsField.getValue();
	var domainValue = domain.getValue();
	data.system = systemValue;
	data.domain = domainValue;

	var selectValue = numGroup.getValue();
	if (selectValue)
		data.selectValue = selectValue;
	var barValue = selectComboBox.getValue();
	data.barValue = barValue;

	return data;
}
function upData() {
	if (!validData())
		return;
	var data = getData();
	getMapData(data);
	getBarData(data);
	getTreeData(data);
}
function getMapData(data) {
	M.rpc._call(updateMapData,
			'allProvinceDomainResourcesContrastAction.getListForMap', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}
function updateMapData(data) {
	chinaMapData.setPoints(data);
	chinaMapChart.setJSData(chinaMapData.getData());
}
function updateMapDetailData(data) {
	if (data) {
		mapDetailData.setPoints(data);
		mapDetailChart.setJSData(mapDetailData.getData());
	}
	mapDetailWindow.show();
}

var barData = new BarData();
var barPanel = new Ext.Panel({
			id : 'barChart',
			html : 'any chart show there'
		});
var barChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
barChart.width = '100%';
barChart.wMode = 'Transparent';

var selectData = [["urlCount", "URL引入数量"], ["(local_Request_Count/all_Request_Count)*100", "本网请求次数占比"]];
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
			value : 'urlCount',
			selectOnFocus : true,
			listeners : {
				select : function(value) {
					if(value.value == 'urlCount'){
						barData.setYaxisName('URL引入数量');
					}else{
						barData.setYaxisName('本网请求次数占比');
					}
					if (!validData())
						return;
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
barData.setXaxisName('省份');
barData.setYaxisName('URL引入数量');

var barPanel = new Ext.Panel({
			width : 950,
			frame:true,
			baseCls : 'x-plain',
			items : [barPanel],
			colspan : 8
		});

function getBarData(data) {
	M.rpc._call(updateBarData,
			'allProvinceDomainResourcesContrastAction.getListForBar', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}
function updateBarData(data) {
	if (!data || data.length == 0)
		data = [{}];
	barData.setSeries(data);
	barChart.setJSData(barData.getData());
}

var columns = [{
			header : "省份",
			dataIndex : "name",
			width : 300,
			align : 'center'
		},{
			header : "URL引入数量",
			dataIndex : "urlCount",
			width : 200,
			align : 'center'
		},  {
			header : "本网请求次数占比",
			dataIndex : "localRequestCount",
			tpl: new Ext.XTemplate('{localRequestCount:this.formatlocalRequestCount}', {
                formatlocalRequestCount: function(v) {
                return (v*100).toFixed(2) + "%";
                }
            }),
			width : 200,
			align : 'center'
		}, {
			header : "更新日期",
			dataIndex : "date",
//			hidden:true,
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
			treeLoader.baseParams.method = "'allProvinceDomainResourcesContrastAction.getListForTree'";
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
			items : [searchForm, chinaMapPanel,selectForm, barPanel,tree]
		});

Ext.onReady(function() {
			panel.render('user-grid');
			chinaMapChart.setJSData(chinaMapData.getData());
			mapDetailChart.setJSData(mapDetailData.getData());
			barChart.setJSData(barData.getData());
			chinaMapChart.write('mapchart');
//			mapDetailChart.write('mapdetailchart');
			barChart.write('barChart');
			
			Main.fun.showLoadProcessWait();
	        setTimeout(function(){
	        	Main.fun.closeLoadProcessWait();
	        	upData();
	        },5000);
		});
