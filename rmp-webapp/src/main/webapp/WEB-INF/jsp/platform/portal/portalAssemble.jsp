<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<html>
<head>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title><c:out value="${scPortalSty.portalTitle}" /></title>
</head>
<link rel="stylesheet" type="text/css"
	href="styles/platform/dashboard-icon.css" />
<style type="text/css">
html,body {
	font: normal 11px verdana;
	background-color: #dfe8f6;
}

.hidden-cls {
	visibility: hidden;
	display: none;
}

#main-panel {
	top: 0px;
}

.x-table-layout td {
	padding: <c:out value="${scPortalSty.padding}"/>px;
}

.x-btn-text-icon .x-btn-icon-small-left .x-btn-text {/*调整查询刷新按钮位置*/
    background-position: 0 center;
    background-repeat: no-repeat;
    height: 27px;
    margin-left: 10px;
    margin-top: 6px;
    padding-left: 18px;
}
</style>
<script type="text/javascript">
var parmCodeArray = <c:out value="${parmCodeArray}" escapeXml="false" />;
var noticeCellArray = <c:out value="${noticeCellArray}" escapeXml="false" />;
var neighbourCellHash = <c:out value="${neighbourCellHash}" escapeXml="false" />;
var parmDefaultValueArray = <c:out value="${parmDefaultValueArray}" escapeXml="false" />;
// 把通过portalAssemble.do传递过来的扩展参数，写入portal参数中
var uxParams = <c:out value="${uxParams}" escapeXml="false" />;


//监听子模块是否可用
var listener = function(frame,parms)
{
	this.frame = frame;
	this.parms = parms;
}
listener.prototype.run = function()
{
	var self = this;
	
	if(Ext.isEmpty($(self.frame).contentWindow.PortalPostman))
	{
		self.con = setInterval(function(){
			if(!Ext.isEmpty($(self.frame).contentWindow.PortalPostman))
				{
					$(self.frame).contentWindow.PortalPostman.notice(self.parms);
					clearInterval(self.con);
				}
		},1000);
	}else
	{
		$(self.frame).contentWindow.PortalPostman.notice(self.parms);
	}
}
// 魔术窗传递的参数
var objParams;
if(Ext.isDefined(window.dialogArguments)) {
	objParams = window.dialogArguments;
}
//合并两个json对象
mergeJsonObject = function(jsonbject1, jsonbject2) {   
	var resultJsonObject={};   
	for(var attr in jsonbject1){  
	 
		resultJsonObject[attr]=jsonbject1[attr];   
	}   
	
	for(var attr in jsonbject2){   
	
		resultJsonObject[attr]=jsonbject2[attr];   
	}   
	return resultJsonObject;   
};  

