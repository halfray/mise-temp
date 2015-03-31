package com.neteast.rmp.service.reportproxy;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 类说明: MD5加密<br> 
 * 创建时间: 2012-12-7 下午9:44:40<br> 
 * @author 王宁<br> 
 * @email wangning@neteast.com<br>
 */
public class EncryptUtil {

	/**
	 * 功能说明: 获取MD5加密内容<br> 
	 * 创建者: 王宁<br> 
	 * 创建时间: 2012-12-7 下午9:45:03<br> 
	 * @param content
	 * @return
	 */
	public static String getKeyedDigest(String content) {
		MessageDigest md;
		byte[] b = null;
		try {
			md = MessageDigest.getInstance("MD5");
			b = md.digest(content.getBytes("UTF-8"));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return byteToHexString(b);
	}

	private static String byteToHexString(byte[] tmp) {
		String s;
		char str[] = new char[16 * 2];
		int k = 0;
		for (int i = 0; i < 16; i++) {
			byte byte0 = tmp[i];
			str[k++] = hexDigits[byte0 >>> 4 & 0xf];
			str[k++] = hexDigits[byte0 & 0xf];
		}
		s = new String(str);
		return s;
	}
	
	private static char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7',
		'8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

}
