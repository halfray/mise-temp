<%@ page language="java" contentType="text/html; charset=utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<%@ include file="/WEB-INF/jsp/inc/head/head.jsp"%>
	<%@ include file="/WEB-INF/jsp/inc/main/Main.jsp"%>
	
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/scripts/ext-3.3.1/ux/css/tab-scroller-menu.css" />
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/ux/TabCloseMenu.js"></script>
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/ext-3.3.1/ux/TabScrollerMenu.js"></script>
	
	<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/scripts/inc/frame/topNavigation.css" />
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/PageLoader.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/leftPanel.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/topPanel.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/MainPanel.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/bottomPanel.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/LogoutPanel.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/platform/global.js"></script>    
	<script type="text/javascript" src="<%=request.getContextPath() %>/scripts/inc/frame/frame.js"></script>    
	<script type="text/javascript" src="scripts/platform/main/user-application.js"></script>
	<script type="text/javascript" src="scripts/platform/main/mainRandom.js"></script>
	<script language='javascript'>
	var userCode = '<c:out value="${userCode}" />';
	var userName = '<c:out value="${userName}" />';
	
    var mainName="main_render";
      document.title='互联网资源管理平台';
      
      function showHTML(){
    	  var conf = {
					href : "<%=request.getContextPath() %>/reports/网站分析区间固网.html",
					text:  "网站分析区间固网"
				};
    	  Main.frame.centerPanel.loadPage(conf);
      }

      Ext.Ajax.request({
  	   	url: 'baseLoginInfoController.do',
  			success: function(response) {
  				var userInfo = response.responseText.evalJSON();
  				var userName = userInfo.userName;

  				var date_time = new Date().format('Y-m-d H:i:s');//具体时间 日期
  				var date_day = null;//周几
  				var arr_week=new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六"); 
  				date_day =arr_week[new Date().getDay()];
  				document.getElementById('userPanel').innerHTML =  '<div class="welcomeBox">'
							  					+'<div class="manIcon "></div>'
							  					+'<ul class="info">'
							  					+'<li>欢迎您！<span>' + userName + '</span></li>'
							  					+'<li>登录时间：<span>' + date_day + '</span></li>'
							  					+'<li id="clock">' + date_time + '</li>'
//							  					+'<li id="htmlID"><a href="#" onclick=showHTML();>点击下载</a></li>'
							  					+'<li id="htmlID"><a href="#" onclick=changeS();>点击换肤</a></li>'
							  					+'</ul>'
							  					+'</div>';
  			}
  	});

      function ShowTime(){
    	  setTimeout("ShowTime()",1000);
    	  document.getElementById("clock").innerHTML = new Date().format('Y-m-d H:i:s');
      }
      UserStyle.create();
      function changeS(){
    	  UserStyle.show();
          }
	 </script>
	 
	 <style type="text/css"><!--

html, body {
	font:normal 12px verdana;
	margin:0;
	padding:0;
	border:0 none;
	overflow:hidden;
}
    
.top-icon-cls {
    float: left;
    margin-top: 55px;
    margin-right: 5px;
    cursor: pointer;
    font-weight:  bold;
    color: white;
}

.user-cls {
    float: right;
    margin-top: 10px;
    margin-right: 6px;
    cursor: pointer;
    color: white;
}

#west {
	height: 100%;
}
	
	
.link-style ul li {
	cursor:pointer;
	padding-left: 20px;
	padding-top: 5px;
	padding-bottom: 5px;
	padding-right: 0px;
	background-image:url(images/platform/shared/icons/fam/folder_go.png) no-repeat;
	color: #000066;
}

#center2 {
	width: 100%;
	height: 100%;
}


--></style>
<!--<script type="text/javascript">
	var login=<c:out value="${login}">;
	var id=document.getElementById("login");
	id.value=login;
	alert(login);
</script>
-->
<style>
*{margin:0px;padding:0px;font-family:"微软雅黑";}
li{
	list-style:none;}

.manIcon,.info{
	float:left;}
.manIcon{
	background:url(images/platform/icon.png) no-repeat;
	width:36px;
	height:42px;
	margin-right:15px;
	margin-top:5px;}
.info{
	vertical-align:middle;}
.navigation_right{
	float:right;
	margin-right:15px;
}
</style>
</head>
<body onLoad="ShowTime()">
<div id="north">
<div class="titleLogo">

<!--
	<span id="logo"></span>
	<span id="title">
		<span id="platform">互联网内容资源管理平台</span><br>
		<span id="province"><%=request.getAttribute("login") %></span>
	</span>-->
		<div class="navigation_right">
			<ul id="navigation"></ul>
			<img class="top-icon-cls" src="images/platform/icon/arrow_circle_double_2.png" onclick="window.location.reload();" ext:qtip="刷新" />
			<img class="top-icon-cls" src="images/platform/icon/question_frame_2.png" onclick="var href = window.location.href;helpWindow.show(href);" ext:qtip="帮助" />
		 	<img class="top-icon-cls" src="images/platform/icon/key_minus_2.png" onclick="LogoutPanel.show();" ext:qtip="退出" />
		</div>
	</div>
	<div id="user-style-window">
		<div id="user-style-form"></div>
	</div>
	<div id="main_render" style=" position:absolute; top:50%; right:50%;"></div>

</div>
<form id="logout-form" action="security/j_acegi_logout" method="post"></form>
</body>
</html>
