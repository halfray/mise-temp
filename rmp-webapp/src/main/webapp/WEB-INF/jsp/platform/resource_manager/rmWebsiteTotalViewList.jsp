<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/ext-basex.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ajax.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/utils/main-funs-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ext.ux.self.FormEditorGrid.js"></script>       
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_manager/rmWebsiteTotalView.js"></script>
<style type="text/css">
	html, body {
		font: normal 11px verdana;
		background-color: #dfe8f6;
	}
	#main-panel .x-table-layout td {
    vertical-align:top;
    padding:5px;
    font-size: 11px;}
    
    #main-panel .x-grid3-hd-row td
    {
    	 padding:0px;
    }
</style>
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