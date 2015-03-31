<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="../includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="scripts/ext-3.3.1/ux/iconcombo/Ext.ux.IconCombo.css">
<script type="text/javascript" src="scripts/ext-3.3.1/ux/iconcombo/Ext.ux.IconCombo.js"></script>
<script type="text/javascript" src="scripts/ext-3.3.1/ux/iconcombo/Ext.ux.util.CSS.js"></script>
<script type="text/javascript" src="scripts/ext-3.3.1/ux/TreeCombobox.js"></script>
<title></title>
<style type="text/css">

#content {
	width: 100%;
	height: 97% !important; height: 97.5%;
}
/*grid选中颜色*/
.x-tree-node .x-tree-selected {
	background-color: #d9e8fb;
}
/*树形节点颜色*/
.x-tree-node a span, .x-dd-drag-ghost a span{
	color:#000000;
}
</style>
<script type="text/javascript">

var MOVE_UP = -1;
var MOVE_DOWN = 1;

//-> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "序号",          
	1: "菜单ID",          
	2: "父菜单ID",          
	3: "菜单名称",          
	4: "是否叶子结点",          
	5: "禁用",          
	6: "节点样式",          
	7: "节点图标",          
	8: "链接",          
	9: "可见",          
	10: "菜单类型",          
	11: "排序",          
	12: "链接目标"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "menuId",          
	2: "parentId",          
	3: "text",          
	4: "leaf",          
	5: "disabled",          
	6: "cls",          
	7: "iconCls",          
	8: "href",          
	9: "visibility",          
	10: "type",          
	11: "sort",          
	12: "hrefTarget",          
	13: "id_old"   
};

// -> Cell width
var WD = {
	0: 100,          
	1: 100,          
	2: 100,          
	3: 300,          
	4: 100,          
	5: 100,          
	6: 100,          
	7: 100,          
	8: 200,          
	9: 100,          
	10: 100,          
	11: 100,          
	12: 100        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int",          
	2: "int",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "string",          
	11: "int",          
	12: "string"        
};
	
var URL = {
	loadNodes : 'treeMenuProvider.do',
	queryData : 'baseRecordAction.do?bean=scTreeMenu&action=retrieve&pk=id',
	save : 'treeMenuPersistence.do?action=add',
	update : 'treeMenuPersistence.do?action=update',
	deleteData : 'treeMenuPersistence.do?action=delete'
};

