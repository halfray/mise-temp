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
				var appTypeName = event.data.Category;
				var mapData = {};
				mapData.appTypeName = appTypeName;
				mapData.businessDate = this.data.businessDate;
				if(appTypeName == '网络新闻和图片' || appTypeName == '视频'){
					var conf = {
							href : 'portalAssemble.do?portalCode=middleAppTypeFlow&uxParams='+ encodeURI(Ext.encode(mapData)),
							text:  '',
							icon: '',
							height : '0.8',
							width : '0.7',
							tipinfo: ''
						};
					Main.fun.openWin(conf, 'window');
				}else if(appTypeName == '音乐' || appTypeName == '应用下载'){
					var conf = {
							href : 'portalAssemble.do?portalCode=lowAppTypeFlow&uxParams='+ encodeURI(Ext.encode(mapData)),
							text:  '',
							icon: '',
							height : '0.8',
							width : '0.7',
							tipinfo: ''
						};
					Main.fun.openWin(conf, 'window');
				}else{
					var conf = {
							href : 'portalAssemble.do?portalCode=highAppTypeFlow&uxParams='+ encodeURI(Ext.encode(mapData)),
							text:  '',
							icon: '',
							height : '0.8',
							width : '0.7',
							tipinfo: ''
						};
					Main.fun.openWin(conf, 'window');
				}
			},
			getMapData : function(data) {
				var self = this;
				if(data == null){
					return;
				}
				this.data = data;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'flowAnalysisAllAction.getAppTypeFlowDistributed',{
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