function getData(data) {
	var mapData = {};
		mapData.webSiteName = data.webSiteName;
		M.rpc._call(updateMapData, 'analysisReportWebSiteListController.getList',{
			javaClass : 'java.util.HashMap',
			map : mapData
		});
}
function updateMapData(data) {
	var list = data;
	var html="";
	for(var i=0;i<list.length;i++){
		var obj = list[i];
		html+='<div class="aaa">';
	    html+='<div class="background">';
	    html+='<div class="bgLeft"></div>';
	    html+='<div class="bgRight"></div>';
	    html+='<div class="webBox">';
	    html+='<div class="webG">网站信息</div>';
	    html+='<div class="webNum">';
	    html+='<a href="#" onclick="onRowClick(\''+obj.webSiteId+'\',\''+obj.webSiteName+'\')" >';
		if(i==0||i==3||i==6){
			html+='<span class="num1">';
		}else if(i==1||i==4||i==7){
			html+='<span class="num2">';
		}else{
			html+='<span class="num3">';
		}
		html+=obj.webSiteName;
		html+='</span></a>';
	    html+='</div>';
	    html+='<div class="webFooter">';
	    html+='<div>网站分类<br><span>'+obj.webSiteType+'</span></div>';
	    html+='<div>DNS解析次数<br><span>'+obj.DnsNum+'</span></div>';
	    html+='<div class="webOut">更新日期<br><span>'+obj.updateDate+'</span></div>';
	    html+='</div>';
	    html+='</div>';
	    html+='</div>';
    	html+='</div>';
	}
	
		document.getElementById('content').innerHTML = html;
	}
	
	function onRowClick(webSiteId, webSiteName){
//		alert(webSiteId+"=="+webSiteName);return;
		var data = {};
		data.webSiteId = webSiteId;
		data.webSiteName = webSiteName;
		data.province = '510000';//默认省份广东省
		data.provinceName = '广东';//默认省份广东省
		data.flag = true;// "1"; //传递的参数，不清除可以继续查询使用
		   var conf = {
				href : 'portalAssemble.do?portalCode=analysisReport&uxParams='+ encodeURI(Ext.encode(data)),
				text:  'addTab',
				icon: '',
				tipinfo: '',
				params: this.data
			};
		   Main.fun.openWin(conf, 'browser' );
	}