/**
 * login.js Power by YUI-EXT and JSON.
 * 
 * @author 刘岩松
 * @email seraph115@gmail.com
 */

var userDetailFormPanel = '';
var userDetailPanel = '';

var UserDeatil = {
	
	create : function() {
	
		var bankStore = new Ext.data.JsonStore({
			url: 'systemParmsProvider.do?type=SC_ORG_LIST',
			fields: ['codeValue', 'codeLabel']
		})
		bankStore.load();
	
	    bankCombo = new Ext.form.ComboBox({
	        store: bankStore,
	        displayField: 'codeLabel',
	        valueField: 'codeValue',
	        typeAhead: true,
	        mode: 'local',
	        triggerAction: 'all',
	        selectOnFocus: true, 
	        editable: false,
		    anchor:'95%'
	    });
	    
	    Ext.override(Ext.form.DateField, {
	        setValue : function(date) {
	            if (Ext.isEmpty(date)) {
	            }
	            else if (Ext.isEmpty(date.time)) {
	                date = new Date(date);
	            }
	            else {
	                date = new Date(date.time); 
	            }
	            Ext.form.DateField.superclass.setValue.call(this, this.formatDate(this.parseDate(date).format('Y-m-d')));
	        }
	    });

		userDetailFormPanel = new Ext.FormPanel({
			el: 'user-detail-form',
			baseCls: 'x-plain',
	        labelWidth: 75,
	        frame:true,
	        bodyStyle:'padding:10px 10px 10px 10px; border: 0px solid;',
			autoScroll: true,
	        autoWidth: true,
			height: 180,
	        defaults: {
				width: 200,
				readOnly: true,
				anchor:'95%'
			},
	        defaultType: 'textfield',
			bodyBorder: false,
			border: false,
			items: [{
	            fieldLabel: '用户名称',
	            name: 'userName'
	        },{
	            fieldLabel: '用户中文名',
	            name: 'userAlias',
	           	anchor:'95%'
	        },{
	            fieldLabel: '所属机构',
	            name: 'orgCode'
	        },{
	            fieldLabel: '移动电话',
	            name: 'cellphoneNum'
	        },{
	            fieldLabel: '联系电话',
	            name: 'phoneNum'
	        },{
	            fieldLabel: '电子邮箱',
	            name: 'email'
	        },{
	            fieldLabel: '起始日期',
	            name: 'startDate',
	            xtype: 'datefield'
	        },{
	            fieldLabel: '截止日期',
	            name: 'endDate',
	            xtype: 'datefield'
	        },{
	            fieldLabel: 'IP地址',
	            name: 'ip'
	        },{
	            fieldLabel: '登录次数',
	            name: 'loginNum'
	        }]
	    });
	
		userDetailPanel = new Ext.Window({
			el:'user-detail-window',
	        layout:'fit',
	        title: '用户基本信息',
			width: 300,
	        height: 300,
			resizable : false,
			items: userDetailFormPanel,
			closeAction: 'hide',
			buttons: [{
	            text:'关闭',
	            handler: function() {
					userDetailPanel.hide();
				}
	        }]
		});
	
	},	
	
	show : function() {
		Ext.Ajax.request({
			   url: 'userApplication.do',
			   success: function(response) {
			   		var data = response.responseText.evalJSON();
			   		userDetailPanel.show();
			   		userDetailFormPanel.getForm().setValues(data);
			   },
			   failure: Ext.emptyFn,
			   params: { command: 'userDetail'}
		});
	}

};

/**------------------*/

var userPwdFormPanel;
var userPwdPanel;

