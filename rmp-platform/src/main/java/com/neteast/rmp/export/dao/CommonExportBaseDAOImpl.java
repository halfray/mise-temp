package com.neteast.rmp.export.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.neteast.rmp.system.page.Criteria;

@Component
public class CommonExportBaseDAOImpl extends BaseSqlMapClientDaoSupport implements ExportBaseDAO  {
	
	@SuppressWarnings("unchecked")
	public <T> T insert(String statementName)
	{
		return (T)getSqlMapClientTemplate().insert(statementName);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T insert(String statementName,T obj)
	{
		return (T)getSqlMapClientTemplate().insert(statementName,obj);
	}
	
	@SuppressWarnings("unchecked")
	 public <T> List<T>	queryForList(String statementName) 
	 {
		 return  getSqlMapClientTemplate().queryForList(statementName) ;
	 }
	
	@SuppressWarnings("unchecked")
	public <T> List<T>	queryForList(String statementName, int skipResults, int maxResults) 
	{
		return  getSqlMapClientTemplate().queryForList(statementName , skipResults, maxResults) ;
	}
	
	@SuppressWarnings("unchecked")
	public <T> List<T>	queryForList(String statementName,  Object parameterObject) 
	{
		return  getSqlMapClientTemplate().queryForList(statementName ,parameterObject) ;
	}
	
	@SuppressWarnings("unchecked")
	public <T> List<T>	queryForList(String statementName, Object parameterObject, int skipResults, int maxResults) 
	{
		return  getSqlMapClientTemplate().queryForList(statementName , parameterObject,skipResults, maxResults) ;
	}
	
	public  Map	queryForMap(String statementName, Object parameterObject, String keyProperty) 
	{
		return  getSqlMapClientTemplate().queryForMap( statementName, parameterObject, keyProperty);
	}
	
	public  Map	queryForMap(String statementName, Object parameterObject, String keyProperty, String valueProperty) 
	{
		return  getSqlMapClientTemplate().queryForMap( statementName, parameterObject, keyProperty,valueProperty);
	}
	
	@SuppressWarnings("unchecked")
	 public <T> T	queryForObject(String statementName) 
	 {
		 return (T)getSqlMapClientTemplate().queryForObject(statementName);
	 }
	
	@SuppressWarnings("unchecked")
	public <T> T	queryForObject(String statementName, Object parameterObject) 
	{
		return (T)getSqlMapClientTemplate().queryForObject(statementName,parameterObject);
	}
	
	@SuppressWarnings("unchecked")
	public <T> T	queryForObject(String statementName, Object parameterObject, T resultObject) 
	{
		return (T)getSqlMapClientTemplate().queryForObject(statementName,parameterObject,resultObject);
	}
	
	public List getList(String statementName, Criteria cri)
	{
		return getSqlMapClientTemplate().queryForList(statementName,cri.getData(), cri.getStart(),cri.getFetchSize());
	}
	
	public Integer getCount(String statementName, Criteria cri)
	{
		return (Integer)getSqlMapClientTemplate().queryForObject(statementName,cri.getData());
	}
}
