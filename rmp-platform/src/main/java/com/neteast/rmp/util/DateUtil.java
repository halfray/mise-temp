package com.neteast.rmp.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;


/**
 * 日期处理工具类
 * 
 * @since 1.6
 */
public class DateUtil {
	private static final Collection DEFAULT_PATTERNS = Arrays
			.asList(new String[] { "yyyy-MM-dd HH:mm:ss","yyyyMMdd HH:mm:ss","yyyy-MM-dd","yyyyMMdd","EEE MMM d HH:mm:ss yyyy",
					"EEEE, dd-MMM-yy HH:mm:ss zzz",
					"EEE, dd MMM yyyy HH:mm:ss zzz" });

	public static DateUtil getInstance() {
		return new DateUtil();
	}

	/**
	 * 返回两个日期的天数差
	 * <p>
	 * 返回-1表示计算出错,一般为输入的日期串格式不正确,正确格式:yyyy-MM-dd
	 * 
	 * @throws Exception
	 */
	public static int getDiffDay(String begindate, String enddate)
			throws Exception {
		return getInstance().calFactualDate(begindate, enddate) + 1;
	}

	public static String getTime() {
		// Calendar calendar = Calendar.getInstance();
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(new java.util.Date());

		StringBuffer sb = new StringBuffer();
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int minute = calendar.get(Calendar.MINUTE);
		int second = calendar.get(Calendar.SECOND);

		if (hour < 10) {
			sb.append("0").append(hour);
		} else {
			sb.append(hour);
		}
		sb.append(":");

		if (minute < 10) {
			sb.append("0").append(minute);
		} else {
			sb.append(minute);
		}
		sb.append(":");

		if (second < 10) {
			sb.append("0").append(second);
		} else {
			sb.append(second);
		}

		return sb.toString();
	}

	public static String getDateTime() {
		// Calendar calendar = Calendar.getInstance();
		Calendar calendar = new GregorianCalendar();
		java.util.Date date = new java.util.Date();
		calendar.setTime(date);
		String sHour = null;
		String sMinute = null;
		String sSecond = null;
		String sYear = null;
		String sMonth = null;
		String sDay = null;
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		int day = calendar.get(Calendar.DATE);
		int hour = calendar.get(Calendar.HOUR_OF_DAY);
		int minute = calendar.get(Calendar.MINUTE);
		int second = calendar.get(Calendar.SECOND);
		int milliSecond = calendar.get(Calendar.MILLISECOND);

		sYear = String.valueOf(year);
		if (month < 10) {
			sMonth = "0" + month;
		} else
			sMonth = String.valueOf(month);
		if (day < 10) {
			sDay = "0" + day;
		} else
			sDay = String.valueOf(day);

		if (hour < 10) {
			sHour = "0" + hour;
		} else {
			sHour = String.valueOf(hour);
		}

		if (minute < 10) {
			sMinute = "0" + minute;
		} else {
			sMinute = String.valueOf(minute);
		}

		if (second < 10) {
			sSecond = "0" + second;
		} else {
			sSecond = String.valueOf(second);
		}

		return sYear + "-" + sMonth + "-" + sDay + " " + sHour + ":" + sMinute
				+ ":" + sSecond;
	}

	public static String getDate() {
		// Calendar calendar = Calendar.getInstance();
		Calendar calendar = new GregorianCalendar();
		java.util.Date date = new java.util.Date();
		calendar.setTime(date);

		String separator = "-";
		int month = calendar.get(Calendar.MONTH) + 1;
		int day = calendar.get(Calendar.DATE);

		StringBuffer sdate = new StringBuffer();
		sdate.append(calendar.get(Calendar.YEAR)).append(separator);

		if (month < 10) {
			sdate.append("0").append(calendar.get(Calendar.MONTH) + 1)
					.append(separator);
		} else
			sdate.append(calendar.get(Calendar.MONTH) + 1).append(separator);
		if (day < 10) {
			sdate.append("0").append(calendar.get(Calendar.DATE));
		} else
			sdate.append(calendar.get(Calendar.DATE));
		return sdate.toString();
	}

	/**
	 * 功能：判断输入年份是否为闰年<br>
	 * 
	 * @param year
	 * @return 是：true 否：false
	 * @author pure
	 */
	public static boolean leapYear(int year) {
		boolean leap;
		if (year % 4 == 0) {
			if (year % 100 == 0) {
				if (year % 400 == 0)
					leap = true;
				else
					leap = false;
			} else
				leap = true;
		} else
			leap = false;
		return leap;
	}

	private int year1, year2, month1, month2, day1, day2, tmp;

	/**
	 * 日期校验方法，这个方法主要判断日期的合法性。按照综合业务系统规定从前台传入的日期格式应该为yyyy-mm-dd。
	 * 
	 * @param date1
	 *            String型变量。格式为yyyy-mm-dd。
	 * 
	 * @return 返回布尔型结果以表明日期是否合法。
	 * 
	 * @exception Exception
	 *                抛出的为Exception (日期格式错误)
	 * 
	 */
	public boolean checkDate(String date1) throws Exception {
		if (date1.length() != 10)
			throw new Exception("日期格式错误"); // 日期格式错误
		String tmpDate = conversionDateLength(date1);
		for (int i = 0; i < tmpDate.length(); i++)
			if (!Character.isDigit(tmpDate.charAt(i)))
				throw new Exception("日期格式错误"); // 日期格式错误
		conversionDate(date1);
		if (month1 < 1 || month1 > 12)
			throw new Exception("日期格式错误"); // 日期格式错误
		if (day1 < 1 || day1 > 31)
			throw new Exception("日期格式错误"); // 日期格式错误
		if ((month1 == 4 || month1 == 6 || month1 == 9 || month1 == 11)
				&& day1 > 30)
			throw new Exception("日期格式错误"); // 日期格式错误
		if (month1 == 2 && day1 > 29)
			throw new Exception("日期格式错误"); // 日期格式错误
		if (month1 == 2 && day1 > 28) {
			if (!(((year1 % 4) == 0) && ((year1 % 100) != 0))
					|| ((year1 % 400) == 0))
				throw new Exception("日期格式错误"); // 日期格式错误
		}

		return true;
	}

