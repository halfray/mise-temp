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
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/ArrayUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/main-funs-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/RadioGroup.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage0.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage1.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage2.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage4.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/getPage5.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/rmTaskGroupManager.js"></script>
<style>
        .x-form-unit {  
            height: 22px;  
            line-height: 22px;  
            padding-left: 2px;  
            display: inline-block;  
            display: inline;  
        } 
</style>
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