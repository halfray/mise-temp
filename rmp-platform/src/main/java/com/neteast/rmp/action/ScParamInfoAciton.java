package com.neteast.rmp.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScParamInfoDAO;
import com.neteast.rmp.system.page.Criteria;
import com.neteast.rmp.system.page.Page;

@Service
public class ScParamInfoAciton {

	@Autowired
	ScParamInfoDAO scParamInfoDao;

	public ScParamInfoDAO getScParamInfoDao() {
		return scParamInfoDao;
	}

	public void setScParamInfoDao(ScParamInfoDAO scParamInfoDao) {
		this.scParamInfoDao = scParamInfoDao;
	}
	/**
	 * 
	 * 功能说明：获取参数信息列表<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-17 上午11:21:14<br>
	 * @param c
	 * @return
	 */
	public Page getParamInfoList(Criteria c){
		List list = scParamInfoDao.getParamInfoList(c);
		Integer count = scParamInfoDao.getParamInfoListCount(c);
		
		Page page = new Page(c, list, count);
		return page;
	}
	/**
	 * 
	 * 功能说明：通过参数类型获取参数信息列表<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-17 下午06:33:46<br>
	 * @param map
	 * @return
	 */
	public Object getParamInfoById(Map<String, Object> map){
		return scParamInfoDao.getParamInfoById(map);
	}
	/**
	 * 
	 * 功能说明：插入参数信息<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-18 上午09:40:08<br>
	 * @param map
	 * @return
	 */
	public Integer insertParamInfo(Map<String, String> map){
		Integer i = scParamInfoDao.insertParamInfo(map);
		return i;
	}
	
	/**
	 * 
	 * 功能说明：修改参数信息<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-18 上午10:01:11<br>
	 * @param map
	 * @return
	 */
	public Integer editParamInfo(Map<String, String> map){
		Integer i;
		if("".equals(map.get("id"))){
			Criteria c = new Criteria();
			c.setData(map);
			List paramInfoList = scParamInfoDao.getParamInfoList(c);
			if(paramInfoList != null && paramInfoList.size() > 0){
				map.put("parmSort", String.valueOf(paramInfoList.size()+1));
				i = scParamInfoDao.insertParamInfo(map);
			}else{
				map.put("parmSort", "1");
				i = scParamInfoDao.insertParamInfo(map);
			}
		}else{
			i = scParamInfoDao.editParamInfo(map);
		}
		return i;
	}
	
	/**
	 * 
	 * 功能说明：删除参数信息<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-18 上午10:01:23<br>
	 * @param map
	 * @return
	 */
	public Integer delParamInfo(Map<String, Object> map){
		Integer i = scParamInfoDao.delParamInfo(map);
		return i;
	}
	
	/**
	 * 
	 * 功能说明：保存排序<br>
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-4-22 下午01:03:04<br>
	 * @param list
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public Map<String, Object> saveSort(List list){
		Map<String, Object> returnMap = new HashMap<String, Object>();
		if(list != null && list.size() > 0){
			for(int i = 0;i < list.size();i++){
				Map<String, Object> map = (Map<String, Object>) list.get(i);
				map.put("parmSort", i+1);
				Integer count = scParamInfoDao.saveSort(map);
				
			}
			returnMap.put("msg", "保存排序成功");
		}else{
			returnMap.put("msg", "没有可以排序的数据");
		}
		
		return returnMap;
	}
	
	public String getParamNameByTypeAndCode(Map<String, Object> map){
		return scParamInfoDao.getParamNameByTypeAndCode(map);
	}
}