	/**
	 * 按照传入日期和天数计算到期日。例：传入的日期为2000-02-28传入的天数为20，此组件将计算出到期的日期为：2000-03-19。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 * 
	 * @param days
	 *            <p>
	 *            变量类型：int
	 *            </p>
	 *            <p>
	 *            输入用来计算到日期的天数
	 *            </p>
	 * 
	 * @return <p>
	 *         变量类型：String
	 *         </p>
	 *         <p>
	 *         变量长度：10位
	 *         </p>
	 *         <p>
	 *         返回经过计算后的到期日
	 *         </p>
	 */
	public String calMaturityByDay(String date1, int days) {
		String y, m, d;
		conversionDate(date1);
		Calendar nowTime = Calendar.getInstance();
		nowTime.set(year1, month1 - 1, day1);
		nowTime.set(Calendar.DAY_OF_YEAR, nowTime.get(Calendar.DAY_OF_YEAR)
				+ days);
		y = String.valueOf(nowTime.get(Calendar.YEAR));
		m = String.valueOf(nowTime.get(Calendar.MONTH) + 1);
		d = String.valueOf(nowTime.get(Calendar.DAY_OF_MONTH));
		if (m.length() == 1)
			m = "0" + m;
		if (d.length() == 1)
			d = "0" + d;
		// String tmpDate2=y+m+d;
		String tmpDate2 = y + "-" + m + "-" + d;
		return tmpDate2;

	}

	/**
	 * 
	 * 按照传入日期和天数计算到期日。例：传入的日期为2000-02-28传入的天数为20，此组件将计算出到期的日期为：2000-03-19。
	 * 此方法为重载方法，输入的天数为String类型。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 * 
	 * @param days
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            输入用来计算到日期的天数
	 *            </p>
	 * 
	 * @return <p>
	 *         变量类型：String
	 *         </p>
	 *         <p>
	 *         变量长度：10位
	 *         </p>
	 *         <p>
	 *         返回经过计算后的到期日
	 *         </p>
	 */
	public String calMaturityByDay(String date1, String days) {
		String y, m, d;

		conversionDate(date1);
		Calendar nowTime = Calendar.getInstance();
		nowTime.set(year1, month1 - 1, day1);
		nowTime.set(Calendar.DAY_OF_YEAR, nowTime.get(Calendar.DAY_OF_YEAR)
				+ Integer.parseInt(days));
		y = String.valueOf(nowTime.get(Calendar.YEAR));
		m = String.valueOf(nowTime.get(Calendar.MONTH) + 1);
		d = String.valueOf(nowTime.get(Calendar.DAY_OF_MONTH));
		if (m.length() == 1)
			m = "0" + m;
		if (d.length() == 1)
			d = "0" + d;
		// String tmpDate2=y+m+d;
		String tmpDate2 = y + "-" + m + "-" + d;
		return tmpDate2;
	}

	/**
	 * 金融天数的计算：金融天数是指每个月按30天计算，一年为360天。非润年2月如果没有跨月按28天；润年2月如果没有跨月按29天计算。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 * 
	 * @param date2
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 * 
	 * @return 变量类型：int 变量为两个输入日期的金融天数差。
	 */
	public int calFinancialDate(String date1, String date2) throws Exception {
		conversionDate(date1, date2);
		int result = financeCal();
		return result;
	}

	/**
	 * 实际天数的计算：实际天数是指按照实际当中两个日期之间的天数计算。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 *            <p>
	 *            注意：两个日期中相对小的在此输入
	 *            </p>
	 * 
	 * @param date2
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 *            <p>
	 *            注意：两个日期中相对大的在此输入
	 *            </p>
	 * 
	 * @return 变量类型：int 变量为两个输入日期的实际天数差。例:2006-01-01,2006-01-03 返回2
	 */
	public int calFactualDate(String date1, String date2) throws Exception {
		conversionDate(date1, date2);
		// int result=factCal() ;
		// return result;

		int elapsed = 0;/* 记录天数 */
		GregorianCalendar g1, gc1, gc2, g2;/* 声明变量比较变量 */
		g1 = new GregorianCalendar(year1, month1 - 1, day1);
		g2 = new GregorianCalendar(year2, month2 - 1, day2);
		// long g=(g2.getTime().getTime()-g1.getTime().getTime())/1000*60*60*24;
		// return (int)g;
		if (g2.after(g1)) {/* 比较时间先后 */
			gc2 = (GregorianCalendar) g2.clone();/* 复制并给变量负值 */
			gc1 = (GregorianCalendar) g1.clone();/* 复制并给变量负值 */

		} else {
			gc2 = (GregorianCalendar) g1.clone();/* 复制并给变量负值 */
			gc1 = (GregorianCalendar) g2.clone();/* 复制并给变量负值 */
			// throw new Exception("后面日期要大于前面日期");
		}

		gc1.clear(Calendar.MILLISECOND);/* 除去MILLISECOND */
		gc1.clear(Calendar.SECOND);/* 除去SECOND */
		gc1.clear(Calendar.MINUTE);/* 除去MINUTE */
		gc1.clear(Calendar.HOUR_OF_DAY);/* 除去HOUR_OF_DAY */

		gc2.clear(Calendar.MILLISECOND);/* 除去MILLISECOND */
		gc2.clear(Calendar.SECOND);/* 除去SECOND */
		gc2.clear(Calendar.MINUTE);/* 除去MINUTE */
		gc2.clear(Calendar.HOUR_OF_DAY);/* 除去HOUR_OF_DAY */
		// System.out.println("start:="+System.currentTimeMillis());
		while (gc1.before(gc2)) {/* 循环让天数加一 */
			gc1.add(Calendar.DATE, 1);
			elapsed++;
		}
		// System.out.println("end:="+System.currentTimeMillis());
		return elapsed;/* 的到循环的天数 */
	}

