function getPage0()
{
	var tyradio = new Ext.form.Radio({
				name : 'taskType',
				fieldClass :'',
				boxLabel : '通用方式（实时计算）',
				checked : true,
				inputValue : '1'
			});
	var jtradio = new Ext.form.Radio({
				name : 'taskType',
				fieldClass:'',
				boxLabel : '集团方式（提前预置）',
				checked : false,
				inputValue : '2'
			});
	
	var taskType = new Ext.form.RadioGroup({
		fieldLabel : '获取方法',
		width :400,
		name : 'taskType',
		items : [tyradio, jtradio]
	});
	
	var taskId = new Ext.form.Hidden({name:'taskId'});
	var taskState = new Ext.form.Hidden({name:'taskState',value:'0'});
	function valueValidate()
	{
		return true;
	}
	function getAllValues()
	{
		return main.getForm().getFieldValues();
	}
	function setAllValues(values)
	{
		main.getForm().setValues(values);
	}
	var main = new Ext.form.FormPanel({
		id : "c0",
		title : "请选择探测任务方式",
		width : 800,
		height : 400,
		labelWidth:150,
		items:[taskType,taskId,taskState],
		baseCls: 'x-plain',
		re:function()
		{
			taskType.setValue({taskType:'1'})
			taskId.setValue();
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