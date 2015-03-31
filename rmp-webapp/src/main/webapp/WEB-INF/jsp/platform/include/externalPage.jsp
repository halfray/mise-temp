<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>External Page</title>
</head>
<style type="text/css">
	html, body {
		font: normal 11px verdana;
		background-color: #dfe8f6;
	}
</style>
<script type="text/javascript">

var link = '<c:out value="${resultMap.link}" />';

</script>
<body>
	<div id="content" >
		<iframe id="content" scrolling="auto" width="100%" height="100%" src='<c:out value="${resultMap.link}" />'></iframe>
	</div>
</body>
</html>
