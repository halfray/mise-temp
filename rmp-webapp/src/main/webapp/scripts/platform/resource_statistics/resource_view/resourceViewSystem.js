base.portal.resourceViewSystem = Ext.extend(Main.portal.PortalPage, {
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
				
				var self = this;
				
				this.barChart.addEventListener('pointClick', Main.fun.Fun(
						self, self.onPointClick));
			},
			onPointClick : function(event) {
				var data = {};
				var conf = {
						href : 'portalAssemble.do?portalCode=resourceViewProvince&uxParams='+ encodeURI(Ext.encode(data)),
						text:  '分省资源总览',
						icon: '',
						tipinfo: ''
					};
				   Main.fun.openWin(conf, 'tab');
			},
			getMapData : function() {
				var self = this;
				var mapData = {};
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'resourseViewAction.getInSystemResourceView');
			},
			updateMapData : function(data) {
				if (!data || data.length == 0)
					data = [{}];
				this.barData.setSeries(data);
				this.barChart.setJSData(this.barData.getData());
			},
			run:function() {
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