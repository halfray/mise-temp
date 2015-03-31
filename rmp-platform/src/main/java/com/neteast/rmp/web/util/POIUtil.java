package com.neteast.rmp.web.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import org.apache.poi.hssf.record.formula.functions.T;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * 模块名称: 
 * 类名称：  POIUtil   
 * 类描述：  
 * 创建人：  sinosoft   
 * 创建时间：2009-11-13 下午05:28:21  
 * 修改人：  sinosoft  
 * 修改时间：2009-11-13 下午05:28:21  
 * 修改备注：  
 * @version    
 * 
 */
public class POIUtil {
	public static final String COLUMNNAMEREGEX = "[A-Z]+";		//列名称匹配正则表达式
	
	
	public static File fillListToFile(List list,Map<String,String> pro,File file) throws Exception
	{
		return fillListToFile(null,list,pro,file);
	}
	public static File fillListToFile(File source,List list,Map<String,String> pro,File file) throws Exception
	{
		return fillListToFile(source,0,list,pro,file);
	}
	public static File fillListToFile(int start,List list,Map<String,String> pro,File file) throws Exception
	{
		return fillListToFile(null,start,list,pro,file);
	}
	
	public static File fillListToFile(File source,int start,List list,Map<String,String> pro,File file) throws Exception
	{
		return fillListToFile(source,0,start,list,pro,file,"yyyy-MM-dd");
	}
	public static File fillListToFile(File source,Integer sheetIndex,int start,List list,Map<String,String> pro,File goal,String format) throws Exception
	{
		Workbook workbook = fillListToWorkBook(source,sheetIndex,start,list,pro,format);
		FileOutputStream out = null;
		try
		{
			if(!goal.exists())
				FileUtil.mkFile(goal.getPath());
			out = new FileOutputStream(goal);
			workbook.write(out);
		}finally
		{
			if(out != null)
				out.close();
		}
		return goal;
	}
	
	public static Workbook fillListToWorkBook(List list,Map<String,String> pro) throws Exception
	{
		return fillListToWorkBook(null,list,pro);
	}
	public static Workbook fillListToWorkBook(File source,List list,Map<String,String> pro) throws Exception
	{
		return fillListToWorkBook(source,0,list,pro);
	}
	public static Workbook fillListToWorkBook(int start,List list,Map<String,String> pro) throws Exception
	{
		return fillListToWorkBook(null,start,list,pro);
	}
	
	public static Workbook fillListToWorkBook(File source,int start,List list,Map<String,String> pro) throws Exception
	{
		return fillListToWorkBook(source,0,start,list,pro,"yyyy-MM-dd");
	}
	/**
	 * 将list中的对象信息填充到EXCEL文件中
	 * @param source	原EXCEL模板文件,如果为空则创建一个新的excel模板
	 * @param sheetIndex 待填充的sheet页,下标从0开始
	 * @param start		 填充的起始行,下标从0开始
	 * @param list       进行填充的对象容器
	 * @param pro		属性对应EXCEL位置的配置信息,如: A(EXCEL列名) -> name(填充对象属性名)
	 * @param format	对日期类型进行格式化样式
	 * @return
	 * @throws Exception
	 */
	public static Workbook fillListToWorkBook(File source,int sheetIndex,int start,List list,Map<String,String> pro,String format) throws Exception
	{
		Workbook workbook = null;
		if(source == null )
			workbook = new HSSFWorkbook();
		else
			workbook = new HSSFWorkbook(new FileInputStream(source));
		Sheet sheet = getSheet(workbook,sheetIndex);
		list2sheet(sheet,start,list,pro,format);
		return workbook;
	}
	/**
	 * 将EXCEL中行信息转为对象,将指定行信息转为list
	 * @param <T>
	 * @param workbook			待转excel的workbook对象
	 * @param sheetIndex		操作的sheet下标
	 * @param start				开始行(下标从0开始,即比实际的excel行少1)
	 * @param end				结束行(下标从0开始,即比实际的excel行少1)
	 * @param clas				转换后的对象类型
	 * @param pro				属性对应EXCEL位置的配置信息,如: A(EXCEL列名) -> name(填充对象属性名)
	 * @return
	 * @throws Exception
	 */
	public static List<T> getList(Workbook workbook,int sheetIndex,int start,int end,Class<T> clas,Map<String,String> pro) throws Exception
	{
		Sheet sheet = getSheet(workbook,sheetIndex);
		List<T> resultList = new ArrayList<T>();
		for(int i = start;i <= end;i++)
		{
			Row row = POIUtil.getRow(sheet,i);
			Iterator<Map.Entry<String,String>> ite = pro.entrySet().iterator();
			T t = (T) row2obj((Class)clas,pro,row);
			resultList.add(t);
		}
		return resultList;
	}
	
