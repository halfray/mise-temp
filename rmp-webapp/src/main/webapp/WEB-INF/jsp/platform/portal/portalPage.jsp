<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/scripts/inc/portal/PortalJSLoader.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/scripts/inc/portal/PortalLinkLoader.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/scripts/inc/portal/PortalPage.js"></script>
	
<link type="text/css" rel="stylesheet" 
	href="<%=request.getContextPath()%>/styles/platform/form.css"/>
</head>
<%@ include file="/WEB-INF/jsp/platform/portal/abstractPortal.jsp"%>
<script type="text/javascript">
	var paramsValue = '<%=request.getAttribute("parms")%>';
	var params = Main.fun.params2Json(paramsValue);
	var loader;
	function noticeHandler(params) {
		var data = {};
		if (typeof (params) == "string") {
			eval('data = ' + params);
		} else if (typeof (params) == 'object') {
			data = params;
		}
		Main.fun.tryRun(function(){return !Ext.isEmpty(loader)},function(){loader.refresh(data);});
	};
	var noticeNeighbour = function(params) {
		// 通知邻居Cell,并传递参数
		parent.EventHandler.cellLevelNotice(cellId, params);
	}
	Ext.onReady(function() {
		Ext.QuickTips.init();
		
		var jshref = params.js;
		//没有js则停止运行
		if (Ext.isEmpty(jshref)) {
			document.write('没有要展示的js参数信息');
			return;
		}
		//加载js
		loader = new Main.portal.PortalJSLoader(jshref, params);
		loader.success = function() {
			//创建通知方法
			loader.createNotice(window, noticeNeighbour);
			//先执行渲染方法
			loader.render('content');
			//后执行运行方法
			loader.run();
		};
		loader.load();
		//加载link样式
		loaderSty = new Main.portal.PortalLinkLoader(jshref);
		loaderSty.load();
	});
</script>
<body>
	<div id="content"></div>
</body>
</html>