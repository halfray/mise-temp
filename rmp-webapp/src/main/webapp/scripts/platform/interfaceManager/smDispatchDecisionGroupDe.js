base.portal.smDispatchDecisionGroupDe=Ext.extend(Main.portal.PortalPage, {
                  init:function(params)	{
				   	var province = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 
					    });
				   	var operator = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0001_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 					 			
					 });
				   	var orgCodeField = new Ext.ux.seraph.DictCombo( {
						url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
						displayField : 'codeLabel',
						valueField : 'codeValue'
					 });
	                   var column=[
									new Ext.grid.RowNumberer(),
									{header:'域名',dataIndex:'domain',hidden:false,width:160},
									{header:'IP',dataIndex:'ip',hidden:false,width:150},
									{header:'IP所属运营商',dataIndex:'operator',hidden:false,renderer:Ext.ux.renderer.Combo(operator)},
									{header:'IP所属省份',dataIndex:'province',hidden:false,width:110,renderer:Ext.ux.renderer.Combo(province)},
									{header:'IP所属系统',dataIndex:'system',hidden:false,width:110,renderer:Ext.ux.renderer.Combo(orgCodeField)},
									{header:'IP质量分',dataIndex:'quaStore',hidden:false,width:110},
									{header:'下发时间',dataIndex:'issuedTime',hidden:false,width:130}
	                               ];	
	                   var self=this;
	                     this.data={};
	                     this.detailGrid = new Ext.ux.Grid({
	                    		dataMethod:'smDnsRuleResolveIssueAction.getListDnsRuleResolveIssue',
	                    		viewData:false,
	        					frame : false,
	        					border: false,
	        					showPagingBar:false,
	        					columns:column,
	        			    	columnLines : true,
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