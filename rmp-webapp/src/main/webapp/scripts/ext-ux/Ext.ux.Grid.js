/**
 * 扩展的grid 用于方便进行数据展示
 */
Ext.ux.Grid = Ext.extend(Ext.grid.GridPanel, {
	dataMethod : '', // 方法,格式为 服务名.方法名
	dataParams : undefined, // 参数(待实现多个参数)
	renderTo : '', // 要渲染的地方
	order : undefined, // 要排序字段 ['类属性 desc','类属性 desc']
	recordType : [], // 私有属性,定义从后台获取的所有属性信息
	viewData : true, // 是否初始化数据
	dataStore : undefined,
	pagingBar : undefined,
	loadMask : {msg:Main.constant.freshInfo},
	fetchSize : Main.cts.fetchSize,// 页数
	showPagingBar : true, // 是否显示分页条
	sortBar : false, // 是否有全部排序按钮
	litePagingBar : false,//显示简约的分页
	filterId : 'id', // 筛选id
	frame : true,
	stripeRows : true,
	criteria : undefined,
	root : 'result.list',
	/*plugins : new Ext.ux.PanelResizer({
				minHeight : 100
			}),// 动态调整grid高度*/
	createCriteria:function()
	{
		this.criteria = Ext.isDefined(this.criteria)
							? this.criteria
							: {
								start : 0,
								fetchSize : this.showPagingBar
										? this.fetchSize
										: -1,
								javaClass : Main.cts.javaClass.Criteria
							};
					if (Ext.isDefined(this.order)) {
						this.criteria.order = {
							list : this.order,
							javaClass : 'java.util.ArrayList'
						};
					};
					if (Ext.isDefined(this.dataParams)) {
						this.criteria.data = {
							map : this.dataParams,
							javaClass : 'java.util.HashMap'
						};
					};
	},
	initComponent : function() {
		var self = this;
		self.createCriteria();
		for (var i = 0, j = this.columns.length; i < j; i++) {
			if (Ext.isDefined(this.columns[i].dataIndex))
				this.recordType.push(this.columns[i].dataIndex);
		}
		this.dataStore = Ext.isDefined(this.dataStore)
				? this.dataStore
				: new Ext.data.Store({// 这是数据源
					proxy : new Ext.data.HttpProxy({
								url : Main.jsonrpc.path
							}),
					reader : new Ext.data.JsonReader({
								root : this.root,// 定义读取列表的属性,此处不需更改
								totalProperty : 'result.rowsTotal',// 定义后台返回的标识总记录数的属性
								id : this.filterId
							}, this.recordType// 定义JsonReader读取的字段,需要各自定义
					),
					remoteSort : false//true为支持后台排序
				});
		if(this.litePagingBar){
			this.pagingBar = new Ext.PagingToolbar({// 定义分页的工具条
	    		pageSize : this.criteria.fetchSize,// 这里与前面定义的大小保持一致
				paramNames : {
					start : 'start',
					limit : 'fetchSize',
					sort : "sort",
					dir : "dir"
				},
				store : this.dataStore
				
			});
			//this.getBottomToolbar().bind(this.dataStore);
		}else{
			this.pagingBar = Ext.isDefined(this.pagingBar)
			? this.pagingBar
			: new Ext.PagingToolbar({// 定义分页的工具条
				pageSize : this.criteria.fetchSize,// 这里与前面定义的大小保持一致
				paramNames : {
					start : 'start',
					limit : 'fetchSize',
					sort : "sort", // The parameter name which
					// specifies
					dir : "dir"
				},// *必须指定这两个属性,无须修改
				store : this.dataStore,// 将前面定义的store作为其属性
				displayInfo : true,
				displayMsg : '共{2}条',
				emptyMsg : "没有数据",
				plugins : [new Ext.ux.plugins.PageComboResizer()], // 调整每页显示的行数
				prependButtons : true
			});
		}
		if (this.sortBar) {
			this.pagingBar.add(['-', {
						pressed : false,
						enableToggle : true,
						dataStore : this.dataStore,
						text : Main.cts.sortText,
						align:'center',
						toggleHandler : function(btn, pressed) {
							this.dataStore.remoteSort = pressed ? true : false;
						}
					}])
		}
//		this.loadMask = new Ext.LoadMask(document.body, {
//					msg : Main.cts.refreshInfo
//				});
		this.store = this.dataStore;
		if (this.showPagingBar) {
			this.bbar = this.pagingBar;
		}
		this.dataStore.on('beforeload', function(store, options) {
			//创建查询对象
			self.createCriteria();
			if (Ext.isDefined(self.criteria)) {
				var cri = self.criteria;
				cri.start = (options.params == undefined || options.params.start == undefined)
						? 0
						: options.params.start;// 设置查询条件的start(起始记录位置)
				if (Ext.isDefined(options.params.sort))
					cri.order = options.params.order = {
						list : [options.params.sort + ' ' + options.params.dir],
						javaClass : 'java.util.ArrayList'
					};
				if (options.params.fetchSize)
					cri.fetchSize = options.params.fetchSize;
				this.baseParams.params = Ext.util.JSON.encode([cri]);
				this.baseParams.method = self.dataMethod ? self.dataMethod : '';// 定义需要调用的后台方法,此处需要根据情况修改
			}
		});
		Ext.ux.Grid.superclass.initComponent.call(this);
	},

	onRender : function(ct, position) {
		Ext.ux.Grid.superclass.onRender.call(this, ct, position);
		if (this.viewData) {
			this.doSearchList(this.criteria);
		}
		this.cellTip();
	},
	// add by hezhenjun 单元格内容有时看不全，toolTip弹出显示
	tooltip: true,
	minTipLength: 5,
    cellTip: function() {
    	if(this.tooltip) {
    		this.on('mouseover', function(e) {
        		var target = e.getTarget();
        		var text = target.innerHTML.trim();
        		text = text.replace('&nbsp;','');
        		if(target.childNodes.length < 2 && text.indexOf('<') == -1 && text.length > this.minTipLength)
        			target.title = text;
        	});
    	}
	},

	doSearchList : function(criteria,callback) {
		this.criteria = Ext.isEmpty(criteria)?this.criteria:criteria;
		this.dataStore.load({
					callback : Ext.isDefined(callback) ? callback : function(r,
							o, success) {
						if (!success) {
						}
					}
				});
	},

	clearStore : function() {// 清空表中数据
		this.dataStore.removeAll();
	},

	setParams: function(param)
	{
		this.dataParams = param;
	},
	updateParams : function(param) {
		var callback = null;
		var dataParams = null;
		if(arguments.length == 1)
		{
			dataParams = arguments[0];
		}
		else if (arguments.length == 2) {
			if (typeof(arguments[1]) == 'function') {
				dataParams = arguments[0];
				callback = arguments[1];
			} 
		}
		this.setParams(dataParams);
		this.viewData = true;
		this.doSearchList(this.criteria,callback);
	},

	loadData : function(obj) {
		if (obj) {
			this.dataStore.loadData({
						result : {
								list : obj
						}
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
Ext.reg('uxgird', Ext.ux.Grid);

/**
 * 扩展的groupGrid
 */
Ext.apply(Ext.grid.GroupingView.prototype, {
    groupByText: "分组字段为",
    showGroupsText: "显示分组栏"
}); 
Ext.ux.GroupGrid = Ext.extend(Ext.grid.GridPanel, {
	dataMethod: '', // 方法
	groupField:'',
	sortField:'',
	direction:'',
	hideGroupedColumn:undefined,
	showGroupName:undefined,
	dataParams: undefined, // 参数待实现多个参数
	renderTo: '', // 要渲染的地方
	order: undefined, // 要排序字段 ['类属性 desc','类属性 desc']
	recordType: [], // 私有属性
	viewData: true, // 是否初始化数据
	view: undefined,
	initCriteria: undefined,
	condition: undefined,
	dataStore: undefined,
	pagingBar: undefined,
	fetchSize: Main.cts.fetchSize,//页数
	showPagingBar: true, // 是否显示分页条
	sortBar: false, // 是否有全部排序按钮
	filterId: 'id', // 筛选id
	frame:true,
	stripeRows: true,
	root:'result.list',
	//plugins: new Ext.ux.PanelResizer({minHeight: 100 }),//动态调整grid高度
	createCriteria:function()
	{
		this.criteria = Ext.isDefined(this.criteria)
							? this.criteria
							: {
								start : 0,
								fetchSize : this.showPagingBar
										? this.fetchSize
										: -1,
								javaClass : Main.cts.javaClass.Criteria
							};
					if (Ext.isDefined(this.order)) {
						this.criteria.order = {
							list : this.order,
							javaClass : 'java.util.ArrayList'
						};
					};
					if (Ext.isDefined(this.dataParams)) {
						this.criteria.data = {
							map : this.dataParams,
							javaClass : 'java.util.HashMap'
						};
					};
	},
	initComponent: function() {
		var self = this;
		self.createCriteria();
		
		this.view = Ext.isDefined(this.view)?this.view:new Ext.grid.GroupingView({
			 hideGroupedColumn:Ext.isDefined(this.hideGroupedColumn)?this.hideGroupedColumn:true,
			 showGroupName:Ext.isDefined(this.showGroupName)?this.showGroupName:true,
	         groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
	     });
		for (var i = 0,j=this.columns.length; i < j; i++) {
			if (Ext.isDefined(this.columns[i].dataIndex))
				this.recordType.push(this.columns[i].dataIndex);
		}
		this.dataStore = Ext.isDefined(this.dataStore)
		? this.dataStore
		: new Ext.data.GroupingStore({// 这是数据源
			proxy : new Ext.data.HttpProxy({
						url : Main.jsonrpc.path
					}),
			reader : new Ext.data.JsonReader({
						root : this.root,// 定义读取列表的属性,此处不需更改
						totalProperty : 'result.rowsTotal',// 定义后台返回的标识总记录数的属性
						id : this.filterId
					}, this.recordType// 定义JsonReader读取的字段,需要各自定义
			),
			remoteSort : false,//true为支持后台排序
			groupField:this.groupField,
			sortInfo:{field:this.sortField,direction:Ext.isDefined(this.direction)?this.direction:'ASC'}
		});
		if(this.litePagingBar){
			this.pagingBar = new Ext.PagingToolbar({// 定义分页的工具条
				pageSize : this.criteria.fetchSize,// 这里与前面定义的大小保持一致
				paramNames : {
					start : 'start',
					limit : 'fetchSize',
					sort : "sort",
					dir : "dir"
				},
				store : this.dataStore
				
			});
			//this.getBottomToolbar().bind(this.dataStore);
		}else{
			this.pagingBar = Ext.isDefined(this.pagingBar)
			? this.pagingBar
			: new Ext.PagingToolbar({// 定义分页的工具条
				pageSize : this.criteria.fetchSize,// 这里与前面定义的大小保持一致
				paramNames : {
					start : 'start',
					limit : 'fetchSize',
					sort : "sort", // The parameter name which
					// specifies
					dir : "dir"
				},// *必须指定这两个属性,无须修改
				store : this.dataStore,// 将前面定义的store作为其属性
				displayInfo : true,
				displayMsg : '第{0} 到 {1} 条数据 共{2}条',
				emptyMsg : "没有数据",
				plugins : [new Ext.ux.plugins.PageComboResizer()], // 调整每页显示的行数
				prependButtons : true
			});
		}
		if (this.sortBar) {
			this.pagingBar.add(['-', {
						pressed : false,
						enableToggle : true,
						dataStore : this.dataStore,
						text : Main.cts.sortText,
						align:'center',
						toggleHandler : function(btn, pressed) {
							this.dataStore.remoteSort = pressed ? true : false;
						}
					}])
		}
		this.loadMask = new Ext.LoadMask(document.body, {
					msg: Main.cts.refreshInfo
		});
		this.store = this.dataStore;
		if (this.showPagingBar) {
			this.bbar = this.pagingBar;
		}
		this.dataStore.on('beforeload', function(store, options) {
			//创建查询对象
			self.createCriteria();
			if (Ext.isDefined(self.criteria)) {
				var cri = self.criteria;
				cri.start = (options.params == undefined || options.params.start == undefined)
						? 0
						: options.params.start;// 设置查询条件的start(起始记录位置)
				if (Ext.isDefined(options.params.sort))
					cri.order = options.params.order = {
						list : [options.params.sort + ' ' + options.params.dir],
						javaClass : 'java.util.ArrayList'
					};
				if (options.params.fetchSize)
					cri.fetchSize = options.params.fetchSize;
				this.baseParams.params = Ext.util.JSON.encode([cri]);
				this.baseParams.method = self.dataMethod ? self.dataMethod : '';// 定义需要调用的后台方法,此处需要根据情况修改
			}
		});

		Ext.ux.GroupGrid.superclass.initComponent.call(this);
	},

	onRender: function(ct, position) {
		Ext.ux.GroupGrid.superclass.onRender.call(this, ct, position);
		if (this.viewData){
			this.doSearchList(this.initCriteria);
		}
	},

	/*doSearchList: function(criteria, callback) {
		var baseParams = this.dataStore.baseParams;
		baseParams.method = this.dataMethod ? this.dataMethod: '';// 定义需要调用的后台方法,此处需要根据情况修改
		baseParams.params3 = Ext.util.JSON.encode(criteria);// 将查询条件封装,无须修改
		baseParams.params2 = this.dataParams;
		this.dataStore.baseParams = baseParams;// 将条件传递给store
		this.dataStore.load({
			callback: Ext.isDefined(callback) ? callback: function(r, o, success) {
				if (!success) {
				}
			}
		});
	},*/
	doSearchList : function(criteria,callback) {
		this.criteria = Ext.isEmpty(criteria)?this.criteria:criteria;
		this.dataStore.load({
					callback : Ext.isDefined(callback) ? callback : function(r,
							o, success) {
						if (!success) {
						}
					}
				});
	},

	clearStore: function() {// 清空表中数据
		this.dataStore.removeAll();
	},

	/*updateCondition: function(con) {
		var callback = null;
		var useDefault = true;
		if(arguments.length==2){
			if(typeof(arguments[1])=='function'){
				callback = arguments[1];
			}else{
				useDefault = arguments[1];
			}
		}else if(arguments.length==3){
			callback = arguments[1];
			useDefault = arguments[2];
		}
		//this.viewData=true;
		con=Ext.isDefined(this.condition)&&con&&useDefault?Main.fun.unionArray(this.condition,con):con;
		this.initCriteria.condition = con ? {
			list: con,
			javaClass: 'java.util.ArrayList'
		}: {
			list: [],
			javaClass: 'java.util.ArrayList'
		};
		this.initCriteria.fetchSize = Ext.isDefined(this.pagingBar) ? this.pagingBar.pageSize : 15;
		this.doSearchList(this.initCriteria, callback);
	},*/
	setParams: function(param)
	{
		this.dataParams = param;
	},
	updateParams : function(param) {
		var callback = null;
		var dataParams = null;
		if(arguments.length == 1)
		{
			dataParams = arguments[0];
		}
		else if (arguments.length == 2) {
			if (typeof(arguments[1]) == 'function') {
				dataParams = arguments[0];
				callback = arguments[1];
			} 
		}
		this.setParams(dataParams);
		this.viewData = true;
		this.doSearchList(this.criteria,callback);
	},

	/*loadData: function(obj) {
		if (obj) {
			this.dataStore.loadData({
				result: {
					list: {
						list: obj
					}
				}
			});
		}
	},*/
	loadData : function(obj) {
		if (obj) {
			this.dataStore.loadData({
						result : {
								list : obj
						}
					});
		}
	},
  	addRecord: function(obj){// 添加一条记录
	 this.store.add(obj);
	},
	refreshGrid: function() {// 刷新方法
		this.pagingBar.doLoad(this.pagingBar.cursor);
	},

	getTotalCount: function() {// 返回数据总数
		return this.dataStore.getTotalCount();
	},
	getSelected:function()
	{
		if(this.getSelectionModel()) return this.getSelectionModel().getSelected();
	},
	getSelect : function(name)
	{
		if(this.getSelectionModel() && this.getSelected())
		return this.getSelected().get(name);
	},
	getSelections: function()
	{
		if(this.getSelectionModel()) return this.getSelectionModel().getSelections();
	}
});
Ext.override(Ext.grid.GridView, {   
    scrollTop : function() {   
        this.scroller.dom.scrollTop = 0;   
        this.scroller.dom.scrollLeft = 0;   
    },   
    scrollToTop : Ext.emptyFn   
});  
Ext.reg('uxGroupGird', Ext.ux.GroupGrid);