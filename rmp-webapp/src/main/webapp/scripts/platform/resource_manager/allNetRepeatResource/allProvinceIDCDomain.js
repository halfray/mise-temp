/**
 *本省cache外省idc域名重复信息列表
 */
base.portal.allProvinceIDCDomain = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
				var columns = [
				{header:'id',dataIndex:'id',hidden:true},
				{header:'webSiteId',dataIndex:'webSite_ID',hidden:true},
				{header:'province',dataIndex:'province',hidden:true},
				{header:'省份',dataIndex:'provinceName',width:120},
				{header:'IDC引入域名数量',dataIndex:'domainNum',width:120},
				{
					header : '域名引入率',
					dataIndex : 'domain_rate',
					width : 120,
					renderer : function(value) {
						if (Ext.isEmpty(value))
							value == 0;
						return (value * 100).toFixed(2) + "%";
					}
				}
				/*, {
					header : '总流量',
					width : 100,
					sortable : true,
					dataIndex : 'all_Flow',
					hidden : false,
					hideable : false
				}, {
					header : '上行流量',
					width : 100,
					sortable : true,
					dataIndex : 'upload_Flow',
					hidden : false,
					hideable : false
				}, {
					header : '下行流量',
					width : 100,
					sortable : true,
					dataIndex : 'download_Flow',
					hidden : false,
					hideable : false
				}, {
					header : '请求次数',
					width : 100,
					sortable : true,
					dataIndex : 'req_num',
					hidden : false,
					hideable : false
				}*/
				];
				var self = this;
				this.grid = new Ext.ux.Grid({
					dataMethod:'allProvinceIDCDomainAction.getList',
					viewData:false,
					frame : false,
					border: false,
					//bodyBorder: false,
					columns:columns,
					height:255
				});
			},
			updateData : function(data) {
				this.grid.updateParams(data);
			},
			render : function(div) {
				this.grid.render(div);
			},
			refresh:function(data)
			{
				if(Ext.isEmpty(data.webSite_ID))
				{
					this.grid.clearStore();
					return ;
				}
				this.updateData(data);
			}
		});