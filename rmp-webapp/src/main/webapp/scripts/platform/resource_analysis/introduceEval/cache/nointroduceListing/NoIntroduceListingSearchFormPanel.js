Ext.namespace('Ext.introduceEval.NoIntroduceListing');

Ext.introduceEval.NoIntroduceListing.SearchFormPanel = function(config){
//	var gridId = config.gridId;
	var webSiteID = config.webSiteID;
    // 初始化表单
    Ext.introduceEval.NoIntroduceListing.SearchFormPanel.superclass.constructor.call(this, Ext.applyIf(config, {
        border: false,
        labelAlign: 'right',
        buttonAlign: 'center',
        bodyStyle: 'padding: 0px, 17px, 0px, 0px',
        labelWidth: 80,
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
					hidden: true,
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
                    xtype: 'dictcombo',
					url: 'parmInfoProvider.do?parmType=TOPN',
					displayField: 'parmName',
					valueField: 'parmCode',
                    hiddenName: 'topN',
					fieldLabel: 'TOP',
					value: '1000',
                    maxLength: 128,
                    anchor: '95%'
                }]
            },{
                columnWidth: .33,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '网站',
                    name: 'webSiteID',
					value: webSiteID,
					hidden: true,
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
                    // 获取表格
					searchDetailGrid(values);
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

Ext.extend(Ext.introduceEval.NoIntroduceListing.SearchFormPanel, Ext.FormPanel, {

    getGridPanel: function(){
        return Ext.getCmp(this.gridId);
    }
});
