/**
 * 适用于3.1.4 全网重复资源 - 各省IDC重复引入网站资源情况条形图
 */
base.portal.allProvinceIDCRepeatWebSiteBar = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/BarData.js'],

			init : function(params) {
				this.barData = new BarData();
				this.barChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.barChart.width = '100%';
				this.barChart.height ='100%'
				this.barChart.wMode = 'Transparent';
				this.barData.setXaxisName('省份');
				this.barData.setYaxisName('IDC重复引入网站数量');
			},
			getMapData : function() {
				var self = this;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'allProvinceIDCRepeatWebSiteAction.getListForBar');
			},
			updateMapData : function(data) {
				this.barData.setSeries(data);
				this.barChart.setJSData(this.barData.getData());
			},
			run:function()
			{
					this.getMapData();
			},
			render : function(div) {
				this.barChart.setJSData(this.barData.getData());
				this.barChart.write(div);
			},
			refresh : function() {
				this.getMapData();
			}
		});