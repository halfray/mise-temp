package com.neteast.rmp.web.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;

import com.neteast.rmp.web.util.POIUtil.DoEach;


public class UExcel 
{
	private Workbook workbook = null;
	private String dateFormat = "yyyy-MM-dd";
	
	public UExcel()
	{
		workbook = new HSSFWorkbook();
	}
	public UExcel(InputStream input) throws IOException
	{
		workbook = new HSSFWorkbook(input);
	}
	public UExcel(File file) throws FileNotFoundException, IOException
	{
		workbook = new HSSFWorkbook(new FileInputStream(file));
	}
	public UExcel(String path) throws FileNotFoundException, IOException
	{
			this(new File(path));
	}
	
	/**
	 * 获取sheet的方法
	 * @param index		sheet所在下标
	 * @return
	 */
	public Sheet getSheet(int index)
	{
		try
		{
			if(workbook.getSheetAt(index)!=null)
			return workbook.getSheetAt(index);
		}catch(IllegalArgumentException e)
		{
			return workbook.createSheet();
		}
		return workbook.createSheet();
	}
	
	/**
	 * 获取sheet方法
	 * @param name	sheet名称
	 * @return
	 */
	public Sheet getSheet(String name)
	{
		if(workbook.getSheet(name)!=null)
			return workbook.getSheet(name);
		else
			return workbook.createSheet(name);
	}
	
	/**
	 * 获取row 方法
	 * @param sheetIndex	行所在sheet的下标
	 * @param rowIndex		行的下标
	 * @return
	 */
	public Row getRow(int sheetIndex,int rowIndex)
	{
		return POIUtil.getRow(this.getSheet(sheetIndex), rowIndex);
	}
	
	/**
	 * 获取row 方法
	 * @param sheetName 	行所在sheet的名称
	 * @param rowIndex		行的下标
	 * @return
	 */
	public Row getRow(String sheetName,int rowIndex)
	{
		return POIUtil.getRow(this.getSheet(sheetName), rowIndex);
	}
	
	/**
	 * 获取cell方法
	 * @param sheetIndex	所在sheet的下标
	 * @param rowIndex		所在row的下标
	 * @param columnIndex	所在column的下标
	 * @return
	 */
	public Cell getCell(int sheetIndex ,int rowIndex,int columnIndex)
	{
		return POIUtil.getCell(getRow(sheetIndex,rowIndex), columnIndex);
	}
	
	/**
	 * 获取cell方法
	 * @param sheetIndex	所在sheet的名称
	 * @param rowIndex		所在row的下标
	 * @param columnIndex	所在column的下标
	 * @return
	 */
	public Cell getCell(String sheetName ,int rowIndex,int columnIndex)
	{
		return POIUtil.getCell(getRow(sheetName,rowIndex), columnIndex);
	}
	
	/**
	 * 获取cell方法
	 * @param sheetIndex	所在sheet的下标
	 * @param cellIndex		cell的坐标,如: A3
	 * @return
	 * @throws Exception
	 */
	public Cell getCell(int sheetIndex,String cellIndex) throws Exception
	{
		return POIUtil.findCellByName(this.getSheet(sheetIndex), cellIndex);
	}
	
	/**
	 * 获取cell方法
	 * @param sheetIndex	所在sheet的名称
	 * @param cellIndex		cell的坐标,如: A3
	 * @return
	 * @throws Exception
	 */
	public Cell getCell(String sheetName,String cellIndex) throws Exception
	{
		return POIUtil.findCellByName(this.getSheet(sheetName), cellIndex);
	}
	
	
	/**
	 * 获取单元格值的方法
	 * @param sheetIndex	所在sheet的下标
	 * @param rowIndex		所在row的下标
	 * @param columnIndex	所在column的下标
	 * @return
	 */
	public String getValue(int sheetIndex,int rowIndex,int columnIndex)
	{
		return this.getCell(sheetIndex, rowIndex,columnIndex).toString();
	}
	