var UserPwd = {
	
	create : function() {
	
		userPwdFormPanel = new Ext.FormPanel({
			el: 'user-pwd-form',
			baseCls: 'x-plain',
	        labelWidth: 75,
	        frame:true,
	        bodyStyle:'padding:10px 10px 10px 10px; border: 0px solid;',
	        autoWidth: true,
			autoHeight: true,
	        defaults: {
				width: 200,
				readOnly: false,
				allowBlank: false,
				maxLength: 32,
				anchor:'95%'
			},
	        defaultType: 'textfield',
			bodyBorder: false,
			border: false,
			items: [{
	            fieldLabel: '用户名称',
	            name: 'userName',
	            value: userName,
	            readOnly: true,
	            disabled: true
	        },{
	            fieldLabel: '用户账号',
	            name: 'userCode',
	            value: userCode,
	            readOnly: true,
	            disabled: true
	        },{
	            fieldLabel: '原始密码',
	            name: 'originPassword',
	            inputType: 'password'
	        },{
	            fieldLabel: '新密码',
	            name: 'newPassword',
	            inputType: 'password'
	        },{
	            fieldLabel: '确认密码',
	            name: 'repeatPassword',
	            inputType: 'password'
	        }]
	    });
	
		userPwdPanel = new Ext.Window({
			el:'user-pwd-window',
	        layout:'fit',
	        title: '密码更改',
			width: 300,
	        height: 215,
			resizable : false,
			items: userPwdFormPanel,
			closeAction: 'hide',
			buttons: [{
				text:'更改',
				handler: function() {
					if(userPwdFormPanel.form.isValid()) {
						userPwdFormPanel.form.submit({
		            		url: 'userPwdUpdate.do',
		            		method: 'post',
		            		success: function(form, action) {
								userPwdPanel.hide();
								Ext.Msg.alert('Info', action.result.errors.msg);
		            		},
		            		failure: function(form, action) {
								userPwdPanel.hide();
								Ext.Msg.alert('Error', action.result.errors.msg);
		            		},
		            		clientValidation: true,
		            		waitMsg: Message.waitMsg
		            	});
					} else {
						Ext.Msg.alert('Error', '请填写完整!');
					}
				}
			},{
				text:'关闭',
				handler: function() {
					userPwdPanel.hide();
				}
			}]
		});
	
	},	
	
	show : function() {
		userPwdFormPanel.getForm().setValues({ originPassword: '', newPassword: '', repeatPassword: ''});
		userPwdPanel.show();
	}
	
};

/**------------------*/

var userAuthFormPanel;
var userAuthPanel;

var UserAuth = {
	
	create : function(){
		
		var authoritiesStore = new Ext.data.JsonStore({
			autoLoad: true,
			url: 'userApplication.do?command=userAuthorties',
			fields: ['codeValue', 'codeLabel']
		});
		
		userAuthFormPanel = new Ext.FormPanel({
			baseCls: 'x-plain',
			border: false,
            layout: {
                type:'vbox',
                padding:'5',
                align:'stretch'
            },
			items: [{
	            xtype: 'multiselect',
	            name: 'multiselect',
	            hideLabel: true,
	            bodyBorder: false,
	            store: authoritiesStore,
                displayField: 'codeLabel',
                valueField: 'codeValue',
                width: 275,
                height: 155
        	}]
		});

		userAuthPanel = new Ext.Window({
	        title: '用户权限信息',
	        layout: 'fit',
			width: 300,
	        height: 230,
			items: userAuthFormPanel,
			closeAction: 'hide',
			buttons: [{
	            text:'关闭',
	            handler: function() {
					userAuthPanel.hide();
				}
	        }]
		});
	
	},
	
	show : function(){
		userAuthPanel.show();
	}

};

/**------------------*/

