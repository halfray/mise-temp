<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/security/login.js"></script>

<style type="text/css">
html,body {
	font: normal 12px verdana;
	margin: 0;
	padding: 0;
	border: 0 none;
	overflow: hidden;
	height: 100%;
	background-color: #cbddf3;
}

.top-icon-cls {
	float: right;
	margin-top: 10px;
	margin-right: 6px;
	cursor: pointer;
}

#west {
	height: 100%;
}

/*#north {
	height: 35px;
	background-image: url(<%=request.getContextPath()%>/images/platform/hd-bg.gif);
}*/

.required {
	background-color: #DFE8F6;
}

</style>

</head>
<body onload="LoginPanel.init();">
	<div id="north">
		<h2 style="padding-top: 10px;padding-left: 10px;color: #FFFFFF;float: left;">RMP-互联网内容资源管理平台</h2>
		<img class="top-icon-cls" src="<%=request.getContextPath()%>/images/platform/icon/question_frame.png" onclick="var href = window.location.href;helpWindow.show(href);" ext:qtip="帮助" />
		<img class="top-icon-cls" src="<%=request.getContextPath()%>/images/platform/icon/key__plus.png"  onclick="LoginPanel.show();" ext:qtip="登录" />
	</div>
	<div id="login-window">
		<div id="login-form"></div>
	</div>
</body>
</html>
