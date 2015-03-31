package com.neteast.rmp.web.util;

import java.util.List;

public class ListUtil {
	public static String join(List list ,String split)
	{
		StringBuffer sb = new StringBuffer();
		for(Object o : list)
		{
			sb.append(o.toString()).append(split);
		}
		sb.delete(sb.length()-1, sb.length());
		return sb.toString();
	}
}
