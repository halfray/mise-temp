<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@page import="com.neteast.rmp.dao.domain.DmCacheOverview"%>
<%@page import="com.neteast.rmp.dao.domain.DmDnsOverview"%>
<%@page import="com.neteast.rmp.dao.domain.ResourseView"%>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css"
			href="<%=request.getContextPath()%>/styles/platform/ui/base.css">
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/scripts/platform/resource_manager/ext-basex.js"></script>
		<script type="text/javascript"
			src="<%=request.getContextPath()%>/scripts/platform/resource_manager/Ajax.js"></script>
		<script type="text/JavaScript"
			src="<%=request.getContextPath()%>/scripts/platform/curvycorners.js"></script>
		<script type="text/JavaScript"
			src="<%=request.getContextPath()%>/scripts/platform/resource_analysis/tbWsM0003Total.js"></script>
		<script type="text/JavaScript">
	</script>
	
	</head>
	<body style="background-color: #FFFFFF">
		<% 
			ResourseView resourseView = (ResourseView) request .getAttribute("Resourse");
			DmCacheOverview dmCacheOverview = (DmCacheOverview) request.getAttribute("cacheMap");
			DmDnsOverview dmDnsOverview = (DmDnsOverview) request.getAttribute("DnsMap");
		%>
<div class="gdBox">
<div class="aaa">
<div class="background1">
	<div class="bgLeft"></div>
	<div class="bgRight"></div>
  <div class="webBox">
    <div class="webG">网站概览</div>
    <div class="webNum"><span class="num1" id="wscTotal"> </span><span></span></div>
    <div class="webFooter">
        <div><span class="webOut">网内</span><span class="webFootNum" id="wscIn"><%=resourseView.getWscIn()%></span></div>
        <div><span class="webOut">网内网外</span><span class="webFootNum"  id="wscInOut"><%=resourseView.getWscInOut()%></span></div>
        <div><span class="webOut">网外</span><span class="webFootNum"  id="wscOut"><%=resourseView.getWscOut()%></span></div>
    </div>
   </div>
</div>
</div>
<div class="aaa">
<div class="background2">
	<div class="bgLeft"></div>
    <div class="bgRight"></div>
  <div class="webBox">
    <div class="webG">域名概览</div>
    <div class="webNum"><span class="num2" id="dcTotal"><%=resourseView.getDcTotal()%></span><span></span></div>
    <div class="webFooter">
        <div><span class="webOut">网内</span><span class="webFootNum" id="dcIn"><%=resourseView.getDcIn()%></span></div>
        <div><span class="webOut">网内网外</span><span class="webFootNum" id="dcInOut"><%=resourseView.getDcInOut()%></span></div>
        <div><span class="webOut">网外</span><span class="webFootNum" id="dcOut"><%=resourseView.getDcOut()%></span></div>
    </div>
   </div>
</div>
</div>
<div class="aaa">
<div class="background3">
	<div class="bgLeft"></div>
    <div class="bgRight"></div>
  <div class="webBox">
    <div class="webG"><b>Cache</b></div>
    <div class="webNum"><span class="num3" id="cachebigfilenum"><%=dmCacheOverview.getCachebigfilenum()%></span><span></span></div>
    <div class="webFooter">
        <div><span class="webOut">HTTP</span><span class="webFootNum" id="cachebigfilehttpnum"><%=dmCacheOverview.getCachebigfilehttpnum()%></span></div>
        <div><span class="webOut">P2P</span><span class="webFootNum" id="cachebigfilep2pnum"><%=dmCacheOverview.getCachebigfilep2pnum()%></span></div>
        <div><span class="webOut">其他</span><span class="webFootNum" id="cachebigfil"><%=dmCacheOverview.getcachebigfil()%></span></div>
    </div>
   </div>
</div>
</div>

<div class="aaa">
<div class="background4">
	<div class="bgLeft"></div>
    <div class="bgRight"></div>
  <div class="webBox">
    <div class="webG">DNS热点上报</div>
    <div class="webNum"><span class="num4" id="dnshotnum"><%=dmDnsOverview.getDnshotnum()%></span><span></span></div>
    <div class="webFooter">
        <div><span class="webOut">频率</span><span class="webFootNum" id="dnshotnumfreq"><%=dmDnsOverview.getDnshotnumfreq()%></span>&nbsp;&nbsp;<span style="font-family:'微软雅黑'">分钟</span></div>
    </div>
   </div>
</div>
</div>


<div class="aaa">
<div class="background5">
	<div class="bgLeft"></div>
    <div class="bgRight"></div>
  <div class="webBox">
    <div class="webG">DNS处理域名</div>
    <div class="webNum"><span class="num5" id="dnsdomainnum"><%=dmDnsOverview.getDnsdomainnum()%></span><span></span></div>
   </div>
</div>
</div>
</div>
	</body>
	
<script type="text/javascript">
    //网站概览	
	document.getElementById('wscTotal').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getWscTotal()%>); //总数量
	document.getElementById('wscIn').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getWscIn()%>); //网内数量
	document.getElementById('wscInOut').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getWscInOut()%>); //网内网外数量
	document.getElementById('wscOut').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getWscOut()%>); //网外数量
	
	//域名概览	
	document.getElementById('dcTotal').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getDcTotal()%>); //总数量
	document.getElementById('dcIn').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getDcIn()%>); //网内数量
	document.getElementById('dcInOut').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getDcInOut()%>); //网内网外数量
	document.getElementById('dcOut').innerHTML = Main.fun.NumberFormatStr(<%=resourseView.getDcOut()%>); //网外数量
	
	//Cache	
	document.getElementById('cachebigfilenum').innerHTML = Main.fun.NumberFormatStr(<%=dmCacheOverview.getCachebigfilenum()%>); //总数量
	document.getElementById('cachebigfilehttpnum').innerHTML = Main.fun.NumberFormatStr(<%=dmCacheOverview.getCachebigfilehttpnum()%>); //HTTP数量
	document.getElementById('cachebigfilep2pnum').innerHTML = Main.fun.NumberFormatStr(<%=dmCacheOverview.getCachebigfilep2pnum()%>); //P2P数量
	document.getElementById('cachebigfil').innerHTML = Main.fun.NumberFormatStr(<%=dmCacheOverview.getcachebigfil()%>); //其他数量
	
	//DNS热点上报
	document.getElementById('dnshotnum').innerHTML = Main.fun.NumberFormatStr(<%=dmDnsOverview.getDnshotnum()%>); //总数量
	document.getElementById('dnshotnumfreq').innerHTML = Main.fun.NumberFormatStr(<%=dmDnsOverview.getDnshotnumfreq()%>); //频率
	
	//DNS处理域名
	document.getElementById('dnsdomainnum').innerHTML = Main.fun.NumberFormatStr(<%=dmDnsOverview.getDnsdomainnum()%>); //总数量

</script>
</html>