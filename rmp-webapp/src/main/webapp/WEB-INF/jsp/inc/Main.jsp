<%@page pageEncoding="UTF-8" %>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/inc/jsonrpc/JSONRPC.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/inc/constants/Constants.js"></script>
<script type="text/javascript" src="<%=request.getContextPath()%>/scripts/inc/report/Report.js"></script>
<script language='javascript'>
Ext.ns('M');
Ext.ns('Main');
Ext.ns('base');
//系统信息对象

//环境变量
Main.contextPath = '<%=request.getContextPath() %>';

//jsonrpc信息
Ext.ns('Main.jsonrpc');
Main.jsonrpc.path = "<%=request.getContextPath() %>/JSONRPC.do";
Main.jsonrpc.jsonRpcClient = new JSONRpcClient(Main.jsonrpc.path);

//jsloader 信息
//Main.jsLoader=new JsLoader();

//frame 信息
Ext.ns('Main.frame');

//常用变量
M.rpc =  Main.jsonrpc.jsonRpcClient;
M.rpc.path = Main.jsonrpc.path;

M.report = Report.report;
</script>