Ext.ns("Ext.ux.SimpleCombo");
	
		Ext.ux.SimpleCombo = function(id, url, displayField, valueField) {
			var simpleStore = new Ext.data.JsonStore({
			    url: url,
			    fields: [displayField, valueField],
			    listeners: {  
					load: function() {
						this.insert(0, new Ext.data.Record({valueField:'', displayField:' '}));
					}  
				}
			})
			simpleStore.load();
	
		    var simpleCombo = new Ext.form.ComboBox({
		        id: id,
		        store: simpleStore,
		        width: 120,
		        displayField: displayField,
		        valueField: valueField,
		        typeAhead: true,
		        mode: 'local',
		        triggerAction: 'all',
		        selectOnFocus: true, 
		        editable: true,
			    anchor:'95%',
			    listeners: {
					blur: function() {
						this.setValue(this.getValue().replace(' ', ''));
					}
				}
		    });
			return simpleCombo;
		}
	
		Ext.ns("Ext.ux.BaseCombo");
	
		Ext.ux.BaseCombo = function(url, displayField, valueField) {
			var baseStore = new Ext.data.JsonStore({
			    url: url,
			    fields: [displayField, valueField]
			});
			baseStore.load();
		    var baseCombo = new Ext.form.ComboBox({
		        store: baseStore,
		        displayField: displayField,
		        valueField: valueField,
		        typeAhead: true,
		        mode: 'local',
		        triggerAction: 'all',
		        selectOnFocus: true, 
		        editable: false,
			    anchor:'95%'
		    });
			return baseCombo;
		}
