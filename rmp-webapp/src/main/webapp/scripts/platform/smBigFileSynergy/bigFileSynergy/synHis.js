/**
 * 局点间协同历史变化情况
 */
base.portal.synHis = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/ext-ux/DateTimeField/DateTimeField.js',
	         '/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'
	         ],
	links : ['/scripts/ext-ux/DateTimeField/DateTimePicker.css'],
	init : function(params){
		this.data = {};
		var self = this;
		
		//局点
		this.provinceCombo = new Ext.form.ComboBox({
			valueField: 'value',
			displayField:'name',
			mode:'local',
			width:120,
			value:'100000',
			typeAhead:true, 
			triggerAction : 'all',
			listeners:
				{
					select:function()
					{
						if(!Ext.isEmpty(self.provinceCombo.getValue()) && self.provinceCombo.getValue()== '000000')
							self.synProvCombo.setDisabled(true);
						else
							self.synProvCombo.setDisabled(false);
					}
				},
			store:provinceAllStore
		});
		//协同局点
		this.synProvCombo = new Ext.form.ComboBox({
			valueField: 'value',
			displayField:'name',
			mode:'local',
			value:'350000',
			width:120,
			typeAhead:true, 
			triggerAction : 'all',
			store:provinceStore
		});
		
		this.startTime = new Ext.ux.form.DateTimeField({
			width:170,
			value:new Date().add(Date.DAY, -1),
			format: 'Ymd H'
		});
		this.endTime = new Ext.ux.form.DateTimeField({
			width:170,
			value:new Date(),
			format: 'Ymd H'
		});
		this.searchBtn = new Ext.Button({text:'查询',iconCls: 'search-button', handler:function(){self.getMapData();}});
		
		this.lineData = new LineData();
		this.lineData.updateValuePer(0);
		this.lineChart = new AnyChart("swf/AnyChart.swf",
				"swf/Preloader.swf");
		this.lineChart.wMode = 'Transparent';		 
		this.linePanel = new Ext.Panel({baseCls : 'x-plain',style:'margin-left:5px',html:'<div style="width:1000;height:310;overflow:auto;"> <div id="linechart" style="width:1500"></div></div>'});
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			frame : true,
			baseCls : 'x-plain',
			tbar : [
			        {
						text : '局点'
					}, this.provinceCombo,
					{
						text : '协同局点'
					}, this.synProvCombo,
					{
						text : '开始时间'
					}, this.startTime,
					{
						text : '结束时间'
					}, this.endTime,this.searchBtn
				   ],												
			items : [this.linePanel]
		});
	},
	getParamsData : function() {
		var data = {};
		data.pro = this.provinceCombo.getValue();
		data.synPro = this.synProvCombo.disabled?'':this.synProvCombo.getValue();
		var strTim =  this.startTime.getValue();
		data.strTim = !Ext.isEmpty(strTim)?strTim.format('Ymd H:i:s'):'';
		var endTim =  this.endTime.getValue();
		data.endTim = !Ext.isEmpty(endTim)?endTim.format('Ymd H:i:s'):'';
		return data;
	},
	getMapData : function(data) {
		var parms = this.getParamsData();
		var self = this;
		M.rpc._call(Main.fun.Fun(self, self.updateMapData),'bigFileSynergyAction.getHis',{
			javaClass : 'java.util.HashMap',
			map : parms
		});
	},
	updateMapData : function(data) {
		this.lineData.setSeries(data.list,true);
		this.lineData.setTitle('总共协同文件'+data.count+'次',true);
		this.lineData.updateValuePer(0);
		this.lineChart.setJSData(this.lineData.getData());
	},
	render : function(div) {
		var obj = (Ext.getDom(div));
		this.lineChart.width = '100%';
		this.lineChart.height =obj.offsetHeight-42;
		this.mainPanel.render(div);
		this.lineChart.write('linechart');
	},
	refresh : function(data) {
		this.data = data;
		this.getMapData();
	},
	run:function()
	{
		this.getMapData();
	}
});