base.portal.dmmWebsiteBelongevaluationSystem = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
			var system = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system)},
    		{header:'域名数量',dataIndex:'domainNum',hidden:false},
    		{header:'域名引入率',dataIndex:'domainInRate',hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmmWebSiteBelongEvaluationAction.getWebSiteSystemList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	sortBar : false,
		    	litePagingBar : true,
		    	fetchSize : 10,
				width : 970,
				height:266,
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
				this.data.system = record.data.system;
				if(Ext.isDefined(data.domainNum)){
					this.data.domainNum = '99999';
		    	}else{
		    		this.data.domainNum = this.domainNum;
		    	}
				this.data.province = this.province;
				this.notice(this.data);		
		    },
           updateData : function(data) {
		    	this.domainNum = data.domainNum;
		    	this.province = data.province;
		    	var mapData = {};
		    	mapData.webSiteId = data.webSiteId;
		    	mapData.province = data.province;
		    	if(!Ext.isDefined(data.domainNum)){
		    		mapData.domainNum = '99999';
		    	}else{
		    		mapData.domainNum = data.domainNum;
		    	}
				this.grid.updateParams(mapData);
//				this.notice({});
			},
			render : function(div) {
				this.grid.setHeight(Ext.get(div).getHeight());
				this.grid.render(div);
			},
		
			run : function(data){
				//this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})