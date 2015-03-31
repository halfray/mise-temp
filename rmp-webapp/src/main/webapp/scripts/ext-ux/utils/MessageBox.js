/**
 * Ext JS Library 2.0 Extend
 * BaseBox Widget Libraries
 * weihaihan@gmail.com
 *
 * http://sourceforge.net/projects/basebox
 */

Ext.namespace('Ext.ux');

/**
 * Ext.MessageBox extend.
 * 
 * @class Ext.ux.MessageBox
 * @singleton
 */
Ext.ux.MessageBox = function(){
	
    var dlg = function(title, msg, fn, scope, icon, buttons){
        return Ext.Msg.show({
            title: title,
            msg: msg,
            fn: fn,
            scope: scope,
            maxWidth: 600,
            minWidth: 200,
            icon: icon || Ext.Msg.INFO,
            buttons: buttons || Ext.Msg.OK
        });
    };
    
	return {
        titleText : {
            info : 'Message',
            warning : 'Warning',
            error : 'Error'
        },
		
        info: function(title, msg, fn, scope){
            return dlg(title || Ext.ux.MessageBox.titleText['info'], msg, fn, scope);
        },
        
        warning: function(title, msg, fn, scope){
            return dlg(title || Ext.ux.MessageBox.titleText['warning'], msg, fn, scope, Ext.Msg.WARNING);
        },
        
        error: function(title, msg, fn, scope){
            return dlg(title || Ext.ux.MessageBox.titleText['error'], msg, fn, scope, Ext.Msg.ERROR);
        }
	}
}();

Ext.ux.Msg = Ext.ux.MessageBox;