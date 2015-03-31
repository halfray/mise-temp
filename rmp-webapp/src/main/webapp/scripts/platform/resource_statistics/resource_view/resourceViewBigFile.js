base.portal.resourceViewBigFile = Ext.extend(Main.portal.PortalPage, {
	
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
    						href : 'portalAssemble.do?portalCode=dmBigFileOverview&uxParams='+ encodeURI(Ext.encode(data)),
    						text:  '大文件分协议类型概览',
    						icon: '',
    						tipinfo: ''
    					};
    				   Main.fun.openWin(conf, 'tab');
    			},
	  			getMapData : function() {
    				var self = this;
    				var mapData = {};
    				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'resourseViewAction.getBigFile',{
    					javaClass : 'java.util.HashMap',
    					map : mapData
    				});					
				},
				updateMapData : function(data) {
					this.pieData.setPoints(data.list);
					this.pieData.setTitle('大文件总数：'+data.bigFileTotal);
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