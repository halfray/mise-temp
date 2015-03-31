function getPage4() {
	
	var operators = new Ajax('rmTaskGroups.do').call('getAllOperator',{value:'1'});
	var operatorItems = [];
	var allValueItems = [];
	var operpl = new Ext.form.NumberField({fieldLabel:'按运营商',emptyText:'批量储值',maxLength:10,listeners:
								{	
										change:function(){
												var value = this.getValue();
												for(var i = 0; i < operatorItems.length; i++)
												{
													operatorItems[i].items.itemAt(0).setValue(value);
												}
											}
								}
			});
	var operform = new Ext.form.FormPanel({labelWidth:80,labelAlign: 'right',layout:'form',items:[operpl],colspan:6});
	//运营商列表 
	for(var i = 0; i < operators.length; i++)
	{
		var item = new Ext.form.NumberField({fieldLabel:operators[i].codeLabel,maxLength:10,name:'opr'+operators[i].codeValue,width:30});
		if(operators[i].codeValue == "0000") continue;
		allValueItems[allValueItems.length] = item;
		operatorItems[operatorItems.length] = new Ext.form.FormPanel({labelWidth :80,layout:'form',labelAlign: 'right',items:[item]});
	}
	
	//添加运营商列表
	var allItems = [];
	allItems = allItems.concat(operform);
	allItems = allItems.concat(operatorItems);
	
	var hr = {xtype:'panel',labelWidth:80,html:'<hr>',colspan:6};
	allItems = allItems.concat(hr);
	
	//运营商下的省份列表
	var allOperatorsItems = [];
	for(var i = 0; i < operators.length; i++)
	{
		var name = operators[i].codeLabel;
		var value =  operators[i].codeValue;
		var childItems = [];
		var childlist = new Ajax('rmTaskGroups.do').call('getAllprovince',{value:value});
		var titleItem = new Ext.form.NumberField({
						fieldLabel:name+'按省份',
						index:i,
						childLength:childlist.length,
						emptyText:'批量储值',
						maxLength:10,
						listeners:
								{	
										change:function(){
												var value = this.getValue();
												for(var n = 0; n < this.childLength; n++)
												{
													allOperatorsItems[this.index][n].items.itemAt(0).setValue(value);
												}
											}
								}
			});
		var titleform = new Ext.form.FormPanel({labelWidth:120,labelAlign: 'right',layout:'form',items:[titleItem],colspan:6});	
		for(var j = 0; j < childlist.length;j++)
		{
			var item = new Ext.form.NumberField({fieldLabel:childlist[j].codeLabel,maxLength:10,name:'por'+value+"plr"+childlist[j].codeValue,width:30});
			allValueItems[allValueItems.length] = item;
			childItems[childItems.length] = new Ext.form.FormPanel({labelWidth :80,layout:'form',labelAlign: 'right',items:[item]});
			if(j== childlist.length - 1)
			{
				var p =  childlist.length % 6 + 1; //对6取余，获取需要多少才能进行填充
				childItems[j].colspan = p;
			}
		}
		
		allItems = allItems.concat(titleform);
		allItems = allItems.concat(childItems);
		allOperatorsItems[i] = childItems;
	}
	
	
	
	function getAllValues()
	{
		var values = {};
		for(var i = 0; i<allValueItems.length;i++)
		{
			var name = allValueItems[i].getName();
			var value = allValueItems[i].getValue();
			if(!Ext.isEmpty(value))
			{
				var res = Ext.decode("{'"+name+"':"+value+"}");
				Ext.apply(values,res);
			}
		}
		return values;
	}
	function resetAllValues()
	{
		for(var i = 0; i<allItems.length;i++)
		{
			if(!Ext.isEmpty(allItems[i].getForm))
			{
				allItems[i].getForm().reset();
				var items = allItems[i].items;
				for(var j = 0; j < items.getCount();j++)
				{
					items.itemAt(j).setValue();
				}
			}
		}
	}
	function setAllValues(values)
	{
		for(var i = 0; i<allItems.length;i++)
		{
			if(!Ext.isEmpty(allItems[i].getForm))
			{
				allItems[i].getForm().setValues(values);
			}
		}
	}
	function validateAll()
	{
		var result = true;
		for(var i = 0; i<allItems.length;i++)
		{
			if(!Ext.isEmpty(allItems[i].getForm))
			{
				if(!allItems[i].getForm().isValid())
				{
					result = false;
					break;
				}
			}
		}
		return result;
	}
	var main =  new Ext.Panel( {
		id : "c4",
//		title : "运营商及省份信息配置",
		width : 800,
		height : 400,
		layout:'table',
		baseCls: 'x-plain',
		layoutConfig: {columns: 6},
		items:allItems,
		autoScroll :true,
		re:function()
		{
			resetAllValues();
		},
		isValueValid:function()
		{
			return validateAll();
		},
		getAllValues:function()
		{
			return getAllValues();
		},
		setAllValues:function(values)
		{
			setAllValues(values);
		},
		getWinWidth:function(){return 800;},
		getWinHeight:function(){return 430;}
	});
	return main;
}