package com.neteast.rmp.action;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScRoleMenuDAO;
import com.neteast.rmp.dao.ScTreeMenuDAO;
import com.neteast.rmp.dao.domain.ScRoleMenu;
import com.neteast.rmp.dao.domain.ScRoleMenuExample;
import com.neteast.rmp.service.tree.CheckedTreeSortComparator;
import com.neteast.rmp.service.tree.TreeManager;
import com.neteast.rmp.system.page.Criteria;
import com.neteast.rmp.system.page.Page;
import com.seraph.bi.suite.support.domain.tree.CheckTreeNode;

@Service
public class ScRoleMenuAction {

	@Autowired
	ScRoleMenuDAO scRoleMenuDao;

	public ScRoleMenuDAO getScRoleMenuDao() {
		return scRoleMenuDao;
	}

	public void setScRoleMenuDao(ScRoleMenuDAO scRoleMenuDao) {
		this.scRoleMenuDao = scRoleMenuDao;
	}
	
	@Autowired
	private TreeManager treeManager;

	public void setTreeManager(TreeManager treeManager) {
		this.treeManager = treeManager;
	}
	
	@Autowired
	ScTreeMenuDAO scTreeMenuDao;
	
	public ScTreeMenuDAO getScTreeMenuDao() {
		return scTreeMenuDao;
	}

	public void setScTreeMenuDao(ScTreeMenuDAO scTreeMenuDao) {
		this.scTreeMenuDao = scTreeMenuDao;
	}

	public Page getRoleMenuInfo(Criteria c){
		List list = scRoleMenuDao.getRoleMenuInfo(c);
		Integer count = scRoleMenuDao.getRoleMenuInfoCount(c);
		return new Page(c, list, count);
	}
	
	public Integer editRoleMenu(Map<String, Object> map){
		Integer i = null;
		ScRoleMenu scRoleMenu = new ScRoleMenu();
		String id = String.valueOf(map.get("id"));
		if(id != null && id.length() > 0){
			scRoleMenu.setId(Integer.parseInt(map.get("id").toString()));
			scRoleMenu.setRoleName(String.valueOf(map.get("roleName")));
			scRoleMenu.setMenuId(Integer.parseInt(map.get("menuId").toString()));
			i = scRoleMenuDao.updateByPrimaryKey(scRoleMenu);
		}else{
			scRoleMenu.setRoleName(String.valueOf(map.get("roleName")));
			scRoleMenu.setMenuId(Integer.parseInt(map.get("menuId").toString()));
			i = scRoleMenuDao.insert(scRoleMenu);
		}
		return i;
		
	}
	
	public Object getListForTree(Map<String, String> map) throws Exception {
		String rootId = map.get("id");
		String type = map.get("type");

		List<CheckTreeNode> result = new ArrayList<CheckTreeNode>();
		List<CheckTreeNode> list = treeManager.getCheckTreeNode(rootId);
		
		List<Map<String, Object>> roleMenuList = new ArrayList<Map<String, Object>>();

		if (null != list) {
			result = list;
			if(!"0".equals(rootId)){
				ScRoleMenuExample example = new ScRoleMenuExample();
				//example.setMenuId(Integer.parseInt(rootId));
				//example.setMenuId_Indicator(ScRoleMenuExample.EXAMPLE_EQUALS);
				example.setId(Integer.parseInt(rootId));
				example.setId_Indicator(ScRoleMenuExample.EXAMPLE_EQUALS);
				example.setRoleName(type);
				example.setRoleName_Indicator(ScRoleMenuExample.EXAMPLE_EQUALS);
				roleMenuList = scRoleMenuDao.getCheckedTreeNode(example);
			}
			for(CheckTreeNode treeNode : list){
				treeNode.setExpanded(true);
				if("0".equals(rootId)){
					treeNode.setChecked(true);
				}else{
					for(Map<String, Object> roleMenuMap : roleMenuList){
						if(Integer.parseInt(treeNode.getId()) == Integer.parseInt(roleMenuMap.get("menu_id").toString())){
							treeNode.setChecked(true);
						}
					}
				}
			}
			// Sort
			CheckedTreeSortComparator comparator = new CheckedTreeSortComparator(false);
			Collections.sort(result, comparator);
		}
		return result;
	}
	
	public Integer saveRoleMenu(Map<String, Object> map){
		Integer i = null;
		String idList = String.valueOf(map.get("idList"));
		String roleName = String.valueOf(map.get("roleName"));
		ScRoleMenuExample example = new ScRoleMenuExample();
		example.setRoleName(roleName);
		example.setRoleName_Indicator(ScRoleMenuExample.EXAMPLE_EQUALS);
		int rows = scRoleMenuDao.deleteByExample(example);
		if(rows >= 0){
			//Map<String, Object> idMap = new HashMap<String, Object>();
			//idMap.put("idMap", idList);
			//List<Map<String,Object>> mapList = scRoleMenuDao.getMenuIdsByIds(idMap);
			String[] ids = idList.split(",");
			for(String id : ids){
				ScRoleMenu record = new ScRoleMenu();
				record.setRoleName(roleName);
				record.setMenuId(Integer.parseInt(id));
				i = scRoleMenuDao.insert(record);
			}
		}
		
		return i;
	} 
}
