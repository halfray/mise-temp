<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript">
var uxParams = <c:out value="${uxParams}" escapeXml="false" />;
var resultJsonObject={};   

for(var attr in uxParams){   

	resultJsonObject[attr]=uxParams[attr];   
}   
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/queryCrawlerTask.js"></script>
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>