	/**
	 * 将EXCEL中行信息转为对象,将指定行信息转为list
	 * @param <T>
	 * @param workbook			待转excel的workbook对象
	 * @param sheetIndex		操作的sheet下标
	 * @param start				开始行(下标从0开始,即比实际的excel行少1)
	 * @param columnName		不为空的列,当该列为空时,表示行结束
	 * @param clas				转换后的对象类型
	 * @param pro				属性对应EXCEL位置的配置信息,如: A(EXCEL列名) -> name(填充对象属性名)
	 * @return
	 * @throws Exception
	 */
	public static List<T> getList(Workbook workbook,int sheetIndex,int start,String columnName,Class<T> clas,Map<String,String> pro) throws Exception
	{
		Sheet sheet = getSheet(workbook,sheetIndex);
		return sheet2list(sheet,start,columnName,clas,pro);
	}
	
	/**
	 * 将对象列表中的信息填充到excel的sheet中
	 * @param sheet			待填充的sheet
	 * @param startRow		开始行下标
	 * @param list			对象列表
	 * @param pro			配置信息
	 * @param dateFormat	日期格式化方法
	 * @throws Exception
	 */
	public static void list2sheet(Sheet sheet,int startRow,List list ,Map pro,String dateFormat) throws Exception
	{
		for(Object obj : list)
		{
			obj2row(obj,POIUtil.getRow(sheet, startRow++),pro,dateFormat);
		}
	}
	/**
	 * 将对象中的信息填充到excel的一行中
	 * @param obj
	 * @param row
	 * @param map
	 * @param dateFormat
	 * @return
	 * @throws Exception
	 */
	public static Row obj2row(Object obj,Row row,Map map,String dateFormat) throws Exception
	{
		Iterator<Map.Entry<String,String>> ite = map.entrySet().iterator();
		while(ite.hasNext())
		{
			Map.Entry<String, String> entry = ite.next();
			Cell cell = POIUtil.getCell(row,entry.getKey());
			POIUtil.setValue(cell,ReflectionUtil.execGetMethod(obj, entry.getValue()),dateFormat);
		}
		return row;
	}
	/**
	 * 将excel中的一个sheet中的信息提取为一个list对象,结束标志为某列的信息不能为空
	 * @param sheet
	 * @param start
	 * @param columnName
	 * @param clas
	 * @param pro
	 * @return
	 * @throws Exception
	 */
	public static List sheet2list(Sheet sheet,int start,String columnName,Class<?> clas,Map<String,String> pro) throws Exception
	{
		List list = new ArrayList();
		for(int i = start;;i++)
		{
			Row row = sheet.getRow(i);
			if(row==null || getCell(row,columnName)==null || getCell(row,columnName).toString().trim().equals(""))
				break;
			list.add(row2obj((Class)clas,pro,row));
		}
		return list;
	}
	/**
	 * 将excel中的一个sheet中的信息提取为一个list对象,结束标志为某列的信息不能为空
	 * @param sheet
	 * @param start
	 * @param columnName
	 * @param clas
	 * @param pro
	 * @param doEach 用于大数据时对数据进行挨个处理
	 * @return
	 * @throws Exception
	 */
	public static <T> void sheet2list(Sheet sheet,int start,String columnName,Class<?> clas,Map<String,String> pro,DoEach<T> doEach) throws Exception
	{
		for(int i = start;;i++)
		{
			Row row = sheet.getRow(i);
			if(row==null || getCell(row,columnName)==null || getCell(row,columnName).toString().trim().equals(""))
				break;
			doEach.exec(sheet, row, pro, (T)row2obj((Class)clas,pro,row));
		}
	}
	
