/**
 *本省cache外省idc域名重复信息列表
 */
base.portal.allProvinceIDCRepeatDomain = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
				var columns = [
				{header:'id',dataIndex:'id',hidden:true},
				{header:'webSiteId',dataIndex:'webSite_ID',hidden:true},
				{header:'province',dataIndex:'province',hidden:true},
				{header:'省份',dataIndex:'provinceName',width:120},
				{header:'网站名称',dataIndex:'webSite_Name',width:120},
				{header:'重复域名数',dataIndex:'repeatDomainNum',width:120},
				{header:'IDC引入省份',dataIndex:'idc_province',width:150}
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
					dataMethod:'allProvinceIDCRepeatDomainAction.getList',
					columns:columns,
					frame : false,
					border: false,
					//bodyBorder: false,
					height:255,
					listeners:
					{
						rowclick:function()
						{
							var row = self.grid.getSelected();
							self.notice(row.data);
						}
					}
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
				this.updateData(data);
			}
		});