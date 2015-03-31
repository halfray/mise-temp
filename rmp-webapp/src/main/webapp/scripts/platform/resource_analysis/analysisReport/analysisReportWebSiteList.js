base.portal.analysisReportWebSiteList = Ext.extend(Main.portal.PortalPage, {
	imports: ['/scripts/inc/frame/MainPanel.js'],
	
	links:['/styles/platform/analysisGrid.css'],
	
    init : function(params) {
	
			var webSiteType = new Ext.ux.seraph.DictCombo( {
				url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
				displayField : 'codeLabel',
				valueField : 'codeValue'
			});
			
			var searchForm = new Ext.FormPanel({
				id: 'searchFormPanel',
				border: false,
//		        labelAlign: 'right',
		        buttonAlign: 'center',
		        bodyStyle: 'padding: 0px, 17px, 0px, 0px;',
		        labelWidth: 30,
		        // 渲染表单背景
		        baseCls: 'x-panel-mc',
		        items: [{
		            layout: 'column',
		            defaults: {
		                layout: 'form'
		            },
		            items: [{
		                columnWidth: .98,
		                items: [{
		                    xtype: 'dictcombo', 
							url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
							displayField: 'codeLabel',
							valueField: 'codeValue',
		                    fieldLabel: '省份',
							value: '510000',
		                    hiddenName: 'province',
							id: 'province',
		                    maxLength: 128,
		                    anchor: '95%'
		                }]
		            },{
		                columnWidth: .7,
		                items: [{
		                    xtype: 'textfield',
							fieldLabel: '网站',
		                    name: 'webSiteName',
//		                    style:'background:url("/rmp-webapp/src/main/webapp/scripts/ext-3.3.1/resources/images/default/form/ui/web_search.png")',
		                    value:'',
		                    maxLength: 128,
		                    anchor: '95%'
		                }]
		            },{
		                columnWidth: .3,
		                items: [{
		                    xtype: 'button',
		                    text : '查询',
//							iconCls : 'dataTable-preview-icon',
		                    iconCls:'search_btn',
							handler : function() {
								if (searchForm.getForm().isValid()) {
				                    // 获取查询条件
				                    var values = searchForm.getForm().getValues();
				                    // 获取表格
									var gridPanel = Ext.getCmp('webSiteListGridPanel');
									gridPanel.updateParams(values);
				                }else{
									Ext.ux.MessageBox.info("请按要求输入查询信息！");
								}
							}
		                }]
		            }]
		        }]
			})
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'ID',dataIndex:'id',hidden:true},
    		{header:'网站ID',dataIndex:'webSiteId',hidden:true},
    		{header:'网站',width: 100, dataIndex:'webSiteName',hidden:false},
			{header:'网站分类',width:100,dataIndex:'webSiteType',hidden:false,renderer:Ext.ux.renderer.Combo(webSiteType)}
    		];
    		
		    var self=this;
		    
		    this.data = {};
		    
	    	this.grid = new Ext.ux.Grid({
				id: 'webSiteListGridPanel',
		    	dataMethod:'analysisReportService.getAnalysisReportWebSite',
				frame : false,
				border: false,
				sortBar : false,
				columns:columns,
		    	columnLines : true,
				viewData: false,
		    	fetchSize : 15,
				litePagingBar : true,
				height:480,
				listeners : 
				{	
				  rowclick : Main.fun.Fun(self, self.onRowClick)
			    }				
	    	});
				
				this.panel= new Ext.Panel({
					layout: 'border',
					frame: false,
					xtype:"panel",
					border: false,
					bodyBorder: false,
					baseCls: 'x-plain',
					height:600,
					items: [{
						layout: 'fit',
						xtype:"panel",
						frame: false,
						border: false,
						bodyBorder: false,
						baseCls: 'x-plain',
						bodyStyle:'background:#4b4b4b',
						height: 100,
						region:"north",
						items: searchForm
					},
					{
						id: 'detailGrid',
						xtype:"panel",
						bodyBorder: false,
						bodyStyle:'background:#4b4b4b',
						region:"center",
						items: this.grid
					}]
			    });
//				alert('finished init');
				
		    },     
		    onRowClick:function(data){
		       var grid=this.grid;
			   var record = grid.getSelectionModel().getSelected();	
			   var searchFormPanel = Ext.getCmp('searchFormPanel');
			   searchFormPanel.getForm().setValues(record.data);
			   //通知子CELL刷新
			   this.data.webSiteId = record.data.webSiteId;
			   this.data.webSiteName = record.data.webSiteName;
			   this.data.province = searchFormPanel.findById('province').getValue();
			   this.data.provinceName = Ext.getCmp('province').el.dom.value
			   this.notice(this.data);		
			  	
		    },
           updateData : function(data) {
//		   		alert(data.province+":" + data.webSiteId+"=="+data.webSiteName);
//		   		var searchFormPanel = Ext.getCmp('searchFormPanel');
//			    searchFormPanel.getForm().setValues(data);
				this.grid.updateParams(data);
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.panel.width = obj.offsetWidth;
				this.panel.height = obj.offsetHeight;
				
				this.panel.render(div);
//				obj.addClass('background_color');
				
			},
		
			run : function(data){
				this.updateData(data);
			},
			refresh:function(data)
			{
//				alert('refresh');
				this.updateData(data);
			}
})