	/**
	 * 获取单元格值的方法
	 * @param sheetIndex	所在sheet的下标
	 * @param rowIndex		所在row的下标
	 * @param columnIndex	所在column的下标
	 * @return
	 */
	public String getValue(String sheetIndex,int rowIndex,int columnIndex)
	{
		return this.getCell(sheetIndex, rowIndex, columnIndex).toString();
	}
	
	/**
	 * 获取单元格值的方法
	 * @param sheetIndex	所在sheet的下标
	 * @param cellIndex		单元格所在的坐标 如: A3
	 * @return
	 */
	public String getValue(int sheetIndex,String cellIndex) throws Exception
	{
		return this.getCell(sheetIndex, cellIndex).toString();
	}
	
	/**
	 * 获取单元格值的方法
	 * @param sheetName 	所在sheet的名称
	 * @param cellIndex		单元格所在的坐标 如: A3
	 * @return
	 */
	public String getValue(String sheetName,String cellIndex) throws Exception
	{
		return this.getCell(sheetName, cellIndex).toString();
	}
	
	
	/**
	 * 为cell赋值
	 * @param cell		单元格所在cell
	 * @param obj		保存的对象信息
	 */
	public void setValue(Cell cell,Object obj)
	{
		POIUtil.setValue(cell, obj,this.dateFormat);
	}
	
	/**
	 * 为单元格赋值的方法
	 * @param sheetIndex	所在sheet的下标
	 * @param rowIndex		所在row的下标
	 * @param columnIndex   所在column的下标
	 * @param obj			保存的对象信息
	 */
	public void setValue(int sheetIndex,int rowIndex,int columnIndex,Object obj)
	{
		this.setValue(this.getCell(sheetIndex, rowIndex, columnIndex), obj);
	}
	
	/**
	 * 为单元格赋值的方法
	 * @param sheetName		所在sheet的名称
	 * @param rowIndex		所在row的下标
	 * @param columnIndex   所在column的下标
	 * @param obj			保存的对象信息
	 */
	public void setValue(String sheetName,int rowIndex,int columnIndex,Object obj)
	{
		this.setValue(this.getCell(sheetName, rowIndex, columnIndex), obj);
	}
	
	/**
	 * 为单元格赋值的方法
	 * @param sheetIndex	所在sheet的下标
	 * @param cellIndex		单元格所在的坐标 如: A3
	 * @param obj			保存的对象信息
	 */
	public void setValue(int sheetIndex,String cellIndex,Object obj) throws Exception
	{
		this.setValue(this.getCell(sheetIndex, cellIndex), obj);
	}
	
	/**
	 * 为单元格赋值的方法
	 * @param sheetName		所在sheet的名称
	 * @param cellIndex		单元格所在的坐标 如: A3
	 * @param obj			保存的对象信息
	 */
	public void setValue(String sheetName,String cellIndex,Object obj) throws Exception
	{
		this.setValue(this.getCell(sheetName, cellIndex), obj);
	}
	
	/**
	 * 用对象列表中的信息填充sheet
	 * @param sheet		待填充list
	 * @param rowStart	开始行下标
	 * @param list		用于填充的list
	 * @param pro		填充配置信息
	 * @throws Exception
	 */
	public void setList(Sheet sheet ,int rowStart,List list,Map<String,String> pro) throws Exception
	{
		POIUtil.list2sheet(sheet, rowStart, list, pro,this.dateFormat);
	}
	
	
	/**
	 * 将对象中的信息放到EXCEL中
	 * @param sheetIndex	保存信息的sheet所在下标
	 * @param rowStart		保存信息的开始row下标 
	 * @param list			待保存的对象列表信息
	 * @param pro			保存对象的属性和EXCEL列配置信息,key:列名,value:对象属性
	 * @throws Exception
	 */
	public void setList(int sheetIndex,int rowStart,List list,Map<String,String> pro) throws Exception
	{
		Sheet sheet = this.getSheet(sheetIndex);
		this.setList(sheet,rowStart, list, pro);
	}
	
