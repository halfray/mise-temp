base.portal.dmWebsiteBelongevaluationIP = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
			
    		var columns = [
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'IP',dataIndex:'ip',hidden:false},
    		{header:'域名数量',dataIndex:'domainNum',hidden:false},
    		{header:'域名引入率',dataIndex:'domainInRate',hidden:false,renderer:function(value){return (value*100).toFixed(2)+'%'}},
    		{header:'更新日期',dataIndex:'updatedate',hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmWebSiteBelongEvaluationAction.getWebSiteIPList',
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15,
				width : 970,
				height:266,
				viewData : false
		    	});
		    },  
           updateData : function(data) {
		    	var mapData = {};
		    	mapData.webSiteId = data.webSiteId;
		    	mapData.system = data.system;
		    	if(data.domainNum == null){
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