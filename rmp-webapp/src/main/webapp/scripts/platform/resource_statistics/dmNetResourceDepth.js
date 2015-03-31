/**
 * dmNetResourceDepth.js Power by YUI-EXT and JSON.
 * 
 * @author
 * @email
 */
var dmNetResourceDepth = {
	author : "xxx",
	version : "1.0"
};

// -> Action URL
var URL = {
	queryList : 'dmNetResourceDepthListProvider.do',
	action : 'dmNetResourceDepthAction.do'
};

// -> Primary key
var PK = [ "id" ];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0 : "主键",
	1 : "网站",
	2 : "省份",
	3 : "网站分类",
	4 : "域名数量",
	5 : "本省域名引入数量",
	6 : "本省域名引入率",
	7 : "移动域名引入数量",
	8 : "移动域名引入率",
	9 : "电信域名引入数量",
	10 : "电信域名引入率",
	11 : "联通域名引入数量",
	12 : "联通域名引入率",
	13 : "其他域名引入数量",
	14 : "其他域名引入率"
};

// -> Column name in English
var EN = {
	0 : "id",
	1 : "website",
	2 : "local",
	3 : "websiteType",
	4 : "domainCount",
	5 : "localDomainCount",
	6 : "localDomainRate",
	7 : "cmnetDomainCount",
	8 : "cmnetDomainRate",
	9 : "chinatelecomDomainCount",
	10 : "chinatelecomDomainRate",
	11 : "chinaunicomDomainCount",
	12 : "chinaunicomDomainRate",
	13 : "otherDomainCount",
	14 : "otherDomainRate",
	15 : "id_old"
};

// -> Cell width
var WD = {
	0 : "19",
	1 : "65,535",
	2 : "10",
	3 : "10",
	4 : "10",
	5 : "10",
	6 : "10",
	7 : "10",
	8 : "10",
	9 : "10",
	10 : "10",
	11 : "10",
	12 : "10",
	13 : "10",
	14 : "10"
};

// -> Data type e.g: float,int,string
var TY = {
	0 : "-5",
	1 : "-1",
	2 : "int",
	3 : "int",
	4 : "int",
	5 : "int",
	6 : "string",
	7 : "int",
	8 : "string",
	9 : "int",
	10 : "string",
	11 : "int",
	12 : "string",
	13 : "int",
	14 : "string"
};

var storeFields = [ {
	name : EN[0],
	type : TY[0]
}, {
	name : EN[1],
	type : TY[1]
}, {
	name : EN[2],
	type : TY[2]
}, {
	name : EN[3],
	type : TY[3]
}, {
	name : EN[4],
	type : TY[4]
}, {
	name : EN[5],
	type : TY[5]
}, {
	name : EN[6],
	type : TY[6]
}, {
	name : EN[7],
	type : TY[7]
}, {
	name : EN[8],
	type : TY[8]
}, {
	name : EN[9],
	type : TY[9]
}, {
	name : EN[10],
	type : TY[10]
}, {
	name : EN[11],
	type : TY[11]
}, {
	name : EN[12],
	type : TY[12]
}, {
	name : EN[13],
	type : TY[13]
}, {
	name : EN[14],
	type : TY[14]
}, {
	name : EN[15],
	type : TY[0]
},
{
	name:'chinatietongDomainCount'
},
{
	name:'chinatietongDomainRate'
}];

var formFields = [ {
	id : EN[0],
	name : EN[0],
	fieldLabel : CN[0],
	xtype : 'textfield'
}, {
	id : EN[1],
	name : EN[1],
	fieldLabel : CN[1],
	xtype : 'textfield'
}, {
	id : EN[2],
	name : EN[2],
	fieldLabel : CN[2],
	xtype : 'textfield'
}, {
	id : EN[3],
	name : EN[3],
	fieldLabel : CN[3],
	xtype : 'textfield'
}, {
	id : EN[4],
	name : EN[4],
	fieldLabel : CN[4],
	xtype : 'textfield'
}, {
	id : EN[5],
	name : EN[5],
	fieldLabel : CN[5],
	xtype : 'textfield'
}, {
	id : EN[6],
	name : EN[6],
	fieldLabel : CN[6],
	xtype : 'textfield'
}, {
	id : EN[7],
	name : EN[7],
	fieldLabel : CN[7],
	xtype : 'textfield'
}, {
	id : EN[8],
	name : EN[8],
	fieldLabel : CN[8],
	xtype : 'textfield'
}, {
	id : EN[9],
	name : EN[9],
	fieldLabel : CN[9],
	xtype : 'textfield'
}, {
	id : EN[10],
	name : EN[10],
	fieldLabel : CN[10],
	xtype : 'textfield'
}, {
	id : EN[11],
	name : EN[11],
	fieldLabel : CN[11],
	xtype : 'textfield'
}, {
	id : EN[12],
	name : EN[12],
	fieldLabel : CN[12],
	xtype : 'textfield'
}, {
	id : EN[13],
	name : EN[13],
	fieldLabel : CN[13],
	xtype : 'textfield'
}, {
	id : EN[14],
	name : EN[14],
	fieldLabel : CN[14],
	xtype : 'textfield'
} ];
var row = [
           { colspan: 1},
           { colspan: 1},
           { colspan: 1},
           { colspan: 1},
           { header: '<font color = #ee006e>本      省</font>', colspan: 2, align: 'center' },
           { header: '<font color = #ee006e>移动全网</font>', colspan: 2, align: 'center' },
           { header: '<font color = #ee006e>电信全网</font>', colspan: 2, align: 'center' },
           { header: '<font color = #ee006e>联通全网</font>', colspan: 2, align: 'center' },
           { header: '<font color = #ee006e>铁通全网</font>', colspan: 2, align: 'center' },
           { header: '<font color = #ee006e>其他全网</font>', colspan: 2, align: 'center' }
          ];
