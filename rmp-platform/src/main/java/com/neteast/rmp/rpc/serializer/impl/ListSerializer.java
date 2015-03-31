package com.neteast.rmp.rpc.serializer.impl;

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Vector;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.JSONSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.SerializerState;
import com.neteast.rmp.rpc.serializer.UnmarshallException;


/**
 * Serialises lists
 * 
 * TODO: if this serialises a superclass does it need to also specify the
 * subclasses?
 */
public class ListSerializer extends AbstractSerializer
{
  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * Classes that this can serialise.
   */
  private static Class[] _serializableClasses = new Class[] { List.class,
      ArrayList.class, LinkedList.class, Vector.class };

  /**
   * Classes that this can serialise to.
   */
  private static Class[] _JSONClasses = new Class[] { JSONObject.class };

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
	  return (super.canSerialize(clazz, jsonClazz) || ((jsonClazz == null || jsonClazz == JSONObject.class) && List.class
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
    List list = (List) o;
    JSONObject obj = new JSONObject();
    JSONArray arr = new JSONArray();

    int index = 0;
    try
    {
      Iterator i = list.iterator();
      while (i.hasNext())
      {
        Object json = ser.marshall(arr, i.next());
        if (JSONSerializer.CIRC_REF_OR_DUPLICATE != json)
        {
          arr.add(json);
        }
        else
        {
          // put a slot where the object would go, so it can be fixed up properly in the fix up phase
          arr.add(null);
        }
        index++;
      }
    }
    catch (MarshallException e)
    {
      throw (MarshallException) new MarshallException("element " + index).initCause(e);
    }
//    try
//    {
//      obj.put("list", arr);
//    }
//    catch (Exception e)
//    {
//      throw new MarshallException("Error setting list: " + e);
//    }
    return arr;
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
    if (!(java_class.equals("java.util.List")
        || java_class.equals("java.util.AbstractList")
        || java_class.equals("java.util.LinkedList")
        || java_class.equals("java.util.ArrayList") || java_class
        .equals("java.util.Vector")))
    {
      throw new UnmarshallException("not a List");
    }
    JSONArray jsonlist;
    try
    {
      jsonlist = jso.getJSONArray("list");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("Could not read list: " + e.getMessage(), e);
    }
    if (jsonlist == null)
    {
      throw new UnmarshallException("list missing");
    }
    int i = 0;
    ObjectMatch m = new ObjectMatch(-1);
    try
    {
      for (; i < jsonlist.size(); i++)
      {
        m.setMismatch(ser.tryUnmarshall(null, jsonlist.get(i)).max(m).getMismatch());
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
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
    AbstractList al;
    if (java_class.equals("java.util.List")
        || java_class.equals("java.util.AbstractList")
        || java_class.equals("java.util.ArrayList"))
    {
      al = new ArrayList();
    }
    else if (java_class.equals("java.util.LinkedList"))
    {
      al = new LinkedList();
    }
    else if (java_class.equals("java.util.Vector"))
    {
      al = new Vector();
    }
    else
    {
      throw new UnmarshallException("not a List");
    }

    JSONArray jsonlist;
    try
    {
      jsonlist = jso.getJSONArray("list");
    }
    catch (Exception e)
    {
      throw new UnmarshallException("Could not read list: " + e.getMessage(), e);
    }
    if (jsonlist == null)
    {
      throw new UnmarshallException("list missing");
    }
    int i = 0;
    try
    {
      for (; i < jsonlist.size(); i++)
      {
        al.add(ser.unmarshall( null, jsonlist.get(i)));
      }
    }
    catch (UnmarshallException e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
    }
    catch (Exception e)
    {
      throw new UnmarshallException("element " + i + " " + e.getMessage(), e);
    }
    return al;
  }

}