var EventHandler = {
	
	getPortalParmStr : function() {
		
		var portalParmStr = "{";
		var parmArray = new Array();
    	for(i = 0; i < parmCodeArray.length; i++) {
    		
    		var parmCode = parmCodeArray[i].parmCode;
    		var parmType = parmCodeArray[i].parmType;
    		
    		var parmValue='';
    		var inputValue = Ext.getCmp('#' + parmCode).getValue();
    		if(parmType=='3' && inputValue != ''){
    	 		 parmValue = inputValue.format("Ymd");
    		}else{
    	 		 parmValue = inputValue;
    		}
    		parmArray.push("'" + parmCodeArray[i].parmCode + "':'" + parmValue + "'");
    	}
    	
    	portalParmStr += parmArray.join(', ');
    	portalParmStr += "}";
    	// 合并原来portal参数和魔术窗口参数
		if(objParams != null ){
			portalParmStr = mergeJsonObject(Ext.decode(portalParmStr), objParams);
			//objParams = null; //传递扩展参数，传值后置空
			return Ext.encode(portalParmStr);
		}
		// 合并原来portal参数和新增Tab窗口传递的参数
		if(uxParams != null ){
			portalParmStr = mergeJsonObject(Ext.decode(portalParmStr), uxParams)
			if(!uxParams.setNull || uxParams.setNull == false){
				uxParams = null; //传递扩展参数，传值后置空
			}
			return Ext.encode(portalParmStr);
		}
		
    	return portalParmStr;
	},
	pageLevelNotice : function(portalParmStr) {
		if(portalParmStr == null) {
			return;
		}
		
		for(i = 0; i < noticeCellArray.length; i++) {
			
    		var id = noticeCellArray[i].id;
    		
    		var frameId = 'content' + id;
    		var frameObj = $(frameId);
    		
    		new listener(frameId,portalParmStr).run();
    		
    		/* var src = '';
    		if(portalParmStr.search("\\?")) {
    			src = href + "?" + portalParmStr;
    		} else {
    			src = href + "&" + portalParmStr;
    		}
    		var frameId = 'content' + id;
    		Ext.getCmp(id).update('<iframe id=\'content' + id + '\' scrolling="auto" width="100%" height="100%" src=' + src + '></iframe>'); */
    	}
	},

	/*refresh : function(){
		var portalParmStr = "{";
		var parmArray = new Array();
    	for(i = 0; i < parmCodeArray.length; i++) {
    		
    		var parmCode = parmCodeArray[i].parmCode;
    		var parmType = parmCodeArray[i].parmType;
    		
    		var parmValue='';
    		if(parmCode == 'province'){
    			Ext.getCmp('#' + parmCode).setValue('510000');
        	}else if(parmCode == 'topN'){
        		Ext.getCmp('#' + parmCode).setValue('1000');
            }else{
        		Ext.getCmp('#' + parmCode).setValue();
            }
    		var inputValue = Ext.getCmp('#' + parmCode).getValue();
    		if(parmType=='3' && inputValue != ''){
    	 		 parmValue = inputValue.format("Ymd");
    		}else{
    	 		 parmValue = inputValue;
    		}
    		
   			parmArray.push("'" + parmCodeArray[i].parmCode + "':'" + parmValue + "'");
    	}
    	
    	portalParmStr += parmArray.join(', ');
    	portalParmStr += "}";

    	if(portalParmStr == null) {
			return;
		}
		
		for(i = 0; i < noticeCellArray.length; i++) {
			
    		var id = noticeCellArray[i].id;
    		
    		var frameId = 'content' + id;
    		var frameObj = $(frameId);
    		
    		try{
    			$(frameId).contentWindow.PortalPostman.notice(portalParmStr);
    		} catch(g) {
    			alert(g);
    		}
    	}
	},*/
	
	cellLevelNotice : function(cellId, parms) {
		
		if(cellId == null || parms == null) {
			return;
		}
		
		var neighbourCellIdArray = neighbourCellHash[cellId];
    	for(i = 0; i < neighbourCellIdArray.length; i++) {
    		var id = neighbourCellIdArray[i];
    		
			var frameId = 'content' + id;
    		var frameObj = $(frameId);
    		
    		new listener(frameId,parms).run();
    		
    	}
	},
	getPortalParmDefalutValue : function() {
		
		var portalParmStr = "{";
		var parmArray = new Array();
    	for(i = 0; i < parmDefaultValueArray.length; i++) {
    		
    		var parmCode = parmDefaultValueArray[i].parmCode;
    		var parmValue = parmDefaultValueArray[i].value;
    		if(!Ext.isDefined(parmValue)){
				parmValue = '';
        	}
    		Ext.getCmp('#' + parmCode).setValue(parmValue);
    		
    		parmArray.push("'" + parmCodeArray[i].parmCode + "':'" + parmValue + "'");
    	}
    	
    	portalParmStr += parmArray.join(', ');
    	portalParmStr += "}";
    	
    	// 合并原来portal参数和魔术窗口参数
		if(objParams != null ){
			portalParmStr = mergeJsonObject(Ext.decode(portalParmStr), objParams);
			//objParams = null; //传递扩展参数，传值后置空
			return Ext.encode(portalParmStr);
		}
		// 合并原来portal参数和新增Tab窗口传递的参数
		if(uxParams != null ){
			portalParmStr = mergeJsonObject(Ext.decode(portalParmStr), uxParams)
			if(!uxParams.setNull || uxParams.setNull == false){
				uxParams = null; //传递扩展参数，传值后置空
			}
			return Ext.encode(portalParmStr);
		}
		
    	return portalParmStr;
	},
	tbarInit : function(thiz, portalParmStr) {
       	var tbar = thiz.getTopToolbar();
       	if(tbar){
        	//为tbar添加默认值，同名参数赋值
        	var jsonObject = Ext.decode(portalParmStr);
			var queryFields = tbar.findByType('field');
			for(var i = 0; i < queryFields.length;i++)
			{
				for(var attr in jsonObject){
					if(queryFields[i].getName() == ("#"+attr)){
						queryFields[i].setValue(jsonObject[attr]);
					}
				}
			}
			var typeList = Ext.getCmp('#webSiteType');
			if(Ext.isDefined(typeList))
			{
	        	typeList.on('expand',function(){
	        		var root = typeList.root;
	        		findchildnode(root);
	        		root.collapseChildNodes(true);
	        	})
	
	        		//获取所有的子节点 
	        	function findchildnode(node){
	        		 var childnodes = node.childNodes;
	        		 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
	        			 var nd = this;
	        			 nd.getUI().addClass("x-treenodeColor");

	        			 var path = Main.contextPath;
	        			 
	        			 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
	        				 nd.expand(false,false,function(){
	        					 findchildnode(nd); //如果存在子节点 递归
	        				 });
	        			 }else{
	        				 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-root-node');
	        				 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-node-leaf');
	        				 Ext.Element.fly(nd.getUI().getIconEl()).removeClass('x-tree-node-icon');
	        				 nd.getUI().getIconEl().src = path+'/scripts/ext-3.3.1/resources/images/default/tree/leaf.png';
	        			 }
	        		 });
	        	}
			}
		}
	}
	
	
};

