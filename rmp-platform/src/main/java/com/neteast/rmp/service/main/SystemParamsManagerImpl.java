package com.neteast.rmp.service.main;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.seraph.bi.suite.support.core.resources.LocalResourcesManager;
@Component
public class SystemParamsManagerImpl implements SystemParamsManager {

	private LocalResourcesManager localResourcesManager;

	public void setLocalResourcesManager(
			LocalResourcesManager localResourcesManager) {
		this.localResourcesManager = localResourcesManager;
	}
	@SuppressWarnings("unchecked")
	@Override
	public String getSystemParamsValue(String paramscode) {
		String verifycode = null;
		Map<String, Object> publicparamsMap = localResourcesManager.getCodeInfoMapByType("PUBLIC_PARAMS");
		if(publicparamsMap != null && publicparamsMap.size() > 0){
			verifycode =  String.valueOf(publicparamsMap.get(paramscode));
		}
		return verifycode;
	}

}
