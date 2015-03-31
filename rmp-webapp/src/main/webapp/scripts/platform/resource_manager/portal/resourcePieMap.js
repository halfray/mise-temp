/**
 * 各省网站资源对比中，利用饼图显示某个省的质量分占比情况
 */
base.portal.resourcePieMap = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],

			init : function(params) {
				this.mapDetailData = new PieData();
				
				this.mapDetailChart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
				this.mapDetailChart.width = '100%';
				this.mapDetailChart.height = '100%';
				this.mapDetailChart.wMode = 'Transparent';
			},
			getMapData : function(data) {
				var self = this; 
				M.rpc._call(Main.fun.Fun(self,self.updateMapData),
				'allProvinceResourcesContrastAction.getDetailFromMap', data.areaId);
			},
			updateMapData : function(data) {
				this.mapDetailData.setPoints(data);
				this.mapDetailChart.setJSData(this.mapDetailData.getData());
			},
			render : function(div) {
				this.mapDetailChart.setJSData(this.mapDetailData.getData());
				this.mapDetailChart.write(div);
			},
			refresh:function(data)
			{
				if(Ext.isEmpty(data.areaId)) return ;
				this.getMapData(data);
			}
		});