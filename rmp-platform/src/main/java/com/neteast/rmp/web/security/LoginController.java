/**
 * 
 */
package com.neteast.rmp.web.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.seraph.bi.suite.support.web.BaseController;

/**
 * 类说明: 返回登录界面<br>
 * 创建时间: 2008-9-3 下午04:20:08<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public class LoginController extends BaseController {

	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		return new ModelAndView(getViewName());
	}

}
