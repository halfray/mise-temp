/*
 * jabsorb - a Java to JavaScript Advanced Object Request Broker
 * http://www.jabsorb.org
 *
 * Copyright 2007 The jabsorb team
 *
 * based on original code from
 * JSON-RPC-Java - a JSON-RPC to Java Bridge with dynamic invocation
 *
 * Copyright Metaparadigm Pte. Ltd. 2004.
 * Michael Clark <michael@metaparadigm.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package com.neteast.rmp.rpc.serializer.impl;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;

import com.neteast.rmp.rpc.serializer.AbstractSerializer;
import com.neteast.rmp.rpc.serializer.MarshallException;
import com.neteast.rmp.rpc.serializer.ObjectMatch;
import com.neteast.rmp.rpc.serializer.UnmarshallException;

/**
 * Serialises java beans that are known to have readable and writable properties
 */
public class BeanSerializer extends AbstractSerializer
{
  /**
   * Stores the readable and writable properties for the Bean.
   */
  protected static class BeanData
  {
    // TODO: Legacy comment. WTF?
    // in absence of getters and setters, these fields are
    // public to allow subclasses to access.
    /**
     * The bean info for a certain bean
     */
    public BeanInfo beanInfo;

    /**
     * The readable properties of the bean.
     */
    public Map readableProps;

    /**
     * The writable properties of the bean.
     */
    public Map writableProps;
  }

  /**
   * Unique serialisation id.
   */
  private final static long serialVersionUID = 2;

  /**
   * The logger for this class
   */
  private final static Logger log = Logger
      .getLogger(BeanSerializer.class);

  /**
   * Caches analysed beans
   */
  private static HashMap beanCache = new HashMap();

  /**
   * Classes that this can serialise.
   * 
   * TODO: Yay for bloat!
   */
  private static Class[] _serializableClasses = new Class[] {};

  /**
   * Classes that this can serialise to.
   * 
   * TODO: Yay for bloat!
   */
  private static Class[] _JSONClasses = new Class[] {};

  /**
   * Analyses a bean, returning a BeanData with the data extracted from it.
   * 
   * @param clazz The class of the bean to analyse
   * @return A populated BeanData
   * @throws IntrospectionException If a problem occurs during getting the bean
   *           info.
   */
  public static BeanData analyzeBean(Class clazz) throws IntrospectionException
  {
    log.info("analyzing " + clazz.getName());
    BeanData bd = new BeanData();
    bd.beanInfo = Introspector.getBeanInfo(clazz, Object.class);
    PropertyDescriptor props[] = bd.beanInfo.getPropertyDescriptors();
    bd.readableProps = new HashMap();
    bd.writableProps = new HashMap();
    for (int i = 0; i < props.length; i++)
    {
      if (props[i].getWriteMethod() != null)
      {
        bd.writableProps.put(props[i].getName(), props[i].getWriteMethod());
      }
      if (props[i].getReadMethod() != null)
      {
        bd.readableProps.put(props[i].getName(), props[i].getReadMethod());
      }
    }
    return bd;
  }

  /**
   * Gets the bean data from cache if possible, otherwise analyses the bean.
   * 
   * @param clazz The class of the bean to analyse
   * @return A populated BeanData
   * @throws IntrospectionException If a problem occurs during getting the bean
   *           info.
   */
  public static BeanData getBeanData(Class clazz) throws IntrospectionException
  {
    BeanData bd;
    synchronized (beanCache)
    {
      bd = (BeanData) beanCache.get(clazz);
      if (bd == null)
      {
        bd = analyzeBean(clazz);
        beanCache.put(clazz, bd);
      }
    }
    return bd;
  }

  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    return (!clazz.isArray() && !clazz.isPrimitive() && !clazz.isInterface() && (jsonClazz == null || jsonClazz == JSONObject.class));
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
    BeanData bd;
    try
    {
      bd = getBeanData(o.getClass());
    }
    catch (IntrospectionException e)
    {
      throw new MarshallException(o.getClass().getName() +
        " is not a bean", e);
    }

    JSONObject val = new JSONObject();
    Iterator i = bd.readableProps.entrySet().iterator();
    Object args[] = new Object[0];
    Object result;
    while (i.hasNext())
    {
      Map.Entry ent = (Map.Entry) i.next();
      String prop = (String) ent.getKey();
      if(StringUtils.equals(prop, "hibernateLazyInitializer")) {
    	  continue;
      }

      Method getMethod = (Method) ent.getValue();
      if (log.isDebugEnabled())
      {
        log.debug("invoking " + getMethod.getName() + "()");
      }
      try
      {
        result = getMethod.invoke(o, args);
      }
      catch (Throwable e)
      {
        if (e instanceof InvocationTargetException)
        {
          e = ((InvocationTargetException) e).getTargetException();
        }
        throw new MarshallException("bean " + o.getClass().getName()
            + " can't invoke " + getMethod.getName() + ": " + e.getMessage(), e);
      }
      try
      {
        if (result != null)
        {
          try
          {
            Object json = ser.marshall(o, result);

            // omit the object entirely if it's a circular reference or duplicate
            // it will be regenerated in the fixups phase
            if (new Object() != json)
            {
              val.put(prop, json);
            }
          }
          catch (Exception e)
          {
            throw new MarshallException(
              "JSONException: " + e.getMessage(), e);
          }
        }
      }
      catch (MarshallException e)
      {
        throw new MarshallException("bean " + o.getClass().getName() + " "
            + e.getMessage(), e);
      }
    }

