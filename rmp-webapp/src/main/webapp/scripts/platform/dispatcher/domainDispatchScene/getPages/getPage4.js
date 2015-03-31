function getPage4()
{
	var userColumns = [ new Ext.grid.RowNumberer(), {
		header : 'IP',
		sortable : true,
		dataIndex : 'ip',
		width : 130,
	}, {
		header : '下载用时',
		width : 70,
		sortable : true,
		dataIndex : 'downloadtim'
	}, {
		header : 'ttl',
		width : 50,
		sortable : true,
		dataIndex : 'ttl'
	}, {
		header : '网络延时',
		width : 70,
		sortable : true,
		dataIndex : 'netDelay'
	}, {
		header : 'web延时',
		width : 70,
		sortable : true,
		dataIndex : 'webDelay'
	}, {
		header : 'ping延时',
		width : 70,
		sortable : true,
		dataIndex : 'pingDelay'
	}, {
		header : '质量分',
		width : 80,
		sortable : true,
		dataIndex : 'quaScore'
	}, {
		header : 'DNS服务器地址',
		sortable : true,
		hidden : true,
		dataIndex : 'serverurl'
	}, {
		header : '所属运营商',
		sortable : true,
		hidden : true,
		dataIndex : 'operator'
	}, {
		header : '所属省份',
		sortable : true,
		hidden : true,
		dataIndex : 'province'
	}, {
		header : '所属系统',
		sortable : true,
		hidden : true,
		dataIndex : 'system'
	}, {
		header : '成本分',
		sortable : true,
		hidden : true,
		dataIndex : 'costscore'
	}];
	
	var grid = new Ext.ux.Grid( {
		//title : '被调度IP质量拨测结果',
		dataMethod : 'domainDispatchTaskDetailAction.getDispatchAfterDetailInfo',
		columns : userColumns,
		border : false,
		frame : false,
		fetchSize : 20,
		columnLines : true,
		colspan : 8
	});
	
	return grid;
}