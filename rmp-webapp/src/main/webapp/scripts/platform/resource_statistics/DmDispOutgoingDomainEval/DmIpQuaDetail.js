base.portal.DmIpQuaDetail = Ext.extend(Main.portal.PortalPage, {
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
                 	  {header:'域名',dataIndex:'domain',hidden:false,width:130},
                 	  {header:'网站',dataIndex:'webSiteName',hidden:false},
                 	  {header:'IP',dataIndex:'ip',hidden:false,width:120},
                 	  {header:'所属运营商',dataIndex:'operator',hidden:false,width:120,renderer:Ext.ux.renderer.Combo(operator)},
                 	  {header:'所属区域',dataIndex:'area',hidden:false,width:120,renderer:Ext.ux.renderer.Combo(area)},
                 	  {header:'所属系统',dataIndex:'system',hidden:false,width:120,renderer:Ext.ux.renderer.Combo(system)},
                 	  {header:'质量分数',dataIndex:'quaScore',hidden:false},
                 	  {header:'更新日期',dataIndex:'updateDate',hidden:false}
                 	];
                 	   var self=this;
			    	    this.detailGrid = new Ext.ux.Grid({
				    	dataMethod:'dmOutgoingDomainEvalAction.getListIPQuaForDispatch',
				    	viewData:false,
						frame : false,
						border: false,
						columns:columns,
				    	columnLines : true,
				    	fetchSize : 15,
						width : 1100,
						height:260,
						root : 'result.list'
				    	});  
                     },
		            updateData : function(data) {
						this.detailGrid.updateParams(data);
					},
					render : function(div) {
						var obj = (Ext.getDom(div));
						this.detailGrid.width = obj.offsetWidth-15;
						this.detailGrid.height = obj.offsetHeight-15;
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