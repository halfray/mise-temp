package com.neteast.rmp.export.dao;

import java.util.List;
import java.util.Map;

import com.neteast.rmp.system.page.Criteria;

public interface ExportBaseDAO {
	
	public <T> T insert(String statementName);
	
	public <T> T insert(String statementName,T obj);
	
	 public <T> List<T>	queryForList(String statementName) ;
	
	public <T> List<T>	queryForList(String statementName, int skipResults, int maxResults) ;
	
	public <T> List<T>	queryForList(String statementName,  Object parameterObject) ;
	
	public <T> List<T>	queryForList(String statementName, Object parameterObject, int skipResults, int maxResults) ;
	
	public  Map	queryForMap(String statementName, Object parameterObject, String keyProperty) ;
	
	public  Map	queryForMap(String statementName, Object parameterObject, String keyProperty, String valueProperty) ;
	
	 public <T> T	queryForObject(String statementName) ;
	
	public <T> T	queryForObject(String statementName, Object parameterObject) ;
	
	public <T> T	queryForObject(String statementName, Object parameterObject, T resultObject) ;
	
	public List getList(String statementName, Criteria cri);
	
	public Integer getCount(String statementName, Criteria cri);
}
