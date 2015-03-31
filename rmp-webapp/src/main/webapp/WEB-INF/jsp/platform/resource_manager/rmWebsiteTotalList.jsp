<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/ext-basex.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ajax.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>       
<script type="text/javascript">
	var type = '<%= request.getAttribute("type")%>';
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/rmWebsiteTotalManager.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGridSorter.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGridColumnResizer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGridNodeUI.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGridLoader.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGridColumns.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/treegrid/TreeGrid.js"></script>
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>