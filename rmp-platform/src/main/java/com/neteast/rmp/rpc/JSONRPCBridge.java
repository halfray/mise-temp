package com.neteast.rmp.rpc;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.StringTokenizer;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;

import com.neteast.rmp.rpc.candidate.MethodCandidate;
import com.neteast.rmp.rpc.localarg.LocalArgController;
import com.neteast.rmp.rpc.reflect.ClassAnalyzer;
import com.neteast.rmp.rpc.reflect.ClassData;
import com.neteast.rmp.rpc.reflect.MethodKey;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;
import com.seraph.bi.suite.support.core.SpringContext;

public class JSONRPCBridge {
	static Logger log = Logger.getLogger(JSONRPCBridge.class);

	static JSONSerializer jsonSer = new JSONSerializer();

	static {
		try {
			jsonSer.registerDefaultSerializers();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 功能说明: 根据指定的调用的后台类，方法名及JSON参数，对实际的java类进行调用<br>
	 * 创建者: 李祥辉<br>
	 * 创建时间: 2013-1-6 上午11:34:14<br>
	 * 
	 * @param target
	 *            - 要调用的后台类
	 * @param methodParam
	 *            - 需要调用的后台方法名称
	 * @param paramsArray
	 *            - json参数列表
	 * @return
	 */
	public JSONRPCResult call(Object[] context, JSONObject jsonReq) {
		String encodedMethod;
		Object requestId;
		JSONArray arguments;
		JSONArray fixups;
		try {
			// Get method name, arguments
			encodedMethod = jsonReq.getJSONArray("method").getString(0);
			arguments = jsonReq.getJSONArray("params").getJSONArray(0);
			requestId = jsonReq.opt("id");
			fixups = jsonReq.optJSONArray("fixups");
		} catch (JSONException e) {
			log.error("no method or params in request");
			return new JSONRPCResult(JSONRPCResult.CODE_ERR_NOMETHOD, null,
					JSONRPCResult.MSG_ERR_NOMETHOD);
		}

		if (log.isDebugEnabled()) {
			if (fixups != null) {
				log.debug("call " + encodedMethod + "(" + arguments + ")"
						+ ", requestId=" + requestId);
			} else {
				log.debug("call " + encodedMethod + "(" + arguments + ")"
						+ ", fixups=" + fixups + ", requestId=" + requestId);
			}
		}

		String className = null;
		String methodName = null;

		// Parse the class and methodName
		StringTokenizer t = new StringTokenizer(encodedMethod, ".");
		if (t.hasMoreElements()) {
			className = t.nextToken();
		}
		if (t.hasMoreElements()) {
			methodName = t.nextToken();
		}
		Object target = null;
		try {
			target = SpringContext.getBean(className);
		} catch (NoSuchBeanDefinitionException e) {
			e.printStackTrace();
			return new JSONRPCResult(JSONRPCResult.CODE_ERR_NOACTION, null,
					JSONRPCResult.MSG_ERR_NOACTION);
		}

		if (target == null) {
			return new JSONRPCResult(JSONRPCResult.CODE_ERR_NOACTION, null,
					JSONRPCResult.MSG_ERR_NOACTION);
		}

		// 获取方法
		Method method = resolveMethod(target, methodName, arguments);
		if (method == null) {
			return new JSONRPCResult(JSONRPCResult.CODE_ERR_NOMETHOD, null,
					JSONRPCResult.MSG_ERR_NOMETHOD);
		}
		JSONRPCResult result;

		// 获取参数
		Object javaArgs[];
		try {
			javaArgs = unmarshallArgs(context, method, arguments);
		} catch (UnmarshallException e1) {
			return new JSONRPCResult(JSONRPCResult.CODE_REMOTE_EXCEPTION, null,
					e1);
		}

		Object returnObj = null;

		// 调用
		// try {
		// returnObj = method.invoke(target, javaArgs);
		// } catch (IllegalArgumentException e) {
		// return new JSONRPCResult(JSONRPCResult.CODE_REMOTE_EXCEPTION, null,
		// e);
		// } catch (IllegalAccessException e) {
		// return new JSONRPCResult(JSONRPCResult.CODE_REMOTE_EXCEPTION, null,
		// e);
		// } catch (InvocationTargetException e) {
		// return new JSONRPCResult(JSONRPCResult.CODE_REMOTE_EXCEPTION, null,
		// e);
		// }
		Exection ec = (Exection) SpringContext.getBean("exection");
		returnObj = ec.exec(target, method, javaArgs,
				jsonReq.getJSONArray("params").toString());
		if (returnObj instanceof JSONRPCResult)
			return (JSONRPCResult) returnObj;

		// 对结果进行序列化
		Object json;
		try {
			json = jsonSer.marshall(null, returnObj);
		} catch (MarshallException e) {
			return new JSONRPCResult(JSONRPCResult.CODE_REMOTE_EXCEPTION, null,
					e);
		}
		result = new JSONRPCResult(JSONRPCResult.CODE_SUCCESS, null, json, null);

		return result;
	}

	/**
	 * 功能说明: 通过参数信息获取需要调用的方法 匹配原则： 1 方法名称与指定的名称相同 2 参数个数相同<br>
	 * 创建者: 李祥辉<br>
	 * 创建时间: 2013-1-6 上午11:31:16<br>
	 * 
	 * @param target
	 * @param methodName
	 * @param array
	 * @return
	 */
	public Method resolveMethod(Object target, String methodName,
			JSONArray arguments) {
		Method method[];

		ClassData cd = ClassAnalyzer.getClassData(target.getClass());
		HashMap methodMap = cd.getMethodMap();

		MethodKey mk = new MethodKey(methodName, arguments.size());
		Object o = methodMap.get(mk);
		if (o instanceof Method) {
			Method m = (Method) o;
			if (log.isDebugEnabled()) {
				log.debug("found method " + methodName + "(" + argSignature(m)
						+ ")");
			}
			return m;
		} else if (o instanceof Method[]) {
			method = (Method[]) o;
		} else {
			return null;
		}

		// 当类中存在重载的方法时，我们尝试则去调用并且通过传入的参数来获取最匹配的一个
		// 尝试转换每个候选方法的参数，通过比较决定选择最好的一个
		 List candidate = new ArrayList();
		 if (log.isDebugEnabled())
		    {
		      log.debug("looking for method " + methodName + "("
		          + argSignature(arguments) + ")");
		    }
		 
		   for (int i = 0; i < method.length; i++)
		    {
		      try
		      {
		        candidate.add(tryUnmarshallArgs(method[i], arguments));
		        if (log.isDebugEnabled())
		        {
		          log.debug("+++ possible match with method " + methodName + "("
		              + argSignature(method[i]) + ")");
		        }
		      }
		      catch (Exception e)
		      {
		        if (log.isDebugEnabled())
		        {
		          log.debug("xxx " + e.getMessage() + " in " + methodName + "("
		              + argSignature(method[i]) + ")");
		        }
		      }
		    }
		   
		   //这一步，遍历所有候选方法，选择与传递的参数最接近的一个作为匹配方法
		   MethodCandidate best = null;
		    for (int i = 0; i < candidate.size(); i++)
		    {
		      MethodCandidate c = (MethodCandidate) candidate.get(i);
		      if (best == null)
		      {
		        best = c;
		        continue;
		      }
		      final ObjectMatch bestMatch = best.getMatch();
		      final ObjectMatch cMatch = c.getMatch();
		      if (bestMatch.getMismatch() > cMatch.getMismatch())
		      {
		        best = c;
		      }
		      else if (bestMatch.getMismatch() == cMatch.getMismatch())
		      {
		        best = betterSignature(best, c);
		      }
		    }
		    if (best != null)
		    {
		      Method m = best.method;
		      if (log.isDebugEnabled())
		      {
		        log.debug("found method " + methodName + "(" + argSignature(m) + ")");
		      }
		      return m;
		    }
		return null;
	}
	
	 /** 
	 * 功能说明:在连个偏离度相同的方法中寻找最好的一个<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-12 下午11:00:22<br> 
	 * @param methodCandidate
	 * @param methodCandidate1
	 * @return 
	 */ 
	private MethodCandidate betterSignature(MethodCandidate methodCandidate,
		      MethodCandidate methodCandidate1)
		  {
		    final Method method = methodCandidate.method;
		    final Method method1 = methodCandidate1.method;
		    final Class[] parameters = method.getParameterTypes();
		    final Class[] parameters1 = method1.getParameterTypes();
		    int c = 0, c1 = 0;
		    for (int i = 0; i < parameters.length; i++)
		    {
		      final Class parameterClass = parameters[i];
		      final Class parameterClass1 = parameters1[i];
		      if (parameterClass != parameterClass1)
		      {
		    	  //越是具体的类型越接近
		        if (parameterClass.isAssignableFrom(parameterClass1))
		        {
		          c1++;
		        }
		        else
		        {
		          c++;
		        }
		      }
		    }
		    if (c1 > c)
		    {
		      return methodCandidate1;
		    }

		    return methodCandidate;

		  }
	  /** 
	 * 功能说明:尝试通过方法需要的参数去解析JSONArray的参数，获取一个偏离度<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-12 下午10:57:29<br> 
	 * @param method 需要进行解析的方法
	 * @param arguments 需要解析的参数
	 * @return	符合该方法和其参数的偏离度信息
	 * @throws UnmarshallException 如果任意一个参数无法解析，则抛出该异常
	 */ 
	private MethodCandidate tryUnmarshallArgs(Method method, JSONArray arguments)
		      throws UnmarshallException
		  {
		    MethodCandidate candidate = new MethodCandidate(method);
		    Class param[] = method.getParameterTypes();
		    int i = 0, j = 0;
		    try
		    {
		      for (; i < param.length; i++)
		      {
		        if (LocalArgController.isLocalArg(param[i]))
		        {
		          candidate.match[i] = ObjectMatch.OKAY;
		        }
		        else
		        {
		          candidate.match[i] = jsonSer.tryUnmarshall(param[i], arguments.get(j++));
		        }
		      }
		    }
		    catch (JSONException e)
		    {
		      throw (NoSuchElementException) new NoSuchElementException(e.getMessage()).initCause(e);
		    }
		    catch (UnmarshallException e)
		    {
		      throw new UnmarshallException("arg " + (i + 1) + " " + e.getMessage(), e);
		    }
		    return candidate;
		  }
	/**
	 * 功能说明: 打印方法的参数列表<br>
	 * 创建者: 李祥辉<br>
	 * 创建时间: 2013-3-4 下午11:44:00<br>
	 * 
	 * @param method
	 * @return
	 */
	private static String argSignature(Method method) {
		Class param[] = method.getParameterTypes();
		StringBuffer buf = new StringBuffer();
		for (int i = 0; i < param.length; i++) {
			if (i > 0) {
				buf.append(",");
			}
			buf.append(param[i].getName());
		}
		return buf.toString();
	}
	  /** 
	 * 功能说明: 为参数列表生成一个签名<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-12 下午10:44:07<br> 
	 * @param arguments
	 * @return 
	 */ 
	private static String argSignature(JSONArray arguments)
	  {
	    StringBuffer buf = new StringBuffer();
	    for (int i = 0; i < arguments.size(); i += 1)
	    {
	      if (i > 0)
	      {
	        buf.append(",");
	      }
	      Object jso;

	      try
	      {
	        jso = arguments.get(i);
	      }
	      catch (JSONException e)
	      {
	        throw (NoSuchElementException)new NoSuchElementException(e.getMessage()).initCause(e);
	      }

	      if (jso == null)
	      {
	        buf.append("java.lang.Object");
	      }
	      else if (jso instanceof String)
	      {
	        buf.append("java.lang.String");
	      }
	      else if (jso instanceof Number)
	      {
	        buf.append("java.lang.Number");
	      }
	      else if (jso instanceof JSONArray)
	      {
	        buf.append("java.lang.Object[]");
	      }
	      else
	      {
	        buf.append("java.lang.Object");
	      }
	    }
	    return buf.toString();
	  }
	/**
	 * 功能说明: 根据需要调用的Method对jsonArray进行转换<br>
	 * 创建者: 李祥辉<br>
	 * 创建时间: 2013-1-6 上午11:32:51<br>
	 * 
	 * @param method
	 * @param arguments
	 * @return
	 * @throws UnmarshallException
	 */
	private Object[] unmarshallArgs(Object context[], Method method,
			JSONArray arguments) throws UnmarshallException {
		Class param[] = method.getParameterTypes();
		Object javaArgs[] = new Object[param.length];
		int i = 0, j = 0;
		for (; i < param.length; i++) {
			if (LocalArgController.isLocalArg(param[i])) {
				javaArgs[i] = LocalArgController.resolveLocalArg(context,
						param[i]);
			} else {
				javaArgs[i] = jsonSer.unmarshall(param[i], arguments.get(j++));
			}
		}
		return javaArgs;
	}
}
