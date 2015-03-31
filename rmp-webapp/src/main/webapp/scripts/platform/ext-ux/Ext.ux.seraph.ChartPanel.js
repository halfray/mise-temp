Ext.ns("seraph","Ext.ux.seraph");

Ext.ux.seraph.ChartPanel = function(cfg){
	Ext.ux.seraph.ChartPanel.superclass.constructor.call(this,cfg);
};

Ext.ux.seraph.ChartPanel = Ext.extend(Ext.Panel, {

    // private config overrides
	chartId: 'barChart',
	layout: 'fit',
	border: false,
	bodyBorder: false,
	bodyStyle: 'background-color:#ffffff;',
    
    // private
    initComponent : function(){
		var internalPanel = new Ext.Panel({id: this.chartId});
		this.items = [internalPanel];
		Ext.ux.seraph.ChartPanel.superclass.initComponent.apply(this, arguments);
    },

    // private
    onRender : function(){
    	Ext.ux.seraph.ChartPanel.superclass.onRender.apply(this, arguments);
    }
});

Ext.reg('chartpanel', Ext.ux.seraph.ChartPanel);