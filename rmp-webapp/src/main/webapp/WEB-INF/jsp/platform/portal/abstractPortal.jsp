<script type="text/javascript">

var cellId = '<c:out value="${cellId}" escapeXml="false" />';
var cellTitle = '<c:out value="${cellTitle}" escapeXml="false" />';

var PortalPostman = {
	
	notice : function(parms){
		if(typeof(noticeHandler) == "function") {
			noticeHandler.call(this, parms); // subclass must implements this.
		} else {
			Main.fun.printLog("Error: [" + cellTitle + "] must implements 'noticeHandler' JavaScript function in Portal Page.");
		}
	}
};

</script>