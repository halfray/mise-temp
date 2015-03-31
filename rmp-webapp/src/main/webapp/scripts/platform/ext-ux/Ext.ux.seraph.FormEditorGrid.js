
var ACTION = {
	add : 'create',
	del : 'delete',
	update : 'update',
	query : 'retrieve'
};

Ext.ns("seraph","Ext.ux.seraph");

Ext.ux.seraph.FormEditor = function(gridPanel, formPanel) {
	
	this.gridPanel = gridPanel;
	this.formPanel = formPanel;
	
	Ext.ux.seraph.FormEditor.superclass.constructor.call(this);
};

Ext.ux.seraph.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor, Ext.Window, {
	
    layout: 'fit',
    title: '新增参数类型',
    autoHeight :true,
	resizable : true,
	closeAction: 'hide',
    initComponent : function() {
	
    	this.items = [this.formPanel];
    	
    	this.buttons = this.buildButtons();
    	
        // super
        Ext.ux.seraph.FormEditor.superclass.initComponent.apply(this, arguments);
    },
    
    buildButtons : function() {
    	return [{
		    text:'保存',
		    scope: this,
		    handler : this.doSave1
		},{
		    text: '取消',
		    scope: this,
		    handler: this.doCancel
		}];
    },
    
    setOldValues : function(record, old_record) {
		var changes = {},
        cm = this.gridPanel.colModel;

		for ( var i = 0, len = cm.getColumnCount(); i < len; i++) {
			if (!cm.isHidden(i)) {
				var dindex = cm.getDataIndex(i);
				if (!Ext.isEmpty(dindex) && this.gridPanel.pk.indexOf(dindex) > -1) {
					// fill old value to record, suffix is '_old'
					var oldValue = old_record.data[dindex];
					record[dindex + '_old'] = oldValue;
				}
			}
		}
    },

    doSave1 : function() {
    	var windowSelf = this;

    	var record = this.formPanel.form.getValues();
    	var old_record = this.formPanel.oldRecord;

    	if(old_record) {
    		this.setOldValues(record, old_record);		
    	}
    	/***验证form，如果所有item为空则不能提交 added by shiym 2013-12-24***/
    	var itemLength = this.formPanel.items.length;
    	var tmp = 0;
    	this.formPanel.items.each(function(item) {
    		if(item.getValue() == ''){
    			tmp++;
    		}
    	});
    	if(itemLength == tmp){
    		Ext.Msg.alert('提示', '请输入相应的元素后再提交！');
    		return;
    	}
    	/***验证form，如果所有item为空则不能提交 added by shiym 2013-12-24***/
    	if (this.formPanel.getForm().isValid()){
	    	this.formPanel.form.submit({
	    		url: windowSelf.gridPanel.url.action,
	    		method: 'post',
	    		success: function(form, action) {
	    			windowSelf.hide();
	    			windowSelf.gridPanel.store.reload();
	    		},
	    		failure: function(form, action) {
	    			windowSelf.hide();
					Ext.Msg.alert('Error', action.result.msg);
	    		},
	    		params: {
	   				action: this.formPanel.actionType,
	   				record: Ext.util.JSON.encode(record)
	  			},
	    		clientValidation: true,
	    		waitMsg: Message.waitMsg,
	    		waitTitle: Message.waitTitle
	    	});
	      }
    },
    
    doCancel : function() {
    	this.hide();
    }
    
});

