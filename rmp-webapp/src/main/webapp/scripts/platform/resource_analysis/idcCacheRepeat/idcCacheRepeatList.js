/**
 * 集团功能-IDC/Cache排重
 */
var param={};
base.portal.idcCacheRepeatList = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var province = new Ext.ux.seraph.DictCombo( {
			url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
			displayField: 'codeLabel',
			valueField: 'codeValue'
		});
		
		var queryFields = [
{
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "domainCacheViewAction.do?param="+encodeURI(Ext.encode(param));
		window.open(url);
	}
}
];
		
		var gridColumns = [ new Ext.grid.RowNumberer(), {
			header: '省份',
			width: 160,
			sortable: true,
			dataIndex: 'province',
			hidden: false,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(province)
		}, {
			header: '域名',
			width: 160,
			sortable: true,
			dataIndex: 'domain',
			hidden: false,
			hideable: false
		}, {
			header: 'IDC引入IP',
			width: 240,
			sortable: true,
			dataIndex: 'ip_200',
			hidden: false,
			hideable: false
		}, {
			header: 'IDC占比',
			width: 80,
			sortable: true,
			dataIndex: 'idc',
			hidden: false,
			hideable: false,
			hidden: true,
			renderer:function(value){
				if(value != null){
					return (value).toFixed(2)+'%'
				}else{
					return '0.00%'
				}
			}
		}, {
			header: 'Cache引入IP',
			width: 240,
			sortable: true,
			dataIndex: 'ip_300',
			hidden: false,
			hideable: false
		}, {
			header: 'CACHE占比',
			width: 80,
			sortable: true,
			dataIndex: 'cache',
			hidden: false,
			hideable: false,
			hidden: true,
			renderer:function(value){
				if(value != null){
					return (value).toFixed(2)+'%'
				}else{
					return '0.00%'
				}
			}
		}, {
	        header: '更新日期',
	        width: 120,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'iDCCacheRepeatAction.getListIDCCacheRepeat',
			columns:gridColumns,
			height: 355,
			frame : false,
			border: false,
			//bodyBorder: false,
			tbar: queryFields,
			fetchSize:15,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData: false
		});
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		param = data;
		this.updateData(data);
	},
	run : function(data){
//		this.updateData(data);
	},
	updateData : function(data) {
		this.grid.updateParams(data);
	},
	
	getExcelData: function() {
		var tbar = this.grid.getTopToolbar();
		var queryFields = tbar.findByType('field');
		var data = '{';
		for(var i = 0; i < queryFields.length;i++)
		{
			data= data+ queryFields[i].getName() + " : '" + queryFields[i].getValue()+"' ,";
			if(i == queryFields.length-1){
				data= data.substr(0,data.lastIndexOf(','));
			}
		}
		data = data+'}'
		return data;
	}
});