package com.neteast.rmp.util;

import java.util.HashMap;

/**
 * 模块名称: 
 * 类名称：  DataModel   
 * 类描述：  
 * 创建人：  Administrator   
 * 创建时间：2009-12-17 上午11:14:45  
 * 修改人：  Administrator  
 * 修改时间：2009-12-17 上午11:14:45  
 * 修改备注：  
 * @version    
 * 
 */
public class DataModel<K,V> extends HashMap<K,V>{
	private String dateFormat = "yyyy-MM-dd";

	public DataModel()
	{
		super();
	}
	public DataModel(int i)
	{
		super(i);
	}
	public DataModel(int i,String dateFormat)
	{
		super(i);
		this.dateFormat = dateFormat;
	}
	public String getDateFormat() {
		return dateFormat;
	}

	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
}
