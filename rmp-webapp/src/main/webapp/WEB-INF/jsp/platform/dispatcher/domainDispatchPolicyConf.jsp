<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style>
.x-grid3-scroller {
	border-top: 1px solid #1279CA;
    zoom:1;
    position:relative;
    }
.policyConfButton{
	margin-top:40px;
	margin-left:15px;
	}
.policyConfButton img{
	margin:10px 0px;
	}
	
.x-panel-body-noheader, .x-panel-mc .x-panel-body {
	background-color:#f8f8f8;
}
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/main-funs-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/stateStores.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/utils/MessageBox.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/domainDispatchPolicyConf/domainDispatchPolicyConfDetail.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/schedule_manager/domainDispatchPolicyConf/domainDispatchPolicyConf.js"></script>
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>
