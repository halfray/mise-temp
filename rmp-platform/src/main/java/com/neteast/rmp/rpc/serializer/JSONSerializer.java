package com.neteast.rmp.rpc.serializer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.NoSuchElementException;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import com.neteast.rmp.rpc.serializer.impl.ArraySerializer;
import com.neteast.rmp.rpc.serializer.impl.BeanSerializer;
import com.neteast.rmp.rpc.serializer.impl.BooleanSerializer;
import com.neteast.rmp.rpc.serializer.impl.DateSerializer;
import com.neteast.rmp.rpc.serializer.impl.DictionarySerializer;
import com.neteast.rmp.rpc.serializer.impl.ListSerializer;
import com.neteast.rmp.rpc.serializer.impl.MapSerializer;
import com.neteast.rmp.rpc.serializer.impl.NumberSerializer;
import com.neteast.rmp.rpc.serializer.impl.PrimitiveSerializer;
import com.neteast.rmp.rpc.serializer.impl.RawJSONArraySerializer;
import com.neteast.rmp.rpc.serializer.impl.RawJSONObjectSerializer;
import com.neteast.rmp.rpc.serializer.impl.SetSerializer;
import com.neteast.rmp.rpc.serializer.impl.StringSerializer;

public class JSONSerializer {

	/**
	 * Key: Serializer
	 */
	private HashSet serializerSet = new HashSet();

	/**
	 * key: Class, value: Serializer
	 */
	private transient HashMap serializableMap = null;

	/**
	 * List for reverse registration order search
	 */
	private ArrayList serializerList = new ArrayList();

	public static final Object CIRC_REF_OR_DUPLICATE = new Object();

	//注册常用的序列化器
	public void registerDefaultSerializers() throws Exception {
		registerSerializer(new RawJSONArraySerializer());
		registerSerializer(new RawJSONObjectSerializer());
		registerSerializer(new BeanSerializer());
		registerSerializer(new ArraySerializer());
		registerSerializer(new DictionarySerializer());
		registerSerializer(new MapSerializer());
		registerSerializer(new SetSerializer());
		registerSerializer(new ListSerializer());
		registerSerializer(new DateSerializer());
		registerSerializer(new StringSerializer());
		registerSerializer(new NumberSerializer());
		registerSerializer(new BooleanSerializer());
		registerSerializer(new PrimitiveSerializer());
	}

	/** 
	 * 功能说明:注册序列化器
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-1-6 上午10:54:19<br> 
	 * @param s
	 * @throws Exception 
	 * 		如果多个序列化器对同一个java进行注册，则会报重复注册错误<br> 
	 */ 
	public void registerSerializer(Serializer s) throws Exception {
		Class classes[] = s.getSerializableClasses();
		Serializer exists;
		synchronized (serializerSet) {
			if (serializableMap == null) {
				serializableMap = new HashMap();
			}
			for (int i = 0; i < classes.length; i++) {
				exists = (Serializer) serializableMap.get(classes[i]);
				if (exists != null && exists.getClass() != s.getClass()) {
					throw new Exception(
							"different serializer already registered for "
									+ classes[i].getName());
				}
			}
			if (!serializerSet.contains(s)) {
				s.setOwner(this);
				serializerSet.add(s);
				serializerList.add(0, s);
				for (int j = 0; j < classes.length; j++) {
					serializableMap.put(classes[j], s);
				}
			}
		}
	}
	

	/** 
	 * 功能说明:获取序列化器
	 * 	获取的方式为先通过要转换的java类获取单独为某个java进行转换的序列化器，在没有获取到该序列化器后会根据序列化器的canSerialize方法获取可以为某一类进行
	 * 序列化的序列化器<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-1-6 上午10:51:43<br> 
	 * @param clazz
	 * @param jsoClazz
	 * @return 
	 */ 
	private Serializer getSerializer(Class clazz, Class jsoClazz) {
		synchronized (serializerSet) {
			Serializer s = (Serializer) serializableMap.get(clazz);
			if (s != null && s.canSerialize(clazz, jsoClazz)) {
				return s;
			}
			Iterator i = serializerList.iterator();
			while (i.hasNext()) {
				s = (Serializer) i.next();
				if (s.canSerialize(clazz, jsoClazz)) {
					return s;
				}
			}
		}
		return null;
	}

