/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.service.main.SystemParamsManager;
import com.neteast.rmp.service.portal.PortalManager;
import com.seraph.bi.suite.support.security.LoginUtil;

/**
 * @author seraph
 *
 */
@Service
public class ParmDefaultValueArrayCreator implements Creator {
	
	@Autowired
	private PortalManager portalManager;
	
	@Autowired
	protected SystemParamsManager systemParamsManager;
	
	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

	private String getParmDefaultValueArray(List<ScPortalParms> scPortalParmsList) {
		
		StringBuffer sb = new StringBuffer();
		if(scPortalParmsList.size() < 1) {
			sb.append("[]");
			return sb.toString();
		} else {
			sb.append("[");
			for (ScPortalParms scPortalParms : scPortalParmsList) {
				sb.append("{");
				/* 参数是省份时需特殊处理，
				 * 1、有默认值且是数字时，取默认值。
				 * 2、以中国用户登录时，取发布省。
				 * 3、其他情况都取值登录用户所在省。
				 */
				if("province".equals(scPortalParms.getParmCode())){
					String parmValue = scPortalParms.getParmValue();
					if(parmValue.matches("[0-9]+")){ //是数字
						sb.append("'parmCode':'" + scPortalParms.getParmCode() + "', ");
						sb.append("'value':'" + scPortalParms.getParmValue() + "'");
						sb.append("}, ");
					}else{
						if("10001".equals(LoginUtil.getUser().getOrgCode())){//是中国登陆
							sb.append("'parmCode':'" + scPortalParms.getParmCode() + "', ");
							sb.append("'value':'" + systemParamsManager.getSystemParamsValue("DY_PROVINCE") + "'");
							sb.append("}, ");
						}else{
							sb.append("'parmCode':'" + scPortalParms.getParmCode() + "', ");
							sb.append("'value':'" + LoginUtil.getUser().getOrgCode() + "'");
							sb.append("}, ");
						}
						
					}
				}else{
					sb.append("'parmCode':'" + scPortalParms.getParmCode() + "', ");
					sb.append("'value':'" + scPortalParms.getParmValue() + "'");
					sb.append("}, ");
				}
				
			}
			if (sb.length() > 2) {
				sb.setLength(sb.length() - 2);
			}
			sb.append("]");
		}
		return sb.toString();
	}

	public String create(String portalCode) throws Exception {
		
		List<ScPortalParms> scPortalParmsList = portalManager.getPortalParmsList(portalCode);
		return getParmDefaultValueArray(scPortalParmsList);
	}

	@Override
	public String createToolbar(String portalCode, String flag)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
