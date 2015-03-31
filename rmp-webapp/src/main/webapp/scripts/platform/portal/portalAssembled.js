/**
 * Description: this is for Home page assembled with dashboard orders.
 * 
 * @author ¡ı—“À…
 * @email seraph115@gmail.com
 */

AssembleRobot = {
		
	assemble : function(element) {
		
		Ext.Ajax.request({
			url: 'installedChartProvider.do',
			success: function(response) {
			
				var urlPrefix = 'dashboardRendered.do?chartId=';
			
				var result = response.responseText.evalJSON();
				var keys = result.keys.substring(0, result.keys.length - 1);
				
				if( keys != '' || keys != null) {
					
					var key = keys.split(',');
					for(var i = 0; i < key.length; i++) {
						
						var id = 'portal_' + key;
						
						var portal = new Ext.ux.PortalColumn({
				            columnWidth: .33,
				            style: MAX_STYLE,
				            items:[{
				                id: id,
				                title: '◊¥Ã¨≤Èø¥',
				                tools: tools,
				                html: HtmlCreator.create(id, urlPrefix + key[i])
				            }]
				    	});
						element.add(a);
					}
				}

			},
			failure: Ext.emptyFn
		});
	
	}

}
