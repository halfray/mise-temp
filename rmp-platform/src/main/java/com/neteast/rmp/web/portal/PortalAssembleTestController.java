/**
 * 
 */
package com.neteast.rmp.web.portal;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.neteast.rmp.dao.domain.ScPortalSty;
import com.seraph.bi.suite.support.web.portal.AbstractPortalController;

/** 
 * 类说明:<br> 
 * 创建时间: 2013-4-10 上午12:10:31<br> 
 * @author 刘岩松<br> 
 * @email liuys@neteast.com<br>  
 */
@Controller
@RequestMapping("/portalAssembleTest.do")
public class PortalAssembleTestController extends AbstractPortalController {

	@Override
	public ModelAndView handlePortalRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, ScPortalSty> map = new HashMap<String, ScPortalSty>();
		ScPortalSty scPortalSty = new ScPortalSty();
		scPortalSty.setId(9999);
		map.put("scPortalSty", scPortalSty);
			
		return new ModelAndView("/platform/portal/portalAssembleTest", map);
	}

}
