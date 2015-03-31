/**
 * PDC引入评估-主列表 
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
		width: 100,
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
		width: 100,
		sortable: true,
		dataIndex: 'webSite',
		hidden: false,
		hideable: false
	}, {
		header: '网站类型',
		width: 100,
		sortable: true,
		dataIndex: 'webSiteType',
		hidden: false,
		hideable: false,
		renderer: Ext.ux.renderer.Combo(webSiteType)
	}, {
		header: '域名',
		width: 100,
		sortable: true,
		dataIndex: 'domain',
		hidden: true,
		hideable: false
	}, {
		header: '域名数量',
		width: 90,
		sortable: true,
		dataIndex: 'domainNum',
		align: 'right',
		hidden: false,
		hideable: false
	}, {
		header: '引入域名数量',
		width: 100,
		sortable: true,
		dataIndex: 'introduceDomainNum',
		align: 'right',
		hidden: false,
		hideable: false
	}, {
		header: '对等直连引入深度',
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
		width: 100,
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
		header: '对等直连引入精度',
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
		width: 100,
		sortable: true,
		dataIndex: 'DNSResolNum',
		hidden: false,
		align: 'right',
		hideable: false
	}/*, {
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
	}*/, {
	    header: '更新日期',
	    width: 80,
	    sortable: true,
	    dataIndex: 'updateDate',
	    hidden: false,
	    hideable: false
	}];

var search = new Ext.Button({
	text : '<span style="margin-left:20px;">查询</span>',
	cls:'search-button',
	minWidth:82,
	height:27,
	handler : upData
});
var reset = new Ext.Button({
	text : '<span style="margin-left:20px;">刷新</span>',
	cls: 'refresh-button', 
	minWidth:82,
	height:27,
	handler : function(){
		var tbar = grid.getTopToolbar();
		var queryFields = tbar.findByType('field');
		for(var i = 0; i < queryFields.length;i++)
		{
			queryFields[i].reset();
		}
		queryForm.getForm().reset();
		upData();
	}
});

this.grid = new Ext.ux.Grid({
	dataMethod: 'dmPDCIntroduceEvalAction.getPDCIntroduceEvalList',
	columns:gridColumns,
	//style:'margin-top:-5px;margin-left:-5px',
	autoScroll:true,
	frame : false,
	border: false,
	//bodyBorder: false,
	fetchSize:10,
	sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	colspan : 8,
	columnLines : true,
	tbar : new Ext.Toolbar({}),
	/*listeners : {
		dblclick : function() {
			var record = grid.getSelected();
			getIntroduceListing(record);
		}
	},*/
	viewData: false
});

var queryForm = getQueryform();
function getQueryform(){

	//字段信息
	var hotBasis = new Ext.ux.seraph.DictCombo({
		id : 'hotBasisid',
		fieldLabel : '排序依据',
		hiddenName: 'hotBasis',
		url :'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 
		displayField : 'parmName',
	    valueField : 'parmCode' ,
	    value : 'DNSResolNum',
	    width : 150
	});
	
	var topN = new Ext.form.TextField({
		fieldLabel : 'TOP',
		name : 'topN',
		width : 134
	});
	
	var introduceDepth = new Ext.form.NumberField({
		fieldLabel : '直连引入深度<',
		unitText : '%',
		width : 134,
        maxLength: 128,
		name : 'introduceDepth'
	});
	
	var introducePrecision = new Ext.form.NumberField({
        fieldLabel: '直连引入精度<',
        unitText: '%',
        name: 'introducePrecision',
        maxLength: 128,
        width : 134
    });
	
	var query_form1 = new Ext.form.FormPanel( {
		id:"queryForm",
		title : "查询条件",
		labelWidth : 80,
		viewConfig : {
			forceFit : true
		},
		height:160,
		width:300,
		titleCollapse : true,
		margins : '0 3 3 3',
		cmargins : '3 3 3 3',
		labelAlign : "right",
		frame : true,
		layout : 'form',
		buttonAlign : 'center',
		items : [ {
			layout : 'column',
			items : [
			         {
			        	 layout : 'form',			        
			        	 items : [hotBasis,topN,introduceDepth,introducePrecision]
			         }
			       ]
		}],
		
		buttons : [ {
			text : '查&nbsp;&nbsp;询',
//			cls:'search-button',
			minWidth:82,
			height:27, 
			handler : upData
		}, {
			text : '刷&nbsp;&nbsp;新',
//			cls: 'refresh-button', 
			minWidth:82,
			height:27,
			handler : function(){
				var tbar = grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				for(var i = 0; i < queryFields.length;i++)
				{
					queryFields[i].reset();
				}
				queryForm.getForm().reset();
				upData();
			}
		} ]
	});
	return query_form1;
	
}
grid.getTopToolbar().add({
	text: '已引入清单',
	iconCls: 'x-btn-text import-icon',
	handler: function(){
		var record = grid.getSelected();
		if(Ext.isDefined(record)){
			getIntroduceListing(record);
		}else{
			Main.fun.commonAlert();
		}
	}
});

