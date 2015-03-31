package com.neteast.rmp.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.ScTaskmanagerDAO;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.neteast.rmp.system.page.Criteria;

@Repository
public class ScTaskmanagerDAOImpl extends BaseSqlMapClientDaoSupport implements ScTaskmanagerDAO {

	@Override
	public List getSystemTasks(Criteria c) {
		return getSqlMapClientTemplate().queryForList("sc_taskmanager.getSystemTasks", c.getData(), c.getStart(), c.getFetchSize());
	}

	@Override
	public Integer getSystemTasksCount(Criteria c) {
		return (Integer)getSqlMapClientTemplate().queryForObject("sc_taskmanager.getSystemTasksCount", c.getData());
	}

	@Override
	public Integer insertSystemTask(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().insert("sc_taskmanager.insertSystemTask", map);
	}

	@Override
	public Integer editSystemTask(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().update("sc_taskmanager.editSystemTask", map);
	}

	@Override
	public Map<String, Object> getSystemTasksById(Map<String, Object> map) {
		return (Map<String, Object>) getSqlMapClientTemplate().queryForObject("sc_taskmanager.getSystemTasksById", map);
	}

	@Override
	public Integer delSystemTask(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().delete("sc_taskmanager.delSystemTask", map);
	}

	@Override
	public Integer updateSystemTaskState(Map<String, Object> map) {
		return (Integer)getSqlMapClientTemplate().delete("sc_taskmanager.updateSystemTaskState", map);
	}

	@Override
	public Map<String, Object> getSystemTasksByJobName(Map<String, Object> map) {
		return (Map<String, Object>) getSqlMapClientTemplate().queryForObject("sc_taskmanager.getSystemTasksByJobName", map);
	}

    
}