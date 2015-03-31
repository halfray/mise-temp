/**
 * login.js Power by YUI-EXT and JSON.
 * 
 * @author 刘岩松
 * @email seraph115@gmail.com
 */
 
var Login = { 
	author: "Seraph",
	version: "0.1.0"
};

var loginPanel = '';

function changeCapatchaImg()
{
	var capatchaElement = document.getElementById('capatcha');
	capatchaElement.setAttribute('src','captcha.do?code='+Math.random());
}
	    
var LoginPanel = {
		
	create : function() {
		
		// 键盘回车登录
		Ext.get(document).on('keypress', function(e) {
			if (e.keyCode == 13) {
				Ext.getCmp("login").handler();
			}
		});
		
		var userNames = LoginHelper.getLoginUserNames();
		var record = Ext.data.Record.create([{name: 'userName', mapping: 0}]);
	    var store = new Ext.data.Store({
	    	proxy: new Ext.data.MemoryProxy(userNames),
	        reader: new Ext.data.ArrayReader({}, record)
	    });
	    store.load();

		var loginFormPanel = new Ext.FormPanel({
	        id: 'login-form',
	        renderTo: Ext.getBody(),
	        labelWidth: 55,
	        frame: false,
	        bodyStyle:'background-color: #DFE8F6; padding-top: 25px; padding-left: 20px; border: 0px solid;',
	        defaults: {
	        	width: 230,
	        	anchor: '88%',
	        	allowBlank: false,
            	selectOnFocus: true,
	        	msgTarget: 'side'
	        },
	        defaultType: 'textfield',
	        method: 'POST',
			bodyBorder: false,
			border: false,
			buttonAlign: 'center',
	        items: [
	        	{   xtype: 'combo',
	        		store: store,
					id: 'j_username',
	                name: 'j_username',
	                fieldLabel: '用户名',
	    	        displayField: 'userName',
	    	        valueField: 'userName',
	    	        typeAhead: true,
	    	        // value:"admin",
	    	        mode: 'local',
	    	        triggerAction: 'all',
	    	        selectOnFocus: true,
	                blankText: '请输入用户名'
	            },{
					id: 'j_password',
	                name: 'j_password',
	                fieldLabel: '密&nbsp;&nbsp;&nbsp;码',
	                inputType: 'password',
	                // value:"admin",
	                blankText: '请输入密码'
	            },{
					id: 'j_captcha',
	                name: 'j_captcha',
	                style:'algin:center',
	                fieldLabel: '验证码'
	            },{
	            	xtype:'panel',
	            	baseCls: 'x-plain',
	            	frame:true,
	            	style:'border-ight:solid 1px #add9c0;',
	                html: '<div align="right" style="cursor:pointer;CURSOR:hand" onclick="javascript:changeCapatchaImg();"><img id="capatcha" width="172" src="captcha.do" ext:qtip="点击刷新" /></div>'
	            },{
	                xtype: 'checkboxgroup',
	                fieldLabel: '记住我',
	                height: 20,
	                allowBlank: true,
	                items: [{
	                    boxLabel: '&nbsp;&nbsp;<img style="height: 10px;" src="../images/platform/icon/question_small_no_border.png" ext:qtip="勾选后，5日内无需登录" />',
	                    itemCls : 'required',
	                    id: '_acegi_security_remember_me',
	                    name: '_acegi_security_remember_me',
	                    inputValue: 'true'
	                }]
	            }
	        ],
	        buttons: [{
	        			id: 'login',
	                    text:'登录',
	                    handler: function(){
	                    	if(loginFormPanel.getForm().isValid()){
			                    var sb = Ext.getCmp('form-statusbar');
			                    sb.showBusy('登录中...');
	                    		//验证码验证
	             		   		var capatcha = Ext.getCmp('j_captcha').getValue();
	             		   		var valida =M.rpc._call("checkJCapatchaAction.check",capatcha);
	             		   		 changeCapatchaImg();
	             		   		if(!valida)
	             		   		{
             		   			 sb.setStatus({
					                    	text: '验证码错误，请重新输入!', 
					                    	iconCls: '',
					                    	clear: true
					                    });
					                Ext.getCmp('j_captcha').focus(true);
	             		   			return ;
	             		   		}
	                    		
			                    // loginFormPanel.getEl().mask();
			                    
			                    var rememberMeElement = document.getElementById('_acegi_security_remember_me');
			                    
			                    var rememberMe = null;
			                    if(rememberMeElement.checked) {
			                    	rememberMe = rememberMeElement.value;
			                    }
			                    
	             		   		// 存储登录用户名
	             		   		var userName = document.getElementById('j_username').value;
	             		   		LoginHelper.insertLoginUserName(store, userName);
	             		   		LoginHelper.saveLoginUserNames(userName);

			                    Ext.Ajax.request({
			             		   url: 'j_acegi_security_check',
			             		   success: function(response) {
			             		   		var messager = response.responseText.evalJSON();

			             		   		if(messager.success) {
						                    sb.setStatus({
						                    	text: '登录成功!', 
						                    	iconCls: '',
						                    	clear: true
						                    });
						                    // loginFormPanel.getEl().unmask();
						                    location.href = messager.contents.targetUrl;
			             		   		} else {
				             		   		sb.setStatus({
						                    	text: '登录失败! 原因: ' + messager.contents.error, 
						                    	iconCls: '',
						                    	clear: true
						                    });
				             		   		//// 存储登录用户名
				             		   		//var userName = messager.contents.key;
				             		   		//LoginHelper.insertLoginUserName(store, userName);
				             		   		//LoginHelper.saveLoginUserNames(userName);
						                    // loginFormPanel.getEl().unmask();
			             		   		}
			             		   },
			             		   params: {j_username: document.getElementById('j_username').value, j_password: document.getElementById('j_password').value, _acegi_security_remember_me: rememberMe, ajax: true}
			             		});
	                    	}
						}
	                },{
	                    text: '重置',
	                    handler: function(){
	                    	changeCapatchaImg();
	                    	loginFormPanel.form.reset();
	                    }
	        		}]
	    });
		
		loginPanel = new Ext.Window({
			el: 'login-window',
	        layout:'fit',
	        title: '登录',
			width: 300,
	        height: 275,
			resizable : false,
			closeAction: 'hide',
			items: loginFormPanel,
			iconCls:'login-win',
	        bbar: new Ext.ux.StatusBar({
	            id: 'form-statusbar',
	            defaultText: '待登录',
				plugins: new Ext.ux.ValidationStatus({form:'login-form'})
        	})
		});
		loginPanel.show();
	},
	
	init : function() {
		Ext.QuickTips.init();
		LoginPanel.create();
	},
		
	show : function() {
		loginPanel.show();
	}
};

