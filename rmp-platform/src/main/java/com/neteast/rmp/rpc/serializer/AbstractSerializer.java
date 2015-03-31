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

package com.neteast.rmp.rpc.serializer;

import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**
 * Convenience class for implementing Serializers providing default setOwner and
 * canSerialize implementations.
 */
public abstract class AbstractSerializer implements Serializer
{

  /**
   * Main serialiser
   */
  protected JSONSerializer ser;

  /**
   * Default check that simply tests the given serializeable class arrays to
   * determine if the pair of classes can be serialized/deserialized from this
   * Serializer.
   * 
   * @param clazz Java type to check if this Serializer can handle.
   * @param jsonClazz JSON type to check this Serializer can handle.
   * 
   * @return true If this Serializer can serialize/deserialize the given
   *         java,json pair.
   */
  public boolean canSerialize(Class clazz, Class jsonClazz)
  {
    boolean canJava = false, canJSON = false;

    Class serializableClasses[] = getSerializableClasses();
    for (int i = 0; i < serializableClasses.length; i++)
    {
    	// 判断是否是超类	
        if (clazz == serializableClasses[i] || serializableClasses[i].isAssignableFrom(clazz))
      {
        canJava = true;
      }
    }

    if (jsonClazz == null)
    {
      canJSON = true;
    }
    else
    {
      Class jsonClasses[] = getJSONClasses();
      for (int i = 0; i < jsonClasses.length; i++)
      {
        if (jsonClazz == jsonClasses[i])
        {
          canJSON = true;
        }
      }
    }

    return (canJava && canJSON);
  }

  /**
   * Set the JSONSerialiser that spawned this object.
   * 
   * @param ser The parent serialiser.
   */
  public void setOwner(JSONSerializer ser)
  {
    this.ser = ser;
  }
  
  public void object2Json(Object obj ,JSONObject json) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
  {
	  SerializerUtil.object2Json(obj, json);
  }
  
  public void json2Object(JSONObject json,Object obj) throws IllegalArgumentException, JSONException, IllegalAccessException, InvocationTargetException, ParseException
  {
	  SerializerUtil.json2Object(json, obj);
  }
  
  public void object2Json(Object obj,JSONObject json,String[] args,String format) throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, JSONException
  {
	SerializerUtil.object2Json(obj, json,args,format);  
  }
  public void json2Object(JSONObject json,Object obj,String[] args,String format) throws IllegalArgumentException, JSONException, IllegalAccessException, InvocationTargetException, ParseException
  {
	  SerializerUtil.json2Object(json, obj,args,format);
  }
}
