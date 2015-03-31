/**
 * 
 */
package com.neteast.rmp.service.tree;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScTreeMenuDAO;
import com.neteast.rmp.dao.domain.ScTreeMenuExample;
import com.seraph.bi.suite.support.domain.tree.AsyncTreeNode;
import com.seraph.bi.suite.support.domain.tree.CheckTreeNode;
import com.seraph.bi.suite.support.domain.tree.SyncTreeNode;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;

/**
 * 类说明: <br>
 * 创建时间: 2008-8-13 上午10:59:15<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Service
public class TreeManagerImpl implements TreeManager {

	private static final Logger log = Logger.getLogger(TreeManagerImpl.class);

	@Autowired
	private ScTreeMenuDAO scTreeMenuDAO;

	public void setScTreeMenuDAO(ScTreeMenuDAO scTreeMenuDAO) {
		this.scTreeMenuDAO = scTreeMenuDAO;
	}

	public List createTreeNodes(List list, Class clazz) {
		List<Object> results = new ArrayList<Object>();
		if (list != null) {
			for (Iterator<?> iterator = list.iterator(); iterator.hasNext();) {
				Object roleTreeMenu = iterator.next();
				try {
					Object bean = clazz.newInstance();
					BeanUtils.setProperty(bean, "draggable", true);
					BeanUtils.copyProperties(bean, roleTreeMenu);
					// 2011-08-25 Seraph, for rmp menu_id
//					BeanUtils.setProperty(bean, "id", BeanUtils.getProperty(roleTreeMenu, "menuId"));
//					BeanUtils.setProperty(bean, "parent", BeanUtils.getProperty(roleTreeMenu, "parentId"));
					results.add(bean);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return results;
	}

	public List<AsyncTreeNode> getLowerTreeNode(String menuId) {
		
		ScTreeMenuExample example = new ScTreeMenuExample();
		example.setParentId(Integer.valueOf(menuId));
		example.setParentId_Indicator(ScTreeMenuExample.EXAMPLE_EQUALS);
		
		List<AsyncTreeNode> list = scTreeMenuDAO.selectByExample(example);

		List<AsyncTreeNode> result = new ArrayList<AsyncTreeNode>();
		if (list != null) {
			result = list;
		}

		return createTreeNodes(result, AsyncTreeNode.class);
	}

	public List<AsyncTreeNode> getLowerTreeNodeByRole(String menuId) {
		
		BaseUser user = user = LoginUtil.getUser();
		String username = user.getUsername();

		List<AsyncTreeNode> list = scTreeMenuDAO.selectLowerTreeMenuNodeByAuthorities(Integer.valueOf(menuId), username);
		
		List<AsyncTreeNode> result = new ArrayList<AsyncTreeNode>();
		if (list != null) {
			result = list;
		}

		return createTreeNodes(result, AsyncTreeNode.class);
	}

	public SyncTreeNode getTreeNode(SyncTreeNode treeNode) {
		// TODO Auto-generated method stub
		return null;
	}

	public SyncTreeNode getTreeNodeByRole(SyncTreeNode treeNode) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<CheckTreeNode> getCheckTreeNode(String menuId) {
		ScTreeMenuExample example = new ScTreeMenuExample();
		example.setParentId(Integer.valueOf(menuId));
		example.setParentId_Indicator(ScTreeMenuExample.EXAMPLE_EQUALS);
		
		List<CheckTreeNode> list = scTreeMenuDAO.selectByExample(example);

		List<CheckTreeNode> result = new ArrayList<CheckTreeNode>();
		if (list != null) {
			result = list;
		}

		return createTreeNodes(result, CheckTreeNode.class);
	}

}