	/**
	 * 将excel中的一个sheet中的信息提取为一个list对象,结束标志为指定的结束行下标
	 * @param sheet
	 * @param start
	 * @param end
	 * @param clas
	 * @param pro
	 * @return
	 * @throws Exception
	 */
	public static List sheet2list(Sheet sheet,int start,int end,Class<?> clas,Map<String,String> pro) throws Exception
	{
		List list = new ArrayList();
		for(int i = start ; i <= end ; i++)
		{
			list.add(row2obj((Class)clas,pro,getRow(sheet,i)));
		}
		return list;
	}
	/**
	 * 将excel中的一行信息转为到对象中
	 * @param clas	转存的对象类型
	 * @param pro	EXCEL列和对象的属性对应
	 * @param row   EXCEL的行信息
	 * @return
	 * @throws Exception
	 */
	public  static Object row2obj(Class<T> clas,Map<String,String> pro,Row row) throws Exception
	{
		Object t = clas.newInstance();
		Iterator<Map.Entry<String,String>> ite = pro.entrySet().iterator();
		while(ite.hasNext())
		{
			Map.Entry<String, String> entry = ite.next();
			Cell cell = POIUtil.getCell(row,entry.getKey());
			ReflectionUtil.execSetMethod(t, entry.getValue(), cell.toString());
		}
		return t;
	}
	/**
	 * 获取指定EXCEL中指定坐标的值
	 * @param workbook			操作的excel的workbook对象
	 * @param sheetIndex		操作的sheet下标
	 * @param name				坐标,例:A3
	 * @return
	 * @throws Exception
	 */
	public static String getValue(Workbook workbook,int sheetIndex,String name) throws Exception
	{
		Sheet sheet = getSheet(workbook, sheetIndex);
		Cell cell = findCellByName(sheet, name);
		return cell.toString();
	}
	/**
	 * 设置指定EXCEL中指定坐标的值
	 * @param workbook
	 * @param sheetIndex
	 * @param name
	 * @param obj
	 * @throws Exception
	 */
	public static void setValue(Workbook workbook,int sheetIndex,String name,Object obj) throws Exception
	{
		Sheet sheet = getSheet(workbook, sheetIndex);
		Cell cell = findCellByName(sheet, name);
		POIUtil.setValue(cell, obj);
	}
	/**
	 * 通过sheet对象和指定的位置,找到CELL
	 * @param sheet
	 * @param name
	 * @return
	 * @throws Exception
	 */
	public static Cell findCellByName(Sheet sheet,String name) throws Exception
	{
		NameRecord record = new NameRecord(name);
		Cell cell = getCell(getRow(sheet,record.getRow()),record.getColumn());
		return cell;
	}
	
	/**
	 * 通过下标获得workbook中的sheet,有则返回,没有则按下标为名称进行创建
	 * @param workbook		待检索的workbook对象
	 * @param index			检索的下标
	 * @return
	 */
	public static Sheet getSheet(Workbook workbook,int index)
	{
		Sheet sheet = null;
		try
		{
			sheet = workbook.getSheetAt(index);
		}catch(Exception e)
		{
		if(sheet == null)
			sheet = workbook.createSheet(String.valueOf(index));
		}
		return sheet;
	}
	
	/**
	 * 通过名称获得workbook中的sheet,有则返回,没有则按下标为名称进行创建
	 * @param workbook		待检索的workbook对象
	 * @param name			检索的名称
	 * @return
	 */
	public static Sheet getSheet(Workbook workbook,String name)
	{
		Sheet sheet = workbook.getSheet(name);
		if(sheet == null)
			sheet = workbook.createSheet(String.valueOf(name));
		return sheet;
	}
	
	/**
	 * 通过下标获得sheet中的row,有则返回,没有则创建
	 * @param sheet			待检索的sheet对象
	 * @param index			检索的下标
	 * @return
	 */
	public static Row getRow(Sheet sheet,int index)
	{
		Row row = sheet.getRow(index);
		if(row == null)
			row = sheet.createRow(index);
		return row;
	}
	
	
	/**
	 * 通过下标获得row中的cell,有则返回,没有则创建
	 * @param row			待检索的row对象
	 * @param index			检索的下标
	 * @return
	 */
	public static Cell getCell(Row row,int index)
	{
		Cell cell = row.getCell(index);
		if(cell == null)
			cell = row.createCell(index);
		return cell;
	}
	
