package com.neteast.rmp.rpc.serializer;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.text.ParseException;
import java.util.Date;
import java.util.Iterator;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.commons.beanutils.BeanMap;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;

import com.neteast.rmp.util.DateTimeUtils;
import com.neteast.rmp.util.DateUtil;


/**
 * @ File_name SerializerUtil.java
 * @ Author : LiXiangHui (sino.soft@163.com)
 * @ CreateDate: 2009-9-18 上午10:54:43
 * @ Description :
 * @ Reviewed : 
 * @ UpateLog:	Name	Date	Reason/Contents
 * 			---------------------------------------
 * 				***		****	****
 */
public class SerializerUtil {
	static String[] baseType= new String[]{"char","short","int","long","float","boolean","Character","Short","Integer","Long","Double","Float","String","Boolean"};
	
	/**
	 *将Object对象的基本信息和日期类型信息装载到JSON对象中
	 *@param o 需要转换的Object对象
	 *@param json 装载的json对象
	 *@param args 不需要转换的属性
	 *@param format 日期转换时的格式 
	 */
	public static void object2Json(Object o,JSONObject json,String[] args,String format) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
	{
		BeanMap map = new BeanMap(o);
		Iterator<String> iter = map.keyIterator();
		while(iter.hasNext())
		{
			String parameter = iter.next();
			if(!ArrayUtils.contains(args,parameter))
			{
				if(map.getReadMethod(parameter)!=null 
						&&
				map.getReadMethod(parameter).getReturnType().isAssignableFrom(Date.class))//日期类型特殊处理
				{
					json.put(parameter, DateUtil.formatDate((Date)map.get(parameter),format));
					continue;
				}
				if(ArrayUtils.contains(baseType,map.getType(parameter).getSimpleName()))	//只处理基本类型
					json.put(parameter, map.get(parameter));
			}
		}
//			Class objectClass = o.getClass();
//			Method[] methods = objectClass.getDeclaredMethods();
//			for(Method method : methods)
//			{
//				if(method.getName().indexOf("get")!=-1 && Arrays.asList(args).indexOf(mehtod2Parameter(method.getName()))==-1)
//				{
//					if(method.getReturnType().getSimpleName().equals("Date"))		//日期类型特殊处理
//					{
//						json.put(mehtod2Parameter(method.getName()), DateUtil.formatDate((Date)method.invoke(o, new Object[0]),format));
//						continue;
//					}
//					if(Arrays.asList(baseType).indexOf(method.getReturnType().getSimpleName())!=-1)		//只处理基本类型
//						json.put(mehtod2Parameter(method.getName()), method.invoke(o, new Object[0]));
//				}
//			}
	}
	
	/**
	 *将Object对象的基本信息和日期类型信息装载到JSON对象中,默认转换所有基本类型,日期格式化为'yyyy-MM-dd'
	 *@param o 需要转换的Object对象
	 *@param json 装载的json对象
	 */
	public static void object2Json(Object o,JSONObject json) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
	{
		object2Json(o,json,new String[0],"yyyy-MM-dd");
	}
	
	/**
	 *将Object对象的基本信息和日期类型信息装载到JSON对象中,args不需要进行转换的属性名称
	 *@param o 需要转换的Object对象
	 *@param json 装载的json对象
	 *@param format 日期转换时的格式 
	 */
	public static void object2Json(Object o,JSONObject json,String format) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
	{
		object2Json(o,json,new String[0],format);
	}
	
	/**
	 *将Object对象的基本信息和日期类型信息装载到JSON对象中,默认日期格式化为'yyyy-MM-dd'
	 *@param o 需要转换的Object对象
	 *@param json 装载的json对象
	 *@param args 不需要转换的属性
	 */
	public static void object2Json(Object o,JSONObject json,String[] args) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
	{
		object2Json(o,json,args,"yyyy-MM-dd");
	}
	
