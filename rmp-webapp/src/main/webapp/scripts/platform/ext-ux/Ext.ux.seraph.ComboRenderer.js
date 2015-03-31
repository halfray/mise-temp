
Ext.ns("Ext.ux");
Ext.ns("Ext.ux.renderer");
	
Ext.ux.renderer.ComboRenderer = function(options) {
	var value = options.value;
	//数值为空，不继续匹配
	if(Ext.isEmpty(value)) return '';
	
	var combo = options.combo;
	var returnValue = value;
	var valueField = combo.valueField;

	var idx = combo.store.findBy(function(record) {
		if(record.get(valueField) == value) {
			returnValue = record.get(combo.displayField);
			return true;
		}
	});
	
	if(idx < 0 && value == null) {
		returnValue = '';
	}
	return returnValue;
};
	
Ext.ux.renderer.Combo = function(combo) {
	return function(value, meta, record) {
		return Ext.ux.renderer.ComboRenderer({value: value, meta: meta, record: record, combo: combo});
	};
};