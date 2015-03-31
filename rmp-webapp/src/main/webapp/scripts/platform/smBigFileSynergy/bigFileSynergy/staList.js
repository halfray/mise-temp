/**
 * 局点间协同统计信息
 */
base.portal.staList = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'],
	init : function(params){
		this.data = {};
		var self = this;
		this.staDate = new Ext.form.DateField({
			name:'staDate',
			width:150,
			value:new Date(),
			listeners:
				{
					select:Main.fun.Fun(self,self.getGridData)
				},
			format:'Ymd'
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
			header : '协同次数',
			width : 120,
			sortable : true,
			dataIndex : 'synNum',
			hidden : false,
			hideable : false
		}, {
			header : '协同流量(MB)',
			width : 120,
			sortable : true,
			dataIndex : 'synFlow',
			renderer:Main.fun.getMFromByte,
			hideable : false
		},{
			header:'节省带宽(Mbps)',
			width : 120,
			sortable : true,
			dataIndex : 'SaveBroadband',
			hideable : false
		}];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'bigFileSynergyAction.getStaList',
			columns:gridColumns,
			showPagingBar:false,
			height:255,
			style:'margin-left:10px',
			frame : false,
			border: false,
			//bodyBorder: false,
			fetchSize:10,
			viewData:false,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			columnLines : true
		});
		
		
		this.mainPanel = new Ext.Panel({
			layout : 'column',
			frame : true,
			baseCls : 'x-plain',
			tbar : [{
						text : '统计时间'
					}, this.staDate],												
			items : [this.grid]
		});
	},
	getGridData : function() {
		var self = this;
		var data = this.data;
		var value = this.staDate.getValue();
		if (Ext.isEmpty(value))
			return;
		data.staDate = value.format('Ymd');
		this.grid.setParams(data);
		this.grid.doSearchList();
	},
	render : function(div) {
		var obj = (Ext.getDom(div));
		this.grid.width = obj.offsetWidth;
		this.grid.height = obj.offsetHeight-20;
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