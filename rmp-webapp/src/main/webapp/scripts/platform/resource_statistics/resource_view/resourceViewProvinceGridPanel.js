/**
 * 分省资源概览列表
 */
base.portal.resourceViewProvinceGridPanel = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],

			init : function(params) {
				var province = new Ext.ux.seraph.DictCombo( {
					url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
					displayField : 'codeLabel',
					valueField : 'codeValue'
				});
				var row = [
					{ header: '', colspan: 1, align: 'center' },
					{ header: '', colspan: 1, align: 'center' },
					{ header: '引入总数', colspan: 4, align: 'center' },
					{ header: 'IDC', colspan: 2, align: 'center' },
					{ header: 'Cache', colspan: 2, align: 'center' },
					{ header: '对等直连', colspan: 2, align: 'center' },
					{ header: 'CDN', colspan: 2, align: 'center' },
					{ header: '其他', colspan: 2, align: 'center' }
				];

				var group = new Ext.ux.grid.ColumnHeaderGroup({
				    rows: [row]
				});
				
				var userColumns = [new Ext.grid.RowNumberer(), {
					header: '省份',
					width: 130,
					sortable: true,
					dataIndex: 'province',
					hidden: false,
					hideable: false,
					renderer:Ext.ux.renderer.Combo(province)
					
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'TotalWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数(去重后)',
					width: 130,
					sortable: true,
					dataIndex: 'TotalDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数(去重前)',
					width: 130,
					sortable: true,
					dataIndex: 'beforeDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '重复度',
					width: 130,
					sortable: true,
					dataIndex: 'repeatDegree',
					hidden: false,
					hideable: false,
					renderer: Main.fun.getPerByReal
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'IDCWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数',
					width: 130,
					sortable: true,
					dataIndex: 'IDCDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'CACHEWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数',
					width: 130,
					sortable: true,
					dataIndex: 'CACHEDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'PDNWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数',
					width: 130,
					sortable: true,
					dataIndex: 'PDNDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'CDNWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数',
					width: 130,
					sortable: true,
					dataIndex: 'CDNDomainNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '网站数',
					width: 130,
					sortable: true,
					dataIndex: 'OTHERWebsiteNum',
					hidden: false,
					hideable: false
					
				}, {
					header: '域名数',
					width: 130,
					sortable: true,
					dataIndex: 'OTHERDomainNum',
					hidden: false,
					hideable: false
					
				}];		
				this.grid = new Ext.ux.Grid( {
					dataMethod : 'allProvinceResourcesContrastAction.getResourceViewProvinceGridPanel',
					columns : userColumns,
					border : false,
					frame : false,
					fetchSize : 32,
					plugins : group,
					sm : new Ext.grid.RowSelectionModel( {
						singleSelect : true
					}),
					height: 1270,
					showPagingBar : false,
					root : 'result',
					colspan : 8,
					viewData : true
				});
				
			},
			run:function()
			{
				this.grid.updateParams(data);
			},
			render : function(div) {
				var obj = Ext.getDom(div);
				this.grid.height=obj.offsetHeight;
				this.grid.render(div);
			},
			refresh : function(data) {
				this.grid.updateParams(data);
			}
		});