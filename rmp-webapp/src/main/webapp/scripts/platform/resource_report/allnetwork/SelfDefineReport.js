/**
 *SelfDefine引入报表
 */
base.portal.SelfDefineReport = Ext.extend(Main.portal.PortalPage, {
	init : function(params){
		this.data = {};
		var self = this;
		
		this.formPanel = new Ext.form.FormPanel({
			
			border: false,
	        labelAlign: 'right',
	        buttonAlign: 'center',
	        bodyStyle: 'padding: 0px, 17px, 0px, 0px',
	        labelWidth: 80,
	        // 渲染表单背景
	        baseCls: 'x-panel-mc',
        	items: [{
	            layout: 'column',
	            defaults: {
	                layout: 'form'
	            },
	            items: [{
	                columnWidth: .4,
	                items: [{
	                    xtype: 'searchComboBox', 
						dataMethod : 'reportExportForDateUtil.getHaveForDate',
						dataParams: {table: 'dm_allweb_incachewebsite_report'},
						width : 120,
						valueField : 'codeValue',
						displayField : 'codeLabel',
						fieldLabel : '日期',
						id : 'date',
						name : 'date',
						hidden: false,
	                    maxLength: 128,
	                    anchor: '95%'
                	}]
	            }, {
	                columnWidth: .4,
	                items: [{
	                    xtype: 'searchComboBox', 
	                    dataMethod:'reportExportDataExcelServiceImpl.getWebSiteList',
	                    valueField:'webSiteName',
	                	displayField:'webSiteName',
						id: 'webSiteName',
						name: 'webSiteName',
						fieldLabel: '网站名称',
	                    anchor: '95%'
	                }]
	            }, {
	                columnWidth: .2,
	                items: [{
	                    xtype: 'button', 
						iconCls: 'document-excel-icon',
						text: '生成',
						handler: function() {
							var data = {};
							if(!Ext.getCmp('date').value){
								Ext.Msg.alert('提示', "请先选择日期！");
								return;
							}
							data.date =  Ext.getCmp('date').value;
							data.webSiteName =  Ext.getCmp('webSiteName').getValue();
							var url = "SelfDefineExportExcelAction.do?param="+encodeURIComponent(Ext.encode(data));							           
							window.open(url);
						}
	                }]
	            }]
			}]
		});
	},
	render : function(div) {
		this.formPanel.render(div);
	},
	refresh : function(data) {
	},
	run:function()
	{
	}
});