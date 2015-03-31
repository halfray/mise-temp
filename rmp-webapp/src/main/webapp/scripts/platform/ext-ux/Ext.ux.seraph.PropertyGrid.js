/*
 * Description: Extend PropertyStore to support grouping.
 * Date: 2009-06-24 16:33:01
 * 
 * @author: seraph
 * @email: seraph115@gmail.com
 */
Ext.grid.GroupPropertyStore = Ext.extend(Ext.data.GroupingStore, {
        
    // private
    getProperty : function(row){
       return this.getAt(row);
    },

    // private
    isEditableValue: function(val){
        if(Ext.isDate(val)){
            return true;
        }else if(typeof val == 'object' || typeof val == 'function'){
            return false;
        }
        return true;
    },

    // private
    setValue : function(prop, value){
        this.source[prop] = value;
        this.store.getById(prop).set('value', value);
    },

    // protected - should only be called by the grid.  Use grid.getSource instead.
    getSource : function(){
        return this.source;
    }
    
});

Ext.grid.GroupPropertyColumnModel = function(grid, store){
	
    this.grid = grid;
    var g = Ext.grid;

    g.GroupPropertyColumnModel.superclass.constructor.call(this, [
        {header: this.nameText, width:50, sortable: true, dataIndex:'name', id: 'name', menuDisabled:true},
        {header: this.valueText, width:50, resizable:false, dataIndex: 'value', menuDisabled:true},
        {header: 'id', width:50, resizable:false, dataIndex: 'id', hidden: true, hideable: false},
        {header: 'type', width:50, resizable:false, dataIndex: 'type', hidden: true, hideable: false},
        {header: 'groupId', width:50, resizable:false, dataIndex: 'groupId', hidden: true, hideable: false, groupRenderer: function(v, unused, r, rowIndex, colIndex, ds){return r.get('groupName')}},
        {header: 'groupName', width:50, resizable:false, dataIndex: 'groupName', hidden: true, hideable: false},
        {header: 'sort', width:50, resizable:false, dataIndex: 'sort', hidden: true, hideable: false}
    ]);
    
    this.store = store;
    this.bselect = Ext.DomHelper.append(document.body, {
        tag: 'select', cls: 'x-grid-editor x-hide-display', children: [
            {tag: 'option', value: 'true', html: '是'},
            {tag: 'option', value: 'false', html: '否'}
        ]
    });
    var f = Ext.form;

    var bfield = new f.Field({
        el:this.bselect,
        bselect : this.bselect,
        autoShow: true,
        getValue : function(){
            return this.bselect.value == 'true';
        }
    });
    this.editors = {
        'date' : new g.GridEditor(new f.DateField({selectOnFocus:true})),
        'string' : new g.GridEditor(new f.TextField({selectOnFocus:true})),
        'number' : new g.GridEditor(new f.NumberField({selectOnFocus:true, style:'text-align:left;'})),
        'boolean' : new g.GridEditor(bfield)
    };
    this.renderCellDelegate = this.renderCell.createDelegate(this);
    this.renderPropDelegate = this.renderProp.createDelegate(this);
};

Ext.extend(Ext.grid.GroupPropertyColumnModel, Ext.grid.ColumnModel, {
	
    // private - strings used for locale support
    nameText : '属性',
    valueText : '值',
    dateFormat : 'Y-m-j',

    // private
    renderDate : function(dateVal){
        return dateVal.dateFormat(this.dateFormat);
    },

    // private
    renderBool : function(bVal){
        return bVal ? '是' : '否';
    },
    
    renderEnum : function(id, cVal) {
    	// TODO: Fix combo not found.
    	var combo = this.grid.customEditors[id].field;
    	var store = combo.store;
    	var valueField = combo.valueField;
    	var displayField = combo.displayField;
    	var index = store.find(valueField, cVal);
    	if(cVal == null || cVal == "") {
    		return store.getAt(0).get(displayField);
    	} else {
			return store.getAt(index).get(displayField);    		
    	}
    },

    // private
    isCellEditable : function(colIndex, rowIndex){
        return colIndex == 1;
    },

    // private
    getRenderer : function(col){
        return col == 1 ?
            this.renderCellDelegate : this.renderPropDelegate;
    },

    // private
    renderProp : function(v){
        return this.getPropertyName(v);
    },

    // private
    renderCell : function(val, metadata, record, rowIndex, colIndex, store){
    	
    	var id = record.data.id;
    	var type = record.data.type;
    	
        var rv = val;
        if (Ext.isDate(val)) {
            rv = this.renderDate(val);
        } else if (typeof val == 'boolean'){
            rv = this.renderBool(val);
        } else if(type == 'enum') {
        	rv = this.renderEnum(id, val);
        }
        return Ext.util.Format.htmlEncode(rv);
    },

    // private
    getPropertyName : function(name){
        var pn = this.grid.propertyNames;
        return pn && pn[name] ? pn[name] : name;
    },

    // private
    getCellEditor : function(colIndex, rowIndex){
        var p = this.store.getProperty(rowIndex);
        var n = p.data['id'], val = p.data['type'];
        if(this.grid.customEditors[n]){
            return this.grid.customEditors[n];
        }
        if(val == 'date'){
            return this.editors['date'];
        }else if(val == 'number'){
            return this.editors['number'];
        }else if(val == 'boolean'){
            return this.editors['boolean'];
        }else{
            return this.editors['string'];
        }
    }
});

Ext.grid.GroupPropertyGrid = Ext.extend(Ext.grid.EditorGridPanel, {

    // private config overrides
    enableColumnMove:false,
    stripeRows:false,
    trackMouseOver: false,
    clicksToEdit:1,
    enableHdMenu : false,
    viewConfig : {
        forceFit:true
    },
   
    // private
    initComponent : function(){
    	
        this.customEditors = this.customEditors || {};
        this.lastEditRow = null;
        //var store = new Ext.grid.PropertyStore(this);
        //this.propStore = store;
        var cm = new Ext.grid.GroupPropertyColumnModel(this, this.store);
        this.addEvents(
            'beforepropertychange',
            'propertychange'
        );
        this.cm = cm;
        this.ds = this.store;
        
		// Ext.grid.GroupPropertyGrid.superclass.initComponent.call(this);
        Ext.grid.GroupPropertyGrid.superclass.initComponent.apply(this, arguments);
        
        this.selModel.on('beforecellselect', function(sm, rowIndex, colIndex){
            if(colIndex === 0){
                this.startEditing.defer(200, this, [rowIndex, 1]);
                return false;
            }
        }, this);
    },

    // private
    onRender : function(){
        Ext.grid.GroupPropertyGrid.superclass.onRender.apply(this, arguments);
        this.getGridEl().addClass('x-props-grid');
    },

    // private
    afterRender: function(){
        Ext.grid.GroupPropertyGrid.superclass.afterRender.apply(this, arguments);
        if(this.source){
            this.setSource(this.source);
        }
    },

    setSource : function(source){
        this.propStore.setSource(source);
    },

    getSource : function(){
        return this.propStore.getSource();
    }
});
Ext.reg("grouppropertygrid", Ext.grid.GroupPropertyGrid);
