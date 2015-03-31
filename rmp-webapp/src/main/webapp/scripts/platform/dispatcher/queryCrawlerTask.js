var province = new Ext.ux.seraph.DictCombo( { 
	url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue'
 });

var queryColumns = [ new Ext.grid.RowNumberer(),{
		header : '域名',
		width : 130,
		sortable : true,
		dataIndex : 'domain'
	}, {
		header : '所属省份',
		width : 80,
		sortable : true,
		dataIndex : 'province',
		renderer:Ext.ux.renderer.Combo(province)
	}, {
		header : '错误描述',
		width : 80,
		sortable : true,
		dataIndex : 'taskErrorCode'
	}, {
		header : '目的主机IP',
		width : 100,
		sortable : true,
		dataIndex : 'hostIpv4'
	}, {
		header : '解析时间(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'resolveTime'
	}, {
		header : '连接时间(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'connectTime'
	}, {
		header : '首字节时间(ms)',
		width : 110,
		sortable : true,
		dataIndex : 'firstByteTime'
	}, {
		header : '下载时间(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'downloadTime'
	}, {
		header : '总时间(ms)',
		width : 100,
		sortable : true,
		dataIndex : 'totalTime'
	}, {
		header : '吞吐量(KB/s)',
		width : 100,
		sortable : true,
		dataIndex : 'throughput'
	}, {
		header : '质量',
		width : 100,
		sortable : true,
		dataIndex : 'meanQuality'
	}, {
		header : '总下载大小(Byte)',
		width : 110,
		sortable : true,
		dataIndex : 'downloadLength'
	}, {
		header : 'HTTP返回码',
		width : 110,
		sortable : true,
		dataIndex : 'responseCode'
	}, {
		header : '子项个数',
		width : 110,
		sortable : true,
		dataIndex : 'subItemCount'
	}];
	
	var queryGrid = new Ext.ux.Grid( {
		dataMethod : 'smWebSiteCrawlerTaskAction.getQueryList',
		columns : queryColumns,
		border : false,
		frame : false,
		root : 'result',
		showPagingBar : false,
		columnLines : true,
		colspan : 8
	});

	var data = {};
	data.taskNo = resultJsonObject.taskNo;
	queryGrid.setParams(data);
	queryGrid.doSearchList();

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var panel = new Ext.Panel({
		renderTo : 'user-grid',
		layout : 'fit',
		autoScroll : true,
		//frame : true,
		border: false,
		bodyBorder: false,
		items : [queryGrid]
	});
    queryGrid.setWidth(Ext.get("content").getWidth());
    queryGrid.setHeight(Ext.get("content").getHeight());
    
});