	/**
	 *将josn对象的信息提取到对象中
	 *@param json 需要转换的json对象
	 *@param object 目标对象
	 *@param args 不需要转换的属性
	 *@param format 日期转换时的格式 
	 */
	public static <T> void json2Object(JSONObject json,T object,String[] args,String format) throws JSONException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, ParseException
	{
		BeanMap map = new BeanMap(object);
		Iterator<String> iter = map.keyIterator();
		while(iter.hasNext())
		{
			String name = iter.next();
			Method setMethod = map.getWriteMethod(name);
			if(setMethod!=null && !ArrayUtils.contains(args, name))
			{
				if(json.has(name) && StringUtils.isNotBlank(json.getString(name)))
				{
					Class type = map.getType(name);
					if(type.isAssignableFrom(String.class))
						setMethod.invoke(object, json.getString(name));
					if(type.isAssignableFrom(Short.class) || type.getSimpleName().equals("short"))
						setMethod.invoke(object, (short)json.getInt(name));
					if(type.isAssignableFrom(Integer.class) || type.getSimpleName().equals("int"))
						setMethod.invoke(object, json.getInt(name));
					if(type.isAssignableFrom(Long.class) || type.getSimpleName().equals("long"))
						setMethod.invoke(object, json.getLong(name));
					if(type.isAssignableFrom(Double.class) || type.getSimpleName().equals("double"))
						setMethod.invoke(object, json.getDouble(name));
					if(type.isAssignableFrom(Float.class) || type.getSimpleName().equals("float"))
						setMethod.invoke(object, (float)json.getDouble(name));
					if(type.isAssignableFrom(Boolean.class) || type.getSimpleName().equals("boolean"))
						setMethod.invoke(object, json.getDouble(name));
					if(type.isAssignableFrom(Date.class) || type.getSimpleName().equals("date"))
						setMethod.invoke(object, DateTimeUtils.convertStringToDateTime(format,json.getString(name)));
						
				}
			}
		}
	}
	/**
	 *将josn对象的信息提取到对象中,默认赋值所有基本属性,日期格式化默认为'yyyy-MM-dd'
	 *@param json 需要转换的json对象
	 *@param object 目标对象
	 *@param args 不需要转换的属性
	 *@param format 日期转换时的格式 
	 */
	public static <T> void json2Object(JSONObject json,T object) throws IllegalArgumentException, JSONException, IllegalAccessException, InvocationTargetException, ParseException
	{
		json2Object(json,object,new String[0],"yyyy-MM-dd");
	}
	/**
	 *将josn对象的信息提取到对象中,默认赋值所有基本属性
	 *@param json 需要转换的json对象
	 *@param object 目标对象
	 *@param format 日期转换时的格式 
	 */
	public static <T> void json2Object(JSONObject json,T object,String format) throws IllegalArgumentException, JSONException, IllegalAccessException, InvocationTargetException, ParseException
	{
		json2Object(json,object,new String[0],format);
	}
	/**
	 *将josn对象的信息提取到对象中,日期格式化默认为'yyyy-MM-dd'
	 *@param json 需要转换的json对象
	 *@param object 目标对象
	 *@param format 日期转换时的格式 
	 */
	public static <T> void json2Object(JSONObject json,T object,String[] args) throws IllegalArgumentException, JSONException, IllegalAccessException, InvocationTargetException, ParseException
	{
		json2Object(json,object,args,"yyyy-MM-dd");
	}
	/**
	 * 将get或set方法名转为属性
	 * @param method 需要转换的get方法 
	 */
//	public static String mehtod2Parameter(String method)
//	{
//		if(method.indexOf("get") == -1 && method.indexOf("set") == -1)
//			return "";
//		StringBuilder builder = new StringBuilder();
//		builder.append(method.substring(3)); // get 或set 所占字符
//		builder.setCharAt(0, (char)(builder.charAt(0)+32));
//		return builder.toString();
//	}
}