Ext.ux.seraph.FormEditorGrid = Ext.extend(Ext.grid.GridPanel, {
	// default configs
    border: false,
    stripeRows: true,
    store: null,
    storeFields: null,
    formFields: null,
    queryFields: null,
    queryParms: null,
    columns: null,
    editor: null,
    pagingToolbar: null,
    tbar: null,
    bbar: null,
    currentAction: ACTION.update,
    onCreate:null,
    onUpdate:null,
    pk: null,
    url: null,
    loadMask : {msg:Main.constant.freshInfo},
    formLabelWidth:70,
    formItemWith:230,
    formWinWidth:360,

    /**
     * initComponent
     * @protected
     */
    initComponent : function() {
	
		// build selection model
		this.sm = this.buildSelectionModel();
		
		// build columns model
		var originCM = this.buildColumnModels();
		var customerCM = this.columns;
		this.columns = originCM.concat(customerCM);

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
    },

    buildSelectionModel : function() {
    	return new Ext.grid.CheckboxSelectionModel({singleSelect:true});
    },
    
    buildColumnModels : function() {
    	return [new Ext.grid.RowNumberer(), this.sm];
    },
    
    buildForm : function() {
    	
    	var grid = this;
    	
    	var formPanel = new Ext.form.FormPanel({
			baseCls: 'x-plain',
			autoHeight :true,
	        autoWidth: true,
	        labelWidth: grid.formLabelWidth,
	        frame:true,
	        bodyStyle:'padding:10px; border: 0px solid;',
			autoScroll: true,
	        defaults: {width: grid.formItemWith},
	        defaultType: 'textfield',
			bodyBorder: false,
			border: false,
	        items: [grid.formFields]
	    });
    	return formPanel;
    },
    
    buildEditor : function() {
    	// supply grid self
        var formEditor = new Ext.ux.seraph.FormEditor(this, this.formPanel);
        if(!Ext.isEmpty(formEditor))
        	formEditor.setWidth(this.formWinWidth);
        return formEditor;
    },
    
    buildTbar : function(queryFields) {
    	var gridSelf = this;
    	return [{
            text: '添加',
            iconCls: 'dataTableList-add-icon',
            scope: this,
            handler : gridSelf.onCreate
	    }, '-', {
	        text: '修改',
	        iconCls: 'dataTableList-modify-icon',
            scope: this,
	        handler: gridSelf.onUpdate
	    }, '-', {
            text: '删除',
            iconCls: 'dataTableList-delete-icon',
            scope: this,
            handler : gridSelf.onDelete
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
    	    fields: this.storeFields,
    	    remoteSort : true
    	});
		//store.setDefaultSort(this.storeFields[0].name);
        return store;
    },
    
    loadData : function() {
    	// Query field prefix is '#'
    	var condition = "";
    	var temps = new Array();
    	try {
        	for(var i = 0; i < this.queryParms.length; i++) {
        		var parmName = this.queryParms[i].name;
        		var parmType = this.queryParms[i].type;
        		var parmIndicator = this.queryParms[i].indicator;
        		
        		var parmValue='';
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
    
    onRetrieve : function() {
    	
    },
   
    onCreate : function(btn, ev) {
    	this.editor.setTitle('添加记录');
		this.editor.show();
		this.editor.formPanel.actionType = ACTION.add;
		this.formPanel.oldRecord = null;
		this.formPanel.getForm().reset();
    },
    
    onUpdate : function(btn, ev) {
    	
		var record = this.getSelectionModel().getSelected();
		if(!record) {
			Ext.Msg.alert('提示', '请先选择一条记录！'); 
			return;
		}
		
		this.editor.setTitle('修改记录');
		this.editor.show();
		this.editor.formPanel.actionType = ACTION.update;
		this.formPanel.oldRecord = record;
		this.formPanel.getForm().setValues(record.json);
    },
    
    onDelete : function(btn, ev) {
    	
    	var gridSelf = this;
    	
    	var record = this.getSelectionModel().getSelected();
    	if (!record) {
    		Ext.Msg.alert('提示', '请先选择一条记录！'); 
            return;
        }
    	
    	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
    		if(val == 'yes'){
			 	Ext.Ajax.request({
				   	url: gridSelf.url.action,
	   				success: function(response) {
		   				var baseResponse = response.responseText.evalJSON();
		   				if (baseResponse.success) {
		   					gridSelf.store.remove(record);
		   				} else {
		   					Ext.Msg.alert('提示', baseResponse.msg);
		   				}
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
	},// add by hezhenjun 单元格内容有时看不全，toolTip弹出显示
    onRender: function(ct, position) {
		Ext.ux.seraph.FormEditorGrid.superclass.onRender.call(this, ct, position);
        this.cellTip();
		
    },
	tooltip: true,
	minTipLength: 5,
    cellTip: function() {
    	if(this.tooltip) {
    		this.on('mouseover', function(e) {
        		var target = e.getTarget();
        		var text = target.innerHTML.trim();
        		text = text.replace('&nbsp;','');
        		if(target.childNodes.length < 2 && text.indexOf('<') == -1 && text.length > this.minTipLength)
        			target.title = text;
        	});
    	}
	}
});
