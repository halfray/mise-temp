var param={};
base.portal.dmDomainBetterResOverview = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
		var self = this;
				var province = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' 					 
				 });
				
				var queryFields = [
{
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "domainBetterViewAction.do?param="+encodeURI(Ext.encode(param));
		window.open(url);
	}
}
];
				
	      var columns = [
	                     new Ext.grid.RowNumberer(),
	                     {header:'省份',dataIndex:'province',hidden:false,width:200,renderer:Ext.ux.renderer.Combo(province)},
	                     {header:'网站',dataIndex:'webSiteName',hidden:false,width:240},
	                     {header:'网站ID',dataIndex:'webSiteID',hidden:true},
	                     {header:'可调度域名数',dataIndex:'dispDomainNum',hidden:false,width:240},	                     
	                     {header:'更新日期',dataIndex:'updatedate',hidden:false,width:240}
                    ];
				     var self=this;
				     this.data={};
			  	    this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'iDCCacheShare.getListBetterResOverview',
				    	viewData:false,
						frame : false,
						border: false,
						columns:columns,
				    	columnLines : true,
				    	fetchSize : 15,
				    	tbar: queryFields,
						width : 1100,
						height:260,
						listeners : {
	    	    	      rowclick:Main.fun.Fun(self,function(data){
			    	    	 var grid=this.detailGrid;
					    	 var record = grid.getSelectionModel().getSelected();			    		
					    	 this.data.webSiteID = record.data.webSiteID;
					    	 this.data.province = record.data.province;
					    	 this.notice(this.data);	
	    	               })
				           }		    
				    	});
			  	    },	
			  	  getGridData : function() {
		    			var self = this;
		    			var data = this.data;						    			
		    			this.detailGrid.setParams(data);
		    			this.detailGrid.doSearchList();
		    		},
		    		render : function(div) {
		    			var obj = (Ext.getDom(div));
						this.detailGrid.width = obj.offsetWidth;
						this.detailGrid.height = obj.offsetHeight;
		    			this.detailGrid.render(div);
		    		},
		    		refresh : function(data) {
		    			param = data;
		    			this.data = data;
		    			this.getGridData();
		    		},
		    		getExcelData: function() {
		    			var grid=this.detailGrid;
		    			var tbar = grid.getTopToolbar();
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