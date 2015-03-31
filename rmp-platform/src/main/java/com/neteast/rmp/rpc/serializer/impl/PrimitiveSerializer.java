package com.neteast.rmp.rpc.serializer.impl;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Serializes primitive Java values
 */
public class PrimitiveSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { int.class,
      byte.class, short.class, long.class, float.class, double.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { Integer.class,
      Byte.class, Short.class, Long.class, Float.class, Double.class,
      String.class };

  public Class[] getSerializableClasses()
  {
    return _serializableClasses;
  }

  public Class[] getJSONClasses()
  {
    return _JSONClasses;
  }

  /**
   * Converts a javascript object to a Java object
   * 
   * @param clazz The class of the Java object that it should be converted to
   * @param jso The javascript object
   * @return A Java primitive type in its java.lang wrapper.
   * @throws NumberFormatException If clazz is numeric and jso does not parse
   *           into a number.
   */
  public Object toPrimitive(Class clazz, Object jso)
      throws NumberFormatException
  {
    // TODO: is there a better way of doing this instead of all the if elses?
    if (int.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Integer((String) jso);
      }
      return new Integer(((Number) jso).intValue());
    }
    else if (long.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Long((String) jso);
      }
      return new Long(((Number) jso).longValue());
    }
    else if (short.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Short((String) jso);
      }
      return new Short(((Number) jso).shortValue());
    }
    else if (byte.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Byte((String) jso);
      }
      return new Byte(((Number) jso).byteValue());
    }
    else if (float.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Float((String) jso);
      }
      return new Float(((Number) jso).floatValue());
    }
    else if (double.class.equals(clazz))
    {
      if (jso instanceof String)
      {
        return new Double((String) jso);
      }
      return new Double(((Number) jso).doubleValue());
    }
    return null;
  }

  public ObjectMatch tryUnmarshall( Class clazz,
      Object jso) throws UnmarshallException
  {
    try
    {
      toPrimitive(clazz, jso);
    }
    catch (NumberFormatException e)
    {
      throw new UnmarshallException("not a primitive", e);
    }
    return ObjectMatch.OKAY;
  }

  public Object unmarshall( Class clazz, Object jso)
      throws UnmarshallException
  {
    try
    {
      Object primitive = toPrimitive(clazz, jso);
      return primitive;
    }
    catch (NumberFormatException e)
    {
      throw new UnmarshallException("cannot convert object " + jso
          + " to type " + clazz.getName(), e);
    }
  }

  public Object marshall( Object p, Object o)
      throws MarshallException
  {
    return o;
  }

}
