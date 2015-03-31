package com.neteast.rmp.system.task;

import org.quartz.CronExpression;
import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SchedulerFactory;
import org.quartz.impl.StdSchedulerFactory;

/**
 * 通用定时任务类
 * @author lxh
 *
 */
public class TaskRunner {

	//状态
	public static final String START_STATE= "1";//启动状态
	public static final String PAUSE_STATE = "2";//暂停状态
	public static final String STOP_STATE = "3";//未启动状态
	
	public static SchedulerFactory schedulerFactory = new StdSchedulerFactory();
	public static Scheduler scheduler ;
	static 
	{
		try {
				scheduler = schedulerFactory.getScheduler();
				scheduler.start();
		} catch (SchedulerException e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * 创建并启动调度任务
	 * @param task
	 */
	public static boolean createTask(Task task,String group)
	{
		try
		{
		JobDetail jobDetail = new JobDetail(task.getJobName(), group, Class.forName(task.getJobTriggerClass()));
		
		CronTrigger cronTrigger = new CronTrigger(task.getJobName(), group);
		CronExpression cexp = new CronExpression(task.getCronExpression());
		cronTrigger.setCronExpression(cexp);
		
		scheduler.scheduleJob(jobDetail, cronTrigger);
		}catch(Exception e)
		{
			throw new  RuntimeException(e);
		}
		return true;
	}
	
	/**
	 * 暂停任务
	 * @param taskName - 待暂停任务的任务号
	 */
	public static boolean pauseTask(String taskName,String group)
	{
		try
		{
			scheduler.pauseTrigger(taskName, group);
		}catch(Exception e)
		{
			throw new  RuntimeException(e);
		}
		return true;
	}
	
	/**
	 * 恢复任务
	 * @param taskName - 待暂停任务的任务号
	 */
	public static boolean recoverTask(String taskName,String group)
	{
		try
		{
			scheduler.resumeTrigger(taskName, group);
		}catch(Exception e)
		{
			throw new  RuntimeException(e);
		}
		return true;
	}
	
	/**
	 * 删除任务
	 * @param taskName - 待删除任务的任务号
	 */
	public static boolean delTask(String taskName,String group)
	{
		boolean result = true;
		try
		{
			scheduler.pauseTrigger(taskName, group);
			result = scheduler.unscheduleJob(taskName, group);
		}catch(Exception e)
		{
			throw new  RuntimeException(e);
		}
		return result;
	}
	
	public static void main(String[] args) {
		Task task = new Task();
		task.setJobName("simplejobtest");
		task.setCronExpression("0 27 17 * * ?");
		task.setJobTriggerClass("com.neteast.rmp.SimpleJobTest");
		TaskRunner.createTask(task,Scheduler.DEFAULT_GROUP);
	}
}
