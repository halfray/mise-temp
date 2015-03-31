package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.dao.ScUserDAO;
import com.neteast.rmp.dao.domain.ScUserExample;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

@Controller
@RequestMapping("/currOrgUserProviderController.do")
public class CurrOrgUserProviderController extends JsonProviderController {

	@Autowired
	private ScUserDAO scUserDAO;

	public void setScUserDAO(ScUserDAO scUserDAO) {
		this.scUserDAO = scUserDAO;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		List list = new ArrayList();
		BaseUser user = (BaseUser) LoginUtil.getUser();
		ScUserExample example = new ScUserExample();
		example.setOrgCode(user.getOrgCode());
		example.setOrgCode_Indicator(3);
		List result = scUserDAO.selectByExample(example);
		if (result != null) {
			list = result;
		}
		return list;
	}

}
