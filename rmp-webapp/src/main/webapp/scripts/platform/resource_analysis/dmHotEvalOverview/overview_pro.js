/**4.1.4.2 调度效果分析**/
base.portal.overview_pro = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/BarData.js'],
					
	init:function()
	{
//		Main.fun.showProcessWait();
		this.data = new BarData();
		
		this.chart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
		this.chart.width = '100%';
		this.chart.height = '100%';
		this.chart.wMode = 'Transparent';
		this.chart.setJSData(this.data.getData());
		
		this.panel = new Ext.Panel({
			width : 970,
			frame: true,
			baseCls : 'x-plain',
			html : '<div style="width:960;height: 350; overflow:auto"> <div id="barChart" style="width:2000"></div></div>'
		});

	},
	render:function(div)
	{
		this.panel.render(div);
		this.chart.write('barChart');
	},
	getData:function(data)
	{
		var mapData = {};
		mapData.topN = data.topN;
		mapData.hotBasis = data.hotBasis;
		
		M.rpc._call(Main.fun.Fun(this,this.updateData),"dmHotEvalOverview.getOverviewProList", {
			javaClass: 'java.util.HashMap',
			map: mapData
		});	
		
	},
	updateData:function(data)
	{
		this.data.setSeries(data);
		this.chart.setJSData(this.data.getData());
//		Main.fun.closeProcessWait();
	},
	refresh:function(data)
	{
		this.getData(data);
	}
});