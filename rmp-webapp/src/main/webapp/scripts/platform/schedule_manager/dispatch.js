/**
 * dispatch.js Power by YUI-EXT and JSON.
 * 
 * @author 
 * @email
 */

var dispatch = { 
	author: "xxx",
	version: "1.0"
};

function mydoSave(){
	var windowSelf = this;
	if(document.getElementById(EN[0]).value==""){
		Ext.Msg.alert('提示',"域名不能为空");
		return false;
	}
	if(document.getElementById(EN[4]).value==""||document.getElementById(EN[4]).value=="0"){
		Ext.Msg.alert('提示',"筛选个数不能为空或0");
		return false;
	}
	if(!(document.getElementById(EN[4]).value).match("^[0-9]*$")){
		Ext.Msg.alert('提示',"筛选个数只能为数字");
		return false;
	}
	if(document.getElementById(EN[7]).value==""||
		document.getElementById(EN[8]).value==""||
		document.getElementById(EN[11]).value==""){
			Ext.Msg.alert('提示',"权重百分比不能为空");
			return false;
		}
	if(!(document.getElementById(EN[7]).value).match("^[0-9]*$")||
		!(document.getElementById(EN[9]).value).match("^[0-9]*$")||
		!(document.getElementById(EN[11]).value).match("^[0-9]*$")){
		Ext.Msg.alert('提示',"权重百分比只能为数字");
		return false;
	}

	var SpeedFirst = document.getElementById(EN[6]).value=='权重'?0:1;
	var QualityFirst = document.getElementById(EN[8]).value=='权重'?0:1;
	var CostFirst = document.getElementById(EN[10]).value=='权重'?0:1;
	var Intspeed = parseInt(document.getElementById(EN[7]).value);
	var Intquality = parseInt(document.getElementById(EN[9]).value);
	var Intcost = parseInt(document.getElementById(EN[11]).value);
	if(SpeedFirst+QualityFirst+CostFirst >1){
		Ext.Msg.alert('提示','速度,质量,成本最多选择一个优先！');
		return false;
	}
	if(((SpeedFirst-1)*Intspeed+(QualityFirst-1)*Intquality+(CostFirst-1)*Intcost)!= -100){
		Ext.Msg.alert('提示','权重分配和不为100');
		return false;
	}
	var record = {
		domainUrl		:	document.getElementById(EN[0]).value,	
		selectcount		:	document.getElementById(EN[4]).value,
		type			:	document.getElementById(EN[5]).value=='轮询'?0:1,
		speed			:	(document.getElementById(EN[6]).value=='权重'?0:1)*100+parseInt(document.getElementById(EN[7]).value),
		quality			:	(document.getElementById(EN[8]).value=='权重'?0:1)*100+parseInt(document.getElementById(EN[9]).value),
		cost			:	(document.getElementById(EN[10]).value=='权重'?0:1)*100+parseInt(document.getElementById(EN[11]).value)
	};
	Ext.Ajax.request({
	     url:windowSelf.gridPanel.url.action,
	     method:'post',
	    params:{
			action: this.formPanel.actionType,
			record: Ext.util.JSON.encode(record)
	      },
		success: function(form, action) {
	    //alert(Ext.encode(form));
	    //alert(form.responseText);
	    var results = Ext.util.JSON.decode(form.responseText);
    		if(results.success==false){
    			Ext.Msg.alert('Error', results.msg);
    			return ;
    		}
    	windowSelf.hide();
    	windowSelf.gridPanel.store.reload();
    	//  Ext.Msg.alert('Error', action.result.msg);
		//	windowSelf.hide();
		//	windowSelf.gridPanel.store.reload();
		},
		failure: function(form, action) {
			//windowSelf.hide();
			Ext.Msg.alert('Error', action.result.msg);
		}
	  });
}

