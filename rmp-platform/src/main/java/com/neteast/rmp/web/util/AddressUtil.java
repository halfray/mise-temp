package com.neteast.rmp.web.util;

import java.io.StringWriter;
import java.util.regex.Pattern;

public class AddressUtil {
	public static String ipmatch = "(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])";
	public static String domainmatch = "([\\w-]+\\.)+((com)|(net)|(org)|(gov\\.cn)|(info)|(cc)|(com\\.cn)|(net\\.cn)|(org\\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\\.tw)|(hk)|(com\\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\\.uk)|(org\\.uk)|(ltd\\.uk)|(plc\\.uk)|(in)|(eu)|(it)|(jp))";
	public static Pattern ipPattern=  Pattern.compile(ipmatch,Pattern.CASE_INSENSITIVE);
	public static Pattern domainPattern=  Pattern.compile(domainmatch,Pattern.CASE_INSENSITIVE);
	public static Pattern mailPattern=  Pattern.compile("[\\w\\.\\-]+@([\\w\\-]+\\.)+[\\w\\-]+",Pattern.CASE_INSENSITIVE);
	
	public static boolean match(String url,Pattern pattern)
	{
		return pattern.matcher(url).matches();
	}
	
	//是否是IP格式
	public static boolean isIp(String url)
	{
		return match(url,ipPattern);
	}
	//是否域名格式
	public static boolean isDomain(String url)
	{
		return match(url,domainPattern);
	}
	//是否mail格式
	public static boolean isMail(String url)
	{
		return match(url,mailPattern);
	}
	
	private static byte pos []= new byte []{(byte)128,64,32,16,8,4,2,1};
	public static String getMask(String startIP,String endIP){
        byte start [] = getAddress(startIP);
        byte end   [] = getAddress(endIP);
        byte mask  [] = new byte [start.length];
        boolean flag=false;
        for(int i=0;i<start.length;i++){
            mask[i]=(byte)~(start[i]^end[i]);
            if(flag)mask[i]=0;
            if(mask[i]!=-1){
                mask[i]=getMask(mask[i]);
                flag=true;
            }
        }
        return toString(mask);
    }
	private static byte getMask(byte b) {
        if(b==0)return b;
        byte p = pos[0];
        for(int i=0;i<8;i++){
            if((b&pos[i])==0)break;
            p=(byte)(p>>1);
        }
        p=(byte)(p<<1);
        return (byte)(b&p);
    }
	public static String toString(byte[] address) {
        StringWriter sw = new StringWriter(16);
        sw.write(Integer.toString(address[0]&0xFF));
        for(int i=1;i<address.length;i++){
            sw.write(".");sw.write(Integer.toString(address[i]&0xFF));
        }
        return sw.toString();
    }
	private static byte[] getAddress(String address) {
        String subStr [] = address.split("\\.");
        if(subStr.length!=4)throw new IllegalArgumentException("所传入的IP地址不符合IPv4的规范");
        byte b [] = new byte [4];
        for(int i=0;i<b.length;i++)b [i]=(byte)Integer.parseInt(subStr[i]);
        return b;
    }
	public static void main(String[] args) {
		System.out.println(AddressUtil.getMask("192.168.3.1", "192.168.3.15"));
	}
}