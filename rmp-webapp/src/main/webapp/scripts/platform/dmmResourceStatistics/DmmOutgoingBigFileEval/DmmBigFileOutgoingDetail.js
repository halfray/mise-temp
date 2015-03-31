base.portal.DmmBigFileOutgoingDetail = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
				var province = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' ,
				    value : '510000',
				    width : 120,
				    id:'#local'
				 });
				var p1= new Ext.ux.seraph.DictCombo( { 
					url :
					'parmInfoProvider.do?parmType=YES_NO', 
					displayField : 'parmName',
				    valueField : 'parmCode'			        
				 });
			var columns = [new Ext.grid.RowNumberer(),
			          {header:'URL',dataIndex:'URL',hidden:false},
			          {header:'域名',dataIndex:'domain',hidden:false,width:130},
			          {header:'网站',dataIndex:'webSiteName',hidden:false},
			          {header:'出网IP',dataIndex:'outgoingIp',hidden:false},
			          {header:'是否适合缓存',dataIndex:'enableCache',hidden:false,renderer:Ext.ux.renderer.Combo(p1)},
			          {header:'DNS解析次数',dataIndex:'URLDNSResolNum',hidden:false},
			          {header:'请求次数',dataIndex:'URLReqNum',hidden:false},
			          {header:'总流量(MB)',dataIndex:'URLAllFlow',hidden:false,renderer:Main.fun.getMFromByte},
			          {header:'上行流量(MB)',dataIndex:'URLUpFlow',hidden:false,renderer:Main.fun.getMFromByte},
			          {header:'下行流量(MB)',dataIndex:'URLDownFlow',hidden:false,renderer:Main.fun.getMFromByte},
			          {header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
			          {header:'更新日期',dataIndex:'updateDate',hidden:false}                              
			       ];	 
		            var self=this;
		       	    this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'dmmOutgoingBigFileEvalAction.getListOutgoingBigFile',
				    	viewData:false,
						frame : false,
						border: false,
						columns:columns,
				    	columnLines : true,
				    	fetchSize : 10,
						width : 1100,
						height:260,
						listeners :{	
			       	            rowclick:Main.fun.Fun(self,function(data){
			    	    	    var grid=this.detailGrid;
					    	    var record = grid.getSelectionModel().getSelected();    		
					    	    this.data.domain=record.data.domain;
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
					this.data = data;
					this.getGridData();
				}	
				});