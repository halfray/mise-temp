package com.neteast.rmp.system.task;

public class Task {
	private String jobName;
	private String jobTriggerClass;
	private String cronExpression;
	private String jobState;

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobTriggerClass() {
		return jobTriggerClass;
	}

	public void setJobTriggerClass(String jobTriggerClass) {
		this.jobTriggerClass = jobTriggerClass;
	}

	public String getCronExpression() {
		return cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	public String getJobState() {
		return jobState;
	}

	public void setJobState(String jobState) {
		this.jobState = jobState;
	}

}
