package com.neteast.rmp.rpc.serializer.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;
import com.neteast.rmp.util.DateUtil;


/** 
 * 类说明:
 * 	 将 json转换为Date对象及将Date对象转换为json串的方法<br> 
 *  如果需要将json 转换为 Date ,则传入的json 的格式为
 *  	 {javaClass:'java.util.Date',time:'34893492384'} 或
 *  	 {javaClass:'java.util.Date',date:'20120131'} 
 *  	如果希望自定义格式化方式，则json中提供format 属性即可
 *  	  Ex:{javaClass:'java.util.Date',date:'20120131',format:'yyyyMMdd'} 
 *  如果将Date转换为json ，则最终的结构格式为 
 *  {"date":"20111231","time":{"date":31,"day":6,"hours":8,"minutes":0,"month":11,"seconds":0,"time":1325289600000,"timezoneOffset":-480,"year":111}}
 * 创建时间: 2013-1-9 下午04:05:51<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
public class DateSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { Date.class,
      Timestamp.class, java.sql.Date.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONObject.class };

  public Class[] getJSONClasses()
  {
    return _JSONClasses;
  }

  public Class[] getSerializableClasses()
  {
    return _serializableClasses;
  }

  public Object marshall( Object p, Object o)
      throws MarshallException
  {
    long time;
    if (o instanceof Date)
    {
      time = ((Date) o).getTime();
    }
    else
    {
      throw new MarshallException("cannot marshall date using class "
          + o.getClass());
    }
    JSONObject obj = new JSONObject();
    try
    {
       obj.put("date", DateUtil.formatDate(new Date(time), "yyyyMMdd"));
       obj.put("time", new Date(time));
    }
    catch (Exception e)
    {
      throw (MarshallException) new MarshallException(e.getMessage()).initCause(e);
    }
    return obj;
  }

  public ObjectMatch tryUnmarshall( Class clazz, Object o)
      throws UnmarshallException
  {
    JSONObject jso = (JSONObject) o;
    String java_class;
    try
    {
      java_class = jso.getString("javaClass");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("no type hint", e);
    }
    if (java_class == null)
    {
      throw new UnmarshallException("no type hint");
    }
    if (!(java_class.equals("java.util.Date")))
    {
      throw new UnmarshallException("not a Date");
    }
    return ObjectMatch.OKAY;
  }

  public Object unmarshall( Class clazz, Object o)
      throws UnmarshallException
  {
	    JSONObject jso = (JSONObject) o;
	    Long time = null;
	    if(!jso.has("time") && !jso.has("date"))
	      throw new UnmarshallException("Could not get the time or date in date serialiser");
	    
	    if (jso.has("javaClass"))
	    {
	      try
	      {
	        clazz = Class.forName(jso.getString("javaClass"));
	      }
	      catch (ClassNotFoundException e)
	      {
	        throw new UnmarshallException(e.getMessage(), e);
	      }
	      catch(JSONException e)
	      {
	        throw new UnmarshallException("Could not find javaClass", e);
	      }
	    }
	    Object returnValue = null;
		if (jso.has("date") && Date.class.equals(clazz))
		{
			String timestr = null;
			try
			{
				timestr = jso.getString("date");
				List list = null;
				if(jso.has("format"))
				{
					list = new ArrayList();
					list.add(jso.getString("format"));
				}
				returnValue = DateUtil.parseDate(timestr,list);
			}catch(JSONException e)
			{
				throw new UnmarshallException("cant get date from json : " +jso.toString(),e);
			}catch(Exception e)
			{
				throw new UnmarshallException("cant pase string to Date : " + timestr,e);
			}
			return returnValue;
		}
		try
		{
			time = jso.getLong("time");
		}catch(JSONException e)
		{
			throw new UnmarshallException("cant case time to long :" + jso.toString(),e);
		}
		if (Date.class.equals(clazz))
	    {
	      returnValue = new Date(time);
	    }
	    else if (Timestamp.class.equals(clazz))
	    {
	      returnValue = new Timestamp(time);
	    }
	    else if (java.sql.Date.class.equals(clazz))
	    {
	      returnValue = new java.sql.Date(time);
	    }
	    if (returnValue == null)
	    {
	      throw new UnmarshallException("invalid class " + clazz);
	    }
	    return returnValue;
	   }
}