function fun_dispatch(obj){
	Ext.Ajax.request({
	     url:'dispatchCommonAction.do',
	     method:'post',
	    params:{
			action: 'dispatch',
			domainUrl: obj.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.innerHTML
	      },
		success: function(form, action) {
	    	  //alert(form.responseText);
			 Main.fun.closeProcessWait();
	    	  var results = Ext.util.JSON.decode(form.responseText);
	    	  if(results.success==false){
	    		  Ext.Msg.alert('Error', results.msg);
	    		}else{
	    			Ext.Msg.alert('Result', results.msg);
	    		}
		},
		failure: function(form, action) {
			 Main.fun.closeProcessWait();
			var results = Ext.util.JSON.decode(form.responseText);
			Ext.Msg.alert('Error', results.msg);
		}
  });
  Main.fun.showProcessWait();
}
function fun_dispatch_all(btn, ev){
	Ext.MessageBox.confirm("确认","是否全部调度?",function(btn){    
        //Ext.MessageBox.alert("你单击的按钮是："+btn);  
		if(btn=='no')return ;
		Ext.Ajax.request({
		     url:'dispatchCommonAction.do',
		     method:'post',
		    params:{
				action: 'dispatchAll'
			},
			success: function(form, action) {
				 Main.fun.closeProcessWait();
				var results = Ext.util.JSON.decode(form.responseText);
				if(results.success==false){
				  Ext.Msg.alert('Error', results.msg);
				}else{
					Ext.Msg.alert('Result', results.msg);
				}
			},
			failure: function(form, action) {
				 Main.fun.closeProcessWait();
				var results = Ext.util.JSON.decode(form.responseText);
				Ext.Msg.alert('Error', results.msg);
			}
		});
		Main.fun.showProcessWait();
	});
	}
function fun_CalculateIP(btn, ev){
	Ext.Ajax.request({
	     url:'dispatchCommonAction.do',
	     method:'post',
	    params:{
			action: 'calculateIP'
	      },
		success: function(form, action) {
	    	  alert(form.responseText);
		},
		failure: function(form, action) {
			alert('failed');
		}
 });
	}

function fun_display(obj){
	 var columns = [ 
	    	  	{header: '域名', width: 150, sortable: true, dataIndex: 'domainUrl', hidden: false},
	    	  	{header: 'IP地址', width: 120, sortable: true, dataIndex: 'ip', hidden: false},
	    	  	{header: '成本分', width: 80, sortable: true, dataIndex: 'cost', hidden: false},
	    	  	{header: '速度分', width: 80, sortable: true, dataIndex: 'speed', hidden: false},
	    	  	{header: '质量分', width: 80, sortable: true, dataIndex: 'quality', hidden: false},
	    	  	{header: '调度结果', width: 70, sortable: true, dataIndex: 'dispatch', hidden: false,renderer:function(value){if(value>0){return '调度';}else return ''}}
	    	  	];
	 var grid = new Ext.ux.SimpleGrid({
	 	columns:columns,
	 	baseCls: 'x-plain',
	 	autoLoad:false,
	 	border:false,
	 	height:300
	 });
	var win = new Ext.Window({
	    title :'调度结果：',
	    layout:'fit',
	    width:600,
	    autoHeight:true,
//	    height:400,
	    constrain:true,// 将拖动范围限制在容器内
	    items:grid,
	    closeAction: 'close'
	});

	Ext.Ajax.request({
	     url:'dispatchCommonAction.do',
	     method:'post',
	    params:{
			action: 'display',
			domainUrl: obj.parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.firstChild.innerHTML
	      },
		success: function(form, action) {
	    	 // alert(form.responseText);
	    	  var results = Ext.util.JSON.decode(form.responseText);
	    	// alert(results[0].ip);
	    	 
//	    	  win.html = "<table id='the-table'><th style='width:150px'>域名</th><th style='width:150px'>IP地址</th><th style='width:100px'>成本分</th><th style='width:100px'>速度分</th><th style='width:100px'>质量分</th><th style='width:100px'>调度结果</th>";
//	    	  for(i=0;i<results.length;i++){
//	    		  win.html += "<tr><td>"+results[i].domainUrl+"</td><td>"+results[i].ip+"</td><td>"+results[i].cost+"</td><td>"+results[i].speed+"</td><td>"+results[i].quality+"</td>";
//	    		  if(results[i].dispatch>=0){
//	    			  win.html +="<td>调度</td>";
//	    		  }
//	    		  win.html +="</tr>";
//	    	  }
//	    	  win.html +="</table>";
//	    	  if(results.length == 0)
//	    		  win.html = "该域名未拨测!";
	    	  grid.loadData(results);
	    	  win.show();
	    	  
//	    	   var grid = new Ext.ux.grid.TableGrid("the-table", {
//	            stripeRows: true // stripe alternate rows
//	        });
//	        grid.render();
		},
		failure: function(form, action) {
			Ext.Msg.alert('提示','failed');
		}
  });
 
}

