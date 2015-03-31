/**
 * 
 */
package com.neteast.rmp.web.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.service.main.UserApplicationManager;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.json.JsonProviderController;


/**
 * Description:<br>
 * Origin Time: 2009-5-13 下午01:51:53<br>
 * @author Seraph<br>
 * @email:seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/userApplication.do")
public class UserApplicationController extends JsonProviderController {

	public static final String USER_DETAIL = "userDetail";
	
	public static final String USER_AUTHORTIES = "userAuthorties";
	
	@Autowired
	private UserApplicationManager userApplicationManager;

	public void setUserApplicationManager(
			UserApplicationManager userApplicationManager) {
		this.userApplicationManager = userApplicationManager;
	}

	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		String command = request.getParameter("command");
		LoginUtil.getAuthentication();
		Object obj = null;
		if (USER_DETAIL.equals(command)) {
			obj = userApplicationManager.getUserDetail();
		} else if (USER_AUTHORTIES.equals(command)) {
			obj = userApplicationManager.getUserAuthorities();
		} else {

		}
		return obj;
	}

}
