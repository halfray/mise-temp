base.portal.flowTrend = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/AreaData.js'],

			init : function(params) {
				this.lineData = new LineData();
				this.lineChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.lineChart.width = '100%';
				this.lineChart.height ='100%'
				this.lineChart.wMode = 'Transparent';		 
				this.lineData.updateValuePer(0);
			},
			getMapData : function(data) {
				if(data == null){
					return;
				}
				data.operatorName = '中国移动';
				var self = this;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'flowAnalysisAllAction.getAppTrendForOut',{
					javaClass : 'java.util.HashMap',
					map : data
				});
			},
			updateMapData : function(data) {
				this.lineData.setSeries(data,true);
				this.lineChart.setJSData(this.lineData.getData());
			},
			render : function(div) {
				this.lineChart.setJSData(this.lineData.getData());
				this.lineChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});