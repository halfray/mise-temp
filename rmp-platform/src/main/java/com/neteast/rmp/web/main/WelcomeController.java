/**
 * 
 */
package com.neteast.rmp.web.main;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/**
 * 类说明: 登录后的欢迎页面<br>
 * 创建时间: 2008-10-30 下午06:26:10<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/welcome.do")
public class WelcomeController extends AbstractController {

	@RequestMapping(method = { RequestMethod.POST })
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {

		return new ModelAndView("/platform/main/welcome");
	}

}
