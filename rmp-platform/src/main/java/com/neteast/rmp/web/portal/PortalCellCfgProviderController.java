/**
 * 
 */
package com.neteast.rmp.web.portal;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.dao.ScCellCfgDAO;
import com.neteast.rmp.dao.domain.ScCellCfgExample;
import com.neteast.rmp.dao.domain.ScPortalCfgExample;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * @author seraph
 * 
 */
@Controller
@RequestMapping("/portalCellCfgProvider.do")
public class PortalCellCfgProviderController extends JsonProviderController {

	@Autowired
	private ScCellCfgDAO scCellCfgDAO;

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		String portalCode = request.getParameter("portalCode");
		
		ScCellCfgExample scCellCfgExample = new ScCellCfgExample();
		scCellCfgExample.setPortalCode(portalCode);
		scCellCfgExample.setPortalCode_Indicator(ScPortalCfgExample.EXAMPLE_EQUALS);
		
		List<?> result = scCellCfgDAO.selectByExample(scCellCfgExample, "sort");
		return result;
	}

	public void setScCellCfgDAO(ScCellCfgDAO scCellCfgDAO) {
		this.scCellCfgDAO = scCellCfgDAO;
	}

}
