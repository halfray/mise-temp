<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/anychart/AnyChart.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/anychart/AnyChartUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/main-funs-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/anyChart/MapData.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/anyChart/PieData.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/anyChart/BarData.js"></script>      
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/allProvinceResourcesBC.js"></script>
</head>
<body style="overflow: auto;">
	<table id="content" width="100%">
		<tr>
			<td align="center" valign="middle">
				<div id="user-grid"></div>
			</td>
		</tr>
	</table>
	<div id="preview-el"></div>
</body>
</html>