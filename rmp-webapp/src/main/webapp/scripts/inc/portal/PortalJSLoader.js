Ext.ns('Main.portal');
Ext.ns('base.portal');
Main.portal.PortalJSLoader = function(url, params) {
	this.url = url;
	this.params = params;
};
Main.portal.PortalJSLoader.prototype = {
	load : function() {
		var jl = new JsLoader();
		var self = this;
		jl.onsuccess = function() {
			var objName = self.url.match("[^/]*.js").toString();
			var obj = objName.substring(0, objName.length - 3);
			if(base.portal[obj] == undefined)
			{
				Main.fun.printLog("在文件"+self.url+"中未找到base.portal."+obj+"对象");
			}
			self.object = new base.portal[obj]();
			// 生命周期
			// 加载依赖信息
			self.imports = self.object ? self.object.imports : [];
			if (Ext.isDefined(self.imports) && self.imports.length) {
				var loader = new JsLoader();
				loader.success = false;
				var count = 0;
				for (var i = 0; i < self.imports.length; i++) {
						loader.onsuccess = function() {
							count++;
						}; // 引入文件加载完成后，进行本js文件的生命周期加载
					loader.load(Main.contextPath + self.imports[i]);
				}
				//等待加载完毕
				var readyId = setInterval(function(){
					if(self.imports.length == count)
					{
						clearInterval(readyId);
						self.loadFileRecycle();
					}
				},10);
			} else {
				self.loadFileRecycle();
			}
		};
		jl.load(Main.contextPath + self.url);
	},
	loadFileRecycle : function() {
		var self = this;
		// 初始化
		if (Ext.isDefined(self.object.init)) {
			self.object.init(self.params);
		}
		// 运行
		self.run = Ext.isDefined(self.object.run) ? function() {
			self.object.run.call(self.object);
		} : self.run;
		// 关闭
		self.objDestory = Ext.isDefined(self.object.destory)
				? self.object.destory.call(self.object)
				: self.objDestory;

		// 回调
		self.success();
	},
	success : {}, // 加载是异步方法，成功后执行的程序
	run : function() {
	},
	objDestory : function() {
	},
	destory : function() {
		// 对象定义的销毁方法
		this.objDestory();
		// 解除依赖类
		var loader = new JsLoader();
		if (Ext.isDefined(this.imports) && this.imports.length) {
			for (var i = 0; i < this.imports.length; i++) {
				loader.remove(this.imports[i]);
			}
		}
		// 解除本身
		loader.remove(this.url);
		// 清空对象内容
		for (var p in this.object) {
			this.object[p] = null;
		}
		this.object = null;
	},
	render : function(div) {
		this.object.render.call(this.object, div);
	},
	refresh : function(param) {
		var self = this;
		Main.fun.tryRun(function(){return !Ext.isEmpty(self.object)},function(){ self.object.refresh.call(self.object, param);});
	},
	createNotice:function(obj,call)
	{
		if(typeof(obj) == 'function')
		{	
			call = obj;
			obj = this.object;
		}
		this.object.notice = Main.fun.Fun(obj,call);
	}
};