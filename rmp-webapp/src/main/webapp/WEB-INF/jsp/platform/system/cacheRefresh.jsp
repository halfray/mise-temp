<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>系统缓存刷新</title>
<script type="text/javascript">

Ext.onReady(function() {
		
	var message = '<c:out value="${message}" />';
	var warn = '<c:out value="${warn}" />';
	var error = '<c:out value="${error}" />';
	
	if(message != '') {
		Ext.Msg.alert('提示', message);
	} 
	
	if(warn != '') {
		Ext.Msg.alert('警告', warn);
	} 
	
	if(error != '') {

	}
	
	var checkboxes = {
		xtype: 'checkboxgroup',
		columns: 3,
		items: [
	    <c:if test="${not empty cells}">
			<c:forEach items="${cells}" var="c">
				{boxLabel: '<c:out value="${c.entityAlias}" />', name: 'cellList', inputValue: '<c:out value="${c.entityName}" />'},
			</c:forEach>
		</c:if>
		]
	};
	
    var fs = [{
   		xtype: 'fieldset',
   		title: '刷新系统缓存 (Refresh System Caches)',
        autoWidth: true,
        autoHeight: true,
   		items: [checkboxes]        
    }];
	
	var fp = new Ext.FormPanel({
	    layout: 'fit',
        renderTo: 'user-grid',
        width: Ext.get("content").getWidth(),
        height: Ext.get("content").getHeight(),
	    labelWidth: 110,
		//baseCls: 'x-plain',
        //frame:true,
		bodyBorder: false,
		border: false,
        bodyStyle:'padding: 10px; border: 0px solid;',
		autoScroll: true,
		buttonAlign: 'center',
	    standardSubmit: true,
        items: [fs],
		buttons: [{
	        text: '刷新全部',
	        handler: function() {
	        	// check all
	        	var elements = document.getElementsByName('cellList');
	    		for(var i = 0; i < elements.length; i++) {
	    			elements[i].checked = true;
	    		}
	        	fp.getForm().url = 'cacheRefresh.do?refresh=true';
	        	fp.getForm().submit();
	        }
	    },{
	        text: '刷新已选',
	        handler: function() {
	        	fp.getForm().url = 'cacheRefresh.do?refresh=true';
	        	fp.getForm().submit();
	        }
	    },{
	        text: '重置表单',
	        handler: function() {
	            fp.getForm().reset();
	        }
	    }]
	});
	
});

</script>      
</head>
<body>
	<div id="content">
	   <div id="user-grid"></div>
	</div>
</body>
</html>