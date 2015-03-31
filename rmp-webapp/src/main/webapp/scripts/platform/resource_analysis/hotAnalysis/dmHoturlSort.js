/**
 * dmHoturlSort.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var dmHoturlSort = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'dmHoturlSortListProvider.do',
	action : 'dmHoturlSortAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",
	1: "URL",
	2: "网站",
	3: "协议类型",
	4: "解析次数",          
	5: "网内次数",          
	6: "网内次数占比",
	7: "请求次数",
	8: "网内次数",
	9: "网内次数占比",
	10: "总流量(MB)",
	11: "网内流量(MB)",
	12: "网内流量占比",
	13: "上行总流量(MB)",
	14: "网内流量(MB)",
	15: "网内流量占比 ",
	16: "下行总流量(MB)",
	17: "网内流量(MB)",
	18: "网内流量占比",
	19: "更新日期",
	20: "资源类型",
	21: "文件大小(MB)"
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "url",          
	2: "website",          
	3: "resourceType",
	4: "DNSResolNum",          
	5: "DNSInResolNum",          
	6: "DNSInResolProportion",           
	7: "reqCount",          
	8: "reqInCount",          
	9: "reqInProportion",          
	10: "allFlow",          
	11: "allInFlow",          
	12: "allInProportion",          
	13: "uploadFlow",          
	14: "uploadInFlow",          
	15: "uploadInProportion",          
	16: "downloadFlow",          
	17: "downloadInFlow",          
	18: "downloadInProportion",          
	19: "updatedate",          
	20: "urlType",
	21: "fileSize",
	22: "id_old" 
};

// -> Cell width
var WD = {
	0: "19",          
	1: "2,000",          
	2: "2,000",          
	3: "20",          
	4: "19",          
	5: "19",          
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
	16: "20",          
	17: "10",
	18: "10",
	19: "10" ,
	20: "10",
	21: "10"       
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "-5",          
	5: "-5",          
	6: "string",          
	7: "int",          
	8: "int",          
	9: "string",          
	10: "int",          
	11: "int",          
	12: "string",          
	13: "int",          
	14: "int",          
	15: "string",
	16: "int",          
	17: "int",
	18: "string",          
	19: "string",          
	20: "string",          
	21: "string"        
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
    {name: EN[21], type: TY[21]}         
	   
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

/*var row = [
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
		   { header: '', colspan: 1, align: 'center' },
		   { header: '', colspan: 1, align: 'center' },
           { header: '<font color = #ee006e>请求次数</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>总流量</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>上行流量</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>下行流量</font>', colspan: 3, align: 'center' },
           { header: '', colspan: 1, align: 'center' }
          ];
var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});*/

//资源类型
var resourceType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_C_W_0101_LIST',
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120,
	name:'urlType',
	id:'#urlType'
	
});

//协议类型
//TODO: default xtype, width
var urlType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=tb_url_w_0001_LIST',
	
	showAllSelect:true,
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120,
	name:'resourceType',
	id:'#resourceType'
});

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
	width : 200,
	sortable : true,
	dataIndex : EN[1],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : 180,
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
	hidden : false,
	hideable : false,
	width : 180,
	renderer: Ext.ux.renderer.Combo(urlType)
}, {
	header : CN[20],
	width : WD[20],
	sortable : true,
	dataIndex : EN[20],
	hidden : false,
	hideable : false,
	width : 180,
	renderer: Ext.ux.renderer.Combo(resourceType)
}, {
	header : CN[21],
	width : WD[21],
	sortable : true,
	dataIndex : EN[21],
	hidden : false,
	hideable : false,
	width : 180,
	renderer: function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
},/*{
	header : CN[7],
	width : WD[7],
	sortable : true,
	dataIndex : EN[7],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[8],
	width : WD[8],
	sortable : true,
	dataIndex : EN[8],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[9],
	width : WD[9],
	sortable : true,
	dataIndex : EN[9],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[10],
	width : WD[10],
	sortable : true,
	dataIndex : EN[10],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[11],
	width : WD[11],
	sortable : true,
	dataIndex : EN[11],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
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
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[13],
	width : WD[13],
	sortable : true,
	dataIndex : EN[13],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[14],
	width : WD[14],
	sortable : true,
	dataIndex : EN[14],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[15],
	width : WD[15],
	sortable : true,
	dataIndex : EN[15],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[16],
	width : WD[16],
	sortable : true,
	dataIndex : EN[16],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[17],
	width : WD[17],
	sortable : true,
	dataIndex : EN[17],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return Main.fun.getMFromByte(value);;
	},
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[18],
	width : WD[18],
	sortable : true,
	dataIndex : EN[18],
	hidden : false,
	hideable : false,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}  , */{
	header : CN[19],
	width : WD[19],
	sortable : true,
	dataIndex : EN[19],
	hidden : false,
	hideable : false,
	width : 150,
	editor : {
		xtype : 'textfield'
	}
} ];


