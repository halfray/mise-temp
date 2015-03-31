package com.neteast.rmp.rpc.serializer.impl;

import java.util.Dictionary;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Iterator;

import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.SerializerState;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Serialises Hashtables
 * 
 * TODO: why not use a map serialiser?
 */
public class DictionarySerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { Hashtable.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONObject.class };

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    return (super.canSerialize(clazz, jsonClazz) || ((jsonClazz == null || jsonClazz == JSONObject.class) && Dictionary.class
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
    Dictionary ht = (Dictionary) o;
    JSONObject obj = new JSONObject();
    JSONObject mapdata = new JSONObject();

    try
    {
      obj.put("map", mapdata);
    }
    catch (Exception e)
    {
      throw (MarshallException) new MarshallException("Could not put data"+ e.getMessage()).initCause(e);
    }
    Object key = null;

    try
    {
      Enumeration en = ht.keys();
      while (en.hasMoreElements())
      {
        key = en.nextElement();
        String keyString = key.toString();  // only support String keys

        Object json = ser.marshall( ht.get(key), keyString);

        // omit the object entirely if it's a circular reference or duplicate
        // it will be regenerated in the fixups phase
        if (JSONSerializer.CIRC_REF_OR_DUPLICATE != json)
        {
          mapdata.put(keyString,json );
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
    return obj;
  }

  // TODO: try unMarshall and unMarshall share 90% code. Put in into an
  // intermediate function.
  // TODO: Also cache the result somehow so that an unmarshall
  // following a tryUnmarshall doesn't do the same work twice!
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
    if (!(java_class.equals("java.util.Dictionary") || java_class
        .equals("java.util.Hashtable")))
    {
      throw new UnmarshallException("not a Dictionary");
    }
    JSONObject jsonmap;
    try
    {
      jsonmap = jso.getJSONObject("map");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("map missing", e);
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
        m.setMismatch(ser.tryUnmarshall(null, jsonmap.get(key)).max(m).getMismatch());
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
    Hashtable ht;
    if (java_class.equals("java.util.Dictionary")
        || java_class.equals("java.util.Hashtable"))
    {
      ht = new Hashtable();
    }
    else
    {
      throw new UnmarshallException("not a Dictionary");
    }
    JSONObject jsonmap;
    try
    {
      jsonmap = jso.getJSONObject("map");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("map missing", e);
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
        ht.put(key, ser.unmarshall( null, jsonmap.get(key)));
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
    return ht;
  }
}
