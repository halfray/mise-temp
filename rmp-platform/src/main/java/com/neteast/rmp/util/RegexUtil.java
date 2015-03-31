package com.neteast.rmp.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexUtil {
	/** 
	 * 功能说明: 获得第一匹配到的数据<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-4-25 下午5:20:58<br> 
	 * @param context
	 * @param regex 
	 */ 
	public static String getOnceMatch(String content,String regex)
	{
		String result = "";
		 Pattern pattern = Pattern.compile(regex);
		 Matcher matcher =  pattern.matcher(content);
		 if(matcher.find())
		 {
			 result = matcher.group();
		 }
		 return result;
	}
	
	/** 
	 * 功能说明:获取第一次匹配的数据中的某个组<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-4-25 下午5:34:31<br> 
	 * @param content
	 * @param regex
	 * @param group
	 * @return 
	 */ 
	public static String getOnceMatchGroup(String content,String regex,int group)
	{
		String result = "";
		 Pattern pattern = Pattern.compile(regex);
		 Matcher matcher =  pattern.matcher(content);
		 if(matcher.find())
		 {
			 result = matcher.group(group);
		 }
		 return result;
	}
	
	public static void main(String[] args) {
		String content = "abcdefgabcdsef";
		System.out.println(getOnceMatchGroup(content,"ab(.*?)f",1));
	}
}
