base.portal.resourceViewMap = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/MapData.js'],

			init : function(params) {
				this.mapData = new MapData();
				this.mapChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.mapChart.width = '100%';
				this.mapChart.height ='100%'
				this.mapChart.wMode = 'Transparent';
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				if(data == null){
					mapData.selectValue = 'count(webSite)';
					mapData.system = '0000';
				}else{
					mapData = data;
				}
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'allProvinceResourcesContrastAction.getListForRSMap',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				this.mapData.setPoints(data);
				var mapdata = this.mapData.getData();
				mapdata.charts.chart.chart_settings.legend.enabled=false;
				this.mapChart.setJSData(mapdata);
			},
			run:function()
			{
					//this.getMapData();
			},
			render : function(div) {
				this.mapChart.setJSData(this.mapData.getData());
				this.mapChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});

