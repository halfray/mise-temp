var ChartData = function(){
	this.data = {};
	this.getDataModel(); //获取抽象数据模型
	this.getSpecialDataModel(); //获取一般数据模型
	this.applyDataDefaults();//个性化设置
	this.updateValuePer();
	//设置颜色
	this.setPalette();
	this.setPaletteName();
//	this.setY_axisLogScale();//指数方式显示左边纵轴
//	this.setPieSeries_Mode("Outside","Center");//设置饼图label显示模式
//	this.setPie_radius(10);//设置饼图半径大小
//	this.setPie_series();//去掉饼图高光
};

/**可复写方法，用于获取数据结构模型**/
ChartData.prototype.getDataModel = function()
{
	this.data = new Ext.ux.anyChart.chartDataModel().getDataModel();
}

//数据模型类型，默认为条形图,该属性需要复写
this.type = "bar"; 
this.default_series_type = "Bar";

/**用于不同类型的数据的实例化，从抽象落实到一般**/
ChartData.prototype.getSpecialDataModel = function()
{
	this.data.charts.chart.data_plot_settings["default_series_type"] = this.default_series_type;
	this.data.charts.chart.data_plot_settings[this.type+"_series"] = this.data.charts.chart.data_plot_settings.series;
	this.data.charts.chart.data_plot_settings[this.type+"_series"][this.type + "_style"] = this.data.charts.chart.data_plot_settings.series.style;
	
	delete  this.data.charts.chart.data_plot_settings.series;
}
/**默认数据结构信息**/
ChartData.prototype.dataDefaults =
{
	
}
ChartData.prototype.applyDataDefaults=function()
{
	Ext.ux.deepApply(this.data,this.dataDefaults);
}
/**默认格式化信息信息**/
ChartData.prototype.formatDefaults = {
	valuePre:2,	//展示数值的小数位
	perPre:2,		//占比的百分位
	tooltipFormat:'{%Name}：{%Value}{numDecimals: #valuePre#} 占比: {%YPercentOfSeries}{numDecimals: #perPre#}%',
	labelFormat:'{%YPercentOfSeries}{numDecimals:#perPre#}%',
	legendFomat:'{%Icon} {%Name} ({%YValue}{numDecimals:#valuePre#})'
}
ChartData.prototype.getToolTipFomat = function()
{
	return this.formatDefaults.tooltipFormat.replace("#valuePre#",this.formatDefaults.valuePre).replace("#perPre#",this.formatDefaults.perPre);
}
ChartData.prototype.getLabelFomat = function()
{
	return this.formatDefaults.labelFormat.replace("#valuePre#",this.formatDefaults.valuePre).replace("#perPre#",this.formatDefaults.perPre);;
}
ChartData.prototype.getLegendFomat = function()
{
	return this.formatDefaults.legendFomat.replace("#valuePre#",this.formatDefaults.valuePre).replace("#perPre#",this.formatDefaults.valuePre);
}
ChartData.prototype.updateToolTipFomat = function()
{
	this.data.charts.chart.data_plot_settings[this.type+"_series"] .tooltip_settings.format = this.getToolTipFomat();
}
ChartData.prototype.updateLabelFomat = function()
{
	this.data.charts.chart.data_plot_settings[this.type+"_series"] .label_settings.format = this.getLabelFomat();
}
ChartData.prototype.updateLegendFomat = function()
{
	this.data.charts.chart.chart_settings.legend.format = this.getLegendFomat();
}
ChartData.prototype.updateValuePer = function(pre)
{
	if(!Ext.isEmpty(pre))
		this.formatDefaults.valuePre = pre;
	this.updateToolTipFomat();
	this.updateLegendFomat();
	this.updateLabelFomat();
}
ChartData.prototype.getData = function()
{
	return this.data;
}
ChartData.prototype.setPoints = function(ps, ignore)//ignore 是否跳过自动计算小数位的方法
{
	this.data.charts.chart.data.series.point = ps;
	if(Ext.isEmpty(ignore) || ignore !=true){
		this.updateValuePer(this.getValPreFromDataForPie(ps));
	}
		
}
ChartData.prototype.setSeries = function(ps,ignore) //ignore 是否跳过自动计算小数位的方法
{
	this.data.charts.chart.data.series = ps;
	if(Ext.isEmpty(ignore) || ignore !=true)
		this.updateValuePer(this.getValPreFromData(ps));
}
/******设置palette*****/
ChartData.prototype.setPalette = function()
{;
	return this.data.charts.chart.palettes = {
	        "palette": {
        "name": "paletteCollection",
        "type": "Distinct",
        "item": [
          { "color": "#31afff" },
          { "color": "#a546ff" },
          { "color": "#b0f240" },
          { "color": "#6bf741" },
          { "color": "#f6b05f" },
          { "color": "#faf687" },
          { "color": "#db53f8" },
          { "color": "#fc659e" },
          { "color": "#8efdf3" },
          { "color": "#6cece1" },
          { "color": "#0092ee" },
          { "color": "#923ce3" },
          { "color": "#8fc82d" },
		  { "color": "#40da12" },
          { "color": "#5f1f9b" },
          { "color": "#ea4382" },
          { "color": "#e3963c" },
          { "color": "#f4ef5d" },
          { "color": "#6cece1" }
        ]
      }
	};
}
ChartData.prototype.setPaletteName = function()
{;
	this.data.charts.chart.data.palette = 'paletteCollection';
}

