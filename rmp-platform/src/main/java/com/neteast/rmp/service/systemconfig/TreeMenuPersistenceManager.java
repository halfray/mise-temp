/**
 * 
 */
package com.neteast.rmp.service.systemconfig;

import com.neteast.rmp.dao.domain.ScTreeMenu;

/**
 * @author seraph
 *
 */
public interface TreeMenuPersistenceManager {
	
	public Integer addMenu(ScTreeMenu scTreeMenu);
	
	public int updateMenuByPrimaryKey(ScTreeMenu scTreeMenu);
	
	public int deleteMenuByPrimaryKey(Integer id);

}
