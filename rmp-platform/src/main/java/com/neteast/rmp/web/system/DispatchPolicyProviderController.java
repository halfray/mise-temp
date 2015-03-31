/**
 * 
 */
package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.BaseDAO;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * @author seraph
 * 
 */
@Controller
@RequestMapping("/dispatchPolicyProvider.do")
public class DispatchPolicyProviderController extends JsonProviderController {
	
	@Autowired
	BaseDAO baseDao;
	
	public BaseDAO getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(BaseDAO baseDao) {
		this.baseDao = baseDao;
	}

	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		//String parmType = request.getParameter("parmType");
		//Assert.hasLength(parmType, "Parameter 'parmType' is required.");

		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> results = baseDao.queryForList("sm_domain_dispatch_policy.getDomainDispatchPolicyList",new HashMap());

		if (results != null) {
			list = results;
		}

		return list;
	}

}
