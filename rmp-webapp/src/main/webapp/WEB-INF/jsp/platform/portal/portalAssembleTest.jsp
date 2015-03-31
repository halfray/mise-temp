<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<%@ include file="/WEB-INF/jsp/platform/portal/abstractPortal.jsp"%>
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
</style>
<script type="text/javascript">

var parmCodeArray = <c:out value="${scPortalSty.id}" escapeXml="false" />;

function noticeHandler() {
	// arguments[0]是传递给你的参数
	$("text1").value = arguments[0];
}

function noticeNeighbour() {
	// 通知邻居Cell,并传递参数
	parent.EventHandler.cellLevelNotice(cellId, "parm1=1");
}

</script>
<body>

<p><c:out value="${cellId}" escapeXml="false" /></p>
<p><c:out value="${scPortalSty.id}" escapeXml="false" /></p>
<input id="text1" type="text" value="text" />
<input id="button1" type="button" value="button" onclick="noticeNeighbour();" />

</body>
</html>
