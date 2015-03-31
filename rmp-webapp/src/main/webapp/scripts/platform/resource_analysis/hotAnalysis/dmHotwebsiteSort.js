/**
 * dmHotwebsiteSort.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var dmHotwebsiteSort = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'dmHotwebsiteSortListProvider.do',
	action : 'dmHotwebsiteSortAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "网站",          
	2: "网站类型", 
	3: "DNS解析次数",         
	4: "网内次数",          
	5: "网内次数占比", 
	6: "总次数",          
	7: "网内次数",          
	8: "网内次数占比",          
	9: "总流量(MB)",          
	10: "网内总流量(MB)",          
	11: "网内流量占比",          
	12: "上行总流量(MB)",          
	13: "网内流量(MB)",          
	14: "网内流量占比",          
	15: "下行总流量(MB)",          
	16: "网内流量(MB)",          
	17: "网内流量占比",
	18: "更新日期"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "website",          
	2: "websiteType",
	3: "DNSResolNum",          
	4: "DNSInResolNum",          
	5: "DNSInResolProportion",          
	6: "reqCount",          
	7: "reqInCount",          
	8: "reqInProportion",          
	9: "allFlow",          
	10: "allInFlow",          
	11: "allInProportion",          
	12: "uploadFlow",          
	13: "uploadInFlow",          
	14: "uploadInProportion",          
	15: "downloadFlow",          
	16: "downloadInFlow",          
	17: "downloadInProportion",
	18: "updateDate",
	19: "id_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "2,000",          
	2: "10",          
	3: "19",          
	4: "19",          
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
	18: "10"
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "int",          
	3: "int",          
	4: "int",          
	5: "string",
	6: "int",          
	7: "int",          
	8: "string",          
	9: "int",          
	10: "int",          
	11: "string",          
	12: "int",          
	13: "int",          
	14: "string",
	15: "int",          
	16: "int",          
	17: "string", 
	18: "string" 
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
     {id: EN[17], name: EN[17], fieldLabel:CN[17], xtype: 'textfield'} 	
];	

var row = [
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
           { header: '', colspan: 1, align: 'center' },
		   { header: '<font color = #ee006e>DNS解析次数</font>', colspan: 3, align: 'center' },
           /*{ header: '<font color = #ee006e>请求次数</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>总流量</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>上行流量</font>', colspan: 3, align: 'center' },
           { header: '<font color = #ee006e>下行流量</font>', colspan: 3, align: 'center' },*/
           { header: '', colspan: 1, align: 'center' }
          ];
var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});
var webSiteType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120//,
	//id:'#websiteType'
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
	width : 180,
	sortable : true,
	dataIndex : EN[1],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : WD[2],
	sortable : true,
	dataIndex : EN[2],
	hidden : false,
	hideable : false,
	width : 180,
	renderer:Ext.ux.renderer.Combo(webSiteType),
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
	width : 180,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[5],
	width : WD[5],
	sortable : true,
	dataIndex : EN[5],
	hidden : false,
	hideable : false,
	width : 180,
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}, /*{
	header : CN[6],
	width : WD[6],
	sortable : true,
	dataIndex : EN[6],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
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
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	},
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
		return Main.fun.getMFromByte(value);;
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
		return (value*100).toFixed(2)+'%';
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
		return Main.fun.getMFromByte(value);;
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
		return (value*100).toFixed(2)+'%';
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
		return Main.fun.getMFromByte(value);;
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
		return (value*100).toFixed(2)+'%';
	},
	editor : {
		xtype : 'textfield'
	}
}  ,*/ {
	header : CN[18],
	width : WD[18],
	sortable : true,
	dataIndex : EN[18],
	hidden : false,
	hideable : false,
	width : 180,
	editor : {
		xtype : 'textfield'
	}
} ];

// TODO: default xtype, width
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

typeList.on('expand',function(){
	var root = typeList.root;
	findchildnode(root);
	root.collapseChildNodes(true);
})

var path = Main.contextPath;
	//获取所有的子节点 
function findchildnode(node){
	 var childnodes = node.childNodes;
	 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
		 var nd = this;
		 nd.getUI().addClass("x-treenodeColor");
		 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
			 nd.expand(false,false,function(){
				 findchildnode(nd); //如果存在子节点 递归
			 });
		 }else{
			 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-root-node');
			 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-node-leaf');
			 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-node-icon');
			 nd.getUI().getIconEl().src = path+'/scripts/ext-3.3.1/resources/images/default/tree/leaf.png';
		 }
	 });
}

var selectData = [/*["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["req_Count", "请求次数"],*/ ["DNSResolNum", "DNS解析次数"]];
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
			value : 'DNSResolNum',
			mode : 'local',
			store : selectStore,
			triggerAction : 'all'
		});

var topN = new Ext.form.NumberField({
	id : '#top',
    fieldLabel:'整数',   
    allowDecimals:false,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false,                //不允许输入负数   
    width:90,
    value : '1000'
});
var queryFields = [
{
	text : '网站类型'
}, typeList, 
{
	text : 'TOP'
},selectComboBox, topN
];

// 
var queryParms = [{
	name : 'websiteType',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'selectComboBox',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'top',
	indicator : 'EXAMPLE_EQUALS'
}
];

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
				Ext.getCmp('#websiteType').setValue('');
				Ext.getCmp('#selectComboBox').setValue('DNSResolNum');
				Ext.getCmp('#top').setValue('1000');
				gridSelf.loadData();
			}
        } ,'-', {
        	text: '导出', 
        	iconCls: 'toolbar-down-icon', 
        	handler : function() {
				gridSelf.exportExcel();
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
    	autoScroll:true,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	columnLines : true,
    	pk: PK,
    	plugins: group,
    	url: URL
    });

});