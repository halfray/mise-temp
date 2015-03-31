/**
 * 一、网站基本情况
 */
var chartUtil = {
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

	getPieChart : function() {
		
		var pieChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
		pieChart.width = '100%';
		pieChart.height = '100%';
		pieChart.wMode = 'Transparent';
		return pieChart;
	}
}
// 初始化饼图的背景色
new PieData().dataDefaults.charts.chart.chart_settings.chart_background.fill.color="#fafafa";
//域名数量分布视图
var domainNumChart = chartUtil.getChart();
var domainNumData = new PieData();
domainNumData.setPoints(null);
domainNumChart.setJSData(domainNumData.getData());

//URL数量分布视图
var URLNumChart = chartUtil.getChart();
var URLNumData = new PieData();
URLNumData.setPoints(null);
URLNumChart.setJSData(URLNumData.getData());

/*//URL大小分布视图
var URLSizeChart = chartUtil.getChart();
var URLSizeData = new PieData();
URLSizeData.setPoints(null);
URLSizeChart.setJSData(URLSizeData.getData());

//大文件数量分布视图
var bigfileNumChart = chartUtil.getChart();
var bigfileNumData = new PieData();
bigfileNumData.setPoints(null);
bigfileNumChart.setJSData(bigfileNumData.getData());

//大文件大小分布视图
var bigfileSizeChart = chartUtil.getChart();
var bigfileSizeData = new PieData();
bigfileSizeData.setPoints(null);
bigfileSizeChart.setJSData(bigfileSizeData.getData());*/

function getChartData(data) {
	var mapData = {};
	mapData.webSiteId = data.webSiteId;
	M.rpc._call(updateMapData, 'analysisReportService.getAnalysisReportBaseTotal',{
		javaClass : 'java.util.HashMap',
		map : mapData
	});
}
/*var webSiteType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue'
});*/
function updateMapData(data) {
	Main.fun.showLoadProcessWait();
	if (!data || data.length == 0)
		data = [{}];
	var baseTotalArray = new Array();
	if( data.baseTotal != null)
		{
			baseTotalArray.push('<div class="aaa">');
		    baseTotalArray.push('<div class="background1">');
		    baseTotalArray.push('<div class="bgLeft"></div>');
		    baseTotalArray.push('<div class="bgRight"></div>');
			baseTotalArray.push('<div class="webBox">');
			baseTotalArray.push('<div class="webName">网站名称：<span>' + data.baseTotal.webSiteName +'</span></div>');
			baseTotalArray.push('<ul class="webDetailList">');
			baseTotalArray.push('<li>网站类型：' + data.baseTotal.webSiteType +'</li>');
			baseTotalArray.push('<li>域名数共计：<span>'+data.baseTotal.domainNumAll+'个</span></li>');
			baseTotalArray.push('<li>URL数共计：'+data.baseTotal.URLNumAll+'个，'+ Main.fun.getMFromByte(data.baseTotal.URLSizeAll) +'M</li>');
			baseTotalArray.push('<li>大文件数共计：'+data.baseTotal.bigfileNumAll+'个，'+ Main.fun.getMFromByte(data.baseTotal.bigfileSizeAll) +'M</li>');
			baseTotalArray.push('</ul>');
			baseTotalArray.push('</div>');
			baseTotalArray.push('</div>');
			baseTotalArray.push('</div>');
		}
	var baseTotal = baseTotalArray.join('');
	document.getElementById('baseTotal').innerHTML = baseTotal;
	
	domainNumData.setTitle('域名数总计：'+data.domainNumAll);
	domainNumData.setPoints(data.chart1);
	domainNumChart.setJSData(domainNumData.getData());
	
	URLNumData.setTitle('URL资源总计：'+data.URLNumAll);
	URLNumData.setPoints(data.chart2);
	URLNumChart.setJSData(URLNumData.getData());
	
	/*URLSizeData.setTitle('URL大小总计：'+Main.fun.getMFromByte(data.URLSizeAll));
	URLSizeData.setPoints(data.chart3);
	URLSizeChart.setJSData(URLSizeData.getData());
	
	bigfileNumData.setTitle('大文件数总计：'+data.bigfileNumAll);
	bigfileNumData.setPoints(data.chart4);
	bigfileNumChart.setJSData(bigfileNumData.getData());
	
	bigfileSizeData.setTitle('大文件大小总计：'+Main.fun.getMFromByte(data.bigfileSizeAll));
	bigfileSizeData.setPoints(data.chart5);
	bigfileSizeChart.setJSData(bigfileSizeData.getData());*/
	setTimeout(function()
    {
    	Main.fun.closeLoadProcessWait();
    },1000);
	
	
}
 Ext.onReady(function() {

//	var domainNum = new Ext.ux.seraph.ChartPanel({
//		chartId: 'barChart',
//		width: 250,
//		renderTo: 'domainNum'
//	});
	domainNumChart.write('domainNumChart');
	URLNumChart.write('URLNumChart');
	/*URLSizeChart.write('URLSizeChart');
	bigfileNumChart.write('bigfileNumChart');
	bigfileSizeChart.write('bigfileSizeChart');*/
	
});