/**
 * 
 * Cache协同统计
 */
base.portal.externalLxDispatch = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'],
	init : function(params){	
	 
	var self = this;
    
	
	
	var queryForm = getQueryform();
	function getQueryform(){

		//字段信息
		

				var sub_domain = new Ext.form.TextField({
					fieldLabel : '视频域名',
					name : 'sub_domain',
					width : 134
				});
				
				var ns = new Ext.form.TextField({
			        fieldLabel: 'NS服务器',
			        name: 'ns',
			        maxLength: 128,
			        width : 134
			    });
				
				var cname = new Ext.form.TextField({
			        fieldLabel: 'cname记录',
			        name: 'cname',
			        maxLength: 128,
			        width : 134
			    });
				
				var cdn = new Ext.form.TextField({
			        fieldLabel: 'CDN厂商',
			        name: 'cdn',
			        maxLength: 128,
			        width : 134
			    });
				
				var gslb = new Ext.form.TextField({
			        fieldLabel: '调度服务器',
			        name: 'gslb',
			        maxLength: 128,
			        width : 134
			    });
				
		
		var query_form1 = new Ext.form.FormPanel( {
			id:"queryForm",
			title : "查询条件",
			labelWidth : 80,
			viewConfig : {
				forceFit : true
			},
			height:240,
			width:240,
			titleCollapse : true,
			margins : '0 3 3 3',
			cmargins : '3 3 3 3',
			labelAlign : "right",
			frame : true,
			layout : 'form',
			buttonAlign : 'center',
			items : [ {
				layout : 'column',
				items : [
				         {
				        	 layout : 'form',
				        	 items : [sub_domain,ns,cname,cdn,gslb]
				         }
				       ]
			}],
			buttons : [ {
				text : '查&nbsp;&nbsp;询',
//				cls:'search-button',
				minWidth:82,
				height:27, 
				handler : upData
			}, {
				text : '刷&nbsp;&nbsp;新',
//				cls: 'refresh-button', 
				minWidth:82,
				height:27,
				handler : function(){
					var tbar = self.detailGrid.getTopToolbar();
					var queryFields = tbar.findByType('field');
					for(var i = 0; i < queryFields.length;i++)
					{
						queryFields[i].reset();
					}
					queryForm.getForm().reset();
					upData();
				}
			} ]
		});
		return query_form1;
		
	}
	
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
	var province = new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
     
	var search = new Ext.Button({
		text : '<span style="margin-left:20px;">查询</span>',
		cls:'search-button',
		minWidth:82,
		height:27,
		handler : upData
	});
	
         
     var reset = new Ext.Button({
    		text : '<span style="margin-left:20px;">刷新</span>',
    		cls: 'refresh-button', 
    		minWidth:82,
    		height:27,
    		handler : function(){
    			var tbar = self.detailGrid.getTopToolbar();
    			var queryFields = tbar.findByType('field');
    			for(var i = 0; i < queryFields.length;i++)
    			{
    				queryFields[i].reset();
    			}
    			queryForm.getForm().reset();
    			upData();
    		}
    	});
     
	function replaceAll(v) {
		return v.replace(/\|/g,"</br>")
	}
	var columns = [ new Ext.grid.RowNumberer(),
	              
				  {header : '网站名称',dataIndex : 'name',width:120,hidden : true},
				  {header : '视频域名',dataIndex : 'sub_domain',width:120,hidden : false, renderer: replaceAll},
				  {header : 'NS服务器',dataIndex : 'ns',width:190,hidden : false, renderer: replaceAll},
				  {header : 'CNAME记录',dataIndex : 'cname',width:150,hidden : false, renderer: replaceAll},
				  {header : 'CDN厂商',dataIndex : 'cdn',width:60,hidden : false, renderer: replaceAll},
				  {header : '调度服务器',dataIndex : 'gslb',width:190,hidden : false, renderer: replaceAll},
				  {header : '资源服务器',dataIndex : 'resource',width:220,hidden : false, renderer: replaceAll},
				  {header : '时间',dataIndex : 'time',width:80,hidden : true}
              ];
				var self=this;
				this.data = {};
        	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'externalLxDispatch.getExternal',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15,
		    	tbar : new Ext.Toolbar({})
		    	}); 
        	    var menu = new Ext.menu.Menu({
        	    	  items: [queryForm]
        	    	});
    	    	menu.on('show',function(){
    	    		if(self.detailGrid.id != 'menu_grid'){
    	    			self.detailGrid.id = 'menu_grid';
    	    		}
    	    	});
        	    this.detailGrid.getTopToolbar().addSeparator();
        	    this.detailGrid.getTopToolbar().add("网站名称：");
        	    this.detailGrid.getTopToolbar().add({
                    xtype: 'searchComboBox', 
					dataMethod : 'externalLxDispatch.getTreeField',
					dataParams: {'table': 'external_lx_website'},
					displayField: 'codeLabel',
					valueField: 'codeValue',
                    fieldLabel: '网站名称',
					id: 'name',
                    hiddenName: 'name',
					hidden: false,
                    maxLength: 128,
                    anchor: '95%'
            	});
        	    
        	    this.detailGrid.getTopToolbar().addSeparator();
        	    this.detailGrid.getTopToolbar().add("时间：");
        	    this.detailGrid.getTopToolbar().add({
    				xtype: 'searchComboBox', 
					dataMethod : 'externalLxDispatch.getTreeData',
					dataParams: {'table': 'external_lx_dispatch_video_view'},
					valueField : 'codeValue',
					displayField : 'codeLabel',
					fieldLabel : '时间',
					id : 'time',
					name : 'time',
					value: '2013-12',
					hidden: false,
                    maxLength: 128,
                    anchor: '95%',
                });
        	    
        	    this.detailGrid.getTopToolbar().add({
        	    	text :' ',
        	    	width:82,
        	    	height:27,
        	    	iconCls:'btn_more_background',
        	      menu: menu
        	    });
        	    this.detailGrid.getTopToolbar().add(search);
        	    this.detailGrid.getTopToolbar().add(reset);
        	    
        	    
        	    function upData() {
        	    		var data = getData();
        	    		updateGrid(data);
        	    }
        	     function getData() {
		    		var tbar = self.detailGrid.getTopToolbar();
		    		var queryFields = tbar.findByType('field');
		    		var data = {};
		    		for(var i = 0; i < queryFields.length;i++)
		    		{
		    			data[queryFields[i].getName()] = queryFields[i].getValue();
		    		}
		    		//alert(self.detailGrid.id)
		    		if(self.detailGrid.id == 'menu_grid'){
		    			var formObject = queryForm.getForm().getValues();
		    			data.sub_domain = formObject.sub_domain;
		    			data.cname = formObject.cname;
		    			data.cdn = formObject.cdn;
		    			data.ns = formObject.ns;
		    			data.gslb = formObject.gslb;
		    		}
					
		    		return data;
		    	}
		     
		     function updateGrid(data)
		     {
		    	self.detailGrid.setParams(data);
		    	self.detailGrid.doSearchList();
		     }	
        	    
        }, 
//		upData: function () {
//			alert(3);
//    		var data = getData();
//    		updateGrid(data);
//	    },	        
		render : function(div) {
			var obj = (Ext.getDom(div));
			this.detailGrid.width = obj.offsetWidth;
			this.detailGrid.height = obj.offsetHeight;
			this.detailGrid.render(div);
		},     
        updateData : function(data) {
			this.detailGrid.updateParams(data);
		},
		run : function(data){
			this.data.time='2013-12';
			this.updateData(this.data);
		} ,
		refresh:function(data)
		{	
			this.updateData(data);
		}
});