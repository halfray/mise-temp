function getPage1()
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
		dataIndex : 'downLoadTim'
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
	}];
	
	var grid = new Ext.ux.Grid( {
		//title : '目前域名资源质量分情况',
		dataMethod : 'domainDispatchTaskDetailAction.getDomainQuaScore',
		columns : userColumns,
		border : false,
		frame : false,
		fetchSize : 20,
		columnLines : true,
		colspan : 8
	});
	
	return grid;
}