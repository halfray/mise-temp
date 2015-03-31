base.portal.overview_heat = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/AreaData.js'],

			init : function(params) {
//				Main.fun.showProcessWait();
				this.areaData = new AreaData();
				this.chart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.chart.width = '100%';
				this.chart.height ='100%'
				this.chart.wMode = 'Transparent';
				this.areaData.setXaxisName('网站');
				this.areaData.setYaxisName('总量');
				this.areaData.updateValuePer(0);
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				mapData.topN = data.topN;
				mapData.hotBasis = data.hotBasis;
				
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmHotEvalOverview.getOverviewHeatList',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
				
			},
			updateMapData : function(data) {
				this.areaData.setSeries(data, true);
				this.chart.setJSData(this.areaData.getData());
//				Main.fun.closeProcessWait();
			},
			run:function()
			{
			},
			render : function(div) {
				this.chart.setJSData(this.areaData.getData());
				this.chart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});