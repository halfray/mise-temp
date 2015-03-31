var provinceValue;

var province = new Ext.ux.seraph.DictCombo( { 
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    fieldLabel : '省份',
    id:'#local'
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
				layout : 'form',
				labelAlign : 'right'
			},
			colspan : 8,
			items : [{
						columnWidth : .30,
						items : [province]
					}, {
						columnWidth : .70,
						items : search
					}]
		});

//网站数量概览
var webSiteCountData = new PieData();
var webSiteCountPanel = new Ext.Panel({
			id : 'webSiteCountChart',
//			colspan : 3,
			html : 'any chart show there'
		});
var webSiteCountChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
webSiteCountChart.width = '100%';
webSiteCountChart.wMode = 'Transparent';

//域名数量概览
var domainCountData = new PieData();
var domainCountPanel = new Ext.Panel({
			id : 'domainCountChart',
//			colspan : 3,
			html : 'any chart show there'
		});
var domainCountChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
domainCountChart.width = '100%';
domainCountChart.wMode = 'Transparent';

//URL概览
var urlData = new PieData();
var urlPanel = new Ext.Panel({
			id : 'urlChart',
//			colspan : 3,
			html : 'any chart show there'
		});
var urlChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
urlChart.width = '100%';
urlChart.wMode = 'Transparent';

var countChartPanel = new Ext.Panel({
	width:950,
	height:430,
	baseCls : 'x-plain',
	layout : 'column',
	colspan : 8,
	defaults : {
		columnWidth : .25,
		layout : 'form',
		labelAlign : 'right'
	},
	items:[{
		columnWidth : .33,
		items : [webSiteCountPanel]
	}, {
		columnWidth : .33,
		items : [domainCountPanel]
	}, {
		columnWidth : .33,
		items : [urlPanel]
	}]
});

var selectData = [["count(webSite)", "网站数量"], ["sum(domainCount)", "域名数量"], 
                  ["sum(url_All_Count)", "URL数量"], ["all_Request_Count", "请求次数"]];
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
			value : 'count(webSite)',
			selectOnFocus : true,
			listeners : {
				select : function() {
					var data = getData();
					getMapData(data);
				}
			}
		});
//系统
var systemParamsField = new Ext.ux.seraph.DictCombo({
			fieldLabel : '系统',
			url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
			name : 'system',
			displayField : 'codeLabel',
			valueField : 'codeValue',
			value:'0000',
			selectOnFocus : true,
			listeners : {
				select : function() {
					var data = getData();
					getMapData(data);
				}
			}
		});
var queryButton = new Ext.Button({
	text : '各省本网资源横向对比',
	handler : goToallProvinceResourcesBC
})

//系统左侧树
function treeClick(menuid,para){
	var leftTree = window.parent.leftTree;
	var node = leftTree.getNodeById(menuid);
	if(node){
		var temp = node.attributes ;
		node.attributes = para;
		leftTree.fireEvent('click',node);
		node.attributes = temp
	}
};

/*function more(value)
{
	var param = {"cls":"","disabled":false,"draggable":true,
			"expanded":false,"href":"",hrefTarget:"rmWebsiteTotalList.do?type="+value,
			"iconCls":"default-icon","id":"63","leaf":true,"menuId":"573","parentId":"57",
			"sort":0,"text":"网站库","type":"tree","visibility":true}
	treeClick('63',param);
}*/


