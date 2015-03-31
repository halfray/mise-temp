base.portal.dmDomainLocalRepeatOverview= Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/anychart/AnyChart.js',
				'/scripts/anychart/AnyChartUtil.js',
				'/scripts/utils/main-funs-debug.js',
				'/scripts/ext-ux/anyChart/BarData.js',
				'/scripts/ext-ux/anyChart/HeatMapData.js'],
				init : function(params) {
					this.barData = new HeatMapData();
					this.barChart = new AnyChart("swf/AnyChart.swf",
							"swf/Preloader.swf");
					this.barChart.width = '100%';
					this.barChart.height ='100%';
					this.barChart.wMode = 'Transparent';
			        var self=this;
			        this.data={};
					this.barChart.addEventListener('pointClick', Main.fun.Fun(
							self, self.onPointClick));
					},	
					onPointClick : function(event) {
						//获取点击事件对应的attributes属性值
						var idxml = event.data.Attributes['id'];
						//如果数据为0的话，则点击使钻取列表刷新/*edit by jianghy 20140224*/
						if(idxml == undefined){
							this.data.areaId = 0;
						}else{
							//从attributes的属性值中获取 id属性对应的信息
							var id = AnyChartUtil.getAttributeValue(idxml, "id");
							this.data.areaId = id;
						}
						this.run();
						this.notice(this.data);
					},
					getMapData : function(data) {
						var self = this;
						if(data==null){
							return;
						}
						var mapData = data;								
						M.rpc._call(Main.fun.Fun(self, self.updateMapData),'dmWebSiteRepeatResEvalAction.getListDomainLocalRepeatOverview',{
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
						this.barChart.write(div);
					},
					refresh : function(data) {
						this.getMapData(data);
					}
				});