var selectData = [/*["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["req_Count", "请求次数"], ["DNSResolNum", "DNS解析次数"]*/["fileSize","文件大小"]];
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
			value : 'fileSize',
			mode : 'local',
			store : selectStore,
			triggerAction : 'all'
		});

var topN = new Ext.form.NumberField({
	id : '#top',
	name:'top',
    fieldLabel:'整数',   
    allowDecimals:false,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false,                //不允许输入负数   
    width:90,
    value : '1000'
});

var fileSize = new Ext.form.NumberField({
	id : '#fileSize',
	name: 'fileSize',
    fieldLabel:'文件大小',
	allowDecimals:true,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false, 
	value: '0',              //不允许输入负数   
    width: 90
});

var queryFields = [ 
{text : '协议类型'}, urlType, 
{text: '资源类型'}, resourceType,
{text : 'TOP'}, selectComboBox, topN ,
{text: '文件大小(MB)>'}, fileSize
];

// 
var queryParms = [ {
	name : 'urlType',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'resourceType',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'fileSize',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'selectComboBox',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'top',
	indicator : 'EXAMPLE_EQUALS'
} ];

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
		Ext.ux.seraph.FormEditorGrid.superclass.initComponent.apply(this, arguments);
	},
    getParams:function()
    {
    	
    	// Query field prefix is '#'
    	var condition = "";
    	var temps = new Array();
    	try {
        	for(var i = 0; i < this.queryParms.length; i++) {
        		var parmName = this.queryParms[i].name;
        		var parmType = this.queryParms[i].type;
        		var parmIndicator = this.queryParms[i].indicator;
        		
        		var parmValue='';
        		if(parmType=='date'){
        	 		 parmValue = (Ext.getCmp('#' + parmName).getValue()).format("Ymd");
        		}else{
        	 		 parmValue = Ext.getCmp('#' + parmName).getValue();
        		}
       
        		if(parmValue) {        			
        			if(parmIndicator=='EXAMPLE_LIKE'){
            			temps.push(parmName + ':' + parmIndicator + ':%' + parmValue + '%;');        				
        			}else{
            			temps.push(parmName + ':' + parmIndicator + ':' + parmValue + ';');        				
        			}
        		}
        	}
    	} catch(e) {}
    	condition = temps.join('');
    	
    	return condition;
    },
    exportExcel:function()
    {
    	var url = this.url.queryList+"?export=true&condition="+this.getParams();
    	window.open(url);
    },
	 createTbar : function(queryFields) {
		var gridSelf = this;
		return [ queryFields, {
			text : '<span style="margin-left:20px;">查询</span>',
			cls:'search-button',
			minWidth:82,
			height:27,
			handler : function() {
				gridSelf.loadData();
			}
		}, '-', {
			text : '<span style="margin-left:20px;">刷新</span>',
			cls: 'refresh-button', 
			minWidth:82,
			height:27,
        	handler : function() {
				Ext.getCmp('#urlType').setValue('');
				Ext.getCmp('#resourceType').setValue('');
				Ext.getCmp('#fileSize').setValue('');
				Ext.getCmp('#selectComboBox').setValue('fileSize');
				Ext.getCmp('#top').setValue('1000');
				gridSelf.loadData();
			}
        } ,'-', {
        	text: '导出', 
        	iconCls: 'toolbar-down-icon', 
        	handler : function() {
				gridSelf.exportExcel();
			}
        }]
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
    	//plugins: group,
    	url: URL
    });
    
});