	public static <T>  List<T> getList(Sheet sheet,int start ,int end ,Class<T> clas,Map<String,String> pro) throws Exception
	{
		return POIUtil.sheet2list(sheet, start, end, clas, pro);
	}
	
	public static <T>  List<T> getList(Sheet sheet,int start ,String columnName ,Class<T> clas,Map<String,String> pro) throws Exception
	{
		return POIUtil.sheet2list(sheet, start, columnName, clas, pro);
	}
	public static <T>  void forEach(Sheet sheet,int start ,String columnName ,Class<T> clas,Map<String,String> pro,DoEach doeach) throws Exception
	{
		POIUtil.sheet2list(sheet, start, columnName, clas, pro,doeach);
	}
	
	/**
	 * 将excel中的行信息转换为对象信息,指定开始行rowStart,和结束行rowEnd
	 * @param <T>
	 * @param sheetIndex	sheet所在下标
	 * @param start			开始行
	 * @param end			结束行
	 * @param clas			转换后的对象类型
	 * @param pro			转换配置 key:列名 - A,value:对象属性 - name
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> getList(int sheetIndex,int start,int end,Class<T> clas,Map<String,String> pro) throws Exception
	{
		Sheet sheet = POIUtil.getSheet(workbook,sheetIndex);
		return getList(sheet, start, end, clas, pro);
	}
	
	/**
	 * 将excel中的行信息转换为对象信息,指定开始行和不允许为空的列
	 * @param <T>
	 * @param sheetIndex	sheet所在下标
	 * @param start			开始行
	 * @param columnName	不允许为空的列值
	 * @param clas			转换后的对象类型
	 * @param pro			转换配置 key:列名 - A,value:对象属性 - name
	 * @return
	 * @throws Exception
	 */
	public <T> List<T> getList(int sheetIndex,int start,String columnName,Class<T> clas,Map<String,String> pro) throws Exception
	{
		Sheet sheet = POIUtil.getSheet(workbook,sheetIndex);
		return getList(sheet, start, columnName, clas, pro);
	}
	/**
	 * 将excel中的行信息转换为对象信息,指定开始行和不允许为空的列
	 * @param <T>
	 * @param sheetIndex	sheet所在下标
	 * @param start			开始行
	 * @param columnName	不允许为空的列值
	 * @param clas			转换后的对象类型
	 * @param pro			转换配置 key:列名 - A,value:对象属性 - name
	 * @return
	 * @throws Exception
	 */
	public <T> void forEach(int sheetIndex,int start,String columnName,Class<T> clas,Map<String,String> pro,DoEach<T> doEach) throws Exception
	{
		Sheet sheet = POIUtil.getSheet(workbook,sheetIndex);
		forEach(sheet, start, columnName, clas, pro,doEach);
	}
	

	/**
	 * 获取字体
	 * @return
	 */
	public Font getFont()
	{
		return workbook.createFont();
	}
	
	/**
	 * 获取样式
	 * @return
	 */
	public CellStyle getStyle()
	{
		return workbook.createCellStyle();
	}
	
	/**
	 * 为sheet设置样式
	 * @param sheet		sheet
	 * @param startRow	开始行
	 * @param endRow	结束行
	 * @param startCol	开始列
	 * @param endCol	结束列
	 * @param style		样式
	 */
	public void setStyle(Sheet sheet,int startRow,int endRow,int startCol,int endCol,CellStyle style)
	{
		for(int i = startRow;i <= endRow;i++)
		{
			for(int j = startCol; j <= endCol ; j++)
			{
				Cell cell = POIUtil.getCell(POIUtil.getRow(sheet, i),j);
				cell.setCellStyle(style);
			}
		}
	}
	
