/**
 * ${entity.id}.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email 
 */
<#global enNum=0>
 <#list entity.columns as u >
   	   <#global enNum=enNum+1>  	     
 </#list>
<#global pkNum=0>
 <#list entity.columns as u >
   <#if u.isPK?exists && u.isPK = 'true'> 
   	   <#global pkNum=pkNum+1>  
   </#if>	     
 </#list> 
<#global qfNum=0>
 <#list entity.columns as u >
    <#if u.isQuery?exists && u.isQuery = 'true'>
   	   <#global qfNum=qfNum+1>  
   	</#if>	     
 </#list> 
var ${entity.id} = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
<#if javaControllerGenerator.enable>
var URL = {
	queryList : '${entity.id}ListProvider.do',
	action : '${entity.id}Action.do'
};
<#else>
var URL = {
	queryList : 'baseRecordListProvider.do?bean=${entity.name}',
	action : 'baseRecordAction.do?bean=${entity.name}&pk=<#list entity.columns as u ><#if u.isPK?exists && u.isPK='true'>${u.id}<#if u_has_next>|</#if></#if></#list>'
};
</#if>

// -> Primary key
<#assign pkNum_f = pkNum >
var PK = [<#list entity.columns as u ><#if u.isPK?exists && u.isPK='true'>"${u.id}"<#if (pkNum_f>1)>,</#if><#assign pkNum_f = pkNum_f-1></#if></#list>];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	<#list entity.columns as u >
	${u_index}: "${u.name}"<#if u_has_next>,  </#if>        
	</#list>
};

// -> Column name in English
<#assign enNum_var = enNum >
<#assign pkNum_var = pkNum >
var EN = {
	<#list entity.columns as u >
	${u_index}: "${u.id}"<#if u_has_next||(pkNum_var>0)>,  </#if>        
	</#list>
	<#list entity.columns as u >
    <#if u.isPK?exists && u.isPK = 'true'>   
	${enNum_var}: "${u.id}_old"<#if (pkNum_var>1)>,  </#if>   
	   <#assign enNum_var = enNum_var+1 >
	   <#assign pkNum_var = pkNum_var-1 >   	   	
     </#if>	     
   </#list>	
};

// -> Cell width
var WD = {
	<#list entity.columns as u >
	${u_index}: "${u.width}"<#if u_has_next>,  </#if>        
	</#list>
};

// -> Data type e.g: float,int,string
var TY = {
	<#list entity.columns as u >
	${u_index}: "${u.dataType}"<#if u_has_next>,  </#if>        
	</#list>
};

<#assign s_enNum_var = enNum >
<#assign s_pkNum_var = pkNum >  
var storeFields = [	    
	<#list entity.columns as u >
	{name: EN[${u_index}], type: TY[${u_index}]}<#if u_has_next||(s_pkNum_var>0)>,  </#if>        
	</#list>
	<#list entity.columns as u >
    <#if u.isPK?exists && u.isPK = 'true'> 
    {name: EN[${s_enNum_var}], type: TY[${u_index}]}<#if (s_pkNum_var>1)>,  </#if>   
	   <#assign s_enNum_var = s_enNum_var+1 >
	   <#assign s_pkNum_var = s_pkNum_var-1 >   	   	
     </#if>	     
   </#list>	
];

var defaultData = {        
   <#list entity.columns as u >					      
   ${u.id}:''<#if u_has_next>,  </#if> 					     
   </#list>
};

<#list entity.columns as u >
	<#if u.xtype?exists>
	  <#if u.xtype.name = 'combobox'>
var ${u.id}Field = new Ext.ux.seraph.DictCombo({url: '${u.xtype.url}', displayField: '${u.xtype.displayField}', valueField: '${u.xtype.valueField}'});	    	  
	  </#if> 
	</#if>    
</#list>

var userColumns =[ 
    new Ext.grid.RowNumberer(),
    <#list entity.columns as u >
    {header: CN[${u_index}], width: WD[${u_index}], sortable: true, dataIndex: EN[${u_index}]<#if u.isHidden?has_content>, hidden: ${u.isHidden}, hideable: false</#if><#if u.xtype?exists><#if u.xtype.name = 'combobox'>, renderer: Ext.ux.renderer.Combo(${u.id}Field), editor: ${u.id}Field<#elseif u.xtype.name = 'datefield'>,renderer:Ext.util.Format.dateRenderer('Y-m-d'),editor: {xtype:'datefield', editable: false, format: 'Y-m-d'}<#else>,editor: {xtype: '${u.xtype.name}'}</#if><#else>,editor: {xtype: 'textfield'} </#if>}<#if u_has_next>,  </#if>
	</#list>
];

// TODO: default xtype, width
var queryFields = [
<#assign qfNum_var = qfNum >
<#list entity.columns as u >
    <#if u.isQuery?exists && u.isQuery = 'true'>
	{text: CN[${u_index}]},           
    <#if u.xtype?exists>            
    <#if u.xtype.name = 'combobox'>
    {
		xtype: 'selectcombo',
		id: '#${u.id}',
       	name: EN[${u_index}],
       	hiddenName: EN[${u_index}],
		fieldLabel: CN[${u_index}],
		width: 90,
        url: '${u.xtype.url}',
        displayField: '${u.xtype.displayField}',
        valueField: '${u.xtype.valueField}'
	}
	<#elseif u.xtype.name = 'datefield'>
    {
		xtype:'datefield',
		format:'Y-m-d',
		id: '#${u.id}',
		width: 120
	}			
	<#else>
    {
		xtype:'${u.xtype.name}',
		id: '#${u.id}',
		width: 90
	}
	</#if>
	<#else>
    {
		xtype:'textfield',
		id: '#${u.id}',
		width: 90
	}</#if><#if (qfNum_var>1)>, </#if><#assign qfNum_var = qfNum_var-1 > 
	</#if>	
</#list>	
];

// 
var queryParms = [
<#assign qfNum_var = qfNum >
<#list entity.columns as u >
    <#if u.isQuery?exists && u.isQuery = 'true'>
    {name: EN[${u_index}], indicator: 'EXAMPLE_LIKE'}<#if (qfNum_var>1)>, </#if><#assign qfNum_var = qfNum_var-1 >  
    </#if>
</#list>                
];

Ext.onReady(function() {
	
    Ext.QuickTips.init();
    
    var userGrid = new Ext.ux.seraph.RowEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	defaultData: defaultData,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	url: URL,
    	pk: PK
    });
    
});