var userStylePanel;
var path = Main.contextPath;
var UserStyle = {
	
	create : function() {
		
		themeData = new Ext.data.SimpleStore({
			fields : [ 'display', 'value' ],
			data : [ 
////		        [ 'pink风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-pink.css' ],
////		        [ 'purple风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-purple.css' ],
////		        [ 'red03风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-red03.css' ],
//		        [ 'brown02风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-brown02.css' ],
//		        [ 'gray风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-gray.css' ],
////		        [ 'green风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-green.css' ],
////		        [ 'black风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-black.css' ],
///	/	        [ 'blue03风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-blue03.css' ],
////		        [ 'brown风格', 'scripts/ext-3.3.1/resources/css/ext-all-xtheme-brown.css' ],
				[ '绿色风格', 'scripts/ext-3.3.1/resources/css/xtheme-green.css' ],
				[ '天蓝风格', 'scripts/ext-3.3.1/resources/css/xtheme-blue.css' ],
////				[ 'Access风格', 'scripts/ext-3.3.1/resources/css/xtheme-access.css' ],
				  [ '广东风格', 'scripts/ext-3.3.1/resources/css/ext-all.css' ]
			]
		});

		this.comboTheme = new Ext.form.ComboBox({
			store : themeData,
			displayField : 'display',
			typeAhead : true,
			mode : 'local',
			triggerAction : 'all',
			selectOnFocus : true,
			resizable : false,
			listWidth : 100,
			width : 100,
			valueField : 'value',
			value : ''
		});

		this.comboTheme.on('select', function(combo) {
			var css = combo.getValue();
			var css1 = null;
			var css2 = null;
			if(css=='scripts/ext-3.3.1/resources/css/xtheme-blue.css'){//天蓝
				document.getElementsByTagName("link")[1].href = path+'/scripts/ext-3.3.1/resources/css/ext-all_skyblue.css';
				document.getElementsByTagName("link")[11].href = path+'/scripts/inc/frame/topNavigation_blue.css';
				css1 = path+'/scripts/inc/frame/topNavigation_blue.css';
				css2 = path+'/scripts/ext-3.3.1/resources/css/ext-all_skyblue.css';
			}else if(css=='scripts/ext-3.3.1/resources/css/xtheme-green.css'){//绿色
				document.getElementsByTagName("link")[1].href = path+'/scripts/ext-3.3.1/resources/css/ext-all_green.css';
				document.getElementsByTagName("link")[11].href = path+'/scripts/inc/frame/topNavigation_green.css';
				css1 = path+'/scripts/inc/frame/topNavigation_green.css';
				css2 = path+'/scripts/ext-3.3.1/resources/css/ext-all_green.css';
			}else{//广东
				document.getElementsByTagName("link")[1].href = path+'/scripts/ext-3.3.1/resources/css/ext-all.css';
				document.getElementsByTagName("link")[11].href = path+'/scripts/inc/frame/topNavigation.css';
				css1 = path+'/scripts/inc/frame/topNavigation.css';
				css2 = path+'/scripts/ext-3.3.1/resources/css/ext-all.css';
			}
			dynamicChangeStyle(css);
			saveStyleInCookie(css+'&'+css1+'&'+css2);//通过‘&’链接css文件
		}, this);

		userStylePanel = new Ext.Window({
			el: 'user-style-window',
	        title: '用户风格设定',
			items: this.comboTheme,
			bodyBorder: false,
			closeAction: 'hide',
			layout: 'fit',
			buttonAlign: 'center',
			buttons: [{
	            text:'关闭',
	            handler: function() {
	            	userStylePanel.hide();
				}
	        }]
		});
	},
	
	show : function() {
		userStylePanel.show();
	}
};

/**
 * Dynamic method to change UI style
 * @param name
 */
function dynamicChangeStyle(css) {
	Ext.util.CSS.swapStyleSheet('theme', css);
}

/**
 * Static method to change UI style
 * @param name
 */
function saveStyleInCookie(css) {
	var date = new Date();
	date.setTime(date.getTime() + 5 * 24 * 3066 * 1000); // 5天
//	document.getElementsByTagName("link")[1].href = css;
	document.cookie = "css=" + css + ";expires=" + date.toGMTString();//设置cookies
	onChangeStyle();
}

/**
 * To change UI style from cookie
 */
function onChangeStyle() {
	var cookiesArr = document.cookie.split(";");
	var css;
	for ( var i = 0; i < cookiesArr.length; i++) {
		var arr = cookiesArr[i].split("=");
		if (arr[0] == "css") {
			css = arr[1];
			break;
		}
	}
	if(typeof(css) != "undefined" && css!=null){
		var cssArr = css.split("&");
		document.getElementsByTagName("link")[1].href = cssArr[1];//读取并应用css
		document.getElementsByTagName("link")[11].href = cssArr[2];
		document.getElementsByTagName("link")[12].href = cssArr[0];
	}
}

// invoke onChangeStyle
onChangeStyle();