	/**
	 * 为sheet设置样式
	 * @param sheetIndex sheet所在下标
	 * @param startRow	开始行
	 * @param endRow	结束行
	 * @param startCol	开始列
	 * @param endCol	结束列
	 * @param style		样式
	 */
	public void setStyle(int sheetIndex,int startRow,int endRow,int startCol,int endCol,CellStyle style)
	{
		setStyle(getSheet(sheetIndex),startRow,endRow,startCol,endCol,style);
	}
	public void setDefaultColumnStyle(int sheetIndex,int columnIndex,CellStyle style )
	{
		getSheet(sheetIndex).setDefaultColumnStyle(columnIndex, style);
	}
	/**
	 * 合并sheet中的单元格
	 * @param sheet		sheet
	 * @param startRow	开始行
	 * @param endRow	结束行
	 * @param startCol	开始列
	 * @param endCol	结束列
	 */
	public void merge(Sheet sheet,int startRow,int endRow,int startCol,int endCol)
	{
		sheet.addMergedRegion(new CellRangeAddress(
				startRow, 	//first row (0-based)
				endRow , 	//last row  (0-based)
				startCol, 	//first column (0-based)
				endCol  	//last column  (0-based)
	    ));
	}
	
	
	/**
	 * 合并sheet中的单元格
	 * @param sheetIndex sheet所在下标
	 * @param startRow	开始行
	 * @param endRow	结束行
	 * @param startCol	开始列
	 * @param endCol	结束列
	 */
	public void merge(int sheetIndex,int startRow,int endRow,int startCol,int endCol)
	{
		merge(getSheet(sheetIndex),startRow,endRow,startCol,endCol);
	}
	
	/**
	 * @param sheetIndex sheet 下标
	 * @param columnIndex	列下标
	 * @param width			宽度
	 */
	public void setColumnWidth(int sheetIndex ,int columnIndex,int width)
	{
		getSheet(sheetIndex).setColumnWidth(columnIndex, width);
	}
	
	public DataFormat createDataFormat()
	{
		return workbook.createDataFormat();
	}
	public short getFormat(String format)
	{
		return createDataFormat().getFormat(format);
	}
	public String getFormat(short format)
	{
		return createDataFormat().getFormat(format);
	}
	/**
	 * 更改sheet的名称
	 * @param sheetIndex	下标,从0开始
	 * @param name			名称
	 */
	public void setSheetName(int sheetIndex,String name)
	{
		workbook.setSheetName(sheetIndex, name);
	}
	
	/**
	 * 将该excel信息输出到输出流中
	 * @param out			待输出的输出流
	 * @throws IOException
	 */
	public void write(OutputStream out) throws IOException
	{
		workbook.write(out);
	}
	
	/**
	 * 将该excel信息输出到指定文件中
	 * @param file			待输出的文件
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public void write(File file) throws FileNotFoundException, IOException
	{
		FileOutputStream out  = null;
		try
		{
			if(!file.exists())
				FileUtil.mkFile(file.getAbsolutePath());
			out = new FileOutputStream(file); 
			write(out);
		}finally
		{
			if(out!=null)
				out.close();
		}
	}
	
	/**
	 * 将该excel信息输出到指定路径中
	 * @param file			待输出的文件路径
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public void write(String path) throws FileNotFoundException, IOException
	{
		write(new File(path));
	}
	public String getDateFormat() {
		return dateFormat;
	}
	public void setDateFormat(String dateFormat) {
		this.dateFormat = dateFormat;
	}
	public Workbook getWorkbook() {
		return workbook;
	}
	public void setWorkbook(Workbook workbook) {
		this.workbook = workbook;
	}
	
	public static void main(String[] args) throws Exception {
		UExcel uExcel = new UExcel();
		uExcel.setValue(0, "A1", "如果这是中文怎么办");
		uExcel.setValue(0, "B1", "123455adfasd324");
		uExcel.getSheet(0).autoSizeColumn(0);
		uExcel.getSheet(0).autoSizeColumn(1);
		uExcel.write("E:"+File.separator+"abc.xls");
	}
}
