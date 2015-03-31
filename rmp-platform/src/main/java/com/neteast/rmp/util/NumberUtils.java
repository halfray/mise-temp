package com.neteast.rmp.util;

import java.math.BigDecimal;

public class NumberUtils extends org.apache.commons.lang.math.NumberUtils {
    public static Integer createInteger(BigDecimal bd)
    {
    	if(bd==null)
    		return null;
    	return new Integer (bd.intValue());
    }
	
    public static Integer createInteger(java.math.BigInteger bi)
    {
    	if(bi==null)
    		return null;
    	return new Integer (bi.intValue());
    }
	
    public static Integer createInteger(java.lang.Long l)
    {
    	if(l==null)
    		return null;
    	return new Integer (l.intValue());
    }
	
    public static Integer createInteger(java.lang.Number n)
    {
    	if(n==null)
    		return null;
    	return new Integer (n.intValue());
    }
	
    public static Integer createInteger(Object o)
    {
    	if(o==null)
    		return null;
    	if(o instanceof Number)
    		return createInteger((Number) o);
    	
    	return createInteger(o.toString());
    }
	
    public static Long createLong(BigDecimal bd)
    {
    	if(bd==null)
    		return null;
    	return new Long (bd.longValue());
    }
	
    public static Long createLong(java.math.BigInteger bi)
    {
    	if(bi==null)
    		return null;
    	return new Long (bi.longValue());
    }
	
    public static Long createLong(java.lang.Number n)
    {
    	if(n==null)
    		return null;
    	return new Long (n.longValue());
    }
	
    public static Long createLong(Object o)
    {
    	if(o==null)
    		return null;
    	if(o instanceof Number)
    		return createLong((Number) o);
    	
    	return createLong(o.toString());
    }
	

}
