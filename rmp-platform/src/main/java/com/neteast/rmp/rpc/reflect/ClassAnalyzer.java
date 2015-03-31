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

package com.neteast.rmp.rpc.reflect;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neteast.rmp.rpc.localarg.LocalArgController;


/**
 * A &quot;factory&quot; for producing ClassData information from Class objects.
 * Gathers the ClassData information via reflection and internally caches it.
 */
public class ClassAnalyzer
{
  /**
   * The logger for this class
   */
  private final static Log log = LogFactory.getLog(ClassAnalyzer.class);

  /**
   * Classes that have been analysed
   * 
   * key: Clazz, val ClassData
   */
  private static HashMap classCache = new HashMap();

  /**
   * <p>
   * Get ClassData containing information on public methods that can be invoked
   * for a given class.
   * </p>
   * <p>
   * The ClassData will be cached, and multiple calls to getClassData for the
   * same class will return the same cached ClassData object (unless
   * invalidateCache is called to clear the cache.)
   * </p>
   * 
   * @param clazz class to get ClassData for.
   * 
   * @return ClassData object for the given class.
   */
  public static ClassData getClassData(Class clazz)
  {
    ClassData cd;
    synchronized (classCache)
    {
      cd = (ClassData) classCache.get(clazz);
      if (cd == null)
      {
        cd = analyzeClass(clazz);
        classCache.put(clazz, cd);
      }
    }
    return cd;
  }

  /**
   * Empty the internal cache of ClassData information.
   */
  public static void invalidateCache()
  {
    classCache = new HashMap();
  }

  /**
   * Analyze a class and create a ClassData object containing all of the public
   * methods (both static and non-static) in the class.
   * 
   * @param clazz class to be analyzed.
   * 
   * @return a ClassData object containing all the public static and non-static
   *         methods that can be invoked on the class.
   */
  private static ClassData analyzeClass(Class clazz)
  {
    log.info("analyzing " + clazz.getName());
    Method methods[] = clazz.getMethods();
    ClassData cd = new ClassData();
    cd.clazz = clazz;

    // Create temporary method map
    HashMap staticMethodMap = new HashMap();
    HashMap methodMap = new HashMap();
    for (int i = 0; i < methods.length; i++)
    {
      Method method = methods[i];
      if (method.getDeclaringClass() == Object.class)
      {
        continue;
      }
      int mod = methods[i].getModifiers();
      if (!Modifier.isPublic(mod))
      {
        continue;
      }
      Class param[] = method.getParameterTypes();

      // don't count locally resolved args
      int argCount = 0;
      for (int n = 0; n < param.length; n++)
      {
        if (LocalArgController.isLocalArg(param[n]))
        {
          continue;
        }
        argCount++;
      }

      MethodKey mk = new MethodKey(method.getName(), argCount);
      ArrayList marr = (ArrayList) methodMap.get(mk);
      if (marr == null)
      {
        marr = new ArrayList();
        methodMap.put(mk, marr);
      }
      marr.add(method);
      if (Modifier.isStatic(mod))
      {
        marr = (ArrayList) staticMethodMap.get(mk);
        if (marr == null)
        {
          marr = new ArrayList();
          staticMethodMap.put(mk, marr);
        }
        marr.add(method);
      }
    }
    cd.methodMap = new HashMap();
    cd.staticMethodMap = new HashMap();
    // Convert ArrayLists to arrays
    Iterator i = methodMap.entrySet().iterator();
    while (i.hasNext())
    {
      Map.Entry entry = (Map.Entry) i.next();
      MethodKey mk = (MethodKey) entry.getKey();
      ArrayList marr = (ArrayList) entry.getValue();
      if (marr.size() == 1)
      {
        cd.methodMap.put(mk, marr.get(0));
      }
      else
      {
        cd.methodMap.put(mk, marr.toArray(new Method[0]));
      }
    }
    i = staticMethodMap.entrySet().iterator();
    while (i.hasNext())
    {
      Map.Entry entry = (Map.Entry) i.next();
      MethodKey mk = (MethodKey) entry.getKey();
      ArrayList marr = (ArrayList) entry.getValue();
      if (marr.size() == 1)
      {
        cd.staticMethodMap.put(mk, marr.get(0));
      }
      else
      {
        cd.staticMethodMap.put(mk, marr.toArray(new Method[0]));
      }
    }
    return cd;
  }
}
