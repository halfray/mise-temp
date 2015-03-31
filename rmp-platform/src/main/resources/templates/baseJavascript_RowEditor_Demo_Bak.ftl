/**
 * dataTableList.js Power by YUI-EXT and JSON.
 * 
 * @author 徐信信
 * @email xinxin_xu@primedata.com
 */
var DataTableList = { 
	author: "xxx",
	version: "0.1.0"
};

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

var ACTION = {
	add : 'create',
	del : 'delete',
	update : 'update',
	query : 'retrieve'
};

var editor_action = {
	action : 'update'
}

<#if javaControllerGenerator.enable>
var URL = {
	queryList : '${entity.name}ListProvider.do',
	action : '${entity.name}Action.do?pk=<#list entity.columns as u ><#if u.isPK?exists && u.isPK='true'>${u.id}<#if u_has_next>|</#if></#if></#list>'
}
<#else>
var URL = {
	queryList : 'baseRecordListProvider.do?bean=${entity.name}',
	action : 'baseRecordAction.do?bean=${entity.name}&pk=<#list entity.columns as u ><#if u.isPK?exists && u.isPK='true'>${u.id}<#if u_has_next>|</#if></#if></#list>'
}
</#if>

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
		            {header: CN[${u_index}], width: WD[${u_index}], sortable: true, dataIndex: EN[${u_index}]<#if u.isHidden?has_content>, hidden: ${u.isHidden}, hideable: false</#if><#if u.xtype?exists><#if u.xtype.name = 'combobox'>, renderer: Ext.ux.renderer.Combo(${u.id}Field), editor: ${u.id}Field}<#elseif u.xtype.name = 'datefield'>,renderer:Ext.util.Format.dateRenderer('Y-m-d'),editor: {xtype:'datefield', editable: false, format: 'Y-m-d'}<#else>,editor: {xtype: '${u.xtype.name}'}</#if><#else>,editor: {xtype: 'textfield'} </#if>}<#if u_has_next>,  </#if>
					</#list>
                ];


