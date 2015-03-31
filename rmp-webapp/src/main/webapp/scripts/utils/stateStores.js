
//系统静态下拉列表数据
Ext.namespace('System.common.states.stores');
System.common.states.stores = {
	//模板类型
	TEMPLATE_TYPE: new Ext.data.SimpleStore({
        fields: ['ITEM_CODE', 'ITEM_NAME'],
        data: [
			['', '***请选择***'], 
			['TB_S_W_0004', '成本'], 
			['TB_S_W_0007', '质量'], 
			['ALL', '质量优先后成本']
		]
    })
};
