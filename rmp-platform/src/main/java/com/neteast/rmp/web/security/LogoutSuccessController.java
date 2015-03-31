/**
 * 
 */
package com.neteast.rmp.web.security;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.seraph.bi.suite.support.web.BaseController;



/**
 * 类说明: 返回退出成功界面<br>
 * 创建时间: 2008-9-4 上午11:17:56<br>
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public class LogoutSuccessController extends BaseController {

	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		
		return new ModelAndView(getViewName());
	}
	
}