Ext.onReady(function() {
    Ext.QuickTips.init();

<#assign s_enNum_var = enNum >
<#assign s_pkNum_var = pkNum >    
    var store = new Ext.data.JsonStore({
		root: 'dataList',
        totalProperty: 'totalCount',
	    url: URL.queryList,
	    restful: true,
	    fields: [	    
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
        ]
	});
	store.setDefaultSort(EN[1]);		

    var pagingToolbar = new Ext.ux.PagingToolbar(store);

    // use RowEditor for editing
    var editor = new Ext.ux.grid.RowEditor({
        saveText: '提交',
        cancelText: '取消',
        clicksToEdit: 2
    });    
        
    // Create a typical GridPanel with RowEditor plugin
    var userGrid = new Ext.grid.GridPanel({
        renderTo: 'user-grid',
        border: false,
        //style: 'border-bottom: 1px solid #99bbe8;',
        stripeRows: true,
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
        store: store,
        plugins: [editor],
        columns: userColumns,
        tbar: [{
            text: '添加',
            iconCls: 'dataTableList-add-icon',
            handler: onAdd
        }, '-',{
            text: '修改',
            iconCls: 'dataTableList-modify-icon',
            handler: onModify
        }, '-', {
            text: '删除',
            iconCls: 'dataTableList-delete-icon',
            handler: onDelete
        }, '-',
        <#list entity.columns as u >
            <#if u.isQuery?exists && u.isQuery = 'true'>
        	{
				text: '${u.name}:'
            },            
            <#if u.xtype?exists>            
            <#if u.xtype.name = 'combobox'>
            {
				xtype: 'selectcombo',
				id: 'query${u.id?cap_first}',
		       	name: EN[${u_index}],
		       	hiddenName: EN[${u_index}],
				fieldLabel: CN[${u_index}],
				width: 90,
                url: '${u.xtype.url}',
                displayField: '${u.xtype.displayField}',
                valueField: '${u.xtype.valueField}'
			},' ',
			<#elseif u.xtype.name = 'datefield'>
            {
				xtype:'datefield',
				format:'Y-m-d',
				id: 'query${u.id?cap_first}',
				width: 120
			},' ',			
			<#else>
            {
				xtype:'${u.xtype.name}',
				id: 'query${u.id?cap_first}',
				width: 90
			},' ',
			</#if>
			<#else>
            {
				xtype:'textfield',
				id: 'query${u.id?cap_first}',
				width: 90
			},' ',			
			</#if>
        	</#if>
		</#list>
			{
	            text: '查询',
	            iconCls: 'dataTable-preview-icon',
	            handler : function(){
	        		store.load({params:{start:0, limit: pagingToolbar.pageSize}});
	            }
        	}
        ],
        bbar: pagingToolbar
    });

    store.load({params:{start:0, limit: pagingToolbar.pageSize}});
    
    store.on('beforeload', function(options){
    	var parms = new Array();
	<#list entity.columns as u >
		<#if u.isQuery?exists && u.isQuery = 'true'>
		<#if u.xtype?exists && u.xtype.name = 'combobox'>
		var condition${u_index} = '${u.id}:EXAMPLE_LIKE:' + Ext.getCmp('query${u.id?cap_first}').getValue() + ';'; 
		<#else>
		var condition${u_index} = '${u.id}:EXAMPLE_LIKE:' + $('query${u.id?cap_first}').value + ';';
		</#if>
		parms.push(condition${u_index});
		</#if>
	</#list>
    	Ext.apply(this.baseParams, {condition: parms.join('')});
    });
    
    editor.on({ 
    	  scope: this,
    	  canceledit:function(roweditor,flag){
    	    var action =editor_action.action;
    	    if(action==ACTION.add){
    	      editor_action.action=ACTION.update;
    	      store.reload();
    	    }
    	  },
    	  validateedit:function(roweditor, changes, record, rowIndex){   
    	    var action =editor_action.action; 	  
			<#list entity.columns as u >
				<#if u.allowBlank?exists && u.allowBlank = 'false'>
			        var f_cks${u_index}=changes['${u.id}'];	 			        
    	  	        if(action==ACTION.add){
				        if(typeof(f_cks${u_index}) == 'undefined'){
				           Ext.Msg.alert('提示','${u.name}不能为空!');
				           return false;
				        }    	  	          
    	  	        }else{
				        if(typeof(f_cks${u_index}) != 'undefined'&&(f_cks${u_index}==null||f_cks${u_index}=='')){
				           Ext.Msg.alert('提示','${u.name}不能为空!');
				           return false;
				        }    	  	            
    	  	        }			        					
				</#if>		        
			</#list>    	      	  
    	  },  
    	  nochangeonsubmit:function(roweditor, record, rowIndex){
    	    var action =editor_action.action;
    	    if(action==ACTION.add){
    	      editor_action.action=ACTION.update;
    	      store.reload();
    	    }
    	  },     	  
    	  afteredit: function(roweditor, changes, record,old_record, rowIndex) {
        <#assign r_enNum_var = enNum >    	  
		<#list entity.columns as u >
	    <#if u.isPK?exists && u.isPK = 'true'> 
	        changes[EN[${r_enNum_var}]]=old_record[EN[${u_index}]];  
		   <#assign r_enNum_var = r_enNum_var+1 >  	   	
	     </#if>	     
	   </#list>	    	  
            Ext.iterate(changes, function(name, value){
                //record.set(name, value);
                old_record[name]=value;
            });     	  
    	    Ext.Ajax.request({ 
    	      url: URL.action, 
    	      method: 'POST', 
    	      params: {
    	    	       action:editor_action.action,    	    	       
					   record:Ext.util.JSON.encode(old_record)   	    	          	    	       
    	              }, 
    	      success: function(response) { 
    	           //post-processing here - this might include reloading the grid if there are calculated fields 
				   var baseResponse = response.responseText.evalJSON();
				   if (!baseResponse.success) {
					   Ext.Msg.alert('提示', baseResponse.errors.msg);
				   }
	    	      	editor_action.action=ACTION.update;
	    	    	store.reload();
    	       },
	      	  failure: function(form, action) {
						Ext.Msg.alert('Error', action.result.errors.msg);
						editor_action.action=ACTION.update;
			            store.reload();
	      		},
	      		clientValidation: true,
	      		waitMsg: Message.waitMsg    	      
    	    }); 
    	  }
    	});
    
    /**
     * onAdd
     */
    function onAdd(btn, ev) {
        var u = new userGrid.store.recordType({        
		   <#list entity.columns as u >					      
		   ${u.id}:''<#if u_has_next>,  </#if> 					     
		   </#list>        
        });
        editor_action.action=ACTION.add;
        editor.stopEditing();
        userGrid.store.insert(0, u);
        editor.startEditing(0);
    }
    /**
     * onDelete
     */
    function onDelete() {
        var rec = userGrid.getSelectionModel().getSelected();

        if (!rec) {
			Ext.Msg.alert('提示', '请先选择一条记录！');        
            return false;
        }
    	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
    		if(val == 'yes'){
			 	Ext.Ajax.request({
				   url: URL.action,
				   success: function(response) {
					   var baseResponse = response.responseText.evalJSON();
					   if (!baseResponse.success) {
						   Ext.Msg.alert('提示', baseResponse.errors.msg);
					   } else {
					   	   userGrid.store.remove(rec);
					   }
		    	      	editor_action.action=ACTION.update;
		    	    	store.reload();				   	     
				   },
				   failure: Ext.emptyFn,
	    	       params: {
	    	    	       action:ACTION.del,    	    	       
						   record:Ext.util.JSON.encode(rec.json)   	    	          	    	       
	    	              }
				});
    		}
    	})       
    }
    
    /**
     * onModify
     */
    function onModify() {
        var rec = userGrid.getSelectionModel().getSelected();

        if (!rec) {
        	Ext.Msg.alert('提示', '请先选择一条记录！'); 
            return false;
        }else{
        	//alert(userGrid.store.indexOf(rec));
            var index = userGrid.store.indexOf(rec);
            editor.startEditing(index);
        }      
    }
});