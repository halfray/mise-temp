package com.neteast.rmp.web.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;


/**
 * 模块名称: 
 * 类名称：  ReflectionUtil   
 * 类描述：  
 * 创建人：     
 * 创建时间：2009-11-27 下午03:20:30  
 * 修改人：    
 * 修改时间：2009-11-27 下午03:20:30  
 * 修改备注：  
 * @version    
 * 
 */
public class ReflectionUtil {
	private static final Log logger = LogFactory.getLog(ReflectionUtil.class); 
	/**
	 * 或的对象的域的值
	 * @param obj				对象
	 * @param parameter			参数,支持多个个对象的链式查找
	 * @return
	 * @throws IllegalArgumentException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @throws NoSuchMethodException
	 */
	public static Object execGetMethod(Object obj,String parameter) throws IllegalArgumentException, SecurityException, IllegalAccessException, InvocationTargetException, NoSuchMethodException
	{
		if(parameter.indexOf(".") == -1)
			return findGetMethod(obj.getClass(),parameter).invoke(obj, new Object[0]);
		else
			return execGetMethod(execGetMethod(obj,parameter.substring(0,parameter.indexOf("."))),parameter.substring(parameter.indexOf(".")+1));
	}

	/**
	 * 为对象的域赋值,必须保证该域有set及get方法
	 * @param t			 对象
	 * @param parameter  域
	 * @param objs		 值
	 * @return
	 * @throws Exception
	 */
	public static <T> T execSetMethod(T t,String parameter,Object objs) throws Exception
	{
		if(parameter.indexOf(".") == -1)
		{
			Class type = findFieldType(t.getClass(),parameter);
			findSetMethod(t.getClass(),parameter).invoke(t, TypeUtil.changeType(objs, type));
			return t;
		}
		else
		{
			Object field = execGetMethod(t,parameter.substring(0,parameter.indexOf(".")));
			if(field == null)
				field = findFieldType(t.getClass(),parameter.substring(0,parameter.indexOf("."))).newInstance();
			return execSetMethod(t,parameter.substring(0,parameter.indexOf(".")),execSetMethod(field,parameter.substring(parameter.indexOf(".")+1),objs));
		}
	}
	
	/**
	 * 获得某类对象的指定参数的get方法
	 * @param clas			类型
	 * @param parameter		参数
	 * @return
	 * @throws SecurityException
	 * @throws NoSuchMethodException
	 */
	public static <T> Method findGetMethod(Class<T> clas,String parameter) throws SecurityException, NoSuchMethodException
	{
		return clas.getMethod(getGet(parameter), new Class[0]);
	}
	
	/**
	 * 获取指定类型的指定域的set方法
	 * @param <T>		泛型
	 * @param clas		指定类型
	 * @param parameter 域
	 * @return
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws NoSuchMethodException
	 */
	public static <T> Method findSetMethod(Class<T> clas,String parameter) throws SecurityException, NoSuchFieldException, NoSuchMethodException
	{
		Class fieldType = findFieldType(clas,parameter);
		return clas.getMethod(getSet(parameter), new Class[]{fieldType});
	}
	/**
	 * 获取指定类型的指定域的类型
	 * @param clas		类型
	 * @param fieldName 域名
	 * @return
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 */
	public static Class findFieldType(Class<?> clas,String fieldName) throws SecurityException, NoSuchFieldException
	{
		return clas.getDeclaredField(fieldName).getType();
	}
	/**
	 * 将get或set方法名转为属性
	 * @param method 需要转换的get方法 
	 */
	public static String mehtod2Parameter(String method)
	{
		if(method.indexOf("get") == -1 && method.indexOf("set") == -1)
			return "";
		return  new StringBuffer((char)(method.charAt(3)+32)+"").append(method.substring(4)).toString();
	}
	/**
	 * 通过属性找到该属性的get方法
	 * @param parameter		待转换属性
	 * @return
	 */
	public static String getGet(String parameter)
	{
		return new StringBuffer("get").append(parameter.toUpperCase().charAt(0)).append(parameter.substring(1)).toString();
	}
	/**
	 * 通过属性找到该属性的set方法
	 * @param parameter		待转换属性
	 * @return
	 */
	public static String getSet(String parameter)
	{
		return new StringBuffer("set").append(parameter.toUpperCase().charAt(0)).append(parameter.substring(1)).toString();
	}
	
	 /** 
	 * 功能说明:强制设置对象的属性值<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2012-12-26 下午04:15:41<br> 
	 * @param target - 更改的对象
	 * @param fname	- 属性名称
	 * @param ftype - 类型
	 * @param fvalue - 属性值
	 */ 
	public static void setFieldValue(Object target, String fname, 
	            Class<?> ftype, Object fvalue) { 
	        if (target == null 
	                || fname == null 
	                || "".equals(fname) 
	                || (fvalue != null && !ftype 
	                        .isAssignableFrom(fvalue.getClass()))) { 
	            return; 
	        } 
	        Class<?> clazz = target.getClass(); 
	        try { 
	            Method method = clazz.getDeclaredMethod("set" 
	                    + Character.toUpperCase(fname.charAt(0)) 
	                    + fname.substring(1), ftype); 
	            if (!Modifier.isPublic(method.getModifiers())) { 
	                method.setAccessible(true); 
	            } 
	            method.invoke(target, fvalue); 

	        } catch (Exception me) { 
	            if (logger.isDebugEnabled()) { 
	                logger.debug(me); 
	            } 
	            try { 
	                Field field = clazz.getDeclaredField(fname); 
	                if (!Modifier.isPublic(field.getModifiers())) { 
	                    field.setAccessible(true); 
	                } 
	                field.set(target, fvalue); 
	            } catch (Exception fe) { 
	                if (logger.isDebugEnabled()) { 
	                    logger.debug(fe); 
	                } 
	            } 
	        } 
	    } 
}