// -> Action URL
var URL = {
	queryList : 'dispatchListProvider.do',
	action : 'dispatchAction.do'
};

// -> Primary key
var PK = ["domainId"];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0: "域名",          
	1: "速度",          
	2: "质量",          
	3: "成本",          
	4: "筛选个数",          
	5: "分配方式",          
	6: "结果查询", 
	7: "权重百分比",
	8: "域名ID"
};

// -> Column name in English
var EN = {
	0: "domainUrl",
	1: "speed",          
	2: "quality",          
	3: "cost",          
	4: "selectcount",          
	5: "type",  
	6: "SpeedFirst",
	7: "SpeedWeight",
	8: "QualityFirst",
	9: "QualityWeight",
	10: "CostFirst",
	11: "CostWeight",
	12: "domainId"
	
	//6: "dip",          
	//7: "pp0001",          
};

// -> Cell width
var WD = {
	0: "9",          
	1: "10",          
	2: "5",          
	3: "5",          
	4: "5",          
	5: "5",          
	6: "65,535"   
};

// -> Data type e.g: float,int,string
var TY = {
	0: "string",          
	1: "int"
};

var storeFields = [	    
	{name: EN[0], type: TY[0]},          
	{name: EN[1], type: TY[1]},          
	{name: EN[2], type: TY[1]},          
	{name: EN[3], type: TY[1]},          
	{name: EN[4], type: TY[1]},          
	{name: EN[5], type: TY[1]},          
	{name: EN[6], type: TY[1]},          
	{name: EN[7], type: TY[1]},          
    {name: EN[8], type: TY[1]},
    {name: EN[12], type: TY[1]}
];

var formFields = [
                  { xtype:'form',frame:true,baseCls: 'x-plain',items:[         		    
            		    {id: EN[0], name: EN[0], fieldLabel:CN[0], xtype: 'textfield'}
            		  ]},  	
                  {
                	  xtype:'panel',layout:'column',frame:true,baseCls: 'x-plain',items:
                		  [
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[6],name: EN[6], fieldLabel:CN[1], xtype: 'combo',store:['优先','权重'],triggerAction:'all'}	]},
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[7],name: EN[7], fieldLabel:CN[7], xtype: 'textfield'} 	]}
                		  ]
                  },
                  {
                	  xtype:'panel',layout:'column',frame:true,baseCls: 'x-plain',items:
                		  [
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[8],name: EN[8], fieldLabel:CN[2], xtype: 'combo',store:['优先','权重'],triggerAction:'all'}	]},
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[9],name: EN[9], fieldLabel:CN[7], xtype: 'textfield'} 	]}
                		  ]
                  },
                  {
                	  xtype:'panel',layout:'column',frame:true,baseCls: 'x-plain',items:
                		  [
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[10],name: EN[10], fieldLabel:CN[3], xtype: 'combo',store:['优先','权重'],triggerAction:'all'}	]},
                		   { xtype:'form',columnWidth:.5,frame:true,baseCls: 'x-plain',items:[{id: EN[11],name: EN[11], fieldLabel:CN[7], xtype: 'textfield'} 	]}
                		  ]
                  },

                  { xtype:'form',frame:true,baseCls: 'x-plain',items:[{id: EN[4], name: EN[4], fieldLabel:CN[4], xtype: 'textfield'}	]},  	
                  { xtype:'form',frame:true,baseCls: 'x-plain',items:[{id: EN[5], name: EN[5], fieldLabel:CN[5], xtype: 'combo',store:['轮询','顺序'],triggerAction:'all'}	]}	
                  ];	

