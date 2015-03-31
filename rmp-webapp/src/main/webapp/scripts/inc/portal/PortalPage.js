//构造方法
Main.portal.PortalPage=function(){}

//需要引入的其他js信息
Main.portal.PortalPage.prototype.imports=[];

//需要引入的其他样式信息
Main.portal.PortalPage.prototype.links=[];

//初始化方法，用于传递参数
Main.portal.PortalPage.prototype.init = function(){};

//渲染方法
Main.portal.PortalPage.prototype.render=function(){};

//运行方法，用于在渲染结束后进行某些动作
Main.portal.PortalPage.prototype.run=function(){};

//销毁方法，用户销毁时做资源回收等操作
Main.portal.PortalPage.prototype.destory = function(){};

//刷新方法，更新组件的显示
Main.portal.PortalPage.prototype.refresh = function(){};

//通知事件，该方法子类方法只需要调用，无需覆盖
Main.portal.PortalPage.prototype.notice = function(){};
