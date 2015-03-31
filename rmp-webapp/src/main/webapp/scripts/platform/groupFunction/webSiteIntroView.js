/**
 * 集团功能-各省网站引入视图
 */
var param={};
base.portal.webSiteIntroView = Ext.extend(Main.portal.PortalPage, {
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
		var url = "domainWebViewAction.do?param="+encodeURI(Ext.encode(param));
		window.open(url);
	}
}
];
		var gridColumns = [ new Ext.grid.RowNumberer(), {
			header: '省份',
			width: 160,
			sortable: true,
			dataIndex: 'province',
			hidden: true,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(province)
		}, {
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
			header: '域名总数',
			width: 120,
			sortable: true,
			dataIndex: 'domainNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '本网引入数',
			width: 100,
			sortable: true,
			dataIndex: 'netIntroNum',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: function(v, p, record, rowIndex, index, store){
				return ['<a href="#"><span>', v, '</span></a>&nbsp;'].join('');
			}
		}, {
			header: 'IDC引入数',
			width: 100,
			sortable: true,
			dataIndex: 'idcIntroNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: 'Cache引入数',
			width: 100,
			sortable: true,
			dataIndex: 'cacheIntroNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '直连引入数',
			width: 100,
			sortable: true,
			dataIndex: 'pdcIntroNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: 'CDN引入数',
			width: 100,
			sortable: true,
			dataIndex: 'cdnIntroNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '其他引入数',
			width: 100,
			sortable: true,
			dataIndex: 'otherIntroNum',
			hidden: false,
			align: 'right',
			hideable: false
		}, {
			header: '本网引入率',
			width: 100,
			sortable: true,
			dataIndex: 'netIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
			header: 'IDC引入率',
			width: 100,
			sortable: true,
			dataIndex: 'idcIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
			header: 'Cache引入率',
			width: 100,
			sortable: true,
			dataIndex: 'cacheIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
			header: '直连引入率',
			width: 100,
			sortable: true,
			dataIndex: 'pdcIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
			header: 'CDN引入率',
			width: 100,
			sortable: true,
			dataIndex: 'cdnIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
			header: '其他引入率',
			width: 100,
			sortable: true,
			dataIndex: 'otherIntroRate',
			hidden: false,
			align: 'right',
			hideable: false,
			renderer: Main.fun.getPerByRealForFour
		}, {
	        header: '更新日期',
	        width: 100,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'groupFunctionAction.getListWebSiteIntroView',
			columns:gridColumns,
			height: 390,
			frame : false,
			border: false,
			//bodyBorder: false,
			tbar: queryFields,
			fetchSize:15,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData: false,
			listeners:{
		   	    cellclick:function(data,row,col){
					
	    	      	var grid = self.grid;
					var record = grid.getSelectionModel().getSelected();
	    		    self.data.province=record.data.province;
					self.data.webSiteID=record.data.webSiteID;
	    		    self.data.webSiteName=record.data.webSiteName;
		    	    if(col != 5){
						self.notice(self.data);
		    	    }else{
						var conf = {
							href : 'portalAssemble.do?portalCode=domainIntroView&uxParams='+ encodeURI(Ext.encode(self.data)),
				      	    text:  '分省域名引入视图',
			   				icon: '',
			   				tipinfo: '',
			   				params: self.data
			   			};
						Main.fun.openWin(conf, 'tab' );
	    	       }
		       }
	    	}
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