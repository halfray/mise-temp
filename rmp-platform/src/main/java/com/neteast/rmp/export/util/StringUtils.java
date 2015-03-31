package com.neteast.rmp.export.util;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 
 * @author mengfanyu
 * @data 2012-10-11
 * 
 */
public final class StringUtils {
	
	private static final  String GBK_DOMAIN = "[\u4e00-\u9fa5]";

	/**
	 * 全角->半角
	 * 
	 * @author mengfanyu
	 * @data 2012-10-11
	 * @param input
	 * @return
	 * 
	 */
	public static String ToDBC( String input ){

		if( null == input || "".equals( input ) ){
			return "";
		}
		char[] c = input.trim().toCharArray();
		for( int i = 0 ; i < c.length ; i++ ){
			if( c[i] == 12288 ){
				c[i] = (char)32;
				continue;
			}
			if( c[i] > 65280 && c[i] < 65375 ) c[i] = (char)(c[i] - 65248);
		}
		return new String( c );
	}

	/**
	 * 获得文件名字后缀(大写)
	 * 
	 * @author mengfanyu
	 * @data 2012-10-11
	 * @return
	 * 
	 */
	public static String getSuffixToUpperCase( String fileName ){

		return fileName.substring( fileName.lastIndexOf( "." ) + 1 ).toUpperCase();
	}

	/**
	 * 比较后缀名,大小写忽略
	 * 
	 * @author mengfanyu
	 * @data 2012-10-11
	 * @param fileName
	 * @param suffix
	 * @return
	 * 
	 */
	public static boolean compareSuffix( String fileName , String suffix ){

		return getSuffixToUpperCase( fileName ).equals( suffix.toUpperCase() ) ? true : false;
	}

	/**
	 * 比较后缀,忽略大小,满足其一即可
	 * 
	 * @author mengfanyu
	 * @data 2012-10-12
	 * @param fileName
	 * @param suffix
	 * @return
	 * 
	 */
	public static boolean compareSuffixs( String fileName , String ...suffix ){

		boolean flag = false;
		for( int i = 0 ; i < suffix.length ; i++ ){
			flag = getSuffixToUpperCase( fileName ).equals( suffix[i].toUpperCase() ) ? true : false;
			if( flag ) break;
		}
		return flag;
	}

	/**
	 * 生成随机字符串(包含大小写字母、数字)
	 * 
	 * @author mengfanyu
	 * @data 2012-10-12
	 * @param length
	 * @return
	 * 
	 */
	public static String getRandomStr( int length ){

		String temp = "abcdefghigklimopqrstuvwxyzABCDEFGHIGKLIMOPQRSTUVWXYZ1234567890";
		StringBuilder sb = new StringBuilder();
		Random r = new Random();
		int randomInt = temp.length();
		for( int i = 1 ; i <= length ; i++ ){
			sb.append( temp.charAt( r.nextInt( randomInt ) ) );
		}
		return sb.toString();
	}

	/**
	 * 生成随机字符串(只包含0-9的数字)
	 * 
	 * @author mengfanyu
	 * @data 2012-10-12
	 * @param length
	 * @return
	 * 
	 */
	public static String getRandomNumStr( int length ){

		String temp = "1234567890";
		StringBuilder sb = new StringBuilder();
		Random r = new Random();
		int randomInt = temp.length();
		for( int i = 1 ; i <= length ; i++ ){
			sb.append( temp.charAt( r.nextInt( randomInt ) ) );
		}
		return sb.toString();
	}

	/**
	 * 转换对象为大写的String
	 * 
	 * @author mengfanyu
	 * @data 2012-12-10
	 * @param obj
	 * @return
	 * 
	 */
	public static String convertObjectToUpperCaseString( Object obj ){
		
		return null == obj ? "" : obj.toString().toUpperCase().trim();
	}
	/**
	 * 转换对象为string
	 * @author mengfanyu
	 * @data 2013-1-29
	 * @param obj
	 * @return
	 *
	 */
	public static String convertObjectToString( Object obj ){

		if( null == obj ) return "";
		return obj.toString().trim();
	}
	/**
	 * 判断是否为空
	 * 
	 * @author mengfanyu
	 * @data 2012-12-11
	 * @param obj
	 * @return
	 * 
	 */
	public static boolean isNull( Object obj ){

		return org.apache.commons.lang.StringUtils.isBlank( convertObjectToString( obj ) );
	}
	/**
	 * 根据当前日期获得当前批次
	 * @author zhangzhihu
	 * @data 2012-12-18
	 * @return String
	 * 
	 */
	public static String getCurrentBatch() {
        Calendar cal = Calendar.getInstance();
        Date date = new Date();
        cal.setTime(date);
        int year = 0;
        int month = cal.get(Calendar.MONTH); // 上个月月份
        if (month == 0) {
            year = cal.get(Calendar.YEAR) - 1;
            month = 12;
        } else {
            year = cal.get(Calendar.YEAR);
        }
        String endDay = year + "" + month;
        return endDay;
    }
	/**
	 * 根据当前日期获得下个月的批次
	 * @author zhangzhihu
	 * @data 2013-01-31
	 * @return String
	 * 
	 */
	public static String getNextBatch() {
		Calendar c = Calendar.getInstance();
	    c.setTimeInMillis(new Date().getTime());
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
	    return dateFormat.format(c.getTime());
	}
	/**
	 * 根据当前日期获得上个月批次
	 * @author zhangzhihu
	 * @data 2013-01-31
	 * @return String
	 * 
	 */
	public static String getUpBatch() {
		Calendar c = Calendar.getInstance();   
	    c.add(c.MONTH,-2);//得到上个月的月份   
	    java.util.Date d = c.getTime();   
	    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
		return dateFormat.format(c.getTime());
	}
	
