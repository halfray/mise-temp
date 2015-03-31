<%-- import the css of ext --%>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/Ext-default-before.css"/>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/scripts/ext-3.3.1/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/Ext-default-after.css"/>

<%if(CONFIG_IS_DEBUG){ %>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/adapter/ext/ext-base-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/ext-all-debug.js"></script>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/css/ux-all.css"/>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/ux/ux-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/inc/ext-override/Ext-ux.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/config/config.js"></script>
<% }else{%>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/adapter/ext/ext-base-debug.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/ext-all-debug.js"></script>
<%} %>

<script type="text/javascript">Ext.BLANK_IMAGE_URL='<%=request.getContextPath()%>/scripts/ext-3.3.1/resources/images/default/tree/s.gif';</script>

<%-- import the js of ext --%>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/ext-3.3.1/src/locale/ext-lang-zh_CN.js" charset="utf-8"></script>