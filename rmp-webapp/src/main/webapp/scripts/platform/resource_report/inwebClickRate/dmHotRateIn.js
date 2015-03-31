base.portal.dmHotRateIn = Ext.extend(Main.portal.PortalPage, {
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
								
			
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				mapData.province = data.province;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'inwebClickRateAction.getListHotRateIn',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				this.areaData.formatDefaults.tooltipFormat='{%SeriesName}:{%YValue}{numDecimals:#valuePre#}%';
				this.areaData.formatDefaults.labelFormat='{%YValue}{numDecimals:#valuePre#}%';
				this.areaData.setY_axisMin(0.0001,0,4);
				this.areaData.setY_axisLogScale();
				this.areaData.setSeries(data,true);
				this.areaData.updateValuePer(2);
				
				this.areaChart.setJSData(this.areaData.getData());
			},
			render : function(div) {
				this.areaChart.setJSData(this.areaData.getData());
				this.areaChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});