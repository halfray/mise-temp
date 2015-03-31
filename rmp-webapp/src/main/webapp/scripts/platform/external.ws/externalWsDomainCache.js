base.portal.externalWsDomainCache = Ext.extend(Main.portal.PortalPage, {
	imports: ['/scripts/inc/frame/MainPanel.js'],
	
    init : function(params) {
			var self=this;
		    this.data = {};
			var selectStore = new Ext.data.ArrayStore({
				fields : ['value', 'name'],
				data : [ ["1", "是"],  ["0", "否"] ]
			});
			var websiteName = new Ext.ux.SearchComboBox({
				dataMethod : 'externalWsDomainCache.getWebsiteList',
				dataParams: {'table': 'dm_allweb_province_incachewebsite_report'},
				width : 120,
				valueField : 'codeValue',
				displayField : 'codeLabel',
				fieldLabel : '网站名称',
				id : 'site_id',
				name : 'site_id',
				hidden: false,
                maxLength: 128,
                anchor: '95%',
				listeners: {
					select : function(thiz) {
						var top_domain = Ext.getCmp('top_domain');
						top_domain.appendParams({'site_id': thiz.value});
					}
				}
        	})
			
			var top_domain = new Ext.ux.SearchComboBox({
			dataMethod : 'externalWsDomainCache.getTopDomainList',
			dataParams: {'table': 'dm_allweb_province_incachewebsite_report'},
			displayField: 'codeLabel',
			valueField: 'codeValue',
            fieldLabel: '泛域名',
			id: 'top_domain',
            hiddenName: 'top_domain',
			hidden: false,
            maxLength: 128,
            anchor: '95%'
//			listeners: {
//				focus : function( thiz, newValue, oldValue ) {
//					var date = Ext.getCmp('date').value;
//					if(!date) {
//						Ext.Msg.alert('提示', "请先选择日期！");
//						return;
//					}
//				}
//			}
    	})
			var is_cache = new Ext.form.ComboBox({
				id : 'is_cache',
				hiddenName : 'is_cache',
				valueField : 'value',
				displayField : 'name',
				typeAhead : true,
				width : 120,
				mode : 'local',
				store : selectStore,
				triggerAction : 'all'
			});
			
			var domain = new Ext.form.TextField({
				id : 'domain',
				name : 'domain',
			    fieldLabel:'域名',   
			    width:90
			});
			
			var queryFields = [
			{text: '网站名称'},websiteName,
			{text: '泛域名'},top_domain,
			{text: '域名'},domain,
			{text: '是否可缓存'},is_cache,
			{
				text : '查询',
				iconCls : 'dataTable-preview-icon',
				handler : function() {
					initGrid();
				}
			}, '-', {
				text: '刷新', 
				iconCls: 'role-user-reset', 
				handler : function() {
					Ext.getCmp('site_id').setValue(null);
					Ext.getCmp('top_domain').setValue(null);
					Ext.getCmp('domain').setValue('');
					Ext.getCmp('is_cache').setValue(null);
					initGrid();
				}
			}
//			,'-', {
//				text: '导出', 
//				iconCls: 'toolbar-down-icon', 
//				handler : function() {
//					alert(Ext.encode(getExcelData()));
//					var url = "dmmHotdomainSortAction.do?param="+getExcelData();
//					window.open(url);
//				}
//			}
			];
    		var columns = [new Ext.grid.RowNumberer(),
    		{header:'网站',width: 100, dataIndex:'site_name',hidden:false},
			{header:'泛域名',width:120,dataIndex:'top_domain',hidden:false},
			{header:'域名',width:120,dataIndex:'domain',hidden:false},
			{header:'资源总数量',width:80,dataIndex:'sumall',hidden:false},
			{header:'可缓存资源数量',width:100,dataIndex:'sumcache',hidden:false},
			{header:'可缓存资源比例(%)',width:120,dataIndex:'cacheper',hidden:false,renderer: Main.fun.getPerForpercent},
			{header:'不可缓存资源数量',width:100,dataIndex:'sumnocache',hidden:false},
			{header:'不可缓存资源比例(%)',width:120,dataIndex:'nocacheper',hidden:false,renderer: Main.fun.getPerForpercent},
			{header:'是否可缓存',width:80,dataIndex:'is_cache',hidden:false,renderer: Main.fun.booleanToStr}
    		];
    		
	    	this.grid = new Ext.ux.Grid({
				id: 'webSiteListGridPanel',
		    	dataMethod:'externalWsDomainCache.getList',
				frame : false,
				border: false,
				sortBar : false,
				columns:columns,
		    	columnLines : true,
				viewData: false,
		    	fetchSize : 10,
//				litePagingBar : true,
				tbar: queryFields,
				height:480				
	    	});
				
			function initGrid() {
				var data = getData();
				searchGrid(data);
			}
			
			function getData() {
				
				var tbar = self.grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = {};
				for(var i = 0; i < queryFields.length;i++)
				{
					data[queryFields[i].getName()] = queryFields[i].getValue();
				}
				return data;
			}
			
			function getExcelData() {
				var tbar = self.grid.getTopToolbar();
				var queryFields = tbar.findByType('field');
				var data = '{';
				for(var i = 0; i < queryFields.length;i++)
				{
					data= data+ queryFields[i].getName() + " : '" + queryFields[i].getValue()+"' ,";
					if(i == queryFields.length-1){
						data= data.substr(0,data.lastIndexOf(','));
					}
				}
				data = data+'}'
				return data;
			}
			
			function searchGrid(data)
			{
				self.grid.setParams(data);
				self.grid.doSearchList();
			}
		    },     
           updateData : function(data) {
				this.grid.updateParams(data);
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.grid.width = obj.offsetWidth;
				this.grid.height = obj.offsetHeight;
				
				this.grid.render(div);
				
			},
		
			run : function(data){
				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
})