var group = new Ext.ux.grid.ColumnHeaderGroup({
    rows: [row]
});
var province = new Ext.ux.seraph.DictCombo( { 
	url :
	'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 
	displayField : 'codeLabel',
    valueField : 'codeValue' ,
    //value : '510000',
    value : orgCode,
    width : 120,
    id:'#local'
 });
var webSiteType = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	valueField : 'codeValue',
	width : 120//,
	//id:'#websiteType'
});
var userColumns = [ {
	header : '网站',
	width : 150,
	sortable : true,
	dataIndex : 'website'
},{
	header : '网站类型',
	width : 100,
	sortable : true,
	dataIndex : 'websiteType',
	renderer:Ext.ux.renderer.Combo(webSiteType)
}, {
	header : '域名总数量',
	width : 85,
	sortable : true,
	dataIndex : 'domainCount'
}, {
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'localDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'localDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
} , {
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'cmnetDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'cmnetDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'chinatelecomDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'chinatelecomDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'chinaunicomDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'chinaunicomDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
},{
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'chinatietongDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'chinatietongDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}, {
	header : '域名引入数量',
	width : 85,
	sortable : true,
	dataIndex : 'otherDomainCount'
}, {
	header : '域名引入率',
	width : 85,
	sortable : true,
	dataIndex : 'otherDomainRate',
	renderer:function(value){
		return (value*100).toFixed(2)+'%';
	} 
}];

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


/*var selectData = [["all_Flow", "总流量"], ["upload_Flow", "上行流量"], 
                  ["download_Flow", "下行流量"], ["visit_Count", "访问次数"]];
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
			mode : 'local',
			store : selectStore,
			triggerAction : 'all'
		});*/

var website = new  Ext.ux.SearchComboBox({
	id : '#website',
	dataMethod:'dmNetResourceDepthAction.getWebSiteList',
	width:300,
	valueField:'name',
	displayField:'name',
	fieldLabel : '网站名称',
	name : 'website'
	});
/*var topN = new Ext.form.NumberField({
	id : '#top',
    fieldLabel:'整数',   
    allowDecimals:false,               //不允许输入小数   
    nanText:'请输入有效整数',           //无效数字提示   
    allowNegative:false,                //不允许输入负数   
    width:90,
    value : '1000'
});*/
var queryFields = [ {
	text : '省份'
}, province, {
	text : '网站'
}, website, {
	text : '网站类型'
}, typeList/*, {
	text : 'TOP'
},selectComboBox, topN*/ ];

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
}/*, {
	name : 'selectComboBox',
	indicator : 'EXAMPLE_EQUALS'
}, {
	name : 'top',
	indicator : 'EXAMPLE_EQUALS'
}*/];

Ext.onReady(function() {

	Ext.QuickTips.init();
	
	/*Ext.grid.RowNumberer = Ext.extend(Ext.grid.RowNumberer, {  
		renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){  
			var start = 0;
			if(store.lastOptions.params != null){
				start = store.lastOptions.params.start;
			}
			return start + rowIndex + 1;  
		}  
	});*/

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
				Ext.getCmp('#local').setValue('510000');
				Ext.getCmp('#website').setValue('');
				Ext.getCmp('#websiteType').setValue('');
				//Ext.getCmp('#selectComboBox').setValue('');
				//Ext.getCmp('#top').setValue('1000');
				gridSelf.loadData();
			}
        } ]
	}
	});
	//解决extjs 谷歌浏览器grid 里面cm错位  
    /*Ext.grid.ColumnModel.override({  
        getTotalWidth: function(includeHidden) {  
            var off = 0;  
            if (Ext.isChrome){  
                off = 2;  
            };  
            if (!this.totalWidth) {  
                this.totalWidth = 0;  
                for (var i = 0, len = this.config.length; i < len; i++) {  
                    if (includeHidden || !this.isHidden(i)) {  
                        this.totalWidth += this.getColumnWidth(i)+off;  
                    };  
                };  
            };  
            return this.totalWidth;  
            }  
        });*/
    
  //修复办法，谷歌浏览器中,table的单元格实际宽度=指定宽度+padding，所以只要重写gridview里的一个方法，如下：
     /*Ext.override(Ext.grid.GridView,{
             getColumnStyle : function(colIndex, isHeader) {
                 var colModel  = this.cm,
                     colConfig = colModel.config,
                     style     = isHeader ? '' : colConfig[colIndex].css || '',
                     align     = colConfig[colIndex].align;
                 
                if(Ext.isChrome){
                    style += String.format("width: {0};", parseInt(this.getColumnWidth(colIndex))-2+'px');
                }else{
                    style += String.format("width: {0};", this.getColumnWidth(colIndex));
                }
                
                if (colModel.isHidden(colIndex)) {
                    style += 'display: none; ';
                }
                
                if (align) {
                    style += String.format("text-align: {0};", align);
                }
                
                return style;
            },
        });*/
	var userGrid = new Ext.ux.seraph.FormEditorGrid( {
		renderTo : 'user-grid',
		width : Ext.get("content").getWidth(),
		height : Ext.get("content").getHeight(),
		loadMask : {msg:Main.constant.freshInfo},
		storeFields : storeFields,
		formFields : formFields,
		queryFields : queryFields,
		queryParms : queryParms,
		columns : userColumns,
		columnLines : true,
		plugins: group,
		pk : PK,
		url : URL
	});


});