<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.plugins.PageComboResizer.js"></script>   
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.Grid.js"></script>   
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/d3/d3.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_statistics/d3treemodule.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_statistics/dmNetsiteLibrariesDetail.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.FormEditorGrid.js"></script>   
    <style type="text/css">
g.node
{
	cursor: pointer;
}

.node circle {
  cursor: pointer;
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node {
  font-size: 11px;
}

path.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}

    </style>
</head>
<body style="overflow: auto;">
	<table id="content" width="100%">
		<tr>
			<td align="center" valign="middle">
				<div id="user-grid" > </div>
			</td>
		</tr>
	</table>
	<div id="preview-el"></div>
</body>
</html>