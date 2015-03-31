/**
 * 域名归属评估-区域
 */
base.portal.dmDomainBelongProvince = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		var province = new Ext.ux.seraph.DictCombo( {
			url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
			displayField: 'codeLabel',
			valueField: 'codeValue'
		});
		var gridColumns = [ new Ext.grid.RowNumberer(),  {
			header: '区域',
			width: 170,
			sortable: true,
			dataIndex: 'province',
			hidden: false,
			hideable: false,
			renderer: Ext.ux.renderer.Combo(province)
		}, {
			header: '域名数量',
			width: 120,
			sortable: true,
			dataIndex: 'domainNum',
			align: 'right',
			hidden: false,
			hideable: false
		}, {
			header: '热点匹配度',
			width: 120,
			sortable: true,
			dataIndex: 'hotMatchDegree',
			align: 'right',
			hidden: false,
			hideable: false,
			renderer: function(v, p, record, rowIndex, index, store){
				return Main.fun.getPerByReal(v);
			}
		}, {
			header: '排序依据',
			width: 120,
			sortable: true,
			dataIndex: 'hotBasis',
			hidden: true,
			hideable: false
		}, {
			header: 'topN',
			width: 120,
			sortable: true,
			dataIndex: 'topN',
			hidden: true,
			hideable: false
		}, {
	        header: '更新日期',
	        width: 90,
	        sortable: true,
	        dataIndex: 'updateDate',
	        hidden: false,
	        hideable: false
	    }];
		
		this.grid = new Ext.ux.Grid({
			dataMethod:'dmDomainBelongEvaluationAction.getListDomainBelongProvince',
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
			viewData:false,
//			listeners:{
//		   	    cellclick:function(data,row,col){
//					
//	    	      	var grid = self.grid;
//					var record = grid.getSelectionModel().getSelected();
//	    		    self.data.province=record.data.province;
//	    		    self.data.hotBasis=record.data.hotBasis;
//	    		    self.data.topN=record.data.topN;
//		    	    if(col!=3){
//						self.notice(self.data);
//		    	    }else{
//						var conf = {
//							href : 'portalAssemble.do?portalCode=dmDomainView&uxParams='+ encodeURI(Ext.encode(self.data)),
//				      	    text:  '分省域名视图',
//			   				icon: '',
//			   				tipinfo: '',
//			   				params: self.data
//			   			};
//						Main.fun.openWin(conf, 'tab' );
//		    	      }
//		    	 }
//	    	}
			listeners: {	
				rowclick: Main.fun.Fun(self, self.onRowClick)
		    }
		});
	},  
	onRowClick: function(data) {
		var grid=this.grid;
		this.data.province = grid.getSelect('province')
		this.data.hotBasis = grid.getSelect('hotBasis')
		this.data.topN = grid.getSelect('topN')
		this.notice(this.data);	
		
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