	/**
	 * 此方法为计算两个日期之间相差的月份，不足一个月的按0个月计算。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 *            <p>
	 *            注意：两个日期中相对小的在此输入
	 *            </p>
	 * 
	 * @param date2
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 *            <p>
	 *            注意：两个日期中相对大的在此输入
	 *            </p>
	 * 
	 * @return 按照传入日期计算两个日期之间相差的月份返回int型变量。
	 */
	public int calMonth(String date1, String date2) throws Exception {
		conversionDate(date1, date2);
		// int result=monthCal();
		// return result;
		int elapsed = 0;/* 记录天数 */
		GregorianCalendar g1, gc1, gc2, g2;/* 声明变量比较变量 */
		g1 = new GregorianCalendar(year1, month1 - 1, day1);
		g2 = new GregorianCalendar(year2, month2 - 1, day2);
		if (g2.after(g1)) {/* 比较时间先后 */
			// System.out.println("right");
			gc2 = (GregorianCalendar) g2.clone();/* 复制并给变量负值 */
			gc1 = (GregorianCalendar) g1.clone();/* 复制并给变量负值 */

		} else {
			gc2 = (GregorianCalendar) g1.clone();/* 复制并给变量负值 */
			gc1 = (GregorianCalendar) g2.clone();/* 复制并给变量负值 */
			// throw new Exception("后面日期要大于前面日期");
		}

		gc1.clear(Calendar.MILLISECOND);
		gc1.clear(Calendar.SECOND);
		gc1.clear(Calendar.MINUTE);
		gc1.clear(Calendar.HOUR_OF_DAY);
		gc1.clear(Calendar.DATE);

		gc2.clear(Calendar.MILLISECOND);
		gc2.clear(Calendar.SECOND);
		gc2.clear(Calendar.MINUTE);
		gc2.clear(Calendar.HOUR_OF_DAY);
		gc2.clear(Calendar.DATE);

		while (gc1.before(gc2)) {
			gc1.add(Calendar.MONTH, 1);
			elapsed++;
		}
		return elapsed;

	}

	/**
	 * 
	 * 日期长度转换的方法，用于10位与8位日期长度的互换。如：日期为2002-10-01将返回20021001将“-”去掉。
	 * 反之如输入日期为20021001将返回2002-10-01。
	 * 
	 * @param dateParameter
	 *            需要转换长度的日期，String型变量。
	 * 
	 * @return 返回转换后的日期，String型变量。
	 * 
	 */
	public String conversionDateLength(String dateParameter) throws Exception {
		String tmpDateParameter;
		String tmpYear;
		String tmpMonth;
		String tmpDay;
		tmpDateParameter = dateParameter;
		if ((tmpDateParameter.length() != 10)
				&& (tmpDateParameter.length() != 8)) {
			throw new Exception("日期格式错误"); // 日期格式错误
		}
		if (tmpDateParameter.length() == 10) {
			tmpYear = tmpDateParameter.substring(0, 4);
			tmpMonth = tmpDateParameter.substring(5, 7);
			tmpDay = tmpDateParameter.substring(8);
			tmpDateParameter = tmpYear + tmpMonth + tmpDay;
		} else {
			tmpYear = tmpDateParameter.substring(0, 4);
			tmpMonth = tmpDateParameter.substring(4, 6);
			tmpDay = tmpDateParameter.substring(6);
			tmpDateParameter = tmpYear + "-" + tmpMonth + "-" + tmpDay;
		}
		return tmpDateParameter;
	}

	/**
	 * 按照传入日期和月份计算到期日。例：传入的日期为2000-02-29传入的月份为12，此组件将计算出到期的日期为：2001-02-28。
	 * 
	 * @param date1
	 *            <p>
	 *            变量类型：String
	 *            </p>
	 *            <p>
	 *            变量长度：10位
	 *            </p>
	 *            <p>
	 *            变量格式：yyyy-mm-dd 例：1999年3月2日应输入：1999-03-02
	 *            </p>
	 * 
	 * @param dptprd
	 *            变量类型：String
	 * 
	 * @return String型变量，返回按月计算后的到期日。
	 */
	public String calMaturity(String date1, String dptprd) {
		GregorianCalendar gc1;
		String year = "";
		String month = "";
		String day = "";
		conversionDate(date1);
		gc1 = new GregorianCalendar(year1, month1 - 1, day1);
		month2 = Integer.parseInt(dptprd);
		gc1.add(Calendar.MONTH, month2);
		year = String.valueOf(gc1.get(Calendar.YEAR));
		month = String.valueOf(gc1.get(Calendar.MONTH) + 1);
		day = String.valueOf(gc1.get(Calendar.DATE));
		// System.out.println("month:="+month);
		// maturityCal();
		// String yearStr=String.valueOf(year2);
		// String monthStr=String.valueOf(month2);
		// String dayStr=String.valueOf(day2);
		if (gc1.get(Calendar.DATE) < 10) {
			day = "0".concat(day);
		}
		if (month.trim().length() == 1) {
			month = "0" + month;
		}
		String result = year + "-" + month + "-" + day;
		return result;
	}

	/* 根据传入的日期，计算当月月底日期 */
	public String GetMonthLastday(String date1) throws Exception {
		String monthStr = "";
		String result = "";

		checkDate(date1);
		conversionDate(date1);
		if (month1 == 1)
			// result="31";
			monthStr = "31";

		else if (month1 == 2) {
			if (((year1 % 4) == 0 && (year1 % 100) != 0)
					|| ((year1 % 400) == 0))
				monthStr = "29";
			else
				monthStr = "28";
		} else if (month1 == 3)
			monthStr = "31";
		else if (month1 == 4)
			monthStr = "30";
		else if (month1 == 5)
			monthStr = "31";
		else if (month1 == 6)
			monthStr = "30";
		else if (month1 == 7)
			monthStr = "31";
		else if (month1 == 8)
			monthStr = "31";
		else if (month1 == 9)
			monthStr = "30";
		else if (month1 == 10)
			monthStr = "31";
		else if (month1 == 11)
			monthStr = "30";
		else if (month1 == 12)
			monthStr = "31";

		String yearStr = String.valueOf(year1);
		String month = String.valueOf(month1);
		if (month1 > 0 && month1 < 10)
			month = "0" + month;
		// String dayStr=String.valueOf(day1);
		// result= yearStr+ "-" + monthStr + "-" +dayStr;
		result = yearStr + "-" + month + "-" + monthStr;
		return result;

	}

