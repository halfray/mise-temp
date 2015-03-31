/**
 * dmMtAnalysis.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var dmMtAnalysis = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'dmMtAnalysisListProvider.do',
	action : 'dmMtAnalysisAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "地域",          
	2: "网站",          
	3: "网站类型",          
	4: "域名数量",          
	5: "本省引入数量",          
	6: "本省引入率",          
	7: "本省资源服务全网率",          
	8: "IDC引入数量",          
	9: "IDC引入率",          
	10: "IDC资源服务全网率",          
	11: "对等直连引入数量",          
	12: "对等直连引入率",          
	13: "对等直连资源服务全网率",          
	14: "Cache引入数量",          
	15: "Cache引入率",          
	16: "Cache资源服务本省率",          
	17: "更新日期",
	18: "总流量",
	19: "上行流量",
	20: "下行流量",
	21: "请求次数"
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "local",          
	2: "website",          
	3: "websiteType",          
	4: "domainCount",          
	5: "localCount",          
	6: "localRate",          
	7: "localRsAllrate",          
	8: "idcCount",          
	9: "idcRate",          
	10: "idcRsAllrate",          
	11: "peersDcCount",          
	12: "peersDcRate",          
	13: "peersDcRsAllrate",          
	14: "cacheCount",          
	15: "cacheRate",          
	16: "cacheRsLocalrate",          
	17: "updateDate",
	18: "allFlow",
	19: "uploadFlow",
	20: "downloadFlow",
	21: "visitCount",
	22: "id_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "10",          
	2: "50",          
	3: "10",          
	4: "10",          
	5: "10",          
	6: "10",          
	7: "10",          
	8: "10",          
	9: "10",          
	10: "10",          
	11: "10",          
	12: "10",          
	13: "10",          
	14: "10",          
	15: "10",          
	16: "10",          
	17: "10",
	18: "10",
	19: "10",
	20: "10",
	21: "10"
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "int",          
	2: "string",          
	3: "int",          
	4: "int",          
	5: "int",          
	6: "string",          
	7: "string",          
	8: "int",          
	9: "string",          
	10: "string",          
	11: "int",          
	12: "string",          
	13: "string",          
	14: "int",          
	15: "string",          
	16: "string",          
	17: "string",
	18: "int",
	19: "int",
	20: "int",
	21: "int"
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[2]},          
	{name: EN[3], type: TY[3]},          
	{name: EN[4], type: TY[4]},          
	{name: EN[5], type: TY[5]},          
	{name: EN[6], type: TY[6]},          
	{name: EN[7], type: TY[7]},          
	{name: EN[8], type: TY[8]},          
	{name: EN[9], type: TY[9]},          
	{name: EN[10], type: TY[10]},          
	{name: EN[11], type: TY[11]},          
	{name: EN[12], type: TY[12]},          
	{name: EN[13], type: TY[13]},          
	{name: EN[14], type: TY[14]},          
	{name: EN[15], type: TY[15]},          
	{name: EN[16], type: TY[16]},          
	{name: EN[17], type: TY[17]},  
	{name: EN[18], type: TY[18]},
	{name: EN[19], type: TY[19]},
	{name: EN[20], type: TY[20]},
	{name: EN[21], type: TY[21]},
    {name: EN[18], type: TY[0]}   
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield'},  	
     {id: EN[3], name: EN[3], fieldLabel:CN[3], xtype: 'textfield'},  	
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'},  	
     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield'},  	
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield'},  	
     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield'},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield'},  	
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield'},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield'},  	
     {id: EN[13], name: EN[13], fieldLabel:CN[13], xtype: 'textfield'},  	
     {id: EN[14], name: EN[14], fieldLabel:CN[14], xtype: 'textfield'},  	
     {id: EN[15], name: EN[15], fieldLabel:CN[15], xtype: 'textfield'},  	
     {id: EN[16], name: EN[16], fieldLabel:CN[16], xtype: 'textfield'},  	
     {id: EN[17], name: EN[17], fieldLabel:CN[17], xtype: 'textfield'},
     {id: EN[18], name: EN[18], fieldLabel:CN[18], xtype: 'textfield'},
     {id: EN[19], name: EN[19], fieldLabel:CN[19], xtype: 'textfield'},
     {id: EN[20], name: EN[20], fieldLabel:CN[20], xtype: 'textfield'},
     {id: EN[21], name: EN[21], fieldLabel:CN[21], xtype: 'textfield'}
];	




var userColumns = [ {
	header : CN[0],
	width : WD[0],
	sortable : true,
	dataIndex : EN[0],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[1],
	width : WD[1],
	sortable : true,
	dataIndex : EN[1],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : 120,
	sortable : true,
	dataIndex : EN[2],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[3],
	width : WD[3],
	sortable : true,
	dataIndex : EN[3],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[4],
	width : WD[4],
	sortable : true,
	dataIndex : EN[4],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[5],
	width : WD[5],
	sortable : true,
	dataIndex : EN[5],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[6],
	width : 70,
	sortable : true,
	dataIndex : EN[6],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[7],
	width : 120,
	sortable : true,
	dataIndex : EN[7],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[8],
	width : WD[8],
	sortable : true,
	dataIndex : EN[8],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[9],
	width : 70,
	sortable : true,
	dataIndex : EN[9],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[10],
	width : 120,
	sortable : true,
	dataIndex : EN[10],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[11],
	width : WD[11],
	sortable : true,
	dataIndex : EN[11],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[12],
	width : WD[12],
	sortable : true,
	dataIndex : EN[12],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[13],
	width : 140,
	sortable : true,
	dataIndex : EN[13],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[14],
	width : WD[14],
	sortable : true,
	dataIndex : EN[14],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[15],
	width : 80,
	sortable : true,
	dataIndex : EN[15],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[16],
	width : 130,
	sortable : true,
	dataIndex : EN[16],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : CN[17],
	width : WD[17],
	sortable : true,
	dataIndex : EN[17],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[18],
	width : WD[18],
	sortable : true,
	dataIndex : EN[18],
	hidden : false,
	hideable : false
}, {
	header : CN[19],
	width : WD[19],
	sortable : true,
	dataIndex : EN[19],
	hidden : false,
	hideable : false
}, {
	header : CN[20],
	width : WD[20],
	sortable : true,
	dataIndex : EN[20],
	hidden : false,
	hideable : false
}, {
	header : CN[21],
	width : WD[21],
	sortable : true,
	dataIndex : EN[21],
	hidden : false,
	hideable : false
} ];

// TODO: default xtype, width
var province = new Ext.ux.seraph.DictCombo( { 
	url :
	'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    width : 120,
    value : '510000',
    id:'#local'
 });

/*var typeList = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120,
	id:'#websiteType'
});*/
var typeList = new Ext.ux.TreeField({
	dataMethod:'webSiteTypeTreeActionController.getTreeField',
	displayField:'text',
	valueField:'id',
	width : 120,
	onlyLeafSelect:true,
	rootVisible : false,	
	layerHeight:250,
	id:'#websiteType'
});

