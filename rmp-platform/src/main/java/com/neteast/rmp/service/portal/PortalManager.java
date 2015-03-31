/**
 * 
 */
package com.neteast.rmp.service.portal;

import java.util.List;

import com.neteast.rmp.dao.domain.ScCellCfg;
import com.neteast.rmp.dao.domain.ScCellCfgWithIdAndChildrenId;
import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.dao.domain.ScPortalSty;

/**
 * 类说明:<br>
 * 创建时间: 2013-4-9 下午6:52:26<br>
 * 
 * @author 刘岩松<br>
 * @email liuys@neteast.com<br>
 */
public interface PortalManager {
	
	public ScPortalSty getPortalStyle();

	public void updatePortalStyle(ScPortalSty scPortalSty);

	public List<ScPortalParms> getPortalParmsList(String portalCode);

	/**
	 * 功能说明: 根据PortalCode查询，接受页面及参数刷新通知的Cell定义<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2013-4-9 下午6:51:11<br>
	 * 
	 * @param portalCode
	 * @return
	 */
	public List<ScCellCfg> getNoticeCellList(String portalCode);
	
	/**
	 * 功能说明: 取ScCellCfg中ID和子ID关联记录<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2013-4-10 上午2:41:28<br>
	 * 
	 * @return
	 */
	public List<ScCellCfgWithIdAndChildrenId> getScCellCfgWithIdAndChildrenId(String portalCode);

}
