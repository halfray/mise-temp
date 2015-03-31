package com.neteast.rmp.dao.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.BaseDBDAO;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
@Repository
public class BaseDBDAOImpl extends BaseSqlMapClientDaoSupport implements
		BaseDBDAO {

	@Override
	public List<String> getAllTableNames(String tableNameLike) {
		return getSqlMapClientTemplate().queryForList("base_db.getAllTableNamesInCsgBack",tableNameLike);
	}
	public List<HashMap> getIPS(String value) {
		return getSqlMapClientTemplate().queryForList("base_db.getIPs",value);
	}
	public HashMap getIPValuess(HashMap value) {
		return (HashMap)getSqlMapClientTemplate().queryForObject("base_db.getIPValuess",value);
	}
	public void updatetest(HashMap value)
	{
		getSqlMapClientTemplate().update("base_db.updatetest",value);
	}
	
}
