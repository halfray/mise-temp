/**
 * 
 */
package com.neteast.rmp.web.portal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.neteast.rmp.dao.domain.ScPortalSty;
import com.neteast.rmp.service.portal.PortalManager;
import com.seraph.bi.suite.support.web.json.JsonFormProviderController;

/**
 * @author seraph
 * 
 */
public class PortalStyleModifyProviderController extends
		JsonFormProviderController {

	@Autowired
	private PortalManager portalStyleManager;

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response, Object form) {

		portalStyleManager.updatePortalStyle((ScPortalSty) form);
		return new Object();
	}

	public void setPortalStyleManager(
			PortalManager portalStyleManager) {
		this.portalStyleManager = portalStyleManager;
	}

}
