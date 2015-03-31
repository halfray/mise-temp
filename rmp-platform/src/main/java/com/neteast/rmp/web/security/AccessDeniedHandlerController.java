/**
 * 
 */
package com.neteast.rmp.web.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.seraph.bi.suite.support.web.BaseController;

/**
 * 类说明:<br>
 * 创建时间: 2008-9-7 下午12:08:40<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public class AccessDeniedHandlerController extends BaseController {

	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		System.out.println(request);

		return new ModelAndView(getViewName());
	}

}
