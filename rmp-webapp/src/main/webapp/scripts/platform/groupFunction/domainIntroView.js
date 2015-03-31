/**
 * 集团功能-各省域名引入视图
 */
var self=this;
var param={};
base.portal.domainIntroView = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
var queryFields = [
{
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "domainIntroViewAction.do?param="+encodeURI(Ext.encode(self.data));
		window.open(url);
	}
},
{text:'IDC引入'},
new Ext.ux.seraph.DictCombo( {	
		id:'isIDC',
		emptyText:'',
	   url :
	  'systemParmsProvider.do?type=boolean_value_LIST', 
	   displayField : 'codeLabel',
       valueField : 'codeValue' ,    
       width : 70,
       listeners:{
    	 select:function(){
    	 	self.getMapData();
    	 }
       }
}),
{text:'Cache引入'},
new Ext.ux.seraph.DictCombo( {	
	id:'isCache',
	emptyText:'',
   url :
  'systemParmsProvider.do?type=boolean_value_LIST', 
   displayField : 'codeLabel',
   valueField : 'codeValue' ,    
   width : 70,
   listeners:{
	 select:function(){
	 	self.getMapData();
	 }
   }
}),
{text:'直连引入'},
new Ext.ux.seraph.DictCombo( {	
	id:'isPDC',
	emptyText:'',
   url :
  'systemParmsProvider.do?type=boolean_value_LIST', 
   displayField : 'codeLabel',
   valueField : 'codeValue' ,    
   width : 70,
   listeners:{
	 select:function(){
	 	self.getMapData();
	 }
   }
}),
{text:'CDN引入'},
new Ext.ux.seraph.DictCombo( {	
	id:'isCDN',
	emptyText:'',
   url :
  'systemParmsProvider.do?type=boolean_value_LIST', 
   displayField : 'codeLabel',
   valueField : 'codeValue' ,    
   width : 70,
   listeners:{
	 select:function(){
	 	self.getMapData();
	 }
   }
}),
{text:'其他引入'},
new Ext.ux.seraph.DictCombo( {	
	id:'isOther',
	emptyText:'',
   url :
  'systemParmsProvider.do?type=boolean_value_LIST', 
   displayField : 'codeLabel',
   valueField : 'codeValue' ,    
   width : 70,
   listeners:{
	 select:function(){
	 	self.getMapData();
	 }
   }
}),
{text:'本网引入'},
new Ext.ux.seraph.DictCombo( {	
	id:'isNet',
	emptyText:'',
   url :
  'systemParmsProvider.do?type=boolean_value_LIST', 
   displayField : 'codeLabel',
   valueField : 'codeValue' ,    
   width : 70,
   listeners:{
	 select:function(){
	 	self.getMapData();
	 }
   }
})
];
		var gridColumns = [ new Ext.grid.RowNumberer(), {
			header: '网站ID',
			width: 160,
			sortable: true,
			dataIndex: 'webSiteID',
			hidden: true,
			hideable: false
		}, {
			header: '网站',
			width: 120,
			sortable: true,
			dataIndex: 'webSiteName',
			hidden: false,
			hideable: false
		}, {
			header: '域名',
			width: 120,
			sortable: true,
			dataIndex: 'domain',
			hidden: false,
			hideable: false
		}, {
			header: 'IP地址',
			width: 120,
			sortable: true,
			dataIndex: 'IP',
			hidden: false,
			hideable: false
		}, {
			header: 'IDC引入',
			width: 82,
			sortable: true,
			dataIndex: 'isIDC',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
			
		}, {
			header: 'Cache引入',
			width: 82,
			sortable: true,
			dataIndex: 'isCache',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
		}, {
			header: '直连引入',
			width: 82,
			sortable: true,
			dataIndex: 'isPDC',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
		}, {
			header: 'CDN引入',
			width: 82,
			sortable: true,
			dataIndex: 'isCDN',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
		}, {
			header: '其他引入',
			width: 82,
			sortable: true,
			dataIndex: 'isOther',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
		}, {
			header: '本网引入',
			width: 82,
			sortable: true,
			dataIndex: 'isNet',
			hidden: false,
			hideable: false,
			renderer: Main.fun.ableToCNStr
		}, {
	        header: '更新日期',
	        width: 82,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'groupFunctionAction.getListDomainIntroView',
			columns:gridColumns,
			height: 390,
			frame : false,
			border: false,
			//bodyBorder: false,
//			fetchSize:10,
			tbar: queryFields,
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
		this.data=data;
		this.getMapData(data);
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
	},
	getParams:function()
	{	
		var value = Ext.getCmp('isIDC').getValue();
		this.data.isIDC = value;
		var isCacheValue = Ext.getCmp('isCache').getValue();
		this.data.isCache=isCacheValue;
		var isPDCValue = Ext.getCmp('isPDC').getValue();
		this.data.isPDC=isPDCValue;
		var isCDNValue = Ext.getCmp('isCDN').getValue();
		this.data.isCDN=isCDNValue;
		var isOtherValue = Ext.getCmp('isOther').getValue();
		this.data.isOther=isOtherValue;
		var isNetValue = Ext.getCmp('isNet').getValue();
		this.data.isNet=isNetValue;
		return this.data;
	},
	 getMapData : function() {
	 	var sels=this;
	 	var data=this.getParams();
	    this.grid.updateParams(data);
	}
});