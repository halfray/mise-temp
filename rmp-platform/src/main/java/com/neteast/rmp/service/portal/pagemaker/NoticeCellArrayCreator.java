/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.domain.ScCellCfg;
import com.neteast.rmp.service.portal.PortalConstants;
import com.neteast.rmp.service.portal.PortalManager;

/**
 * 类说明: 接受通知的Cell对象数组<br>
 * 创建时间: 2013-4-9 下午7:11:46<br>
 * 
 * @author 刘岩松<br>
 * @email liuys@neteast.com<br>
 */
@Service
public class NoticeCellArrayCreator implements Creator {
	
	@Autowired
	private PortalManager portalManager;
	
	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

	private String getNoticeCellArray(List<ScCellCfg> scCellCfgList) {
		
		StringBuffer sb = new StringBuffer();
		if(scCellCfgList.size() < 1) {
			sb.append("[]");
			return sb.toString();
		} else {
			sb.append("[");
			for (ScCellCfg scCellCfg : scCellCfgList) {
				if(PortalConstants.NOTICE_ME_NOT == scCellCfg.getNoticeMe()) {
					continue;
				}
				sb.append("{");
				sb.append("'id':'" + scCellCfg.getId() + "', ");
				sb.append("'href':'" + scCellCfg.getHref() + "'");
				sb.append("}, ");
			}
			if (sb.length() > 2) {
				sb.setLength(sb.length() - 2);
			}
			sb.append("]");
		}
		return sb.toString();
	}

	public String create(String portalCode) throws Exception {
		
		List<ScCellCfg> scCellCfgList = portalManager.getNoticeCellList(portalCode);
		return getNoticeCellArray(scCellCfgList);
	}

	@Override
	public String createToolbar(String portalCode, String flag)
			throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

}