	/**
	 * 通过列名获得row中的cell,有则返回,没有则创建
	 * @param row			待检索的row对象
	 * @param columnName	列名
	 * @return
	 * @throws Exception 
	 */
	public static Cell getCell(Row row,String columnName) throws Exception
	{
		Cell cell = row.getCell(getIndexByColumnName(columnName));
		if(cell == null)
			cell = row.createCell(getIndexByColumnName(columnName));
		return cell;
	}
	
	
	/**
	 * 将obj中的信息转存到cell中,不同类型的对象进行不同的设置
	 * @param cell		保存值的cell
	 * @param obj		待保存的对象信息
	 */
	public static void setValue(Cell cell,Object obj)
	{
		setValue(cell,obj,"yyyy-MM-dd");
	}
	/**
	 *  为cell赋值
	 * @param cell	待赋值cell对象
	 * @param obj	值
	 * @param format	日期类型的格式化方法
	 */
	public static void setValue(Cell cell,Object obj,String format)
	{
		if(obj==null)
			return;
		if(obj instanceof Date)
		{
			cell.setCellValue(DateUtil.formatDate((Date)obj, format));
		}
		else if(obj instanceof Number)
		{
			if(cell.getCellType() == Cell.CELL_TYPE_BLANK)
				cell.setCellType(Cell.CELL_TYPE_NUMERIC);
			cell.setCellValue(Double.valueOf(obj.toString()));
		}
		else if(obj instanceof Boolean)
		{
			if(cell.getCellType() == Cell.CELL_TYPE_BLANK)
				cell.setCellType(Cell.CELL_TYPE_BOOLEAN);
			cell.setCellValue((Boolean)obj);
		}
		else if(obj instanceof Calendar)
		{
			cell.setCellValue((Calendar)obj);
		}	
		else 
		{
			if(cell.getCellType() == Cell.CELL_TYPE_BLANK)
				cell.setCellType(Cell.CELL_TYPE_STRING);
			cell.setCellValue(obj.toString());
		}
	}
	//位置类
	static class NameRecord
	{
		private String regex = "([A-Z]+)([0-9]+)";
		private int column;
		private int row;
		public int getColumn() {
			return column;
		}
		public void setColumn(int column) {
			this.column = column;
		}
		public int getRow() {
			return row;
		}
		public void setRow(int row) {
			this.row = row;
		}
		public NameRecord()
		{
			this.column = 0;
			this.row = 0;
		}
		public NameRecord(String name) throws Exception
		{
			 name = name.toUpperCase();
			if(!name.matches(regex))
				throw new Exception("ClassCastException :cant cast "+name+" to NameRecord");
			Matcher matcher = Pattern.compile(regex).matcher(name);
			if(matcher.find())
			{
				String columnContent = matcher.group(1);
				String rowContent = matcher.group(2);
				this.column=getIndexByColumnName(columnContent);
				this.row = Integer.parseInt(rowContent) - 1;
			}
			
		}
	}
	
	/**
	 * 将列名转为能处理的下标,如 A -> 0,B - >1
	 * @param columnName		待转列名
	 * @return					转换后的下标
	 * @throws Exception 
	 */
	public static int getIndexByColumnName(String columnName) throws Exception
	{
		String upperName = columnName.toUpperCase();
		if(!upperName.matches(COLUMNNAMEREGEX)) 
			throw new Exception("ClassCastException :cant cast "+columnName+" to index(int)");
		String goalName = new StringBuffer(upperName).reverse().toString();
		int count = 0;
		for(int i = 0 ;i < goalName.length() ; i++)
		{
			count += ((goalName.charAt(i) - 64) * Math.pow(26, i));
		}
		return count - 1;
	}
	public static interface DoEach<T>{
		public void exec(Sheet sheet,Row row,Map<String,String> pro,T t);
	}
	                 
}

