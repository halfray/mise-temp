Ext.ns('Frame');
Frame.getBottomPanel = function() {
	var mainBottomPanel = {
		region : "south",
		height : 26,
		items : new Ext.Toolbar({
					items : [{
								xtype : 'tbtext',
								id : 'main.frame.stateBar',
								text : '提示:正在加载中...'
							}, '->', '-', {
								xtype : 'tbtext',
								id : 'main.frame.onlineUserBar',
								text : ''
							}, '-', {
								xtype : 'tbtext',
								id : 'main.frame.stateBarTime'
							}]
				})
	};
	mainBottomPanel.setStatusInfo = function(text) {
		Ext.getCmp('main.frame.stateBar').setText("提示：" + text);
	}
	mainBottomPanel.setOnlineUser = function(text) {
		Ext.getCmp('main.frame.onlineUserBar').setText("当前在线人数：" + text + "人");
	}

	mainBottomPanel.showTime = function() {
		var task = {
			run : function() {
				Ext.fly('main.frame.stateBarTime').update(new Date()
						.format('Y年m月d日 星期l H:i:s'));
			},
			interval : 1000
		}
		Ext.TaskMgr.start(task);
	}

	return mainBottomPanel;
}