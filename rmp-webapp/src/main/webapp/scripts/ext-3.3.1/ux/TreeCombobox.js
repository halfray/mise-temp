Ext.namespace("Ext.ux.form");

Ext.ux.form.TreeComboBox = Ext.extend(Ext.form.ComboBox, {

	// private config overrides
	rootId : '0',
	rootText : 'root',
	treeUrl : '',
	rootVisible : false,
	shadow : true,
	triggerAction : 'all',
	editable : false,
	maxHeight : 200,
	mode : 'local',
	autoScroll : false,
	// forceSelection : true,

	initComponent : function(ct, position) {

		this.addEvents('beforeClickNode', 'afterClickNode');
		
        this.addEvents(
            'expand',
            'collapse',
            'beforeselect',
            'select',
            'beforequery'
        );

		this.divId = 'tree-' + Ext.id();
		if (isNaN(this.maxHeight))
			this.maxHeight = 200;
		
		Ext.apply(this, {
			tpl : '<tpl>' + '<div style="height:' + this.maxHeight + 'px;">'
					+ '<div id="' + this.divId + '"></div>' + '</div></tpl>'
		});

		this.store = new Ext.data.SimpleStore({
			fields : [],
			data : [ [] ]
		});

		var treeLoader = new Ext.tree.TreeLoader({
			dataUrl : this.treeUrl,
			clearOnLoad : true
		});

		treeLoader.on("beforeload", function(treeLoader, node) {
			treeLoader.baseParams.id = node.attributes.id;
		}, treeLoader);

		this.tree = new Ext.tree.TreePanel({
			height : 200,
			border : false,
			root : new Ext.tree.AsyncTreeNode({
				id : this.rootId,
				text : this.rootText,
				draggable : false,
				expanded : true
			}),
			rootVisible : this.rootVisible,
			loader : treeLoader,
			border : false,
			autoScroll : true,
			enableSort : false
		});
		this.tree.addListener("click", this.clickNode, this);
		this.tree.addListener('collapsenode', this.onNodeCollapse, this);
		this.tree.addListener('expandnode', this.onNodeExpand, this);

		Ext.ux.form.TreeComboBox.superclass.initComponent.call(this);
	},

	onSelect : function(record, index) {
		alert('onSelect');
	},

	clickNode : function(node) {
		if (this.fireEvent('beforeClickNode', this, node)) {
			this.setValue(node);
		}
		this.fireEvent("afterClickNode", this, node);
		this.collapse();
	},

	onNodeCollapse : function(node) {
		this.expand();
	},

	onNodeExpand : function(node) {
		this.expand();
	},

	onRender : function(ct, position) {
		Ext.ux.form.TreeComboBox.superclass.onRender.call(this, ct, position);
		
		this.on('select', this.onSelect, this);
		
		this.on("expand", function() {
			if (!this.tree.rendered) {
				this.tree.render(this.divId);
			}
		}, this)
	},

	/* ���´�����Ϊ�˽�tree��node���õ�combo�� ��Ϊ�һ���һЩ��������ã��������ǽ��ⲿ�ֵĴ�����д������ط��� */
	setValue : function(node) {
		if (typeof node == "object") {
			this.setRawValue(node.text);
			if (this.hiddenField) {
				this.hiddenField.value = node.id;
			}
		} else {
			this.setRawValue(node);
		}
	}

});

Ext.reg('uxtreecombobox', Ext.ux.form.TreeComboBox);
