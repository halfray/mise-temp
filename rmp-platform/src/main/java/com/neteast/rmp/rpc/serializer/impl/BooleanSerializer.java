package com.neteast.rmp.rpc.serializer.impl;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.SerializerState;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Serialiess Boolean values
 */
public class BooleanSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { boolean.class,
      Boolean.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { Boolean.class,
      String.class };

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
    return o;
  }

  public ObjectMatch tryUnmarshall( Class clazz,
      Object jso) throws UnmarshallException
  {
    ObjectMatch returnValue = ObjectMatch.OKAY;
    return ObjectMatch.OKAY;
  }

  public Object unmarshall( Class clazz, Object jso)
      throws UnmarshallException {
    Boolean returnValue = Boolean.FALSE;
    if (jso instanceof String)
    {
      try
      {
        returnValue = new Boolean((String) jso);
      }
      catch (Exception e)
      {
        throw new UnmarshallException("Cannot convert " + jso + " to Boolean", e);
      }
    }
    else if (jso instanceof Boolean || clazz == boolean.class || clazz == Boolean.class) {
      returnValue = (Boolean) jso;
    } else {
        try
        {
          returnValue = (Boolean) jso;
        }
        catch (Exception e)
        {
          throw new UnmarshallException("Cannot convert " + jso + " to Boolean", e);
        }
    }

    return returnValue;
  }

}
