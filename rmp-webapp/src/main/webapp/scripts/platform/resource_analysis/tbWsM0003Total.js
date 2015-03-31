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
//		tmpArray[0]='Top1000网站';
//		tmpArray[1]='网站公网内'+JSONData[0].num+'个；网内网外'+JSONData[1].num+'个；仅网外'+JSONData[2].num+'个';
//		myData[0]=tmpArray;
		var obj=document.getElementById("webInsideNum");
		obj.innerHTML=JSONData[1].num;
		obj=document.getElementById("webIONum");
		obj.innerHTML=JSONData[2].num;
		obj=document.getElementById("webTotalNum");
		obj.innerHTML=JSONData[0].num+JSONData[1].num+JSONData[2].num;
		obj=document.getElementById("webOutsideNum");
		obj.innerHTML=JSONData[0].num;
	}
}
//doAjax("tbWsM0003TotalProvider.do",{},sbWebSite);

function changeClass(){}
/*
Ext.onReady(
function(){
	//总域名
	var allDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'allDoaminTotal'});
	//网外域名
	var outDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'outDoaminTotal'});
	//网内网外域名
	var inOutDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inoutDoaminTotal'});
	//网内域名
	var inDoaminTotal = new Ajax('rmWebSiteTotalViewActions.do').call('getCommInt',{sql:'inDoaminTotal'});
	
	var obj=document.getElementById("domainInsideNum");
		obj.innerHTML=inDoaminTotal;
		obj=document.getElementById("domainIONum");
		obj.innerHTML=inOutDoaminTotal;
		obj=document.getElementById("domainTotalNum");
		obj.innerHTML=allDoaminTotal;
		obj=document.getElementById("domainOutsideNum");
		obj.innerHTML=outDoaminTotal;


}
);
*/
		
		