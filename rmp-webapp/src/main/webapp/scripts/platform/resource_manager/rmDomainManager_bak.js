/**
 * rmDomainManager.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var rmDomainManager = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'rmDomainManagerListProvider.do',
	action : 'rmDomainManagerAction.do'
};

//
var lvlurl = 'systemParmsProvider.do?type=TB_WS_W_0004_LIST';
// -> Primary key
var PK = ["domainId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "域名ID",          
	1: "域名地址",          
	2: "域名名称",          
	3: "域名级别",          
	4: "域名状态",          
	5: "父域名id",          
	6: "父域名",          
	7: "泛域名ID",          
	8: "泛域名",          
	9: "创建时间",          
	10: "修改时间",          
	11: "操作人",          
	12: "数据来源",          
	13: "备注"        
};

// -> Column name in English
var EN = {
	0: "domainId",          
	1: "domainUrl",          
	2: "domainName",          
	3: "domainLevel",          
	4: "domainState",          
	5: "fatherDomainId",          
	6: "fatherDomainUrl",          
	7: "mainDomainId",          
	8: "mainDomainurl",          
	9: "createTime",          
	10: "updateTime",          
	11: "operatorUser",          
	12: "dataSource",          
	13: "domainDesc",          
	14: "domainId_old"   
};

// -> Cell width
var WD = {
	0: "19",          
	1: "100",          
	2: "25",          
	3: "2",          
	4: "1",          
	5: "19",          
	6: "100",          
	7: "19",          
	8: "100",          
	9: "10",          
	10: "10",          
	11: "255",          
	12: "2",          
	13: "255"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "-5",          
	1: "string",          
	2: "string",          
	3: "1",          
	4: "1",          
	5: "-5",          
	6: "string",          
	7: "-5",          
	8: "string",          
	9: "date",          
	10: "date",          
	11: "string",          
	12: "1",          
	13: "string"        
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
    {name: EN[14], type: TY[0]}   
];
function changeaddr()
{
	/*var address = Ext.getCmp(EN[1]);
	var lvl = Ext.getCmp(EN[3]);
	var par = Ext.getCmp(EN[6]);
	var fan = Ext.getCmp(EN[8]);
	changelvl(address,lvl);
	chgpar(address,par);
	chgfan(address,fan);*/
}

function changelvl(addr,lvl)
{
	/////////////测试代码/////////////////
	lvl.setValue(1);
}
function chgpar(addr,par)
{
/////////////测试代码/////////////////
	par.setValue('www.sina.com');
}
function chgfan(addr,fan)
{
/////////////测试代码/////////////////
	fan.setValue('*.sina.com');
}

var lvlfield =  new Ext.ux.seraph.DictCombo( {
	 id:EN[3],
	 name: EN[3],allowBlank:false,
	 
	 fieldLabel:CN[3],
		url : lvlurl,
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
var par =  new Ext.ux.seraph.DictCombo( {
	id: "fatherDomainId", name: "fatherDomainId", fieldLabel:"父域名",allowBlank:false,
	url : "rmDomainManagerActions.do?method=getDomain",
	displayField : 'domainName',
	valueField : 'domainId',
	listeners:
		{
		select:function()
			{
				var url = new Ajax('rmDomainManagerActions.do?').call("getUrlById",{domainId:this.getValue()});
				Ext.getCmp(EN[6]).setValue(url);
			}
		}
});
var fan =  new Ext.ux.seraph.DictCombo( {
	id: 'mainDomainId', name: 'mainDomainId', fieldLabel:'泛域名',allowBlank:false,
	url : "rmDomainManagerActions.do?method=getDomain",
	displayField : 'domainName',
	valueField : 'domainId',
	listeners:
	{
		select:function()
		{
			var url = new Ajax('rmDomainManagerActions.do?').call("getUrlById",{domainId:this.getValue()});
			Ext.getCmp(EN[8]).setValue(url);
		}
	}
});

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield',hidden:true},  	
     {id: EN[2], name: EN[2], fieldLabel:CN[2], xtype: 'textfield',allowBlank:false},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield',allowBlank:false,
    	 listeners:
    		 {
    	 		change:changeaddr
    		 }},  	
    	 
    		 lvlfield,
    
     {id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield',hidden:true,value:1},  	
//     {id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'textfield',hidden:true},  
     par,
     {id: EN[6], name: EN[6], fieldLabel:CN[6], xtype: 'textfield',hidden:true,allowBlank:false},  	
//     {id: EN[7], name: EN[7], fieldLabel:CN[7], xtype: 'textfield',hidden:true},  	
     {id: EN[8], name: EN[8], fieldLabel:CN[8], xtype: 'textfield',hidden:true,allowBlank:false},  	
     fan,
     {id: EN[9], name: EN[9], fieldLabel:CN[9], xtype: 'textfield',hidden:true},  	
     {id: EN[10], name: EN[10], fieldLabel:CN[10], xtype: 'textfield',hidden:true},  	
     {id: EN[11], name: EN[11], fieldLabel:CN[11], xtype: 'textfield',hidden:true},  	
     {id: EN[12], name: EN[12], fieldLabel:CN[12], xtype: 'textfield',hidden:true},  	
     new IpsField({id: 'ips', name: 'ips', fieldLabel:'关联IP', xtype: 'textarea'}),
     {id: 'website', name: 'website', fieldLabel:'所属网站', xtype: 'textfield',cls:'x-item-disabled',
    	 readOnly:true},  	
     {id: EN[13], name: EN[13], fieldLabel:CN[13], xtype: 'textarea'} 	
];	


var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header:'父域名', width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(par) },  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: '泛域名', width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false,editor: {xtype: 'textfield'} ,renderer:Ext.ux.renderer.Combo(fan)},  
    {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[12], width: WD[12], sortable: true, dataIndex: EN[12], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[13], width: WD[13], sortable: true, dataIndex: EN[13], hidden: true, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:Ext.ux.renderer.Combo(lvlfield) }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[1]},           
    {
		xtype:'textfield',
		id: '#domainUrl',
		width: 90
	},  
	{text: CN[3]},           
	new Ext.ux.seraph.DictCombo( {
		id:'#domainLevel',
		url : 'systemParmsProvider.do?type=TB_WS_W_0004_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	})
];

// 
var queryParms = [
    {name: EN[1], indicator: 'EXAMPLE_LIKE'},   
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
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
    userGrid.setDefVal({domainState:1,domainState:1,dataSource:1})
    
    
});