package com.neteast.rmp.web.main;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.neteast.rmp.service.main.SystemParamsManager;
import com.octo.captcha.service.image.ImageCaptchaService;

@Component
public class CheckJCapatchaAction  {
	@Autowired
	protected ImageCaptchaService captchaService;

	public ImageCaptchaService getCaptchaService() {
		return captchaService;
	}

	public void setCaptchaService(ImageCaptchaService captchaService) {
		this.captchaService = captchaService;
	}
	
	@Autowired
	protected SystemParamsManager systemParamsManager;
	
	public SystemParamsManager getSystemParamsManager() {
		return systemParamsManager;
	}

	public void setSystemParamsManager(SystemParamsManager systemParamsManager) {
		this.systemParamsManager = systemParamsManager;
	}

	public Boolean check(String value,HttpServletRequest request) {
		boolean result = false;
		try {
			String verifycode = systemParamsManager.getSystemParamsValue("SY_LOGIN_VERITYCODE");
			
			if(value.equals(verifycode)){
				result = true;
			}else{
				result = captchaService.validateResponseForID(request
						.getSession().getId(), value);
			}
			return result;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
