/**
 * 各省网站资源对比中，利用饼图显示某个省的质量分占比情况
 */
base.portal.resourceBarForMap = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/BarData.js'],

			init : function(params) {
				this.mapDetailData = new BarData();
				
				this.mapDetailChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
				this.mapDetailChart.width = '100%';
				this.mapDetailChart.height = '100%';
				this.mapDetailChart.wMode = 'Transparent';
				this.mapDetailData.setXaxisName('类型');
				this.mapDetailData.setYaxisName('域名数量');
			},
			getMapData : function(data) {
				var self = this; 
				
				var mapData = {};
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'resourseViewAction.getDomainMapForLocal',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
				
//				M.rpc._call(Main.fun.Fun(self,self.updateMapData),
//				'allProvinceResourcesContrastAction.getDetailBarFromMap', {javaClass:'java.util.HashMap',map:data});
			},
			updateMapData : function(data) {
				this.mapDetailData.setSeries({name:'域名数量',point:data.list});
				this.mapDetailChart.setJSData(this.mapDetailData.getData());
			},
			render : function(div) {
				this.getMapData();
				this.mapDetailChart.write(div);
			},
			refresh:function(data)
			{
				this.getMapData(data);
			}
		});