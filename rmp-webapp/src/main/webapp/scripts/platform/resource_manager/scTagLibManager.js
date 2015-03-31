function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
		var root = new Ext.tree.AsyncTreeNode({
			id : '0',
			text : '根节点',
			draggable : false,
			expanded : true
		});
		//创建动态加载树
		var treeLoader = new Ext.tree.TreeLoader({
			dataUrl :M.rpc.path
		});
		
		treeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.method = "'scTagLibManagerAction.getTagLibTreeList'";
			treeLoader.baseParams.result = "'direct'";
			var params = {};
			params.javaClass = "java.util.HashMap";
			params.map = {};
			params.map.id = typeof(node.attributes.scTagLibManagerId) =="undefined" ? "0": node.attributes.scTagLibManagerId;
			params.map.type = node.attributes.type;
			params.map.value = node.attributes.value;
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, treeLoader);
		
		var tree = new Ext.ux.tree.TreeGrid({
			autoLoad :false,
			rootVisible: false,
			frame:true,
			baseCls : 'x-plain',
			loader : treeLoader,
			border : false,
			enableSort : false,
			root : root,
	        columns:[
	            {header: '标签名称', dataIndex: 'tagName', width: 200, align: 'center',tpl:changeColor('tagName')},
	            {header: 'ID', dataIndex: 'scTagLibManagerId',hidden:true}, 
	            {header: '父ID', dataIndex: 'parentId',hidden:true},
	        	{header: 'type', dataIndex: 'type', hidden:true},
	        	{header: 'value', dataIndex: 'value', hidden:true}
	        ],
	        tbar: [{
	            text: '新增',
	            iconCls: 'dataTableList-add-icon',
	            handler : function(){
	        		tagLibAdd();
	            }
	        },'-',{
	            text: '修改',
	            iconCls: 'dataTableList-modify-icon',
	            handler : function(){
	            	tagLibEdit();
	            }
	        },'-',{
	            text: '删除',
	            iconCls: 'dataTableList-delete-icon',
	            handler : function(){
	        		tagLibDel();
	            }
	    	},{
	    		text : '<span style="margin-left:20px;">刷新</span>',
	    		cls: 'refresh-button', 
	    		minWidth:82,
	    		height:27,
	            handler : function(){
	        		tree.root.reload();
	            }
	        } 
	        ],
	        listeners : {
  	    		dblclick : function(){
					tagLibEdit();
				}
  		    }
	    });
		//修改树形节点字体颜色2013-11-20
		function changeColor(value)
		{
			return new Ext.XTemplate('{'+value+':this.changeColor}', {
		                changeColor: function(v) {
		                	return '<span style="color:#434343;">' + v + '</span>';
		                }
		            });
		}
		
		var formPanel;
		var regex=/^\S*$/;
		function getFormPanel(){
			if(Ext.isEmpty(formPanel)){
				
				var id = new Ext.form.TextField({
					name : 'scTagLibManagerId',
					fieldLabel : 'ID',
					hidden : true
				});
				var parentId = new Ext.form.TextField({
					id : 'parentId',
					name : 'parentId',
					hidden : true,
					allowBlank : false,
					fieldLabel : '父ID'
				});
				var parentIdName = new Ext.form.TextField({
					name : 'parentIdName',
					allowBlank : false,
					width : 150,
					fieldLabel : '父标签名称',
					readOnly : true
				});
				var tagName = new Ext.form.TextField({
					name : 'tagName',
					width : 150,
					regex : regex,
					regexText : '任务号中不能包含空格!',
					allowBlank : false,
					fieldLabel : '标签名称'
				});
				formPanel = new Ext.form.FormPanel({
					baseCls: 'x-plain',
					autoHeight :true,
					autoWidth: true,
					labelWidth: 70,
					frame:true,
					bodyStyle:'padding:13px; border: 0px solid;',
					autoScroll: true,
					defaultType: 'textfield',
					labelAlign : 'right',
					bodyBorder: false,
					border: false,
					items: [id,parentId,parentIdName,tagName]
				});
				
			}
			return formPanel;
		}
		
		//var windows;
		function tagLibAdd(){
			var node = tree.getSelectionModel().getSelectedNode();
			
			var formPanel = getFormPanel();
			formPanel.getForm().findField('parentIdName').setValue('');
			formPanel.getForm().findField('parentId').setValue('');
			formPanel.getForm().findField('tagName').setValue('');
			formPanel.getForm().findField('scTagLibManagerId').setValue('');
			
			if(node == null){
				formPanel.getForm().findField('parentIdName').setValue('根节点');
				formPanel.getForm().findField('parentId').setValue('0');
			}else{
				if(node.attributes.type == '1'){
					Ext.Msg.alert('温馨提示','不能添加多层次的树结构');
					return;
				}
				formPanel.getForm().findField('parentIdName').setValue(node.attributes.tagName);
				formPanel.getForm().findField('parentId').setValue(node.attributes.scTagLibManagerId);
			}
			
			var windows = new Ext.Window({
				xtype : "window",
				title : "添加记录",
				width : 350,
				height : 175,
				border: false,
				bodyBorder: false,
				autoScroll : true,
				items : [formPanel],
				buttons : [{
					text : '保存',
					handler : function(){
					onBoSave(windows,formPanel,node);
				}
				},{
					text : '取消',
					handler : function(){
					windows.hide();
				}
				}]
			});
			windows.show();
		}
		
		function tagLibEdit(){

			var node = tree.getSelectionModel().getSelectedNode();
			
			var formPanel = getFormPanel();
			
			if(node == null){
				Ext.Msg.alert('温馨提示','请选中一条数据');
				return;
			}else{
				if(node.parentNode.attributes.tagName == null){
					formPanel.getForm().findField('parentIdName').setValue('根节点');
					formPanel.getForm().findField('parentId').setValue('0');
				}else{
					formPanel.getForm().findField('parentIdName').setValue(node.parentNode.attributes.tagName);
					formPanel.getForm().findField('parentId').setValue(node.parentNode.attributes.scTagLibManagerId);
				}
				formPanel.getForm().findField('tagName').setValue(node.attributes.tagName);
				formPanel.getForm().findField('scTagLibManagerId').setValue(node.attributes.scTagLibManagerId);
			}
			
			var windows = new Ext.Window({
				xtype : "window",
				title : "修改记录",
				width : 285,
				height : 180,
				border: false,
				bodyBorder: false,
				autoScroll : true,
				items : [formPanel],
				buttons : [{
					text : '保存',
					handler : function(){
					onBoSave(windows,formPanel,node);
				}
				},{
					text : '取消',
					handler : function(){
					windows.hide();
				}
				}]
			});
			windows.show();
		}
		
		function onBoSave(windows,formPanel,node){
			var form = formPanel.getForm();
			if(form.isValid()){
			var tagName = formPanel.getForm().findField('tagName').getValue();
			if(Ext.isEmpty(trim(tagName))){
				Ext.Msg.alert('提示', '标签名称不能为空格');
				return false;
			}
			
			var params = {};
			params.parentId = formPanel.getForm().findField('parentId').getValue();
			params.tagName = trim(tagName);
			params.scTagLibManagerId = formPanel.getForm().findField('scTagLibManagerId').getValue();
			
			var repeatflag = M.rpc._call("scTagLibManagerAction.checkRepeatTagName",trim(tagName));
			if(repeatflag == true){
				Ext.Msg.alert('提示', '标签名称重复,请重新填写');
				return false;
			}
			
			function onBoSaveCallBack(result){
				windows.hide();
				if(node == null){
					tree.root.reload();
				}else{
					node.parentNode.reload();
				}
				showTipWindow('保存成功','comment','温馨提示');
			}
			
			M.rpc._call(onBoSaveCallBack,"scTagLibManagerAction.onBoSave",
					{javaClass : 'java.util.HashMap',map : params});
			
		}else{
			Ext.Msg.alert('提示', '标签名称不能为空，并且不能输入空格');
		}
	}
		function tagLibDel(){
			var node = tree.getSelectionModel().getSelectedNode();
			if(node == null){
				Ext.Msg.alert('温馨提示','请选中一条数据');
				return;
			}
			
			Ext.Msg.confirm('温馨提示','是否要删除一条数据',function(btn){
				if(btn == 'yes'){
			    	var params = {};
					params.scTagLibManagerId = node.attributes.scTagLibManagerId;
					M.rpc._call(onBoDelCallBack,"scTagLibManagerAction.onBoDel",
							{javaClass : 'java.util.HashMap',map : params});
			    }
				function onBoDelCallBack(result){
					node.parentNode.reload();
					showTipWindow('删除成功','comment','温馨提示');
				}
			});
			
		}
		
		//显示提示窗口
		function showTipWindow(tipinfo,iconCls,title,time){
			var window = new Ext.Window( {
				width : 250,
				height : 150,
				shadow : false,
				html : tipinfo,
				title : "温馨提示:"
			});
			window.iconCls = iconCls; 
			window.title = title;
			function show() {
				this.el.alignTo(Ext.getBody(), 'br-br');
				this.el.fadeIn('b', {
					easing : 'easeOut',
					endOpacity: 1, 
					duration: 5,
					callback : function() {
						alert();
						this.close.defer(time, this); // 定时关闭窗口
				},
				scope : this,
				duration : 1
				});

			}
			function hide() {
				if (this.isClose === true) { // 防止点击关闭和定时关闭处理
					return false;
				}
				this.isClose = true;
				this.el.fadeOut('b', {
					easing : 'easeOut',
					callback : function() {
						this.un('beforeclose', hide, this);
						this.close();
					},
					scope : this,
					duration : 2
				});
				return false;
			}
			window.on('show', show, window);
			window.on('beforeclose', hide, window);
			window.show();
			var delay = new Ext.util.DelayedTask(function(){
				window.close();
			});
			delay.delay(3000);
		}
		
		var panel = new Ext.Panel({
			id : 'main-panel',
			frame : false,
			border : false,
			bodyBorder : false,
			layout : 'table',
			layoutConfig : {
				columns : 8
			},
			defaults : {
				frame : false
			},
			items : [tree]
		});

		Ext.onReady(function() {
			panel.render('user-grid');
			panel.setHeight(Ext.get('content').getHeight());
			tree.setHeight(Ext.get('content').getHeight()-15);
			tree.setWidth(Ext.get('content').getWidth());
		});