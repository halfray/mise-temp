/**
 * tbDM0002.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDM0002 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDM0002ListProvider.do',
	action : 'tbDM0002Action.do'
};

// -> Primary key
var PK = ["pp0101","dd0001","op0001","op0201","op0101","pp0902"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
		0: "统计周期",          
		1: "域名编号",          
		2: "热点域名",          
		3: "父域名编号",          
		4: "域名级别",          
		5: "网站编号",          
		6: "网站名称",          
		7: "所属运营商",          
		8: "所属区域",          
		9: "所属系统",          
		10: "内容资源归属",          
		11: "网内网外",          
		12: "资源流量 (M)",          
		13: "资源上行流量",          
		14: "资源下行流量",          
		15: "资源请求次数",          
		16: "热点依据"   
};

// -> Column name in English
var EN = {
	0: "pp0101",          
	1: "dd0001",          
	2: "dd0002",          
	3: "dd0003",          
	4: "dd0004",          
	5: "ws0001",          
	6: "ws0002",          
	7: "op0001",          
	8: "op0201",          
	9: "op0101",          
	10: "op0301",          
	11: "op0004",          
	12: "rrX103",          
	13: "rrX104",          
	14: "rrX105",          
	15: "rrX106",          
	16: "pp0902",          
	17: "pp0101_old",     
	18: "dd0001_old",     
	19: "op0001_old",     
	20: "op0201_old",     
	21: "op0101_old",     
	22: "pp0902_old"   
};

// -> Cell width
var WD = {
	0: "8",          
	1: "255",          
	2: 240,          
	3: "255",          
	4: "5",          
	5: "10",          
	6: "255",          
	7: "4",          
	8: "10",          
	9: "4",          
	10: "4",          
	11: "1",          
	12: "32",          
	13: "32",          
	14: "32",          
	15: "10",          
	16: "5"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "5",          
	5: "int",          
	6: "string",          
	7: "1",          
	8: "1",          
	9: "1",          
	10: "1",          
	11: "1",          
	12: "int",          
	13: "int",          
	14: "int",          
	15: "int",          
	16: "5"        
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
    {name: EN[17], type: TY[0]},     
    {name: EN[18], type: TY[1]},     
    {name: EN[19], type: TY[7]},     
    {name: EN[20], type: TY[8]},     
    {name: EN[21], type: TY[9]},     
    {name: EN[22], type: TY[16]}   
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
     {id: EN[16], name: EN[16], fieldLabel:CN[16], xtype: 'textfield'} 	
];	

//function showResourceInfo(value, metaData, record){
//	var domainName=record.get('dd0002');
//	return "<a onclick=\"javascript:UrlDetailWinHelp.ShowDetail('"+domainName+"')\">"+value+"</a>";
//}

var orgCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var operatorCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0001_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var osCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
var contentCodeField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=TB_OP_W_0003_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  
function typeValueChange(value){
	if(value=="0"){
		return "网外";
	}else if(value=="1"){
		return "网内";
	}else{
		return "网内网外";
	}
}
var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(operatorCodeField),editor: operatorCodeField},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(orgCodeField),editor: orgCodeField},  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(osCodeField),editor: osCodeField},  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(contentCodeField),editor: contentCodeField},  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[14], width: WD[14], sortable: true, dataIndex: EN[14], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[15], width: WD[15], sortable: true, dataIndex: EN[15], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[16], width: WD[16], sortable: true, dataIndex: EN[16], hidden: true, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false,renderer:typeValueChange }  
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[2]},           
	   {
		xtype:'textfield',
		id: '#dd0002',
		width: 90
	},"-",{text: "TOP N"},           
	   {
		xtype:'textfield',
		value:100,
		id: '#topNum',
		width: 90
	},{text: "提示：N<=100"},"-",{text: "热点依据"},           
	   {
		xtype: 'selectcombo',
		id: '#hotFoundation',
	    name: "hotFoundation",
	    hiddenName: "hotFoundation",
		fieldLabel: "hotFoundation",
		value:'请求次数',
		width: 90,
	    url: 'parmInfoProvider.do?parmType=HOT_FOUNDATION',
	    displayField: 'parmName',
	    valueField: 'parmCode'
	   	}
];

// 
var queryParms = [
      {name: EN[2], indicator: 'EXAMPLE_LIKE'},
      {name: "topNum", indicator: 'EXAMPLE'},
      {name: "hotFoundation", indicator: 'EXAMPLE'}
  ];

var UrlDetailWinHelp={
		ShowDetail : function (domainName){
			var cParams={};
			cParams.dd0002=domainName;
			var chartQueryFields=[{text: "分析维度"},{
				xtype: 'selectcombo',
				id: '#analysisDimension',
			   	name: "analysisDimension",
			   	hiddenName: "analysisDimension",
				fieldLabel: "analysisDimension",
				value:'运营商',
				width: 120,
			    url: 'parmInfoProvider.do?parmType=ANALYSIS_DIMENSION',
			    displayField: 'parmName',
			    valueField: 'parmCode'
			},{
				text: '查询', 
				iconCls: 'dataTable-preview-icon', 
				handler : function() {
					//gridSelf.loadData();
					var analysisDimensionValue = parmValue = Ext.getCmp('#analysisDimension').getValue();
					if(analysisDimensionValue==""){
						cParams.analysisDimension="1"
					}else{
						cParams.analysisDimension=analysisDimensionValue
					}
					chartAjax('tbDM0002ChartOneProvider.do',cParams,chartOne,'chartOneDiv');
					chartAjax('tbDM0002ChartTwoProvider.do',cParams,chartTwo,'chartTwoDiv');
				}
			}
			];
			var chartPanel = new Ext.Panel({
			    id:'chart-panel',
			    tbar:chartQueryFields,
			    baseCls:'x-plain',
			    layout:'table',
			    layoutConfig: {columns: 2},
			    //defaults: {frame: true, width: 200, height: 300},
			    items: [{
					id: "chartOnePanel",
					width:400,
					height:350,
					html: '<div id="chartOneDiv"></div>'
//					html:"<iframe id='myFrame' name='myFrame' width='920' height='420' src='portalPixel.do?portalCode=tbDM0002Chart'></iframe>"
				},{
					id: "chartTwoPanel",
					autoScroll: true,
					width:400,
					height:350,
					html: '<div id="chartTwoDiv"></div>'
//					html:"<iframe id='myFrame' name='myFrame' width='920' height='420' src='http://www.baidu.com'></iframe>"
				}]
			});
			VideoUrlDetailWin= new Ext.Window({
				id : 'UrlDetailWin',
				title : '详细信息',
				width :800,
				height : 400,
				draggable:true,
				constrain:true,// 将拖动范围限制在容器内
				autoDestroy:false,
				closeAction: 'close',
			    modal : true ,
			    items: [chartPanel],
			    listeners : {
			    	resize :function(obj,adjWidth,adjHeight,rawWidth,rawHeight){
			    		chartPanel.get("chartOnePanel").setHeight(adjHeight);
			    		chartPanel.get("chartOnePanel").setWidth(adjWidth/2);
			    		chartPanel.get("chartTwoPanel").setHeight(adjHeight);
			    		chartPanel.get("chartTwoPanel").setWidth(adjWidth/2);
			    	}
			    }
			});	
			
			var chartOne = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
			chartOne.width = '100%';
			chartOne.height = '100%';
			chartOne.wMode='opaque';
			cParams.analysisDimension="1";
			chartAjax('tbDM0002ChartOneProvider.do',cParams,chartOne,'chartOneDiv');
			
			var chartTwo = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
			chartTwo.width = '100%';
			chartTwo.height = '100%';
			chartTwo.wMode='opaque';
			cParams.analysisDimension="1";
			chartAjax('tbDM0002ChartTwoProvider.do',cParams,chartTwo,'chartTwoDiv');
			
			function chartAjax(cUrl,cParams,obj,targetDiv){
				Ext.Ajax.request({
					url:cUrl,
					params:cParams,
					success: function(response) {
						var JSONData = response.responseText.evalJSON();
						obj.setJSData(JSONData);
						obj.write(targetDiv);
					}
				});
			}
			
			VideoUrlDetailWin.show();		
		}	
	};

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    Ext.override(Ext.ux.seraph.FormEditorGrid,{
        initComponent : function() {
        	
    		// build selection model
    		this.sm = this.buildSelectionModel();
    		
    		// build columns model
    		var originCM = this.buildColumnModels();
    		var customerCM = this.columns;
    		//this.columns = originCM.concat(customerCM);

    		// build form
    		this.formPanel = this.buildForm();
    		
            // build editor
        	this.editor = this.buildEditor();
            
            // build Tbar
            this.tbar = this.buildTbar(this.queryFields);
            
            // build store
            this.store = this.buildStore();
            
            // build pagingToolbar
            this.pagingToolbar = this.buildPagingToolbar();
            this.bbar = this.pagingToolbar;

            // Set auto-column width, viewConfig: {forceFit:true}
            // this.getView().forceFit = true;
            
        	this.on('rowdblclick', this.onUpdate, this);
        	this.on('load', this.loadData(), this);
            // super
            Ext.ux.seraph.FormEditorGrid.superclass.initComponent.apply(this, arguments);
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
    	pk: PK,
    	url: URL,
        buildTbar : function(queryFields) {
        	var gridSelf = this;
        	return [queryFields, {
            	text: '查询', 
            	iconCls: 'dataTable-preview-icon', 
            	handler : function() {
            		//
            		var cParams={};
            		var domainValue = Ext.getCmp('#dd0002').getValue();
            		var topNumValue = Ext.getCmp('#topNum').getValue();
//            		if(domainValue!=""){
//            			cParams.dd0002=domainValue;
//            			if(topNumValue!=""){
//            				cParams.topNum=topNumValue;
//            			}
//            			gridSelf.loadData();
//            		}else{
//            			//Ext.Msg.alert('提示信息', parmValue);
//            			Ext.Msg.alert('提示信息', '请输入“域名名称”！');
//            		}
        			cParams.dd0002=domainValue;
        			if(topNumValue!=""){
        				cParams.topNum=topNumValue;
        			}
        			gridSelf.loadData();
            	}
            }]
        },
        onUpdate : function(btn, ev) {
        	
    		var record = this.getSelectionModel().getSelected();
    		if(!record) {
    			Ext.Msg.alert('提示', '请先选择一条记录！'); 
    			return;
    		}
    		var domainName=record.get('dd0002');
    		UrlDetailWinHelp.ShowDetail(domainName);
    		return;
        }
    });
});