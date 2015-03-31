package com.neteast.rmp.rpc.serializer.impl;

import java.lang.reflect.Array;

import net.sf.json.JSONArray;
import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;


/**
 * Responsible for serialising Java arrays
 */
public class ArraySerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * The classes that this can serialise
   */
  private final static Class[] _serializableClasses = new Class[] {
      int[].class, short[].class, long[].class, float[].class, double[].class,
      boolean[].class, Integer[].class, Short[].class, Long[].class,
      Float[].class, Double[].class, Boolean[].class, String[].class };

  /**
   * The class that this serialises to
   */
  private final static Class[] _JSONClasses = new Class[] { JSONArray.class };

  public Class[] getSerializableClasses()
  {
    return _serializableClasses;
  }

  public Class[] getJSONClasses()
  {
    return _JSONClasses;
  }

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    Class cc = clazz.getComponentType();
    return (super.canSerialize(clazz, jsonClazz) || ((jsonClazz == null || jsonClazz == JSONArray.class) && (clazz
        .isArray() && !cc.isPrimitive())));
  }

  public ObjectMatch tryUnmarshall(Class clazz, Object o)
      throws UnmarshallException
  {
    JSONArray jso = (JSONArray) o;
    Class cc = clazz.getComponentType();
    int i = 0;
    ObjectMatch m = new ObjectMatch(-1);
    try
    {
      for (; i < jso.size(); i++)
      {
        m.setMismatch(ser.tryUnmarshall( cc, jso.get(i)).max(m).getMismatch());
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage()
          + " not found in json object", e);
    }
    return m;
  }

  public Object unmarshall(Class clazz, Object o)
      throws UnmarshallException
  {
    JSONArray jso = (JSONArray) o;
    Class cc = clazz.getComponentType();
    int i = 0;
    try
    {
      // TODO: Is there a nicer way of doing this without all the ifs?
      if (clazz == int[].class)
      {
        int arr[] = new int[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i))).intValue();
        }
        return arr;
      }
      else if (clazz == byte[].class)
      {
        byte arr[] = new byte[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i))).byteValue();
        }
        return arr;
      }
      else if (clazz == short[].class)
      {
        short arr[] = new short[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i)))
              .shortValue();
        }
        return arr;
      }
      else if (clazz == long[].class)
      {
        long arr[] = new long[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i))).longValue();
        }
        return arr;
      }
      else if (clazz == float[].class)
      {
        float arr[] = new float[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i)))
              .floatValue();
        }
        return arr;
      }
      else if (clazz == double[].class)
      {
        double arr[] = new double[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Number) ser.unmarshall( cc, jso.get(i)))
              .doubleValue();
        }
        return arr;
      }
      else if (clazz == char[].class)
      {
        char arr[] = new char[jso.size()];
        for (; i < jso.size(); i++)
        {
          arr[i] = ((String) ser.unmarshall( cc, jso.get(i))).charAt(0);
        }
        return arr;
      }
      else if (clazz == boolean[].class)
      {
        boolean arr[] = new boolean[jso.size()];
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ((Boolean) ser.unmarshall( cc, jso.get(i)))
              .booleanValue();
        }
        return arr;
      }
      else
      {
        Object arr[] = (Object[]) Array.newInstance(clazz.getComponentType(),
            jso.size());
        
        for (; i < jso.size(); i++)
        {
          arr[i] = ser.unmarshall( cc, jso.get(i));
        }
        return arr;
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage()
          + " not found in json object", e);
    }
  }

  public Object marshall(Object p, Object o)
      throws MarshallException
  {
    try
    {
      JSONArray arr = new JSONArray();
      if (o instanceof int[])
      {
        int a[] = (int[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof long[])
      {
        long a[] = (long[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof short[])
      {
        short a[] = (short[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof byte[])
      {
        byte a[] = (byte[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof float[])
      {
        float a[] = (float[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof double[])
      {
        double a[] = (double[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof char[])
      {
        char a[] = (char[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof boolean[])
      {
        boolean a[] = (boolean[]) o;
        for (int i = 0; i < a.length; i++)
        {
          arr.add(a[i]);
        }
      }
      else if (o instanceof Object[])
      {
        Object a[] = (Object[]) o;
        for (int i = 0; i < a.length; i++)
        {
          Object json = ser.marshall(o, a[i]);
          if (new Object() == json )
          {
            // if dup or circ ref found, put a null slot in
            // the array to maintain the array numbering for the fixups
            arr.add(null);
          }
          else
          {
            arr.add(json);
          }
        }
      }
      return arr;

    }
    catch (Exception e)
    {
      throw new MarshallException(e.getMessage() + " threw json exception");
    }

  }
}
