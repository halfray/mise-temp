/**
 *局点协同TOPN排序
 */
base.portal.synTopN = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/ext-ux/DateTimeField/DateTimeField.js',
	         '/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'
	         ],
	links : ['/scripts/ext-ux/DateTimeField/DateTimePicker.css'],
	init : function(params){
		this.data = {};
		var self = this;
		
		//局点
		this.provinceCombo = new Ext.form.ComboBox({
			name:'prov',
			valueField: 'value',
			displayField:'name',
			fieldLabel:'局点',
			mode:'local',
			value:'100000',
			width:120,
			typeAhead:true, 
			triggerAction : 'all',
			store:provinceStore
		});
		//协同局点
		this.synProvCombo = new Ext.form.ComboBox({
			name:'synProv',
			valueField: 'value',
			displayField:'name',
			fieldLabel:'协同局点',
			mode:'local',
			width:120,
			value:'350000',
			typeAhead:true, 
			triggerAction : 'all',
			store:provinceStore
		});
		//开始时间
		this.startTime = new Ext.ux.form.DateTimeField({
			name:'startTim',
			width:190,
			fieldLabel:'开始时间',
			value:new Date().add(Date.DAY, -1),
			format: 'Ymd H:i'
		});
		//结束时间
		this.endTime = new Ext.ux.form.DateTimeField({
			name:'endTim',
			width:190,
			fieldLabel:'结束时间',
			value:new Date(),
			format: 'Ymd H:i'
		});
		this.topN = new Ext.form.NumberField({
			fieldLabel:'TOPN',
			name:'topN',
			width:110,
			value:1000
		});
		//排序依据
		this.sortByCombo = new Ext.form.ComboBox({
			valueField: 'value',
			name:'sortBy',
			displayField:'name',
			fieldLabel:'排序依据',
			mode:'local',
			width:120,
			value:'synNum',
			typeAhead:true, 
			triggerAction : 'all',
			store:sortByStore
		});
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header : '局点',
			width : 120,
			sortable : true,
			dataIndex : 'province',
			hidden : false,
			renderer:Ext.ux.renderer.Combo(provinceCombo),
			hideable : false
		}, {
			header : '协同局点',
			width : 120,
			sortable : true,
			dataIndex : 'synProv',
			renderer:Ext.ux.renderer.Combo(provinceCombo),
			hidden : false,
			hideable : false
		}, {
			header : 'URL',
			width : 250,
			sortable : true,
			dataIndex : 'url',
			hidden : false,
			hideable : false
		},{
			header : '协同次数',
			width : 140,
			sortable : true,
			dataIndex : 'synNum',
			hidden : false,
			hideable : false
		}, {
			header : '协同流量(MB)',
			width : 140,
			sortable : true,
			dataIndex : 'synFlow',
			renderer:Main.fun.getMFromByte,
			hideable : false
		}];
		this.tarPanel = new Ext.form.FormPanel({
				frame:false,
				baseCls:'x-plain-tbar',
				cls:'x-panel-backgroundPic',
				style:'margin-bottom:10px;margin-top:-10px',
				width:900,
				items:[
				       	{xtype:'panel',layout:'column',defaults:{labelWidth:50},
				       		items:[
                                 {columnWidth:.3,layout:'form',items:[self.startTime]},
                                 {columnWidth:.3,layout:'form',items:[self.provinceCombo]},
                                 {columnWidth:.3,layout:'form',items:[self.synProvCombo]}
                                 ]
				       	},
				       	{xtype:'panel',layout:'column',defaults:{labelWidth:50},
				       		items:[
				       		     {columnWidth:.3,layout:'form',items:[self.endTime]},
                                 {columnWidth:.3,layout:'form',items:[self.topN]},
                                 {columnWidth:.3,layout:'form',items:[self.sortByCombo]}
                                 ]
				       	}
				       ]
		});
		this.grid = new Ext.ux.Grid({
			dataMethod:'bigFileSynergyAction.getTopList',
			columns:gridColumns,
			frame : false,
			border: false,
			bodyBorder: false,
			fetchSize:10,
			viewData:false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			columnLines : true
		});
		
		
		this.mainPanel = new Ext.Panel({
			layout : 'fit',
			frame : true,
			height:345,
			baseCls : 'x-plain',
			tbar : [this.tarPanel,{xtype:'button',text:'查询',iconCls: 'search-button', handler:function(){self.getGridData()}}],												
			items : [this.grid]
		});
	},
	getGridData : function() {
		var self = this;
		var data = this.tarPanel.getForm().getFieldValues();
		data.startTim = Ext.isEmpty(data.startTim)?'':data.startTim.format('Ymd H:i:s');
		data.endTim = Ext.isEmpty(data.endTim)?'':data.endTim.format('Ymd H:i:s');
		this.grid.setParams(data);
		this.grid.doSearchList();
	},
	render : function(div) {
		var obj = (Ext.getDom(div));
		this.grid.width = obj.offsetWidth;
		this.grid.height = obj.offsetHeight-65;
		this.mainPanel.getTopToolbar().removeClass('x-toolbar');
		this.mainPanel.getTopToolbar().removeClass('x-plain-tbar');
		this.mainPanel.getTopToolbar().addClass('x-panel-backgroundPic');
		this.mainPanel.render(div);
	},
	refresh : function(data) {
		this.data = data;
		this.getGridData();
	},
	run:function()
	{
		this.getGridData();
	}
});