base.portal.dmQualityScoreChangeDistributionDetail= Ext.extend(Main.portal.PortalPage, {
		imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/BarData.js',
					'/scripts/ext-ux/anyChart/AreaData.js'],
					init : function(params) {
						this.barData = new LineData();
						this.barChart = new AnyChart("swf/AnyChart.swf",
								"swf/Preloader.swf");
						this.barChart.width = '100%';
						this.barChart.height ='100%';
						this.barChart.wMode = 'Transparent';
						},	
						getMapData : function(data) {
							var self = this;
							if(data == null){								
								return;
							}							
							var mapData = data;
							M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmDispatchOverviewAction.getListQualityScoreChangeDistributionDetail',{
							javaClass : 'java.util.HashMap',
							map : mapData
						});
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
							this.barChart.write(div);
						},
						refresh : function(data) {
							this.getMapData(data);
						}
					});