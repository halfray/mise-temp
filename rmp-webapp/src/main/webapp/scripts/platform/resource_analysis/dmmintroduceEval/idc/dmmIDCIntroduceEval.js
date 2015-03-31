/**
 * IDC引入评估-主列表 
 */
var province = new Ext.ux.seraph.DictCombo( {
	url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
	displayField: 'codeLabel',
	valueField: 'codeValue'
});
var webSiteType = new Ext.ux.seraph.DictCombo( {
	url: 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField: 'codeLabel',
	valueField: 'codeValue'
});
		
var gridColumns = [ new Ext.grid.RowNumberer(), {
		header: '省份',
		width: 160,
		sortable: true,
		dataIndex: 'province',
		hidden: false,
		hideable: false,
		renderer: Ext.ux.renderer.Combo(province)
	}, {
		header: '网站ID',
		dataIndex: 'webSiteID',
		hidden: true,
		hideable: false
	}, {
		header: '网站',
		width: 120,
		sortable: true,
		dataIndex: 'webSite',
		hidden: false,
		hideable: false
	}, {
		header: '网站类型',
		width: 120,
		sortable: true,
		dataIndex: 'webSiteType',
		hidden: false,
		hideable: false,
		renderer: Ext.ux.renderer.Combo(webSiteType)
	}, {
		header: '域名',
		width: 120,
		sortable: true,
		dataIndex: 'domain',
		hidden: true,
		hideable: false
	}, {
		header: '域名数量',
		width: 120,
		sortable: true,
		dataIndex: 'domainNum',
		align: 'right',
		hidden: false,
		hideable: false
	}, {
		header: '引入域名数量',
		width: 120,
		sortable: true,
		dataIndex: 'introduceDomainNum',
		align: 'right',
		hidden: false,
		hideable: false
	}, {
		header: 'IDC引入深度',
		width: 120,
		sortable: true,
		dataIndex: 'introduceDepth',
		hidden: false,
		align: 'right',
		hideable: false,
		renderer: function(value){
			
			return Main.fun.getPerByReal(value);
		}
	}, {
		header: '热点域名数量',
		width: 120,
		sortable: true,
		dataIndex: 'hotDomainNum',
		hidden: false,
		align: 'right',
		hideable: false
	}, {
		header: '热点域名引入数量',
		width: 120,
		sortable: true,
		dataIndex: 'introduceHotDomainNum',
		hidden: false,
		align: 'right',
		hideable: false
	}, {
		header: 'IDC引入精度',
		width: 120,
		sortable: true,
		dataIndex: 'introducePrecision',
		hidden: false,
		align: 'right',
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

this.grid = new Ext.ux.Grid({
	dataMethod: 'dmmIDCIntroduceEvalAction.getIDCIntroduceEvalList',
	columns:gridColumns,
	height: 265,
	frame : false,
	border: false,
	//bodyBorder: false,
	fetchSize:10,
	sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	colspan : 8,
	columnLines : true,
	viewData: false,
	tbar: {
		items:[{
			text: '已引入清单',
			iconCls: 'x-btn-text dataTableList-add-icon',
			handler: function(){
				var record = grid.getSelected();
				if(Ext.isDefined(record)){
					getIntroduceListing(record);
				}else{
					Main.fun.commonAlert();
				}
			}
		}, {
			text: '建议引入清单',
			iconCls: 'x-btn-text dataTableList-add-icon',
			handler: function(){
				var record = grid.getSelected();
				if(Ext.isDefined(record)){
					getNoIntroduceListing(record);
				}else{
					Main.fun.commonAlert();
				}
			}
		}]
	}
});

function searchGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}

Ext.onReady(function() {
	Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
	var searchFormPanel = new Ext.introduceEval.SearchFormPanel({
        id: 'SearchFormPanel',
		gridId: 'SearchGridPanel'
    });
	// 页面布局
	var viewport = new Ext.Viewport({
		id:'myViewport',
	    layout: 'border',
	    items: [{
	        region: 'north',
	        iconCls: 'panel-search-icon',
			title: '查询条件',
	        height: 150,
	        margins: '5 5 5 5',
	        collapsible: true,
	        layout: 'fit',
	        items: searchFormPanel
	    }, {
	        region: 'center',
	        iconCls: 'panel-grid-icon',
			title: '查询结果',
	        autoScroll: true,
	        margins: '0 5 5 5',
	        layout: 'fit',
	        // 设置默认查询条件
	        items: grid
	    }]
	});
	
	var data = searchFormPanel.getForm().getValues();
	searchGrid(data);
	viewport.doLayout();
});
