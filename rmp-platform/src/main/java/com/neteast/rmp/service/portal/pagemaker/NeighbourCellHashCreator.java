/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.domain.ScCellCfgWithIdAndChildrenId;
import com.neteast.rmp.service.portal.PortalManager;

/** 
 * 类说明:<br> 
 * 创建时间: 2013-4-9 下午9:54:25<br> 
 * @author 刘岩松<br> 
 * @email liuys@neteast.com<br>  
 */
@Service
public class NeighbourCellHashCreator implements Creator {
	
	@Autowired
	private PortalManager portalManager;
	
	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

	private String getNeighbourCellHash(List<ScCellCfgWithIdAndChildrenId> scCellCfgWithIdAndChildrenIdList) {
		
		StringBuffer sb = new StringBuffer();
		if(scCellCfgWithIdAndChildrenIdList.size() < 1) {
			sb.append("{}");
			return sb.toString();
		} else {
			sb.append("{");
			
			Map<Integer, List<Integer>> map = new HashMap<Integer, List<Integer>>();
			for (ScCellCfgWithIdAndChildrenId scCellCfgWithIdAndChildrenId : scCellCfgWithIdAndChildrenIdList) {
				
				if(null == map.get(scCellCfgWithIdAndChildrenId.getId())) {
					List<Integer> list = new ArrayList<Integer>();
					list.add(scCellCfgWithIdAndChildrenId.getChildrenId());
					map.put(scCellCfgWithIdAndChildrenId.getId(), list);
				} else {
					List<Integer> list = map.get(scCellCfgWithIdAndChildrenId.getId());
					list.add(scCellCfgWithIdAndChildrenId.getChildrenId());
					map.put(scCellCfgWithIdAndChildrenId.getId(), list);
				}
			}
			
			for (Iterator<Integer> iterator = map.keySet().iterator(); iterator
					.hasNext();) {
				Integer id = (Integer) iterator.next();
				
				sb.append("" + id + ":[");
				for (Integer childrenId : map.get(id)) {
					sb.append("'" + childrenId + "', ");
				}
				if (sb.length() > 0) {
					sb.setLength(sb.length() - 2);
				}
				sb.append("], ");
			}
			if (sb.length() > 2) {
				sb.setLength(sb.length() - 2);
			}
			sb.append("}");
		}
		return sb.toString();
	}

	public String create(String portalCode) throws Exception {
		
		List<ScCellCfgWithIdAndChildrenId> scCellCfgWithIdAndChildrenIdList = portalManager.getScCellCfgWithIdAndChildrenId(portalCode);
		return getNeighbourCellHash(scCellCfgWithIdAndChildrenIdList);
	}

	@Override
	public String createToolbar(String portalCode, String flag)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
