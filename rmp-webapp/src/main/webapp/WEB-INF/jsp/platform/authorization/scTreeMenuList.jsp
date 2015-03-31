<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="../includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>菜单信息</title>
<script type="text/javascript" src="scripts/platform/authorization/scTreeMenu.js"></script>
    <script type="text/javascript" src="scripts/ext-3.3.1/ux/RowEditor.js"></script>
    <link rel="stylesheet" href="scripts/ext-3.3.1/ux/css/RowEditor.css" />
    
<style type="text/css">
body {
	margin: 0px;
	overflow: hidden;
}

.grid {
	top: 0px;
	left: 0px;
}

.div-link {
	color: #0000FF;
	cursor: pointer;
}

.div-link :hover {
	text-decoration:underline;
}

#content {
	width: 100%;
	height: 100% !important; height: 100%;
}
</style>        
</head>
<body>
<div id="content">
    <div id="user-grid"></div>
</div>
</body>
</html>