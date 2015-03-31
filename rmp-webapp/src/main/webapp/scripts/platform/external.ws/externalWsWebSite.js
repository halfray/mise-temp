
function updateMapData(data){
	var html = "";
	if (data != null) {
		html += "<div style='margin-top:10'>";
		html += "<font color='blue' size='3'> 待执行任务:</font>" + data.task_state_wait_excute;
		html += "<font color='blue' size='3'> 待执行网站数:</font>" + data.website_state_wait_excute;
		html += "<font color='blue' size='3'> 正在执行的网站:</font>" + data.website_state_excuting;
		html += "<font color='blue' size='3'> 已完成的网站的个数:</font>" + data.website_state_excuted;
		html += "<font color='blue' size='3'> 可全网站可缓存域名的总量:</font>" + data.all_resource_count;
		html += "</div>";
	}
	//				document.getElementById('total').innerHTML = html;
	
	var columns = [new Ext.grid.RowNumberer(), {
		header: '网站类型ID',
		dataIndex: 'type_id',
		hidden: true,
		width: 150
	}, {
		header: '网站名称',
		width: 270,
		sortable: true,
		dataIndex: 'site_name',
		hidden: false,
		hideable: false
	
	}, {
		header: '网站类型',
		dataIndex: 'type_name',
		hidden: false,
		width: 270
	}, {
		header: '域名总数量',
		width: 270,
		sortable: true,
		dataIndex: 'total_resource',
		hidden: false,
		hideable: false
	
	}, {
		header: '可缓存域名数量',
		width: 270,
		sortable: true,
		dataIndex: 'cache_resource',
		hidden: false,
		hideable: false
	
	}];
	var self = this;
	this.data = {};
	this.detailGrid = new Ext.ux.Grid({
		id: 'webSiteListGridPanel',
    	dataMethod:'externalWebSiteAction.getList',
		frame : false,
		border: false,
		sortBar : false,
		columns:columns,
    	columnLines : true,
		viewData: true,
    	fetchSize : 10,
//				litePagingBar : true,
//		tbar: queryFields,
		height:490				
	});
	//尝试groupField
//	this.detailGrid = new Ext.ux.GroupGrid({
//		stateful: true,
//		stateId: 'detailR5-statesave-grid',
//		dataMethod: 'externalWebSiteAction.getList',
//		autoScroll: true,
//		columnLines: true,
//		height: 351,
//		viewData: true,
//		frame: false,
//		border: false,
//		showPagingBar: true,
//		hideGroupedColumn: true,
//		view: new Ext.grid.GroupingView({
//			hideGroupedColumn: Ext.isDefined(this.hideGroupedColumn) ? this.hideGroupedColumn : false,
//			showGroupName: Ext.isDefined(this.showGroupName) ? this.showGroupName : true,
//			groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
//		}),
//		showGroupName: true,
//		groupByText:'type_name',
//		groupField: 'type_name',
//		sortField: 'type_id',
//		direction: 'ASC',
//		columns: columns,
//		root: 'result'
//	});
	
	this.panel = new Ext.Panel({
		layout: 'border',
		frame: false,
		xtype: "panel",
		border: false,
		bodyBorder: false,
		baseCls: 'x-plain',
		height: 500,
		items: [{
			layout: 'fit',
			xtype: "panel",
			frame: false,
			border: false,
			bodyBorder: false,
			baseCls: 'x-plain',
			height: 35,
			width: 400,
			region: "north",
			html: html
		}, {
			id: 'detailGrid',
			xtype: "panel",
			bodyBorder: false,
			region: "center",
			items: this.detailGrid
		}]
	});
	
	var obj = (Ext.getDom('content'));
	this.panel.width = obj.offsetWidth;
	this.panel.height = obj.offsetHeight;
	this.detailGrid.width = obj.offsetWidth;
	this.detailGrid.height = obj.offsetHeight-30;
	this.panel.render('content');
}		
Ext.onReady(function() {
	
	var mapData = {};				
	M.rpc._call(Main.fun.Fun(self, self.updateMapData),'externalWebSiteAction.getListTotal',{
		javaClass : 'java.util.HashMap',
		map : mapData
	});
});