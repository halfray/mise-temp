/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.service.portal.PortalManager;

/**
 * @author seraph
 *
 */
@Service
public class ParmCodeArrayCreator implements Creator {
	
	@Autowired
	private PortalManager portalManager;
	
	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

	private String getParmCodeArray(List<ScPortalParms> scPortalParmsList) {
		
		StringBuffer sb = new StringBuffer();
		if(scPortalParmsList.size() < 1) {
			sb.append("[]");
			return sb.toString();
		} else {
			sb.append("[");
			for (ScPortalParms scPortalParms : scPortalParmsList) {
				sb.append("{");
				sb.append("'parmCode':'" + scPortalParms.getParmCode() + "', ");
				sb.append("'parmType':'" + scPortalParms.getParmType() + "'");
				sb.append("}, ");
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
		return getParmCodeArray(scPortalParmsList);
	}

	@Override
	public String createToolbar(String portalCode, String flag)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
