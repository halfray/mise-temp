<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>角色菜单管理</title>
<style>
/*修改editorgrid提交，取消按钮背景图片位置*/
.x-plain-bwrap {
    overflow: hidden;
     margin-right: 0;
}
</style>
<link rel="stylesheet" href="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/css/RowEditor.css" />
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/RowEditor.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/systemconfig/scRoleMenu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.RowEditorGrid.js"></script>       
</head>
<style>
.x-tree-node a span, .x-dd-drag-ghost a span{
	color:#000;
	margin-left: -5px;
}
.x-unselectable, .x-unselectable * {
    -moz-user-select: none;
    text-align: left;
}
input.x-tree-node-cb {
    height: 19px;
    margin-left: 4px;
    vertical-align: text-bottom;
}
</style>
<body>
	<div id="content">
	    <div id="user-grid"></div>
	</div>
</body>
</html>