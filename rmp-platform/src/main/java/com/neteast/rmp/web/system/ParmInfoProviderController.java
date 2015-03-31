/**
 * 
 */
package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.ScParmInfoDAO;
import com.neteast.rmp.dao.domain.ScParmInfo;
import com.neteast.rmp.dao.domain.ScParmInfoExample;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * @author seraph
 * 
 */
@Controller
@RequestMapping("/parmInfoProvider.do")
public class ParmInfoProviderController extends JsonProviderController {

	private ScParmInfoDAO scParmInfoDAO;

	public void setScParmInfoDAO(ScParmInfoDAO scParmInfoDAO) {
		this.scParmInfoDAO = scParmInfoDAO;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		String parmType = request.getParameter("parmType");
		Assert.hasLength(parmType, "Parameter 'parmType' is required.");

		List<ScParmInfo> list = new ArrayList<ScParmInfo>();

		ScParmInfoExample example = new ScParmInfoExample();
		example.setTypeCode(parmType);
		example.setTypeCode_Indicator(ScParmInfoExample.EXAMPLE_EQUALS);
		List<ScParmInfo> results = scParmInfoDAO.selectByExample(example);

		if (results != null) {
			list = results;
		}

		return list;
	}

}
