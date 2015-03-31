package com.neteast.rmp.action;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.BaseDAO;
/**
 * 
 * 类说明：标签维护action<br>
 * 创建时间：2013-9-11 下午06:26:51<br>
 * @author 姜宏业<br>
 * email:jianghy@neteast.com
 */
@Service
public class ScTagLibManagerAction {

	@Autowired
	BaseDAO baseDao;

	public BaseDAO getBaseDao() {
		return baseDao;
	}

	public void setBaseDao(BaseDAO baseDao) {
		this.baseDao = baseDao;
	}
	
	public List<Map<String, Object>> getTagLibTreeList(Map<String, Object> map){
		List<Map<String, Object>> result = null;
		if(map == null || map.get("type") == null){
			List<Map<String, Object>> treeList = baseDao.queryForList("sc_taglib_manager.getTagLibTreeList", map);
			for(Map<String, Object> obj : treeList)
			{
				obj.put("value", obj.get("webSite_Type"));
				obj.put("type", "0");
			}
			result = treeList;
		}else{
			if(map.get("type").equals("0")) {
				List<Map<String, Object>> detailTreeList = baseDao.queryForList("sc_taglib_manager.getTagLibTreeList", map);
				for(Map<String, Object> obj : detailTreeList)
				{
					obj.put("type", "1");
					obj.put("leaf", true);
				}
				result = detailTreeList;
			}
		}
		return result;
	}
	
	public void onBoSave(Map<String, Object> map){
		String scTagLibManagerId = String.valueOf(map.get("scTagLibManagerId"));
		if("".equals(scTagLibManagerId)){
			baseDao.insert("sc_taglib_manager.onBoSave", map);
		}else{
			baseDao.insert("sc_taglib_manager.onBoUpdate", map);
		}
	}
	
	public void onBoDel(Map<String, Object> map){
		baseDao.delete("sc_taglib_manager.onBoDel", map);
	}
	
	public boolean checkRepeatTagName(String tagName){
		Integer count = baseDao.queryForObject("sc_taglib_manager.checkRepeatTagName", tagName);
		if(count > 0){
			return true;
		}else{
			return false;
		}
	}
	
}
