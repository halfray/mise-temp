package com.neteast.rmp.web.systemconfig;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/**
 * 类说明:<br>
 * 创建时间: 2011-1-26 下午03:12:16<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/treeMenu.do")
public class TreeMenuController extends AbstractController {

	@RequestMapping(method = { RequestMethod.POST })
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		return new ModelAndView("/platform/systemconfig/treeMenu");
	}

}