	//尝试解析json到java对象
	public ObjectMatch tryUnmarshall(Class clazz, Object json)
			throws UnmarshallException {

		if (clazz == null) {
			throw new UnmarshallException("no class hint");
		}
		if (json == null) {
			if (!clazz.isPrimitive()) {
				return ObjectMatch.NULL;
			}

			throw new UnmarshallException("can't assign null primitive");

		}
		Serializer s = getSerializer(clazz, json.getClass());
		if (s != null) {
			return s.tryUnmarshall(clazz, json);
		}

		throw new UnmarshallException("no match");
	}

	//解析json到java对象
	public Object unmarshall(Class clazz, Object json)
			throws UnmarshallException {

		if (clazz != null && json instanceof JSONObject
				&& ((JSONObject) json).has("javaClass")
				&& clazz.isAssignableFrom(getClassFromHint(json))) {
			clazz = getClassFromHint(json);
		}

	    if (clazz == null)
	    {
	      clazz = getClassFromHint(json);
	    }
	    if(json instanceof JSONNull)
	    	return null;
	    			
		if (clazz == null) {
			throw new UnmarshallException("no class hint");
		}

		if (json == null) {
			if (!clazz.isPrimitive()) {
				return null;
			}
		}
		Class jsonClass = json.getClass();
		Serializer s = getSerializer(clazz, jsonClass);
		if (s != null) {
			return s.unmarshall(clazz, json);
		}

		throw new UnmarshallException(
				"no serializer found that can unmarshall "
						+ (jsonClass != null ? jsonClass.getName() : "null")
						+ " to " + clazz.getName());
	}

	//通过json中的javaClass获取要转换的java对象信息
	private Class getClassFromHint(Object o) throws UnmarshallException {
		if (o == null || o  instanceof JSONNull) {
			return null;
		}
		if (o instanceof JSONObject) {
			String className = "(unknown)";
			try {
				className = ((JSONObject) o).getString("javaClass");

				return Class.forName(className);
			} catch (JSONException e) {
				throw new UnmarshallException(
						"not have javaClass in the json: "
								+ ((JSONObject) o).toString(), e);
			} catch(ClassNotFoundException e)
			{
				throw new UnmarshallException(
						"Class specified in javaClass hint not found: "
								+ className, e);
			}
		}
		if (o instanceof JSONArray) {
			JSONArray arr = (JSONArray) o;
			if (arr.size() == 0) {
				throw new UnmarshallException("no type for empty array");
			}
			// return type of first element
			Class compClazz;
			try {
				compClazz = getClassFromHint(arr.get(0));
			} catch (UnmarshallException e) {
				throw (NoSuchElementException) new NoSuchElementException(
						e.getMessage()).initCause(e);
			}
			try {
				if (compClazz.isArray()) {
					return Class.forName("[" + compClazz.getName());
				}
				return Class.forName("[L" + compClazz.getName() + ";");
			} catch (ClassNotFoundException e) {
				throw new UnmarshallException("problem getting array type", e);
			}
		}
		return o.getClass();
	}

	//将对象转换为json对象
	public Object marshall(Object parent, Object java) throws MarshallException {
		 if (java == null)
		    {

		      return JSONObject.fromObject(null);
		    }
		 
		Serializer s = getSerializer(java.getClass(), null);
		if (s != null) {
			return s.marshall(parent, java);
		}
		throw new MarshallException("can't marshall "
				+ java.getClass().getName());
	}
}