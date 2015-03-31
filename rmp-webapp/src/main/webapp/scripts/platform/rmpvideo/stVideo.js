/**
 * stVideo.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
var stVideo = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'stVideoListProvider.do',
	action : 'stVideoAction.do'
};

// -> Primary key
var PK = ["id"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "ID",          
	1: "网站",          
	2: "频道",          
	3: "总数量",          
	4: "IDC内数量",          
	5: "数量IDC占比",          
	6: "总大小(M)",          
	7: "IDC内大小",          
	8: "大小IDC占比"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "host",          
	2: "channel",          
	3: "count",          
	4: "countIdc",          
	5: "prop_count_idc",          
	6: "size",          
	7: "sizeIdc",          
	8: "prop_size_idc",          
	9: "id_old"   
};

// -> Cell width
var WD = {
	0: "10",          
	1: "20",          
	2: "20",          
	3: "10",          
	4: "10",          
	5: "7",          
	6: "19",          
	7: "19",          
	8: "7"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "string",          
	2: "string",          
	3: "int",          
	4: "int",          
	5: "7",          
	6: "-5",          
	7: "-5",          
	8: "7"        
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
    {name: EN[9], type: TY[0]}   ,
    {name: 'prop_count_direct', type: 'string'}   ,
    {name: 'prop_count_net', type: 'string'}   ,
    {name: 'prop_count_cache', type: 'string'}   ,
    {name: 'prop_size_direct', type: 'string'}   ,
    {name: 'prop_size_net', type: 'string'}   ,
    {name: 'prop_size_cache', type: 'string'}  
];

var defaultData = {        
   id:'',   					     
   host:'',   					     
   channel:'',   					     
   count:'',   					     
   countIdc:'',   					     
   prop_count_idc:'',   					     
   size:'',   					     
   sizeIdc:'',   					     
   prop_size_idc:'' 					     
};


var userColumns =[ {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: 130, sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '数量Cache占比', width: WD[5], sortable: true, dataIndex: 'prop_count_cache', renderer:function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '数量本网占比', width: WD[5], sortable: true, dataIndex: 'prop_count_net', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '数量直连占比', width: WD[5], sortable: true, dataIndex: 'prop_count_direct', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, renderer:Main.fun.getMFromByte,hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[8], width: WD[8], sortable: true, dataIndex:'prop_size_idc', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: '大小Cache占比', width: WD[8], sortable: true, dataIndex: 'prop_size_cache', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: '大小本网占比', width: WD[8], sortable: true, dataIndex: 'prop_size_net', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: '大小直连占比', width: WD[8], sortable: true, dataIndex: 'prop_size_direct', renderer: function(value){return Main.fun.getPercentage(value*100)},hidden: false, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
        {text: CN[1]},           
	   {
			xtype:'textfield',
			id: '#'+EN[1],
	   		width: 90
	   	}
	   ,  
	   	{text: CN[2]},           
	       {
	   		xtype:'textfield',
	   		id: '#'+EN[2],
	   		width: 90
	   	}                  
	];

// 
var queryParms = [
  {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
  {name: EN[2], indicator: 'EXAMPLE_LIKE'}                   
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();

    Ext.override(Ext.ux.self.FormEditorGrid,{
    	    buildColumnModels : function() {
    	return [new Ext.grid.RowNumberer()];
    },
	    buildTbar : function(queryFields) {
	    	var gridSelf = this;
	    	return [ queryFields, {
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
        	}}]
	     }	     
    }); 
    
    var userGrid = new Ext.ux.self.FormEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	defaultData: defaultData,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	formFields: [],
    	columns: userColumns,
    	url: URL,
    	pk: PK
    });
    userGrid.un('rowdblclick', userGrid.onUpdate, userGrid);
});