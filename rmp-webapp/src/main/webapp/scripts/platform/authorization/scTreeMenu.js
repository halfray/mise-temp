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
		0: "ID",          
	1: "父菜单ID",          
	2: "菜单名",          
	3: "是否叶子结点",          
	4: "禁用",          
	5: "样式",          
	6: "图标",          
	7: "链接",          
	8: "可见",          
	9: "菜单类型",          
	10: "排序",          
	11: "链接目标"        
};

// -> Column name in English
var EN = {
	0: "id",          
	1: "parent",          
	2: "text",          
	3: "leaf",          
	4: "disabled",          
	5: "cls",          
	6: "iconCls",          
	7: "href",          
	8: "visibility",          
	9: "type",          
	10: "sort",          
	11: "hrefTarget"        
};

// -> Cell width
var WD = {
	0: "22",          
	1: "22",          
	2: "50",          
	3: "5",          
	4: "5",          
	5: "10",          
	6: "50",          
	7: "100",          
	8: "10",          
	9: "10",          
	10: "22",          
	11: "100"        
};

// -> Data type e.g: float,int,string
var TY = {
	0: "int",          
	1: "int",          
	2: "string",          
	3: "string",          
	4: "string",          
	5: "string",          
	6: "string",          
	7: "string",          
	8: "string",          
	9: "string",          
	10: "int",          
	11: "string"        
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
	queryList : 'baseRecordListProvider.do?bean=scTreeMenu',
	action : 'baseRecordAction.do?bean=scTreeMenu&pk=id|'
}

var userColumns =[ 
		            {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[7], width: WD[7], sortable: true, dataIndex: EN[7], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[8], width: WD[8], sortable: true, dataIndex: EN[8], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[9], width: WD[9], sortable: true, dataIndex: EN[9], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[10], width: WD[10], sortable: true, dataIndex: EN[10], hidden: false, hideable: false, editor: new Ext.form.TextField({})},  
		            {header: CN[11], width: WD[11], sortable: true, dataIndex: EN[11], hidden: false, hideable: false, editor: new Ext.form.TextField({})}
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
            {name: EN[4], type: TY[4]},  
            {name: EN[5], type: TY[5]},  
            {name: EN[6], type: TY[6]},  
            {name: EN[7], type: TY[7]},  
            {name: EN[8], type: TY[8]},  
            {name: EN[9], type: TY[9]},  
            {name: EN[10], type: TY[10]},  
            {name: EN[11], type: TY[11]}
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
				text: '父菜单ID:'
            },
            {
				xtype:'textfield',
				id: 'queryParent',
				width: 90
			},' ',
			{
				text: '菜单名:'
            },
            {
				xtype:'textfield',
				id: 'queryText',
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
		var condition1 = 'parent:EXAMPLE_LIKE:' + $('queryParent').value + ';';
		parms.push(condition1);
		var condition2 = 'text:EXAMPLE_LIKE:' + $('queryText').value + ';';
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
					   id_old:record.get(EN[0]),
					   id:record.get(EN[0]),   					     
					   parent:record.get(EN[1]),   					     
					   text:record.get(EN[2]),   					     
					   leaf:record.get(EN[3]),   					     
					   disabled:record.get(EN[4]),   					     
					   cls:record.get(EN[5]),   					     
					   iconCls:record.get(EN[6]),   					     
					   href:record.get(EN[7]),   					     
					   visibility:record.get(EN[8]),   					     
					   type:record.get(EN[9]),   					     
					   sort:record.get(EN[10]),   					     
					   hrefTarget:record.get(EN[11]) 					     
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
		   id:'',   					     
		   parent:'',   					     
		   text:'',   					     
		   leaf:'',   					     
		   disabled:'',   					     
		   cls:'',   					     
		   iconCls:'',   					     
		   href:'',   					     
		   visibility:'',   					     
		   type:'',   					     
		   sort:'',   					     
		   hrefTarget:'' 					     
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
						   id:rec.get(EN[0]),   					     
						   parent:rec.get(EN[1]),   					     
						   text:rec.get(EN[2]),   					     
						   leaf:rec.get(EN[3]),   					     
						   disabled:rec.get(EN[4]),   					     
						   cls:rec.get(EN[5]),   					     
						   iconCls:rec.get(EN[6]),   					     
						   href:rec.get(EN[7]),   					     
						   visibility:rec.get(EN[8]),   					     
						   type:rec.get(EN[9]),   					     
						   sort:rec.get(EN[10]),   					     
						   hrefTarget:rec.get(EN[11]) 					     
	    	              }
				});
    		}
    	})       
    }

});