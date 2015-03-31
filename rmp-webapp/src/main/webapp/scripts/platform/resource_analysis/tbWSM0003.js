/**
 * tbDM0002.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbWSM0003 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbWsM0003ListProvider.do',
	action : 'tbWsM0003Action.do'
};

// -> Primary key
var PK = ["pp0101","dd0001","pp0902"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "网站编号",
	1: "网站名称",   
	2: "网站类型",          
	3: "本网本省IDC占比",          
	4: "本网本省Cache占比",          
	5: "本网本省占比",          
	6: "本网占比",          
	7: "他网占比",          
	8: "资源流量 (千字节/秒)",          
	9: "资源请求次数"    
};

// -> Column name in English
var EN = {
	0: "ws0001",  
	1: "ws0002", 
	2: "ws0005",          
	3: "rrX103A",          
	4: "rrX103B",          
	5: "rrX103C",          
	6: "rrX103D",          
	7: "rrX103E",          
	8: "rrX103T",          
	9: "rrX106T"      
};

// -> Cell width
var WD = {
	0: "200",          
	1: 200,          
	2: 100,          
	3: 100,          
	4: 120,          
	5: 90,          
	6: 80,          
	7: 80,          
	8: 120,
	9: 100
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",
	9: "string"
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
	{name: EN[9], type: TY[9]}
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
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield'}
];	
//function showResourceInfo(value, metaData, record){
//	var domainId=record.get('ws0001');
//	return "<a onclick=\"javascript:UrlDetailWinHelp.ShowDetail('"+domainId+"')\">"+value+"</a>";
//}
function appendPercent(value){
	return value+"%";
}
var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, renderer:appendPercent},  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, renderer:appendPercent},  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false, renderer:appendPercent },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false, renderer:appendPercent },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false, renderer:appendPercent},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false,editor: {xtype: 'textfield'}},  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'}}
];

// TODO: default xtype, width
var queryFields = [
	{text: "TOP N"},           
    {
		xtype:'textfield',
		value:"100",
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
    {name: "topNum", indicator: 'EXAMPLE'},
    {name: "hotFoundation", indicator: 'EXAMPLE'}
];

var UrlDetailWinHelp={
		ShowDetail : function (domainId){
			VideoUrlDetailWin= new Ext.Window({
				id : 'UrlDetailWin',
				title : '详细信息',
				width :935,
				height : 450,
				draggable:true,
				constrain:true,// 将拖动范围限制在容器内
				autoDestroy:false,
				closeAction: 'close',
			    modal : true 
			});	
			VideoUrlDetailWin.html="<iframe id='myFrame' name='myFrame' width='920' height='420' src='tbWsM0003DList.do?hvd_qurey_params="+domainId+"'></iframe>"							
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
    		this.columns = customerCM;

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
    		var domainId=record.get('ws0001');
    		UrlDetailWinHelp.ShowDetail(domainId);
    		return;
        }
    });
    
});