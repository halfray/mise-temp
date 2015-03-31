package com.neteast.rmp.util;

public class SystemUtil {
	/** 
	 * 功能说明:判定当前系统是否是WINDOW系统<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-6 上午10:33:14<br> 
	 * @return 
	 */ 
	public static boolean isWindowsSystem()
	{
		String os = System.getProperty("os.name");
		if(os.toLowerCase().indexOf("window")!=-1)
			return true;
		return false;
	}
	/** 
	 * 功能说明:判定当前系统是否是Linux系统<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-6 上午10:33:27<br> 
	 * @return 
	 */ 
	public static boolean isLinuxSystem()
	{
		String os = System.getProperty("os.name");
		if(os.toLowerCase().indexOf("linux")!=-1)
			return true;
		return false;
	}
}
