/**
 * 二、网站资源全网分布情况
 */
var chart={
		getChart : function() {	
			var chart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
			chart.width = '100%';
			chart.height = '100%';
			chart.wMode = 'Transparent';
			return chart;
		},

		getBarChart : function() {			
			var barChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
			barChart.width = '100%';
			barChart.height = '100%';
			barChart.wMode = 'Transparent';
			return barChart;
		},
		getdomain : function() {			
			var domainData = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
			domainData.width = '100%';
			domainData.height = '100%';
			domainData.wMode = 'Transparent';
			return domainData;
	}
}
// 初始化饼图的背景色
new PieData().dataDefaults.charts.chart.chart_settings.chart_background.fill.color="#fafafa";
	//域名数量分布视图
	var domainNumChart = chart.getChart();
	var domainNumData = new PieData();
	domainNumData.setPoints(null);
	domainNumChart.setJSData(domainNumData.getData());
	
	
	//URL数量分布视图
	var outerLinkResChart = chart.getBarChart();
	var outerLinkResData = new PieData();
	outerLinkResData.setPoints(null);
	outerLinkResChart.setJSData(outerLinkResData.getData());	
	
	//各省域名本网引入率比较
	var domainIntroRate = chart.getdomain();
	var barData = new BarData();
	barData.setXaxisName('省份');
	barData.setXaxisRotation("315");//x轴倾斜315°
	barData.setYRotation("90");//柱状图上的数值倾斜315°
	barData.formatDefaults.tooltipFormat='{%SeriesName}:{%YValue}{numDecimals:#valuePre#}%';
	barData.formatDefaults.labelFormat='{%YValue}{numDecimals:#valuePre#}%';
	barData.setY_axisMin(0.0001,0,4);
	barData.setY_axisLogScale();
	barData.setYPosition("center","center","center");//调整y轴label显示位置
//	barData.setYColor("black");//调整y轴label显示颜色
	domainIntroRate.setJSData(barData.getData());

	//xx省域名引入变化情况
	var lineChart = chart.getChart();
	var lineData = new LineData();
	lineData.setXaxisName('月份');
//	lineData.setYaxisName('数量');
	lineData.setPoints(null);
	lineChart.setJSData(lineData.getData());
	var province = "";
	function updateMapData(data) {
		if (!data || data.length == 0)
			data = [{}];
		
		
		domainNumData.setPoints(data.c1);
		domainNumData.setTitle('域名数总计：'+data.domainTotal);
		domainNumChart.setJSData(domainNumData.getData());
		
		
		outerLinkResData.setPoints(data.c2);
	 	outerLinkResData.setTitle('URL总计：'+data.urlTotal);
		outerLinkResChart.setJSData(outerLinkResData.getData());
		
		barData.setSeries(data.c3);
		barData.setTitle('各省域名本网引入率');
		domainIntroRate.setJSData(barData.getData());
		
		lineData.setSeries(data.c4);
		lineData.setTitle(province+'省域名引入变化情况');
		lineChart.setJSData(lineData.getData());
	}
	function getChartData(data) {
		var mapData = {};
		mapData.webSiteId = data.webSiteId;
		mapData.webSiteName = data.webSiteName;
		mapData.province = data.province;
		province = data.provinceName;
		M.rpc._call(updateMapData, 'analysisReportNetWorkWebSiteResDistrService.getList',{
			javaClass : 'java.util.HashMap',
			map : mapData
		});
	}	
	 Ext.onReady(function() {
		 domainNumChart.write('domainNumChart')
		 outerLinkResChart.write('outerLinkResChart')
		 domainIntroRate.write('barChart')
		 lineChart.write('lineChart')
	 });