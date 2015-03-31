
Ext.ux.PagingToolbar = function(store) {
			 
	var pagingToolbar = new Ext.PagingToolbar({
		pageSize: 15,
		store: store,
		displayInfo: true,
		displayMsg: '显示 {0} - {1}, 总条数 {2}',
		emptyMsg: '无记录',
		plugins : [new Ext.ux.plugins.PageComboResizer()], // 调整每页显示的行数
		prependButtons : true
//		items:[' ','每页显示',' ',
//			new Ext.form.ComboBox({
//				store: new Ext.data.SimpleStore({
//					fields: ['codeName', 'codeValue'],
//					data: [[10,10],[15,15],[20,20],[30,30],[40,40],[60,60],[80,80],[100,100]]
//				}),
//				width:50,
//				displayField:'codeValue',
//				typeAhead: true,
//				mode: 'local',
//				value: 15,
//				triggerAction: 'all',
//				selectOnFocus: true,
//				listeners: {
//					change: {
//						fn: function(box,newValue,oldValue) {
//							PagingToolbarTools.changePageSize(store, pagingToolbar, newValue);
//						}
//					},
//					select: {
//						fn: function(combo, value) {
//							PagingToolbarTools.changePageSize(store, pagingToolbar, combo.getValue()); 
//						}
//					} 
//				}
//			}),'条记录'
//		]  
	});
	return pagingToolbar;
};
		
//var PagingToolbarTools = {
//	changePageSize : function(store, pagingToolbar, pageSize) {
//		if(pageSize != null && pageSize > 0) {
//			pagingToolbar.pageSize = parseInt(pageSize);
//			store.load({params:{start:0, limit: pagingToolbar.pageSize}});
//			store.reload();
//		}
//	}
//};