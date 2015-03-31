package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.dao.ScOrgDAO;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

@Controller
@RequestMapping("/currUserOrgProviderController.do")
public class CurrUserOrgProviderController extends JsonProviderController {

	@Autowired
	private ScOrgDAO scOrgDAO;

	public void setScOrgDAO(ScOrgDAO scOrgDAO) {
		this.scOrgDAO = scOrgDAO;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		List list = new ArrayList();
		BaseUser user = (BaseUser) LoginUtil.getUser();
		String orgCode = user.getOrgCode();
		List result = scOrgDAO.selectByCurrUserOrg(orgCode);
		if (result != null) {
			list = result;
		}
		return list;
	}

}
