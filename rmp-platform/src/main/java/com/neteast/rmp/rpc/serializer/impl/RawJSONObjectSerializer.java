package com.neteast.rmp.rpc.serializer.impl;

import java.util.Iterator;

import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Formats the Java JSONObject object.
 */
public class RawJSONObjectSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { JSONObject.class };

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
    // reprocess the raw json in order to fixup circular references and duplicates
    JSONObject jsonIn = (JSONObject) o;
    JSONObject jsonOut = new JSONObject();
    String key = null;
    try
    {
      Iterator i = jsonIn.keys();
      while (i.hasNext())
      {
        key = (String) i.next();

        Object j = ser.marshall(o, jsonIn.get(key));

        // omit the object entirely if it's a circular reference or duplicate
        // it will be regenerated in the fixups phase
        if (JSONSerializer.CIRC_REF_OR_DUPLICATE != j)
        {
          jsonOut.put(key, j);
        }
      }
    }
    catch (MarshallException e)
    {
      throw (MarshallException) new MarshallException("JSONObject key " + key + " " + e.getMessage()).initCause(e);
    }
    catch (Exception e)
    {
      throw (MarshallException) new MarshallException("JSONObject key " + key + " " + e.getMessage()).initCause(e);
    }
    return jsonOut;
  }

  public ObjectMatch tryUnmarshall( Class clazz,
      Object jso) throws UnmarshallException
  {
    return ObjectMatch.OKAY;
  }

  public Object unmarshall( Class clazz, Object jso)
      throws UnmarshallException
  {
    return jso;
  }

}
