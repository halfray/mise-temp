/**
 * 
 */
package com.neteast.rmp.web.security;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.acegisecurity.AuthenticationException;
import org.acegisecurity.ui.AbstractProcessingFilter;
import org.acegisecurity.ui.webapp.AuthenticationProcessingFilter;

import com.seraph.bi.suite.support.security.LoginMessager;
import com.seraph.bi.suite.support.web.json.JsonProviderController;



/**
 * 类说明:<br>
 * 创建时间: 2008-9-4 下午04:30:39<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>userName
 */
public class loginFailureController extends JsonProviderController {

	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		HttpSession session = request.getSession();
		String error = ((AuthenticationException) session.getAttribute(AbstractProcessingFilter.ACEGI_SECURITY_LAST_EXCEPTION_KEY)).getMessage();
		
		String key = null;
		if(session.getAttribute(AuthenticationProcessingFilter.ACEGI_SECURITY_LAST_USERNAME_KEY) != null) {
			key = session.getAttribute(AuthenticationProcessingFilter.ACEGI_SECURITY_LAST_USERNAME_KEY).toString();
		}

        Map<String, String> map = new HashMap<String, String>();
        map.put("error", error);
        map.put("key", key);
        
        LoginMessager messager = new LoginMessager();
        messager.setSuccess(false);
        messager.setContents(map);
  
        JSONObject jsonObject = JSONObject.fromObject(messager);
		
		return jsonObject;
	}

}

