/**
 * 域名归属评估-全网系统
 */
base.portal.dmDomainBelongSystem = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var system = new Ext.ux.seraph.DictCombo( {
			url: 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
			displayField: 'codeLabel',
			valueField: 'codeValue'
		});
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: '全网系统',
			width: 80,
			sortable: true,
			dataIndex: 'system',
			hidden: false,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(system)
		}, {
			header: '域名数量',
			width: 80,
			sortable: true,
			dataIndex: 'domainNum',
			align: 'right',
			hidden: false,
			hideable: false
		}, {
			header: '热点匹配度',
			width: 80,
			sortable: true,
			dataIndex: 'hotMatchDegree',
			align: 'right',
			hidden: false,
			hideable: false,
			renderer: function(v, p, record, rowIndex, index, store){
				return ['<a href="#"><span>', Main.fun.getPerByReal(v), '</span></a>&nbsp;'].join('');
			}
		}, {
	        header: '更新日期',
	        width: 80,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmDomainBelongEvaluationAction.getListDomainBelongSystem',
			columns:gridColumns,
			height: 260,
			frame : false,
			border: false,
			litePagingBar: true,
			sortBar : false,
			fetchSize:10,
			sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
			colspan : 8,
			columnLines : true,
			viewData: false,
			listeners:{
		   	    cellclick:function(data, row, col){
					if (col != 3) {
						return;
					}
	    	      	var grid = self.grid;
					var record = grid.getSelectionModel().getSelected();
	    		    self.data.hotBasis=record.data.hotBasis;
	    		    self.data.topN=record.data.topN;
					var conf = {
						href : 'portalAssemble.do?portalCode=dmWebsiteDomainView&uxParams='+ encodeURI(Ext.encode(self.data)),
			      	    text:  '全网系统域名视图',
		   				icon: '',
		   				tipinfo: '',
		   				params: self.data
		   			};
					Main.fun.openWin(conf, 'tab' );
		    	      
		    	}
	    	}
		});
	},
	render : function(div) {
		this.grid.render(div);
	},
	refresh : function(data) {
		this.updateData(data);
	},
	run : function(data){
//		this.updateData(data);
	},
	updateData : function(data) {
		this.grid.updateParams(data);
	}
});