package com.neteast.rmp.web.test;

import org.springframework.stereotype.Service;

import com.seraph.bi.suite.support.exception.ME;

@Service(value="testExceptionAction")
public class TestExceptionAction {
	public void getRunTimeException(String value)
	{
		throw new ArrayStoreException();
	}
	public void getCheckException(String value)
	{
		try
		{
			initEx();
		}catch(Exception e)
		{
			throw new ME(e);
		}
	}
	public void getME(String value)
	{
		throw new ME("从后台来得提示信息");
	}
	
	private void initEx() throws ClassNotFoundException
	{
		throw new ClassNotFoundException();
	}
}
