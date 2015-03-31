<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>机构信息表</title>
<style>
/*修改editorgrid提交，取消按钮背景图片位置*/
.x-plain-bwrap {
    overflow: hidden;
     margin-right: 0;
}
 
.x-row-editor-body {
	background-color:none;
    overflow: hidden;
    padding-top: 2px;
    background: url("<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/images/row-editor-body.png") repeat-x scroll 0 0 rgba(0, 0, 0, 0);
}
</style>
<link rel="stylesheet" href="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/css/RowEditor.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/RowEditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/systemconfig/scOrg.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.RowEditorGrid.js"></script>       
</head>
<body>
	<div id="content">
	    <div id="user-grid"></div>
	</div>
</body>
</html>