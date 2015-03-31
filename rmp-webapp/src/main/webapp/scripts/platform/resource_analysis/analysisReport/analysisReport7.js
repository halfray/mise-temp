base.portal.analysisReport7 = Ext.extend(Main.portal.PortalPage, {
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
				var sence = new Ext.ux.seraph.DictCombo( {
					url : 'parmInfoProvider.do?parmType=DOMAIN_DISPATCH_SENCE',
					displayField : 'parmName',
					valueField : 'parmCode'
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
					header: '问题情况',
					width: 130,
					sortable: true,
					dataIndex: 'question',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(sence)
					
				}, {
					header: '调度IP',
					width: 130,
					sortable: true,
					dataIndex: 'scheduleIP',
					hidden: false,
					hideable: false,
					renderer : function(value){
					if(value.indexOf('\N') > -1){
						return '  ';
					}
				}
				}, {
					header: '指向运营商',
					width: 130,
					sortable: true,
					dataIndex: 'operator',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(operator)
				}, {
					header: '指向区域',
					width: 130,
					sortable: true,
					dataIndex: 'area',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(province)
					
				}, {
					header: '指向系统',
					width: 130,
					sortable: true,
					dataIndex: 'system',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(system)
				}, {
					header: '更新日期',
					width: 130,
					sortable: true,
					dataIndex: 'updateDate',
					hidden: false,
					hideable: false
					
				}];		
				this.grid = new Ext.ux.Grid( {
					dataMethod : 'analysisReport7ProvinceDomainDispService.getAnalysisReportDispErrorList',
					columns : userColumns,
					border : false,
					frame : false,
					fetchSize : 20,
					sm : new Ext.grid.RowSelectionModel( {
						singleSelect : true
					}),
					height: 350,
					colspan : 8,
					viewData : false
				});
				
			},
			run:function()
			{
			},
			render : function(div) {
				this.grid.render(div);
			},
			refresh : function(data) {
				this.grid.updateParams(data);
			}
		});