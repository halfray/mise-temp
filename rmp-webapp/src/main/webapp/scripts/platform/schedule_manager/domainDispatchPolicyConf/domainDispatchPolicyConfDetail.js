var costingSrcGrid = new Ext.ux.Grid( {
	dataMethod : 'domainDispatchPolicyConfAction.getCostingSrcList',
	border : false,
	frame : false,
	width:230,
	height:170,
	fetchSize : 20,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	//loadMask : true,
//	tbar : queryFields,
	colspan : 8,
	showPagingBar: false,
	sortBar: false,
	viewData : true,
	columns : [new Ext.grid.RowNumberer(), {
		header: '编号',
		width: 40,
		sortable: true,
		dataIndex: 'SS_0002',
		hidden: true,
		hideable: false
	}, {
		header: '名称',
		width: 180,
		sortable: true,
		dataIndex: 'SS_0003',
		hidden: false,
		hideable: false
	}]
});
//costingSrcGrid.on("dblclick", function() {
//	var record = costingSrcGrid.getSelectionModel().getSelected();
//	createRecord(record);
//})

var costingDesGrid = new Ext.ux.Grid( {
	dataMethod : 'domainDispatchPolicyConfAction.getCostingDesList',
	border : false,
	frame : false,
	width:230,
	height:170,
	fetchSize : 20,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	//loadMask : true,
//	tbar : queryFields,
	colspan : 8,
	showPagingBar: false,
	sortBar: false,
	viewData : true,
	columns : [new Ext.grid.RowNumberer(), {
		header: '编号',
		width: 40,
		sortable: true,
		dataIndex: 'SS_0002',
		hidden: true,
		hideable: false
	}, {
		header: '名称',
		width: 180,
		sortable: true,
		dataIndex: 'SS_0003',
		hidden: false,
		hideable: false
	}, {
		header: '序号',
		width: 40,
		sortable: true,
		dataIndex: 'sort',
		hidden: true,
		hideable: false
	}]
});

//costingDesGrid.on("dblclick", function() {
//	var record = costingDesGrid.getSelectionModel().getSelected();
//	removeRecord(record);
//})
/*var buttons=new Ext.Button({
	
})*/
var path = Main.contextPath;


function addElement() {
	var record = costingSrcGrid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请先选中一条数据');
		return;
	}
	createRecord(record);
}
function removeElement() {
	var record = costingDesGrid.getSelectionModel().getSelected();
	if(!record){
		Ext.Msg.alert('温馨提示','请先选中一条数据');
		return;
	}
	removeRecord(record);
}
var costingPanel = new Ext.Panel({
    id : 'costingPanel',
	plain: true,
    layout: 'border',
    height:300,
    style:'border: 1px solid #E1E1E1',
	border : false,
	items : [{
        region: 'west',
        iconCls: 'panel-search-icon',
        width: 260,
        margins: '0 0 5 10',
        layout: 'column',
        items:costingSrcGrid
    },
    {
        region:"center",
		xtype:"panel",
		iconCls: 'panel-search-icon',
		margins: '0 5 5 0',
		//width:50,
		html:'<div class="policyConfButton">'
			+'<a href="#" onClick="addElement()"><img src="'+path+'/scripts/ext-3.3.1/resources/images/default/form/add.png" width="64" height="23" /></a><br />'
			+'<a href="#" onClick="removeElement()"><img src="'+path+'/scripts/ext-3.3.1/resources/images/default/form/remove.png" width="64" height="23" /></a>'
			+'</div>'
	}, {
        region: 'east',
        iconCls: 'panel-grid-icon',
//        autoScroll: true,
        width: 240,
        margins: '0 10 0 0',
        layout: 'column',
        // 设置默认查询条件
        items: costingDesGrid
    }]
})


var qualityGrid = new Ext.ux.Grid( {
	dataMethod : 'domainDispatchPolicyConfAction.getQualitySrcList',
	border : false,
	frame : false,
	style:'margin-left: 0;margin-top: -2px;',
	autoScroll:true,
	viewConfig:{
		forceFit:true
	},
	fetchSize : 20,
	sm : new Ext.grid.RowSelectionModel( {
		singleSelect : true
	}),
	//loadMask : true,
//	tbar : queryFields,
	colspan : 8,
	viewData : true,
	tbar: [{
		text : '质量分> ',
	}, {
		xtype : 'numberfield',
		id : 'expressions',
		width : 120
	}],
	columns : [new Ext.grid.RowNumberer(), {
		header: '质量计分项编号',
		width: 130,
		sortable: true,
		dataIndex: 'SS_0201',
		hidden: true,
		hideable: false
	}, {
		header: '质量计分项名称',
		width: 130,
		sortable: true,
		dataIndex: 'SS_0202',
		hidden: false,
		hideable: false
		
	}, {
		header: '质量计分项及格值',
		width: 130,
		sortable: true,
		dataIndex: 'SS_X201',
		hidden: false,
		hideable: false
		
	}, {
		header: '质量计分项刻度',
		width: 130,
		sortable: true,
		dataIndex: 'SS_X202',
		hidden: false,
		hideable: false
		
	}, {
		header: '质量计分项权重',
		width: 130,
		sortable: true,
		dataIndex: 'SS_Y201',
		hidden: false,
		hideable: false
		
	}]
	
});

var Record = Ext.data.Record.create([{
    name:'SS_0002', // 编号
    type:'String'
},{
    name:'SS_0003',// 名称
    type:'String'
},{
    name:'sort', // 序号
    type:'String'
}]);

function createRecord(record) {
	var costingDesStore = costingDesGrid.getStore();
	var stroreCount = costingDesStore.getCount();
	// 判断输入名称与现有列表的名称是否冲突
	if (stroreCount != 0) {
		for ( var i = 0; i < stroreCount; i++) {
			var desRec = costingDesStore.getAt(i);
			if (record.get('SS_0003') == desRec.get('SS_0003')) {
				Ext.Msg.alert('提示', '列表中已添加此条记录');
				return;
			}
		}
	}
	var p = new Record(
	{
		SS_0002: record.get('SS_0002'),
		SS_0003: record.get('SS_0003'),
		sort: stroreCount+1
	});
	costingDesStore.insert(stroreCount, p);
}
function removeRecord(record) {
	var costingDesStore = costingDesGrid.getStore();
	var stroreCount = costingDesStore.getCount();
	costingDesStore.remove(record)
}

function getCostingDesPolicyConfCode() {
	var policyConfCode = "";
	var costingDesStore = costingDesGrid.getStore();
	var stroreCount = costingDesStore.getCount();
	if (stroreCount != 0) {
		for ( var i = 0; i < stroreCount; i++) {
			var desRec = costingDesStore.getAt(i);
			policyConfCode += desRec.get('SS_0002')+',';
		}
		policyConfCode = policyConfCode.substr(0,policyConfCode.lastIndexOf(','));
	}
	return policyConfCode;
}

function getQualityExpressions() {
	var tbar = qualityGrid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = {};
	for(var i = 0; i < queryFields.length;i++)
	{
		data[queryFields[i].getName()] = queryFields[i].getValue();
	}
	return data.expressions;
}


