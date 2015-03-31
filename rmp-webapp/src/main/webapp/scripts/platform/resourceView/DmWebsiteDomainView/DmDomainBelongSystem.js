base.portal.DmDomainBelongSystem = Ext.extend(Main.portal.PortalPage, {
	           init : function(params) {
					var orgCodeField = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
						displayField : 'codeLabel',
						valueField : 'codeValue'
					 });
	              var columns = [new Ext.grid.RowNumberer(),
		              {header:'id',dataIndex:'domainBelongSystemID',hidden:true,width:220},
		              {header:'系统',dataIndex:'system',hidden:false,width:220,renderer:Ext.ux.renderer.Combo(orgCodeField)},
		              {header:'域名数量',dataIndex:'domainNum',hidden:false,width:220},
		              {header:'热点匹配度',dataIndex:'HotMatchingDegree',hidden:false,width:220,renderer:Main.fun.getPerByReal},
		              {header:'更新日期',dataIndex:'updateDate',hidden:false,width:220}
	                ];
			          	var self=this;
				    	this.data={};					   
			    	    this.detailGrid = new Ext.ux.Grid({
					    	dataMethod:'dmWebsiteDomainViewAction.getListMatchDegree',
					    	viewData:false,
							frame : false,
							border: false,
							columns:columns,
					    	columnLines : true,
					    	fetchSize : 15,
							width : 1100,
							height:260,
							listeners : {
			    	    	      rowclick:Main.fun.Fun(self,function(data){
					    	    	 var grid=this.detailGrid;
							    	 var record = grid.getSelectionModel().getSelected();			    		
							    	 this.data.system = record.data.system;
							    	 this.data.domainNum=record.data.domainNum;
							    	 this.notice(this.data);	
			    	               })
						    }
				    	});
			    	    /*this.system = new Ext.ux.seraph.DictCombo( { 
				    		url :
							  'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 
							   displayField : 'codeLabel',
						       valueField : 'codeValue' ,
						       value : '0000',
						       width : 120,
						       id:'#local',
						       listeners:{
						       	 select:function(){
						       	 	self.getMapData();
						       	 }
						       }
				    	});
				    	this.mainPanel = new Ext.Panel({
							layout : 'fit',
							frame : true,
							baseCls : 'x-plain',
							tbar : [{
										text : '系统'
									}, this.system],												
							items : [this.detailGrid]
						});*/
                 },     
                 getParams:function()
				 {	
					/*var value = this.system.getValue();
					this.data.system = value;*/
					return this.data 	
				 },
				 getMapData : function() {
				 	var sels=this;
				 	var data=this.getParams();
				    this.detailGrid.updateParams(data);
				    this.notice({});
				},
				render : function(div) {
					var obj = (Ext.getDom(div));
					this.detailGrid.width = obj.offsetWidth;
					this.detailGrid.height = obj.offsetHeight-15;
					//this.mainPanel.render(div);
					this.detailGrid.render(div);
				},
			
				run : function(data){
					this.getMapData(data);
				},
				refresh:function(data)
				{
					this.data=data;
					this.getMapData(data);
				}		       
});