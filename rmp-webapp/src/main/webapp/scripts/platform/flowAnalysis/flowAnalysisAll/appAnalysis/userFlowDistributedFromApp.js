base.portal.userFlowDistributedFromApp = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js',
					'/scripts/ext-ux/anyChart/HeatMapData.js'],

			init : function(params) {
				this.pieData = new PieData();
				this.pieChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.pieChart.width = '100%';
				this.pieChart.height ='100%'
				this.pieChart.wMode = 'Transparent';
				
				var self = this;
			},
			getMapData : function(data) {
				if(data == null){
					return;
				}
				var self = this;
				this.data = data;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'flowAnalysisAllAction.getUserTypeFlowDistributed',{
					javaClass : 'java.util.HashMap',
					map : data
				});
			},
			updateMapData : function(data) {
				this.pieData.setPoints(data.list);
				this.pieData.setTitle(this.data.appName);
				this.pieData.setPosition('right');
				this.pieChart.setJSData(this.pieData.getData());
			},
			run:function()
			{
					this.getMapData();
			},
			render : function(div) {
				this.pieChart.setJSData(this.pieData.getData());
				this.pieChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});