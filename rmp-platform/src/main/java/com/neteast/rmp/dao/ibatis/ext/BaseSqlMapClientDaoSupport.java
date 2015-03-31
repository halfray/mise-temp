package com.neteast.rmp.dao.ibatis.ext;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport; 

import com.ibatis.sqlmap.client.SqlMapClient; 
import com.ibatis.sqlmap.engine.execution.SqlExecutor; 
import com.ibatis.sqlmap.engine.impl.ExtendedSqlMapClient; 
import com.neteast.rmp.web.util.ReflectionUtil;

/** 
 * 类说明:DAO类的公共父类,所有DAO的实现都应该继承该接口<br> 
 * 创建时间: 2012-12-26 下午04:12:20<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
public abstract class BaseSqlMapClientDaoSupport extends SqlMapClientDaoSupport { 

	@Autowired
    private SqlExecutor sqlExecutor; 

    public SqlExecutor getSqlExecutor() { 
        return sqlExecutor; 
    } 

    public void setSqlExecutor(SqlExecutor sqlExecutor) { 
        this.sqlExecutor = sqlExecutor; 
    } 

    @PostConstruct
    public void initialize() throws Exception { 
        if (sqlExecutor != null) { 
            SqlMapClient sqlMapClient = getSqlMapClientTemplate() 
                    .getSqlMapClient(); 
            if (sqlMapClient instanceof ExtendedSqlMapClient) { 
            	ReflectionUtil.setFieldValue(((ExtendedSqlMapClient) sqlMapClient) 
                        .getDelegate(), "sqlExecutor", SqlExecutor.class, 
                        sqlExecutor); 
            } 
        } 
    } 
}