	private void conversionDate(String date1, String date2) throws Exception {
		try {
			String date11 = date1.substring(0, 4);
			year1 = Integer.parseInt(date11);
			String date21 = date2.substring(0, 4);
			year2 = Integer.parseInt(date21);
			String date12 = date1.substring(5, 7);
			month1 = Integer.parseInt(date12);
			String date22 = date2.substring(5, 7);
			month2 = Integer.parseInt(date22);
			String date13 = date1.substring(8);
			day1 = Integer.parseInt(date13);
			String date23 = date2.substring(8);
			day2 = Integer.parseInt(date23);
		} catch (Exception e) {
			throw new Exception("日期解析失败"); // 日期解析失败
		}
	}

	private void conversionDate(String date1) {
		String date11 = date1.substring(0, 4);
		year1 = Integer.parseInt(date11);
		String date12 = date1.substring(5, 7);
		month1 = Integer.parseInt(date12);
		String date13 = date1.substring(8);
		day1 = Integer.parseInt(date13);
	}

	private void maturityCal() {
		int[] monthtmp1 = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		int[] monthtmp2 = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		tmp = (month1 + month2) / 12; // 计算原来月份加上存期除以12等于几年。
		year2 = year1 + tmp; // 将年累加。
		int tmp2 = (month1 + month2) % 12;// 计算原来月份加上存期是否有余数。
		// 判断是否有年份累加并有月份余数。
		if (tmp2 == 0 && tmp >= 1) { // 如果有年份的累加
			year2 -= 1; // 并没有月份的余数那么将累加过的年份减1
			month2 = 12; // 月份置为12月。
		} else {
			month2 = tmp2; // 如果月份有余数将余数作为月份
		}
		if (((year2 % 4) == 0 && (year2 % 100) != 0) || ((year2 % 400) == 0)) // 判断原来如果是润年
		{
			if (month2 == 2 && day1 >= 29) {
				day2 = 29;
			} else {
				if (day1 == 31 && monthtmp2[month2] < 31) {
					day2 = monthtmp2[month2];
				} else {
					day2 = day1;
				}
			}
		} else {
			if (month2 == 2 && day1 >= 28) {
				day2 = 28;
			} else {
				if (day1 == 31 && monthtmp2[month2] < 31) {
					day2 = monthtmp1[month2];
				} else {
					day2 = day1;
				}
			}
		}
	}

	private int financeCal() {
		// ##########################月底算30天227-228=3################################

		if (day1 > 30) {
			day1 = 30;
		}
		if (day2 > 30) {
			day2 = 30;
		}
		if ((!(((year2 % 4) == 0 && (year2 % 100) != 0) || ((year2 % 400) == 0)))
				&& (((year1 % 4) == 0 && (year1 % 100) != 0) || ((year1 % 400) == 0))) // 判断原来如果是润年
		{
			if (month2 == 2 && day2 == 28 && month1 == 2 && day1 == 29) {
				day1 = 28;
			}
		}
		if ((!(((year1 % 4) == 0 && (year1 % 100) != 0) || ((year1 % 400) == 0)))
				&& (((year2 % 4) == 0 && (year2 % 100) != 0) || ((year2 % 400) == 0)))/*
																					 * add
																					 * by
																					 * duan
																					 * yuan
																					 * qiang
																					 */
		{
			if (month1 == 2 && day1 == 28 && month2 == 2 && day2 == 29) {
				day2 = 28;
			}
		}

		tmp = (year2 * 360 + month2 * 30 + day2)
				- (year1 * 360 + month1 * 30 + day1);

		return tmp;
	}

	// 计算两个日期之间相差的月数，不足一个月的为零。
	private int monthCal() {
		int[] monthtmp1 = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		int[] monthtmp2 = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (year2 >= year1) {
			while (year2 != year1) {
				tmp += 12;
				year1++;
			}
			if (month2 >= month1) {
				while (month2 != month1) {
					tmp++;
					month1++;
				}
				if (day2 >= day1) {
				} else {
					if (((year2 % 4) == 0 && (year2 % 100) != 0)
							|| ((year2 % 400) == 0)) {
						if (day2 == monthtmp2[month2]) {
						} else {
							tmp -= 1;
						}
					} else {
						if (day2 == monthtmp1[month2]) {
						} else {
							tmp -= 1;
						}
					}
				}
			} else {
				while (month2 != month1) {
					tmp--;
					month1--;
				}
				if (day2 >= day1) {
				} else {
					if (((year2 % 4) == 0 && (year2 % 100) != 0)
							|| ((year2 % 400) == 0)) {
						if (day2 == monthtmp2[month2]) {
						} else {
							tmp -= 1;
						}
					} else {
						if (day2 == monthtmp1[month2]) {
						} else {
							tmp -= 1;
						}
					}
				}
			}
		}
		return tmp;
	}

