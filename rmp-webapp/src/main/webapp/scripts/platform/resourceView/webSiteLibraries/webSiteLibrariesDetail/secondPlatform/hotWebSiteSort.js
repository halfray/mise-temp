base.portal.hotWebSiteSort = Ext.extend(Main.portal.PortalPage, {
     init : function(params) {
		var webSiteType = new Ext.ux.seraph.DictCombo( {
			url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
			displayField : 'codeLabel',
			valueField : 'codeValue'
		});
       var columns = [new Ext.grid.RowNumberer(),
          {header:'网站ID',dataIndex:'webSiteId',hidden:true,width:250},
          {header:'网站',dataIndex:'webSite',hidden:false,width:250},
          {header:'网站类型',dataIndex:'webSite_Type',hidden:false,width:250,renderer:Ext.ux.renderer.Combo(webSiteType)},
          {header:'DNS解析次数',dataIndex:'DNSResolNum',hidden:false,width:200},
          //{header:'请求次数',dataIndex:'req_Count',hidden:false},
          //{header:'总流量(MB)',dataIndex:'all_Flow',hidden:false,renderer:Main.fun.getMFromByte},
          //{header:'上行流量(MB)',dataIndex:'upload_Flow',hidden:false,renderer:Main.fun.getMFromByte},
          //{header:'下行流量(MB)',dataIndex:'download_Flow',hidden:false,renderer:Main.fun.getMFromByte},
          {header:'更新日期',dataIndex:'updateDate',hidden:false,width:200},
          ];
        var self=this;
    	this.data={};					   
	    this.grid = new Ext.ux.Grid({
	    	dataMethod:'dmWebSiteLibrariesDetailAction.getHotWebSiteSort',
			frame : false,
			border: false,
			columns:columns,
	    	columnLines : true,
	    	fetchSize : 15,
			width : 1100,
			height:260,
			listeners : {
	    		rowclick : Main.fun.Fun(self, self.onRowClick)
		    }
			});								  
	    },		
	    onRowClick:function(data){
		       var grid=this.grid;
			   var record = grid.getSelectionModel().getSelected();			    		
			   this.data.webSiteId = record.data.webSiteId;
			   this.data.province = this.province;
			   this.notice(this.data);
		    },
	    getGridData : function(data) {
		    this.province = data.province;
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