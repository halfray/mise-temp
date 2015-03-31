/**
 * 各省网站资源对比中，利用条形图显示各省不同资源的情况
 */
base.portal.resourceBarMap = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/BarData.js'],

			init : function(params) {
				var anyChartHeight=document.body.clientHeight-23;
				this.barData = new BarData();
				this.barChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.barChart.width = '100%';
				this.barChart.height = anyChartHeight+'px';
				this.barChart.wMode = 'Transparent';
				this.barData.setXaxisName('省份');
				this.barData.setYaxisName('域名引入数量');

				var barPanel = new Ext.Panel({
							id : 'barChart',
							html : 'any chart show there'
						});
				var self = this;
				var selectData = [
						["domainCount", "域名引入数量"],
						["urlCount", "URL引入数量"],
						["(domainCount/domain_All_Count)*100", "域名本网引入率"],
						["(local_Request_Count/all_Request_Count)*100",
								"本网请求次数占比"]];
				var selectStore = new Ext.data.ArrayStore({
							fields : ['value', 'name'],
							data : selectData
						});
				this.selectComboBox = new Ext.form.ComboBox({
							fieldLabel : '类型',
							hiddenName : 'selectValue',
							valueField : 'value',
							displayField : 'name',
							typeAhead : true,
							mode : 'local',
							store : selectStore,
							triggerAction : 'all',
							value : 'domainCount',
							selectOnFocus : true,
							listeners : {
								select : function(value) {
									if('domainCount' == value.value){
										self.barData.setYaxisName('域名引入数量');
									}else if('urlCount' == value.value){
										self.barData.setYaxisName('URL引入数量');
									}else if('(domainCount/domain_All_Count)*100' == value.value){
										self.barData.setYaxisName('域名本网引入率');
									}else{
										self.barData.setYaxisName('本网请求次数占比');
									}
									self.getMapData();
								}
							}
						});

				this.mainPanel = new Ext.Panel({
							layout:'fit',
							tbar : [{
										text : '类型'
									}, this.selectComboBox],
							frame : true,
							baseCls : 'x-plain',
							items : [barPanel],
							colspan : 8
						});
			},
			getParams:function()
			{	
				var value = this.selectComboBox.getValue();
				this.data.barValue = value;
				return this.data 	
			},
			getMapData : function() {
				var data = this.getParams();
				var self = this;
				
				if( Ext.isEmpty(data.webSite_ID) ) return ;
				
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),
						'allProvinceResourcesContrastAction.getListForBar', {
							javaClass : 'java.util.HashMap',
							map : data
						});
			},
			updateMapData : function(data) {
				this.barData.setSeries(data);
				this.barChart.setJSData(this.barData.getData());
			},
			render : function(div) {
				this.mainPanel.render(div);
				this.barChart.setJSData(this.barData.getData());
				this.barChart.write('barChart');
			},
			refresh : function(data) {
				this.data = data;
				this.getMapData();
			}
		});