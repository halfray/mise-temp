var selectData = null;
base.portal.idcHotWebsite = Ext.extend(Main.portal.PortalPage, {
			links: ['/styles/platform/hilight.css'],
	         init : function(params) {
	
			var row = [
		           { header: '', colspan: 2, align: 'center' },
				   { header: '<font color = #ee006e>合计</font>', colspan: 3, align: 'center' },
		           { header: '<font color = #ee006e>IDC引入</font>', colspan: 6, align: 'center' }
	          ];
				var group = new Ext.ux.grid.ColumnHeaderGroup({
				    rows: [row]
				});
                 var columns = [new Ext.grid.RowNumberer(),
                             {header:'网站',dataIndex:'webSiteName',hidden:false,width:180},
                             {header:'域名数',dataIndex:'domainNumTotal',hidden:false,width:85},
                             {header:'URL数',dataIndex:'urlNumTotal',hidden:false,width:85},	                             
                             {header:'流量',dataIndex:'flowTotal',hidden:false,width:85},	                             
                             {header:'引入域名',dataIndex:'domainNumIdc',hidden:false,width:85},	                             
                             {header:'域名占比',dataIndex:'domainRate',hidden:false,width:85},	                             
                             {header:'流量大小',dataIndex:'flowIdc',hidden:false,width:85},	                             
                             {header:'流量占比',dataIndex:'flowRate',hidden:false,width:85},	                             
                             {header:'URL数量',dataIndex:'urlNumIdc',hidden:false,width:85},	                             
                             {header:'URL占比',dataIndex:'URLRate',hidden:false,width:85},                             
                             ];
			                 var self=this;
						      	this.data={};					   
						  	    this.grid = new Ext.ux.Grid({
						  	    	dataMethod:'iDCHotWebsiteAction.getIDCHotWebsiteData',
						  	    	frame : false,
						  			border: false,
						  			columns:columns,
						  	    	columnLines : true,
						  	    	fetchSize : 15,
						  			width : 1100,
						  			height:260,
						  			plugins: group,
						  			colspan : 8,
						  			viewConfig:{//高亮显示
						  		       getRowClass : function(record,rowIndex,rowParams,store){   
							  	    	var basis = selectData.basis;//选择值
		                       	 		 if (basis != '') {
	  	                               	 	 var URLRate = record.get('URLRate');//URLRate列的值
	  	                               	 	 var flowRate = record.get('flowRate');//flowRate列的值
	  	                               	 	 var domainRate = record.get('domainRate');//domainRate列的值
	  	                               	 	 if (basis == 1) {//流量
	  	                               	 		 if (URLRate.split('%')[0] > 50 && flowRate.split('%')[0] < 50) {
	  	                               	 			 return 'x-grid-record-red';
	  	                               	 		 }
	  	   									 }else if(basis == 2){//请求次数
	  	   										 if (domainRate.split('%')[0] > 50 && flowRate.split('%')[0] < 50) {
	  	   											 return 'x-grid-record-red';
	  	   	                            	 	 }
	  	   									 }
							  		       }
		                       	 		 }
						  			 }
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
						  			selectData = data;
						  			this.getGridData(data);
						  		}						       
						  });				             	