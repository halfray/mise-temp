base.portal.dmmWebsiteBelongevaluationProvince = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
			var province = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'省份',dataIndex:'province',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
    		{header:'域名数量',dataIndex:'domainNum',hidden:false},
    		{header:'域名引入率',dataIndex:'domainInRate',hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmmWebSiteBelongEvaluationAction.getWebSiteProvinceList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 10,
				width : 570,
				height:266,
				sortBar : false,
				litePagingBar : true,
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
				this.data.province = record.data.province;
				if(!Ext.isDefined(data.domainNum)){
					this.data.domainNum = '99999';
		    	}else{
		    		this.data.domainNum = this.domainNum;
		    	}
				this.notice(this.data);		
		    },
           updateData : function(data) {
		    	this.domainNum = data.domainNum;
		    	var mapData = {};
		    	mapData.webSiteId = data.webSiteId;
		    	if(!Ext.isDefined(data.domainNum)){
		    		mapData.domainNum = '99999';
		    	}else{
		    		mapData.domainNum = data.domainNum;
		    	}
				this.grid.updateParams(mapData);
//				this.notice({});
			},
			render : function(div) {
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