var userColumns =[ 
    {header: CN[0], width: 200, sortable: true, dataIndex: EN[0], hidden: false, hideable: false,editor: {xtype: 'textfield'} }, 
   // {header: CN[8], width: WD[0], sortable: true, dataIndex: EN[12], hidden: false, hideable: false,editor: {xtype: 'textfield'} },
    {header: CN[1], width: WD[1], sortable: true, dataIndex: EN[1], hidden: false, hideable: false,editor: {xtype: 'textfield'}, renderer:function(value){if(value>100){return '(优先)'+(value-100)+'个';}else{return value+'%'}} },  
    {header: CN[2], width: WD[2], sortable: true, dataIndex: EN[2], hidden: false, hideable: false,editor: {xtype: 'textfield'}, renderer:function(value){if(value>100){return '(优先)'+(value-100)+'个';}else{return value+'%'}} },   
    {header: CN[3], width: WD[3], sortable: true, dataIndex: EN[3], hidden: false, hideable: false,editor: {xtype: 'textfield'}, renderer:function(value){if(value>100){return '(优先)'+(value-100)+'个';}else{return value+'%'}} },  
    {header: CN[4], width: WD[4], sortable: true, dataIndex: EN[4], hidden: false, hideable: false,editor: {xtype: 'textfield'} },  
    {header: CN[5], width: WD[5], sortable: true, dataIndex: EN[5], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value){
    	var Type = {0: "轮询",1: "顺序" };
    	return Type[value];
    		}
    },
    //{header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'} }  
    {header: CN[6], width: WD[6], sortable: true, dataIndex: EN[6], hidden: false, hideable: false,editor: {xtype: 'textfield'},renderer:function(value,cellmeta){return "<INPUT type='button' style='width:40px' value='查看' onclick='fun_display(this)'><INPUT type='button' style='width:40px' value='调度' onclick='fun_dispatch(this)'>";}	}
   
];

// TODO: default xtype, width
var queryFields = [
       {text: CN[0]},           
	   {
			xtype:'textfield',
			id: '#'+EN[0],
	   		width: 90
	   	}
       
];

// 
var queryParms = [
	{name: EN[0], indicator: 'EXAMPLE_LIKE'}
];


