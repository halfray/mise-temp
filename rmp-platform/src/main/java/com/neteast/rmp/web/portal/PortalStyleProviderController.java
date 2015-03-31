/**
 * 
 */
package com.neteast.rmp.web.portal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.service.portal.PortalManager;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * @author seraph
 * 
 */
@Controller
@RequestMapping("/portalStyleProvider.do")
public class PortalStyleProviderController extends JsonProviderController {

	@Autowired
	private PortalManager portalManager;

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		return portalManager.getPortalStyle();
	}

	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

}
