package com.neteast.rmp.rpc.serializer.impl;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Serialises String values
 */
public class StringSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { String.class,
      char.class, Character.class, byte[].class, char[].class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { String.class,
      Integer.class };

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
    if (o instanceof Character)
    {
      return o.toString();
    }
    else if (o instanceof byte[])
    {
      return new String((byte[]) o);
    }
    else if (o instanceof char[])
    {
      return new String((char[]) o);
    }
    else
    {
      return o;
    }
  }

  public ObjectMatch tryUnmarshall( Class clazz,
      Object jso) throws UnmarshallException
  {
    return ObjectMatch.OKAY;
  }

  public Object unmarshall( Class clazz, Object jso)
      throws UnmarshallException
  {
    Object returnValue;
    String val = jso instanceof String ? (String) jso : jso.toString();
    if (clazz == char.class)
    {
      returnValue = new Character(val.charAt(0));
    }
    else if (clazz == byte[].class)
    {
      returnValue = val.getBytes();
    }
    else if (clazz == char[].class)
    {
      returnValue = val.toCharArray();
    }
    else
    {
      returnValue = val;
    }
    return returnValue;
  }

}
