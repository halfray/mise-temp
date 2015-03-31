var Ajax = function(action)
{
	this.action = action;
}
Ajax.prototype = 
	{
		call:function(method,params)
		{
			var self = this;
			var result;
			
			Ext.Ajax.request({
					async:false,
			   		url:self.action,
					success: function(response) {
						object = response.responseText.evalJSON();
						if(object.result)
							result = object.result; //单信息返回
						else
							result = object;	//复合信息返回
					},
					failure: function()
						{
							Ext.Msg.alert({title:'提示',content:'出现错误！'})
						},

					params: {
						method: method,    	    	       
						params: Ext.util.JSON.encode(params)
		  		}
			});
			return result;
		}
	}

			 	
    		 