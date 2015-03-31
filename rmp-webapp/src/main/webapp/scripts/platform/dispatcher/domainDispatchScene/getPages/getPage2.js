function getPage2(qualityExpressions,costDesList,policyName){
	
	var quaScore = new Ext.form.TextField({
		name : 'quaScore',
		width : 200,
		fieldLabel : '质量分>',
		value : qualityExpressions,
		readOnly : true
	});
	
	var nameList = new Ext.form.TextArea({
		name : 'nameList',
		height : 150,
		width : 200,
		fieldLabel : '成本名称列表',
		value : costDesList,
		readOnly : true
	});
	var formPanel = new Ext.form.FormPanel({
		//title : '所使用的调度策略：'+policyName,
		//baseCls: 'x-plain',
		border: false,
        labelAlign: 'right',
        bodyStyle: 'padding: 0px, 17px, 0px, 0px',
        labelWidth: 80,
        // 渲染表单背景
        //baseCls: 'x-panel-mc',
        items: [quaScore,nameList]
	});
	
	return formPanel;
}