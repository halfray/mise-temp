Ext.ns('Frame');
var rootIDArr = [];

Frame.getLeftPanel = function() {
	
	/*登陆用户信息*/
	var userPanel = new Ext.Panel({
		width : 200,
		id:'userPanel',
		bodyBorder:true,
		border:true,
		region: 'north',
		bodyStyle:'background:#4b4b4b',
		height:82
	});
	
	var mainLeftPanel = new Ext.Panel({
		id : 'mainLeftPanel',
		region : 'south',
		title : ' ',
		split : true,
		width : 220,
		minSize : 175,
		maxSize : 400,		
		collapsible :false,
//		margins : '0 0 2 5',
//		cmargins : '0 0 0 0',
		autoScroll : true,
		layout : 'accordion'
	});
	
	var westPanel = new Ext.Panel({
		id : 'westPanel',
		region : 'west',
		width : 220,
		title : ' ',
		autoScroll : true,
		height:1500,
		style : 'padding:2px 0px 3px 0px;',
		items:[userPanel,mainLeftPanel]
	});

	westPanel.updateRoot = function(parentId) {
		mainLeftPanel.reset();
		Main.jsonrpc.jsonRpcClient._call(getRootCallBack,
				'functionService.getRootFunctionsByParenetId', parentId);
	}
	mainLeftPanel.reset = function() {
		mainLeftPanel.removeAll();
	}

	getRootCallBack = function(result, exception) {
		if (result.length) {
			if (!Ext.isEmpty(Ext.get('leftPanelLoadingDiv')))
				Ext.get('leftPanelLoadingDiv').remove();

			Main.frame.bottomPanel.setStatusInfo('一级菜单加载完毕，正在加载各模块菜单 ...');

			for (var i = 0; i < result.length; i++) {
				var root = new Ext.tree.AsyncTreeNode({
							id : result[i].id,
							text : result[i].text,
							expanded : true
						});
				rootIDArr[i] = root;

				var treeloader = new Ext.tree.TreeLoader({
					url : Main.jsonrpc.path,
					baseParams : {
						method : 'functionService.getRootFunctionsByParenetId',
						result : 'direct'
					},
					listeners : {
						beforeload : function(treeLoader, node) {
							if (Ext.isEmpty(node.attributes.id))
								this.baseParams.params = node.id;
							else
								this.baseParams.params = node.attributes.id;
						}
					}
				});

				var tree = new Ext.tree.TreePanel({
							id : result[i].functionid,
							title : result[i].text,
							rootVisible : false,
							lines : true,
							animate : true,
							autoHeight:true,
							autoWidth:true,
							enableDD : false,
							iconCls :'x-left-icon-front',
							loader : treeloader,
							autoScroll : true
						});

				tree.setRootNode(root);
				tree.on('click', function(node, e) {
							M.rpc._call("treeManager.getLowerTreeNodeByRole","1");//判断用户是否登录或者登录超时
							e.stopEvent();
							for(var i = 0; i < rootIDArr.length; i++){
								findchildnode(rootIDArr[i]);
							}
							node.getUI().addClass("newAdded");
							var path = Main.contextPath;
//							if(node.leaf){
//								node.getUI().getIconEl().src = path+'/scripts/ext-3.3.1/resources/images/default/tree/leaf_node_s.png';
//							}
							if (node.attributes.hrefTarget
									&& node.attributes.hrefTarget != ''
									&& node.attributes.hrefTarget != '/'
									&& node.attributes.hrefTarget != '\\') {
								var tipinfo = node.text;
								var tn = node;
								while (tn.parentNode) {
									tipinfo = tn.parentNode.text + '>>'
											+ tipinfo;
									tn = tn.parentNode;
								}
								var conf = {
									href : node.attributes.hrefTarget,
									text:  node.text,
									icon: node.iconCls,
									tipinfo: node.tipinfo	
								};
								Main.frame.centerPanel.loadPage(conf);
							} else if (node.attributes.hrefTarget == '/'
									&& node.isLeaf()) {
								centerPanel.loadPage(
										"iframe-/smart/frame/build.htm",
										"building", node.text, node.iconCls,
										tipinfo);
							}
						});

				root.expand(false, true);
				mainLeftPanel.add(tree);
			} // FOR END
			setTimeout(function() {
						Main.frame.bottomPanel.setStatusInfo('所有模块菜单加载完毕！');
					}, 1000);

			westPanel.doLayout();
		}
	}
	
	var path = Main.contextPath;
	
	//获取所有的子节点 
	function findchildnode(node){
		 var childnodes = node.childNodes;
		 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
			 var nd = this;
			 nd.getUI().removeClass("newAdded");
			 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
				 nd.getUI().removeClass("newAdded");
				 findchildnode(nd); //如果存在子节点 递归
			 }else{
//				 nd.getUI().getIconEl().src = path+'/scripts/ext-3.3.1/resources/images/default/tree/leaf_node.png';
			 }
		 });
	}
	
	return westPanel;

}