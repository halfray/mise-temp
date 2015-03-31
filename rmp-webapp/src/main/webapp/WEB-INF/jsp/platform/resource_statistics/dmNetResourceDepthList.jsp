<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<%
Object userInfo=session.getAttribute("orgCode");
%>
<script type="text/javascript">
var orgCode = "<%=userInfo%>";
</script>
<style type="text/css">
/*网站类型叶子节点颜色*/
.x-tree-node a span, .x-dd-drag-ghost a span{
	color:#000000;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_statistics/dmNetResourceDepth.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/ColumnHeaderGroup.js"></script>             
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>