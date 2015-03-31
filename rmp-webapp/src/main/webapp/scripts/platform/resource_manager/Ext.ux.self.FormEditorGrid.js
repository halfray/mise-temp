Ext.ns("Ext.ux.self");
Ext.ux.self.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor,{
	doSave : function() {
	var windowSelf = this;

	var record = this.formPanel.form.getFieldValues(); //修改行,获取valueField数据
	var old_record = this.formPanel.oldRecord;
	if(old_record) {
		this.setOldValues(record, old_record);		
	}
	if (this.formPanel.getForm().isValid()){
   	this.formPanel.form.submit({
   		url: windowSelf.gridPanel.url.action,
   		method: 'post',
   		success: function(form, action) {
   			windowSelf.hide();
   			windowSelf.gridPanel.store.reload();
   		},
   		failure: function(form, action) {
//   				windowSelf.hide();
				Ext.Msg.alert('Error', action.result.msg);
   		},
   		params: {
  				action: this.formPanel.actionType,
  				record: Ext.util.JSON.encode(record)
 			},
   		clientValidation: true,
   		waitMsg: Message.waitMsg
   	});
     }
}
}) ;
Ext.ux.self.FormEditorGrid = Ext.extend(Ext.ux.seraph.FormEditorGrid,{
	defaultvalue:{},
	setDefVal:function(value)
	{
		this.defaultvalue = value;
	}	,
	onUpdate:function(btn, ev) {
		var record = this.getSelectionModel().getSelected();
		if(!record) {
			Ext.Msg.alert('提示', '请先选择一条记录！'); 
			return;
		}
		
		this.editor.setTitle('修改记录');
		this.editor.show();
		this.editor.formPanel.actionType = ACTION.update;
		this.formPanel.oldRecord = record;
		var tempvalue = record.data;
		Ext.apply(tempvalue,this.defaultvalue);
		this.formPanel.getForm().setValues(tempvalue);
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
buildEditor : function() {
	// supply grid self
      var formEditor = new Ext.ux.self.FormEditor(this, this.formPanel);
        formEditor.setWidth(this.formWinWidth);
        return formEditor;
}
});