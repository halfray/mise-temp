/**
 *  六、网站资源本省访问质量情况
 * */
var province = "";
base.portal.dmAnalysisReportR6RequestQuaDistr = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],

			init : function(params) {
				this.pieData = new PieData();
				this.pieChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.pieChart.width = '100%';
				this.pieChart.height ='100%';
				this.pieChart.wMode = 'Transparent';
				
				this.lineData = new LineData();
				this.lineChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.lineChart.width = '100%';
				this.lineChart.height ='100%'
				this.lineChart.wMode = 'Transparent';
				
			    var operator = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' 					 			
				 });
			    var area = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' 					 			
				 });
			    var system = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' 					 			
				 });
			    var columns = [ 
			                   new Ext.grid.RowNumberer(),
			                   {header:'域名',dataIndex:'domain',hidden:false,width:90},
							   {header:'IP',dataIndex:'IP',hidden:false,width:80},
			                   {header:'所属运营商',dataIndex:'operator',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(operator)},
			                   {header:'所属区域',dataIndex:'province',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(area)},
			                   {header:'所属系统',dataIndex:'system',hidden:false,width:80,renderer:Ext.ux.renderer.Combo(system)},
			                   {header:'质量分数',dataIndex:'quaScore',hidden:false,width:80},
			                   {header:'更新日期',dataIndex:'updateDate',hidden:false}
			                  ];
						    var self=this;
					    	this.data={};					   
				    	    /*this.detailGrid = new Ext.ux.Grid({
								title: 'Top10访问质量差的域名',
						    	dataMethod:'analysisReportQualityDetailAction.getListQuaWorseDistr',
						    	viewData:false,
								frame : false,
								border: false,
								columns:columns,
						    	columnLines : true,
						    	fetchSize : 15
					    	});*/
					    	this.detailGrid = new Ext.ux.GroupGrid( {
								title: 'Top10访问质量差的域名',
								stateful:true,
								stateId:'detailR6-statesave-grid',
								dataMethod : 'analysisReportQualityDetailAction.getListQuaWorseDistr',
								autoScroll : true,
								columnLines : true,
								height: 340,
								viewData:false,
								frame : false,
								border: false,
								showPagingBar: false,
								hideGroupedColumn:true,
								view:new Ext.grid.GroupingView({
									hideGroupedColumn:Ext.isDefined(this.hideGroupedColumn)?this.hideGroupedColumn:true,
									showGroupName:Ext.isDefined(this.showGroupName)?this.showGroupName:true,
									groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
								 }),
								showGroupName:true,
								groupField:'domain',
								sortField:'domain',
								fetchSize:15,
								columns:columns,
								root: 'result'
							});
							
							this.panel= new Ext.Panel({
								frame: false,
						    	layout: 'border',
								border: false,
								bodyBorder: false,
								baseCls: 'x-plain',
						        items:[
								{
									layout: 'border',
									frame: false,
									xtype:"panel",
									border: false,
									bodyBorder: false,
									baseCls: 'x-plain',
									region:"north",
									height:350,
									items: [{
										layout: 'fit',
//										id: 'pieChart',
										xtype:"panel",
										frame: false,
										border: false,
										bodyBorder: false,
										baseCls: 'x-plain',
										width:400,
										region:"west",
										html: "<div id='pieChart'></div>"
									},
									{
										id: 'detailGrid',
										xtype:"panel",
										bodyBorder: false,
										region:"center",
										items: this.detailGrid
									}]
									
								},{
									layout: 'fit',
									xtype:"panel",
//									border: false,
									frame: false,
									bodyBorder: false,
									baseCls: 'x-plain',
									xtype:"panel",
									region: "center",
									html: "<div id='lineChart'></div>"
								}]

						    });
			    
			},
			 
		     
			getMapData : function(data) {
				var self = this;
				var mapData = {};				
				mapData.webSiteId = data.webSiteId;
				mapData.webSiteName = data.webSiteName;
				mapData.province = data.province;
				province = data.provinceName;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'analysisReportQualityDetailAction.getAllChar',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
				this.detailGrid.updateParams(mapData);
			},
			updateMapData : function(data) {
				if(data.c1 != null){
					this.pieData.setPoints(data.c1.list);
					this.pieData.setTitle('总质量分数：'+data.c1.allQuaScore);
				}
				this.pieChart.setJSData(this.pieData.getData());
				
				this.lineData.setSeries(data.c2);
				this.lineData.setTitle(province+'省质量分变化情况');
				this.lineChart.setJSData(this.lineData.getData());
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.panel.width = obj.offsetWidth;
				this.panel.height = obj.offsetHeight;
				
				this.pieChart.setJSData(this.pieData.getData());
				this.lineChart.setJSData(this.lineData.getData());
				this.panel.render(div);
				this.pieChart.write("pieChart");
				this.lineChart.write("lineChart");
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});