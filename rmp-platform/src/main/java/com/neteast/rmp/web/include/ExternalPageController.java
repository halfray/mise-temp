/**
 * 
 */
package com.neteast.rmp.web.include;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/** 
 * 类说明:<br> 
 * 创建时间: 2012-12-12 上午10:40:58<br> 
 * @author 刘岩松<br> 
 * @email liuys@neteast.com<br>  
 */
@Controller
@RequestMapping("/externalPage.do")
public class ExternalPageController extends AbstractController {

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String link = request.getParameter("link");
		
        Map<String, String> resultMap = new HashMap<String, String>();  
        resultMap.put("link", link);  
		
		return new ModelAndView("/platform/include/externalPage", "resultMap", resultMap);
	}
	
	protected String getActualUrl(String link) {
		
		StringBuffer url = new StringBuffer();
		if(!link.contains("http://")) {
			url.append("http://");
		}
		url.append(link);
		return url.toString();
	}
	
}
