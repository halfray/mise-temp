package com.neteast.rmp.util;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;


public class TypeUtil {
	/**
	 * 将对象的toString 方法得到的string类型对象转为特定类型对象
	 * @param obj	待转对象
	 * @param clas	转换后的类型
	 * @return		转换后的对象
	 * @throws Exception
	 */
	public static Object changeType(Object obj,Class clas) throws Exception  
	{
		if(obj.toString().equals(""))return null;
		for(TypeCast cast : TypeCast.values())
		{
			Object result = cast.cast(obj.toString(), clas);
			if(result!=null) return result;
		}
		return obj;
	}
}

/**    
 *   类转换处理枚举,每个枚举值代表一种处理方法,如果方法有缺失,动态添加即可
 *    
 */
enum TypeCast
{
	STRINGCAST		//string 转型
	{
		@Override
		public String cast(String obj,Class clas)
		{
			if(clas.equals(String.class))
				return obj.toString();
			else 
				return null;
		}
	},
	BYTECAST		//byte转型
	{
		@Override
		public Byte cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(byte.class) || clas.equals(Byte.class))
				return NumberFormat.getInstance().parse(obj).byteValue();
			else 
				return null;
		}
	},
	INTCAST{		//int 转型
		@Override
		public Integer cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(int.class) || clas.equals(Integer.class))
				return NumberFormat.getInstance().parse(obj).intValue();
			else 
				return null;
		}
	},
	SHORTCAST		//short 转型
	{
		@Override
		public Short cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(short.class) || clas.equals(Short.class))
				return NumberFormat.getInstance().parse(obj).shortValue();
			else 
				return null;
		}
	},
	LONGCAST		//long转型
	{
		@Override
		public Long cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(long.class) || clas.equals(Long.class))
				return NumberFormat.getInstance().parse(obj).longValue();
			else 
				return null;
		}
	},
	FLOATCAST		//float转型
	{
		@Override
		public Float cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(float.class) || clas.equals(Float.class))
				return NumberFormat.getInstance().parse(obj).floatValue();
			else 
				return null;
		}
	},
	DOUBLECAST		//double转型
	{
		@Override
		public Double cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(double.class) || clas.equals(Double.class))
				return NumberFormat.getInstance().parse(obj).doubleValue();
			else 
				return null;
		}
	},
	CHARCAST		//char转型
	{
		@Override
		public Character cast(String obj,Class clas)
		{
			if(clas.equals(char.class) || clas.equals(Character.class))
				return obj.toString().charAt(0);
			else 
				return null;
		}
	},
	BIGDECIMALCAST	//BigDecimal转型
	{
		@Override
		public BigDecimal cast(String obj,Class clas)
		{
			if(clas.equals(BigDecimal.class))
				return BigDecimal.valueOf(Double.parseDouble(obj.toString()));
			else 
				return null;
		}
	},
	BOOLEANCAST	//boolean转型
	{
		@Override
		public Boolean cast(String obj,Class clas)
		{
			if(clas.equals(boolean.class) || clas.equals(Boolean.class) )
				return Boolean.parseBoolean(obj.toString());
			else 
				return null;
		}
	},
	DATECAST	//date转型
	{
		@Override
		public Date cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(Date.class))
				return DateFormat.getDateInstance().parse(obj);
			else 
				return null;
		}
	},
	CALENDARCAST	//canlendar转型
	{
		@Override
		public Calendar cast(String obj,Class clas) throws ParseException
		{
			if(clas.equals(Calendar.class))
			{
				Calendar canlendar =  Calendar.getInstance();
				canlendar.setTime(DateFormat.getDateInstance().parse(obj));
				return canlendar;
			}
			else 
				return null;
		}
	}
	;
	public abstract Object cast(String obj,Class clas) throws Exception;		//类型转换抽象处理方法
}