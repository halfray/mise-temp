/**
 * 
 */
package com.neteast.rmp.service.portal;

import java.util.List;

import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScCellCfgDAO;
import com.neteast.rmp.dao.ScPortalParmsDAO;
import com.neteast.rmp.dao.ScPortalStyDAO;
import com.neteast.rmp.dao.domain.ScCellCfg;
import com.neteast.rmp.dao.domain.ScCellCfgExample;
import com.neteast.rmp.dao.domain.ScCellCfgWithIdAndChildrenId;
import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.dao.domain.ScPortalParmsExample;
import com.neteast.rmp.dao.domain.ScPortalSty;
import com.neteast.rmp.dao.domain.ScPortalStyExample;

/**
 * @author seraph
 *
 */
@Service
public class PortalManagerImpl implements PortalManager {
	
	private ScPortalStyDAO scPortalStyDAO;
	
	private ScCellCfgDAO scCellCfgDAO;
	
	private ScPortalParmsDAO scPortalParmsDAO;

	public ScPortalSty getPortalStyle() {

		List<?> list = scPortalStyDAO
				.selectByExample(new ScPortalStyExample());

		if (list.size() > 0) {
			return (ScPortalSty) list.get(0);
		} else {
			return null;
		}
	}

	public void updatePortalStyle(ScPortalSty scPortalSty) {
		scPortalSty.setId(-1);
		scPortalStyDAO.updateByPrimaryKeyForCgs(scPortalSty);
	}

	public void setScPortalStyDAO(ScPortalStyDAO scPortalStyDAO) {
		this.scPortalStyDAO = scPortalStyDAO;
	}
	
	public void setScCellCfgDAO(ScCellCfgDAO scCellCfgDAO) {
		this.scCellCfgDAO = scCellCfgDAO;
	}

	public void setScPortalParmsDAO(ScPortalParmsDAO scPortalParmsDAO) {
		this.scPortalParmsDAO = scPortalParmsDAO;
	}

	@Override
	public List<ScPortalParms> getPortalParmsList(String portalCode) {
		
		ScPortalParmsExample example = new ScPortalParmsExample();
		example.setPortalCode(portalCode);
		example.setPortalCode_Indicator(ScPortalParmsExample.EXAMPLE_EQUALS);
		
		// List<ScPortalParms> portalParmsList = new ArrayList<ScPortalParms>();
		return scPortalParmsDAO.selectByExample(example, "sort");
	}

	@Override
	public List<ScCellCfg> getNoticeCellList(String portalCode) {
		
		ScCellCfgExample example = new ScCellCfgExample();
		example.setPortalCode(portalCode);
		example.setPortalCode_Indicator(ScCellCfgExample.EXAMPLE_EQUALS);
		
		return scCellCfgDAO.selectByExample(example, "sort");
	}

	@Override
	public List<ScCellCfgWithIdAndChildrenId> getScCellCfgWithIdAndChildrenId(String portalCode) {
		return scCellCfgDAO.selectIdAndChildrenId(portalCode);
	}

}
