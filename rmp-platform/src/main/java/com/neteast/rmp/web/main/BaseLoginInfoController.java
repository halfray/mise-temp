/**
 * 
 */
package com.neteast.rmp.web.main;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.service.main.SystemParamsManager;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * @author xxx
 *
 */
@Controller
@RequestMapping("/baseLoginInfoController.do")
public class BaseLoginInfoController extends JsonProviderController {

	@Autowired
	SystemParamsManager systemParamsManager;
	
	public SystemParamsManager getSystemParamsManager() {
		return systemParamsManager;
	}

	public void setSystemParamsManager(SystemParamsManager systemParamsManager) {
		this.systemParamsManager = systemParamsManager;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		BaseUser user = (BaseUser) LoginUtil.getUser();
		Map<String, String> loginInfo = new HashMap<String, String>();
		loginInfo.put("userName", user.getUserAlias());
		loginInfo.put("userCode", user.getUsername());
		loginInfo.put("orgCode", user.getOrgCode());
		if("10001".equals(user.getOrgCode())){
			String localArea = systemParamsManager.getSystemParamsValue("DY_PROVINCE");
			request.getSession().setAttribute("orgCode", localArea);
		}else{
			request.getSession().setAttribute("orgCode", user.getOrgCode());
		}
		return loginInfo;
	}

}
