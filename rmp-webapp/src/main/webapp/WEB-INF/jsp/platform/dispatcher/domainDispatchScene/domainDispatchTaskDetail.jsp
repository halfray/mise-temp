<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link type="text/css" rel="stylesheet" href="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/flow.css"></link>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/main-funs-debug.js"></script>
<script type="text/javascript">
var uxParams = <c:out value="${uxParams}" escapeXml="false" />;
var resultJsonObject={};   

for(var attr in uxParams){   

	resultJsonObject[attr]=uxParams[attr];   
}   
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/stateStores.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage0.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage2.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage4.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/getPages/getPage5.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/domainDispatchScene/domainDispatchTaskDetail.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>       
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
	<div class="flow_title">
	<div class="flow_btn1"><a href="#"></a></div>
		<div class="flow_btn2 juli"><a href="#"></a></div>
		<div class="flow_btn3 juli"><a href="#"></a></div>
		<div class="flow_btn4 juli"><a href="#"></a></div>
	</div>
</body>
</html>
