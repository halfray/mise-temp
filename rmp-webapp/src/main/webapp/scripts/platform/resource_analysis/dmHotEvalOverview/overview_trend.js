base.portal.overview_trend = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/LineData.js'],

			init : function(params) {
//				Main.fun.showProcessWait();
				this.lineData = new LineData();
				this.chart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.chart.width = '100%';
				this.chart.height ='100%'
				this.chart.wMode = 'Transparent';
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				mapData.topN = data.topN;
				mapData.hotBasis = data.hotBasis;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmHotEvalOverview.getOverviewTrendList',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				this.lineData.setSeries(data);
				this.lineData.setYScale("0","100");
				this.chart.setJSData(this.lineData.getData());
//				Main.fun.closeProcessWait();
			},
			run:function()
			{
					//this.getMapData();
			},
			render : function(div) {
				this.chart.setJSData(this.lineData.getData());
				this.chart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});