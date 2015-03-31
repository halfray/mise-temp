<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>Homepage</title>
</head>
<link rel="stylesheet" type="text/css" href="styles/dashboards/dashboard-icon.css"/>
<style type="text/css">
	html, body {
		font: normal 11px verdana;
		background-color: #dfe8f6;
	}
	#main-panel td {
		padding: 5px;
	}
	.hidden-cls {
		visibility: hidden;
		display: none;
	}
	#main-panel {
		top: 0px;
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
var CELL_WIDTH = 300;
var CELL_HEIGHT = 300;

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

var Panel = {

	show : function() {

	var HtmlCreator = {
		create : function(id, href){
			return '<iframe id=\'content' + id + '\' style="overflow: auto;" width="100%" height="100%" src=' + href + '></iframe>';		
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

	var columnArray = new Array();

	var cell1 = {
		id: '1',
		title: '存款余额',
		autoScroll: false,
		width: Calculator.getWidth(CELL_WIDTH, PADDING, 3),
		height: Calculator.getHeight(CELL_HEIGHT, PADDING, 2),
		colspan: 3,
		rowspan: 2,
		collapsible: true,
		tools: tools,
		html: HtmlCreator.create('1', 'indicatorDemoData.do?category=6')
	};

	var cell2 = {
		id: '2',
		title: '贷款余额',
		autoScroll: false,
		width: Calculator.getWidth(CELL_WIDTH, PADDING, 1),
		height: Calculator.getHeight(CELL_HEIGHT, PADDING, 1),
		//colspan: 1,
		//rowspan: 1,
		collapsible: true,
		tools: tools,
		html: HtmlCreator.create('2', 'indicatorDemoData.do?category=7')
	};

	var cell3 = {
		id: '3',
		title: '客户基本信息',
		autoScroll: false,
		width: Calculator.getWidth(CELL_WIDTH, PADDING, 1),
		height: Calculator.getHeight(CELL_HEIGHT, PADDING, 1),
		//colspan: 1,
		//rowspan: 1,
		collapsible: true,
		tools: tools,
		html: HtmlCreator.create('3', 'simpleUserInfo.do')
	};

	columnArray.push(cell1);
	columnArray.push(cell2);
	columnArray.push(cell3);	

	// For IE6+ add empty cell of total column
	for(var i = 0; i < COLUMN_COUNT; i++) {
		var cell = {
			baseCls: 'hidden-cls',
			bodyStyle: 'visibility: hidden;display: none;',
			autoScroll: false
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
}

</script>
<body onload="Panel.show();" style="overflow-x: hidden;">
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