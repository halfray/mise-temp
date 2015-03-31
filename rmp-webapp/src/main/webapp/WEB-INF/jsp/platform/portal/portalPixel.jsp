<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title><c:out value="${scPortalSty.portalTitle}" /></title>
</head>
<link rel="stylesheet" type="text/css" href="styles/platform/dashboard-icon.css"/>
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

var PreviewRobot = {

	takeLook : function(id, href) {
		
		var previewWin = new Ext.Window({
			contentEl: 'preview-el',
			iconCls: 'dashboard-preview-icon',
			resizable: true,
			title: 'Inspect',
			width: 450,
			height: 400,
			closeAction: 'hide',
			html: this.htmlCreate(id, href)
		});
		previewWin.show();
	},

	htmlCreate : function(id, href) {
		return '<iframe id=\'' + id + '\' scrolling="auto" width="100%" height="100%" src=' + href + '></iframe>';
	}
}

var COLUMN_COUNT = 3;
var PADDING = 5;
var CELL_WIDTH = 150;
var CELL_HEIGHT = 150;

var columnCount = <c:out value="${scPortalSty.columnCount}" />;
var padding = <c:out value="${scPortalSty.padding}" />;
var cellWidth = <c:out value="${scPortalSty.cellWidth}" />;
var cellHeight = <c:out value="${scPortalSty.cellHeight}" />;

if(columnCount != null) COLUMN_COUNT = columnCount;
if(padding != null) PADDING = padding;
if(cellWidth != null) CELL_WIDTH = cellWidth;
if(cellHeight != null) CELL_HEIGHT = cellHeight;

var Calculator = {

	getWidth : function(cellWidth, padding, colNum) {
		var difference = padding*2*colNum;
		return cellWidth*colNum - 10;
	},

	getHeight : function(cellHeight, padding, rowNum) {
		var difference = padding*2*rowNum;
		return cellHeight*rowNum - 10;
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
	    	var frameId = 'content' + panel.getId();
	        var href = $(frameId).src;
			PreviewRobot.takeLook(frameId, href);
        }
    },{
        id:'refresh',
        handler: function(e, target, panel){
	    	var frameId = 'content' + panel.getId();
	        $(frameId).src = $(frameId).src;
    	}
    }];

	Ext.Ajax.request({
		url: 'portalStatefulProvider.do?portalCode=<c:out value="${scPortalSty.portalCode}" />',
		success: function(response) {
		
			var list = response.responseText.evalJSON();
			
			var columnArray = new Array();
			if(list != null) {
	
				for(var i = 0; i < list.length; i++) {
					var cell = {
						id: list[i].id,
						title: list[i].title,
						autoScroll: true,
						width: Calculator.getWidth(CELL_WIDTH, PADDING, list[i].colNum),
						height: Calculator.getWidth(CELL_HEIGHT, PADDING, list[i].rowNum),
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
			        renderTo: 'portal-el',
			        layout:'table',
			        layoutConfig: {columns: COLUMN_COUNT},
			        defaults: {frame: true, width: CELL_WIDTH, height: CELL_HEIGHT},
			        items: columnArray
			    });

			}
		},
		failure: Ext.emptyFn
	});

});

</script>
<body style="overflow: auto;">
	<table id="content" width="100%">
		<tr>
			<td align="center" valign="middle">
				<div id="portal-el"></div>
			</td>
		</tr>
	</table>
	<div id="preview-el"></div>
</body>
</html>
