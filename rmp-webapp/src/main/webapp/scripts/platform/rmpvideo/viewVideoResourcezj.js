/**
 * viewVideoResource.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var viewVideoResource = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'viewVideoResourceListProviderzj.do',
	action : 'viewVideoResourceActionzj.do'
};

// -> Primary key
var PK = [];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",  		
	1: "显示名称",          
	2: "集数",          
	3: "播放地址",          
	4: "频道",          
	5: "采集点",          
	6: "清晰度",          
	7: "省内IDC占比",          
	8: "总大小(M)",          
	9: "创建时间"     ,
	10: "本省本网缓存占比"     ,   
	11: "本网占比"     ,   
	12: "本省本网直连"        
};

// -> Column name in English
var EN = {
	0: "httpid",          
	1: "name",          
	2: "episodes",          
	3: "pageurl",          
	4: "channel",          
	5: "hostId",          
	6: "dpi",          
	7: "idc",          
	8: "videoSize",          
	9: "addtime"   ,
	10: "cache"    ,    
	11: "net"    ,    
	12: "direct"            
};

// -> Cell width
var WD = {
	0: "200",          
	1: "50",          
	2: "300",          
	3: "100",          
	4: "100",          
	5: "100",          
	6: "100",          
	7: "70",          
	8: "22",          
	9: "19"        
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
	9: "string",
	10: "string"
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
   	{name: EN[10], type: TY[10]}  ,     
   	{name:'host_id', type: TY[10]}   ,    
   	{name: EN[10], type: TY[10]}    ,    
   	{name: EN[11], type: TY[10]}    ,    
   	{name: EN[12], type: TY[10]}           
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
	  {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield'} 	
];

var PreviewRobot = {

	takeLook : function(id, href) {
		Ext.getBody().createChild({tag:'div', id:'preview-el'});
		var previewWin = new Ext.Window({
			contentEl: 'preview-el',
			iconCls: 'dashboard-preview-icon',
			resizable: true,
			title: 'Inspect',
			width: 640,
			height: 360,
			closeAction: 'close',
			html: this.htmlCreate(id, href)
		});
		previewWin.show();
	},

	htmlCreate : function(id, href) {
		return '<iframe id=\'' + id + '\' scrolling="auto" width="100%" height="100%" src=' + href + '></iframe>';
	}
}

function show(frameId, href) {
	// alert("[" + frameId + "],[" + href + "]");
	PreviewRobot.takeLook(frameId, href);
}

function showURL(value, metaData, record){
	var frameId = record.get(EN[1]);
	var href = record.get(EN[3]);
	return "<a onclick=\"javascript:show('" + frameId + "', '" + href + "')\">查看</a>";
}

function showSWF(value, metaData, record){
	var frameId = record.get(EN[1]);
	var href = record.get(EN[4]);
	return "<a onclick=\"javascript:show('" + frameId + "', '" + href + "')\">查看</a>";
}
function showResourceInfo(value, metaData, record){
	var httpid=record.get('httpid');
	var dpi=record.get('dpi');
	return "<a onclick=\"javascript:VideoUrlDetailWinHelp.ShowDetail('"+httpid+"','"+dpi+"')\">"+value+"</a>";
}
var hostField = new Ext.ux.seraph.DictCombo({url: 'systemParmsProvider.do?type=HOSTLIST_LIST', displayField: 'codeLabel', valueField: 'codeValue'});	    	  


//var state = new Ext.ux.seraph.DictCombo( {
//	url : 'ProvinceParamController.do', 
//	id:'#province',
//	displayField : 'province',
//	width: 90,
//	valueField : 'province'
//});

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 200, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,renderer:showResourceInfo },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,renderer:showURL},  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: 'host_id', hidden: false, hideable: false,renderer: Ext.ux.renderer.Combo(hostField), editor: hostField},  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: 120, sortable: true, dataIndex: EN[10],renderer: function(value){return Main.fun.getPercentage(value*100)}, hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[12], width: WD[9], sortable: true, dataIndex: EN[12],renderer: function(value){return Main.fun.getPercentage(value*100)} ,hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[11], width: WD[9], sortable: true, dataIndex: EN[11],renderer: function(value){return Main.fun.getPercentage(value*100)} ,hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], renderer:Main.fun.getMFromByte,hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];


// TODO: default xtype, width
var queryFields = [
   	{text: '影片名称'+':'},           
    {
		xtype:'textfield',
		id: '#'+EN[1],
		width: 90
	}
,  
	{text: CN[5]+':'},           
	new Ext.ux.seraph.DictCombo({id: '#hostId',url: 'systemParmsProvider.do?type=HOSTLIST_LIST', displayField: 'codeLabel', valueField: 'codeValue'})

//,
//	{text:'省份'+':'},
//		state
];

// 
var queryParms = [
  {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
  {name: 'hostId', indicator: 'EXAMPLE_EQUALS'}
//  {name: "province", indicator: 'EXAMPLE_EQUALS'}
];


var VideoUrlDetailWin=null;

var VideoUrlDetailWinHelp={
	ShowDetail : function (httpid,dpi){
		VideoUrlDetailWin= new Ext.Window({
			id : 'VideoUrlDetailWin',
			title : '链接地址',
			width :800,
			height : 400,
			draggable:true,
			constrain:true,// 将拖动范围限制在容器内
			autoDestroy:false,
			closeAction: 'close',
		    modal : true 
		});	
		VideoUrlDetailWin.html="<iframe id='myFrame' name='myFrame' width='920' height='420' src='httpVideodownurlListzj.do?hvd_qurey_params="+httpid+"AAA"+dpi+"'></iframe>"							
		VideoUrlDetailWin.show();		
	}	
}

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    Ext.override(Ext.ux.self.FormEditorGrid,{
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
            
        	//this.on('rowdblclick', userGrid.showVideoUrlDetail, this);
        	this.on('load', this.loadData(), this);
            
            // super
            Ext.ux.seraph.FormEditorGrid.superclass.initComponent.apply(this, arguments);
        },    	   	
        buildTbar : function(queryFields) {
        	var gridSelf = this;
        	return [queryFields, {
            	text: '查询', 
            	iconCls: 'dataTable-preview-icon', 
            	handler : function() {
            		gridSelf.loadData();
            	}
            }, '-', {
        	text: '刷新', 
        	iconCls: 'role-user-reset', 
        	handler : function() {
        		gridSelf.clearData();
        	}
        }]
         }	     
    });       
    
    var userGrid = new Ext.ux.self.FormEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	pk: PK,
    	url: URL
    });
    
});