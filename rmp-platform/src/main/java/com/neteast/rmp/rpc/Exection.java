package com.neteast.rmp.rpc;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.seraph.bi.suite.support.exception.ExceptionHandler;
import com.seraph.bi.suite.support.exception.ExceptionSource;
import com.seraph.bi.suite.support.exception.Loger;
import com.seraph.bi.suite.support.exception.ME;
import com.seraph.bi.suite.support.exception.Report;

/**
 * 类说明: 在已知要调用的类，方法和参数的情况下，对其进行调用<br>
 * 创建时间: 2013-3-3 下午4:50:39<br>
 * 
 * @author 李祥辉<br>
 * @email lixh@neteast.com<br>
 */
@Component
public class Exection {

	@Autowired
	// @Qualifier("exceptionHandler")
	ExceptionHandler exceptionHandler;

	public Object exec(Object target, Method method, Object[] javaArgs,
			String jsonparams) {
		Object result = null;
		try {
			result = method.invoke(target, javaArgs);
		} catch (Throwable e) {
			if (e instanceof InvocationTargetException)
				e = ((InvocationTargetException) e).getTargetException();
			if (e instanceof ME && e.getMessage() == null)
				e = e.getCause();

			ExceptionSource source = new ExceptionSource(e, target.getClass(),
					method, jsonparams);
			Report report = exceptionHandler.report(source);

			// 记录日志
			Loger.log(source);
			return new JSONRPCResult(JSONRPCResult.CODE_REPORT, null,
					report.getMessage());
		}
		return result;
	}

	public ExceptionHandler getExceptionHandler() {
		return exceptionHandler;
	}

	public void setExceptionHandler(ExceptionHandler exceptionHandler) {
		this.exceptionHandler = exceptionHandler;
	}
}
