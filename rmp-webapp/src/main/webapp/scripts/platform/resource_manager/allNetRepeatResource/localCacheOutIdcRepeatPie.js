/**
 * 各省网站资源对比中，利用饼图显示某个省的质量分占比情况
 */
base.portal.localCacheOutIdcRepeatPie = Ext.extend(Main.portal.PortalPage, {
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
				if(Ext.isEmpty(data.allNum)) return;
				var result = {};
				result = [];
				result[result.length] = {name:'未重复域名数',y:(data.allNum  - data.repeatDomainNum) };
				result[result.length] = {name:'重复域名数',y:data.repeatDomainNum};
				this.updateMapData(result);
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
				this.getMapData(data);
			}
		});