var LoginHelper = {
		
	getLoginUserNames : function() {
		// 在cookie中查找存储的登录用户名信息
		var cookiesArr = document.cookie.split(";");
		var temp = "";
		for ( var i = 0; i < cookiesArr.length; i++) {
			var arr = cookiesArr[i].split("=");
			if (arr[0] == "userNames") {
				temp = arr[1];
				break;
			}
		}
		// 将存储在cookie中的字符串信息转换为数组
		var userNames = [];
		if(temp.length > 0) {
			eval("userNames=" + temp);
		}
		return userNames;
	},
	
	insertLoginUserName : function(store, userName) {
		// 判断是否已存在，如已存在则不添加
		var userNames = this.getLoginUserNames();
		if (userNames.join(',').indexOf(userName) < 0) {
			var record = new store.recordType({userName: userName});
		   	store.insert(0, [record]);
		}
	},
	
	saveLoginUserNames : function(userName) {
		// 判断是否已存在，如已存在则不存储
		var userNames = this.getLoginUserNames();
		if (userNames.join(',').indexOf(userName) < 0) {
			userNames.push([userName]);
			var date = new Date();
			date.setTime(date.getTime() + 5 * 24 * 3066 * 1000); // 5天
			document.cookie = "userNames=" + Ext.util.JSON.encode(userNames) + ";expires=" + date.toGMTString();//设置cookies
		}
	}
	
};
