/**
 * 
 */
package com.neteast.rmp.web.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.security.RememberMeManager;
import com.seraph.bi.suite.support.web.json.JsonProviderController;


/**
 * Description: 管理Cookie<br>
 * Origin Time: 2009-5-6 下午05:31:07<br>
 * @author Seraph<br>
 * @email:seraph115@gmail.com<br>
 */
public class RemoveCookieController extends JsonProviderController {

	private RememberMeManager rememberMeManager;
	
	public void setRememberMeManager(RememberMeManager rememberMeManager) {
		this.rememberMeManager = rememberMeManager;
	}
	
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		rememberMeManager.removeCookie(request, response, LoginUtil.getAuthentication());
		return null;
	}
	
}
