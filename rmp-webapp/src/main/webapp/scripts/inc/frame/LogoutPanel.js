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