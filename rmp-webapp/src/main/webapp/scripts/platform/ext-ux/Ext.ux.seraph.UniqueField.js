
Ext.ux.UniqueField = Ext.extend(Ext.form.TriggerField, {
	allowBlank: false,
	validateOnBlur: true,
	emptyText: '此字段值需唯一',  
	invalidText: '此字段值需唯一!',
	triggerClass: 'x-form-key-trigger',
	validator: function() {
		uniqueFieldValidation(this);
		return valid;
	},
	onTriggerClick: function() {
		uniqueFieldValidation(this);
		return valid;
	}
});

var valid = '';
function uniqueFieldValidation(element) {
	new Ajax.Request('dictionaryCodeValidation.do', {
		asynchronous: false,
		onSuccess: function(response) {
			var result = response.responseText.evalJSON();
			if(result.isUniqueCode) {
				valid = true;
				return;
			} else {
				valid = false;
				return;
			}
		},
		parameters: { dictionaryCode: Ext.getDom(element.getId()).value }
	});
}
