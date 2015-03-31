/**
 * login.js Power by YUI-EXT and JSON.
 * 
 * @author 刘岩松
 * @email seraph115@gmail.com
 */
 
var Logout = { 
	author: "Seraph",
	version: "0.1.0"
};

var LogoutPanel = {
		
	show : function() {
		Ext.MessageBox.confirm('确认', '确认要退出本系统?', function(btn) {
			Ext.getBody().mask();
			if(btn == 'yes') {
				Ext.getDom('logout-form').submit();
			}
			Ext.getBody().unmask();
		});
	}
}
