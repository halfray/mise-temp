function getPage3() {

	Ext.override(Ext.form.TextField, {
				unitText : '',
				onRender : function(ct, position) {
					Ext.form.TextField.superclass.onRender.call(this, ct,position);
					// 如果单位字符串已定义 则在后方增加单位对象
					if (this.unitText != '') {
						this.unitEl = ct.createChild({
									tag : 'div',
									html : this.unitText
								});
						this.unitEl.addClass('x-form-unit');
						// 同时修改错误提示图标的位置
						this.alignErrorIcon = function() {
							this.errorIcon
									.alignTo(this.unitEl, 'tl-tr', [2, 0]);
						};
					}
				}
			});


	var headradio = new Ext.form.Radio({
				name : 'getType',
				fieldClass :'',
				boxLabel : 'HEAD(仅头部)',
				checked : true,
				inputValue : '1'
			});
	var getradio = new Ext.form.Radio({
				name : 'getType',
				fieldClass :'',
				boxLabel : 'GET(包含全部)',
				checked : false,
				inputValue : '2'
			});
	var getType = new Ext.form.RadioGroup({
				fieldLabel : '获取方法',
				width :300,
				name : 'getType',
				items : [headradio, getradio]
			});

	var getSj = new Ext.form.NumberField({
				fieldLabel : 'get数据包',
				allowBlank : false,
				unitText : '字节',
				maxLength:4,
				name : 'getsj'
			});
	var tccs = new Ext.form.NumberField({
				fieldLabel : '探测次数',
				unitText : '<5次，建议2次',
				allowBlank : false,
				maxLength:10,
				name : 'tccs'
			});
	var cssj = new Ext.form.NumberField({
				fieldLabel : '超时时间',
				allowBlank : false,
				unitText : '毫秒',
				maxLength:9,
				name : 'cssj'
			});
	var rwzq = new Ext.form.NumberField({
				fieldLabel : '任务周期',
				allowBlank : false,
				maxLength:10,
				unitText : '秒',
				name : 'rwzq'
			});
	function getAllValues() {
		var values = main.getForm().getFieldValues();
		return values;
	}
	function setAllValues(values)
	{
		main.getForm().setValues(values);
	}
	var main = new Ext.form.FormPanel({
				id : "c3",
//				title : "任务参数配置",
				width : 800,
				height : 400,
				baseCls: 'x-plain',
				items : [getType, getSj, tccs, cssj, rwzq],
				re : function() {
					this.getForm().reset();
					getType.setValue("1");
					getSj.setValue();
					tccs.setValue();
					cssj.setValue();
					rwzq.setValue();
				},
				isValueValid : function() {
					return this.getForm().isValid();
				},
				getAllValues : function() {
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