var PreviewRobot = {

	takeLook : function(id, title, href) {
		
		var previewWin = new Ext.Window({
			contentEl: 'preview-el',
			iconCls: 'dashboard-preview-icon',
			resizable: true,
			title: 'Inspect',
			width: 450,
			height: 400,
			closeAction: 'hide',
			html: this.htmlCreate(id, title, href)
		});
		previewWin.show();
	},

	htmlCreate : function(id, title, href) {
		var src = '';
		if(href.search("\\?") == -1 ) {
			src = href + "?cellId=" + id + "&cellTitle=" + title;
		} else {
			src = href + "&cellId=" + id + "&cellTitle=" + title;
		}
		return '<iframe id=\'' + id + '\' scrolling="auto" width="100%" height="100%" src=' + src + '></iframe>';
	},
	
	showDes : function(description) {
		
		var showDesWin = new Ext.Window({
			contentEl: 'preview-el',
			iconCls: 'dashboard-preview-icon',
			resizable: false,
			bodyStyle:'background-image:URL("/rmp/scripts/ext-3.3.1/resources/images/default/panel/background-img_2.png");background-repeat:no-repeat; background-position: 2px 10px;padding-left: 15px;padding-top: 20px;',
			title: '说明',
			width: 390,
			height: 420,
			closeAction: 'hide',
			html: description
		});
		showDesWin.show();
	}
}

var COLUMN_COUNT = 3;
var PADDING = 5;
var CELL_WIDTH = 150;
var CELL_HEIGHT = 150;

var columnCount = <c:out value="${scPortalSty.columnCount}" />;
var padding = <c:out value="${scPortalSty.padding}" />;
var cellWidth = <c:out value="${scPortalSty.cellWidth}" />;
var cellHeight = <c:out value="${scPortalSty.cellHeight}" />;

if(columnCount != null) COLUMN_COUNT = columnCount;
if(padding != null) PADDING = padding;
if(cellWidth != null) CELL_WIDTH = cellWidth;
if(cellHeight != null) CELL_HEIGHT = cellHeight;

var Calculator = {

	getWidth : function(cellWidth, padding, colNum) {
		var difference = padding*2*colNum;
		return cellWidth*colNum - 10;
	},

	getHeight : function(cellHeight, padding, rowNum) {
		var difference = padding*2*rowNum;
		return cellHeight*rowNum - 10;
	}
	
};

