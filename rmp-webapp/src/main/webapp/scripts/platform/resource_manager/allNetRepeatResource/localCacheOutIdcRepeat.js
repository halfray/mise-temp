/**
 *本省cache外省idc域名重复信息列表
 */
base.portal.localCacheOutIdcRepeat = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
				var columns = [
				{header:'id',dataIndex:'id',hidden:true},
				{header:'webSiteId',dataIndex:'webSiteId',hidden:true},
				{header:'省份',dataIndex:'provinceName',width:120,hidden:true},
				{header:'网站名称',dataIndex:'webSite_Name',width:120},
				{header:'总域名数',dataIndex:'allNum',width:100},
				{header:'重复域名数',dataIndex:'repeatDomainNum',width:100},
				{header:'网站引入省份',dataIndex:'repeatProvinces',width:120}
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
					dataMethod:'dmLocalCacheOutIdcRepeatAction.getList',
					columns:columns,
					height:255,
					viewData:false,
					frame : false,
					border: false,
					//bodyBorder: false,
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