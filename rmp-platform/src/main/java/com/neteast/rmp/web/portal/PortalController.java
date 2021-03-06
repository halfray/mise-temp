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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.neteast.rmp.dao.ScPortalStyDAO;
import com.neteast.rmp.dao.domain.ScPortalSty;
import com.neteast.rmp.dao.domain.ScPortalStyExample;

/**
 * @author Vicky
 * 
 */
@Controller
@RequestMapping("/portal.do")
public class PortalController extends AbstractController {

	@Autowired
	private ScPortalStyDAO scPortalStyDAO;

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {

		List<?> list = scPortalStyDAO
				.selectByExample(new ScPortalStyExample());

		if (list.size() > 0) {
			return new ModelAndView("/platform/portal/portal", "scPortalSty",
					(ScPortalSty) list.get(0));
		} else {
			return new ModelAndView("/platform/portal/portal");
		}
	}

	public void setScPortalStyDAO(ScPortalStyDAO scPortalStyDAO) {
		this.scPortalStyDAO = scPortalStyDAO;
	}

}