/******设置饼图label显示模式*****/
ChartData.prototype.setPieSeries_Mode = function(mode,multi_line_align){
	this.data.charts.chart.data_plot_settings.pie_series.label_settings.mode = mode;	
	this.data.charts.chart.data_plot_settings.pie_series.label_settings.multi_line_align = multi_line_align;	
}
/******去掉饼图高亮效果*****/
ChartData.prototype.setPie_series = function(){
	this.data.charts.chart.data_plot_settings.pie_series.style = "default";	
}
/******指数方式显示纵轴数据*****/
ChartData.prototype.setY_axisLogScale = function(){
	this.data.charts.chart.chart_settings.axes.y_axis.scale.type = "Logarithmic";
	this.data.charts.chart.chart_settings.axes.y_axis.scale.log_base = "10";
	this.data.charts.chart.chart_settings.axes.y_axis.scale.always_show_zero = "true";
}
/******设置纵轴显示最小值,倾斜度和保留的小数位数*****/
ChartData.prototype.setY_axisMin = function(min,rotation,num){
	this.data.charts.chart.chart_settings.axes.y_axis.scale.minimum = min;
	this.data.charts.chart.chart_settings.axes.y_axis.labels.rotation = rotation;
	this.data.charts.chart.chart_settings.axes.y_axis.labels.format = "{%Value}{numDecimals:"+num+",decimalSeparator:.}%";
}


/******设置饼图大小*****/
ChartData.prototype.setPie_radius = function(radius){
	this.data.charts.chart.data_plot_settings.pie_series.radius = radius;	
}
ChartData.prototype.setTitle = function(title)
{
	this.data.charts.chart.chart_settings.title.text = title;	
}
/**
 *设置图例位置 
 */
ChartData.prototype.setLengendPosition = function(text)
{
	this.data.charts.chart.chart_settings.legend.position = text;	
}
/**
 * 设置横坐标的名称
 */
ChartData.prototype.setXaxisName = function(text)
{
	this.data.charts.chart.chart_settings.axes.x_axis.title.enabled = "True";	
	this.data.charts.chart.chart_settings.axes.x_axis.title.text = text;	
}
ChartData.prototype.setYaxisName = function(text)
{
	this.data.charts.chart.chart_settings.axes.y_axis.title.enabled = "True";	
	this.data.charts.chart.chart_settings.axes.y_axis.title.text = text;	
}
ChartData.prototype.setXaxisRotation = function(rotation)
{
	this.data.charts.chart.chart_settings.axes.x_axis.labels.rotation = rotation;	
}
ChartData.prototype.setYRotation = function(rotation)
{
	this.data.charts.chart.data_plot_settings.bar_series.label_settings.rotation = rotation;	
}
/******设置柱形图上数值位置*****/
ChartData.prototype.setYPosition = function(anchor,halign,valign)
{	
	this.data.charts.chart.data_plot_settings.bar_series.label_settings.position.anchor = anchor;	
	this.data.charts.chart.data_plot_settings.bar_series.label_settings.position.halign = halign;	
	this.data.charts.chart.data_plot_settings.bar_series.label_settings.position.valign = valign;	
}
/******设置柱形图上数值颜色*****/
ChartData.prototype.setYColor = function(color)
{	
	this.data.charts.chart.data_plot_settings.bar_series.label_settings.font.color = color;	
}
/**设置y轴取值范围
 * @param {Object} minimum
 * @param {Object} maximum
 */
ChartData.prototype.setYScale = function(minimum, maximum)
{
	if(minimum!=null)
		this.data.charts.chart.chart_settings.axes.y_axis.scale.minimum = minimum;	
		
	if(maximum!=null)
		this.data.charts.chart.chart_settings.axes.y_axis.scale.maximum = maximum;
}

ChartData.prototype.setYScaleMinimum = function(minimum)
{
	if(minimum!=null)
		this.data.charts.chart.chart_settings.axes.y_axis.scale.minimum = minimum;	
}
ChartData.prototype.setYScaleMaximum = function(maximum)
{
	if(maximum!=null)
		this.data.charts.chart.chart_settings.axes.y_axis.scale.maximum = maximum;	
}

ChartData.prototype.getValPreFromData=function(data)
{
	var pre =  0;
	if(Ext.isEmpty(data) ||Ext.isEmpty(data.length)) return pre;
	for(var i = 0; i < data.length;i++)
	{
		if(Ext.isEmpty(data[i].point)) 
			continue;
		var points = data[i].point;
		if(Ext.isEmpty(points.length))
			continue;
		for(var j = 0; j < points.length;j++)
		{
			if(Ext.isEmpty(points[j].y))
				continue;
			if(!Ext.isEmpty(points[j].y) && (points[j].y + "").indexOf(".")!=-1)
				return 2;
		}
	}
	return pre;
}
ChartData.prototype.getValPreFromDataForPie=function(data)
{
	var pre =  0;
	if(Ext.isEmpty(data) ||Ext.isEmpty(data.length)) return pre;
	var points = data;
	for(var j = 0; j < points.length;j++)
	{
		if(Ext.isEmpty(points[j].y))
			continue;
		if(!Ext.isEmpty(points[j].y) && (points[j].y + "").indexOf(".")!=-1)
			return 2;
	}
	return pre;
}