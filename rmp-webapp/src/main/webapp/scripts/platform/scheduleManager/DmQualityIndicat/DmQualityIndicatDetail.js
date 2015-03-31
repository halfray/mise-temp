base.portal.DmQualityIndicatDetail= Ext.extend(Main.portal.PortalPage, {
				imports : ['/scripts/anychart/AnyChart.js',
							'/scripts/anychart/AnyChartUtil.js',
							'/scripts/utils/main-funs-debug.js',
							'/scripts/ext-ux/anyChart/BarData.js'],
							init : function(params) {
	
							/*	this.barPanel = new Ext.Panel({
									html : '<div style="width:1000;overflow:auto"> <div id="barChart" style="width:2000"></div></div>'
								});*/
								
								this.barData = new BarData();
								this.barChart = new AnyChart("swf/AnyChart.swf",
										"swf/Preloader.swf");
								this.barChart.width = '100%';
								this.barChart.height ='100%';
								this.barChart.wMode = 'Transparent';
								this.barData.setXaxisName('省份');
								
								this.barPanel = new Ext.Panel({
									width : 1000,
									frame:false,
									//height : 200,
									baseCls : 'x-plain',
									//items : [this.barPanel],
									html : '<div style="height:350;width:1000;overflow:auto"> <div id="barChart" style="width:2000"></div></div>',
									colspan : 8
								});
								},	
								getMapData : function(data) {
									var self = this;
									if(data == null){
										return;
									}
									var mapData = data;
									M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmQualityIndicatAction.getListQualityIndicat',{
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
									this.barChart.setJSData(this.barData.getData());
									var panel = new Ext.Panel({
										//id : 'main-panel',
										frame : false,
										baseCls : 'x-plain',
										layout : 'table',
										layoutConfig : {
											columns : 8
										},
										/*defaults : {
											frame : true
										},*/
										//autoHeight : true,
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