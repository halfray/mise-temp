/**
 * login.js Power by YUI-EXT and JSON.
 * 
 * @author 刘岩松
 * @email seraph115@gmail.com
 */

/**
 * Adapter function for prototype evalJSON method.
 */
String.prototype.evalJSON = function() {
	return Ext.decode( this, true);
};

/**
 * Adapter function for prototype $() method.
 */
function $(nodeId) {
	return document.getElementById(nodeId);
}

/**
 * Add trim method for String
 * eg: str.trim()
 */
String.prototype.trim = function() {
	var reg = /(^\s*)|(\s*$)/g;
	return this.replace(reg, "");
};

var Message = {
	waitMsg : '正在保存数据，请稍后...',
	waitTitle:'请稍后',
	success : 'baseRecordListProvider.do?bean=scParmInfo',
	failure : 'baseRecordSave.do?bean=scParmInfo&pk=id'
};

var helpWindow = {
	
	show : function(href) {
	
		var pattern = /\/[a-zA-Z0-9]+/g;
		var result = href.match(pattern);
		
		var url = "";
		if (result != null && result.length > 3) {
			url = '../helpContentProvider.do';
		} else {
			url = 'helpContentProvider.do'
		}

		var helpwin = new Ext.Window({
	        title: '帮助',
	        width: 400,
	        height: 500,
	        closeAction: 'hide',
	        bodyCfg: {tag: 'textarea', readonly: true},
	        bodyStyle: {
	        	fontSize: '12px',
	            backgroundColor: 'white',
	            margin: '0px',
	            border: '0px none'
	        },
	        listeners: {
	            render: function(w) {
	                Ext.Ajax.request({
	                    url: url,
	                    success: function(r) {
	                        w.body.dom.value = r.responseText;
	                    }
	                });
	            }
	        }
	    });
		helpwin.show();
	}
};
	
var exceptionWindow = {
		
	show : function(href) {
		
		var exceptionWin = new Ext.Window({
			title: '操作信息 ',
			width: 400,
			height: 500,
			closeAction: 'hide',
			bodyCfg: {tag: 'textarea', readonly: true},
			bodyStyle: {
				backgroundColor: 'white',
				margin: '0px',
				border: '0px none'
		    }
		        
		});
		exceptionWin.show();
	}
};

function renderDate(format) {
    return function(v) {
        var JsonDateValue;
        if (Ext.isEmpty(v))
            return '';
        else if (Ext.isEmpty(v.time))
            JsonDateValue = new Date(v);
        else
            JsonDateValue = new Date(v.time);
        return JsonDateValue.format(format || 'Y-m-d H:i:s');
    };
}

Ext.override(Ext.Element,{     
	contains : function(el){     
	     try {     
	         return !el ? false : Ext.lib.Dom.isAncestor(this.dom, el.dom ? el.dom : el);     
	     } catch(e) {     
	         return false;     
	     }     
	}
});


/**
 * To change UI style from cookie
 */
function onChangeStyle() {
	var cookiesArr = document.cookie.split(";");
	var css;
	for ( var i = 0; i < cookiesArr.length; i++) {
		var arr = cookiesArr[i].split("=");
		if (arr[0] == "css") {
			css = arr[1];
			break;
		}
	}
	if(typeof(css) != "undefined" && css!=null){
		var cssArr = css.split("&");
		document.getElementsByTagName("link")[1].href = cssArr[2];//读取并应用css
	}
}

// invoke onChangeStyle
onChangeStyle();
