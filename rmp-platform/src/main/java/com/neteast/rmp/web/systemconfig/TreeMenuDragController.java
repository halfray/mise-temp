package com.neteast.rmp.web.systemconfig;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.ScTreeMenuDAO;
import com.neteast.rmp.dao.domain.ScTreeMenu;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明:<br>
 * 创建时间: 2011-1-26 下午03:08:05<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/treeMenuDrag.do")
public class TreeMenuDragController extends JsonProviderController {
	
	@Autowired
	private ScTreeMenuDAO scTreeMenuDAO;
	
	public void setScTreeMenuDAO(ScTreeMenuDAO scTreeMenuDAO) {
		this.scTreeMenuDAO = scTreeMenuDAO;
	}

	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		String dropNodeId = request.getParameter("dropNodeId");
		String targetNodeId = request.getParameter("targetNodeId");
		
		Integer id = Integer.valueOf(dropNodeId);
		Integer parentId = Integer.valueOf(targetNodeId);

		ScTreeMenu scTreeMenu = scTreeMenuDAO.selectByPrimaryKey(id);
		scTreeMenu.setParentId(parentId);
		int result = scTreeMenuDAO.updateByPrimaryKey(scTreeMenu);
		return result;
	}
}