function goToallProvinceResourcesBC(){
	var param = {"cls":"","disabled":false,"draggable":true,
			"expanded":false,"href":"",hrefTarget:"allProvinceResourcesBC.do",
			"iconCls":"default-icon","id":"131","leaf":true,"menuId":"578","parentId":"57",
			"sort":0,"text":"各省本网资源横向对比","type":"tree","visibility":true}
	treeClick('131',param);
}
var selectForm = new Ext.Panel({
			width : 950,
			baseCls : 'x-plain',
			layout : 'column',
			defaults : {
				columnWidth : .5,
				layout : 'form',
				labelAlign : 'right'
			},
			colspan : 8,
			items : [{
						columnWidth : .35,
						items : [selectComboBox]
					},{
						columnWidth : .35,
						items : [systemParamsField]
					}/*,{
						columnWidth : .30,
						items : [queryButton]
					}*/]
		});

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
function getData() {
	var data = {};
	var provincevalue ='000000';	//只取全网信息
	data.local = provincevalue;
	
	var systemvalue = systemParamsField.getValue();
	data.system = systemvalue;

	var selectValue = selectComboBox.getValue();
	data.selectValue = selectValue;

	return data;
}
function upData() {
	var data = getData();
	getWebSiteCount(data);
	getDomainCount(data);
	getURLCount(data);
}

//获取网站概览
function getWebSiteCount(data){
	M.rpc._call(webSiteCountCallBack,
			'resourseViewAction.getWebSiteMapForLocal', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}

function webSiteCountCallBack(data){
	if(data){
		if(data.error != null){
			webSiteCountData.setPoints(null);
			webSiteCountData.setTitle('网站概览  | '+data.error);
			webSiteCountChart.setJSData(webSiteCountData.getData());
		}else{
			var wsc_total = data.wscTotal;
			var points = data.list;
			webSiteCountData.setPoints(points);
			webSiteCountData.setTitle('网站概览 (总计：'+wsc_total+')');
			webSiteCountChart.setJSData(webSiteCountData.getData());
		}
	}
}

//获取域名概览
function getDomainCount(data){
	M.rpc._call(domainCountCallBack,
			'resourseViewAction.getDomainMapForLocal', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}

function domainCountCallBack(data){
	if(data){
		if(data.error != null){
			domainCountData.setPoints(null);
			domainCountData.setTitle('域名概览 | '+data.error);
			domainCountChart.setJSData(domainCountData.getData());
		}else{
			var dc_total = data.dcTotal;
			var points = data.list;
			domainCountData.setPoints(points);
			domainCountData.setTitle('域名概览 (总计：'+dc_total+')');
			domainCountChart.setJSData(domainCountData.getData());
		}
	}
}
//获取URL概览
function getURLCount(data){
	M.rpc._call(urlCallBack,
			'resourseViewAction.getURLMapForLocal', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}
function urlCallBack(data){
	if(data){
		if(data.error != null){
			urlData.setPoints(null);
			urlData.setTitle('URL概览 | '+data.error);
			urlChart.setJSData(urlData.getData());
		}else{
			var url_total = data.urlTotal;
			var points = data.list;
			urlData.setPoints(points);
			urlData.setTitle('URL概览 (总计：'+url_total+')');
			urlChart.setJSData(urlData.getData());
		}
	}
}

//获取地图数据
function getMapData(data) {
	M.rpc._call(updateMapData,
			'allProvinceResourcesContrastAction.getListForRSMap', {
				javaClass : 'java.util.HashMap',
				map : data
			});
}
function updateMapData(data) {
	chinaMapData.setPoints(data);
	chinaMapChart.setJSData(chinaMapData.getData());
}
function callBackMapDetailData(data) {
	if (data) {
		mapDetailData.setPoints(data);
		mapDetailData.setTitle('');
		mapDetailChart.setJSData(mapDetailData.getData());
	}
	mapDetailWindow.show();
}



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
			items : [countChartPanel,selectForm, chinaMapPanel]
		});

Ext.onReady(function() {
			panel.render('user-grid');
			//chinaMapChart.setJSData(chinaMapData.getData());
			//mapDetailChart.setJSData(mapDetailData.getData());
			
			upData();
			
			var data = getData();
			getMapData(data);
			
			chinaMapChart.write('mapchart');
			webSiteCountChart.write('webSiteCountChart');
			domainCountChart.write('domainCountChart');
			urlChart.write('urlChart');
		});
