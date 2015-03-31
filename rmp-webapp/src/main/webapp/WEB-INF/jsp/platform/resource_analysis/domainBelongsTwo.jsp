<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page language="java" contentType="text/html; charset=gb2312"%>
<%@ include file="/WEB-INF/jsp/platform/includes.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>Simple Bar Chart</title>
<script type="text/javascript" src="scripts/anychart/AnyChart.js"></script>
<style type="text/css">
#container {
	/*width: 350px;*/
	/*height: 350px;*/
}
</style>
<script type="text/javascript">

var array = new Array();
function showType(obj) {
	for(var i in obj){
		if(typeof(obj[i]) == 'object') {
			showType(obj[i]);
			array.push("Class " + i);
		} else {
			if(typeof(obj[i]) != 'function'){
				array.push("\t" + typeof(obj[i]) + " " + i + " = " +obj[i] + ";");
			}
		}
	}
}

Ext.onReady(function(){

	var chart = new AnyChart("swf/AnyChart.swf", "swf/Preloader.swf");
	chart.width = '100%';
	chart.height = '100%';

	Ext.Ajax.request({
		url: 'domainBelongsTwoProvider.do',
		success: function(response) {
			var JSONData = response.responseText.evalJSON();

			//alert(response.responseText);

			showType(JSONData);
			array.reverse();
			// alert(array.join("\n"));
			array = new Array();

			// alert(eval("JSONData.settings.animation.enabled"));
			
			// var key = "JSONData.settings.animation.enabled";
			// var value = false;
			// eval(key + "=" + value);
			
			chart.setJSData(JSONData);
			chart.write('container');
		}
	});

});



</script>
</head>
<body>
	<div id="container"></div>
</body>
</html>
