/**
 * 按输入值动态查询数据的comboBox
 */
Ext.ux.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
	dataMethod : '', // 后台方法
	pageSize : 10, // 默认每页展示的数据条数
	minChars : 0, // 最小查询长度
	width:120,//统一风格
	loadingText : '查询中...', // 查询中提示信息
	valueField : undefined,
	searchField : undefined, // 查询的属性
	displayField : undefined, // 展示的属性
	dataParams : undefined, // 默认查询条件
	// hideTrigger:true, //隐藏下拉按钮
	typeAhead : false,
	resizable : true,
	defaultFirstValue:false,	//默认选择第一条数据
	triggerAction : 'all', // 点击下拉时查询所有
	fields : undefined, // 查询的数据域
	forceSelection : true,
	root : 'result.list',
	// 创建查询条件
	createCriteria : function() {
		this.criteria = Ext.isDefined(this.criteria) ? this.criteria : {
			start : 0,
			pageSize : this.showPagingBar ? this.pageSize : 5,
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
		Ext.ux.SearchComboBox.superclass.initComponent.call(this); // 父类方法

		if (!Ext.isDefined(this.fields))
			this.fields = [];

		var maps = [{
					name : this.displayField,
					mapping : this.displayField
				}, {
					name : this.valueField,
					mapping : this.valueField
				}];
		for (var i = 0; i < this.fields.length; i++) {
			maps.push({
						name : this.fields[i],
						mapping : this.fields[i]
					})
		}

		var self = this;
		this.store = Ext.isDefined(this.dataStore)
				? this.dataStore
				: new Ext.data.Store({// 这是数据源
					proxy : new Ext.data.HttpProxy({
								url : Main.jsonrpc.path
							}),
					reader : new Ext.data.JsonReader({
								root : this.root,// 定义读取列表的属性,此处不需更改
								totalProperty : 'result.rowsTotal',// 定义后台返回的标识总记录数的属性
								id : this.filterId
							}, maps// 定义JsonReader读取的字段,需要各自定义
					),
					remoteSort : false
				});
		this.store.on('beforeLoad', function(obj, options) {
			self.createCriteria();
			if (Ext.isDefined(self.criteria)) {
				var cri = self.criteria;
				cri.start = (options.params == undefined || options.params.start == undefined)
						? 0
						: options.params.start;// 设置查询条件的start(起始记录位置)
				if (Ext.isDefined(options.params.sort))
					cri.order = params.order = {
						list : [options.params.sort + ' ' + options.params.dir],
						javaClass : 'java.util.ArrayList'
					};
				if (options.params.pageSize)
					cri.pageSize = options.params.pageSize;
				this.baseParams.params = Ext.util.JSON.encode([cri]);
				this.baseParams.method = self.dataMethod ? self.dataMethod : '';// 定义需要调用的后台方法,此处需要根据情况修改
			}
			return true;
		});
		
		if(this.defaultFirstValue===true && Ext.isEmpty(this.value))
		{
			var self = this;
			var dataParams = {};
			dataParams[this.valueField] = '%';
			this.doSearchList(this.criteria,dataParams, function()
			{
				var record = self.store.getAt(0);
				if(!Ext.isEmpty(record))
				{
					self.value = record.data[self.valueField];
					self.setValue(record.data[self.valueField]);
				}
			});
		}
	},
	initList : function() {
		if (Ext.isDefined(this.pageSize))
			this.listWidth = this.listWidth ? Math.max(Math.max(Math.max(
									this.wrap.getWidth(), this.minListWidth),
							250), this.listWidth) : Math.max(Math.max(this.wrap
									.getWidth(), this.minListWidth), 250); // 如果设置分页,保证分页工具条完全显示
		Ext.ux.SearchComboBox.superclass.initList.call(this); // 父类方法
	},
	setParams : function(param) {
		this.dataParams = param;
	},
	appendParams : function(param) {
		Ext.apply(this.dataParams,param);
	},
	updateParams : function() {
		var callback = null;
		var dataParams = null;
		if (arguments.length == 1) {
			dataParams = arguments[0];
		} else if (arguments.length == 2) {
			if (typeof(arguments[1]) == 'function') {
				dataParams = arguments[0];
				callback = arguments[1];
			}
		}
		this.setParams(dataParams);
		this.doSearchList(this.criteria, this.dataParams, callback);
	},
	doSearchList : function(criteria, dataParams,callback) {
		this.criteria = Ext.isEmpty(criteria) ? this.criteria : criteria;
		this.dataParams = Ext.isEmpty(dataParams) ? this.dataParams : dataParams;
		this.store.load({
					callback : Ext.isDefined(callback) ? callback : function(r,
							o, success) {
					}
				});
	},
	getParams : function(q) {
		if (!Ext.isDefined(this.dataParams))
			this.dataParams = {};
		var field = this.searchField || this.displayField;
		this.dataParams[field] = q;
	},
	doValueQuery : function(value) {
		var self = this;
		// 添加查询属性
		if (!Ext.isDefined(this.dataParams))
			this.dataParams = {};
		this.dataParams[self.valueField] = value;
		this.updateParams(this.dataParams);
	},
	onTriggerClick : function() {
		if (!Ext.isEmpty(this.dataParams))
			this.lastQuery = null; // dataParams不为空,则认为查询条件发生变化,更新查询
		Ext.ux.SearchComboBox.superclass.onTriggerClick.call(this); // 父类方法
	},
	setValue : function(v) {
		if(Ext.isEmpty(v)) this.clearValue() ;
		
		 var text = v;
        var self = this;
        if(this.valueField){
            if(this.store.getCount()<=0)
            {
            	this.store.load({
            		callback:function()
            		{
            			if(self.store.getCount()>0)
            				self.setValue(v);
            		}
            	});
            }else
            {
            	Ext.ux.seraph.DictCombo.superclass.setValue.call(self, v);
            }
        }
	}
});
Ext.reg('searchComboBox', Ext.ux.SearchComboBox);
