function addDomainStore(store, record) {
	for (var i = 0; i < store.getCount(); i++) {
		var temp = store.getAt(i);
		if (record.data.domain == temp.data.domain)
			return false;
	}
	store.add(record);
	store.commitChanges();
	return true;
}

function addWebSiteStore(store, record) {
	for (var i = 0; i < store.getCount(); i++) {
		var temp = store.getAt(i);
		if (record.data.websiteUrl == temp.data.websiteUrl)
			return false;
	}
	store.add(record);
	store.commitChanges();
	return true;
}

function upload(triger) {
	var form = uploadForm();
	var wWindow = new Ext.Window // 定义对象
	({
				width : 500, // 宽度
				height : 200, // 高度
				layout : 'fit', // 布局方式
				plain : true, //
				modal : true, // 产出阴影,遮盖其他部分
				bodyStyle : 'padding:5px;',
				buttonAlign : 'center', // 按钮摆放位置
				items : form, // 将定义的form放在window上
				buttons : [{ // 按钮
					text : '提交',
					handler : createObject
						// 按钮触发的方法
				}, {
					text : '取消',
					handler : cancel
				}]
			});

	wWindow.show();
	function cancel() {
		wWindow.close();
	}
	function createObject() {
		if (form.getForm().isValid()) {
			form.getForm().submit({
						waitTitle : '信息',
						waitMsg : '正在提交，请稍候……',
						url : path + "/rmTaskGroupUpload.do",
						success : function(form, action) {
							var msg = "";
							if (!Ext.isEmpty(action.result.noHaveMsg)) {
								msg = "下列域名在库中不存在：<br>"
										+ action.result.noHaveMsg;
							}
							if (!Ext.isEmpty(action.result.existsMsg)) {
								msg += "下列域名在其他任务中已存在： <br>"
										+ action.result.existsMsg;
							}
							if (msg.length == 0) {
								msg = "所有信息已导入成功";
							}

							Ext.Msg.alert("导入完成", msg, function() {
										wWindow.close();
									});

							triger.addList(action.result.result);
						},
						failure : function(form, action) {
							Ext.Msg.alert("内容", action.result.msg);
						}
					});
		}
	}
	function uploadForm() {
		var name = new Ext.form.TextField({
					allowBlank : false,
					inputType : 'file',
					fieldLabel : '上传文件',
					blankText : "请选择上传的文件",
					invalidText : "上传文件不能为空",
					name : 'uploadFile',
					anchor : '90%'
				});
		var objectForm = new Ext.form.FormPanel({
					frame : true,
					baseCls: 'x-plain',
					fileUpload : true, // 设置为上传
					items : [name]
				});
		return objectForm;
	}
}