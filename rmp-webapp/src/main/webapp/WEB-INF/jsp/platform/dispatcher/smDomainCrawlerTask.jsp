<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style type="text/css">
.x-plain-bwrap {
    overflow:hidden;
    zoom:1;
    margin-right:0px;
}
.x-plain {
    overflow:hidden;
    margin-right:10px;
}
/*调整弹出grid样式*/
.x-grid3-row-checker, .x-grid3-hd-checker {
	margin-bottom:5px;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/dispatcher/smDomainCrawlerTask.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>     
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>    
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>