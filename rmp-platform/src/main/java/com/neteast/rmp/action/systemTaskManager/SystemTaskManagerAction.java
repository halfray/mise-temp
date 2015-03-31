package com.neteast.rmp.action.systemTaskManager;

import java.util.List;
import java.util.Map;

import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScTaskmanagerDAO;
import com.neteast.rmp.system.page.Criteria;
import com.neteast.rmp.system.page.Page;
import com.neteast.rmp.web.systemTaskManager.SystemTaskRunner;

@Service
public class SystemTaskManagerAction {
	@Autowired
	ScTaskmanagerDAO scTaskmanagerDao;

	public ScTaskmanagerDAO getScTaskmanagerDao() {
		return scTaskmanagerDao;
	}

	public void setScTaskmanagerDao(ScTaskmanagerDAO scTaskmanagerDao) {
		this.scTaskmanagerDao = scTaskmanagerDao;
	}
	
	@Autowired
	SystemTaskRunner systemTaskRunner;

	public SystemTaskRunner getSystemTaskRunner() {
		return systemTaskRunner;
	}

	public void setSystemTaskRunner(SystemTaskRunner systemTaskRunner) {
		this.systemTaskRunner = systemTaskRunner;
	}

	public Page getSystemTasks(Criteria c){
		List list = scTaskmanagerDao.getSystemTasks(c);
		Integer count = scTaskmanagerDao.getSystemTasksCount(c);
		
		return new Page(c, list, count);
	}
	
	public Integer saveSystemTask(Map<String, Object> map){
		Integer i;
		if("".equals(map.get("taskmanager_id"))){
			i = scTaskmanagerDao.insertSystemTask(map);
			map.put("taskmanager_id", String.valueOf(i));
			if("1".equals(map.get("jobIsvalid"))){
				try {
					systemTaskRunner.start(map);
				} catch (SchedulerException e) {
					e.printStackTrace();
				}
			}
		}else{
			Map<String, Object> mapTask = scTaskmanagerDao.getSystemTasksById(map);
			try {
				systemTaskRunner.delTask(mapTask);
			} catch (SchedulerException e1) {
				e1.printStackTrace();
			}
			i = scTaskmanagerDao.editSystemTask(map);
			try {
				map.put("id", map.get("id"));
				if("1".equals(map.get("jobIsvalid"))){
					systemTaskRunner.start(map);
				}
			} catch (SchedulerException e) {
				e.printStackTrace();
			}
		}
		return i;
	}
	
	public Integer delSystemTask(Map<String, Object> map){
		Integer i = scTaskmanagerDao.delSystemTask(map);
		try {
			systemTaskRunner.delTask(map);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return i;
	}
	
	public String startSystemTask(Map<String, Object> map){
		String message = "";
		try {
			message = systemTaskRunner.start(map);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return message;
	}
	
	public String pauseSystemTask(Map<String, Object> map){
		String message = "";
		try {
			message = systemTaskRunner.pause(map);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return message;
	}
	
	public String recoverSystemTask(Map<String, Object> map){
		String message = "";
		try {
			message = systemTaskRunner.recover(map);
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
		return message;
	}
	
	public String checkJobName(Map<String, Object> map) {
		String message = null;
		Map<String, Object> taskMap = scTaskmanagerDao.getSystemTasksByJobName(map);
		if(taskMap != null && taskMap.size() > 0){
			message = "该任务名称已经存在";
		}
		return message;
	}
}
