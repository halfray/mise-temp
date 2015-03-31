/**
 * 四、本省热点资源情况
 */
base.portal.analysisReport4 = Ext.extend(Main.portal.PortalPage, {
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
				var row = [
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					/*{ header: '请求次数', colspan: 3, align: 'center' },
					{ header: '下行流量', colspan: 3, align: 'center' },*/
					{ header: 'DNS解析次数', colspan: 3, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
//					{ header: '', colspan: 1, align: 'center' },
//					{ header: '', colspan: 1, align: 'center' },
//					{ header: '', colspan: 1, align: 'center' },
//					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' }
				];

				var group = new Ext.ux.grid.ColumnHeaderGroup({
				    rows: [row]
				});
				
				var userColumns = [new Ext.grid.RowNumberer(), {
					header: '网站',
					width: 130,
					sortable: true,
					dataIndex: 'website',
					hidden: true,
					hideable: false
					
				}, {
					header: '域名',
					width: 130,
					sortable: true,
					dataIndex: 'domain',
					hidden: false,
					hideable: false
					
				}, {
					header: 'IP',
					width: 130,
					sortable: true,
					dataIndex: 'IP',
					hidden: false,
					hideable: false
					
				}, {
					header: '所属运营商',
					width: 130,
					sortable: true,
					dataIndex: 'operator',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(operator)
					
				}, {
					header: '所属区域',
					width: 130,
					sortable: true,
					dataIndex: 'area',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(province)
					
				}, {
					header: '所属系统',
					width: 130,
					sortable: true,
					dataIndex: 'system',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(system)
					
				}/*, {
					header: '请求次数',
					width: 130,
					sortable: true,
					dataIndex: 'reqNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内请求次数',
					width: 130,
					sortable: true,
					dataIndex: 'inReqNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内次数占比',
					width: 130,
					sortable: true,
					dataIndex: 'inReqNumProportion',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getPerByReal(value);;
					}
				}, {
					header: '下行总流量(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'downFlow',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
					
				}, {
					header: '网内流量(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'inDownFlow',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
					
				}, {
					header: '网内流量占比',
					width: 130,
					sortable: true,
					dataIndex: 'inDownFlowProportion',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getPerByReal(value);;
					}
					
				}*/, {
					header: 'DNS解析次数',
					width: 130,
					sortable: true,
					dataIndex: 'DnsNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内DNS解析次数',
					width: 130,
					sortable: true,
					dataIndex: 'indnsnum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内DNS解析次数占比',
					width: 140,
					sortable: true,
					dataIndex: 'inDnsNumProportion',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getPerByReal(value);;
					}
					
				}, {
					header: '资源数量',
					width: 130,
					sortable: true,
					dataIndex: 'resNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '资源大小(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'resSize',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
					
				},/* {
					header: '可缓存资源数量',
					width: 130,
					sortable: true,
					dataIndex: 'cacheResNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '可缓存资源大小(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'cacheResSize',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
				}, {
					header: '目前引入方式',
					width: 130,
					sortable: true,
					dataIndex: 'introduceType',
					hidden: false,
					hideable: false
					
				}, {
					header: '引入建议',
					width: 130,
					sortable: true,
					dataIndex: 'introduceSuggest',
					hidden: false,
					hideable: false
					
				},*/ {
					header: '更新日期',
					width: 130,
					sortable: true,
					dataIndex: 'updateDate',
					hidden: false,
					hideable: false
					
				}];		
				/*this.hotDomainGrid = new Ext.ux.Grid( {
					dataMethod : 'analysisReport4ProvinceHotResDetailService.getAnalysisReportHotDomainList',
					columns : userColumns,
					border : false,
					frame : false,
					fetchSize : 20,
					plugins : group,
					sm : new Ext.grid.RowSelectionModel( {
						singleSelect : true
					}),
					height: 350,
					//loadMask : true,
					colspan : 8,
					viewData : false
				});*/
				//尝试groupField
				this.hotDomainGrid = new Ext.ux.GroupGrid( {
					stateful:true,
					stateId:'hotdomain-statesave-grid',
					dataMethod : 'analysisReport4ProvinceHotResDetailService.getAnalysisReportHotDomainList',
					autoScroll : true,
					columnLines : true,
					viewData:false,
					frame : false,
					border: false,
					height: 350,
					hideGroupedColumn:true,
					view:new Ext.grid.GroupingView({
						hideGroupedColumn:Ext.isDefined(this.hideGroupedColumn)?this.hideGroupedColumn:true,
						showGroupName:Ext.isDefined(this.showGroupName)?this.showGroupName:true,
						groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
					 }),
					showGroupName:true,
					groupField:'domain',
					sortField:'domain',
					fetchSize:20,
					plugins : group,
					columns : userColumns
				});
				
				
				
				var rowHotUrl = [
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					/*{ header: '请求次数', colspan: 3, align: 'center' },
					{ header: '下行流量', colspan: 3, align: 'center' },*/
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' }
				];

				var groupHotUrl = new Ext.ux.grid.ColumnHeaderGroup({
				    rows: [rowHotUrl]
				});
				
				var userColumnsHotUrl = [new Ext.grid.RowNumberer(), {
					header: '网站',
					width: 130,
					sortable: true,
					dataIndex: 'website',
					hidden: true,
					hideable: false
					
				}, {
					header: 'URL',
					width: 130,
					sortable: true,
					dataIndex: 'url',
					hidden: false,
					hideable: false
					
				}, {
					header: '协议类型',
					width: 130,
					sortable: true,
					dataIndex: 'protocolType',
					hidden: false,
					hideable: false
					
				}/*, {
					header: '请求次数',
					width: 130,
					sortable: true,
					dataIndex: 'reqNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内请求次数',
					width: 130,
					sortable: true,
					dataIndex: 'inReqNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网内次数占比',
					width: 130,
					sortable: true,
					dataIndex: 'inReqNumProportion',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getPerByReal(value);;
					}
					
				}, {
					header: '下行总流量(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'downFlow',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
					
				}, {
					header: '网内流量(MB)',
					width: 130,
					sortable: true,
					dataIndex: 'inDownFlow',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getMFromByte(value);;
					}
					
				}, {
					header: '网内流量占比',
					width: 130,
					sortable: true,
					dataIndex: 'inDownFlowProportion',
					hidden: false,
					hideable: false,
					renderer:function(value){
						return Main.fun.getPerByReal(value);;
					}
				}*/, {
					header: '是否可缓存',
					width: 130,
					sortable: true,
					dataIndex: 'ableCache',
					hidden: false,
					hideable: false
					
				}, {
					header: '目前引入方式',
					width: 130,
					sortable: true,
					dataIndex: 'introduceType',
					hidden: false,
					hideable: false
					
				}, {
					header: '引入建议',
					width: 130,
					sortable: true,
					dataIndex: 'introduceSuggest',
					hidden: false,
					hideable: false
					
				}, {
					header: '更新日期',
					width: 130,
					sortable: true,
					dataIndex: 'updateDate',
					hidden: false,
					hideable: false
					
				}];		
				this.hotUrlGrid = new Ext.ux.Grid( {
					dataMethod : 'analysisReport4ProvinceHotResDetailService.getAnalysisReportHotUrlList',
					columns : userColumnsHotUrl,
					border : false,
					title:'Top 10 热点大文件',
					frame : true,
					fetchSize : 20,
					plugins : groupHotUrl,
					sm : new Ext.grid.RowSelectionModel( {
						singleSelect : true
					}),
					height: 350,
					//loadMask : true,
					colspan : 8,
					viewData : false
				});
				
//				this.panel = new Ext.Viewport({
//					frame: false,
//					baseCls : 'x-plain',
//					layout: 'fit',
//          		border: false,
//					items: [this.hotDomainGrid]
//					items: [{
//						title: ' ',
//		                region: 'north',
//		                height: 380,
//		                margins: '5 5 5 5',
//		                collapsible: false,
//		                layout: 'fit',
//		                cls:'x-grid-panel',
//		                items: this.hotDomainGrid
//		            }, {
//						title: ' ',
//		                region: 'center',
//		                autoScroll: true,
//		                margins: '0 5 5 5',
//		                layout: 'fit',
//		                items: this.hotUrlGrid
//		            }]
//				});
				
			},
			run:function()
			{
			},
			render : function(div) {
//				this.panel.render(div);
//				this.hotDomainGrid.setHeight(Ext.get(div).getHeight());
				this.hotDomainGrid.render(div);
			},
			refresh : function(data) {
				this.hotDomainGrid.updateParams(data);
//				this.hotUrlGrid.updateParams(data);
			}
		});