var tree;
var TreePanel = {

	moveByStep : function(step, tree) {
		var currentNode = tree.getSelectionModel().getSelectedNode();
		var parentNode = currentNode.parentNode;
		
		if(currentNode == null) {
			Ext.Msg.alert('提示','请选择您要下移的节点!');
			return;
		}

		if(step == MOVE_UP) {
			if(currentNode.isFirst()){
				Ext.Msg.alert('提示','当前为第一个子节点,不能上移!');
				return;
			}
		} else if(step == MOVE_DOWN) {
			if(currentNode.isLast()){
				Ext.Msg.alert('提示','当前为最后一个子节点,不能下移!');
				return;
			}
		} else {
			Ext.Msg.alert('提示','未知参数[' + step + "]");
			return;
		}

		var nodeArray = parentNode.childNodes;
	
		var i = parentNode.indexOf(currentNode);
		var j = i + step;
	
		var a = nodeArray[i];
		var b = nodeArray[j];
	
		nodeArray[i] = b;
		nodeArray[j] = a;
	
		var ids = "";
		for(var k=0; k < nodeArray.length; k++){
			ids += nodeArray[k].id + ',';
		}
	
		Ext.Ajax.request({
			url: "treeMenuMove.do",
		    params: {ids: ids},
			method: 'post',
			success: function() {
				tree.getLoader().load(parentNode, function(node) {
					node.expand();
					node.findChild('id', currentNode.id).select();
				});
			},
			failure: Ext.emptyFn
		});
	},
		
	create : function(){
		
		//创建动态加载树
		var treeLoader = new Ext.tree.TreeLoader({
			dataUrl: URL.loadNodes
		});
		
		treeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.id = (typeof(node.attributes.id) =="undefined" ? "0": node.attributes.id);
		}, treeLoader);


		function hrefChange(value, metadata, record){
			alert("asdf");
	        return "<div class='div-link' onclick='WinPanel.modify(" + record.get(EN[2]) + ");'>" + value + "</div>";
	    }
		
		function selectNode(sKey){
	   		var node=tree.getNodeById(sKey);
	    	if(node){
	      		node.select();
	    	}
	  	}
		
		 tree = new Ext.ux.tree.TreeGrid({
	        width: Ext.get("content").getWidth(),
	        height: Ext.get("content").getHeight(),
	        renderTo: 'tree-grid',
	        enableDD: true,
	        //rootVisible: true,
			loader: treeLoader,
			style:'margin-top:10px',
			border: false,
			enableSort: false,
			root: new Ext.tree.AsyncTreeNode({
				id:'0',
				text: '根节点',
				draggable: false,
				expanded: true
			}),
			listeners: {
			    contextmenu : showRightMenu,
				click : function(node, e) {
					//var id = node.id;
					//var previousSibling = node.previousSibling.id;
					//var nextSibling = node.nextSibling.id;
					//alert("ID: " + node.id + "\nHref: " + node.attributes.hrefTarget);
				},
				nodedrop: function(e) {
					var dropNodeId = e.dropNode.attributes.id;
					var targetNodeId = e.target.attributes.id;
					var type = e.dropNode.attributes.type;
					Ext.Ajax.request({
					   url: "treeMenuDrag.do",
					   params: {dropNodeId: dropNodeId,
						   		targetNodeId: targetNodeId},
					   method: 'post',
					   success: function(){
						   	Ext.emptyFn;
						   	var parentNode = e.target.parentNode;
		                	parentNode.reload();
					   },
					   failure: Ext.emptyFn
					});
				}
			},
	        columns:[
				/* {header: CN[1], dataIndex: EN[1], width: WD[1], align: 'center' },
				{header: CN[2], dataIndex: EN[2], width: WD[2], align: 'center', renderer: hrefChange },  */
	        	{header: CN[3], dataIndex: EN[3], width: WD[3], align: 'center'},
	        	{header: CN[4], dataIndex: EN[4], width: WD[4], align: 'center'},
	        	{header: CN[5], dataIndex: EN[5], width: WD[5], align: 'center'},
	        	{header: CN[6], dataIndex: EN[6], width: WD[6], align: 'center'},
	        	{header: CN[7], dataIndex: EN[7], width: WD[7], align: 'center'},
	        	{header: CN[8], dataIndex: EN[12], width: WD[12], align: 'left'}
	        ],
	        tbar: [{
	            text: '新增',
	            iconCls: 'dataTableList-add-icon',
	            handler : function(){
					WinPanel.add();
	            }
	        },'-',{
	            text: '修改',
	            iconCls: 'dataTableList-modify-icon',
	            handler : function(){
	            	WinPanel.modify(tree);
	            }
	        },'-',{
	            text: '删除',
	            iconCls: 'dataTableList-delete-icon',
	            handler : function(){
	        		WinPanel.del(tree);
	            }
	    	},{
	            text: '上移',
	            iconCls: 'tree-node-moveup-icon',
	            handler : function() {
	    			TreePanel.moveByStep(MOVE_UP, tree);
	            }
	        },{
	            text: '下移',
	            iconCls: 'tree-node-movedown-icon',
	            handler : function() {
	        		TreePanel.moveByStep(MOVE_DOWN, tree);
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
	        ]
	    });

		var rightClick = null;
		function showRightMenu(node,e){ 

			//if(rightClick == null) {
				rightClick = new Ext.menu.Menu({ 
					id : 'rightClickCont',
			 		items : [{ 
						id: 'rMenu1',
				 		iconCls : '',
				 		text: '上移', 
						handler : function(){ 
			 				TreePanel.moveByStep(MOVE_UP, tree);
			 			}
					},{ 
						id: 'rMenu2',
					 	iconCls : '',
					 	text: '下移', 
						handler : function(){
							TreePanel.moveByStep(MOVE_DOWN, tree);
						}
					},{ 
						id: 'rMenu3',
					 	iconCls : '',
					 	text: '修改', 
						handler : function(){ 
							WinPanel.modify(tree);
							} 
						},{ 
						id: 'rMenu4',
					 	iconCls : '',
					 	text: '删除', 
						handler : function(){ 
							WinPanel.del(tree);
							} 
						},{ 
						id: 'rMenu5',
					 	iconCls : '',
					 	text: '刷新',
						handler : function(){ 
							tree.root.reload(); 
							} 
						}] 
		 		}); 
				e.preventDefault(); 
				rightClick.showAt(e.getXY());
			//}			
		}
		
	}}
	

	
