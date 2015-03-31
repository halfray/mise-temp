package com.neteast.rmp.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.ScParamInfoDAO;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.neteast.rmp.system.page.Criteria;


@Repository
public class ScParamInfoDAOImpl extends BaseSqlMapClientDaoSupport implements ScParamInfoDAO {

	@Override
	public List getParamInfoList(Criteria c) {
		return getSqlMapClientTemplate().queryForList("sc_parm_info.getParamInfoList", c.getData(), c.getStart(),c.getFetchSize());
	}

	@Override
	public Integer getParamInfoListCount(Criteria c) {
		return (Integer)getSqlMapClientTemplate().queryForObject("sc_parm_info.getParamInfoListCount",c.getData());
	}

	@Override
	public Object getParamInfoById(Map<String, Object> map) {
		return getSqlMapClientTemplate().queryForObject("sc_parm_info.getParamInfoById",map);
	}

	@Override
	public Integer insertParamInfo(Map<String, String> map) {
		return (Integer)getSqlMapClientTemplate().insert("sc_parm_info.insertParamInfo", map);
	}

	@Override
	public Integer editParamInfo(Map<String, String> map) {
		return (Integer)getSqlMapClientTemplate().update("sc_parm_info.editParamInfo", map);
	}

	@Override
	public Integer delParamInfo(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().delete("sc_parm_info.delParamInfo", map);
	}

	@Override
	public Integer saveSort(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().update("sc_parm_info.saveSort", map);
	}

	@Override
	public String getParamNameByTypeAndCode(Map<String, Object> map) {
		return (String)getSqlMapClientTemplate().queryForObject("sc_parm_info.getParamNameByTypeAndCode", map);
	}

}
