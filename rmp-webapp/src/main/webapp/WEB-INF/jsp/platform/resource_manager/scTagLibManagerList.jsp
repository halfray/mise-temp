<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style type="text/css">
.x-grid3-header {
    margin-top: 10px;    
}
.x-plain-bwrap {
    overflow:hidden;
    zoom:1;
    margin-right: 10px;
    width:auto;
}
/*grid选中颜色*/
.x-tree-node .x-tree-selected {
	background-color: #d9e8fb;
}
/*grid宽度(实际上线需要重新调-_-!)*/
.x-treegrid-root-node {
    overflow: auto;
    background-color:#f8f8f8;
    width:1155px;
}
</style>
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/ext-basex.js"></script>-->
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ajax.js"></script>-->
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       -->
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/common.js"></script>       -->
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>       -->
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/scTagLibManager.js"></script>
<!--<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/TreeCombobox.js"></script>-->
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>     
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.Grid.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.plugins.PageComboResizer.js"></script>  
<script>
	var path = '<%=request.getContextPath()%>';
</script>  
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>