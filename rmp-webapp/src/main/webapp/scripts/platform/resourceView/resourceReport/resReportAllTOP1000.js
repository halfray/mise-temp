/**
 *TOP1000全网热点域名网内外解析比例 
 */
base.portal.resReportAllTOP1000 = Ext.extend(Main.portal.PortalPage, {
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
						dataParams: {table: 'dm_resReport_all_domain_TOP1000'},
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
	                columnWidth: .5,
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
							
							var url = "ResReportAllTOP1000ExportExcelAction.do?param="+encodeURIComponent(Ext.encode(data));
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