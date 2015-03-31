var COLUMN_COUNT = 3;
var PADDING = 5;
var CELL_WIDTH = 350;
var CELL_HEIGHT = 400;
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

function more(value)
{
	var param = {"cls":"","disabled":false,"draggable":true,"expanded":false,"href":"",hrefTarget:"rmWebsiteTotalList.do?type="+value,"iconCls":"default-icon","id":"63","leaf":true,"menuId":"573","parentId":"57","sort":0,"text":"网站库","type":"tree","visibility":true}
	treeClick('63',param);
}

var tools = [{
    id:'refresh',
    handler: function(e, target, panel){
		panel.getStore().reload();
	}
}];

function getGrid(name,value)
{
	var store = new Ext.data.JsonStore({
		root: 'list',
	    url: "rmWebSiteTotalViewActions.do?method=getTopWebSite&&params={type:'"+value+"'}",
	    autoLoad:true,
	    fields: ['name','total','bili']
	});
	var userColumns =[ 
	                  {header: '网站名称', width: 80, sortable: true, dataIndex: "name" },  
	                  {header: '资源数量', width: 70, sortable: true, dataIndex: "total",renderer:function(value){return value>>0}},  
	                  {header: '网内资源比例', width: 80, sortable: true, dataIndex:"bili",renderer:function(value){return (value*100).toFixed(2)+"%"}} ,
	                  {header: '域名数量', width: 70, sortable: true, dataIndex:"domainTotal",renderer:function(value){return value>>0}} 
	              ];
	var params = {type:value};
	var total = new Ajax('rmWebSiteTotalViewActions.do').call('getTotalWebSitesByType',params);
	var outnums = new Ajax('rmWebSiteTotalViewActions.do').call('getOutWebSitesTotal',params);
	var innums = new Ajax('rmWebSiteTotalViewActions.do').call('getInWebSitesTotal',params);
	var inoutnums = new Ajax('rmWebSiteTotalViewActions.do').call('getInOutWebSitesTotal',params);
	var title = name + "&nbsp;&nbsp;&nbsp;" + "总数:"+total+"&nbsp;"+"网内:"+innums+"&nbsp;网外："+outnums+"&nbsp;&nbsp;网内网外:"+inoutnums+"&nbsp;&nbsp;<a href='javascript:more("+value+")'>更多...</a>";
	var grid = new Ext.grid.GridPanel({
		title:title,
	    store: store,
	    tools: tools,
	    collapsible: true,
	    loadMask: {msg: '数据加载中...'},
	    width: CELL_WIDTH, 
	    height: CELL_HEIGHT,
	    columns: userColumns
	});
	return grid;
}
function getTotal()
{
	var allWebSiteTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'allWebSiteTotal'});
	var outWebSiteTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'outWebSiteTotal'});
	var inOutWebSiteTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inoutWebSiteTotal'});
	var inWebSiteTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inWebSiteTotal'});
	
	var allWebSiteTotal =929
	var outWebSiteTotal = 0;
	var inOutWebSiteTotal = 450;
	var inWebSiteTotal = 479;
	
	var allDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'allDoaminTotal'});
	var outDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'outDoaminTotal'});
	var inOutDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inoutDoaminTotal'});
	var inDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inDoaminTotal'});
	
	var allUrlTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'allUrlTotal'});
	var httpUrlTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'httpUrlTotal'});
	var p2pUrlTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'p2pUrlTotal'});
	
	
	 allDoaminTotal = 5714;
	 outDoaminTotal = 2428;
	 inOutDoaminTotal = 2851;
	 inDoaminTotal = 435;
	var html = 
		"<table style='font: 11px/15px arial,tahoma,helvetica,sans-serif;'>"
		+"<tr>"
		+"<td style='border-right:solid 1px #add9c0;vertical-align:middle'>概述</td>"
		+"<td>" 
		+"总共管理网站："+allWebSiteTotal+"个,其中网内有"+inWebSiteTotal+"个,比例为"+(inWebSiteTotal/allWebSiteTotal*100).toFixed(2)+"%;网内网外有"+inOutWebSiteTotal+"个,比例为"+(inOutWebSiteTotal/allWebSiteTotal*100).toFixed(2)+"%;网外有"+outWebSiteTotal+"个，比例为"+(outWebSiteTotal/allWebSiteTotal*100).toFixed(2)+"%<br>"
		+"总共管理域名："+allDoaminTotal+"个,其中网内有"+inDoaminTotal+"个,比例为"+(inDoaminTotal/allDoaminTotal*100).toFixed(2)+"%;网内网外有"+inOutDoaminTotal+"个,比例为"+(inOutDoaminTotal/allDoaminTotal*100).toFixed(2)+"%;网外有"+outDoaminTotal+"个，比例为"+(outDoaminTotal/allDoaminTotal*100).toFixed(2)+"%<br>"
		+"总共管理URL："+allUrlTotal+"个,其中HTTP有"+httpUrlTotal+"个,比例为"+(httpUrlTotal/allUrlTotal*100).toFixed(2)+"%;P2P有"+p2pUrlTotal+"个,比例为"+(p2pUrlTotal/allUrlTotal*100).toFixed(2)+"%<br>"
		+"</td>"
		+"</tr>"
		+"</table>";
	var grid = new Ext.Panel({
		colspan:3,
		html:html
	});
	return grid;
}
Ext.onReady(function() {

	
	var arrylist = ['28','37','6','17','7','18','12','263','195'];	 //为了能显示数而取的，以后需要改正
	var params = {type:'TB_WS_W_0003_LIST'}
	var list = new Ajax('rmWebSiteTotalViewActions.do').call('getCodeInfoListByType',params);
			var columnArray = [getTotal()];
			if(list != null) {
				for(var i = 0; i < list.length; i++) {
					var title = list[i].codeLabel;
					var value = list[i].codeValue;
					if(arrylist.indexOf(value)!=-1)
					{
						columnArray.push(getGrid(title,value));
					}
				}

				var panel = new Ext.Panel({
			        id:'main-panel',
			        frame:true,
			        baseCls:'x-plain',
			        renderTo: 'user-grid',
			        layout:'table',
			        layoutConfig: {columns: 3},
			        defaults: {frame: true},
			        items: columnArray
			    });

			}
});