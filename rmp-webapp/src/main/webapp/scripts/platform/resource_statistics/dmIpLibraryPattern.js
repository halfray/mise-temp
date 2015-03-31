/**
 * Liuyansong 20130413
 */
var barChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
barChart.width = '100%';
barChart.height = '100%';
barChart.wMode = 'Transparent';

var barData = new BarData();
barData.setXaxisRotation("315");//x轴倾斜315°
barData.setYRotation("315");//柱状图上的数值倾斜315°
barData.setXaxisName('省份');
barData.setYaxisName('IP数量');

function getBarData() {
	M.rpc._call(updateBarData, 'dmIpLibraryPatternAction.getIpList');
}

function updateBarData(data) {
	if (!data || data.length == 0)
		data = [{}];
	barData.setSeries(data);
	barData.setY_axisLogScale();//指数方式显示纵轴
	barChart.setJSData(barData.getData());
}

Ext.onReady(function() {

	var panel = new Ext.ux.seraph.ChartPanel({
		chartId: 'barChart',
		//width:1160,
		width: Ext.get('content').getWidth(),
		renderTo: 'user-grid'
	});

	barChart.write('barChart');
	getBarData();
});
