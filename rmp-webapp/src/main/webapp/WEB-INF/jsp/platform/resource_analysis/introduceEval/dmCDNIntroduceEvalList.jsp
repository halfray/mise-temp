<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<%
Object userInfo=session.getAttribute("orgCode");
%>
<script type="text/javascript">
var orgCode = "<%=userInfo%>";
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/override/ExtFormFieldTips.js"></script>  
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/ColumnHeaderGroup.js"></script>  
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.plugins.PageComboResizer.js"></script>         
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.Grid.js"></script> 
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/introduceEval/cdn/introduceListing/IntroduceListingSearchFormPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/introduceEval/cdn/introduceListing/IntroduceListingGridPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/introduceEval/cdn/searchFormPanel.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/introduceEval/cdn/dmCDNIntroduceEval.js"></script>
</head>
<style>
.x-panel-btns td.x-toolbar-cell {
    /*background: none;*/
    padding:0 0 0 5px;
}
.x-tree-node a span, .x-dd-drag-ghost a span {
    color: #000000;
}
.btn_more_background {
    background:URL(<%=request.getContextPath()%>/scripts/ext-3.3.1/resources/images/default/button/btn_more_background.png);
    margin-top:4px;
}
.x-btn-mc em.x-btn-arrow {
    background-image:none;
}
.import-icon{
	background:URL(<%=request.getContextPath()%>/scripts/ext-3.3.1/resources/images/default/toolbar/import_icon.png);
}
.x-btn-text-icon .x-btn-icon-small-left .x-btn-text{
    padding-left: 25px;
}
.x-form-item label.x-form-item-label {
    display:block;
    float:left;
    width:100px;
    padding:3px;
    margin-right:2px;
    clear:left;
    z-index:2;
    position:relative;
}
</style>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>