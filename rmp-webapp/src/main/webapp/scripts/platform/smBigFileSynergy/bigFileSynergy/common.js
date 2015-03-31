var provinceList = 
	[
	 	["北京","100000"],
	 	["福建","350000"]
	 ];
var provinceStore = new Ext.data.ArrayStore({
	fields:['name','value'],
	data:provinceList
});
var provinceAllList = 
	[
	 ["北京","100000"],
	 ["福建","350000"],
	 ["合计","000000"]
	 ];
var provinceAllStore = new Ext.data.ArrayStore({
	fields:['name','value'],
	data:provinceAllList
});
var sortByList=
	[
	 ['协同次数','synNum'],
	 ['协同流量','synFlow']
	];
var sortByStore = new Ext.data.ArrayStore({
	fields:['name','value'],
	data:sortByList
});

//局点
var provinceCombo = new Ext.form.ComboBox({
	valueField: 'value',
	displayField:'name',
	mode:'local',
	typeAhead:true, 
	triggerAction : 'all',
	store:provinceAllStore
});
//协同局点
var synProvCombo = new Ext.form.ComboBox({
	valueField: 'value',
	displayField:'name',
	mode:'local',
	typeAhead:true, 
	triggerAction : 'all',
	store:provinceAllStore
});
