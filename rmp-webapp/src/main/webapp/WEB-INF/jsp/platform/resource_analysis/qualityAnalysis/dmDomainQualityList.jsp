<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/qualityAnalysis/dmDomainQualityCallTest.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/qualityAnalysis/dmDomainQuality.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
</head>
<style>
.x-panel-btns td.x-toolbar-cell {
    background:none;
    padding: 3px 8px 3px 3px;
}
.btn_more_background {
    background:URL(<%=request.getContextPath()%>/scripts/ext-3.3.1/resources/images/default/button/btn_more_background.png);
    margin-top:4px;
}
/*去掉more上的小三角*/
.x-btn-mc em.x-btn-arrow {
    background-image:none;
}
</style>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>