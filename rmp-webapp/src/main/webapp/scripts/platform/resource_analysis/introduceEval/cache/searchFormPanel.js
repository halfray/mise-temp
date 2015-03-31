Ext.namespace('Ext.introduceEval');

Ext.introduceEval.SearchFormPanel = function(config){
	var gridId = config.gridId;
	
    // 初始化表单
    Ext.introduceEval.SearchFormPanel.superclass.constructor.call(this, Ext.applyIf(config, {
        border: false,
        labelAlign: 'right',
        buttonAlign: 'center',
        bodyStyle: 'padding: 0px, 17px, 0px, 0px',
        labelWidth: 100,
        // 渲染表单背景
        baseCls: 'x-panel-mc',
        items: [{
            layout: 'column',
            defaults: {
                layout: 'form'
            },
            items: [{
                columnWidth: .33,
                items: [{
                    xtype: 'dictcombo', 
					url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
					displayField: 'codeLabel',
					valueField: 'codeValue',
                    fieldLabel: '省份',
					value: '510000',
                    hiddenName: 'province',
                    maxLength: 128,
                    anchor: '95%'
                }]
            }, {
                columnWidth: .33,
                items: [{
                    xtype: 'dictcombo',
					url: 'parmInfoProvider.do?parmType=HOT_BASIS_ALL',
					displayField: 'parmName',
					valueField: 'parmCode',
                    fieldLabel: '排序依据',
					value: 'DNSResolNum',
                    hiddenName: 'hotBasis',
                    maxLength: 128,
                    anchor: '95%'
                }]
            },{
                columnWidth: .33,
                items: [{
                    xtype: 'numberfield',
                    hiddenName: 'topN',
					value: '1000',
                    maxLength: 128,
                    anchor: '95%',
                    name : 'topN',
                	fieldLabel : 'TOP',
                	width: 120
                    	
                }]
            },{
                columnWidth: .33,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '网站',
                    name: 'webSite',
                    maxLength: 128,
                    anchor: '95%'
                }]
            },{
                columnWidth: .33,
                items: [{
                    xtype: 'treefield',
					dataMethod:'webSiteTypeTreeActionController.getTreeField',
					displayField:'text',
					valueField:'id',
					listWidth: 272,
					onlyLeafSelect:true,
					rootVisible : false,	
					layerHeight:250,
                    fieldLabel: '网站类型',
                    name: 'webSiteType',
                    maxLength: 128,
                    anchor: '95%'
                }]
            },{
                columnWidth: .33,
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Cache引入深度<',
					sideText: '%',
                    name: 'introduceDepth',
                    maxLength: 128,
                    anchor: '95%'
                }]
            }, {
                columnWidth: .33,
                items: [{
                    xtype: 'numberfield',
                    fieldLabel: 'Cache引入精度<',
					sideText: '%',
                    name: 'introducePrecision',
                    maxLength: 128,
                    anchor: '95%'
                }]
            }]
        }],
        
        buttons: [{
            text: '查询',
            type: 'button',
			iconCls: 'dataTable-preview-icon', 
            scope: this,
            handler: function(btn, e){
                if (this.getForm().isValid()) {
                    // 获取查询条件
                    var values = this.getForm().getValues();
					var introduceDepth = values.introduceDepth;
					if(introduceDepth != null && introduceDepth != ""){
						values.introduceDepth = (introduceDepth / 100).toFixed(2);
					}
					var introducePrecision = values.introducePrecision;
					if(introducePrecision != null && introducePrecision != ""){
						values.introducePrecision = (introducePrecision / 100).toFixed(2);
					}
                    // 获取表格
					searchGrid(values);
                }else{
					Ext.ux.MessageBox.info("请按要求输入数据！");
				}
            }
        }, {
            text: '重置',
            type: 'reset',
			iconCls: 'role-user-reset', 
            scope: this,
            handler: function(btn, e){
                this.getForm().reset();
            }
        }]
    }));
}

Ext.extend(Ext.introduceEval.SearchFormPanel, Ext.FormPanel, {

    getGridPanel: function(){
        return Ext.getCmp(this.gridId);
    }
});
