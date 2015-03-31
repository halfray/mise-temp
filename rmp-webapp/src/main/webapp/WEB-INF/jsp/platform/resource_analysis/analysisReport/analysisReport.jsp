<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/main.css">
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/ui/web_basic_situation.css">
	<!--<link rel="stylesheet" type="text/css" href="test.css">-->
	<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/ext-basex.js"></script>
	<%@ include file="/WEB-INF/jsp/platform/portal/abstractPortal.jsp"%>
	<script type="text/JavaScript">
	  function noticeHandler(params) {
		var data = {};
		if (typeof (params) == "string") {
			eval('data = ' + params);
		} else if (typeof (params) == 'object') {
			data = params;
		}
		getChartData(data);	
		//Main.fun.tryRun(function(){return !Ext.isEmpty(loader)},function(){loader.refresh(data);});
	 };
	 var noticeNeighbour = function(params) {
		// 通知邻居Cell,并传递参数
		parent.EventHandler.cellLevelNotice(cellId, params);
	 }
	</script>
	<script type="text/JavaScript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/analysisReport/analysisReport.js"></script>
</head>
<body>
	<div>
		<div id='baseTotal' style="width:32%" ></div>
		<div class="wrapper1" id='domainNumChart' style="width:32%" > </div>
		<div class="wrapper1" id='URLNumChart' style="width:32%" > </div>
		<div class="wrapper1" id='URLSizeChart' style="width:32%" > </div>
		
		<div class="wrapper1" id='bigfileNumChart' style="width:32%" > </div>
		<div class="wrapper1" id='bigfileSizeChart' style="width:32%" > </div>
	</div>
</body>
</html>