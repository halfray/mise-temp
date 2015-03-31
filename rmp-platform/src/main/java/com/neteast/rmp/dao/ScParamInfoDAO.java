package com.neteast.rmp.dao;

import java.util.List;
import java.util.Map;

import com.neteast.rmp.system.page.Criteria;

/**
 * 类说明：参数信息管理接口<br>
 * 创建时间：2013-4-17 上午11:11:23<br>
 * @author 姜宏业<br>
 * email:jianghy@neteast.com
 */
public interface ScParamInfoDAO {

	public List getParamInfoList(Criteria c);

	public Integer getParamInfoListCount(Criteria c);

	public Object getParamInfoById(Map<String, Object> map);

	public Integer insertParamInfo(Map<String, String> map);

	public Integer editParamInfo(Map<String, String> map);

	public Integer delParamInfo(Map<String, Object> map);

	public Integer saveSort(Map<String, Object> map);

	public String getParamNameByTypeAndCode(Map<String, Object> map);
}
