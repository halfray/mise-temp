<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>登录</title>
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath()%>/styles/platform/login.css"/>
<script type="text/javascript">
function changeCapatchaImg()
{
	var capatchaElement = document.getElementById('capatcha');
	capatchaElement.setAttribute('src','captcha.do?code='+Math.random());
}
function validNull(){
	var j_username=document.getElementById('j_username').value;
	var j_password=document.getElementById('j_password').value;
	var j_captcha=document.getElementById('j_captcha').value;
	if(j_username==null || j_username==""){
		Ext.MessageBox.alert("系统提示：","用户名为空，请重新填写。");
		return false;
	}
	
	if(j_password==null || j_password==""){
		Ext.MessageBox.alert("系统提示：","密码为空，请重新填写。"); 
		return false;
	}
	if(j_captcha==null || j_captcha==""){
		Ext.MessageBox.alert("系统提示：","验证码为空，请重新填写。"); 
		return false;
	}
	return true;
}
function formSubmit(){
	if(!validNull()){
		return;
	}
	var capatcha = document.getElementById('j_captcha').value;
	//if(capatcha != "RkJMSnV+"){ //万能验证码
		
	//}
	
	var valida =M.rpc._call("checkJCapatchaAction.check",capatcha);
	 changeCapatchaImg();
	if(!valida)
	{	  
		Ext.Msg.show({title:'登录失败! 原因:', icon: Ext.MessageBox.WARNING,msg:"验证码不正确，请重新填写。",buttons: Ext.MessageBox.OK});
		document.getElementById('j_captcha').focus(true);
		document.getElementById('j_captcha').value=''; //验证码置空
		return ;
	}
	
    var rememberMeElement = document.getElementById('_acegi_security_remember_me');
    
    var rememberMe = null;
    if(rememberMeElement.checked) {
    	rememberMe = rememberMeElement.value;
    }
    
    Ext.Ajax.request({
		   url: 'j_acegi_security_check',
		   success: function(response) {
		   		var messager = response.responseText.evalJSON();
		   		if(messager.success) {
		   			//Ext.MessageBox.alert("登录成功!："); 
	                location.href = messager.contents.targetUrl;
		   		} else {
	  		   		//Ext.MessageBox.alert("登录失败! 原因:"+messager.contents.error);
		   			Ext.Msg.show({title:'登录失败! 原因:', icon: Ext.MessageBox.WARNING,msg:messager.contents.error,buttons: Ext.MessageBox.OK});
		   		}
		   },
		   params: {j_username: document.getElementById('j_username').value, j_password: document.getElementById('j_password').value, _acegi_security_remember_me: rememberMe, ajax: true}
		});
	return;
}
function init(){
	wheight=window.innerHeight;
	bclientheight=document.body.clientHeight;
	if(wheight>bclientheight){
		paddingTopValue=(wheight-bclientheight)/2;
		//alert(wheight+"======"+bclientheight+"_____"+ document.body.offsetHeight);
		obj = document.getElementById('l_content');
		obj.style.paddingTop=paddingTopValue+"px";
	}
}
document.onkeypress=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
     if(e && e.keyCode==13){ 
         formSubmit();
    }
}
</script>
</head>
	<body onload="init()" >
	<!--
		<div class="l_content" id="l_content">
			<div class="logo_bar">
				<div class = "logo_d"></div>
			</div>
			<div class="login_bar">
				<div class="login_bar_content">
					<div class="login_font"></div>
					<div class="login_window">
						<div class="window_top"></div>
						<div class="window_middle">
							<div class = "w_m_content">
								<div class="input_un"> 用户名：<input type="text" id="j_username" name="j_username"></div>
								<div class="input_pw"> 密&nbsp;&nbsp;码：<input type="password"  id="j_password" name="j_password"></div>
								<div class="input_cc"> 验证码：<input type="text" id="j_captcha"></div>
								<div class="input_cci" onclick="javascript:changeCapatchaImg();"> <img id="capatcha" width="172" src="captcha.do"/></div>
								<div class="input_rm" > 记住我：<input type="checkbox" id="_acegi_security_remember_me" value="1"></div>
								<div class="input_button buttons"><button type="button" class="positive" name="save" onclick="formSubmit();">登 录</button> <button type="reset"  class="negative"> 取 消 </button></div>
							</div>
						</div>
						<div class="window_bottom"></div>
					</div>
					<div class="login_w"></div>
				</div>
			</div>
			<div class="login_bottom">
			</div>
		</div>
	-->
		<div class="bgBox">
			<div class="centrebg">
		        <div class="contentBox">
		            <div class="contentTop">
		                <div class="mainLeft_img"></div>
		                <div class="mainRight">
		                    <div class="logo"></div>
		                    <ul class="login">
		                        <li>登录名<input type="text" class="inputText"  id="j_username" name="j_username"/></li>
		                        <li>&nbsp;&nbsp;&nbsp;密码<input type="password" class="inputText" id="j_password" name="j_password"/></li>
								<li>验证码<input type="text" class="inputText_yz" id="j_captcha" /><a href="javascript:changeCapatchaImg();"><span class="yz_image"><img id="capatcha" width="82px" height="34px" src="captcha.do"/></span></a></li>  
								<li>记住我<input type="checkbox" class="remember" id="_acegi_security_remember_me" value="1"/><a href="javascript:formSubmit();"><span class="login_btn"></span></a></li>                    
		                    </ul>
		                </div>
		            </div>
		            <div class="contentFooter"></div>
		        </div>
		    </div>
		</div>
	</body>
</html>
