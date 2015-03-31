base.portal.dmWebsiteQuaHistoryDetail = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/AreaData.js'],

			init : function(params) {
				this.areaData = new LineData();
				this.areaChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.areaChart.width = '100%';
				this.areaChart.height ='100%'
				this.areaChart.wMode = 'Transparent';		 
				this.areaData.updateValuePer(0);
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				mapData.local = data.local;
				mapData.webSite_Id = data.webSite_Id;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'webSiteQualityAnalysisAction.getListWebsiteQuaHistoryDetail',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				this.areaData.setSeries(data,true);
				this.areaData.setYScale("0","100");
				this.areaChart.setJSData(this.areaData.getData());
			},
			render : function(div) {
				this.areaChart.setJSData(this.areaData.getData());
				this.areaChart.write(div);
			},
			refresh : function(data) {
				if(Ext.isEmpty(data.webSite_Id))
				{
					this.areaData.setSeries(null);
					this.areaChart.setJSData(this.areaData.getData());
					return ;
				}
				this.getMapData(data);
			}
		});