function changHtmlTo(str) {
	str = str.replace(/</g, "&lt;"); 
	str = str.replace(/>/g, "&gt;"); 
	return str;
}
Ext.onReady(function() {

	var HtmlCreator = {
		create : function(id, title, href, value){
			var str = changHtmlTo(value);
			var src = '';
			if(href.search("\\?") == -1 ) {
				src = href + "?cellId=" + id + "&cellTitle=" + title;
			} else {
				src = href + "&cellId=" + id + "&cellTitle=" + title;
			}
			return '<iframe id=\'content' + id + '\' scrolling="auto" width="100%" height="100%" src=' + src + ' name=' + str + '></iframe>';		
		}
	};

	var tools = [/**{
        id: 'maximize',
        handler: function(e, target, panel){
	    	var frameId = 'content' + panel.getId();
	        var href = $(frameId).src;
			PreviewRobot.takeLook(frameId, panel.title, href);
        }
    },{
        id:'refresh',
        handler: function(e, target, panel){
	    	var frameId = 'content' + panel.getId();
	        $(frameId).src = $(frameId).src;
    	}
    },**/{
        id:'help',
        tooltip: '帮助',
        iconCls: 'dashboard-preview-icon',
        handler: function(e, target, panel){
	    	var frameId = 'content' + panel.getId();
	        PreviewRobot.showDes($(frameId).name);
    	}
    }];

	Ext.Ajax.request({
		url: 'portalCellCfgProvider.do?portalCode=<c:out value="${scPortalSty.portalCode}" />',
		success: function(response) {
		
			var list = response.responseText.evalJSON();
			
			var columnArray = new Array();
			if(list != null) {
	
				for(var i = 0; i < list.length; i++) {
					
					var width = list[i].width != 0 ? list[i].width : Calculator.getWidth(CELL_WIDTH, PADDING, list[i].colNum);
					var height = list[i].height != 0 ? list[i].height : Calculator.getHeight(CELL_HEIGHT, PADDING, list[i].rowNum);
					
					var cell = {
						id: list[i].id,
						title: list[i].cellTitle,
						autoScroll: false,
						width: width,
						height: height,
						colspan: list[i].colNum,
						rowspan: list[i].rowNum,
						//collapsible: true,
						tools: tools,
						html: HtmlCreator.create(list[i].id, list[i].cellTitle, list[i].href, list[i].description)
					};
					columnArray.push(cell);
				}
				
				// For IE6+ add placeholder cell to calculate the total count of column
 				for(var i = 0; i < COLUMN_COUNT; i++) {
					var placeholder_cell = {
						baseCls: 'hidden-cls',
						bodyStyle: 'visibility: hidden;display: none;',
						autoScroll: false
					};
					columnArray.push(placeholder_cell);	
				}
				
				var panel = new Ext.Panel({
			        id: 'main-panel',
			        //baseCls: 'x-plain',
			        renderTo: 'portal-el',
					layout:'table',
					layoutConfig: {columns: COLUMN_COUNT},
					autoScroll: true,
			        width: Ext.get("content").getWidth(),
			        height: Ext.get("content").getHeight(),
			        bodyStyle: 'padding-top: 8px;padding-right:60px;',
			        //labelAgein ： 'left',
			        defaults: {frame: true, width: CELL_WIDTH, height: CELL_HEIGHT}, // frame值为true则为圆角边框，false为直角边框
			        <c:out value="${tbar}" escapeXml="false" />
			        items: columnArray,
			        listeners:
			        {
			        	afterlayout:function()
				        {
				        	Main.fun.showLoadProcessWait(); 
				        	var portalParmStr = EventHandler.getPortalParmStr();
				        	EventHandler.pageLevelNotice(portalParmStr);
				        	
				        	EventHandler.tbarInit(this, portalParmStr);// 查询条件赋值
	
					        setTimeout(function()
					        {
					        	Main.fun.closeLoadProcessWait();
					        },3000); 
				        }
			        }
			    });
				
				/* var viewPort = new Ext.Viewport({
				    layout: 'fit',
				    items: panel
				}); */ 

			}
		},
		failure: Ext.emptyFn
	});

});

</script>
<body style="overflow-x: hidden;">
	<table id="content" width="100%">
		<tr>
			<td align="center" valign="middle">
				<div id="portal-el"></div>
			</td>
		</tr>
	</table>
	<div id="preview-el"></div>
</body>
</html>
