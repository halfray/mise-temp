base.portal.dmNetsiteLibrariesSecondPlatform = Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/utils/main-funs-debug.js'],

	// 获取后端查询需要的查询对象信息
	getParams : function() {
		return this.params;
	},

	init : function(params) {
		var self = this;

		var userColumns = [ {
			header : '网站类型',
			width : 250,
			sortable : true,
			dataIndex : 'name',
			tpl:changeColor('name')
		}, {
			header : '总计',
			width : 250,
			sortable : true,
			dataIndex : 'TypeTotal'
		}, {
			header : '已引入数量',
			width : 250,
			sortable : true,
			dataIndex : 'typeLocalNum'
		}/*, {
			header : '分类本网他省数量',
			width : 150,
			sortable : true,
			dataIndex : 'typeInalienNum'
		}*/, {
			header : '未引入数量',
			width : 200,
			sortable : true,
			dataIndex : 'typeOutNum'
		}, {
			header : '类型',
			sortable : true,
			hidden : true,
			dataIndex : 'type'
		}, {
			header : '分类值',
			sortable : true,
			hidden : true,
			dataIndex : 'value'
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
			
			if( Ext.isEmpty(data)) return false; 
			
			treeLoader.baseParams.method = "'dmNetsiteLibrariesDetailAction.getListForTreeSecondplatform'";
			treeLoader.baseParams.result = "'direct'";
			var params = {};
			params.javaClass = "java.util.HashMap";
			params.map = {};
			Ext.apply(params.map,data);
			//params.map.province = '000000';
			if(node.attributes.type)
			{
				params.map.type = node.attributes.type;
				params.map.value = node.attributes.value;
			}
			treeLoader.baseParams.params = "[" + Ext.encode(params) + "]";
		}, this.treeLoader);

		this.tree = new Ext.ux.tree.TreeGrid({
			width : 978,
			height : 360,
			autoLoad :false,
			rootVisible: false,
			frame:false,
			//baseCls : 'x-plain',
			loader : this.treeLoader,
			border : false,
			enableSort : false,
			root : self.root,
			columns : userColumns,
			colspan : 8,
			listeners:{
				click:function(node)
				{
					if(node.attributes.leaf === true){
						getDetail(node,"true");
					}else{
						getDetail(node,"false");
					}
				}
			}
		});
		
		function getDetail(node,leafFlag){
			var record = node.attributes;
			
			var gridColumns = [new Ext.grid.RowNumberer(),
			{
				header : "网站类型",
				sortable : true,
				hidden:true,
				dataIndex : "webSite_Type",
				width : 100
			},
			   {
				header : "网站",
				sortable : true,
				dataIndex : "webSiteName",
				width : 180
			}, {
				header : "域名数量",
				sortable : true,
				dataIndex : "domainCount",
				width : 180
			}, {
				header : "引入域名数量",
				sortable : true,
				dataIndex : "domain_in_Count",
				width : 180
			}, {
				header : "引入域名占比",
				sortable : true,
				dataIndex : "domain_Proportion",
				renderer:function(value){
					return (value*100).toFixed(2)+'%';
				}, 
				width : 150
			} /*, {
				header : "网内网外域名数量",
				sortable : true,
				dataIndex : "domian_in_out_count",
				width : 120
			} , {
				header : "网内网外域名占比",
				sortable : true,
				dataIndex : "domian_in_out_Proportion",
				renderer:function(value){
					return (value*100).toFixed(2)+'%';
				}, 
				width : 120
			}, {
				header : "网外域名数量",
				sortable : true,
				dataIndex : "domain_out_count",
				width : 100
			}, {
				header : "网外域名占比",
				sortable : true,
				dataIndex : "domian_out_Proportion",
				renderer:function(value){
					return (value*100).toFixed(2)+'%';
				}, 
				width : 100
			}*//*, {
				header : "请求次数",
				sortable : true,
				dataIndex : "visit_Count",
				width : 90
			}, {
				header : "总流量(MB)",
				sortable : true,
				dataIndex : "all_Flow",
				renderer:Main.fun.getMFromByte,
				width : 90
			}, {
				header : "上行流量(MB)",
				sortable : true,
				dataIndex : "upload_Flow",
				renderer:Main.fun.getMFromByte,
				width : 90
			}, {
				header : "下行流量(MB)",
				sortable : true,
				renderer:Main.fun.getMFromByte,
				dataIndex : "download_Flow",
				width : 90
			}*/];
			
			var detailGrid = new Ext.ux.Grid({
				//tbar:queryFields,
				dataMethod:'dmNetsiteLibrariesDetailAction.searchHotWebSite',
				columns:gridColumns,
				height :308,
				width : 786,
				fetchSize:15,
				frame : false,
				border: false,
				bodyBorder: false,
				sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
				colspan : 8,
				columnLines : true,
				viewData: false
				});
			
			var windows = new Ext.Window({
				xtype : "window",
				title : record.name+"--网站详细",
				width : 800,
				height : 350,
				border: false,
				bodyBorder: false,
				autoScroll : true,
				items : [detailGrid]
			});
			windows.show();
			
			var data = getData(record,leafFlag);
			updateGrid(data,detailGrid);

		}

		function updateGrid(data,detailGrid){
			detailGrid.setParams(data);
			detailGrid.doSearchList();
		}

		function getData(record,leafFlag) {
			var data = self.getParams();
			data.websiteType = record.value;
			data.leafFlag = leafFlag;
			return data;
		};
		//修改树形节点字体颜色2013-11-28
		function changeColor(value)
		{
			return new Ext.XTemplate('{'+value+':this.changeColor}', {
		                changeColor: function(v) {
		                	return '<span style="color:#434343;">' + v + '</span>';
		                }
		            });
		}
	},
	render : function(div) {
		this.tree.render(div);
	},
	refresh : function(data) {
		this.params = data;
		this.treeLoader.load(this.root);
	}
});