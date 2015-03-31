function getPage2() {
	var maxage = new Ext.form.NumberField({
		fieldLabel:'max-age(s) >',
		allowBlank:false,
		maxLength:20,
		name:'maxage'
	});
	var cl = new Ext.form.NumberField({
		fieldLabel:'Content-Length(B) >',
		allowBlank:false,
		maxLength:20,
		name:'cl'
	});
	
	function valueValidate()
	{
		if(!main.getForm().isValid())return false;
		//数据有效性验证 - 需求变更，暂不处理 20130227 by lixh
//		var maxvalue = maxage.getValue();
//		var clvalue = cl.getValue();
//		var res = new Ajax('rmTaskGroups.do').call('vidatePage2Value',{maxvalue:maxvalue,clvalue:clvalue});
//		maxage.setValue(res.maxvalue);
//		cl.setValue(res.clvalue);
		return true;
	}
	function getAllValues()
	{
		var values = main.getForm().getFieldValues();
		return values;
	}
	function setAllValues(values)
	{
		main.getForm().setValues(values);
	}
	var main =  new Ext.form.FormPanel( {
		id : "c2",
//		title : "max-age及Content-Length配置",
		width : 800,
		height : 400,
		labelWidth:150,
		items:[maxage,cl],
		baseCls: 'x-plain',
		re:function()
		{
			this.getForm().reset();
			maxage.setValue();
			cl.setValue();
		},
		isValueValid:function()
		{
			return valueValidate();
		},
		getAllValues:function()
		{
			return getAllValues();
		},
		setAllValues:function(values)
		{
			setAllValues(values);
		},
		getWinWidth:function(){return 614;},
		getWinHeight:function(){return 430;}
	});
	return main;
}