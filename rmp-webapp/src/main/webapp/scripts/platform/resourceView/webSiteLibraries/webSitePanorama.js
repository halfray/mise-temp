base.portal.webSitePanorama = Ext.extend(Main.portal.PortalPage, {
	imports : ['/scripts/d3/d3.js',
				'/scripts/platform/resource_statistics/d3treemodule.js'],
	links : ['/styles/user/webSitePanorama.css'],
	init : function(params) {
			
			this.treePanel = new Ext.Panel({
				frame : false,
				boder : false,
				height : 660,
				colspan : 8,
				html : '<div id="d3Tree" style="background: url(images/platform/texture-noise.png);"></div>'
			});
		 },  
           updateData : function(data) {
				M.rpc._call(updateTreeView,'dmNetsiteLibrariesDetailAction.getTreeRootNode',
						{javaClass:'java.util.HashMap',map:data});
				
				function updateTreeView(data,error) {
					createD3Tree('d3Tree',data);
				}
			},
			render : function(div) {
				this.treePanel.setWidth(Ext.get(div).getWidth());
				this.treePanel.render(div);
			},
		
			run : function(data){
				//this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
});