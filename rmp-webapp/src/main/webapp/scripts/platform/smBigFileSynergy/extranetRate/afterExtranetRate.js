base.portal.afterExtranetRate = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
					var province = new Ext.ux.seraph.DictCombo( { 
						url :
						'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
						displayField : 'codeLabel',
					    valueField : 'codeValue' 	    
					 });
	  var columns = [
	                 new Ext.grid.RowNumberer(),
	                 {header:'省份',dataIndex:'Firm',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	                 {header:'日期',dataIndex:'Query_time',hidden:false},
	                 {header:'URI',dataIndex:'URL_suffix',width: 200,hidden:false},
	                 {header:'下载大小(MB)',dataIndex:'Traffic_information',width: 200,hidden:false,
	                	 renderer:function(value){
			          		return (value/1024/1024).toFixed(4);
		          	  	}},
					 {header:'下载时间',dataIndex:'Completion_time_minus_start_time',width: 200,hidden:false},
					 {header:'速率(MB/S)',dataIndex:'Source_rate',width: 100,hidden:false, renderer:function(value){return (value/1).toFixed(4);}}	                
	                ];
					  var self=this;
					    this.detailGrid = new Ext.ux.Grid({
					    dataMethod:'extranetRateAction.getAfterExtranetRateList',
					    viewData:false,
						frame : false,
						border: false,
						columns:columns,
					    columnLines : true,
					    litePagingBar:true,
					    fetchSize : 15					
					});
                 },
                 updateData : function(data) {
 	  				this.detailGrid.updateParams(data);
 	  			},
 	  			render : function(div) {
 	  				var obj = (Ext.getDom(div));
 	  				this.detailGrid.width = obj.offsetWidth;
 	  				this.detailGrid.height = obj.offsetHeight;
 	  				this.detailGrid.render(div);
 	  			},	  		
 	  			run : function(data){
 	  				this.updateData(data);
 	  			},
 	  			refresh:function(data)
 	  			{
 	  				this.updateData(data);
 	  			}
 });