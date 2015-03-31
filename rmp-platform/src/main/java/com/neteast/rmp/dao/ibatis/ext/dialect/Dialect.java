package com.neteast.rmp.dao.ibatis.ext.dialect;

/** 
 * 接口说明:为不同的数据库实现物理分页的方言提供的统一接口<br> 
 * 创建时间: 2012-12-26 下午04:11:33<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
public interface Dialect {
	public String getLimitString(String dbName, String sql, int offset,	int limit) ;
}
