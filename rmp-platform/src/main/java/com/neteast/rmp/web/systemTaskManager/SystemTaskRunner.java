package com.neteast.rmp.web.systemTaskManager;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.quartz.CronExpression;
import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.ScTaskmanagerDAO;
import com.neteast.rmp.system.page.Criteria;

@Repository
public class SystemTaskRunner {
	@Autowired
	ScTaskmanagerDAO scTaskmanagerDao;
 
	public ScTaskmanagerDAO getScTaskmanagerDao() {
		return scTaskmanagerDao;
	}

	public void setScTaskmanagerDao(ScTaskmanagerDAO scTaskmanagerDao) {
		this.scTaskmanagerDao = scTaskmanagerDao;
	}

	//private static final Logger log = Logger.getLogger(JDBCJobStoreRunner.class);  
	@SuppressWarnings("unchecked")
	@PostConstruct
	public void task() throws SchedulerException
    {
        try {
        	SchedulerFactory schedulerFactory = new StdSchedulerFactory();
        	Scheduler scheduler = schedulerFactory.getScheduler();
        	
        	//start the scheduler
	        scheduler.start();
        	
    		Criteria c =  new Criteria();
    		c.setData(null);
    		List<Map<String, Object>> list = scTaskmanagerDao.getSystemTasks(c);
	        for(Map<String, Object> map : list){
	        	if("1".equals(map.get("jobIsvalid"))){
		        	String jobDetailName = map.get("jobName").toString();
		        	String className = map.get("className").toString();
		        	String cronExpression = map.get("cronExpression").toString();
		        	String trigger = map.get("cronTrigger").toString(); 
		        	String jobstate = map.get("jobstate").toString();
	        	
	        		JobDetail jobDetail = new JobDetail(jobDetailName, Scheduler.DEFAULT_GROUP, Class.forName(className));
	        		
	        		CronTrigger cronTrigger = new CronTrigger(trigger, Scheduler.DEFAULT_GROUP);
	        		CronExpression cexp = new CronExpression(cronExpression);
	        		cronTrigger.setCronExpression(cexp);
	        		
	        		scheduler.scheduleJob(jobDetail, cronTrigger);
	        		
	        		if("2".equals(jobstate)){
	        			scheduler.pauseTrigger(trigger, Scheduler.DEFAULT_GROUP);
	        		}else if("3".equals(jobstate)){
	        			scheduler.pauseTrigger(trigger, Scheduler.DEFAULT_GROUP);
	        			scheduler.unscheduleJob(trigger, Scheduler.DEFAULT_GROUP);
	        		}
	        	}else{
	        		map.put("jobstate", "3");
	        		scTaskmanagerDao.updateSystemTaskState(map);
	        	}
	        }
	        
        } catch (Exception e) {
			e.printStackTrace();
		}
    }
    
	public String pause(Map<String, Object> paramMap) throws SchedulerException {
		String message = "";
		
    	SchedulerFactory schedulerFactory = new StdSchedulerFactory();
    	Scheduler scheduler = schedulerFactory.getScheduler();
		
		try {
			scheduler.pauseTrigger(paramMap.get("cronTrigger").toString(), Scheduler.DEFAULT_GROUP);
			scTaskmanagerDao.updateSystemTaskState(paramMap);
			message = "暂停成功";
		} catch (Exception e) {
			message = "暂停失败";
			e.printStackTrace();
		}
		
		return message;
	}
	
	public String start(Map<String, Object> paramMap) throws SchedulerException {
		String message = "";
		
    	SchedulerFactory schedulerFactory = new StdSchedulerFactory();
    	Scheduler scheduler = schedulerFactory.getScheduler();
		
		try {
			setScheduler(paramMap, scheduler);
			scheduler.start();
			
			scTaskmanagerDao.updateSystemTaskState(paramMap);
			message = "开启成功";
		} catch (Exception e) {
			message = "开启失败";
			e.printStackTrace();
		}
		
		return message;
	}

	private void setScheduler(Map<String, Object> paramMap, Scheduler scheduler)
			throws ClassNotFoundException, ParseException, SchedulerException {
		String className = paramMap.get("className").toString();
		JobDetail jobDetail = new JobDetail(paramMap.get("jobName").toString(), Scheduler.DEFAULT_GROUP, Class.forName(className));
		
		String trigger = paramMap.get("cronTrigger").toString();
		String cronExpression = paramMap.get("cronExpression").toString();
		CronTrigger cronTrigger = new CronTrigger(trigger, Scheduler.DEFAULT_GROUP);
		CronExpression cexp = new CronExpression(cronExpression);
		cronTrigger.setCronExpression(cexp);
		scheduler.scheduleJob(jobDetail, cronTrigger);
	}
	
	public String recover(Map<String, Object> paramMap) throws SchedulerException {
		String message = "";
		
    	SchedulerFactory schedulerFactory = new StdSchedulerFactory();
    	Scheduler scheduler = schedulerFactory.getScheduler();
		
		try {
			scheduler.resumeTrigger(paramMap.get("cronTrigger").toString(), Scheduler.DEFAULT_GROUP);
			scTaskmanagerDao.updateSystemTaskState(paramMap);
			message = "恢复成功";
		} catch (Exception e) {
			message = "恢复失败";
			e.printStackTrace();
		}
		
		return message;
	}
	
	public String delTask(Map<String, Object> map) throws SchedulerException {
		String message = "";
		
    	SchedulerFactory schedulerFactory = new StdSchedulerFactory();
    	Scheduler scheduler = schedulerFactory.getScheduler();
		
		try {
			scheduler.pauseTrigger(map.get("cronTrigger").toString(), Scheduler.DEFAULT_GROUP);
			boolean isSuccess = scheduler.unscheduleJob(map.get("cronTrigger").toString(), Scheduler.DEFAULT_GROUP);
			if(isSuccess == true){
				message = "移除任务成功";
			}else{
				message = "移除任务失败";
			}
		} catch (Exception e) {
			message = "移除任务失败";
			e.printStackTrace();
		}
		
		return message;
	}
	
	public static void main (String args[]) {
        try {
            SystemTaskRunner qRunner = new SystemTaskRunner();
            qRunner.task();
        } catch (Exception e)
        {
            e.printStackTrace();
        }
    }

}
