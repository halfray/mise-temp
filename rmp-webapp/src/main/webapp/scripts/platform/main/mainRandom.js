/**
 * async-tree.js Power by YUI-EXT and JSON.
 * 
 * @author 刘岩松
 * @email seraph115@gmail.com
 */

var AsyncTree = { 
	author: "Seraph",
	version: "0.1.0"
};

// -> Configuration of tree. e.g: CG[1]
var CG = {
	1: "asyncMenuProvider.do",
	2: "async"
};

// -> Root-node name in Chinese. e.g: CN[1]
var CN = {
	1: "菜单",
	2: "配置"
};

// -> Root-node ID of tree. e.g: ID[1]
var ID = {
	1: "-1",
	2: "-2"
};

var leftTree = null;
/**
 * 
 */
function treeClick(menuid,para){
	var node = leftTree.getNodeById(menuid);
	if(node){
		node.attributes.para = para;
		leftTree.fireEvent('click',node);
	}
};

Ext.onReady(function(){
		
	Ext.QuickTips.init();
	
	// User's apps
	UserDeatil.create();
	UserAuth.create();
	UserPwd.create();
	UserStyle.create();
	
	var Tree = Ext.tree;
    
    var myTreeLoader = new Ext.tree.TreeLoader({
    	url: CG[1]
    });
   
   	myTreeLoader.on("beforeload", function(treeLoader, node) {
   		myTreeLoader.baseParams.id = node.attributes.menuId;
	}, myTreeLoader);

    var tree = new Tree.TreePanel({
        el:'tree1',
        width : 500,
     	height: Ext.get('west').getHeight()-Ext.get('tree2').getHeight()-112,
		border: false,
		autoScroll: true,
		containerScroll: true,
		//ddScroll: true,
		overflow:'auto',
        animate:true,
        enableDD:true,
        rootVisible:false,
        loader: myTreeLoader,
        root: {
            nodeType: CG[2],
            text: CN[1],
            menuId:-1,
            id: ID[1]
    	},
	    listeners: {  
			click: function(node,e) {
				if (node.isLeaf()) {
					// alert(node.attributes.sort);
					var newframe = '<iframe id=\'frame' + node.attributes.id + '\' scrolling="auto" width="100%" height="100%" src=' + node.attributes.hrefTarget + '></iframe>';
					addTab(node.attributes.id, node, newframe);
				} else { 
					node.toggle();
				}
			}
		}
    });
    
    leftTree = tree;
	    
	tree.render();
	tree.getRootNode().expand();
	var myTreeLoader1 = new Ext.tree.TreeLoader({
	    url: CG[1]
	});
   
	myTreeLoader1.on("beforeload", function(treeLoader, node) {
   	    myTreeLoader1.baseParams.id = node.attributes.id;
	}, myTreeLoader1);
    
    var tree1 = new Tree.TreePanel({
        el:'tree2',
        width : 500,
     	height: Ext.get('west').getHeight()-Ext.get('tree2').getHeight()-112,
		border: false,
		autoScroll:true,
		containerScroll  : true,
		ddScroll :true,
        animate:true,
        enableDrag : false,
        rootVisible:false,
        loader: myTreeLoader,
        root: {
            nodeType: CG[2],
            text: CN[2],
            menuId:-2,
            id: ID[2]
    	},
	    listeners: {  
			click: function(node) {  
				if(node.isLeaf()){ 

					var newframe = '<iframe id=\'frame' + node.attributes.id + '\' scrolling="auto" width="100%" height="100%" src=' + node.attributes.hrefTarget + '></iframe>';
					addTab(node.attributes.id, node, newframe);

				}else{ 
					node.toggle();
				}
			}
		}
    });
    tree1.render();
    tree1.getRootNode().expand();
    
	var scrollerMenu = new Ext.ux.TabScrollerMenu({
		maxText  : 15,
		pageSize : 5
	});

    var tabs = new Ext.TabPanel({
        renderTo: 'tabs',
        resizeTabs: true,
        minTabWidth: 115,
        tabWidth: 135,
        enableTabScroll: true,
		autoWidth: true,
		bodyBorder: false,
		height: Ext.get("center2").getHeight() - 40,
        defaults: {autoScroll:true},
        plugins: [scrollerMenu, new Ext.ux.TabCloseMenu()],
        listeners : {
        	tabchange : function(tp,p){
        		var node = p.treeNode;
        		if(node){
        			//展开节点
        			leftTree.expandPath(node.getPath());
        			//选择节点
        			node.select();
        			//移至节点
        			leftTree.body.scrollChildIntoView(Ext.fly(node.getUI().getTextEl()),true);
        		}else{
        		}
        	}
        }
    });

    var pageArray = new Array();
    
    var i = 0;
    function addTab(id, node, newiframe,newTab){
        if(pageArray.indexOf(id) < 0 || newTab) {
        	pageArray.push(id);
        	tabs.add({
        		id: id,
	            title: node.attributes.text,
	            treeNode : node,
	            layout: 'fit',
	            iconCls: node.attributes.iconCls,
	            html: newiframe,
	            closable: true,
	            listeners: {
	            	destroy: function(panel) {
	            		pageArray.remove(panel.getId());
	            	}
	            }
        	}).show();
       } else {
        	tabs.setActiveTab(tabs.getItem(id));	        	
       }
    }
		
    var mypanel = new Ext.Panel({
    	layout: 'fit',
        region: 'center',
        deferredRender: false,
        border: false,
        style:'padding:2px 0px 3px 0px',
        activeTab:0,
        items:[tabs]
    });
 
    var viewport = new Ext.Viewport({
        layout:'border',
        id:'viewport',
        items:[
            new Ext.BoxComponent({
                region:'north',
                el: 'north',
                height:35
            }),{
                region:'west',
                id:'west-panel',
                title:'目录',
                style:'padding:2px 0px 3px 0px',
                split:true,
                width: 200,
                minSize: 175,
                maxSize: 400,
                collapsible: true,
                margins:'0 0 0 0',
                layout:'accordion',
                layoutConfig:{
                    animate:true
                },
                items: [{
                    contentEl: 'tree1',
                    title:'菜单',
                    border:false,
                    iconCls:'menu-nav',
					autoShow: true
                },{
					contentEl: 'tree2',
                    title:'配置',
                    border:false,
                    iconCls:'menu-settings'
                }],
                listeners: {
                	collapse : function(p) {
                			var reWidth = Ext.getBody().getWidth();
                			var reHeight = p.getSize().height;
                			tabs.setSize(reWidth, null);
                	},              	
                	resize: function(c, adjWidth, adjHeight, rawWidth, rawHeight) {
                			var reWidth = Ext.getBody().getWidth() - adjWidth;
                			tabs.setSize(reWidth, null);
                	}
                }
            },
            mypanel
         ]
    });
    
    function syncBoxSize(obj, width, height) {
		var items = obj.findByType('grid');
		for(var i = 0;i < items.length; i++) {
			items[i].setSize(width, height);
		}
    }
   
    var frame = '';
    frame = '<iframe id="iframe_welcome" style="overflow-x: hidden;" width="100%" height="100%" src="welcome.do"></iframe>';

	tabs.add({
		id: 'welcome',
        title: '首页',
        iconCls: 'welcome-tab-icon',
        html: frame,
        closable: false,
        layout: 'fit',
        bbar: new Ext.ux.StatusBar({
            id: 'word-status',
            items: [{
                xtype:'tbsplit',
                text:'<img src="images/platform/icon/box.png" alt="我的应用" />',
                menuAlign: 'br-tr?',
                menu: new Ext.menu.Menu({
                    items: [
						{text: '用户基本信息', iconCls: 'personal-info', listeners: {click: function() {UserDeatil.show();}}},
						{text: '用户权限信息', iconCls: 'personal-authority', listeners: {click: function() {UserAuth.show();}}},
						//{text: '用户短消息', iconCls: 'personal-sms'},
						{text: '用户密码修改', iconCls: 'personal-pwd', listeners: {click: function() {UserPwd.show();}}},
						{text: '用户风格设定', iconCls: 'personal-style', listeners: {click: function() {UserStyle.show();}}},
						{text: '清除Cookie', iconCls: 'remove-cookie',
						 listeners: {
							click: function() {
								Ext.MessageBox.confirm('确认', '确认要清除用户Cookie?', function(btn) {
									if(btn == 'yes') {
										Ext.Ajax.request({
											url: 'security/removeCookie.do',
											success: Ext.emptyFn,
											failure: Ext.emptyFn
										});
									}
								})
							}
						}}
                    ]
                })
            }, ' ']
        }),
        listeners: {
            'render': {
                fn: function(){

                }
            }
        }
    }).show();
	
	mypanel.on('resize' , function(p,w,h){
		if(tabs.rendered){
			tabs.setWidth(w);
			tabs.setHeight(h);
		}
	});
	
});