var addPanel;
var WinPanel = {
	moveByStep : function(step, tree) {
		var currentNode = tree.getSelectionModel().getSelectedNode();
		var parentNode = currentNode.parentNode;
		
		if(currentNode == null) {
			Ext.Msg.alert('提示','请选择您要下移的节点!');
			return;
		}
	
		if(step == MOVE_UP) {
			if(currentNode.isFirst()){
				Ext.Msg.alert('提示','当前为第一个子节点,不能上移!');
				return;
			}
		} else if(step == MOVE_DOWN) {
			if(currentNode.isLast()){
				Ext.Msg.alert('提示','当前为最后一个子节点,不能下移!');
				return;
			}
		} else {
			Ext.Msg.alert('提示','未知参数[' + step + "]");
			return;
		}
	
		var nodeArray = parentNode.childNodes;
	
		var i = parentNode.indexOf(currentNode);
		var j = i + step;
	
		var a = nodeArray[i];
		var b = nodeArray[j];
	
		nodeArray[i] = b;
		nodeArray[j] = a;
	
		var ids = "";
		for(var k=0; k < nodeArray.length; k++){
			ids += nodeArray[k].id + ',';
		}
	
		Ext.Ajax.request({
			url: "treeMenuMove.do",
		    params: {ids: ids},
			method: 'post',
			success: function() {
				tree.getLoader().load(parentNode, function(node) {
					node.expand();
					node.findChild('id', currentNode.id).select();
				});
			},
			failure: Ext.emptyFn
		});
	},
	create : function() {
	
		var iconStore = new Ext.data.SimpleStore({
		    fields: ['iconCode', 'iconName', 'iconCSS'],
		    data: Ext.util.CSS.getRulesByCssFileName('global-icon.css')
		});

		var typeStore = new Ext.data.JsonStore({
	    	url: 'parmInfoProvider.do?parmType=BOOLEAN_VALUE',
	    	fields: ['parmCode', 'parmName'],
	    	listeners: {  
				load: function() {  
					typeCombo.setValue(typeCombo.getValue());  
				}  
			}  
		});

		var typeCombo = new Ext.form.ComboBox({
	   		store: typeStore,
	   		name: EN[2],
	   		hiddenName: EN[2],
			fieldLabel: CN[2],
	    	displayField: 'parmName',
	    	valueField: 'parmCode',
	    	typeAhead: true,
	    	mode: 'local',
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowBlank:false
		});
		typeStore.load();

		var menuStore = new Ext.data.JsonStore({
	    	url: 'parmInfoProvider.do?parmType=menu_type',
	    	fields: ['parmCode', 'parmName'],
	    	listeners: {  
				load: function() {  
					menuCombo.setValue(menuCombo.getValue());  
				}  
			}  
		});

		var menuCombo = new Ext.form.ComboBox({
	   		store: menuStore,
	   		name: EN[7],
	   		hiddenName: EN[7],
			fieldLabel: CN[7],
	    	displayField: 'parmName',
	    	valueField: 'parmCode',
	    	typeAhead: true,
	    	mode: 'local',
	    	triggerAction: 'all',
	    	selectOnFocus: true,
	    	editable: true,
	    	allowBlank:false
		});
		menuStore.load();
		
		formPanel = new Ext.FormPanel({
			baseCls: 'x-plain',
	        labelWidth: 95,
	        frame:true,
	        bodyStyle:'padding:10px 10px 10px 10px; border: 0px solid;',
	        autoWidth: true,
			autoHeight: true,
	        defaults: {width: 210},
	        defaultType: 'textfield',
			bodyBorder: false,
			border: false,
	        items: [{
	        		xtype:'hidden',
					id: EN[0],
	                name: EN[0]
            	}/*,{
					id: EN[1],
	                name: EN[1],
	                fieldLabel: CN[1],
					allowBlank:false
	            }*/,{
		            xtype : 'uxtreecombobox',
	            	id : 'parentname',
	            	hiddenName : 'parentname',
	            	name : 'parentname',
	            	fieldLabel : CN[2],
	            	displayField : 'text',
	            	valueField : 'menuId',
	            	allowBlank : false,
	            	rootVisible : false,
	            	treeUrl : URL.loadNodes,
	            	rootText : '根结点',
	            	rootId : '0',
	            	setValue :function(node) {
	            		if (typeof node == "object") {
	            			this.setRawValue(node.text);
	            			if (this.hiddenField) {
	            				this.hiddenField.value = node.attributes.id;
	            				Ext.getCmp('parentId').setValue(node.attributes.id);
	            			}
	            		} else {
	            			this.setRawValue(node);
	            		}
	            	},
	            	listeners :{
	            		focus : function(obj){
	            			obj.tree.getLoader().on("beforeload", function(treeLoader, node) {
	            				treeLoader.baseParams.id = (typeof(node.attributes.id) =="undefined" ? "0": node.attributes.id);
	            			}, obj.tree);
	            		}
	            	}
				},{
	        		xtype:'hidden',
					id: EN[2],
	                name: EN[2]
            	},{
					id: EN[3],
	                name: EN[3],
	                fieldLabel: CN[3],
					allowBlank:true
	            },new Ext.form.ComboBox({
	    	   		store: typeStore,
	    	   		name: EN[4],
	    	   		hiddenName: EN[4],
	    			fieldLabel: CN[4],
	    	    	displayField: 'parmName',
	    	    	valueField: 'parmCode',
	    	    	typeAhead: true,
	    	    	mode: 'local',
	    	    	triggerAction: 'all',
	    	    	selectOnFocus: true,
	    	    	editable: true,
	    	    	allowBlank:false
	    		}),new Ext.form.ComboBox({
			   		store: typeStore,
			   		name: EN[5],
			   		hiddenName: EN[5],
					fieldLabel: CN[5],
			    	displayField: 'parmName',
			    	valueField: 'parmCode',
			    	typeAhead: true,
			    	mode: 'local',
			    	triggerAction: 'all',
			    	selectOnFocus: true,
			    	editable: true,
			    	allowBlank:false
				}),{
	            	id: EN[6],
	                name: EN[6],
	                fieldLabel: CN[6],
					allowBlank:true
				},{
					xtype:'iconcombo',
	        		id: EN[7],
	        		name: EN[7],
					fieldLabel:CN[7],
					store: iconStore,
					valueField: 'iconCode',
					displayField: 'iconName',
					iconClsField: 'iconCSS',
					editable: false,
					triggerAction: 'all',
					mode: 'local'
				},{
					id: EN[12],
	                name: EN[12],
	                fieldLabel: CN[12],
					allowBlank:true
	            },new Ext.form.ComboBox({
	    	   		store: typeStore,
	    	   		name: EN[9],
	    	   		hiddenName: EN[9],
	    			fieldLabel: CN[9],
	    	    	displayField: 'parmName',
	    	    	valueField: 'parmCode',
	    	    	typeAhead: true,
	    	    	mode: 'local',
	    	    	triggerAction: 'all',
	    	    	selectOnFocus: true,
	    	    	editable: true,
	    	    	allowBlank:false
	    		}),{
					id: EN[10],
	                name: EN[10],
	                fieldLabel: CN[10],
					allowBlank:false
	            }/*,menuCombo ,{
		            xtype : 'hidden',
	            	id : EN[10],
	            	name: EN[10]
				} */
	        ]
	    });
		addPanel = new Ext.Window({
			el:'panel-example',
	        layout:'fit',
			width: 350,
	        height: 400,
			resizable : false,
			items: formPanel,
			closeAction: 'hide',
			actionUrl: '',
			buttons: [{
	                    text:'保存',
	                    handler: function() {
	                    	formPanel.form.submit({
	                    		url: addPanel.actionUrl,
	                    		method: 'post',
	                    		success: function(form, action) {
									addPanel.hide();
									store.reload();
	                    		},
	                    		failure: function(form, action) {
									addPanel.hide();
			                    	var parentNode = tree.getSelectionModel().getSelectedNode().parentNode;
			                    	parentNode.reload();
	                    		},
	                    		clientValidation: false,
	                    		waitMsg: Message.waitMsg
	                    	});
						}
	                },{
	                    text: '取消',
	                    handler: function(){
	                       addPanel.hide();
	                    }
	        		}]
		});
	},
	add : function() {
		addPanel.show();
		addPanel.setTitle('新增');
		addPanel.actionUrl = URL.save;
		formPanel.getForm().reset();
		var node = tree.getSelectionModel().getSelectedNode();
		formPanel.getForm().findField('parentname').setValue(node.attributes.text);
		formPanel.getForm().findField('parentId').setValue(node.attributes.id);
	},
	modify : function(tree) {
		var id = '';
    	var sign = true;
    	
    	var node = tree.getSelectionModel().getSelectedNode();
    	var attr = {id: node.attributes.id,
    		text: node.attributes.text,
    		leaf: node.attributes.leaf,
    		disable: node.attributes.disable,
    		cls: node.attributes.cls,
    		iconCls: node.attributes.iconCls,
    		visibility: node.attributes.visibility,
    		type: node.attributes.type,
    		hrefTarget: node.attributes.hrefTarget,
    		parentId: node.attributes.parentId,
    		sort: node.attributes.sort};
    	if(node.id != null) {
    		sign = false;
           	id = node.id;
    	}
    	if(sign) {
    		 Ext.Msg.alert('提示','请选择要修改的记录!');
    		 return;
    	}
    	Ext.Ajax.request({
 		   url: URL.queryData,
 		   success: function(response) {
 		   		var record = response.responseText.evalJSON();
 		   		addPanel.show();
 		   		addPanel.setTitle('修改');
 				addPanel.actionUrl = URL.update;
 				formPanel.getForm().setValues(record);
 		   },
 		   failure: Ext.emptyFn,
 		   params: { id: id,
 	 		       	record: Ext.util.JSON.encode(attr)}
 		});
	},
	del : function(tree){
		var id = '';
    	var sign = true;
    	var node = tree.getSelectionModel().getSelectedNode();
    	if(node.id != null) {
    		sign = false;
           	id = node.id;
    	}
    	if(sign) {
    		 Ext.Msg.alert('提示','请选择要删除记录!');
    		 return;
    	}
    	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
    		if(val == 'yes'){
			 	Ext.Ajax.request({
				   url: URL.deleteData,
				   success: function(){
			 			Ext.emptyFn;
			 			node.parentNode.reload();
				   },
				   failure: Ext.emptyFn,
				   params: { key: id }
				});
    		}
    	})
	}
	
}
var Panel = {
		show : function() {
			Ext.QuickTips.init();
			TreePanel.create();
			WinPanel.create();

			var uxtreecombobox = Ext.getCmp('parentname');
			uxtreecombobox.tree.addListener('expandnode', function(){
        		var root = uxtreecombobox.tree.getRootNode();
        		findchildnode(root);
				}, uxtreecombobox.tree);

		}
	}


</script>
</head>
<body onload="Panel.show()">

	<div id="content">	
 		<div id="tree-grid" />
   	</div>
	<div id="panel-example" />
</body>
</html>
