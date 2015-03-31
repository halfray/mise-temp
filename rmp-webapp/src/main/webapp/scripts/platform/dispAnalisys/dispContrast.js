/**4.1.4.2 调度效果分析 - 线图**/
base.portal.dispContrast  = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/LineData.js'],
					
	init:function()
	{
		var anyChartHeight=document.body.clientHeight-23;
		this.data = new LineData();
		this.chart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
		this.chart.width = '100%';
		this.chart.height = anyChartHeight;
		this.chart.setJSData(this.data.getData());
		this.chart.wMode = 'Transparent';
		var self = this;
		this.dictField = new Ext.ux.seraph.DictCombo( {
			url : 'parmInfoProvider.do?parmType=ANALYSIS_DISP_INDICAT',
			displayField : 'parmName',
			valueField : 'parmCode',
			value:'res_time',
			listeners:{
				select:function()
				{
					self.getData();
				}
			}
		});

		var linePanel = new Ext.Panel({
			id:'linePanel'
		});
		this.panel = new Ext.Panel({
			frame:true,
			layout : 'fit',
			frame : true,
			baseCls : 'x-plain',
			tbar:[this.dictField],
			items:[linePanel]
		});
	},
	render:function(div)
	{
		this.panel.render(div);
		this.chart.write('linePanel');
	},
	getData:function()
	{
		var params = {};
		Ext.apply(params,this.params);
		
		var indiVal = this.dictField.getValue();
		if(Ext.isEmpty(indiVal))
			indiVal = "res_time";
		params.indiValue = indiVal;
		M.rpc._call(Main.fun.Fun(this,this.updateData),"dispDeffectAction.getListForLine",{javaClass:'java.util.HashMap',map:params});	
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
		this.params = data;
		this.getData(data);
	}
});