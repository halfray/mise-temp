base.portal.dmmWebsiteBelongevaluationIP = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'IP',dataIndex:'ip',width:120,hidden:false},
    		{header:'域名数量',dataIndex:'domainNum',width:80,hidden:false},
    		{header:'域名引入率',dataIndex:'domainInRate',width:76,hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',width:76,hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmmWebSiteBelongEvaluationAction.getWebSiteIPList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	sortBar : false,
		    	litePagingBar : true,
		    	fetchSize : 10,
				width : 970,
				height:266,
				viewData : false
		    	});
		    },  
           updateData : function(data) {
		    	var mapData = {};
		    	mapData.webSiteId = data.webSiteId;
		    	mapData.system = data.system;
		    	if(!Ext.isDefined(data.domainNum)){
		    		mapData.domainNum = '9999';
		    	}else{
		    		mapData.domainNum = data.domainNum;
		    	}
		    	mapData.province = data.province;
				this.grid.updateParams(mapData);
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