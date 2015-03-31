
Ext.ns("Ext.ux");
Ext.ns("Ext.ux.renderer");
	
Ext.ux.renderer.ColorComboRenderer = function(options) {
	var value = options.value;
	var combo = options.combo;
	var metaData = options.meta;	
	var returnValue = value;
	var valueField = combo.valueField;
	var condition = options.condition;

	var idx = combo.store.findBy(function(record) {
		if(record.get(valueField) == value) {
			returnValue = record.get(combo.displayField);
			return true;
		}
	});
	
	if(idx < 0 && value == null) {
		returnValue = '';
	}
	
	// {red: a, yellow: b, green: c} 
	// {red: {val: 'a', exp: '=='}, yellow: {val: 'b', exp: '<='}, green: {val: 'c', exp: '>='}}//condition传入格式

	var formula = 'if('+ '"' + value + '"' + condition.red.exp + '"' + condition.red.val + '"' + '){ ' 
	
	                + 'metaData.attr ='+'\'style="color: black; background-color: red;"\''+';'
	
	       +'}else if('+'"' + value +'"' +  condition.yellow.exp +'"' +  condition.yellow.val +'"' +  '){ ' 
	      
	       			+ 'metaData.attr ='+'\'style="color: black; background-color: yellow;"\''+';'
	      			   
	       +'}else if('+'"' + value +'"' +  condition.green.exp + '"' + condition.green.val +'"' +  '){ ' 
	      
	       			+ 'metaData.attr ='+'\'style="color: black; background-color: green;"\''+';}';
	
   eval(formula);
	

	return returnValue;

};
	
Ext.ux.renderer.ColorCombo = function(combo, condition) {
	return function(value, meta, record) {
		return Ext.ux.renderer.ColorComboRenderer({value: value, meta: meta, record: record, combo: combo, condition: condition});
	};
};