Ext.ns("seraph", "Ext.ux.seraph");

Ext.ux.seraph.DictCombo = function(cfg) {
	Ext.ux.seraph.DictCombo.superclass.constructor.call(this, cfg);
};

Ext.ux.seraph.DictCombo = Ext.extend(Ext.form.ComboBox, {

	// private config overrides
	typeAhead : true,
	mode : 'local',
	triggerAction : 'all',
	selectOnFocus : true,
	editable : false,
	url : '',
	displayField : '',
	valueField : '',
	emptyText : '请选择',
	showAllSelect : false,
	// private
	initComponent : function() {
		var self = this;
		Ext.ux.seraph.DictCombo.superclass.initComponent.apply(this, arguments);
		var typeArr = (self.url).split('='); //类型
		var type = typeArr[1];
		if(System.common.dict.stores[type]) {
			this.store = System.common.dict.stores[type];
			return;
		}
		
		var store = new Ext.data.JsonStore({
					proxy : new Ext.data.HttpProxy({
								api : {
									read : this.url
								}
							}),
					fields : [this.displayField, this.valueField]
				});
		this.store = store;
		
		store.load({
					callback : function() {
						if (self.showAllSelect) {
							var temprecord = Ext.data.Record.create([{
										name : self.displayField,
										type : 'string'
									}, {
										name : self.valueField,
										type : 'string'
									}]);
							var allvalues = "{" + self.displayField
									+ ":'--全部--'," + self.valueField + ":''}"
							var allrecord = new temprecord(Ext
									.decode(allvalues));
							this.insert(0, allrecord);
						}

					}
				});
		this.store = store;
	},
	
    setValue : function(v){
        var text = v;
        var self = this;
        if(this.valueField){
            if(this.store.getCount()<=0)
            {
            	this.store.load({
            		callback:function()
            		{
		            	Ext.ux.seraph.DictCombo.superclass.setValue.call(self, v);
            		}
            	});
            }else
            {
            	Ext.ux.seraph.DictCombo.superclass.setValue.call(self, v);
            }
        }
    },
	// private
	onRender : function() {
		Ext.ux.seraph.DictCombo.superclass.onRender.apply(this, arguments);
	}
});

Ext.reg('dictcombo', Ext.ux.seraph.DictCombo);