grid.getTopToolbar().add("省份：");
grid.getTopToolbar().add({
    xtype: 'dictcombo', 
	url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true',
	displayField: 'codeLabel',
	valueField: 'codeValue',
    fieldLabel: '省份',
    //value : '510000',
    value : orgCode,
    hiddenName: 'province',
    maxLength: 128,
    anchor: '95%'
});
grid.getTopToolbar().addSeparator();
grid.getTopToolbar().add("网站：");
grid.getTopToolbar().add({
    xtype: 'textfield',
    fieldLabel: '网站',
    name: 'webSite',
    maxLength: 128,
    anchor: '95%'
});
grid.getTopToolbar().addSeparator();
grid.getTopToolbar().add("网站类型：");
grid.getTopToolbar().add({
    xtype: 'treefield',
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	listWidth: 120,
	width:120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250,
    name: 'webSiteType',
    maxLength: 128,
    anchor: '95%'
});

grid.getTopToolbar().addSeparator();
var menu = new Ext.menu.Menu({
  items: [queryForm]
});
menu.on('show',function(){
	if(grid.id != 'menu_grid'){
		grid.id = 'menu_grid';
	}
});

grid.getTopToolbar().add({
	text :' ',
	width:82,
	height:27,
	cls:'btn_more_background',
  menu: menu
});
grid.getTopToolbar().add(search);
grid.getTopToolbar().addSeparator();
grid.getTopToolbar().add(reset);

function upData() {
	var data = getData();
	searchGrid(data);
	
	
}

function getData() {
	var tbar = grid.getTopToolbar();
	var queryFields = tbar.findByType('field');
	var data = {};
	for(var i = 0; i < queryFields.length;i++)
	{
		data[queryFields[i].getName()] = queryFields[i].getValue();
	}
	data.hotBasis = Ext.getCmp('hotBasisid').getValue();
	if(grid.id == 'menu_grid'){
		var formObject = queryForm.getForm().getValues();
		data.hotBasis = formObject.hotBasis;
		data.topN = formObject.topN;
		data.introduceDepth = formObject.introduceDepth;
		data.introducePrecision = formObject.introducePrecision;
	}
	return data;
}

function searchGrid(data)
{
	grid.setParams(data);
	grid.doSearchList();
}


Ext.onReady(function() {	
	Ext.QuickTips.init();
	Ext.form.Field.prototype.msgTarget = 'side';
	  
    var panel = new Ext.Panel({
		renderTo : 'user-grid',
		autoScroll : true,
		border: false,
		bodyBorder: false,
		items : [grid]
	});
    
    grid.setHeight(Ext.get("content").getHeight());
    grid.setWidth(Ext.get("content").getWidth());
    
    upData();
});
