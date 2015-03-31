package com.neteast.rmp.web.systemTaskManager;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

public class SystemTaskTestJob1 implements Job {
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowtime = sdf.format(date);
		
		System.out.println("In SystemTask - executing its JOB at " 
				+ nowtime + " by " + context.getTrigger().getName()+
				",and jobname:"+context.getJobDetail().getName());
	}

}
