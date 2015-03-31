/**
 *分省IDC引入报表
 */
base.portal.ProvinceIDCReport = Ext.extend(Main.portal.PortalPage, {
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
						dataParams: {'table': 'dm_allweb_province_inidcwebsite_report'},
						width : 120,
						valueField : 'codeValue',
						displayField : 'codeLabel',
						fieldLabel : '日期',
						id : 'date',
						name : 'date',
						hidden: false,
	                    maxLength: 128,
	                    anchor: '95%',
						listeners: {
							select : function(thiz) {
								var province = Ext.getCmp('province');
								province.appendParams({'date': thiz.value});
							}
						}
                	}]
	            }, {
	                columnWidth: .4,
	                items: [{
	                    xtype: 'searchComboBox', 
//						url: 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
						dataMethod : 'reportExportForDateUtil.getHaveForProvince',
						dataParams: {'table': 'dm_allweb_province_inidcwebsite_report'},
						displayField: 'codeLabel',
						valueField: 'codeValue',
	                    fieldLabel: '省份',
						id: 'province',
	                    hiddenName: 'province',
						hidden: false,
	                    maxLength: 128,
	                    anchor: '95%',
						listeners: {
							focus : function( thiz, newValue, oldValue ) {
								var date = Ext.getCmp('date').value;
								if(!date) {
									Ext.Msg.alert('提示', "请先选择日期！");
									return;
								}
							}
						}
                	}]
	            }, {
	                columnWidth: .2,
	                items: [{
	                    xtype: 'button', 
						iconCls: 'document-excel-icon',
						text: '生成',
						handler: function() {
							var data = {};
							if(!Ext.getCmp('date').value || !Ext.getCmp('province').value){
								Ext.Msg.alert('提示', "请先选择日期和省份！");
								return;
							}
							data.date =  Ext.getCmp('date').value;
							data.province = Ext.getCmp('province').value;
							data.provinceName = Ext.getCmp('province').el.dom.value;
							
							var url = "ProvinceIDCExportExcelAction.do?param="+encodeURIComponent(Ext.encode(data));
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