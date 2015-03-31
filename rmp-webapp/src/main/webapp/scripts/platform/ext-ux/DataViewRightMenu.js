		Ext.ux.RightMenu = function(){
    		
    		// 屏蔽IE浏览器右键菜单
			function eventfalse(ev) {     
			   ev = ev ? ev : (window.event ? window.event : null);  ev.returnValue=false; 
			}
			document.oncontextmenu=eventfalse;
    		
    		var dataView, menu, ctxItem;
		    this.init = function(dv){
		        dataView = dv;
		        dataView.on('contextmenu', onContextMenu);
		    }
		    
		    function onContextMenu(dv, index, node, e){
				if(!menu){
					menu = new Ext.menu.Menu({
						shadow: true,
						items: [{
							id: node.id + '-refresh',
							text: '刷新',
							handler : function(){
		
							}
						},{
							id: node.id + '-close',
							text: '关闭当前页',
							handler : function(){
						                    
							}
						},{
							id: node.id + '-close-others',
							text: '关闭当前以外的所有页',
							handler : function(){
						                    
							}
						}]
					});
				}
				menu.showAt(e.getPoint());
			}
		};
