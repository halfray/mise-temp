package com.neteast.rmp.web.systemconfig;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.ScTreeMenuDAO;
import com.neteast.rmp.dao.domain.ScTreeMenu;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

import edu.emory.mathcs.backport.java.util.Arrays;

/**
 * 类说明:<br>
 * 创建时间: 2011-1-26 下午03:10:35<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/treeMenuMove.do")
public class TreeMenuMoveController extends JsonProviderController {
	
	@Autowired
	private ScTreeMenuDAO scTreeMenuDAO;

	public void setScTreeMenuDAO(ScTreeMenuDAO scTreeMenuDAO) {
		this.scTreeMenuDAO = scTreeMenuDAO;
	}

	@RequestMapping(method = { RequestMethod.POST })
	@SuppressWarnings("unchecked")
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		String ids = request.getParameter("ids");
		if (StringUtils.isNotBlank(ids)) {
			
			int index = 0;
			List<String> nodeList = Arrays.asList(ids.split(","));

			for (Iterator<String> iterator = nodeList.iterator(); iterator.hasNext();) {
				String str = (String) iterator.next();
				Integer id = Integer.valueOf(str);
				ScTreeMenu scTreeMenu = scTreeMenuDAO.selectByPrimaryKey(id);
				scTreeMenu.setSort(Integer.valueOf(index));
				scTreeMenuDAO.updateByPrimaryKey(scTreeMenu);
				index++;
			}
		}
		return new Object();
	}

}
