base.portal.top10WebsiteAnalysis = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
	var barData = null;
	var row = [
           { header: '', colspan: 2, align: 'center' },
		   { header: '<font color = #ee006e>合计</font>', colspan: 4, align: 'center' },
           { header: '<font color = #ee006e>本地</font>', colspan: 8, align: 'center' },
		   { header: '<font color = #ee006e>网内</font>', colspan: 8, align: 'center' },
           { header: '<font color = #ee006e>网外</font>', colspan: 8, align: 'center' }
      ];
		var group = new Ext.ux.grid.ColumnHeaderGroup({
		    rows: [row]
		});
         var columns = [new Ext.grid.RowNumberer(),
                     {header:'网站',dataIndex:'webSiteName',hidden:false,width:180},
                     {header:'域名',dataIndex:'domainNumTotal',hidden:false,width:85},
                     {header:'URL',dataIndex:'urlNumTotal',hidden:false,width:85},	
                     {header:'流量',dataIndex:'flowTotal',hidden:false,width:85},                             
                     {header:'次数',dataIndex:'countTotal',hidden:false,width:85},	 
                     //本地	
                     {header:'域名数',dataIndex:'domainNumLocal',hidden:false,width:85},	                             
                     {header:'域名占比',dataIndex:'domainNumLocalRate',hidden:false,width:85},	                             
                     {header:'URL数',dataIndex:'urlNumLocal',hidden:false,width:85},	                             
                     {header:'URL占比',dataIndex:'urlNumLocalRate',hidden:false,width:85},	
                     {header:'流量',dataIndex:'flowLocal',hidden:false,width:85},	                             
                     {header:'流量占比',dataIndex:'flowLocalRate',hidden:false,width:85},	
                     {header:'次数',dataIndex:'countLocal',hidden:false,width:85},	                             
                     {header:'次数占比',dataIndex:'countLocalRate',hidden:false,width:85},	 
                     //网内
                     {header:'域名数',dataIndex:'domainNumIn',hidden:false,width:85},	                             
                     {header:'域名占比',dataIndex:'domainNumInRate',hidden:false,width:85},	                             
                     {header:'URL数',dataIndex:'urlNumIn',hidden:false,width:85},	                             
                     {header:'URL占比',dataIndex:'urlNumInRate',hidden:false,width:85},
                     {header:'流量',dataIndex:'flowIn',hidden:false,width:85},	                             
                     {header:'流量占比',dataIndex:'flowInRate',hidden:false,width:85},
                     {header:'次数',dataIndex:'countIn',hidden:false,width:85},	                             
                     {header:'次数占比',dataIndex:'countInRate',hidden:false,width:85},
                     //网外
                     {header:'域名数',dataIndex:'domainNumOut',hidden:false,width:85},	                             
                     {header:'域名占比',dataIndex:'domainNumOutRate',hidden:false,width:85},	                             
                     {header:'URL数',dataIndex:'urlNumOut',hidden:false,width:85},	                             
                     {header:'URL占比',dataIndex:'urlNumOutRate',hidden:false,width:85},	                             
                     {header:'流量',dataIndex:'flowOut',hidden:false,width:85},	                             
                     {header:'流量占比',dataIndex:'flowOutRate',hidden:false,width:85},	                             
                     {header:'次数',dataIndex:'countOut',hidden:false,width:85},	                             
                     {header:'次数占比',dataIndex:'countOutRate',hidden:false,width:85},	                             
                     ];
	                 var self=this;
				      	this.data={};					   
				  	    this.grid = new Ext.ux.Grid({
				  	    	dataMethod:'top10WebsiteAnalysisAction.getTopWebsiteAnalysis',
				  	    	frame : false,
				  			border: false,
				  			columns:columns,
				  	    	columnLines : true,
				  	    	fetchSize : 15,
				  			width : 1100,
				  			height:260,
				  			plugins: group,
				  			colspan : 30
				  			});	
				  	  
				  	    },		
				  	    getGridData : function(data) {
				  	    	if (data.belongType == '0') {//本地
								for ( var int = 1; int <= 13; int++) {
									this.grid.getColumnModel().setHidden(int,false); 
								}
								for ( var int = 14; int <= 29; int++) {
									this.grid.getColumnModel().setHidden(int,true); 
								}
							} else if(data.belongType == '1'){//网内
								for ( var int = 6; int <= 13; int++) {
									this.grid.getColumnModel().setHidden(int,true); 
								}
								for ( var int = 14; int <= 21; int++) {
									this.grid.getColumnModel().setHidden(int,false); 
								}
								for ( var int = 22; int <= 29; int++) {
									this.grid.getColumnModel().setHidden(int,true); 
								}
							}else {//网外
								for ( var int = 6; int <= 22; int++) {
									this.grid.getColumnModel().setHidden(int,true); 
								}
								for ( var int = 23; int <= 29; int++) {
									this.grid.getColumnModel().setHidden(int,false); 
								}
							}
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
