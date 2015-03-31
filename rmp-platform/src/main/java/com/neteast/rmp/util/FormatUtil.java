package com.neteast.rmp.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Formatter;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class FormatUtil {
	private static final String formatSpecifier = "%(\\d+\\$)?([-#+ 0,(\\<]*)?(\\d+)?(\\.\\d+)?([tT])?([a-zA-Z%])";

	private static Pattern fsPattern = Pattern.compile(formatSpecifier);

	/**
	 *用于格式化时一个汉字占用两个字节
	 */
	public static void notUnicodeFormat(Formatter format, String template,
			Object[] object) {
		StringBuffer sbuf = new StringBuffer();
		Matcher m = fsPattern.matcher(template);
		int count = 0;
		while (m.find()) {
			String begin = m.group(0);
			String isIndex = m.group(1);

			object[count] = toChange(object[count]);

			String g = m.group(3); // 长度
			if (g != null) {
				int i = Integer.parseInt(g);
				int wipe = lengthOfQuanJiao(object[count].toString())
						- object[count].toString().length();
				if (object[count].toString().length() != lengthOfQuanJiao(object[count]
						.toString())) {
					int result = 0;
					if (i < lengthOfQuanJiao(object[count].toString())) {
						object[count] = new String(object[count].toString()
								.getBytes(), 0, i);
						result = object[count].toString().length();
					} else
						result = i - wipe;
					if (result == 0)
						begin = begin.replaceAll(g, String.valueOf(""));
					else
						begin = begin.replaceAll(g, String.valueOf(result));
				}
			}
			m.appendReplacement(sbuf, filterDollarStr(begin));
			if (isIndex == null)
				count++;
		}
		m.appendTail(sbuf);
		format.format(sbuf.toString(), object);
	}

	/**
	 * replaceAll(regex, replacement)函数 ,
	 * 由于第一个参数支持正则表达式，replacement中出现“$”,会按照$1$2的分组
	 * 模式进行匹配，当编译器发现“$”后跟的不是整数的时候，就会抛出“非法的组引用”的异常:Illegal group reference
	 * 因此需要把替换的字符串转为\\$
	 */
	public static String filterDollarStr(String str) {
		String sReturn = "";
		if (!str.trim().equals("")) {
			if (str.indexOf('$', 0) > -1) {
				while (str.length() > 0) {
					if (str.indexOf('$', 0) > -1) {
						sReturn += str.subSequence(0, str.indexOf('$', 0));
						sReturn += "\\$";
						str = str.substring(str.indexOf('$', 0) + 1, str
								.length());
					} else {
						sReturn += str;
						str = "";
					}
				}
			} else {
				sReturn = str;
			}
		}
		return sReturn;
	}

	/**
	 *对数据信息进行转换 1 将日期类型进行格式化 2 待定..
	 */
	public static String toChange(Object obj) {
		String result = null;

		if (obj instanceof Date) {
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
			result = format.format(obj);
		} else
			return obj.toString();
		return result;
	}

	// 获取字符串的全角字符长度
	public static int lengthOfQuanJiao(String value) {
		if (value == null)
			return 0;

		StringBuffer buff = new StringBuffer(value);
		int length = 0;
		String stmp;
		for (int i = 0; i < buff.length(); i++) {
			stmp = buff.substring(i, i + 1);

			try {
				stmp = new String(stmp.getBytes("utf8"));
			} catch (Exception e) {

			}

			if (stmp.getBytes().length > 1) {
				length += 2;
			} else {
				length += 1;
			}
		}
		return length;
	}
}