    return val;
  }

  public ObjectMatch tryUnmarshall( Class clazz, Object o)
      throws UnmarshallException
  {
    JSONObject jso = (JSONObject) o;
    BeanData bd;
    try
    {
      bd = getBeanData(clazz);
    }
    catch (IntrospectionException e)
    {
      throw new UnmarshallException(clazz.getName() + " is not a bean", e);
    }

    int match = 0;
    int mismatch = 0;
    Iterator i = bd.writableProps.entrySet().iterator();
    while (i.hasNext())
    {
      Map.Entry ent = (Map.Entry) i.next();
      String prop = (String) ent.getKey();
      if (jso.has(prop))
      {
        match++;
      }
      else
      {
        mismatch++;
      }
    }
    if (match == 0)
    {
      throw new UnmarshallException("bean has no matches");
    }

    // create a concrete ObjectMatch that is always returned in order to satisfy circular reference requirements
    ObjectMatch returnValue = new ObjectMatch(-1);

    ObjectMatch m = null;
    ObjectMatch tmp;
    i = jso.keys();
    while (i.hasNext())
    {
      String field = (String) i.next();
      Method setMethod = (Method) bd.writableProps.get(field);
      if (setMethod != null)
      {
        try
        {
          Class param[] = setMethod.getParameterTypes();
          if (param.length != 1)
          {
            throw new UnmarshallException("bean " + clazz.getName()
                + " method " + setMethod.getName() + " does not have one arg");
          }
          tmp = ser.tryUnmarshall(param[0], jso.get(field));
          if (m == null)
          {
            m = tmp;
          }
          else
          {
            m = m.max(tmp);
          }
        }
        catch (UnmarshallException e)
        {
          throw new UnmarshallException("bean " + clazz.getName() + " "
              + e.getMessage(), e);
        }
        catch (Exception e)
        {
          throw new UnmarshallException("bean " + clazz.getName() + " "
              + e.getMessage(), e);
        }
      }
      else
      {
        mismatch++;
      }
    }
    if (m != null)
    {
      returnValue.setMismatch(m.max(new ObjectMatch(mismatch)).getMismatch());
    }
    else
    {
      returnValue.setMismatch(mismatch);
    }
    return returnValue;
  }

  public Object unmarshall( Class clazz, Object o)
      throws UnmarshallException
  {
    JSONObject jso = (JSONObject) o;
    BeanData bd;
    try
    {
      bd = getBeanData(clazz);
    }
    catch (IntrospectionException e)
    {
      throw new UnmarshallException(clazz.getName() + " is not a bean", e);
    }
    if (log.isDebugEnabled())
    {
      log.debug("instantiating " + clazz.getName());
    }
    Object instance;
    try
    {
      instance = clazz.newInstance();
    }
    catch (InstantiationException e)
    {
      throw new UnmarshallException(
        "could not instantiate bean of type " + 
        clazz.getName() + ", make sure it has a no argument " +
        "constructor and that it is not an interface or " +
        "abstract class", e);
    }
    catch (IllegalAccessException e)
    {
      throw new UnmarshallException(
        "could not instantiate bean of type " + 
        clazz.getName(), e);
    }
    catch (RuntimeException e)
    {
      throw new UnmarshallException(
        "could not instantiate bean of type " + 
        clazz.getName(), e);
    }
    Object invokeArgs[] = new Object[1];
    Object fieldVal;
    Iterator i = jso.keys();
    while (i.hasNext())
    {
      String field = (String) i.next();
      Method setMethod = (Method) bd.writableProps.get(field);
      if (setMethod != null)
      {
        try
        {
          Class param[] = setMethod.getParameterTypes();
          fieldVal = ser.unmarshall(param[0], jso.get(field));
        }
        catch (UnmarshallException e)
        {
          throw new UnmarshallException(
            "could not unmarshall field \"" + field + "\" of bean " + 
            clazz.getName(), e);
        }
        catch (Exception e)
        {
          throw new UnmarshallException(
              "could not unmarshall field \"" + field + "\" of bean " + 
              clazz.getName(), e);
        }
        if (log.isDebugEnabled())
        {
          log.debug("invoking " + setMethod.getName() + "(" + fieldVal + ")");
        }
        invokeArgs[0] = fieldVal;
        try
        {
          setMethod.invoke(instance, invokeArgs);
        }
        catch (Throwable e)
        {
          if (e instanceof InvocationTargetException)
          {
            e = ((InvocationTargetException) e).getTargetException();
          }
          throw new UnmarshallException("bean " + clazz.getName()
              + "can't invoke " + setMethod.getName() + ": " + e.getMessage(), e);
        }
      }
    }
    return instance;
  }
}
