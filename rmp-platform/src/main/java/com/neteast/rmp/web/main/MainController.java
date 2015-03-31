/**
 * 
 */
package com.neteast.rmp.web.main;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.neteast.rmp.service.main.SystemParamsManager;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.BaseController;

/**
 * 类说明: 主菜单<br>
 * 创建时间: 2008-7-31 下午03:19:15<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public class MainController extends BaseController {

	private static final Logger logger = Logger.getLogger(MainController.class);
	@Autowired
	protected SystemParamsManager systemParamsManager;
	public SystemParamsManager getSystemParamsManager() {
	return systemParamsManager;
	}
	 
	public void setSystemParamsManager(SystemParamsManager systemParamsManager) {
	this.systemParamsManager = systemParamsManager;
	}
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String language = LocaleContextHolder.getLocale().getDisplayLanguage();
		logger.debug("Local language: " + language);

		try {
			BaseUser user = (BaseUser) LoginUtil.getUser();
			Map<String, String> map = new HashMap<String, String>();
			String verifycode = systemParamsManager.getSystemParamsValue("DY_LOGIN"); 
			map.put("login", verifycode);
			map.put("userName", user.getUserAlias());
			map.put("userCode", user.getUsername());
			return new ModelAndView(getViewName(), map);
		} catch (Exception e) {
			logger.info("用户未登录,转至登录页面。");
		}
		return new ModelAndView(new RedirectView("security/login.do"));
	}

}
