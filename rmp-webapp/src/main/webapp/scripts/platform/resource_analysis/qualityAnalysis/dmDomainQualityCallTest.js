function getDetailList(record){
    var gridColumns = [new Ext.grid.RowNumberer(), {
        header: '日期',
        width: 100,
        sortable: true,
        dataIndex: 'updateDate',
        hidden: false,
        hideable: false
    }, {
        header: '域名',
        width: 120,
        sortable: true,
        dataIndex: 'domain',
        hidden: false,
        hideable: false
    }, {
        header: "IP",
        width: 120,
        sortable: true,
        dataIndex: "ip",
        hidden: false,
        hideable: false
    }, {
        header: "运营商",
        width: 120,
        sortable: true,
        dataIndex: "operators",
        hidden: false,
        hideable: false,
	    renderer:Ext.ux.renderer.Combo(operators)
    }, {
        header: '归属区域',
        width: 120,
        sortable: true,
        dataIndex: 'belongToArea',
        hidden: false,
        hideable: false,
		renderer:Ext.ux.renderer.Combo(local)
    }, {
        header: '归属系统',
        width: 120,
        sortable: true,
        dataIndex: 'belongToSystem',
        hidden: false,
        hideable: false,
		renderer:Ext.ux.renderer.Combo(system)
    }, {
        header: '质量分数',
        width: 120,
        sortable: true,
        dataIndex: 'quality_Store',
		align: 'right',
        hidden: false,
        hideable: false,
		renderer : function(value){
			return value.toFixed(2);
		}
    }, {
        header: '响应时间',
        width: 120,
        sortable: true,
        dataIndex: 'responseTime',
        hidden: false,
        hideable: false
    }, {
        header: 'DNS解析时间',
        width: 120,
        sortable: true,
        dataIndex: 'DNSResolTime',
        hidden: false,
        hideable: false
    }, {
        header: 'TCP建链时间',
        width: 140,
        sortable: true,
        dataIndex: 'TCPTime',
        hidden: false,
        hideable: false
    }, {
		header: '首字节时间',
		width: 120,
		sortable: true,
		dataIndex: 'startByteTime',
		hidden: false,
		hideable: false
	}, {
		header: '剩余字节时间',
		width: 120,
		sortable: true,
		dataIndex: 'otherByteTime',
		hidden: false,
		hideable: false
	}];
    
    this.detailGrid = new Ext.ux.Grid({
        dataMethod: 'domainQualityAnalysisAction.getCallTestList',
        columns: gridColumns,
        fetchSize: 15,
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true
        }),
        columnLines: true,
        frame: false,
        border: false,
        bodyBorder: false,
        viewData: false
    });
	
    var windows = new Ext.Window({
        title: "拨测明细数据",
        width: 900,
        height: 436,
        border: false,
		layout: 'fit',
        bodyBorder: false,
        autoScroll: true,
		modal: true,
		items: [this.detailGrid]
    });
	
    windows.show();
	var data = {};
	data.domain = record.get('domain');
	data.IP = record.get('ip');
    searchDetailGrid(data);
}

function searchDetailGrid(data){
    this.detailGrid.setParams(data);
    this.detailGrid.doSearchList();
}