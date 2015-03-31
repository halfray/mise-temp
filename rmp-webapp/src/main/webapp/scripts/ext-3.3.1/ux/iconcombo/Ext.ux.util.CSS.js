	// fields: [iconCode, iconName, iconCSS]
	Ext.util.CSS.getRulesByCssFileName = function(cssFile) {
		var rules = [];
		var ds = document.styleSheets;
		for ( var i = 0, len = ds.length; i < len; i++) {
			if (ds[i].href && ds[i].href.indexOf(cssFile) >= 0) {
				try {
					var ssRules = ds[i].cssRules || ds[i].rules;
					// Push default-icon
					var cssArray = new Array();
					cssArray.push('');
					cssArray.push('default-icon');
					cssArray.push('default-icon');
					rules.push(cssArray);
					
					for ( var j = ssRules.length - 1; j >= 0; --j) {
						
						var cssArray = new Array();
						cssArray.push(ssRules[j].selectorText.substring(1, ssRules[j].selectorText.length));
						cssArray.push(ssRules[j].selectorText.substring(1, ssRules[j].selectorText.length));
						cssArray.push(ssRules[j].selectorText.substring(1, ssRules[j].selectorText.length));
						
						rules.push(cssArray);
					}
				} catch (e) {
				}
			}
		}
		return rules;
	};