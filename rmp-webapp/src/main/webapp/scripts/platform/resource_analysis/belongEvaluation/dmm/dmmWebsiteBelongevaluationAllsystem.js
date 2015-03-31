base.portal.dmmWebsiteBelongevaluationAllsystem = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
			var system = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'全网系统',dataIndex:'system',width:90,hidden:false,renderer:Ext.ux.renderer.Combo(system)},
    		{header:'网站数量',dataIndex:'webSiteNum',width:90,hidden:false},
    		{header:'热点匹配度',dataIndex:'hotMatchingRate',width:90,hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',width:80,hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmmWebSiteBelongEvaluationAction.getWebSiteAllSystemList',
				frame : false,
				border: false,
				columns:columns,
				sortBar : false,
		    	litePagingBar : true,
		    	columnLines : true,
		    	fetchSize : 10,
				width : 570,
				height:364	
		    	});
		    },      
           updateData : function(data) {
				this.grid.updateParams(data);
			},
			render : function(div) {
				this.grid.setHeight(Ext.get(div).getHeight());
				this.grid.render(div);
			},
		
			run : function(data){
				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})