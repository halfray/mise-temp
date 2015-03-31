Ext.ns("seraph","Ext.ux.seraph");

Ext.ux.seraph.SelectCombo = function(cfg){
	Ext.ux.seraph.SelectCombo.superclass.constructor.call(this,cfg);
};

Ext.ux.seraph.SelectCombo = Ext.extend(Ext.form.ComboBox, {

    // private config overrides
	typeAhead: true,
    mode: 'local',
    triggerAction: 'all',
    selectOnFocus: true, 
    editable: false,
    url: '',
    displayField: '',
    valueField: '',
    hiddenName : '',

    // private
    initComponent : function(){
    	
    	Ext.ux.seraph.SelectCombo.superclass.initComponent.apply(this, arguments);
    	
		var store = new Ext.data.JsonStore({
		    proxy: new Ext.data.HttpProxy({  
	    	    api: {
	    	        read: this.url
	    	    }
            }),
		    fields: [this.displayField, this.valueField],
		    listeners: {  
				load: function() {
					this.insert(0, new Ext.data.Record({valueField:'', displayField:' '}));
				}  
			}
		});
		store.load();
        this.store = store;
    	
	    this.on('blur', this.onBlur, this);
    },

    // private
    onRender : function(){
    	Ext.ux.seraph.SelectCombo.superclass.onRender.apply(this, arguments);
    },
    
    onBlur : function() {
    	this.setValue(this.getValue().replace(' ', ''));
    }
});

Ext.reg('selectcombo', Ext.ux.seraph.SelectCombo);
