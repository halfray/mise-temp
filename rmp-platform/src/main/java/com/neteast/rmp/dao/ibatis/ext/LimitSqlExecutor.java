package com.neteast.rmp.dao.ibatis.ext;

import java.sql.Connection;
import java.sql.SQLException;

import com.ibatis.sqlmap.engine.execution.SqlExecutor;
import com.ibatis.sqlmap.engine.mapping.statement.RowHandlerCallback;
import com.ibatis.sqlmap.engine.scope.RequestScope;
import com.neteast.rmp.dao.ibatis.ext.dialect.Dialect;

public class LimitSqlExecutor extends SqlExecutor {
	
	private Dialect dialect;

	// 重写executeQuery方法，首先判断是否分页查询，分页查询先将分页SQL语句构建，然后执行iBatis默认的查询
	public void executeQuery(RequestScope request, Connection conn, String sql,
			Object[] parameters, int skipResults, int maxResults,
			RowHandlerCallback callback) throws SQLException {
		// 取数据库产品名称
		String dbName = conn.getMetaData().getDatabaseProductName();

		int len = sql.trim().length(); // update by hezhenjun 解决数据量大，查询不到数据问题，原因：if (sql.length() != len)偶然情况下，原sql和添加完limit后sql长度相等，不执行后续语句造成。

		// 判断是否分页
		if ((skipResults != NO_SKIPPED_RESULTS || maxResults != NO_MAXIMUM_RESULTS)) {
			// 根据数据库产品名称取对应的分页SQL语句
			sql = dialect.getLimitString(dbName, sql, skipResults, maxResults);

			// 分页语句是否存在
			if (sql.length() != len) {
				skipResults = NO_SKIPPED_RESULTS;
				maxResults = NO_MAXIMUM_RESULTS;
			}
		}
		super.executeQuery(request, conn, sql, parameters, skipResults,
				maxResults, callback);
	}

	public Dialect getDialect() {
		return dialect;
	}

	public void setDialect(Dialect dialect) {
		this.dialect = dialect;
	}
	
}