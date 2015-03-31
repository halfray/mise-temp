package com.neteast.rmp.web.systemconfig;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.neteast.rmp.dao.domain.ScTreeMenu;
import com.neteast.rmp.service.systemconfig.TreeMenuPersistenceManager;
import com.seraph.bi.suite.support.web.json.JsonFormProviderController;

public class TreeMenuPersistenceController extends JsonFormProviderController {

	private final static String ADD_ACTION = "add";

	private final static String UPDATE_ACTION = "update";

	private final static String DELETE_ACTION = "delete";

	@Autowired
	private TreeMenuPersistenceManager treeMenuPersistenceManager;

	public void setTreeMenuPersistenceManager(
			TreeMenuPersistenceManager treeMenuPersistenceManager) {
		this.treeMenuPersistenceManager = treeMenuPersistenceManager;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response, Object form) {

		String action = request.getParameter("action");

		ScTreeMenu scTreeMenu = (ScTreeMenu) form;
		if("0".equals(scTreeMenu.getLeaf()) || "false".equals(scTreeMenu.getLeaf())){
			scTreeMenu.setIconCls(null);
		}
		if (ADD_ACTION.equals(action)) {
			treeMenuPersistenceManager.addMenu(scTreeMenu);
		} else if (UPDATE_ACTION.equals(action)) {
			treeMenuPersistenceManager.updateMenuByPrimaryKey(scTreeMenu);
		} else if (DELETE_ACTION.equals(action)) {
			String key = request.getParameter("key");
			treeMenuPersistenceManager.deleteMenuByPrimaryKey(Integer.valueOf(key));
		} else {

		}
		return scTreeMenu;
	}

}
