/**
 * tbDM0004.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */
var tbDM0006 = { 
	author: "xxx",
	version: "1.0"
};

// -> Action URL
var URL = {
	queryList : 'tbDM0006TotalListProvider.do',
};

// -> Primary key
var PK = ["pp0105","dd0001","ip0001"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "名称",          
	1: "概要"
};

// -> Column name in English
var EN = {
	0: "pp0001",          
	1: "pp0105"
};

// -> Cell width
var WD = {
	0: 100,          
	1: 200
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "string"
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]}
];

var formFields = [
     {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'},  	
     {id: EN[1], name: EN[1], fieldLabel:CN[1], xtype: 'textfield'}
];	

var userColumns =[ 
    {header: CN[0], width: WD[0], sortable: true, dataIndex: EN[0], hidden: true, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: true, hideable: false,editor: {xtype: 'textfield'} }
];

// TODO: default xtype, width
var queryFields = [
	{text: CN[3]},           
    {
		xtype:'textfield',
		id: '#dd0002',
		width: 90
	} 
];

// 
var queryParms = [
    {name: EN[3], indicator: 'EXAMPLE_LIKE'}  
];

function showCharts(domainName){
	
	var testWindow=new Ext.Window({
		id : 'VideoUrlDetailWin',
		title : '链接地址',
		width :1050,
		height : 600,
		draggable:true,
		constrain:true,// 将拖动范围限制在容器内
		autoDestroy:false,
		closeAction: 'close',
	    modal : true 
    });
	testWindow.html="<iframe id='myFrame' name='myFrame' width='100%' height='100%' src='portalPixel.do?portalCode=tbDM0006Chart'/>";
	testWindow.show();
};

Ext.onReady(function() {
	
    Ext.QuickTips.init();

    // sample static data for the store
    var myData = [
        ['Top1000网站','<span style="color:green;">71.72</span>'],
        ['域名概要',                           29.01],
        ['大文件概要',                    83.81],
        ['智能处理域名',                    83.81],
        ['智能处理URL',                    83.81]
    ];

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function change(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    /**
     * Custom function used for column renderer
     * @param {Object} val
     */
    function pctChange(val) {
        if (val > 0) {
            return '<span style="color:green;">' + val + '%</span>';
        } else if (val < 0) {
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }

    // create the data store
    var store = new Ext.data.ArrayStore({
        fields: [
           {name: 'company'},
           {name: 'price',      type: 'String'}
        ],
        autoLoad : false,
        data: myData
    });

    // create the Grid
    var grid =new  Ext.grid.GridPanel( {
        store: store,
        stateful: true,
        stateId: 'stateGrid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
        columns: [
            {id: 'company', header: '名称', width: 100, sortable: true, dataIndex: 'company'},
            {header: '概要', width: 60,dataIndex: 'price'}
        ],
        renderTo: 'user-grid',
        viewConfig: {
            stripeRows: true
        }
    });
	function doAjax(cUrl,cParams,sbFunction){
		Ext.Ajax.request({
			url:cUrl,
			params:cParams,
			success: sbFunction
		});
	}
	function sbWebSite(response){
		var JSONData = response.responseText.evalJSON();
		if(JSONData!="undefined"){
			var tmpArray=new Array();
			tmpArray[0]='Top1000网站';
			tmpArray[1]='网站公网内'+JSONData[0].num+'个；网内网外'+JSONData[1].num+'个；仅网外'+JSONData[2].num+'个';
			myData[0]=tmpArray;
			store.loadData(myData);
		}
	}
	doAjax("tbWsM0003TotalProvider.do",{},sbWebSite);
});