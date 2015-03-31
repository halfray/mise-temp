Ext.ns('Main.portal');
Ext.ns('base.portal');
Main.portal.PortalLinkLoader = function(url) {
	this.url = url;
};
Main.portal.PortalLinkLoader.prototype = {
	load : function() {
		var ll = new LinkLoader();
		var self = this;
		ll.onsuccess = function() {
			var objName = self.url.match("[^/]*.js").toString();
			var obj = objName.substring(0, objName.length - 3);
			if(base.portal[obj] == undefined)
			{
				Main.fun.printLog("在文件"+self.url+"中未找到base.portal."+obj+"对象");
			}
			self.object = new base.portal[obj]();
			// 生命周期
			// 加载依赖信息
			self.links = self.object ? self.object.links : [];
			if (Ext.isDefined(self.links) && self.links.length) {
				var loader = new LinkLoader();
				var count = 0;
				for (var i = 0; i < self.links.length; i++) {
						loader.onsuccess = function() {
							count++;
						}; // 引入文件加载完成后，进行本link文件的生命周期加载
					loader.load(Main.contextPath + self.links[i]);
				}
				//等待加载完毕
				var readyId = setInterval(function(){
					if(self.links.length == count)
					{
						clearInterval(readyId);
					}
				},10);
			}
		};
		ll.load(Main.contextPath + self.url);
	}
};