	// 实际天数计算算法；
	private int factCal() {
		int[] monthtmp1 = { 0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		int[] monthtmp2 = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
		if (year2 >= year1) {

			while (year2 != year1) {
				if ((((year1 % 4) == 0 && (year1 % 100) != 0) || ((year1 % 400) == 0))
						&& month1 < 3) {
					tmp += 366;
				} else {
					tmp += 365;
				}
				year1++;
			}

			if (month2 >= month1) {

				while (month2 != month1) {
					if (((year2 % 4) == 0 && (year2 % 100) != 0)
							|| ((year2 % 400) == 0)) {
						tmp += monthtmp2[month1];
					} else {
						tmp += monthtmp1[month1];
					}
					month1++;
				}

				if (day2 > day1) {

					while (day2 != day1) {
						tmp += 1;
						day1++;
					}
				} else {
					if (tmp == 0) {
					} else {
						while (day2 != day1) {
							tmp -= 1;
							day1--;
						}
					}
				}
			} else {
				if (tmp == 0) {
				} else {
					while (month1 != month2) {
						if (((year2 % 4) == 0 && (year2 % 100) != 0)
								|| ((year2 % 400) == 0)) {
							tmp -= monthtmp2[month1 - 1];
						} else {
							tmp -= monthtmp1[month1 - 1];
						}
						month1--;
					}
					if (tmp == 0) {
					} else {
						if (day2 > day1) {
							while (day2 != day1) {
								tmp += 1;
								day1++;
							}
						} else {
							if (tmp == 0) {
							} else {
								while (day2 != day1) {
									tmp -= 1;
									day1--;
								}
							}
						}
					}
				}
			}
		} else {
		}
		return tmp;
	}

	public boolean isBefore(String late, String early) throws Exception {

		conversionDate(late, early);

		Calendar c_late = new GregorianCalendar(year1, month1, day1);
		Calendar c_early = new GregorianCalendar(year2, month2, day2);

		long days = c_late.getTime().getTime() - c_early.getTime().getTime();

		if (days < 0)
			return false;

		return true;
	}

	public boolean isAfter(String early, String late) throws Exception {

		conversionDate(late, early);

		Calendar c_late = new GregorianCalendar(year1, month1, day1);
		Calendar c_early = new GregorianCalendar(year2, month2, day2);

		long days = c_late.getTime().getTime() - c_early.getTime().getTime();

		if (days < 0)
			return false;

		return true;
	}

	/* ceshi fang fa */
	public static void main(String[] args) {
		DateUtil ul = new DateUtil();
		try {
			// System.out.println("GetMonthLastday:"+ul.GetMonthLastday("2005-01-01"));
			// System.out.println("GetMonthLastday:"+ul.GetMonthLastday("2005-02-20"));
			// System.out.println("GetMonthLastday:"+ul.GetMonthLastday("2005-06-20"));
			// System.out.println("now:"+DateUtil.getDate());
			// if(ul.checkDate("2006-06-30"))
			// System.out.println("right");
			// else
			// System.out.println("wrong");
			// System.out.println("get add 111date:"+ul.calMonth("2006-02-01","-2"));
			// System.out.println("get add 111date:"+ul.calMonth("2006-02-28","2006-03-01"));
			System.out.println("get moti date:"
					+ ul.calFactualDate("2000-01-01", "2100-01-01"));
			long n = System.currentTimeMillis();
			System.out.println(n);
			for (int i = 0; i < 3650000; i++)
				;
			System.out.println(System.currentTimeMillis());
			System.out.println(System.currentTimeMillis() - n);

			// System.out.println("get moti date:"+ul.GetMonthLastday("2006-10-31"));
		} catch (Exception e) {

		}
	}

	/* 系统控制表使用的日期方法start */

	/**
	 * 取得某日期对应月份的实际天数,yyyy-MM-dd
	 * <p>
	 * 如果返回-1表示天数计算出错,一般为传入的日期串无效
	 */
	public static int getRealDaysOfMonth(String day) {
		return getRealDays(day, GregorianCalendar.DAY_OF_MONTH);
	}

	/**
	 * 取得某日期对应年份的实际天数,yyyy-MM-dd
	 * <p>
	 * 如果返回-1表示天数计算出错,一般为传入的日期串无效
	 */
	public static int getRealDaysOfYear(String day) {
		return getRealDays(day, GregorianCalendar.DAY_OF_YEAR);
	}

	/**
	 * 取得某日期对应的实际天数,yyyy-MM-dd
	 * <p>
	 * type同GregorianCalendar的常量,例:DAY_OF_MONTH-某月天数 YEAR-某年天数
	 * <p>
	 * 如果返回-1表示天数计算出错,一般为传入的日期串无效
	 */
	public static int getRealDays(String day, int type) {
		String format = "yyyy-MM-dd";
		Date d = toDate(day, format);
		if (d == null)
			return -1;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		return gcal.getActualMaximum(type);
	}

	/**
	 * 取得某日的年初起算天数,yyyy-MM-dd
	 * <p>
	 * 如果返回-1表示天数计算出错,一般为传入的日期串无效
	 * 
	 * @throws Exception
	 */
	public static int getDiffDaysByYear(String curday) throws Exception {
		String startDate;
		String year = String.valueOf(getYear(curday));
		startDate = year + "-01-01";
		int diffDays = -1;
		diffDays = DateUtil.getInstance().calFactualDate(startDate, curday);
		return diffDays + 1;
	}

	/**
	 * 取得某日的季初起算天数,yyyy-MM-dd
	 * <p>
	 * 如果返回-1表示天数计算出错,一般为传入的日期串无效
	 * 
	 * @throws Exception
	 */
	public static int getDiffDaysByQuarter(String curday) throws Exception {
		String startDate;
		String year = String.valueOf(getYear(curday));
		int month = getMonth(curday);
		int diffDays = -1;
		if (month <= 3) {
			startDate = year + "-01-01";
			diffDays = DateUtil.getInstance().calFactualDate(startDate, curday);
		} else if (month <= 6) {
			startDate = year + "-04-01";
			diffDays = DateUtil.getInstance().calFactualDate(startDate, curday);
		} else if (month <= 9) {
			startDate = year + "-07-01";
			diffDays = DateUtil.getInstance().calFactualDate(startDate, curday);
		} else {
			startDate = year + "-10-01";
			diffDays = DateUtil.getInstance().calFactualDate(startDate, curday);
		}
		return diffDays + 1;
	}

	/**
	 * 取得上一年
	 */
	public static String getPrevYear(String year) {
		int curYear = -1;
		curYear = Integer.parseInt(year);
		curYear--;

		return String.valueOf(curYear);
	}

	/**
	 * 取得上一月
	 */
	public static String getPreMonth() {

		DateFormat dateFormat = DateFormat.getDateInstance(DateFormat.MEDIUM);

		GregorianCalendar grc = new GregorianCalendar();
		grc.add(GregorianCalendar.MONTH, -1);
		String pre_mdate = dateFormat.format(grc.getTime());// 上月日期
		String pre_month = pre_mdate.substring(pre_mdate.indexOf("-") + 1,
				pre_mdate.lastIndexOf("-"));
		if (pre_month.length() <= 1)
			pre_month = pre_mdate.substring(0, 4) + "-0" + pre_month;
		else
			pre_month = pre_mdate.substring(0, 4) + "-" + pre_month;

		return pre_month;
	}

	/**
	 * 取得下一年
	 */
	public static String getNextYear(String year) {
		int curYear = 0;
		curYear = Integer.parseInt(year);
		curYear++;

		return String.valueOf(curYear);
	}

	/**
	 * @param curday
	 */
	public static int getYear(String day) {
		String format = "yyyy-MM-dd";
		Date d = toDate(day, format);
		if (d == null)
			return -1;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		return gcal.get(GregorianCalendar.YEAR);
	}

	/**
	 * @param curday
	 */
	public static int getMonth(String day) {
		String format = "yyyy-MM-dd";
		Date d = toDate(day, format);
		if (d == null)
			return -1;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		return gcal.get(GregorianCalendar.MONTH) + 1;
	}

	/**
	 * @param curday
	 */
	public static int getDay(String day) {
		String format = "yyyy-MM-dd";
		Date d = toDate(day, format);
		if (d == null)
			return -1;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		return gcal.get(GregorianCalendar.DAY_OF_MONTH);
	}

	/**
	 * 比较两个日期中的month是否在基准month的两侧
	 * <p>
	 * 如果都在基准month之前,返回0
	 * <p>
	 * 如果被基准month分隔,返回1
	 * <p>
	 * 如果都在基准month之后,返回2
	 */
	public static int getLocationByBaseMonth(int baseMonth, String smallMonth,
			String bigMonth) {
		if (getMonth(smallMonth) <= baseMonth) {
			if (getMonth(bigMonth) <= baseMonth) {
				return 0;
			} else {
				return 1;
			}
		} else {
			return 2;
		}
	}

	/**
	 * 比较两个日期中的day是否在基准day的两侧
	 * <p>
	 * 如果都在基准day之前,返回0
	 * <p>
	 * 如果被基准day分隔,返回1
	 * <p>
	 * 如果都在基准day之后,返回2
	 */
	public static int getLocationByBaseDay(int baseDay, String smallDay,
			String bigDay) {
		if (getDay(smallDay) <= baseDay) {
			if (getDay(bigDay) <= baseDay) {
				return 0;
			} else {
				return 1;
			}
		} else {
			return 2;
		}
	}

	/**
	 * 是否旬末
	 */
	public static boolean isTDYMAK(String curday, String nwkday) {
		if ((getMonth(curday) - getMonth(nwkday)) < 0)
			return true;
		if (getLocationByBaseDay(10, curday, nwkday) == 1)
			return true;
		if (getLocationByBaseDay(20, curday, nwkday) == 1)
			return true;
		return false;
	}

	/**
	 * 是否半月末
	 */
	public static boolean isFNTMAK(String curday, String nwkday) {
		if ((getMonth(curday) - getMonth(nwkday)) < 0)
			return true;
		if (getLocationByBaseDay(15, curday, nwkday) == 1)
			return true;
		return false;
	}

	/**
	 * 是否月末
	 */
	public static boolean isMONMAK(String curday, String nwkday) {
		int monthless = getMonth(curday) - getMonth(nwkday);
		if (monthless < 0 || monthless == 11)
			return true;
		return false;
	}

	/**
	 * 是否季末
	 */
	public static boolean isQTRMAK(String curday, String nwkday) {
		if ((getYear(curday) - getYear(nwkday)) < 0)
			return true;
		if (getLocationByBaseMonth(3, curday, nwkday) == 1)
			return true;
		if (getLocationByBaseMonth(6, curday, nwkday) == 1)
			return true;
		if (getLocationByBaseMonth(9, curday, nwkday) == 1)
			return true;
		return false;
	}

	/**
	 * 是否半年末
	 */
	public static boolean isHYRMAK(String curday, String nwkday) {
		if (getLocationByBaseMonth(6, curday, nwkday) == 1)
			return true;
		return false;
	}

	/**
	 * 是否年末
	 */
	public static boolean isYERMAK(String curday, String nwkday) {
		if ((getYear(curday) - getYear(nwkday)) < 0)
			return true;
		return false;
	}

	/**
	 * 日期串:yyyy-mm-dd
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得上一天
	 */
	public static String getPreDay(String day) {
		String format = "yyyy-MM-dd";
		return getNewDay(day, format, -1);
	}

	/**
	 * 日期串:yyyy-mm-dd
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得下一天
	 */
	public static String getNextDay(String day) {
		String format = "yyyy-MM-dd";
		return getNewDay(day, format, 1);
	}

	/**
	 * 日期串:yyyy-MM-dd
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得下星期一
	 */
	public static String getNextMonday(String day) {
		String format = "yyyy-MM-dd";
		GregorianCalendar gcal = (GregorianCalendar) getCurrentFriday(day,
				format);
		if (gcal == null)
			return null;
		// 把本周五的日期加3天即为下周一的日期
		return getNewDay(gcal, format, 3);
	}

	/**
	 * 日期串:yyyy-MM-dd
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得上星期五
	 */
	public static String getPreFriday(String day) {
		String format = "yyyy-MM-dd";
		GregorianCalendar gcal = (GregorianCalendar) getCurrentFriday(day,
				format);
		if (gcal == null)
			return null;
		// 把本周五的日期减7天即为上周五的日期
		return getNewDay(gcal, format, -7);
	}

	/**
	 * 得到本周五的日期串
	 */
	public static String getCurrentFriday(String day) {
		String format = "yyyy-MM-dd";
		GregorianCalendar gcal = (GregorianCalendar) getCurrentFriday(day,
				format);
		if (gcal == null)
			return null;
		return formatDate(gcal.getTime(), format);
	}

	/**
	 * 得到本周五的GregorianCalendar对象
	 */
	public static Calendar getCurrentFriday(String day, String format) {
		Date d = toDate(day, format);
		if (d == null)
			return null;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		// 把日期调至本周的周五
		gcal.set(GregorianCalendar.DAY_OF_WEEK, GregorianCalendar.FRIDAY);
		return gcal;
	}

	/**
	 * 日期串/格式串/加或减的日期天数
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得某一天
	 */
	public static String getNewDay(String day, String format, int dayNum) {
		Date d = toDate(day, format);
		if (d == null)
			return null;
		return getNewDay(d, format, dayNum);
	}

	/**
	 * Date/格式串/加或减的日期天数
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得某一天
	 */
	public static String getNewDay(Date day, String format, int dayNum) {
		if (day == null || format == null)
			return null;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(day);
		return getNewDay(gcal, format, dayNum);
	}

	/**
	 * GregorianCalendar/格式串/加或减的日期天数
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * 取得某一天
	 */
	public static String getNewDay(GregorianCalendar gcal, String format,
			int dayNum) {
		if (gcal == null || format == null)
			return null;
		gcal.add(Calendar.DAY_OF_MONTH, dayNum);
		return formatDate(gcal.getTime(), format);
	}

	/**
	 * 日期串/格式串
	 * <p>
	 * 返回:Date
	 * <p>
	 * 日期串转至Date
	 */
	public static Date toDate(String day, String format) {
		if (day == null || format == null)
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		Date d;
		try {
			d = sdf.parse(day);
		} catch (ParseException e) {
			return null;
		}
		return d;
	}

	/**
	 * Date/格式串
	 * <p>
	 * 返回String:yyyy-MM-dd
	 * <p>
	 * Date转到日期串
	 */
	public static String formatDate(Date day, String format) {
		if (day == null || format == null)
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(day);
	}

	/**
	 * Date/格式串
	 * <p>
	 * 返回String:yyyy-MM-dd h:i:s
	 */
	public static String getDateTime(Date day) {
		return formatDate(day, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * Date/格式串
	 * <p>
	 * 返回String:yyyy-MM-dd
	 */
	public static String getDate(Date day) {
		return formatDate(day, "yyyy-MM-dd");
	}

	/**
	 * 日期串
	 * <p>
	 * 返回int:0-星期天/1-星期一/.../6-星期六
	 * <p>
	 * 注:返回-1为计算出错,一般为传入的日期串无效
	 * <p>
	 * 取得某日是星期几
	 */
	public static int getWeekDay(String day) {
		String format = "yyyy-MM-dd";
		return getWeekDay(day, format);
	}

	/**
	 * 日期串/格式串
	 * <p>
	 * 返回int:0-星期天/1-星期一/.../6-星期六
	 * <p>
	 * 注:返回-1为计算出错,一般为传入的日期串无效
	 * <p>
	 * 取得某日是星期几
	 */
	public static int getWeekDay(String day, String format) {
		Date d = toDate(day, format);
		if (d == null)
			return -1;
		GregorianCalendar gcal = new GregorianCalendar();
		gcal.setTime(d);
		return gcal.get(GregorianCalendar.DAY_OF_WEEK) - 1;
	}

	/* 系统控制表使用的日期方法end */

	/**
	 * 判断时间date1是否在时间date2之前
	 * <p>
	 * isDateBefore("2006-01-01 12:00:00","2006-01-01 12:00:01")返回true
	 */
	public static boolean isDateBefore(String date1, String date2) {
		try {
			DateFormat df = DateFormat.getDateTimeInstance();
			return df.parse(date1).before(df.parse(date2));
		} catch (ParseException e) {
			return false;
		}
	}

	/**
	 * 判断时间date是否在当前时间之前
	 * <p>
	 * 假设当前日期为2006-01-01 12:00:01
	 * <p>
	 * 则isBeforeCurDate("2006-01-01 12:00:01")返回true
	 */
	public static boolean isBeforeCurDate(String date) {
		String curDate = getDateTime();
		return isDateBefore(date, curDate);
	}

	/**
	 * 根据两个日期,取得相隔的天数
	 */
	public static int getBetweenDayNumber(String dateA, String dateB) {
		long dayNumber = 0;
		long DAY = 24L * 60L * 60L * 1000L;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		try {
			java.util.Date d1 = df.parse(dateA);
			java.util.Date d2 = df.parse(dateB);
			dayNumber = (d2.getTime() - d1.getTime()) / DAY;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (int) dayNumber;
	}

	/**
	 * 根据两个日期,取得相隔的秒数
	 */
	public static int getBetweenSecNumber(String dateA, String dateB) {
		long secNumber = 0;
		long SEC = 1000L;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");
		try {
			java.util.Date d1 = df.parse(dateA);
			java.util.Date d2 = df.parse(dateB);
			secNumber = (d2.getTime() - d1.getTime()) / SEC;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (int) secNumber;
	}

	/**
	 * 根据两个日期,取得相隔的毫秒数
	 */
	public static int getBetweenMicroSecNumber(String dateA, String dateB) {
		long secNumber = 0;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd k:m:s");
		try {
			java.util.Date d1 = df.parse(dateA);
			java.util.Date d2 = df.parse(dateB);
			secNumber = (d2.getTime() - d1.getTime());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (int) secNumber;
	}

	/**
	 * 将毫秒数换算成x天x时x分x秒x毫秒
	 */
	public static String getDhms(long ms, String format) {// 将毫秒数换算成x天x时x分x秒x毫秒
		String tmpTime = "";

		int ss = 1000;
		int mi = ss * 60;
		int hh = mi * 60;
		int dd = hh * 24;

		long day = ms / dd;
		long hour = (ms - day * dd) / hh;
		long minute = (ms - day * dd - hour * hh) / mi;
		long second = (ms - day * dd - hour * hh - minute * mi) / ss;
		long milliSecond = ms - day * dd - hour * hh - minute * mi - second
				* ss;

		String strDay = day < 10 ? "0" + day : "" + day;
		String strHour = hour < 10 ? "0" + hour : "" + hour;
		String strMinute = minute < 10 ? "0" + minute : "" + minute;
		String strSecond = second < 10 ? "0" + second : "" + second;
		String strMilliSecond = milliSecond < 10 ? "0" + milliSecond : ""
				+ milliSecond;
		strMilliSecond = milliSecond < 100 ? "0" + strMilliSecond : ""
				+ strMilliSecond;

		if (format.equalsIgnoreCase("dhhmmssmis")) {
			tmpTime = strDay + " " + strHour + ":" + strMinute + ":"
					+ strSecond + " " + strMilliSecond;
		}

		if (format.equalsIgnoreCase("hhmmss")) {
			tmpTime = strHour + ":" + strMinute + ":" + strSecond;
		}

		return tmpTime;
	}

	/**
	 * 功能：得到当前月份月初 格式为：xxxx-yy-zz (eg: 2007-12-01)<br>
	 * 
	 * @return String
	 * @author pure
	 */
	public static String thisMonth(Calendar localTime) {
		String strY = null;
		int x = localTime.get(Calendar.YEAR);
		int y = localTime.get(Calendar.MONTH) + 1;
		strY = y >= 10 ? String.valueOf(y) : ("0" + y);
		return x + "-" + strY + "-01";
	}

	/**
	 * 功能：得到当前月份月底 格式为：xxxx-yy-zz (eg: 2007-12-31)<br>
	 * 
	 * @return String
	 * @author pure
	 */
	public static String thisMonthEnd(Calendar localTime) { // 日期属性：日
		String strY = null;
		String strZ = null;
		boolean leap = false;
		int x = localTime.get(Calendar.YEAR);
		int y = localTime.get(Calendar.MONTH) + 1;
		if (y == 1 || y == 3 || y == 5 || y == 7 || y == 8 || y == 10
				|| y == 12) {
			strZ = "31";
		}
		if (y == 4 || y == 6 || y == 9 || y == 11) {
			strZ = "30";
		}
		if (y == 2) {
			leap = leapYear(x);
			if (leap) {
				strZ = "29";
			} else {
				strZ = "28";
			}
		}
		strY = y >= 10 ? String.valueOf(y) : ("0" + y);
		return x + "-" + strY + "-" + strZ;
	}

	/**
	 * 得到上 年月日 日期
	 * 
	 * @param nowDay
	 * @param format
	 * @param y
	 * @param m
	 * @param d
	 * @return Date
	 */
	public static Date getUpDate(String nowDay, String format, int y, int m,
			int d) {
		Date date = toDate(nowDay, format);

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, -y); // 得到前一个月
		calendar.add(Calendar.MONTH, -m); // 得到前一个月
		calendar.add(Calendar.DATE, -d); // 得到前一天

		/*
		 * int year = calendar.get(Calendar.YEAR); int month =
		 * calendar.get(Calendar.MONTH)+1; int day =
		 * calendar.get(Calendar.DATE);
		 * System.out.println(year+"-"+month+"-"+day);
		 */
		// System.out.println(calendar.getTime());
		return calendar.getTime();
	}

	/**
	 * 得到下 年月日 日期
	 * 
	 * @param nowDay
	 * @param format
	 * @param y
	 * @param m
	 * @param d
	 * @return Date
	 */
	public static Date getDownDate(String nowDay, String format, int y, int m,
			int d) {
		Date date = toDate(nowDay, format);

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, +y); // 得到下一个月
		calendar.add(Calendar.MONTH, +m); // 得到下一个月
		calendar.add(Calendar.DATE, +d); // 得到下一天

		/*
		 * int year = calendar.get(Calendar.YEAR); int month =
		 * calendar.get(Calendar.MONTH)+1; int day =
		 * calendar.get(Calendar.DATE);
		 * System.out.println(year+"-"+month+"-"+day);
		 */
		// System.out.println(calendar.getTime());
		return calendar.getTime();
	}

	/**
	 * 得到上 年月日 日期
	 * 
	 * @param nowDay
	 * @param format
	 * @param y
	 * @param m
	 * @param d
	 * @return Date
	 */
	public static Date getUpDate(Date date, int y, int m, int d) {

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, -y); // 得到前一个月
		calendar.add(Calendar.MONTH, -m); // 得到前一个月
		calendar.add(Calendar.DATE, -d); // 得到前一天

		/*
		 * int year = calendar.get(Calendar.YEAR); int month =
		 * calendar.get(Calendar.MONTH)+1; int day =
		 * calendar.get(Calendar.DATE);
		 * System.out.println(year+"-"+month+"-"+day);
		 */
		// System.out.println(calendar.getTime());
		return calendar.getTime();
	}

	/**
	 * 得到下 年月日 日期
	 * 
	 * @param nowDay
	 * @param format
	 * @param y
	 * @param m
	 * @param d
	 * @return Date
	 */
	public static Date getDownDate(Date date, int y, int m, int d) {

		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.YEAR, +y); // 得到下一个月
		calendar.add(Calendar.MONTH, +m); // 得到下一个月
		calendar.add(Calendar.DATE, +d); // 得到下一天

		/*
		 * int year = calendar.get(Calendar.YEAR); int month =
		 * calendar.get(Calendar.MONTH)+1; int day =
		 * calendar.get(Calendar.DATE);
		 * System.out.println(year+"-"+month+"-"+day);
		 */
		// System.out.println(calendar.getTime());
		return calendar.getTime();
	}

	public static Date parseDate(String dateValue) throws DateParseException {
		return parseDate(dateValue, null);
	}

	public static Date parseDate(String dateValue, Collection dateFormats) throws DateParseException {
		if (dateValue == null) {
			throw new IllegalArgumentException("dateValue is null");
		}
		if (dateFormats == null) {
			dateFormats = DEFAULT_PATTERNS;
		}

		if ((dateValue.length() > 1) && (dateValue.startsWith("'"))
				&& (dateValue.endsWith("'"))) {
			dateValue = dateValue.substring(1, dateValue.length() - 1);
		}

		SimpleDateFormat dateParser = null;
		Iterator formatIter = dateFormats.iterator();

		while (formatIter.hasNext()) {
			String format = (String) formatIter.next();
			if (dateParser == null) {
				dateParser = new SimpleDateFormat(format, Locale.US);
				dateParser.setTimeZone(TimeZone.getTimeZone("GMT+8:00"));
			} else {
				dateParser.applyPattern(format);
			}
			try {
				return dateParser.parse(dateValue);
			} catch (ParseException pe) {
			}
		}

		throw new DateParseException("Unable to parse the date " + dateValue);
	}
}
class DateParseException extends Exception{
	public DateParseException(){}
	public DateParseException(String message)
	{
		super(message);
	}
}
