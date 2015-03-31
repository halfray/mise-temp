base.portal.HTTPUserdistribution = Ext.extend(Main.portal.PortalPage, {
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
				var mydata = {};
				mydata.userTypeName = event.data.Category;
				mydata.businessDate = this.data.bizDate;
				mydata.protocolType = 'HTTP';
				var conf = {
						href : 'portalAssemble.do?portalCode=otherFlowDistributedForUser&uxParams='+ encodeURI(Ext.encode(mydata)),
						text:  '',
						icon: '',
						height : '0.5',
						width : '0.7',
						tipinfo: ''
					};
				   Main.fun.openWin(conf, 'window');
			},
			getMapData : function(data) {
				var self = this;
				if(data == null){
					return;
				}
				this.data = data;
				data.protocolType = 'HTTP';
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'p2PFlowUserdistributionAction.getP2PFlowUserDIstribution',{
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