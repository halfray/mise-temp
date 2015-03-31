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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;
import com.seraph.bi.suite.support.web.base.BaseHelper;
import com.seraph.bi.suite.support.web.portal.AbstractPortalController;
/** 
 * 类说明:接受参数提供给最终需要的Portal页面<br> 
 * 创建时间: 2013-4-8 下午9:13:29<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
@Controller
@RequestMapping("/portalPage.do")
public class PortalPageController extends AbstractPortalController  {

	@RequestMapping(method = { RequestMethod.POST })
	public ModelAndView handlePortalRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("parms", BaseHelper.createTransParm(request));		
		return new ModelAndView("/platform/portal/portalPage", map);
	}
}