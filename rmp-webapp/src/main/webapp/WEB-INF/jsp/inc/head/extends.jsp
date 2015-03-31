<%-- import the js of extends --%>
 
<%if(CONFIG_IS_DEBUG){ %>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-ux/Ext.ux.plugins.PageComboResizer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-ux/Ext.ux.Grid.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-ux/Ext.ux.SearchComboBox.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-ux/Ext.ux.TreeField.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-ux/Ext.ux.RowNumberer.js"></script> 

<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.ComboRenderer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.PagingToolbar.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.DictCombo.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.SelectCombo.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.ColorComboRenderer.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/ext-ux/Ext.ux.seraph.ChartPanel.js"></script>

<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/global.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/platform/action.js"></script>

<% }else{%>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-ux/extends.js"></script>
<%} %>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/styles/platform/main-icon.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/styles/platform/global-icon.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/baseGrid.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/global.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/global-icon.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/form.css"/>