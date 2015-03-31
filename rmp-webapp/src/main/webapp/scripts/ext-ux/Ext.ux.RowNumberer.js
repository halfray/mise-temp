Ext.ns("ux","Ext.ux");

Ext.ux.RowNumberer = function(cfg){
	Ext.ux.RowNumberer.superclass.constructor.call(this,cfg);
};

Ext.ux.RowNumberer = Ext.extend(Ext.grid.RowNumberer, {
	renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
		var start = 0;
		if(store.lastOptions.params != null){
			start = store.lastOptions.params.start;
		}
		return start + rowIndex + 1;  
	},
    initComponent : function(){
		Ext.ux.RowNumberer.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('rowNumberer', Ext.ux.RowNumberer);