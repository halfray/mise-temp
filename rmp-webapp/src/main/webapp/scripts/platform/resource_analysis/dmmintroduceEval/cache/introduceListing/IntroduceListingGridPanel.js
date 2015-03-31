function getIntroduceListing(record){
	var yesOrno = new Ext.ux.seraph.DictCombo( {
		url: 'parmInfoProvider.do?parmType=YES_NO',
		displayField: 'parmName',
		valueField: 'parmCode'
	});
    var gridColumns = [new Ext.grid.RowNumberer(), {
        header: '域名',
        width: 120,
        sortable: true,
        dataIndex: 'domain',
        hidden: false,
        hideable: false
    }, {
        header: "域名级别",
        width: 100,
        sortable: true,
        dataIndex: "domainLevel",
        hidden: false,
        hideable: false
    }, {
        header: "URL资源数量",
        width: 120,
        sortable: true,
        dataIndex: "urlResNum",
        hidden: false,
        hideable: false
    }, {
        header: 'URL资源大小(MB)',
        width: 120,
        sortable: true,
        dataIndex: 'urlResSize',
		align: 'right',
        hidden: false,
        hideable: false,
		renderer: function(value){
			
			return Main.fun.getMFromByte(value);
		}
    }, {
        header: '资源命中次数',
        width: 120,
        sortable: true,
        dataIndex: 'resHitNum',
		align: 'right',
        hidden: false,
        hideable: false
    }, {
        header: '资源命中率',
        width: 120,
        sortable: true,
        dataIndex: 'resHitRate',
		align: 'right',
        hidden: false,
        hideable: false,
		renderer: function(value){
			return Main.fun.getPerByReal(value);
		}
    }, {
		header: 'DNS解析次数',
		width: 120,
		sortable: true,
		dataIndex: 'DNSResolNum',
		hidden: false,
		align: 'right',
		hideable: false
	}, {
		header: '请求次数',
		width: 80,
		sortable: true,
		dataIndex: 'reqNum',
		hidden: false,
		align: 'right',
		hideable: false
	}, {
		header: '总流量(MB)',
		width: 110,
		sortable: true,
		dataIndex: 'allFlow',
		hidden: false,
		align: 'right',
		hideable: false,
		renderer: function(value){
			
			return Main.fun.getMFromByte(value);
		}
	}, {
		header: '上行流量(MB)',
		width: 110,
		sortable: true,
		dataIndex: 'upFlow',
		hidden: false,
		align: 'right',
		hideable: false,
		renderer: function(value){
			
			return Main.fun.getMFromByte(value);
		}
	}, {
		header: '下行流量(MB)',
		width: 110,
		sortable: true,
		dataIndex: 'downFlow',
		hidden: false,
		align: 'right',
		hideable: false,
		renderer: function(value){
			
			return Main.fun.getMFromByte(value);
		}
	}, {
        header: '更新日期',
        width: 90,
        sortable: true,
        dataIndex: 'updateDate',
        hidden: false,
        hideable: false
    }];
    
    this.detailGrid = new Ext.ux.Grid({
        dataMethod: 'dmCacheIntroduceEvalAction.getCacheIntroduceListing',
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
	
	var IntroduceListingSearchFormPanel = new Ext.introduceEval.IntroduceListing.SearchFormPanel({
		webSiteID: record.get('webSiteID')
	});
    var windows = new Ext.Window({
        title: "引入清单",
        width: 900,
        height: 436,
        border: false,
		layout: 'border',
        bodyBorder: false,
        autoScroll: true,
		modal: true,
        items: [{
	        region: 'north',
	        iconCls: 'panel-search-icon',
			title: '查询条件',
	        height: 90,
	        margins: '5 5 5 5',
	        collapsible: true,
	        layout: 'fit',
	        items: IntroduceListingSearchFormPanel
	    }, {
	        region: 'center',
	        iconCls: 'panel-grid-icon',
			title: '查询结果',
	        autoScroll: true,
	        margins: '0 5 5 5',
	        layout: 'fit',
	        // 设置默认查询条件
	        items: detailGrid
	    }]
    });
    
    windows.show();
	var data = IntroduceListingSearchFormPanel.getForm().getValues();
	data.province = record.get('province');
	data.webSiteID = record.get('webSiteID');
    searchDetailGrid(data);
}

function searchDetailGrid(data){
    this.detailGrid.setParams(data);
    this.detailGrid.doSearchList();
}