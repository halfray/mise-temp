package com.neteast.rmp.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class commonUtil {
	
	/**
	 * 生成11位数字型随机数
	 */
	public static Long generateID(){
		java.util.Random random=new java.util.Random();
		
		while(true){
			Long result=new Long(random.nextLong());
			String str=result.toString();
			if(str.length()>=16){
				str=str.substring(1, 12);
				return Long.parseLong(str);
			}
		}
	}
	
	/**
	 * ip 地址转成整型地址
	 */
	public static String ipToLong(String ip) {
		String [] ips = ip.split("\\.");
		long ipvalue =0;
		for ( int n = 0; n < ips.length; n++) {
			long tmp=Integer.parseInt(ips[n]);
			ipvalue += (tmp*Math.pow(256,3 - n));
		}
		return ipvalue+"";
	}
	
	/**
	 * ip 整型地址转成具体ip地址
	 */
	public static String longToIP(long ipaddress) { 
        StringBuffer sb = new StringBuffer(""); 
        //直接右移24位 
        sb.append(String.valueOf((ipaddress >>> 24))); 
        sb.append("."); 
        //将高8位置0，然后右移16位 
        sb.append(String.valueOf((ipaddress & 0x00FFFFFF) >>> 16)); 
        sb.append("."); 
        //将高16位置0，然后右移8位 
        sb.append(String.valueOf((ipaddress & 0x0000FFFF) >>> 8)); 
        sb.append("."); 
        //将高24位置0 
        sb.append(String.valueOf((ipaddress & 0x000000FF))); 
        return sb.toString(); 
    }
	/**
	 * ip 地址格式准确性校验
	 */
	public static boolean checkIp(String ip){
		Pattern pattern = Pattern.compile("\\b((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\.((?!\\d\\d\\d)\\d+|1\\d\\d|2[0-4]\\d|25[0-5])\\b");
        Matcher isNum = pattern.matcher(ip);
        if( !isNum.matches() )
        {
              return false;
        }
        return true;
	}
	/**
	 * 子网掩码 格式准确性校验
	 */
	public static boolean checkIpMask(String ipMask){
		Pattern pattern = Pattern.compile("[1-3][0-9]");
        Matcher isNum = pattern.matcher(ipMask);
        if( !isNum.matches() )
        {
              return false;
        }
        return true;
	}

}
