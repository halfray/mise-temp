function getPage3()
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
	var sm = new Ext.grid.CheckboxSelectionModel();
	var userColumns = [ new Ext.grid.RowNumberer(),sm, {
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
	}, {
		header : '质量分',
		width : 100,
		sortable : true,
		dataIndex : 'quaScore'
	}];
	
	var grid = new Ext.ux.Grid( {
		//title : '通过域名和配置策略筛选IP',
		dataMethod : 'domainDispatchTaskDetailAction.getIpInfoList',
		columns : userColumns,
		border : false,
		frame : false,
		fetchSize : 20,
		showPagingBar : false,
		columnLines : true,
		sm : sm,
		root : 'result',
		colspan : 8
	});
	
	return grid;
}