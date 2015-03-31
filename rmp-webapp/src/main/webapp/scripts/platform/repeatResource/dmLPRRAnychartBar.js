/**
 * 省内资源重复情况,用条形图展示
 */
base.portal.dmLPRRAnychartBar = Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/BarData.js'],
	init : function(params){
		var anyChartHeight=document.body.clientHeight-23;
		this.barData = new BarData();
		this.barChart = new AnyChart("swf/AnyChart.swf","swf/Preloader.swf");
		this.barChart.width = '100%';
		this.barChart.height = anyChartHeight+'px';
		this.barChart.wMode = 'Transparent';
		this.barData.setXaxisName('类别');
		this.barData.setYaxisName('重复资源数量');
	
		var barPanel = new Ext.Panel({
					id : 'barChart',
					html : 'any chart show there'
				});
		var self = this;
	
		this.mainPanel = new Ext.Panel({
					layout:'fit',
					frame : true,
					baseCls : 'x-plain',
					items : [barPanel],
					colspan : 8
				});
		
		
	},
	getGridData : function() {
		var data = this.data;
		var self = this;
		M.rpc._call(Main.fun.Fun(self, self.updateBarData),
				'dmLocalProviceRepeatResourceAction.getListForBar', {
					javaClass : 'java.util.HashMap',
					map : data
				});
	},
	updateBarData : function(data) {
		if(Ext.isEmpty(data)) return;
		this.barData.setSeries(data);
		this.barChart.setJSData(this.barData.getData());
	},
	render : function(div) {
		this.mainPanel.render(div);
		this.barChart.setJSData(this.barData.getData());
		this.barChart.write('barChart');
	},
	refresh : function(data) {
		this.data = data;
		this.getGridData();
	}
});