<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>Portal</title>
</head>
<style type="text/css">
	html, body {
		font: normal 11px verdana;
		background-color: #dfe8f6;
	}
	#main-panel td {
		padding: <c:out value="${scPortalSty.padding}" />px;
	}
</style>
<script type="text/javascript">

var COLUMN_COUNT = 3;
var SCROLL_WIDTH = 60;
var PADDING = 5;

var columnCount = <c:out value="${scPortalSty.columnCount}" />
//var scrollWidth = <c:out value="${scPortalSty.scrollWidth}" />;
var padding = <c:out value="${scPortalSty.padding}" />;

if(columnCount != null) COLUMN_COUNT = columnCount;
//if(scrollWidth != null) SCROLL_WIDTH = scrollWidth;
if(padding != null) PADDING = padding;

var WHOLE_WIDTH = Ext.getBody().getWidth() - SCROLL_WIDTH;
var CELL_WIDTH = (WHOLE_WIDTH - COLUMN_COUNT*2*PADDING) / COLUMN_COUNT;

var Calculator = {

	getWidth : function(cellWidth, padding, colNum) {
		return cellWidth*colNum + padding*2*colNum;
	},

	getHeight : function(cellWidth, padding, rowNum) {
		return cellWidth*rowNum + padding*2*rowNum;
	}
	
};

Ext.onReady(function() {

	var HtmlCreator = {
		create : function(id, href){
			return '<iframe id=\'content' + id + '\' scrolling="auto" width="100%" height="100%" src=' + href + '></iframe>';		
		}
	};

	var tools = [{
        id: 'maximize',
        handler: function(e, target, panel){
			
        }
    },{
        id:'refresh',
        handler: function(e, target, panel){
	    	var frameId = 'content' + panel.getId();
	        $(frameId).src = $(frameId).src;
    	}
    }];

	Ext.Ajax.request({
		url: 'portalStatefulProvider.do',
		success: function(response) {
		
			var list = response.responseText.evalJSON();
			
			var columnArray = new Array();
			if(list != null) {
	
				for(var i = 0; i < list.length; i++) {
					var cell = {
						id: list[i].id,
				        title: list[i].title,
				        width: Calculator.getWidth(CELL_WIDTH, PADDING, list[i].colNum),
				        height: Calculator.getWidth(CELL_WIDTH, PADDING, list[i].rowNum),
				        colspan: list[i].colNum,
				        rowspan: list[i].rowNum,
				        collapsible: true,
				        tools: tools,
				        html: HtmlCreator.create(list[i].id, list[i].href)
				    };
					columnArray.push(cell);
				}

				var panel = new Ext.Panel({
			        id:'main-panel',
			        baseCls:'x-plain',
			        renderTo: Ext.getBody(),
			        layout:'table',
			        layoutConfig: {columns: COLUMN_COUNT},
			        defaults: {frame:true, width: CELL_WIDTH, height: CELL_WIDTH},
			        items: columnArray
			    });

			}
		},
		failure: Ext.emptyFn
	});

});
</script>
<body>

</body>
</html>
