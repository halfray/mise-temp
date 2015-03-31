/**
 * 
 */
package com.neteast.rmp.service.systemconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScTreeMenuDAO;
import com.neteast.rmp.dao.domain.ScTreeMenu;

/**
 * @author seraph
 * 
 */
@Service
public class TreeMenuPersistenceManagerImpl extends SqlMapClientDaoSupport implements
		TreeMenuPersistenceManager {

	@Autowired
	private ScTreeMenuDAO scTreeMenuDAO;

	public void setScTreeMenuDAO(ScTreeMenuDAO scTreeMenuDAO) {
		this.scTreeMenuDAO = scTreeMenuDAO;
	}

	@Override
	public Integer addMenu(ScTreeMenu scTreeMenu) {
		return scTreeMenuDAO.insert(scTreeMenu);
	}

	@Override
	public int updateMenuByPrimaryKey(ScTreeMenu scTreeMenu) {
		return scTreeMenuDAO.updateByPrimaryKey(scTreeMenu);
	}

	@Override
	public int deleteMenuByPrimaryKey(Integer id) {
		return scTreeMenuDAO.deleteByPrimaryKey(id);
	}

}
