/**
 * 分省资源概览柱状图
 */
base.portal.resourceViewProvinceChartPanel= Ext.extend(Main.portal.PortalPage, {
					imports : ['/scripts/anychart/AnyChart.js',
								'/scripts/anychart/AnyChartUtil.js',
								'/scripts/utils/main-funs-debug.js',
								'/scripts/ext-ux/anyChart/BarData.js'],
								
					init : function(params) {
						var self = this;
						this.barData = new BarData();
						this.barChart = new AnyChart("swf/AnyChart.swf",
								"swf/Preloader.swf");
						this.barChart.width = '100%';
						this.barChart.height ='100%'
						this.barChart.wMode = 'Transparent';
						
						this.barData.setXaxisRotation("315");//x轴倾斜315°
						this.barData.setYRotation("90");//柱状图上的数值倾斜315°
						
						this.barPanel = new Ext.Panel({
							width : 1000,
							frame:false,								 
							baseCls : 'x-plain',								 
							html : '<div style="height:350;width:1000;overflow:auto"> <div id="barChart" style="width:980"></div></div>',
							colspan : 8
						});
						this.barChart.addEventListener('pointClick', Main.fun.Fun(self, self.onPointClick));
						
				},	
				onPointClick : function(e) {
					var data = {};
					data.province = e.data.ID;
					var href = '';
					if(e.data.Series.Name == '网站数量') {
						var text = '网站库明细（二级平台）';
						href = 'portalAssemble.do?portalCode=webSiteLibrariesDetailSecondPlatform&uxParams='+ encodeURI(Ext.encode(data));
					}else{
						//alert('域名暂无钻取');
						return;
					}
					
					var conf = {
						href : href,
						text:  text,
						icon: '',
						tipinfo: '',
						params: data
					};
					
			   		Main.fun.openWin(conf, 'tab');

				},
				getMapData : function(data) {
					var self = this;
					var mapData={};
					M.rpc._call(Main.fun.Fun(self, self.updateMapData), 'allProvinceResourcesContrastAction.getResourceViewProvinceChartPanel',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
				},
				updateMapData : function(data) {
					this.barData.setSeries(data);
					this.barData.setY_axisLogScale();
					this.barData.setYPosition("center","center","center");//调整y轴label显示位置
					this.barData.setYColor("white");//调整y轴label显示颜色
					this.barChart.setJSData(this.barData.getData());
				},
				run:function()
				{
						this.getMapData();
				},
				render : function(div) {
					this.barChart.setJSData(this.barData.getData());
					var panel = new Ext.Panel({								
						frame : false,
						baseCls : 'x-plain',
						layout : 'table',
						layoutConfig : {
							columns : 8
						},								
						height:Ext.get(div).getHeight(),
						items : [this.barPanel]
					});
					panel.render(div);
					this.barChart.write('barChart');
				},
				refresh : function(data) {
					this.getMapData(data);
				}
			});