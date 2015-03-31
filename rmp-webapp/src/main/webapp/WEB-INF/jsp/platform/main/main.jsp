<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html>
<head>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>互联网资源管理平台</title>

<link rel="stylesheet" type="text/css" href="styles/platform/main-icon.css" />
<link rel="stylesheet" type="text/css" href="styles/platform/global-icon.css" />

<link rel="stylesheet" type="text/css" href="scripts/ext-3.3.1/ux/statusbar/css/statusbar.css" />
<script type="text/javascript" src="scripts/ext-3.3.1/ux/statusbar/StatusBar.js"></script>

<link rel="stylesheet" type="text/css" href="scripts/ext-3.3.1/ux/css/tab-scroller-menu.css" />
<script type="text/javascript" src="scripts/ext-3.3.1/ux/TabCloseMenu.js"></script>
<script type="text/javascript" src="scripts/ext-3.3.1/ux/TabScrollerMenu.js"></script>

<link rel="stylesheet" type="text/css" href="scripts/ext-3.3.1/ux/css/MultiSelect.css"/>
<script type="text/javascript" src="scripts/ext-3.3.1/ux/MultiSelect.js"></script>
<script type="text/javascript" src="scripts/ext-3.3.1/ux/ItemSelector.js"></script>

<script type="text/javascript" src="scripts/platform/main/user-application.js"></script>
<script type="text/javascript" src="scripts/platform/main/mainRandom.js"></script>
<script type="text/javascript" src="scripts/platform/security/logout.js"></script>

<style type="text/css"><!--

html, body {
	font:normal 12px verdana;
	margin:0;
	padding:0;
	border:0 none;
	overflow:hidden;
}
    
.top-icon-cls {
    float: right;
    margin-top: 10px;
    margin-right: 6px;
    cursor: pointer;
    font-weight:  bold;
    color: white;
}

.user-cls {
    float: right;
    margin-top: 10px;
    margin-right: 6px;
    cursor: pointer;
    color: white;
}

#west {
	height: 100%;
}
	
#north {
	/*background-image:url(images/platform/hd-bg.gif);
	background: #7F99BE url(images/platform/layout-browser-hd-bg.gif) repeat-x center;*/
}
	
.link-style ul li {
	cursor:pointer;
	padding-left: 20px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 0px;
	background-image:url(images/platform/shared/icons/fam/folder_go.png) no-repeat;
	color: #000066;
}
	
.link-style ul li span a:hover a:hover {
	color: red;
}

#center2 {
	width: 100%;
	height: 100%;
}

-->
</style>
<script type="text/javascript">

var userCode = '<c:out value="${userCode}" />';
var userName = '<c:out value="${userName}" />';

var regard = new Ext.Toolbar.TextItem('你好! ' + userName);
var clock = new Ext.Toolbar.TextItem('');

</script>
</head>
<body>
	<div id="west"></div>
	<div id="tree1"></div>
	<div id="tree2"></div>
	<div id="logout-window"></div>
	<div id="north">
		<h2 style="padding-top: 10px;padding-left: 10px;color: #FFFFFF;float: left;">中国移动广东公司 - 互联网内容资源管理平台</h2>
		<img class="top-icon-cls" src="images/platform/icon/question_frame.png" onclick="var href = window.location.href;helpWindow.show(href);" ext:qtip="帮助" />
		<img class="top-icon-cls" src="images/platform/icon/key__minus.png"  onclick="LogoutPanel.show();" ext:qtip="退出" />
		<img class="top-icon-cls" src="images/platform/icon/arrow_circle_double.png"  onclick="window.location.reload();" ext:qtip="刷新" />
	</div>
	<div id="center2">
	    <div id="tabs"></div>
	</div>
	<div id="user-detail-window">
		<div id="user-detail-form"></div>
	</div>
	<div id="user-pwd-window">
		<div id="user-pwd-form"></div>
	</div>
	<div id="user-auth-window">
		<div id="user-auth-form"></div>
	</div>
	<div id="user-style-window">
		<div id="user-style-form"></div>
	</div>
	<form id="logout-form" action="security/j_acegi_logout" method="post"></form>
</body>
</html>
