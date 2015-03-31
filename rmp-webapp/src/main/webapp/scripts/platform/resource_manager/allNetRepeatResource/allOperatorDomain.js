/**
 *本省cache外省idc域名重复信息列表
 */
base.portal.allOperatorDomain = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
				var columns = [
				{header:'id',dataIndex:'id',hidden:true},
				{header:'webSiteId',dataIndex:'webSiteId',hidden:true},
				//{header:'省份',dataIndex:'provinceName',width:120},
				{header:'网站名称',dataIndex:'webSite_Name',width:150},
				{header:'域名数量',dataIndex:'domain_all_num',width:120},
				{header:'移动域名引入数量',dataIndex:'yd_num',width:120},
				{header:'移动域名引入率',dataIndex:'yd_rate',width:120,renderer:function(value){return (value*100).toFixed(2)+'%';}},
				{header:'电信域名引入数量',dataIndex:'dx_num',width:120},
				{header:'电信域名引入率',dataIndex:'dx_rate',width:120,renderer:function(value){return (value*100).toFixed(2)+'%';}},
				{header:'联通域名引入数量',dataIndex:'lt_num',width:120},
				{header:'联通域名引入率',dataIndex:'lt_rate',width:120,renderer:function(value){return (value*100).toFixed(2)+'%';}},
				{header:'铁通域名引入数量',dataIndex:'tt_num',width:120},
				{header:'铁通域名引入率',dataIndex:'tt_rate',width:120,renderer:function(value){return (value*100).toFixed(2)+'%';}},
				{header:'其他域名引入数量',dataIndex:'ot_num',width:120},
				{header:'其他域名引入率',dataIndex:'ot_rate',width:120,renderer:function(value){return (value*100).toFixed(2)+'%';}}
				];
				var self = this;
				this.grid = new Ext.ux.Grid({
					dataMethod:'allOperatorDomainAction.getList',
					columns:columns,
					columnLines : true,
					frame : false,
					border: false,
					//bodyBorder: false,
					height:460
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