Ext.ux.SimpleGrid = Ext.extend(Ext.grid.GridPanel, {
	viewData : true, // 是否初始化数据
	dataStore : undefined,
	frame : true,
	stripeRows : true,
	root : 'list',
	recordType:[],
	autoLoad:true,
	initComponent : function() {
		for (var i = 0, j = this.columns.length; i < j; i++) {
			if (Ext.isDefined(this.columns[i].dataIndex))
				this.recordType.push(this.columns[i].dataIndex);
		}
		this.dataStore = Ext.isDefined(this.dataStore)
				? this.dataStore
				: new Ext.data.JsonStore({
			    		root:this.root,
			            totalProperty: 'totalCount',
			    	    url: this.url,
			    	    restful: true,
			    	    fields: this.recordType
			    	});
		this.store = this.dataStore;
		if(this.autoLoad)
			this.store.load();
		Ext.ux.SimpleGrid.superclass.initComponent.call(this);
	},


	clearStore : function() {// 清空表中数据
		this.dataStore.removeAll();
	},


	loadData : function(obj) {
		if (obj) {
			this.dataStore.loadData({
						list : obj
					});
		}
	},
	addRecord : function(obj) {// 添加一条记录
		this.store.add(obj);
	},
	refreshGrid : function() {// 刷新方法
		this.pagingBar.doLoad(this.pagingBar.cursor);
	},

	getTotalCount : function() {// 返回数据总数
		return this.dataStore.getTotalCount();
	},
	getSelected : function() {
		if (this.getSelectionModel())
			return this.getSelectionModel().getSelected();
	},
	getSelect : function(name) {
		if (this.getSelectionModel() && this.getSelected())
			return this.getSelected().get(name);
	},
	getSelections : function() {
		if (this.getSelectionModel())
			return this.getSelectionModel().getSelections();
	}
});