base.portal.DmCacheshareAgoExtranetSourceDomainTOP100Frequency = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
				var province = new Ext.ux.seraph.DictCombo( { 
					url :
					'systemParmsProvider.do?type=TB_OP_W_0103_LIST', 
					displayField : 'codeLabel',
				    valueField : 'codeValue' 	    
				 });
	//按次数查询
	  var columns = [
	                 new Ext.grid.RowNumberer(),
	                 {header:'省份',dataIndex:'Firm',hidden:false,renderer:Ext.ux.renderer.Combo(province)},
	                 {header:'日期',dataIndex:'Query_time',hidden:false},
	                 {header:'域名',dataIndex:'sourceaddress',hidden:false,width:170},
	                 {header:'次数',dataIndex:'URI',hidden:false}           
	                ];
					  var self=this;
					    this.detailGrid = new Ext.ux.Grid({
					    dataMethod:'cacheShareExtranetDomainTop100Action.getListCacheshareAgoExtranetSourceDomainTOP100Frequency',
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
 	  				this.detailGrid.width = obj.offsetWidth-15;
 	  				this.detailGrid.height = obj.offsetHeight-15;
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