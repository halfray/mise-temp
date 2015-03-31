
var ACTION = {
	add : 'create',
	del : 'delete',
	update : 'update',
	query : 'retrieve'
};

Ext.ns("seraph","Ext.ux.seraph");

Ext.ux.seraph.RowEditor = Ext.extend(Ext.ux.grid.RowEditor, {
	
	parent: null, 
	saveText: '提交',
    cancelText: '取消',
    clicksToEdit: 2,
    
    initComponent : function() {
        // super
        Ext.ux.seraph.RowEditor.superclass.initComponent.apply(this, arguments);
        
        // add events
        this.addEvents(
        	'nochangeonsubmit'
        );

    	// add event handler
    	this.on('canceledit', this.onCancelEdit, this);
    	this.on('validateedit', this.onValidateEdit, this);
    	this.on('nochangeonsubmit', this.onNoChangeOnSubmit, this);
    	this.on('afteredit', this.onAfterEdit, this);
    },
    
	onCancelEdit : function(roweditor, flag) {
		var action = this.grid.currentAction;
		if (action == ACTION.add) {
			this.grid.currentAction = ACTION.update;
			this.grid.store.reload();
		}
	},
	
	onValidateEdit : function(roweditor, changes, record, rowIndex) {   
	    var action = this.grid.currentAction;
	},
	  
	onNoChangeOnSubmit : function(roweditor, record, rowIndex) {
		var action = this.grid.currentAction;
	    if(action == ACTION.add){
	    	this.grid.currentAction = ACTION.update;
	    	this.grid.store.reload();
	    }
	},
	
	onAfterEdit : function(roweditor, changes, record, rowIndex) {
		//alert('提交');
		var grid = this.grid;
		
		Ext.Ajax.request({ 
			url: grid.url.action, 
			method: 'POST', 
			params: {
				action: grid.currentAction, 	    	       
				record: Ext.util.JSON.encode(record.data)
			}, 
			success: function(response) { 
			   var baseResponse = response.responseText.evalJSON();
			   if (!baseResponse.success) {
				   Ext.Msg.alert('提示', baseResponse.msg);
			   }//[]
			   grid.currentAction = ACTION.update;
			   grid.store.reload();
			},
			failure: function(form, action) {
				Ext.Msg.alert('Error', action.result.msg);
				grid.currentAction = ACTION.update;
				grid.store.reload();
      		},
      		clientValidation: true,
      		waitMsg: Message.waitMsg    	      
		});
	},
	
	stopEditing : function(saveChanges) {
		
		var grid = this.grid;

        this.editing = false;
        if(!this.isVisible()){
            return;
        }
        
		if (saveChanges === false || !this.isValid()) {
			this.hide();
			this.fireEvent('canceledit', this, saveChanges === false);
			return;
		}
		
        var changes = {},
        old_record = {},
        r = this.record,
        hasChange = false,
        cm = this.grid.colModel,
        fields = this.items.items;
        
		for ( var i = 0, len = cm.getColumnCount(); i < len; i++) {
			if (!cm.isHidden(i)) {
				var dindex = cm.getDataIndex(i);
				if (!Ext.isEmpty(dindex)) {
					var oldValue = r.data[dindex], value = this.postEditValue(fields[i].getValue(), oldValue, r, dindex);
					// fill old value to record, suffix is '_old'
					if(grid.pk.indexOf(dindex) > -1) {
						r.set(dindex + '_old', oldValue);
					}
					old_record[dindex] = oldValue;
					if (String(oldValue) !== String(value)) {
						changes[dindex] = value;
						hasChange = true;
					}
				}
			}
		}
        
        if (hasChange && this.fireEvent('validateedit', this, changes, r, this.rowIndex) !== false) {
        	r.beginEdit();
            Ext.iterate(changes, function(name, value){
            	r.set(name, value);
            });
            r.endEdit();
            this.fireEvent('afteredit', this, changes, r, this.rowIndex);
        }
        
        if (hasChange == false) {
           this.fireEvent('nochangeonsubmit', this, r, this.rowIndex);
        }
        
        this.hide();
    }
	
});

