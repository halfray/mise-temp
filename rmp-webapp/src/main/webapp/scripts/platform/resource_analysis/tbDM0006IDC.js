/*
Ext.onReady(function() {

	Ext.QuickTips.init();

    var grid =new  Ext.ux.SimpleGrid( {
    	url:"rmWebSiteTotalViewActions.do?method=getCommMap&&params={sql:'getSBInfos',type:'009'}",
        stateId: 'stateGrid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
        columns: [
            {header: '信息', width: 100, sortable: true, dataIndex: 'title'},
            {header: '总数', width: 80,dataIndex: 'count'}
        ],
        renderTo: 'user-grid',
        viewConfig: {
            stripeRows: true
        }
    });
});

 */
Ext.onReady(function() {
	
    Ext.QuickTips.init();
    function change(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    function pctChange(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }
    M.rpc._call(resultCallBack,"monitoringTemplateAction.getProbesystemOverview");
    
    function resultCallBack(result){   
    var myData = [
        	        ['上报省份数量',result.probereptprovincenum],
        	        ['上报域名数量',result.probereptdomainnum],
        	        ['上报URL数量',result.proberepturlnum]
        	    ];
    var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'title',type: 'String'},
           {name: 'count',type: 'String'}
        ],
        autoLoad : false,
        data: myData
    });
//	var store = new Ext.data.JsonStore({
//	    url:"rmWebSiteTotalViewActions.do?method=getCommMap&&params={sql:'getSBInfos',type:'1100'}",
//	    restful: true,
//	    fields: [
//           {name: 'title',type: 'String'},
//           {name: 'count',type: 'String'}
//        ]
//    });
    
    var tb = new Ext.Toolbar({
        height: 30,
        items: [
           {xtype: 'tbtext', text: '<div>系统状态：<img src="images/platform/icon/status.png" align="absmiddle" /></div>'}
        ]
    });
    var grid =new  Ext.grid.GridPanel( {
        store: store,
        stateful: true,
        stateId: 'stateGrid',
        bbar:tb,
        width:180,
        height:170,
        columns: [
            {id: 'title', header: '信息', width: 150, sortable: true, dataIndex: 'title'},
            {header: '总数', width: 120,dataIndex: 'count'}
        ],
        renderTo: 'user-grid',
        viewConfig: {
            stripeRows: true,
            forceFit:true
        }
    });
    store.load();
   
    }
}); 