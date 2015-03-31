Ext.ns("Ext.ux");
/**
 * 深度复制
 * 如果属性不存在，则复制
 * 如果有该属性，且属性为对象，则对你每个不是对象的属性进行替换
 **/
Ext.ux.deepApply = function(o, c){
    if(o && c && typeof c == 'object'){
        for(var p in c){
        		if(Ext.isEmpty(o[p]) ||(typeof c[p] != 'object'))
					o[p] = c[p];
				else
        			Ext.ux.deepApply(o[p],c[p]);
        }
    }
    return o;
};

