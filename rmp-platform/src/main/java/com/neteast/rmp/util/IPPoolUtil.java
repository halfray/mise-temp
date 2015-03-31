package com.neteast.rmp.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class IPPoolUtil {
	public static void main(String[] args) throws IOException {
		// System.out.println(getNetMask("255.255.255.0"));
		// System.out.println(getPoolMax(getNetMask("255.255.255.128")));
		//System.out.println(getEndIP("111.4.114.192", 27).getStartIP());
		//System.out.println(getEndIP("111.4.114.192", 27).getEndIP());
		//System.out.println(getIPInt("58.68.130.0"));
		
		/*
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/BJ_zhilian-0101-100000-1300_source_00.txt","0101,100000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/SH_zhilian-0101-200000-1300_source_00.txt","0101,200000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/GD_zhilian-0101-510000-1300_source_00.txt","0101,510000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/JS_zhilian-0101-210000-1300_source_00.txt","0101,210000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/AH_zhilian-0101-230000-1300_source_00.txt","0101,230000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/HB_zhilian-0101-050000-1300_source_00.txt","0101,050000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/HLJ_zhilian-0101-150000-1300_source_00.txt","0101,150000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/HN_zhilian-0101-450000-1300_source_00.txt","0101,450000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/ZJ_zhilian-0101-310000-1300_source_00.txt","0101,310000,1300,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/FJ_zhilian-0101-350000-1300_source_00.txt","0101,350000,1300,1,2013-09-24");		
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/GD_IDC-0101-510000-1100_source_00.txt","0101,510000,1100,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/GD_Cache-0101-510000-1200_source_00.txt","0101,510000,1200,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/HN_Cache-0101-450000-1200_source_00.txt","0101,450000,1200,1,2013-09-24");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/IP地址池/data/20130924/source/HN_IDC-0101-450000-1100_source_00.txt","0101,450000,1100,1,2013-09-24");
		*/
		
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/AH_CDN-0101-230000-1800_source_00.txt","0101,230000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/BJ_CDN-0101-100000-1800_source_00.txt","0101,100000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/CQ_CDN-0101-400000-1800_source_00.txt","0101,400000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/FJ_CDN-0101-350000-1800_source_00.txt","0101,350000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/GD_CDN-0101-510000-1800_source_00.txt","0101,510000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/GX_CDN-0101-530000-1800_source_00.txt","0101,530000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/HB_CDN-0101-050000-1800_source_00.txt","0101,050000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/HLJ_CDN-0101-150000-1800_source_00.txt","0101,150000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/HN_CDN-0101-410000-1800_source_00.txt","0101,410000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/HN_CDN-0101-450000-1800_source_00.txt","0101,450000,1800,1,2013-10-12");
		processRangeIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/HUB_CDN-0101-430000-1800_source_00.txt","0101,430000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/JL_CDN-0101-130000-1800_source_00.txt","0101,130000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/JS_CDN-0101-210000-1800_source_00.txt","0101,210000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/LN_CDN-0101-110000-1800_source_00.txt","0101,110000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/SC_CDN-0101-610000-1800_source_00.txt","0101,610000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/SH_CDN-0101-200000-1800_source_00.txt","0101,180000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/SX_CDN-0101-030000-1800_source_00.txt","0101,030000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/SX_CDN-0101-710000-1800_source_00.txt","0101,710000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/XJ_CDN-0101-830000-1800_source_00.txt","0101,830000,1800,1,2013-10-12");
		processNetMaskIP("/Users/Canoning/Documents/MyInfo/MyProjectDocs/互联网内容资源管理系统/v2.0-基础数据整理/IP地址池/data/20131012/ZJ_CDN-0101-310000-1800_source_00.txt","0101,310000,1800,1,2013-10-12");
		

	}

	public static void processNetMaskIP(String source_file, String owner_ship)
			throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				new FileInputStream(source_file)));
		String line;
		while ((line = reader.readLine()) != null) {
			String _ip = line.split(",")[0];
			int net_mask = Integer.parseInt(line.split(",")[1]);
			String _start_ip = getEndIP(_ip, net_mask).getStartIP();
			String _end_ip = getEndIP(_ip, net_mask).getEndIP();
			long _start_ip_int = getIPInt(_start_ip);
			long _end_ip_int = getIPInt(_end_ip);
			long netMast = _end_ip_int - _start_ip_int;
			System.out.println(_start_ip + "," + _end_ip + "," + _start_ip_int
					+ "," + _end_ip_int + "," + netMast + "," + owner_ship);
		}
	}
	
	public static void processRangeIP(String source_file, String owner_ship)
			throws IOException {
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				new FileInputStream(source_file)));
		String line;
		while ((line = reader.readLine()) != null) {
			String _start_ip = line.split(",")[0];
			String _end_ip = line.split(",")[1];
			long _start_ip_int = getIPInt(_start_ip);
			long _end_ip_int = getIPInt(_end_ip);
			long netMast = _end_ip_int - _start_ip_int;
			System.out.println(_start_ip + "," + _end_ip + "," + _start_ip_int
					+ "," + _end_ip_int + "," + netMast + "," + owner_ship);
		}
	}	

	public static long getIPInt(String ip) {

		if (ip == null || "".equals(ip.trim())) {
			return -1;
		}

		String[] ip_values = ip.trim().split("\\.");
		if (ip_values.length != 4) {
			return -1;
		}

		long ip_int = 16777216L * Long.parseLong(ip_values[0]) + 65536L
				* Long.parseLong(ip_values[1]) + 256
				* Long.parseLong(ip_values[2]) + Long.parseLong(ip_values[3]);

		return ip_int;
	}

	/**
	 * 根据起始IP地址和子网掩码计算终止IP
	 */
	public static Nets getEndIP(String StartIP, int netmask) {
		return getEndIP(StartIP, getMask(netmask));
	}

	/**
	 * 根据起始IP地址和子网掩码计算终止IP

	public static Nets getEndIP(String StartIP, String netmask) {
		Nets nets = new Nets();
		String[] start = Negation(StartIP, netmask).split("\\.");
		nets.setStartIP(start[0] + "." + start[1] + "." + start[2] + "."
				+ (Integer.valueOf(start[3]) + 1));
		nets.setEndIP(TaskOR(Negation(StartIP, netmask), netmask));
		nets.setNetMask(netmask);
		return nets;
	}
	
	*/
	
	public static Nets getEndIP(String StartIP, String netmask) {
		Nets nets = new Nets();
		String[] start = Negation(StartIP, netmask).split("\\.");
		nets.setStartIP(start[0] + "." + start[1] + "." + start[2] + "."
				+ (Integer.valueOf(start[3])));
		nets.setEndIP(TaskOR(Negation(StartIP, netmask), netmask));
		nets.setNetMask(netmask);
		return nets;
	}

	/**
	 * 根据掩码位计算掩码
	 */
	public static String getMask(int masks) {
		if (masks == 1)
			return "128.0.0.0";
		else if (masks == 2)
			return "192.0.0.0";
		else if (masks == 3)
			return "224.0.0.0";
		else if (masks == 4)
			return "240.0.0.0";
		else if (masks == 5)
			return "248.0.0.0";
		else if (masks == 6)
			return "252.0.0.0";
		else if (masks == 7)
			return "254.0.0.0";
		else if (masks == 8)
			return "255.0.0.0";
		else if (masks == 9)
			return "255.128.0.0";
		else if (masks == 10)
			return "255.192.0.0";
		else if (masks == 11)
			return "255.224.0.0";
		else if (masks == 12)
			return "255.240.0.0";
		else if (masks == 13)
			return "255.248.0.0";
		else if (masks == 14)
			return "255.252.0.0";
		else if (masks == 15)
			return "255.254.0.0";
		else if (masks == 16)
			return "255.255.0.0";
		else if (masks == 17)
			return "255.255.128.0";
		else if (masks == 18)
			return "255.255.192.0";
		else if (masks == 19)
			return "255.255.224.0";
		else if (masks == 20)
			return "255.255.240.0";
		else if (masks == 21)
			return "255.255.248.0";
		else if (masks == 22)
			return "255.255.252.0";
		else if (masks == 23)
			return "255.255.254.0";
		else if (masks == 24)
			return "255.255.255.0";
		else if (masks == 25)
			return "255.255.255.128";
		else if (masks == 26)
			return "255.255.255.192";
		else if (masks == 27)
			return "255.255.255.224";
		else if (masks == 28)
			return "255.255.255.240";
		else if (masks == 29)
			return "255.255.255.248";
		else if (masks == 30)
			return "255.255.255.252";
		else if (masks == 31)
			return "255.255.255.254";
		else if (masks == 32)
			return "255.255.255.255";
		return "";
	}

	/**
	 * temp1根据temp2取反
	 */
	private static String Negation(String StartIP, String netmask) {
		String[] temp1 = StartIP.trim().split("\\.");
		String[] temp2 = netmask.trim().split("\\.");
		int[] rets = new int[4];
		for (int i = 0; i < 4; i++) {
			rets[i] = Integer.parseInt(temp1[i]) & Integer.parseInt(temp2[i]);
		}
		return rets[0] + "." + rets[1] + "." + rets[2] + "." + rets[3];
	}

	/**
	 * temp1根据temp2取或

	private static String TaskOR(String StartIP, String netmask) {
		String[] temp1 = StartIP.trim().split("\\.");
		String[] temp2 = netmask.trim().split("\\.");
		int[] rets = new int[4];
		for (int i = 0; i < 4; i++) {
			rets[i] = 255 - (Integer.parseInt(temp1[i]) ^ Integer
					.parseInt(temp2[i]));
		}
		return rets[0] + "." + rets[1] + "." + rets[2] + "." + (rets[3]-1);
	}
	
	*/
	
	private static String TaskOR(String StartIP, String netmask) {
		String[] temp1 = StartIP.trim().split("\\.");
		String[] temp2 = netmask.trim().split("\\.");
		int[] rets = new int[4];
		for (int i = 0; i < 4; i++) {
			rets[i] = 255 - (Integer.parseInt(temp1[i]) ^ Integer
					.parseInt(temp2[i]));
		}
		return rets[0] + "." + rets[1] + "." + rets[2] + "." + (rets[3]);
	}	
	
	/**
	 * 计算子网大小
	 */
	public static int getPoolMax(int netmask) {
		if (netmask <= 0 || netmask >= 32) {
			return 0;
		}
		int bits = 32 - netmask;
		return (int) Math.pow(2, bits) - 2;
	}

	/**
	 * 转换为验码位数
	 */
	public static int getNetMask(String netmarks) {
		StringBuffer sbf;
		String str;
		int inetmask = 0, count = 0;
		String[] ipList = netmarks.split("\\.");
		for (int n = 0; n < ipList.length; n++) {
			sbf = toBin(Integer.parseInt(ipList[n]));
			str = sbf.reverse().toString();
			count = 0;
			for (int i = 0; i < str.length(); i++) {
				i = str.indexOf('1', i);
				if (i == -1) {
					break;
				}
				count++;
			}
			inetmask += count;
		}
		return inetmask;
	}

	private static StringBuffer toBin(int x) {
		StringBuffer result = new StringBuffer();
		result.append(x % 2);
		x /= 2;
		while (x > 0) {
			result.append(x % 2);
			x /= 2;
		}
		return result;
	}
	
	public static class Nets {
		private String StartIP;
		private String EndIP;
		private String NetMask;

		public String getStartIP() {
			return StartIP;
		}

		public void setStartIP(String startIP) {
			StartIP = startIP;
		}

		public String getEndIP() {
			return EndIP;
		}

		public void setEndIP(String endIP) {
			EndIP = endIP;
		}

		public String getNetMask() {
			return NetMask;
		}

		public void setNetMask(String netMask) {
			NetMask = netMask;
		}
	}
}


