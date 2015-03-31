/**
 * dataTableList.js Power by YUI-EXT and JSON.
 * 
 * @author 徐信信
 * @email xinxin_xu@longtop.com
 */
var DataTableList = { 
	author: "xxx",
	version: "0.1.0"
};


// -> Column name in Chinese. e.g: CN[1]
var CN = {
		0: "参数类型ID",          
	1: "参数顺序",          
	2: "参数ID",          
	3: "参数描述",          
	4: "参数备注"        
};

// -> Column name in English
var EN = {
	0: "typeCode",          
	1: "parmSort",          
	2: "parmCode",          
	3: "parmName",          
	4: "description"        
};

// -> Cell width
var WD = {
	0: "30",          
	1: "22",          
	2: "60",          
	3: "200",          
	4: "200"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "int",          
	2: "string",          
	3: "string",          
	4: "string"        
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

var URL = {
	queryList : 'baseRecordListProvider.do?bean=scParmInfo',
	action : 'baseRecordAction.do?bean=scParmInfo&pk=typeCode|parmCode|'
}

var userColumns =[ 
		            {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, editor: new Ext.form.TextField({})}
                ];


Ext.onReady(function() {
    Ext.QuickTips.init();
    
    var store = new Ext.data.JsonStore({
		root: 'dataList',
        totalProperty: 'totalCount',
	    url: URL.queryList,
	    restful: true,
	    fields: [	    
            {name: EN[0], type: TY[0]},  
            {name: EN[1], type: TY[1]},  
            {name: EN[2], type: TY[2]},  
            {name: EN[3], type: TY[3]},  
            {name: EN[4], type: TY[4]}
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
        iconCls: 'icon-grid',
        frame: true,
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
        store: store,
        plugins: [editor],
        columns: userColumns,
        tbar: [{
            text: '添加',
            iconCls: 'dataTableList-add-icon',
            handler: onAdd
        }, '-', {
            text: '删除',
            iconCls: 'dataTableList-delete-icon',
            handler: onDelete
        }, '-',
			{
				text: '参数类型ID:'
            },
            {
				xtype:'textfield',
				id: 'queryTypeCode',
				width: 90
			},' ',
			{
				text: '参数顺序:'
            },
            {
				xtype:'textfield',
				id: 'queryParmSort',
				width: 90
			},' ',
			{
				text: '参数ID:'
            },
            {
				xtype:'textfield',
				id: 'queryParmCode',
				width: 90
			},' ',
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
		var condition0 = 'typeCode:EXAMPLE_LIKE:' + $('queryTypeCode').value + ';';
		parms.push(condition0);
		var condition1 = 'parmSort:EXAMPLE_LIKE:' + $('queryParmSort').value + ';';
		parms.push(condition1);
		var condition2 = 'parmCode:EXAMPLE_LIKE:' + $('queryParmCode').value + ';';
		parms.push(condition2);
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
    	  },  
    	  nochangeonsubmit:function(roweditor, record, rowIndex){
    	    var action =editor_action.action;
    	    if(action==ACTION.add){
    	      editor_action.action=ACTION.update;
    	      store.reload();
    	    }
    	  },     	  
    	  afteredit: function(roweditor, changes, record,old_record, rowIndex) {
    	    Ext.Ajax.request({ 
    	      url: URL.action, 
    	      method: 'POST', 
    	      params: {
    	    	       action:editor_action.action,    	    	       
					   typeCode_old:record.get(EN[0]),
					   typeCode:record.get(EN[0]),   					     
					   parmSort:record.get(EN[1]),   					     
					   parmCode_old:record.get(EN[2]),
					   parmCode:record.get(EN[2]),   					     
					   parmName:record.get(EN[3]),   					     
					   description:record.get(EN[4]) 					     
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
		   typeCode:'',   					     
		   parmSort:'',   					     
		   parmCode:'',   					     
		   parmName:'',   					     
		   description:'' 					     
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
						   typeCode:rec.get(EN[0]),   					     
						   parmSort:rec.get(EN[1]),   					     
						   parmCode:rec.get(EN[2]),   					     
						   parmName:rec.get(EN[3]),   					     
						   description:rec.get(EN[4]) 					     
	    	              }
				});
    		}
    	})       
    }

});