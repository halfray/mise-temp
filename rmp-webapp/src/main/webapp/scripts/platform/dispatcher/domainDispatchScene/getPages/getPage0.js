function getPage0()
{
	var province = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue'
	 });
	
	var operator = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue'
	 });
	
	var system = new Ext.ux.seraph.DictCombo( { 
		url :'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
		displayField : 'codeLabel',
	    valueField : 'codeValue'
	 });
	
	var userColumns = [ new Ext.grid.RowNumberer(), {
		header : 'IP',
		sortable : true,
		dataIndex : 'ip',
		width : 130,
	}, {
		header : '所属运营商',
		width : 100,
		sortable : true,
		dataIndex : 'operator',
		renderer:Ext.ux.renderer.Combo(operator)
	}, {
		header : '所属省份',
		width : 100,
		sortable : true,
		dataIndex : 'province',
		renderer:Ext.ux.renderer.Combo(province)
	}, {
		header : '所属系统',
		width : 100,
		sortable : true,
		dataIndex : 'system',
		renderer:Ext.ux.renderer.Combo(system)
	}];
	
	var grid = new Ext.ux.Grid( {
		//title : '目前域名资源分布情况',
		dataMethod : 'domainDispatchTaskDetailAction.getDomainDetail',
		columns : userColumns,
		border : false,
		frame : false,
		id:'gridID',
		fetchSize : 20,
		//autoHeight : true,
		height : 50,
		autoWidth : true,
		autoScroll : true,
		viewConfig : {forceFit : true},
		columnLines : true,
		colspan : 8
	});
	
	return grid;
}