	public static String transformCustType( String typeNum){
		
		if( null == typeNum )return "" ;
		
		if(typeNum.equals( "11" )){
			return "集团客户";
		}
		if(typeNum.equals( "12" )){
			return "供应链客户";
		}
		if(typeNum.equals( "2" )){
			return "单一法人客户";
		}
		if(typeNum.equals( "3" )){
			return "同业客户";
		}
		if(typeNum.equals( "4" )){
			return "违约个人客户";
		}

		if(typeNum.equals( "集团客户" )){
			return "11";
		}
		if(typeNum.equals( "供应链客户" )){
			return "12";
		}
		if(typeNum.equals( "单一法人客户" )){
			return "2";
		}
		if(typeNum.equals( "同业客户" )){
			return "3";
		}
		if(typeNum.equals( "违约个人客户" )){
			return "4";
		}
		return "" ;
	}
	public static String transformCretType( String typeNum){
		
		if( null == typeNum )return "" ;
		
		if(typeNum.equals( "1" )){
			return "组织机构代码";
		}
		if(typeNum.equals( "2" )){
			return "居民身份证";
		}
		if(typeNum.equals( "3" )){
			return "军官证";
		}
		if(typeNum.equals( "4" )){
			return "文职干部证";
		}
		if(typeNum.equals( "5" )){
			return "警官证";
		}
		if(typeNum.equals( "6" )){
			return "士兵证";
		}
		if(typeNum.equals( "7" )){
			return "户口本";
		}
		if(typeNum.equals( "8" )){
			return "临时身份证";
		}
		if(typeNum.equals( "9" )){
			return "其他有效通行旅行证件";
		}
		if(typeNum.equals( "10" )){
			return "护照";
		}
		if(typeNum.equals( "11" )){
			return "学生证";
		}
		if(typeNum.equals( "12" )){
			return "无证件";
		}
		return "" ;
	}
	/**
	 * 读取某个文件内的全部内容,转换为字符串.
	 * @author mengfanyu
	 * @data 2013-3-1
	 * @param file
	 * @return
	 */
	public static String getFileContentToString(File file){
		if( null == file || !file.exists()){
			return "";
		}
		FileReader reader = null ;
		try{
			reader = new FileReader(file);
			char in [] = new char[(int)file.length()];
			reader.read( in ) ;
			return String.copyValueOf( in );
		}catch ( Exception e ){
			e.printStackTrace();
		}finally{
			if( null != reader ){
				try{
					reader.close() ;
				}catch ( IOException e ){}
			}
		}
		return "";
	}
	/**
	 * 是否为汉字
	 * @author mengfanyu
	 * @data 2013-3-2
	 * @return
	 *
	 */
	public static boolean isGBK(char str){
		Pattern p = Pattern.compile( GBK_DOMAIN );
		Matcher m = p.matcher( String.valueOf( str ) );
		return m.find();
		
	}
	/**
	 * 是否包含汉字
	 * @author mengfanyu
	 * @data 2013-3-2
	 * @param str
	 * @return
	 *
	 */
	public static boolean isContainGBK(String str){
		if( null == str || str.equals( "" )){
			return false ;
		}
		char tempChar [] = str.toCharArray() ;
		for( int i = 0 ; i < tempChar.length ; i++ ){
			if(isGBK(tempChar[i]))
				return true ;
		}
		return false ;
	}
	
	public static String getDateString(){
		SimpleDateFormat sdf =new SimpleDateFormat("yyyyMMddHHmmssSSSSSS");
		return sdf.format( new java.util.Date() );
	}
	/**
	 * @param date
	 * 判断字符串是否是YYYY年MM月DD日格式-兼容闰年
	 * 高率荏
	 * @return
	 */
	public static boolean checkDateYYYYMMDD(String date){
		return date.matches("(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))年02月29日)|([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})年(((0[13578]|1[02])月(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)月(0[1-9]|[12][0-9]|30))|(02月(0[1-9]|[1][0-9]|2[0-8])))日");
	}
	
	/**
	 * 将数值的字符串转换为****.00格式（保留2位小数）
	 * 高率荏
	 * @param f
	 * @return
	 */
	public static String getNumString(double f){
		DecimalFormat df = new DecimalFormat("#.00" );
		return df.format(f);
	}
}