Ext.ux.seraph.RowEditorGrid = Ext.extend(Ext.grid.GridPanel, {
	// default configs
    border: false,
    stripeRows: true,
    store: null,
    plugins: null,
    storeFields: null,
    defaultData: null,
    queryFields: null,
    queryParms: null,
    columns: null,
    editor: null,
    pagingToolbar: null,
    tbar: null,
    bbar: null,
    currentAction: ACTION.update,
    pk: null,
    url: null,

    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
    	
        // build editor
    	this.editor = this.buildEditor()
        this.plugins = [this.editor];
        
        // build Tbar
        this.tbar = this.buildTbar(this.queryFields);
        
        // build store
        this.store = this.buildStore();
        
        // build pagingToolbar
        this.pagingToolbar = this.buildPagingToolbar();
        this.bbar = this.pagingToolbar;
        
        // load data
        this.loadData();
        
        // Set auto-column width, viewConfig: {forceFit:true}
        this.getView().forceFit = true;
        
        // super
        Ext.ux.seraph.RowEditorGrid.superclass.initComponent.apply(this, arguments);
    },

    buildEditor : function() {
    	// supply grid self
        return new Ext.ux.seraph.RowEditor();  
    },
    
    buildTbar : function(queryFields) {
    	var gridSelf = this;
    	return [{
            text: '添加',
            iconCls: 'dataTableList-add-icon',
            scope: this,
            handler: gridSelf.onCreate
        }, '-', {
            text: '修改',
            iconCls: 'dataTableList-modify-icon',
            scope: this,
            handler: gridSelf.onUpdate
        }, '-', {
            text: '删除',
            iconCls: 'dataTableList-delete-icon',
            scope: this,
            handler: gridSelf.onDelete
        }, '-', queryFields, {
        	text: '查询', 
        	iconCls: 'search-button', 
        	handler : function() {
        		gridSelf.loadData();
        	}
        }, '-',{
        	text: '刷新', 
        	iconCls: 'refresh-button', 
        	handler : function() {
        		gridSelf.clearData();
        	}
        }]
    },
    
    clearData : function() {
    	// Query field prefix is '#'
    	var condition = "";
    	var temps = new Array();
    	try {
        	for(var i = 0; i < this.queryParms.length; i++) {
        		var parmName = this.queryParms[i].name;
        		var parmType = this.queryParms[i].type;
        		var parmIndicator = this.queryParms[i].indicator;
        		
        		var parmValue='';
        		//数据制空
        		Ext.getCmp('#' + parmName).setValue('');
        		if(parmType=='date'){
        	 		 parmValue = (Ext.getCmp('#' + parmName).getValue()).format("Ymd");
        		}else{
        	 		 parmValue = Ext.getCmp('#' + parmName).getValue();
        		}
       
        		if(parmValue) {        			
        			if(parmIndicator=='EXAMPLE_LIKE'){
            			temps.push(parmName + ':' + parmIndicator + ':%' + parmValue + '%;');        				
        			}else{
            			temps.push(parmName + ':' + parmIndicator + ':' + parmValue + ';');        				
        			}
        		}
        	}
    	} catch(e) {}
    	condition = temps.join('');
    	
        this.store.on('beforeload', function(options) {
        	Ext.apply(this.baseParams, {condition: condition});
        });
        this.store.load({params:{start:0, limit: this.pagingToolbar.pageSize}});
    },
    
    buildPagingToolbar : function() {
    	return new Ext.ux.PagingToolbar(this.store);
    },
    
    buildStore: function() {
        var store = new Ext.data.JsonStore({
    		root: 'dataList',
            totalProperty: 'totalCount',
    	    url: this.url.queryList,
    	    restful: true,
    	    fields: this.storeFields
    	});
		store.setDefaultSort(this.storeFields[0].name);
        return store;
    },
    
    loadData : function() {
    	// Query field prefix is '#'
    	var condition = "";
    	var temps = new Array();
    	try {
        	for(var i = 0; i < this.queryParms.length; i++) {
        		var parmName = this.queryParms[i].name;
        		var parmValue = Ext.getCmp('#' + parmName).getValue();
        		var parmIndicator = this.queryParms[i].indicator;
        		if(parmValue) {
        			if(parmIndicator=='EXAMPLE_LIKE'){
            			temps.push(parmName + ':' + parmIndicator + ':%' + parmValue + '%;');        				
        			}else{
            			temps.push(parmName + ':' + parmIndicator + ':' + parmValue + ';');        				
        			}
        		}
        	}
    	} catch(e) {}
    	condition = temps.join('');
    	
        this.store.on('beforeload', function(options) {
        	Ext.apply(this.baseParams, {condition: condition});
        });
        this.store.load({params:{start:0, limit: this.pagingToolbar.pageSize}});
    },
   
    /**
     * onCreate
     */
    onCreate : function(btn, ev) {
    	var emptyRecord = new this.store.recordType(null);    	
    	this.currentAction = ACTION.add;
		this.editor.stopEditing();
		this.store.insert(0, emptyRecord);
		this.editor.startEditing(0);
    },
    
    /**
     * onUpdate
     */
    onUpdate : function(btn, ev) {
        var record = this.getSelectionModel().getSelected();
        if (record) {
            var index = this.store.indexOf(record);
            this.editor.startEditing(index);
        } else {
        	Ext.Msg.alert('提示', '请先选择一条记录！'); 
            return false;
        }
    },
    
    onDelete : function(btn, ev) {
    	
    	var gridSelf = this;
    	
    	var record = this.getSelectionModel().getSelected();
        if (!record) {
        	Ext.Msg.alert('提示', '请先选择一条记录！');	
            return false;
        }
    	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
    		if(val == 'yes'){
			 	Ext.Ajax.request({
				   url: gridSelf.url.action,
				   success: function(response) {
					   var baseResponse = response.responseText.evalJSON();
					   if (!baseResponse.success) {
						   Ext.Msg.alert('提示', baseResponse.msg);
					   } else {
						   gridSelf.store.remove(record);
					   }
					   gridSelf.currentAction = ACTION.update;
					   gridSelf.store.reload();
				   },
				   failure: Ext.emptyFn,
	    	       params: {
    	    	       action: ACTION.del,
    	    	       record: Ext.util.JSON.encode(record.data)
	    	       }
				});
    		}
    	});
    },
    
	reload : function() {
		this.getStore().reload();
	}  
    
});
