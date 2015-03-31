<%if(CONFIG_IS_DEBUG){ %>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/utils/MathUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/utils/ArrayUtil.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/utils/main-funs-debug.js"></script>
<% }else{%>
<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/utils/funs.js"></script>
<%} %>
