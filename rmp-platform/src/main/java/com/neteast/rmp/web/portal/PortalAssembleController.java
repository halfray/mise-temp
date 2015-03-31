/**
 * 
 */
package com.neteast.rmp.web.portal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.neteast.rmp.dao.ScPortalStyDAO;
import com.neteast.rmp.dao.domain.ScPortalSty;
import com.neteast.rmp.dao.domain.ScPortalStyExample;
import com.neteast.rmp.service.portal.pagemaker.PageMaker;

/**
 * 类说明: 支持联动且可装配的Portal实现<br>
 * 创建时间: 2013-4-7 下午9:10:22<br>
 * 
 * @author 刘岩松<br>
 * @email liuys@neteast.com<br>
 */
@Controller
@RequestMapping("/portalAssemble.do")
public class PortalAssembleController extends AbstractController {

	@Autowired
	private PageMaker pageMaker;
	
	@Autowired
	private ScPortalStyDAO scPortalStyDAO;
	
	public void setPageMaker(PageMaker pageMaker) {
		this.pageMaker = pageMaker;
	}

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String portalCode = request.getParameter("portalCode");
		String uxParams = request.getParameter("uxParams") != null ? request.getParameter("uxParams") : "null";
		
		//flag = 1使跳转的页面的查询和刷新功能消失,并且查询的条件为只读
		String flag = "";
		if(!"null".equals(uxParams)){
			if(uxParams.indexOf("flag") > -1){
				flag = uxParams.substring(uxParams.lastIndexOf("flag")+7, uxParams.lastIndexOf("flag")+8);
			}
		}
		
		ScPortalStyExample scPortalStyExample = new ScPortalStyExample();
		scPortalStyExample.setPortalCode(portalCode);
		scPortalStyExample.setPortalCode_Indicator(ScPortalStyExample.EXAMPLE_EQUALS);
		List<?> list = scPortalStyDAO.selectByExample(scPortalStyExample);
		
		String tbar = pageMaker.getTbarDefine(portalCode,flag);
		String parmCodeArray = pageMaker.getParmCodeArray(portalCode);
		String parmDefaultValueArray = pageMaker.getParmDefaultValueArray(portalCode);
		String noticeCellArray = pageMaker.getNoticeCellArray(portalCode);
		String neighbourCellHash = pageMaker.getNeighbourCellHash(portalCode);
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("tbar", tbar);
		map.put("parmCodeArray", parmCodeArray);
		map.put("noticeCellArray", noticeCellArray);
		map.put("neighbourCellHash", neighbourCellHash);
		map.put("parmDefaultValueArray", parmDefaultValueArray);
		map.put("uxParams", uxParams);
		
		map.put("scPortalSty", (ScPortalSty) list.get(0));
		
		if (list.size() > 0) {
			return new ModelAndView("/platform/portal/portalAssemble", map);
		} else {
			return new ModelAndView("/platform/portal/portalAssemble");
		}
	}

	public void setScPortalStyDAO(ScPortalStyDAO scPortalStyDAO) {
		this.scPortalStyDAO = scPortalStyDAO;
	}

}
