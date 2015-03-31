/**4.1.4.2 调度效果分析**/
base.portal.dispDeffect = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/BarData.js'],
					
	init:function()
	{
		this.data = new BarData();
		this.chart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
		this.chart.width = '100%';
		this.chart.height = '100%';
		this.chart.setJSData(this.data.getData());
		this.chart.wMode = 'Transparent';
	},
	render:function(div)
	{
		this.chart.write(div);
	},
	getData:function(data)
	{
		M.rpc._call(Main.fun.Fun(this,this.updateData),"dispDeffectAction.getListForBar",{javaClass:'java.util.HashMap',map:data});	
	},
	updateData:function(data)
	{
		this.data.setSeries(data);
		this.chart.setJSData(this.data.getData());
	},
	refresh:function(data)
	{
		if(Ext.isEmpty(data) || Ext.isEmpty(data.domain))
		{
			Ext.Msg.alert('提示信息','未指定要查询的域名');
			return ;
		}
		this.getData(data);
	}
});