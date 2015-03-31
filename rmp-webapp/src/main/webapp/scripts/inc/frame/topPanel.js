Ext.ns('Frame');
Frame.getTopPanel = function()
{
	var list = M.rpc._call("functionService.getRootFunctionsByParenetId","1");
	
	var dom = Ext.getDom("navigation");
	var actionEvent = {};
	var clsArray = {};
	for(var i = 0; i < list.length ;i++)
	{
		var menu = list[i]; 
		 var id = Ext.id();  
		 actionEvent[id] = menu.id;
		 clsArray[id] = menu.cls;
		 var el = {  
		 			id :id,
                    tag : 'li',  
                    cls:menu.cls,
                  	children:[
                  		{tag:'a',href:"#",children:[
                  			{tag:'span'}
                  		]}
                  	]
                }; 
        Ext.DomHelper.append(dom, el);  
                Ext.get(id).on('click', function(e) {
                	Main.frame.leftPanel.updateRoot(actionEvent[this.id]);
                	updateFocusStyle(this,clsArray);
                });  
        //加载菜单
         if(i == 0)
         	Main.frame.leftPanel.updateRoot(menu.id);
	}
                
	function updateFocusStyle(target,clsArray)
	{
		resetDefaultStyle(clsArray);
		var cls = clsArray[target.id];
    	var cls_over = cls + "_m";
    	if(!target.hasClass(cls_over))
    	{
    		target.addClass(cls_over);
    	}
	}
	function resetDefaultStyle(clsArray)
	{
		for(var p in clsArray)
		{
			Ext.get(p).removeClass(clsArray[p]+"_m");
		}
	}
	var mainTopPanel =   new Ext.BoxComponent({
                region:'north',
                el: 'north',
                height:105
            })
	
return mainTopPanel;
}
