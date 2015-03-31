/**
 * 
 * 大文件协同失误明细
 */
base.portal.smBigfileSynfailueDetail = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'],
	init : function(params){	
	 var enableCache= new Ext.ux.seraph.DictCombo( { 
			url :
			'parmInfoProvider.do?parmType=SYNFAILUE_TYPE', 
			displayField : 'parmName',
		    valueField : 'parmCode'			        
		 });
	var self = this;
    //局点
    this.provinceCombo = new Ext.form.ComboBox({
    	valueField: 'value',
    	name:'province',
    	displayField:'name',    
        value : '100000',
    	mode:'local',
    	typeAhead:true, 
    	triggerAction : 'all',
    	store:provinceStore
    });
    //协同局点  
     this.synProvCombo = new Ext.form.ComboBox({
    	valueField: 'value',
    	name:'synProv',
    	displayField:'name',
    	value:'350000',
    	mode:'local',
    	typeAhead:true, 
    	triggerAction : 'all',
    	store:provinceAllStore
    });
     //统计开始时间
     this.Begin = new Ext.form.DateField({
    	 name:'Begin',
    	 value:new Date(),
    	 format:'Ymd'
     });
    //统计结束时间
     this.Finish = new Ext.form.DateField({
    	 name:'Finish',
    	 value:new Date(),
    	 format:'Ymd'
     });
     this.search = new Ext.Button({
    		text : '查询',
    		iconCls: 'search-button', 
    		handler : upData
    	});
     this.reset = new Ext.Button({
    		text : '刷新',
    		iconCls: 'refresh-button', 
    		 handler : function()
    		{
    			var tbar = self.mainPanel.getTopToolbar();
    			var mainPanel = tbar.findByType('field');
    			for(var i = 0; i < mainPanel.length;i++)
    			{
    				mainPanel[i].reset();
    			}
     			upData();
    		} 
    	});
     function upData() {
    		var data = getData();
    		updateGrid(data);
    	}
     function getData() {    	 
    		var tbar =self.mainPanel.getTopToolbar();
    		var queryFields = tbar.findByType('field');
    		var data = {};
    		for(var i = 0; i < queryFields.length;i++)
    		{
    			data[queryFields[i].getName()] = queryFields[i].getValue();
    		}
    		data.Begin=Ext.isEmpty(data.Begin)?"":data.Begin.format("Ymd");
    		data.Finish=Ext.isEmpty(data.Finish)?"":data.Finish.format("Ymd");
    		return data;
    	}
     function updateGrid(data)
     {
    	self.detailGrid.setParams(data);
    	self.detailGrid.doSearchList();
     }	
	var columns = [ 
	              new Ext.grid.RowNumberer(),
	              {header : '局点',dataIndex : 'province',width:150,renderer:Ext.ux.renderer.Combo(provinceCombo),hidden : false},
	              {header : '协同局点',dataIndex : 'sysPro',width:150,renderer:Ext.ux.renderer.Combo(synProvCombo),hidden : false},
	              {header:  'URL',dataIndex: 'URL',hidden:false,width:300},
	              {header:  '时间',dataIndex: 'tim',hidden:false,width:150},
	              {header:  '类型',dataIndex: 'type',hidden:false,width:150,renderer:Ext.ux.renderer.Combo(enableCache)}
              ];
				var self=this;
				this.data = {};
        	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'bigFileSynFailureAction.getList',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15
		    	});       	           	    
        	    this.mainPanel = new Ext.Panel({
					layout : 'fit',
					frame : true,
					baseCls : 'x-plain',
					tbar : [{
						text : '局点'
					}, this.provinceCombo,{
						text:'协同局点'
					},this.synProvCombo,{
						text : '统计开始时间'},
						this.Begin,{
						text:'统计结束时间'},
						this.Finish,this.search,'-',this.reset],		
                     items : [this.detailGrid]       	    			
				});       	       
        },	        
		render : function(div) {
			var obj = (Ext.getDom(div));
			this.detailGrid.width = obj.offsetWidth-27;
			this.detailGrid.height = obj.offsetHeight-60;
			this.mainPanel.render(div);
		},
	
		run : function(data){
			this.upData();
		} 
});
