function getIpDetail(record){
    var rowDetail = [{
        header: '',
        colspan: 1,
        align: 'center'
    }, {
        header: '',
        colspan: 1,
        align: 'center'
    }, {
        header: '',
        colspan: 1,
        align: 'center'
    }, {
        header: '',
        colspan: 1,
        align: 'center'
    }, {
        header: '',
        colspan: 1,
        align: 'center'
    }, {
        header: '请求次数',
        colspan: 3,
        align: 'center'
    }, {
        header: '',
        colspan: 1,
        align: 'center'
    }];
    var groupDetail = new Ext.ux.grid.ColumnHeaderGroup({
        rows: [rowDetail]
    });
    
    var orgCodeField = new Ext.ux.seraph.DictCombo({
        url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
    });
    var operatorCodeField = new Ext.ux.seraph.DictCombo({
        url: 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
    });
    var systemParamsField = new Ext.ux.seraph.DictCombo({
        url: 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
        displayField: 'codeLabel',
        valueField: 'codeValue'
    });
    
    
    var gridColumns = [new Ext.grid.RowNumberer(), {
        header: 'IP',
        width: 100,
        sortable: true,
        dataIndex: 'ip',
        hidden: false,
        hideable: false
    }, {
        header: '归属域名',
        width: 100,
        sortable: true,
        dataIndex: 'domain',
        hidden: false,
        hideable: false
    }, {
        header: "归属区域",
        width: 120,
        sortable: true,
        dataIndex: "area",
        renderer: Ext.ux.renderer.Combo(orgCodeField),
        hidden: false,
        hideable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: "归属系统",
        width: 120,
        sortable: true,
        dataIndex: "system",
        renderer: Ext.ux.renderer.Combo(systemParamsField),
        hidden: false,
        hideable: false,
        editor: {
            xtype: 'textfield'
        }
    }, {
        header: '共计',
        width: 90,
        sortable: true,
        dataIndex: 'visit_count',
		align: 'right',
        hidden: false,
        hideable: false
    }, {
        header: '访问本省资源次数',
        width: 120,
        sortable: true,
        dataIndex: 'domainIpReqNum',
		align: 'right',
        hidden: false,
        hideable: false
    }, {
        header: '访问本省资源次数占比',
        width: 130,
        sortable: true,
        dataIndex: 'domainIpReqNumProportion',
		align: 'right',
        hidden: false,
        hideable: false,
        renderer: function(value){
            return (value * 100).toFixed(2) + '%';
        }
    }, {
        header: '更新日期',
        width: 90,
        sortable: true,
        dataIndex: 'updatedate',
        hidden: false,
        hideable: false
    }];
    
    var detailGrid = new Ext.ux.Grid({
        dataMethod: 'dmIpLiberaryAction.getIpList',
        columns: gridColumns,
        height: 405,
        //width:880,
        fetchSize: 15,
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true
        }),
        colspan: 8,
        columnLines: true,
        frame: false,
        border: false,
        bodyBorder: false,
        plugins: groupDetail,
        viewData: false
    });
    
    var windows = new Ext.Window({
        xtype: "window",
        title: "IP信息",
        width: 900,
        height: 436,
        border: false,
        bodyBorder: false,
        autoScroll: true,
        items: [detailGrid]
    });
    
    windows.show();
	
    var data = getDetailData(record);
    updateDetailGrid(data, detailGrid);
}

function updateDetailGrid(data, detailGrid){
    detailGrid.setParams(data);
    detailGrid.doSearchList();
}

function getDetailData(record){
    var tbar = grid.getTopToolbar();
    var queryFields = tbar.findByType('field');
    var data = {};
    for (var i = 0; i < queryFields.length; i++) {
        data[queryFields[i].getName()] = queryFields[i].getValue();
    }
    data.domain = record.data.domain;
	data.visit_count = record.data.visit_count_all;
    return data;
};

