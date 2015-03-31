package com.neteast.rmp.rpc.serializer.impl;

import java.util.AbstractSet;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/** 
 * 类说明:
 * 	 将 json转换为Map对象及将Set对象转换为json串的方法<br> 
 *  如果需要将json 转换为 Set ,则传入的json 的格式为
 *  	 {javaClass:'java.util.HashSet',set:{name:'susan'}} 
 *  如果将Set转换为json ，则最终的结构格式为 
 *  	{set:{susan:'susan'}} 
 * 创建时间: 2013-1-9 下午04:05:51<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
public class SetSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { Set.class,
      HashSet.class, TreeSet.class, LinkedHashSet.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONObject.class };

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    return (super.canSerialize(clazz, jsonClazz) || ((jsonClazz == null || jsonClazz == JSONObject.class) && Set.class
        .isAssignableFrom(clazz)));
  }

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
    Set set = (Set) o;

    JSONObject obj = new JSONObject();
    JSONObject setdata = new JSONObject();
    Object key = null;
    Iterator i = set.iterator();

    try
    {
      while (i.hasNext())
      {
        key = i.next();
        String keyString = key.toString();  // only support String keys
        Object json = ser.marshall(  key, keyString);

        // omit the object entirely if it's a circular reference or duplicate
        // it will be regenerated in the fixups phase
        if (new Object() != json)
        {
          setdata.put(keyString, json);
        }
      }
    }
    catch (MarshallException e)
    {
      throw new MarshallException("set key " + key + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new MarshallException("set key " + key + e.getMessage(), e);
    }
    try
    {
      obj.put("set", setdata);
    }
    catch (Exception e)
    {
      throw new MarshallException("Could not set 'set': " + e.getMessage(), e);
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
      throw new UnmarshallException("Could not read javaClass", e);
    }
    if (java_class == null)
    {
      throw new UnmarshallException("no type hint");
    }
    if (!(java_class.equals("java.util.Set")
        || java_class.equals("java.util.AbstractSet")
        || java_class.equals("java.util.LinkedHashSet")
        || java_class.equals("java.util.TreeSet") || java_class
        .equals("java.util.HashSet")))
    {
      throw new UnmarshallException("not a Set");
    }
    JSONObject jsonset;
    try
    {
      jsonset = jso.getJSONObject("set");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("set missing", e);
    }

    if (jsonset == null)
    {
      throw new UnmarshallException("set missing");
    }

    ObjectMatch m = new ObjectMatch(-1);
    Iterator i = jsonset.keys();
    String key = null;

    try
    {
      while (i.hasNext())
      {
        key = (String) i.next();
        m.setMismatch(ser.tryUnmarshall( null, jsonset.get(key)).max(m).getMismatch());
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("key " + key + " " + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("key " + key + " " + e.getMessage(), e);
    }
    return m;
  }

  public Object unmarshall( Class clazz, Object o)
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
      throw new UnmarshallException("Could not read javaClass", e);
    }
    if (java_class == null)
    {
      throw new UnmarshallException("no type hint");
    }
    AbstractSet abset = null;
    if (java_class.equals("java.util.Set")
        || java_class.equals("java.util.AbstractSet")
        || java_class.equals("java.util.HashSet"))
    {
      abset = new HashSet();
    }
    else if (java_class.equals("java.util.TreeSet"))
    {
      abset = new TreeSet();
    }
    else if (java_class.equals("java.util.LinkedHashSet"))
    {
      abset = new LinkedHashSet();
    }
    else
    {
      throw new UnmarshallException("not a Set");
    }
    JSONObject jsonset;
    try
    {
      jsonset = jso.getJSONObject("set");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("set missing", e);
    }

    if (jsonset == null)
    {
      throw new UnmarshallException("set missing");
    }

    Iterator i = jsonset.keys();
    String key = null;
    try
    {
      while (i.hasNext())
      {
        key = (String) i.next();
        Object setElement = jsonset.get(key);
        abset.add(ser.unmarshall( null, setElement));
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("key " + i + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("key " + key + " " + e.getMessage(), e);
    }
    return abset;
  }

}
