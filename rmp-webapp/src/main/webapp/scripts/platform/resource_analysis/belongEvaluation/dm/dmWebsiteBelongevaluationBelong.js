base.portal.dmWebsiteBelongevaluationBelong = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
			var operator = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_OP_W_0001_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'运营商',dataIndex:'operator',width:80,hidden:false,renderer:Ext.ux.renderer.Combo(operator)},
    		{header:'域名数量',dataIndex:'domainNum',width:80,hidden:false},
    		{header:'域名引入率',dataIndex:'domainInRate',width:80,hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',width:80,hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmWebSiteBelongEvaluationAction.getWebSiteBelongList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	sortBar : false,
		    	litePagingBar : true,
		    	fetchSize : 10,
				width : 570,
				height:260,
				viewData : false,
				listeners : 
				{	
				  rowclick : Main.fun.Fun(self, self.onRowClick)
			    }			
		    	});
		    },  
		   onRowClick:function(data){
			    var grid=this.grid;
				var record = grid.getSelectionModel().getSelected();			    		
				this.data.webSiteId = record.data.webSiteId;
				this.data.operator = record.data.operator;
				this.notice(this.data);		
		    },
           updateData : function(data) {
		    	var mapData = {};
		    	mapData.webSiteId = data.webSiteId;
		    	if(data.domainNum == null){
		    		mapData.domainNum = '9999';
		    	}else{
		    		mapData.domainNum = data.domainNum;
		    	}
				this.grid.updateParams(mapData);
			},
			render : function(div) {
				this.grid.render(div);
				this.grid.setWidth(Ext.get(div).getWidth());
			},
		
			run : function(data){
				//this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})