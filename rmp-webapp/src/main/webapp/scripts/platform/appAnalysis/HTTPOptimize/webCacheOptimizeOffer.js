base.portal.webCacheOptimizeOffer = Ext.extend(Main.portal.PortalPage, {
	         init : function(params) {
	
                 var columns = [new Ext.grid.RowNumberer(),
                             {header:'域名名称',dataIndex:'domainName',hidden:false,width:180},
                             {header:'出网流量',dataIndex:'flowOut',hidden:false,width:180}
                             ];
                 var self=this;
			  	    this.grid = new Ext.ux.Grid({
			  	    	dataMethod:'hTTPWebCacheOptimizeSuggestionAction.getWebCacheOptimizeSuggestion',
			  			frame : false,
			  			border: false,
			  			columns:columns,
			  	    	columnLines : true,
			  	    	fetchSize : 15,
			  			width : 1100,
			  			height:260,
			  			viewData :false
			  			});								  
			  	    },		
			  	    getGridData : function(data) {
		  	    		this.grid.updateParams(data);
			  		},
			  		render : function(div) {
			  			var obj = (Ext.getDom(div));
			  			this.grid.width = obj.offsetWidth-15;
			  			this.grid.height = obj.offsetHeight-15;
			  			this.grid.render(div);
			  		},
			  		refresh : function(data) {
		  				this.getGridData(data);
			  		}
});

