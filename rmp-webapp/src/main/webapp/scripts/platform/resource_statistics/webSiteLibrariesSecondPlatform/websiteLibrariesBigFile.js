base.portal.websiteLibrariesBigFile = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],

			init : function(params) {
				this.pieData = new PieData();
				this.pieChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.pieChart.width = '100%';
				this.pieChart.height ='100%'
				this.pieChart.wMode = 'Transparent';
			},
			getMapData : function(data) {
				var self = this;
				var mapData = {};
				if(data == null){
					mapData.province = '510000';
				}else{
					mapData = data;
				}
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmNetsiteLibrariesDetailAction.getWebSiteLibrariesSecondPlatformForBigFile',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				if(data != null){
					this.pieData.setPoints(data.list);
					this.pieData.setTitle('大文件总数：'+data.bigFileTotal);
					this.pieData.setPosition('right');
					this.pieChart.setJSData(this.pieData.getData());
				}else{
					this.pieData.setPoints(null);
					this.pieData.setTitle('大文件总数：'+'无数据');
					this.pieData.setPosition('right');
					this.pieChart.setJSData(this.pieData.getData());

				}
			},
			run:function()
			{
					//this.getMapData();
			},
			render : function(div) {
				this.pieChart.setJSData(this.pieData.getData());
				this.pieChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});