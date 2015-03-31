/**
 * @class Ext.ux.seraph.TreeCombo
 * @extends Ext.form.TriggerField
 * Provides a color input field with a {@link Ext.ColorPalette} dropdown.
 * @constructor
 * Create a new TreeCombo
 * <br />Example:
	<pre><code>
	var color_field = new Ext.form.ColorField({
		fieldLabel: 'Color',
		id: 'color',
		width: 175,
		allowBlank: false
	});
	</code></pre>
 * @param {Object} config
 */
Ext.ux.seraph.TreeCombo = function(config){
	Ext.ux.seraph.TreeCombo.superclass.constructor.call(this, config);
};

Ext.extend(Ext.ux.seraph.TreeCombo, Ext.form.ComboBox,  {
    
	initComponent : function(){
		
		var template = '<tpl for="."><div id=_tree-"' + this.id + '" /></tpl>';
		this.tpl = template;
		
		Ext.ux.seraph.TreeCombo.superclass.initComponent.call(this);
	
	}
	
	
});

Ext.reg("treecombo", Ext.ux.seraph.TreeCombo);
