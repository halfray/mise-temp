base.portal.flowDistributed = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js',
					'/scripts/ext-ux/anyChart/HeatMapData.js'],

			init : function(params) {
				this.data = {};
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
				//alert(event.data.Category);//获取名称
				var mapData = {};
				mapData.appName = event.data.Category;
				mapData.businessDate = this.data.businessDate;
				mapData.operatorName = this.data.operatorName;
				var conf = {
						href : 'portalAssemble.do?portalCode=otherFlowDistributedForAppOut&uxParams='+ encodeURI(Ext.encode(mapData)),
						text:  '',
						icon: '',
						height : '0.5',
						width : '0.7',
						tipinfo: ''
					};
				   Main.fun.openWin(conf, 'window');
			},
			getMapData : function(data) {
				if(data == null){
					return;
				}
				data.operatorName = '中国移动';
				this.data = data;
				var self = this;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'flowAnalysisAllAction.getAppFlowDistributedForOut',{
					javaClass : 'java.util.HashMap',
					map : data
				});
			},
			updateMapData : function(data) {
				this.pieData.setPoints(data.list);
				this.pieData.setPosition('right');
				this.pieChart.setJSData(this.pieData.getData());
			},
			run:function(data)
			{
					this.getMapData(data);
			},
			render : function(div) {
				this.pieChart.setJSData(this.pieData.getData());
				this.pieChart.write(div);
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});