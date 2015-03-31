base.portal.dmDomainLocalRepeatDetail = Ext.extend(Main.portal.PortalPage, {
    init : function(params) {
		    	var system = new Ext.ux.seraph.DictCombo( { 
		    		url : 'systemParmsProvider.do?type=TB_OP_W_0002_LIST',
					displayField : 'codeLabel',
					valueField : 'codeValue'
			 });
	    	 var enableCache= new Ext.ux.seraph.DictCombo( { 
					url :
					'parmInfoProvider.do?parmType=YES_NO', 
					displayField : 'parmName',
				    valueField : 'parmCode'			        
				 });
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'id',dataIndex:'dmDomainLocalRepeatDetailId',hidden:true},
    		{header:'域名',dataIndex:'domain',hidden:false,width:120},
    		{header:'请求次数',dataIndex:'localReqNum',hidden:false},
    		{header:'所在系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system)},
    		{header:'所在系统请求次数',dataIndex:'systemReqNum',hidden:false,width:120},
    		{header:'所在系统的质量分',dataIndex:'systemQuaScore',hidden:false,width:120},
    		{header:'重复系统',dataIndex:'repeatSystem',hidden:false,renderer:Ext.ux.renderer.Combo(system)},
    		{header:'重复系统请求次数',dataIndex:'repeatSystemReqNum',hidden:false,width:120},
    	    {header:'重复系统的质量分',dataIndex:'repeatSystemQuaScore',hidden:false,width:120}
    		];
		       var self=this;
		       this.data = {};
	    	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'dmWebSiteRepeatResEvalAction.getListDomainLocalRepeatDetail',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 10,
				width : 1100,
				height:260,
				listeners : 
				{	
				  rowclick : Main.fun.Fun(self, self.onRowClick)
			    }				
		    	});
		    },      
		    onRowClick:function(data){
		       var grid=this.detailGrid;
			   var record = grid.getSelectionModel().getSelected();			    		
			   this.data.domain = record.data.domain;
			   this.data.system=record.data.system;
			   this.data.repeatSystem=record.data.repeatSystem;
			   this.notice(this.data);		
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
})