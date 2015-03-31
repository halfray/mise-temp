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
	.hidden-cls {
		visibility: hidden;
		display: none;
	}
	#main-panel {
		top: 0px;
	}
	.x-table-layout td {
		padding: <c:out value="${scPortalSty.padding}" />px;
	}
</style>
<script type="text/javascript">

Ext.onReady(function(){
	var panel=new Ext.Panel({
	renderTo:"portal-el",
	title:"容器组件",
	width:600,
	height:600,
	layout:"table",
	layoutConfig: {
	columns: 3
	},
	items:[
		{title:"子元素1",html:"这是子元素1中的内容", rowspan:1, colspan:2, width: 200, height:100},
		{title:"子元素2",html:"这是子元素2中的内容", rowspan:1, colspan:1, width: 100, height:100},
		{title:"子元素3",html:"这是子元素3中的内容", rowspan:1, colspan:1, width: 100, height:100},
		{title:"子元素4",html:"这是子元素4中的内容", rowspan:1, colspan:1, width: 100, height:100}
	] }
	);
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





