base.portal.dmProvinceUnintroduceHotdomainEvalDetail = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'网站',dataIndex:'webSite',hidden:false},
    		{header:'域名',dataIndex:'domain',hidden:false},
    		{header:'域名级别',dataIndex:'domainLeavel',hidden:false},
    		//{header:'建议引入方式',dataIndex:'suggestIntroduceWay',hidden:true},
    		{header:'URL资源数量',dataIndex:'URLResourceNum',hidden:false},
    		{header:'可缓存资源数量',dataIndex:'CacheResourceNum',hidden:false},
    		{header:'可缓存资源数量占比',dataIndex:'CacheResourceNumPercent',hidden:false,width:130,
	    		renderer:function(value){
	    			return (value*100).toFixed(2)+'%';
	    		}
    		},
    		{header:'URL资源大小(MB)',dataIndex:'URLResourceSize',hidden:false,renderer:Main.fun.getMFromByte,width:120},
    		{header:'可缓存资源大小(MB)',dataIndex:'CacheResourceSize',hidden:false,renderer:Main.fun.getMFromByte,width:130},
    		{header:'可缓存资源大小占比',dataIndex:'CacheResourceSizePercent',hidden:false,width:130,
    			renderer:function(value){
    				return (value*100).toFixed(2)+'%';
    			}
    		},
    		{header:'更新日期',dataIndex:'updateDate',hidden:false}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
		    	dataMethod:'dmProvinceUnintroduceHotdomainEvalAction.getDetailList',
				frame : false,
				border: false,
				sortBar : false,
				columns:columns,
		    	columnLines : true,
				viewData: false,
		    	fetchSize : 15,
				width : 570,
				height:364	
		    	});
		    },      
           updateData : function(data) {
		    	var mapData = {};
		    	mapData.domain = data.domain;
				this.grid.updateParams(mapData);
			},
			render : function(div) {
				this.grid.setHeight(Ext.get(div).getHeight());
				this.grid.render(div);
			},
		
			run : function(data){
//				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})