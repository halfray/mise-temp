base.portal.smBigfileCacheViewDetail = Ext.extend(Main.portal.PortalPage, {
	    init : function(params){
			var province = new Ext.ux.seraph.DictCombo( { 
				url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
				displayField : 'codeLabel',
			    valueField : 'codeValue' 					 			
			 });
	       var columns = [ new Ext.grid.RowNumberer(),
	             {header:'ID',dataIndex:'smBigFileCacheViewDetailId',hidden:true},
	             {header:'cache节点',dataIndex:'nodeId',width:120,hidden:false},
	             {header:'省份',dataIndex:'province',width:80,hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	             {header:'级别',dataIndex:'level',hidden:false,width:80},
	             {header:'内容查询次数',dataIndex:'queryNum',hidden:false,width:120},
	             {header:'命中次数',dataIndex:'hitNum',hidden:false,width:100},
	             {header:'本地命中流量',dataIndex:'localHitFlow',hidden:false,width:120},
	             {header:'回源次数',dataIndex:'backSourceNum',hidden:false,width:100},
	             {header:'本地回源流量',dataIndex:'localBackSourceFlow',hidden:false,width:120,
	            	 renderer : function(value){
	            	 	if(value == null){
	            	 		return '0';
	            	 	}else{
	            	 		return value;
	            	 	}
	            	 }
	             },
	             {header:'时间',dataIndex:'tim',hidden:true,width:120},
	             {header:'操作',dataIndex:'operate',hidden:true,width:120}
	              ];
		       	var self=this;
		       	var data={};
			    this.detailGrid = new Ext.ux.Grid({
			    	dataMethod:'smBigfileCacheViewDetailAction.getList',
			    	viewData:false,
					frame : false,
					border: false,
					columns:columns,
			    	columnLines : true,
			    	sortBar : false,
			    	fetchSize : 15,						
					height:376
		    	});
	           },
				render : function(div) {
					this.detailGrid.render(div);
				},
				refresh : function(data) {
					this.updateData(data);
				}, 
				updateData : function(data) {
					this.detailGrid.updateParams(data);
				}
			});
