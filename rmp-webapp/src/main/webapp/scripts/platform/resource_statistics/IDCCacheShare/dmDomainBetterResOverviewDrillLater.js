var param={};
base.portal.dmDomainBetterResOverviewDrillLater = Ext.extend(Main.portal.PortalPage, {
      init : function(params) {
	var self = this;
	var queryFields = [
{
	text: '导出', 
	iconCls: 'toolbar-down-icon', 
	handler : function() {
		var url = "domainResViewAction.do?param="+encodeURI(Ext.encode(param));
		window.open(url);
	}
}
];
					var operator = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 					 			
					 });
					var area = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 					 			
					 });
					var system = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 					 			
					 });
					var province = new Ext.ux.seraph.DictCombo( { 
						url :
					    'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 					 
					 });
                var columns =[new Ext.grid.RowNumberer(),
                             {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
                             {header:'网站',dataIndex:'webSiteName',hidden:false},                             
                             {header:'域名',dataIndex:'domain',hidden:false,width:120},
                             {header:'IP地址',dataIndex:'IP',hidden:false,width:120},                             
                             {header:'所属运营商',dataIndex:'operator',hidden:false,renderer:Ext.ux.renderer.Combo(operator)},
                             {header:'所属区域',dataIndex:'area',hidden:false,renderer:Ext.ux.renderer.Combo(area)},
                             {header:'所属系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system)},
                             {header:'网内可调度个数',dataIndex:'inDispNum',hidden:false},
                             {header:'更新日期',dataIndex:'updatedate',hidden:false}                       
                         ];
					       	var self=this;
					    	this.data={};
				    	    this.detailGrid = new Ext.ux.GroupGrid({
				    	    	stateful:true,
								stateId:'detailGrid-statesave-grid',
						    	dataMethod:'iDCCacheShare.getList',
						    	viewData:false,
						    	autoScroll : true,
								frame : false,
								border: false,
								columns:columns,
						    	columnLines : true,
						    	fetchSize : 15,
						    	tbar: queryFields,
								width : 1100,
								height:260,
								hideGroupedColumn:true,
								view:new Ext.grid.GroupingView({
									hideGroupedColumn:Ext.isDefined(this.hideGroupedColumn)?this.hideGroupedColumn:true,
									showGroupName:Ext.isDefined(this.showGroupName)?this.showGroupName:true,
									groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
								 }),
								showGroupName:true,
								groupField:'domain',
								sortField:'domain',
								listeners : {
			    	    	      rowclick:Main.fun.Fun(self,function(data){
						    	    	 var grid=this.detailGrid;
								    	 var record = grid.getSelectionModel().getSelected();			    		
								    	 this.data.domain = record.data.domain;
								    	 this.data.province = record.data.province;  
								    	 this.data.IP = record.data.IP;
//								    	 alert(record.data.IP);
								    	 this.notice(this.data);	
				    	               })
							           }		    
							    	});
						  	    },	 getGridData : function() {
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