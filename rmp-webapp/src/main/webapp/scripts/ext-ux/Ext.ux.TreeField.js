Ext.ux.TreeField = Ext.extend(Ext.form.TriggerField, {
	readOnly : false, // 是否只读,只读时无下拉列表
	defaultAutoCreate : {
		tag : "input",
		type : "text",
		size : "24",
		autocomplete : "off"
	},
	displayField : 'text', // 展示属性
	valueField : undefined, // 值属性
	editable: false, // 是否可编辑
	listWidth : undefined, // 下拉列表宽度
	minListWidth : 50, // 最小下拉列表宽度
	layerHeight : undefined, // 下拉列表高度
	minLayerHeight : 60, // 最小下拉列表高度
	tree : undefined, // 指定 Ext.Tree
	value : undefined, // 值
	dataMethod : undefined, // 后台方法
	dataParams : [], // 后台参数
	animate : true,// 是否有动画效果
	onlyLeafSelect : true,
	rootVisible : true,	//是否显示根节点
	listAlign : 'tl-bl?',
	treeRootConfig : { // 加载提示
		id : 'root',
		text : '请选择...',
		draggable : false
	},
	initComponent : function() {
		Ext.ux.TreeField.superclass.initComponent.call(this);
		this.addEvents('select', 'expand', 'collapse', 'beforeselect');
	},
	onRender : function(ct, position) {
		Ext.ux.TreeField.superclass.onRender.call(this, ct, position);
		this.rawField = this.el.insertSibling({
			tag : 'input',
			type : 'hidden',
			name : this.name
				// +'_rawvalue'
			}, 'before', true);
		this.rawField.value = this.value !== undefined ? this.value : '';
		this.el.dom.removeAttribute('name');
		if (Ext.isGecko) {
			this.el.dom.setAttribute('autocomplete', 'off');
		}

		this.initList();
	},
	initList : function() {
		if (!this.list) {
			var cls = 'x-treefield-list';

			this.list = new Ext.Layer({
						shadow : this.shadow,
						cls : [cls, this.listClass].join(' '),
						constrain : false
					});

			var lw = this.listWidth
					|| Math.max(this.wrap.getWidth(), this.minListWidth);
			this.list.setWidth(lw);
			this.list.swallowEvent('mousewheel');
			this.innerList = this.list.createChild({
						cls : cls + '-inner'
					});
			this.innerList.setWidth(lw - this.list.getFrameWidth('lr'));
			this.innerList.setHeight(this.layerHeight || this.minLayerHeight);
			if (!this.tree) {
				this.tree = this.createTree(this.innerList);
			}
			if (this.value && !this.root.isLoaded())
				this.root.reload();
			var treeField = this;
			this.tree.on('click', function(node, e) {
						treeField.onSelect(node);
					});
			this.tree.render();
		}
	},
	onSelect : function(node) {
		if (this.onlyLeafSelect && !node.isLeaf())
			return;
		if (this.fireEvent('beforeselect', node, this) != false) {
			var text = node[this.displayField];
			var value = node[this.valueField || this.displayField];
			this.setRawValue(text);
			this.setValue(value,true);
			this.collapse();
			this.fireEvent('select', this, node);
		}
	},
	createTree : function(el) {
		var Tree = Ext.tree;
		var self = this;
		var tree = new Tree.TreePanel({
					el : el,
					height : self.layerHeight,
					autoScroll : true,
					animate : self.animate,
					containerScroll : true,
					rootVisible:self.rootVisible,
					loader : new Ext.tree.TreeLoader({
								url : Main.jsonrpc.path,
								baseParams : {
									method : self.dataMethod,
									params : Ext.util.JSON
											.encode(self.dataParams),// 传递的参数
									result : 'direct'
								}
							})
				});

		this.root = new Tree.AsyncTreeNode(this.treeRootConfig);
		tree.setRootNode(this.root);			
		return tree;
	},
	findRecord : function(treeLoader, node) {
		var self = this;
		var parentNode = null;
		var temp ;
		if(node.loading)
		{
			Main.fun.tryRun(function(){return !node.loading},Main.fun.Fun(self,self.findRecord,[treeLoader,node]),-1,100);
			return ;
		}
		if (self.rawField.value) {
			node.cascade(function(n) {
						if (!n.isLeaf() && !n.isLoaded()) {
							n.reload();//如果没有load 无法进行该节点下一层的cascade 
							return true;
						}
						if (n.attributes[self.valueField] == self.rawField.value) {
							temp = n.attributes[self.displayField];
							self.setRawValue(n.attributes[self.displayField]);
							self.setValue(n.attributes[self.valueField],true);
							n.select();
							parentNode = n.parentNode;
							return false;
						}
					});
			node.collapseChildNodes(true);
			parentNode.expand();//只展开当前选中叶子节点 added by shiym 2013-12-25
		}
		if(!temp) self.setRawValue('');
	},
	getRawValue : function() {
		if (this.valueField) {
			return typeof this.value != 'undefined' ? this.value : '';
		} else {
			return Ext.ux.TreeField.superclass.getValue.call(this);
		}
	},
	setValue : function(value,ignore) {
		 this.rawField.value = value;
		 if(!ignore)
			 this.findRecord(this.tree.getLoader(), this.tree.getRootNode());
	},
	getValue : function() {
		if (this.rawField) {
			return this.rawField.value;
		} else {
			return Ext.ux.TreeField.superclass.getValue.call(this);
		}
	},
	setRawValue : function(value) {
		Ext.ux.TreeField.superclass.setValue.call(this, value,true);
		if (this.rawField) {
			this.rawField.value = value;
		}
	},
	onDestroy : function() {
		if (this.list) {
			this.list.destroy();
		}
		Ext.ux.TreeField.superclass.onDestroy.call(this);
	},
	collapseIf : function(e) {
		if (!e.within(this.wrap) && !e.within(this.list)) {
			this.collapse();
		}
	},
	expand : function() {
		if (this.isExpanded() || !this.hasFocus) {
			return;
		}
		this.list.alignTo(this.wrap, this.listAlign);
		this.list.show();
		Ext.getDoc().on('mousewheel', this.collapseIf, this);
		Ext.getDoc().on('mousedown', this.collapseIf, this);
		this.fireEvent('expand', this);
	},
	collapse : function() {
		if (!this.isExpanded()) {
			return;
		}
		this.list.hide();
		Ext.getDoc().un('mousewheel', this.collapseIf, this);
		Ext.getDoc().un('mousedown', this.collapseIf, this);
		this.fireEvent('collapse', this);
	},
	isExpanded : function() {
		return this.list && this.list.isVisible();
	},
	onTriggerClick : function() {
		  if(this.readOnly || this.disabled){
	            return;
	      }
		if (this.isExpanded()) {
			this.collapse();
		} else {
			this.onFocus({});
			this.expand();
		}
		this.el.focus();
	}
});
Ext.reg('treefield', Ext.ux.TreeField);