base.portal.resourceViewWebSite = Ext.extend(Main.portal.PortalPage, {
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
				
				this.pieChart.addEventListener('pointClick', Main.fun.Fun(
						self, self.onPointClick));
			},
			onPointClick : function(event) {
				var data = {};
				var conf = {
						href : 'portalAssemble.do?portalCode=webSiteLibrariesDetail&uxParams='+ encodeURI(Ext.encode(data)),
						text:  '网站库明细',
						icon: '',
						tipinfo: ''
					};
				   Main.fun.openWin(conf, 'tab');
			},
			getMapData : function() {
				var self = this;
				var mapData = {};
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'resourseViewAction.getWebSiteMapForLocal',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
			},
			updateMapData : function(data) {
				this.pieData.setPoints(data.list);
				this.pieData.setTitle('网站总数：'+data.wscTotal);
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
			refresh : function() {
				this.getMapData();
			}
		});