var selectData = [["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["visit_Count", "请求次数"]];
var selectStore = new Ext.data.ArrayStore({
			fields : ['value', 'name'],
			data : selectData
		});
var selectComboBox = new Ext.form.ComboBox({
	id : '#selectComboBox',
	hiddenName : 'selectValue',
	valueField : 'value',
	displayField : 'name',
	typeAhead : true,
	width : 120,
	value : 'all_Flow',
	mode : 'local',
	store : selectStore,
	triggerAction : 'all'
});

var website = new  Ext.ux.SearchComboBox({
	id : '#website',
	dataMethod:'dmMtAnalysisAction.getWebSiteList',
	width:120,
	valueField:'name',
	displayField:'name',
	fieldLabel : '网站名称',
	name : 'website'
	});
var topN = new Ext.form.NumberField({
		id : '#top',
		xtype : 'numberfield',
		width : 90,
		value : '1000'
});
var queryFields = [ {
	text : '省份'
}, province, {
	text : '网站'
}, website, {
	text : '网站分类'
}, typeList, {
	text : '网站TOP'
},selectComboBox,topN  ];

// 
var queryParms = [{
	name : 'local',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'website',
	indicator : 'EXAMPLE_LIKE'
}, {
	name : 'websiteType',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'selectComboBox',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'top',
	indicator : 'EXAMPLE_EQUALS'
}];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    Ext.override(Ext.ux.seraph.FormEditorGrid, {
		buildSelectionModel : function() {
    	return new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    },
    
    buildColumnModels : function() {
    	return [new Ext.grid.RowNumberer()];
    },
		initComponent : function() {

			// build selection model
			this.sm = this.buildSelectionModel();

			// build columns model
			var originCM = this.buildColumnModels();
			var customerCM = this.columns;
			this.columns = originCM.concat(customerCM);

			// build form
			this.formPanel = this.buildForm();

			// build editor
			this.editor = this.buildEditor();

			// build Tbar
			this.tbar = this.createTbar(queryFields);

			// build store
			this.store = this.buildStore();

			// build pagingToolbar
			this.pagingToolbar = this.buildPagingToolbar();
			this.bbar = this.pagingToolbar;

			// Set auto-column width, viewConfig:
			// {forceFit:true}
			// this.getView().forceFit = true;

			// this.on('rowdblclick',
			// userGrid.showVideoUrlDetail, this);
			this.on('load', this.loadData(), this);

			// super
			Ext.ux.seraph.FormEditorGrid.superclass.initComponent.apply(this,
					arguments);
		},
    
	 createTbar : function(queryFields) {
		var gridSelf = this;
		return [ queryFields, {
			text : '查询',
			iconCls : 'dataTable-preview-icon',
			handler : function() {
				gridSelf.loadData();
			}
		}, '-', {
        	text: '刷新', 
        	iconCls: 'role-user-reset', 
        	handler : function() {
				Ext.getCmp('#local').setValue();
				Ext.getCmp('#website').setValue();
				Ext.getCmp('#websiteType').setValue('');
				Ext.getCmp('#selectComboBox').setValue('');
				Ext.getCmp('#top').setValue('1000');
				gridSelf.loadData();
			}
        } ]
	}
	});
    
    var userGrid = new Ext.ux.seraph.FormEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	columnLines : true,
    	pk: PK,
    	url: URL
    });
    
});