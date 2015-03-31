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
    M.rpc._call(resultCallBack,"monitoringTemplateAction.getDmDpiOverview");
    
    function resultCallBack(result){  
    var myData = [
                  ['上报域名数量',result.dpireptdomainnum],
                  ['上报URL数量',result.dpirepturlnum]
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
//	    url:"rmWebSiteTotalViewActions.do?method=getCommMap&&params={sql:'getSBInfos',type:'1400'}",
//	    restful: true,
//	    fields: [
//           {name: 'title',type: 'String'},
//           {name: 'count',type: 'String'}
//        ]
//    });
    
    var tb = new Ext.Toolbar({
        height: 30,
        items: [
           {xtype: 'tbtext', text: '<div>系统状态：<img src="images/platform/icon/status-offline.png" align="absmiddle" /></div>'}
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
            {header: '总数', width: 84,dataIndex: 'count'}
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