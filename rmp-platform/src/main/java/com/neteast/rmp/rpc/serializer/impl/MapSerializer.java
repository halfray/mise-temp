package com.neteast.rmp.rpc.serializer.impl;

import java.util.AbstractMap;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.TreeMap;

import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;


/** 
 * 类说明:
 * 	 将 json转换为Map对象及将Map对象转换为json串的方法<br> 
 *  如果需要将json 转换为 Map ,则传入的json 的格式为
 *  	 {javaClass:'java.util.HashMap',map:{name:'susan'}} 
 *  如果将Map转换为json ，则最终的结构格式为 
 *  {name:'susan'}
 * 创建时间: 2013-1-9 下午04:05:51<br> 
 * @author 李祥辉<br> 
 * @email lixh@neteast.com<br>  
 */ 
public class MapSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { Map.class,
      HashMap.class, TreeMap.class, LinkedHashMap.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONObject.class };

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    return (super.canSerialize(clazz, jsonClazz) || ((jsonClazz == null || jsonClazz == JSONObject.class) && Map.class
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
    Map map = (Map) o;
    JSONObject obj = new JSONObject();
    JSONObject mapdata = new JSONObject();
   
    Object key = null;
    try
    {
      Iterator i = map.entrySet().iterator();
      while (i.hasNext())
      {
        Map.Entry ent = (Map.Entry) i.next();
        key = ent.getKey();
        String keyString = key.toString();  // only support String keys

        Object json = ser.marshall(mapdata, ent.getValue());

        // omit the object entirely if it's a circular reference or duplicate
        // it will be regenerated in the fixups phase
        if (JSONSerializer.CIRC_REF_OR_DUPLICATE != json)
        {
          mapdata.put(keyString, json);
        }
      }
    }
    catch (MarshallException e)
    {
      throw (MarshallException) new MarshallException("map key " + key + " " + e.getMessage()).initCause(e);
    }
    catch (Exception e)
    {
      throw (MarshallException) new MarshallException("map key " + key + " " + e.getMessage()).initCause(e);
    }
//    try
//    {
//      obj.put("map", mapdata);
//    }
//    catch (Exception e)
//    {
//      throw new MarshallException("Could not add map to object: "
//          + e.getMessage());
//    }
    return mapdata;
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
    if (!(java_class.equals("java.util.Map")
        || java_class.equals("java.util.AbstractMap")
        || java_class.equals("java.util.LinkedHashMap")
        || java_class.equals("java.util.TreeMap") || java_class
        .equals("java.util.HashMap")))
    {
      throw new UnmarshallException("not a Map");
    }
    JSONObject jsonmap;
    try
    {
      jsonmap = jso.getJSONObject("map");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("Could not read map: " + e.getMessage(), e);
    }
    if (jsonmap == null)
    {
      throw new UnmarshallException("map missing");
    }
    ObjectMatch m = new ObjectMatch(-1);
    Iterator i = jsonmap.keys();
    String key = null;
    try
    {
      while (i.hasNext())
      {
        key = (String) i.next();
        m.setMismatch(ser.tryUnmarshall( null, jsonmap.get(key)).max(m).getMismatch());
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
    AbstractMap abmap;
    if (java_class.equals("java.util.Map")
        || java_class.equals("java.util.AbstractMap")
        || java_class.equals("java.util.HashMap"))
    {
      abmap = new HashMap();
    }
    else if (java_class.equals("java.util.TreeMap"))
    {
      abmap = new TreeMap();
    }
    else if (java_class.equals("java.util.LinkedHashMap"))
    {
      abmap = new LinkedHashMap();
    }
    else
    {
      throw new UnmarshallException("not a Map");
    }
    JSONObject jsonmap;
    try
    {
      jsonmap = jso.getJSONObject("map");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("Could not read map: " + e.getMessage(), e);
    }
    if (jsonmap == null)
    {
      throw new UnmarshallException("map missing");
    }
    Iterator i = jsonmap.keys();
    String key = null;
    try
    {
      while (i.hasNext())
      {
        key = (String) i.next();
        abmap.put(key, ser.unmarshall(null, jsonmap.get(key)));
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

    return abmap;
  }

}
