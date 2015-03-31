<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style type="text/css">
.x-form-field-wrap {
    position:relative;
    left:0;top:0;
    text-align: left;
    zoom:1;
    white-space: nowrap;
    margin-left:10px;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/taskManager/quartzTask.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>