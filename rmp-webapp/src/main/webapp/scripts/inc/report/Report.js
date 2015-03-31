
/**
 *params:
 *obj{
 *errorcode - 错误码
 *msg - 提示
 *trace - 程序栈
 *} 
 */
Ext.ns('Report');
Report.report = function(error)
{
	if(error && error.msg)
		Ext.Msg.show({title:'系统提示', icon: Ext.MessageBox.WARNING,msg:error.msg,buttons: Ext.MessageBox.OK});
	else if(error)
		Ext.Msg.show({title:'系统提示', icon: Ext.MessageBox.WARNING,msg:'未知错误信息',buttons: Ext.MessageBox.OK});
}