Ext.onReady(function() {
	
    Ext.QuickTips.init();
    Ext.override(Ext.ux.seraph.FormEditor,{
    	doSave : mydoSave
    });
    var userGrid = new Ext.ux.seraph.FormEditorGrid({
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
    	storeFields: storeFields,
    	formFields: formFields,
    	queryFields: queryFields,
    	queryParms: queryParms,
    	columns: userColumns,
    	pk: PK,
    	url: URL,
    	formWinWidth:800,
        buildEditor : function() {
        	// supply grid self
        		// supply grid self
      	var formEditor = new Ext.ux.seraph.FormEditor(this, this.formPanel);
        formEditor.setWidth(this.formWinWidth);
        return formEditor;
        },
        buildForm : function() {
        	var grid = this;
        	var formPanel = new Ext.Panel({
    			baseCls: 'x-plain',
    	        labelWidth: 70,
    	        frame:true,
    	        bodyStyle:'padding:10px; border: 0px solid;',
    	        autoWidth: true,
    			autoScroll: true,
    			bodyBorder: false,
    			border: false,
    	        items: [grid.formFields]
    	    });
        	return formPanel;
        },
        doSave : mydoSave,
        onCreate : function(btn, ev) {
        	this.editor.setTitle('添加记录');
    		this.editor.show();
    		this.editor.formPanel.actionType = ACTION.add;
    		this.formPanel.oldRecord = null;
    		document.getElementById(EN[0]).disabled=false;
    		document.getElementById(EN[0]).value='';
    		document.getElementById(EN[4]).value='';
    		document.getElementById(EN[5]).value='轮询';
    		document.getElementById(EN[6]).value='优先';
    		document.getElementById(EN[7]).value='';
    		document.getElementById(EN[8]).value='权重';
    		document.getElementById(EN[9]).value='';
    		document.getElementById(EN[10]).value='权重';
    		document.getElementById(EN[11]).value='';
    		//this.formPanel.getForm().reset();
        }, 
        onUpdate : function(btn, ev) {
        	
    		var record = this.getSelectionModel().getSelected();
    		if(!record) {
    			Ext.Msg.alert('提示', '请先选择一条记录！'); 
    			return;
    		}
    		
    		this.editor.setTitle('修改记录');
    		this.editor.show();
    		this.editor.formPanel.actionType = ACTION.update;
    		this.formPanel.oldRecord = record;
    		var Type = {0: "轮询",1: "顺序" };
    		var typeval=record.get(EN[5]);
    		document.getElementById(EN[0]).disabled=true;
    		document.getElementById(EN[0]).value=record.get(EN[0]);
    		document.getElementById(EN[4]).value=record.get(EN[4]);
    		document.getElementById(EN[5]).value=Type[typeval];
    		if(record.get(EN[1])>100){
    			document.getElementById(EN[6]).value='优先';
    			document.getElementById(EN[7]).value=record.get(EN[1])-100;
    		}else{
    			document.getElementById(EN[6]).value='权重';
    			document.getElementById(EN[7]).value=record.get(EN[1]);
    		}
    		if(record.get(EN[2])>100){
    			document.getElementById(EN[8]).value='优先';
    			document.getElementById(EN[9]).value=record.get(EN[2])-100;
    		}else{
    			document.getElementById(EN[8]).value='权重';
    			document.getElementById(EN[9]).value=record.get(EN[2]);
    		}
    		if(record.get(EN[3])>100){
    			document.getElementById(EN[10]).value='优先';
    			document.getElementById(EN[11]).value=record.get(EN[3])-100;
    		}else{
    			document.getElementById(EN[10]).value='权重';
    			document.getElementById(EN[11]).value=record.get(EN[3]);
    		}
    		
    		//this.formPanel.getForm().setValues(record.json);
        },
        onDelete : function(btn, ev) {
        	
        	var gridSelf = this;
        	
        	var record = this.getSelectionModel().getSelected();
        	if (!record) {
        		Ext.Msg.alert('提示', '请先选择一条记录！'); 
                return;
            }
        	
        	Ext.Msg.confirm('确认', '确认删除所选记录?&nbsp;', function(val){
        		if(val == 'yes'){
    			 	Ext.Ajax.request({
    				   	url: gridSelf.url.action,
    	   				success: function(response) {
    		   				var baseResponse = response.responseText.evalJSON();
    		   				if (baseResponse.success) {
    		   					gridSelf.store.remove(record);
    		   				} else {
    		   					Ext.Msg.alert('提示', baseResponse.msg);
    		   				}
    		   				gridSelf.store.reload();				   	     
    	   				},
    	   				failure: Ext.emptyFn,
           				params: {
           					action: ACTION.del,    	    	       
           					record: Ext.util.JSON.encode(record.data)
                  		}
    				});
        		}
        	});
        },
    	buildTbar : function(queryFields) {
        	var gridSelf = this;
        	return [{
                text: '添加',
                iconCls: 'dataTableList-add-icon',
                scope: this,
                handler : gridSelf.onCreate
    	    }, '-', {
    	        text: '修改',
    	        iconCls: 'dataTableList-modify-icon',
                scope: this,
    	        handler: gridSelf.onUpdate
    	    }, '-', {
                text: '删除',
                iconCls: 'dataTableList-delete-icon',
                scope: this,
                handler : gridSelf.onDelete
    	    }, '-', queryFields, {
            	text: '查询', 
            	iconCls: 'dataTable-preview-icon', 
            	handler : function() {
            		gridSelf.loadData();
            	}
            },'-',{
            	text:'全部调度',
            	iconCls: 'control-icon', 
            	handler :fun_dispatch_all
            }
           /* ,'-',{
            	text:'测试后台',
            	handler :fun_CalculateIP
            }*/]
        }
    })
    
});

