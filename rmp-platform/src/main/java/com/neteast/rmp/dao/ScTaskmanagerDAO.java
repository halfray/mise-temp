package com.neteast.rmp.dao;

import java.util.List;
import java.util.Map;

import com.neteast.rmp.system.page.Criteria;

public interface ScTaskmanagerDAO {

	List getSystemTasks(Criteria c);

	Integer getSystemTasksCount(Criteria c);

	Integer insertSystemTask(Map<String, Object> map);

	Integer editSystemTask(Map<String, Object> map);

	Map<String, Object> getSystemTasksById(Map<String, Object> map);

	Integer delSystemTask(Map<String, Object> map);

	Integer updateSystemTaskState(Map<String, Object> map);

	Map<String, Object> getSystemTasksByJobName(Map<String, Object> map);
}