/**
 * 各省网站资源对比中，利用中国地图显示各省的数据情况
 */
base.portal.resourceInChinaMap = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/MapData.js'],

			init : function(params) {
				this.data = {};
				var self = this;
				var anyChartHeight=document.body.clientHeight-23;
				this.chinaMapData = new MapData();
				this.chinaMapChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.chinaMapChart.width = '100%';
				this.chinaMapChart.height = anyChartHeight+'px';
				this.chinaMapChart.addEventListener('pointClick', Main.fun.Fun(
								self, self.onPointClick));
				this.chinaMapChart.wMode = 'Transparent';

				var mapPanel = new Ext.Panel({
							id : 'mapChart',
							html : 'any chart show there'
						});

				// 系统
				this.systemParamsField = new Ext.ux.seraph.DictCombo({
							fieldLabel : '系统',
							width : 120,
							url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
							listeners : {
								select : function() {
									self.getMapData();
								}
							},
							value:'0000',
							name : 'system',
							displayField : 'codeLabel',
							valueField : 'codeValue'
						});
				var selectData = [["domainCount", "域名引入数量"],
						["urlCount", "URL引入数量"]];
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
							value:'domainCount',
							selectOnFocus : true,
							width : 120,
							listeners : {
								select : function() {
									self.getMapData();
								}
							}
						});

				this.mainPanel = new Ext.Panel({
							layout : 'fit',
							frame : true,
							baseCls : 'x-plain',
							tbar : [{
										text : '系统'
									}, this.systemParamsField, {
										text : '类型'
									}, this.selectComboBox],
							items : [mapPanel]
						});
			},
			getParams:function()
			{	
				var value = this.selectComboBox.getValue();
				this.data.selectValue = value;
				var systemValue = this.systemParamsField.getValue();
				this.data.system = systemValue;
				return this.data 	
			},
			onPointClick : function(event) {
				var idxml = event.data.Attributes['id'];
				var id = AnyChartUtil.getAttributeValue(idxml, "id");
				this.data.areaId = id;
				this.run();
				this.notice(this.data);
			},
			getMapData : function() {
				var self = this;
				var data = this.getParams();
				
				if (Ext.isEmpty(data.system) || Ext.isEmpty(data.webSite_ID)
						|| Ext.isEmpty(data.selectValue))
					return;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),
						'allProvinceResourcesContrastAction.getListForMap', {
							javaClass : 'java.util.HashMap',
							map : data
						});
			},
			updateMapData : function(data) {
				this.chinaMapData.setPoints(data);
				this.chinaMapChart.setJSData(this.chinaMapData.getData());
			},
			render : function(div) {
				this.mainPanel.render(div);
				this.chinaMapChart.setJSData(this.chinaMapData.getData());
				this.chinaMapChart.write('mapChart');
			},
			refresh : function(data) {
				this.data = data;
				this.getMapData();
			}
		});