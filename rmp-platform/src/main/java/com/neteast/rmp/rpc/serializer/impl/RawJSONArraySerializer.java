package com.neteast.rmp.rpc.serializer.impl;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.SerializerState;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Formats the Java JSONArray object.
 */
public class RawJSONArraySerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { JSONArray.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONArray.class };

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
    JSONArray jsonIn = (JSONArray) o;
    JSONArray jsonOut = new JSONArray();

    int i = 0;
    try
    {
      int j = jsonIn.size();

      for (i=0; i<j; i++)
      {
        Object json = ser.marshall(o, jsonIn.get(i));
        if (JSONSerializer.CIRC_REF_OR_DUPLICATE != json)
        {
          jsonOut.add(i, json);
        }
        else
        {
          // put a slot where the object would go, so it can be fixed up properly in the fix up phase
          jsonOut.add(i, null);
        }
      }
    }
    catch (MarshallException e)
    {
      throw (MarshallException) new MarshallException("element " + i).initCause(e);
    }
    catch (Exception e)
    {
      throw (MarshallException) new MarshallException("element " + i).initCause(e);
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
