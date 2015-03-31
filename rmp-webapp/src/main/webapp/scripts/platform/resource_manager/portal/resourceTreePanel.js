/**
 * 各省网站资源对比中，树型列表展示各省资源情况
 */
base.portal.resourceTreePanel = Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/utils/main-funs-debug.js'],

	// 获取后端查询需要的查询对象信息
	getParams : function() {
		return this.params;
	},

	init : function(params) {
		var self = this;

		var columns = [{
			header : "省份",
			dataIndex : "name",
			width : 180,
			align : 'center'
		}, {
			header : "域名本网数量",
			dataIndex : "domainCount",
			width : 100,
			align : 'center'
		}, {
			header : "URL数量",
			dataIndex : "urlCount",
			width : 100,
			align : 'center'
		}, {
			header : "域名本网引入率",
			dataIndex : "domainLocalCount",
			width : 100,
			tpl: new Ext.XTemplate('{domainLocalCount:this.formatDomainLocalCount}', {
                formatDomainLocalCount: function(v) {
                return (v*100).toFixed(2) + "%";
                }
            }),
			align : 'center'
		}, {
			header : "本网请求次数占比",
			dataIndex : "localRequestCount",
			tpl: new Ext.XTemplate('{localRequestCount:this.formatlocalRequestCount}', {
                formatlocalRequestCount: function(v) {
                return (v*100).toFixed(2) + "%";
                }
            }),
			width : 100,
			align : 'center'
		}, {
			header : "更新日期",
			dataIndex : "date",
			width : 100,
			align : 'center'
		}, {
			header : "type",
			dataIndex : "type",
			hidden : true,
			width : 100,
			align : 'center'
		}, {
			header : "value",
			dataIndex : "value",
			hidden : true,
			width : 100,
			align : 'center'
		}];
		
		this.root = new Ext.tree.AsyncTreeNode({
					id : '0',
					text : '根节点',
					draggable : false,
					expanded : true
				});
		// 创建动态加载树
		this.treeLoader = new Ext.tree.TreeLoader({
					dataUrl : M.rpc.path
				});
		this.treeLoader.on("beforeload", function(treeLoader, node) {
			var data = self.getParams();
			
			if( Ext.isEmpty(data) || Ext.isEmpty(data.webSite_ID) ) return false; 
			
			treeLoader.baseParams.method = "allProvinceResourcesContrastAction.getListForTree";
			treeLoader.baseParams.result = "direct";
			params = {};
			params.javaClass = "java.util.HashMap";
			params.map =data;
			if(node.attributes.type)
			{
				params.map.type = node.attributes.type;
				params.map.value = node.attributes.value;
			}
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, this.treeLoader);

		this.tree = new Ext.ux.tree.TreeGrid({
					width : 950,
					height : 400,
					autoLoad : false,
					rootVisible : false,
					loader : this.treeLoader,
					border : false,
					enableSort : false,
					root : self.root,
					columns : columns,
					colspan : 8
				});
	},
	render : function(div) {
		this.tree.render(div);
	},
	refresh : function(data) {
		this.params = data;
		this.treeLoader.load(this.root);
	}
});