base.portal.DmmIpQuaDetail = Ext.extend(Main.portal.PortalPage, {
                 init : function(params) {
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
                 	var columns = [new Ext.grid.RowNumberer(),
                 	  {header:'id',dataIndex:'domainIpQuaID',hidden:true},
                 	  {header:'域名',dataIndex:'domain',hidden:false},
                 	  {header:'网站',dataIndex:'webSiteName',hidden:false},
                 	  {header:'IP',dataIndex:'ip',hidden:false,where:150},
                 	  {header:'所属运营商',dataIndex:'operator',hidden:false,where:150,renderer:Ext.ux.renderer.Combo(operator)},
                 	  {header:'所属区域',dataIndex:'area',hidden:false,where:150,renderer:Ext.ux.renderer.Combo(area)},
                 	  {header:'所属系统',dataIndex:'system',hidden:false,where:150,renderer:Ext.ux.renderer.Combo(system)},
                 	  {header:'质量分数',dataIndex:'quaScore',hidden:false,where:150},
                 	  {header:'更新日期',dataIndex:'updateDate',hidden:false,where:150}
                 	];
                 	   var self=this;
			    	    this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'dmmOutgoingDomainEvalAction.getListIPQua',
				    	viewData:false,
						frame : false,
						border: false,
						columns:columns,
				    	columnLines : true,
				    	fetchSize : 15,
						width : 1100,
						height:260
				    	});  
                     },
		            updateData : function(data) {
						this.detailGrid.updateParams(data);
					},
					render : function(div) {
						var obj = (Ext.getDom(div));
						this.detailGrid.width = obj.offsetWidth;
						this.detailGrid.height = obj.offsetHeight;
						this.detailGrid.render(div);
					},
				
					run : function(data){
						this.updateData(data);
					},
					refresh:function(data)
					{
						this.updateData(data);
					}
			});