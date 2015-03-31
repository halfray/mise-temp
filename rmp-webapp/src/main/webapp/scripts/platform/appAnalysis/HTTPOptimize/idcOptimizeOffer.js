var data1 = null;
base.portal.idcOptimizeOffer = Ext.extend(Main.portal.PortalPage, {
	         init : function(params) {
	
                 var columns = [new Ext.grid.RowNumberer(),
                             {header:'网站ID',dataIndex:'webSiteId',hidden:false,width:180},
                             {header:'网站',dataIndex:'webSiteName',hidden:false,width:180},
                             {header:'出网次数',dataIndex:'countOut',hidden:false,width:180},
                             {header:'出网流量',dataIndex:'flowOut',hidden:false,width:180},	                             
                             {header:'可引入列表',dataIndex:'list',hidden:false,width:180,renderer:showURL}                            
                             ];
                 var self=this;
			  	    this.grid = new Ext.ux.Grid({
			  	    	dataMethod:'hTTPIDCOptimizeSuggestionAction.getIDCOptimizeSuggestion',
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
			  	    	data1 = Ext.encode(data);
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

function showURL(value, metaData, record){
	var webSiteId=record.get('webSiteId');
	var webSiteName=record.get('webSiteName');
	return "<INPUT type='button' style='width:40px' value='查看' onclick=showDetail('"+webSiteId+"','"+webSiteName+"','"+data1+"');>";
}

function showDetail(webSiteId,webSiteName,data){
	var bizdate = Ext.decode(data).bizDate;//查询日期
	var gridColumns = [new Ext.grid.RowNumberer(), {
        header: '域名/大文件',
        width: 100,
        sortable: true,
        dataIndex: 'domainName',
        hidden: false,
        hideable: false
    }];
	
	var detailGrid = new Ext.ux.Grid({
	    dataMethod: 'hTTPIDCOptimizeSuggestionAction.getDomainByWebsiteID',
	    columns: gridColumns,
	    height: 200,
	    fetchSize: 15,
	    columnLines: true,
	    frame: false,
	    border: false,
	    bodyBorder: false,
	    viewData: false
	});

	var windows = new Ext.Window({
	    xtype: "window",
	    title: "'"+webSiteName+"'建议引入列表",
	    width: 390,
	    height: 230,
	    border: false,
	    bodyBorder: false,
	    closeAction:'hide',
	    autoScroll: true,
	    items: [detailGrid]
	});

	windows.show();

	var requestdata = "{'bizdate':'"+bizdate+"','webSiteId':'"+webSiteId+"'}";
    updateDetailGrid(requestdata, detailGrid);
    
    function updateDetailGrid(data, detailGrid){
        detailGrid.setParams(data);
        detailGrid.doSearchList();
    }
}