/**
 *  五、网站资源本省流量分布情况
 * */
base.portal.dmAnalysisReportLocalWebSiteResFlowDistr = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],

			init : function(params) {
				
				var operator = new Ext.ux.seraph.DictCombo( {
					url: 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
					displayField: 'codeLabel',
					valueField: 'codeValue'
				});
				var province = new Ext.ux.seraph.DictCombo( {
					url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
					displayField : 'codeLabel',
					valueField : 'codeValue'
				});
				var system = new Ext.ux.seraph.DictCombo( {
					url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
					displayField : 'codeLabel',
					valueField : 'codeValue'
				});
				
				this.pieData = new PieData();
				this.pieChart = new AnyChart("swf/AnyChart.swf",
						"swf/Preloader.swf");
				this.pieChart.width = '100%';
				this.pieChart.height ='100%';
				this.pieChart.wMode = 'Transparent';
//			    this.panel=new Ext.Panel({
//			    	html:"<div id='left' style='width:40%;float:left;'></div><div id='right'  style='width:60%;float:left;'></div>"
//			    });
			    
			    var columns = [ 
			                   new Ext.grid.RowNumberer(),
               {
			   	   header:'域名',
				   dataIndex:'domain',
				   hidden:false,
				   width: 90
			   }, {
					header: 'IP',
					width: 80,
					sortable: true,
					dataIndex: 'IP',
					hidden: false,
					hideable: false
					
				}, {
					header: '所属运营商',
					width: 80,
					sortable: true,
					dataIndex: 'operator',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(operator)
					
				}, {
					header: '所属区域',
					width: 80,
					sortable: true,
					dataIndex: 'province',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(province)
					
				}, {
					header: '所属系统',
					width: 80,
					sortable: true,
					dataIndex: 'system',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(system)
					
				},
               /*{header:'下行流量(MB)',dataIndex:'downFlow',hidden:false,width:90,
			    renderer:function(value){
					return Main.fun.getMFromByte(value);
				}},*/
				{header:'DNS解析次数',dataIndex:'DnsNum',hidden:false,width:110},
               {header:'更新日期',dataIndex:'updateDate',hidden:false,width:80}
              ];
						    var self=this;
					    	this.data={};					   
				    	    /*this.detailGrid = new Ext.ux.Grid({
								title: '产生他网下行流量的Top10域名',
						    	dataMethod:'analysisReportLocalWebSiteResFlowAction.getList',
						    	viewData:false,
								frame : false,
								border: false,
								columns:columns,
								autoScroll: true,
						    	columnLines : true,
						    	fetchSize : 15
					    	});*/
					    	//尝试groupField
					    	this.detailGrid = new Ext.ux.GroupGrid( {
								title: '产生他网解析次数的Top10域名',
								stateful:true,
								stateId:'detailR5-statesave-grid',
								dataMethod : 'analysisReportLocalWebSiteResFlowAction.getList',
								autoScroll : true,
								columnLines : true,
								height: 351,
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
								columns:columns,
								root: 'result'
							});
							
							this.panel= new Ext.Panel({
								layout: 'border',
								frame: false,
								xtype:"panel",
								border: false,
								bodyBorder: false,
								baseCls: 'x-plain',
								height:350,
								items: [{
									layout: 'fit',
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
						    });
			    
			},
			 
		     
			getMapData : function(data) {
				var self = this;
				var mapData = {};				
				mapData.webSiteId = data.webSiteId;
				mapData.webSiteName = data.webSiteName;
				mapData.province = data.province;
				M.rpc._call(Main.fun.Fun(self, self.updateMapData),'analysisReportLocalWebSiteResFlowAction.getListLocalWebSiteResFlow',{
					javaClass : 'java.util.HashMap',
					map : mapData
				});
				this.detailGrid.updateParams(mapData);
			},
			updateMapData : function(data) {
				if(data != null)
					{
							this.pieData.setPoints(data.list);
							this.pieData.setTitle('总解析次数：'
									+ Main.fun.getMFromByte(data.allHotNum));
							this.pieChart.setJSData(this.pieData.getData());
					}
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.panel.width = obj.offsetWidth;
				this.panel.height = obj.offsetHeight;
				
				this.pieChart.setJSData(this.pieData.getData());
				this.panel.render(div);
				this.pieChart.write("pieChart");
			},
			refresh : function(data) {
				this.getMapData(data);
			}
		});