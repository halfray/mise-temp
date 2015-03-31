package com.neteast.rmp.export.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;

import com.neteast.rmp.exception.BusinessException;

/**
 * @描述: execel导出工具类
 */
public class ExportExcelUtil {

	public static String PERCENT_FORMAT = "0.00%";
	public static String FLOAT_FORMAT = "#,##0.00";
	public static String INTEGER_FORMAT = "#,##0";
	public static String DATE_FORMAT_YYYY_MM_DD = "YYYY-MM-DD";

	public final static SimpleDateFormat DATE_FORMAT_YYYYMMDDHH24MISS = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 创建导出的xls文件
	 *
	 */
	public static File convertObjListIntoExcelByFile(List data, Map formatMap, List fields, List titleLine,String excelPath) {

		FileOutputStream fos = null;
		File tempFile = null;
		String path = null;
		HSSFWorkbook wb;
		try {
			path = excelPath+getSystemTime()+".xls";
			tempFile = new File(path);
//			tempFile = File.createTempFile(getSystemTime(), ".xls");
			fos = new FileOutputStream(tempFile);
			wb = new HSSFWorkbook();
			
			HSSFSheet sheet = wb.createSheet();
			createTitleRow(sheet, titleLine);
			for (int i = 1; i <= data.size(); i++) {
				Object bean = (Object) data.get(i - 1);
				HSSFRow row = sheet.createRow(i);
				for (int j = 0; j < fields.size(); j++) {
					Object value = PropertyUtils.getProperty(bean, (String) fields.get(j));
					HSSFCell cell = row.createCell(j);
					setCellValue(wb, cell, value);
					if (formatMap != null) {
						Object format = formatMap.get((String) fields.get(j));
						if (format != null) {
							cell.setCellStyle(getCellStyleByCellFormat((String) format, wb));
						}
					}
				}
			}
			wb.write(fos);
			
		} catch (Exception e) {
			throw new BusinessException("读取Excel处理有误", e);
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return tempFile;

	}
	
	public static byte[] convertObjListIntoExcel(List data, Map formatMap, List fields, List titleLine,String excelPath) {

		FileInputStream fis = null;
		FileOutputStream fos = null;
		File tempFile = null;
		String path = null;
		HSSFWorkbook wb;
		try {
			path = excelPath+getSystemTime()+".xls";
			tempFile = new File(path);
			fos = new FileOutputStream(tempFile);
			wb = new HSSFWorkbook();
			return exportObjListData(data, formatMap, fields, titleLine, fis, fos, tempFile, wb);
		} catch (Exception e) {
			throw new BusinessException("读取Excel处理有误", e);
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}

			if (tempFile.exists()) {
				tempFile.delete();
			}
		}

	}

	public byte[] exportExcel(List data, List titleLine) throws Exception {
		FileInputStream fis = null;
		FileOutputStream fos = null;
		File tempFile = null;
		HSSFWorkbook wb;

		tempFile = File.createTempFile(getSystemTime(), ".xls");
		fos = new FileOutputStream(tempFile);
		wb = new HSSFWorkbook();
		byte[] bytes = null;
		HSSFSheet sheet = wb.createSheet();
		createTitleRow(sheet, titleLine);
		for (int i = 1; i <= data.size(); i++) {
			HSSFRow row = sheet.createRow(i);
			List subList = (List) data.get(i - 1);
			for (int j = 0; j < subList.size(); j++) {
				HSSFCell cell = row.createCell(j);
				setCellValue(wb, cell, subList.get(j));
			}
		}
		wb.write(fos);
		fis = new FileInputStream(tempFile);
		bytes = new byte[fis.available()];
		fis.read(bytes);
		return bytes;
	}

	private static byte[] exportObjListData(List data, Map formatMap, List propertyNames, List titleLine, FileInputStream fis, FileOutputStream fos, File tempFile, HSSFWorkbook wb) throws Exception {
		byte[] bytes = null;
		HSSFSheet sheet = wb.createSheet();
		createTitleRow(sheet, titleLine);
		for (int i = 1; i <= data.size(); i++) {
			Object bean = (Object) data.get(i - 1);
			HSSFRow row = sheet.createRow(i);
			for (int j = 0; j < propertyNames.size(); j++) {
				Object value = PropertyUtils.getProperty(bean, (String) propertyNames.get(j));
				HSSFCell cell = row.createCell(j);
				setCellValue(wb, cell, value);
				if (formatMap != null) {
					Object format = formatMap.get((String) propertyNames.get(j));
					if (format != null) {
						cell.setCellStyle(getCellStyleByCellFormat((String) format, wb));
					}
				}
			}
		}

		wb.write(fos);
		fis = new FileInputStream(tempFile);
		bytes = new byte[fis.available()];
		fis.read(bytes);

		return bytes;
	}

	/**
	 * 创建标题行
	 * 
	 * @param sheet
	 * @param titleLine
	 */
	private static void createTitleRow(HSSFSheet sheet, List titleLine) {
		HSSFRow titleRow = sheet.createRow(0);
		HSSFCellStyle alignCenterStyle = getAlignCenterStyle(sheet.getWorkbook());
		for (int i = 0; i < titleLine.size(); i++) {
			sheet.setColumnWidth(i, 20 * 256);
			HSSFCell cell = titleRow.createCell(i);
			cell.setCellStyle(alignCenterStyle);
			cell.setCellValue((String) titleLine.get(i));
		}
	}

	/**
	 * 得到Excel文件的sheet页名称
	 * 
	 * @param excelilePath
	 * @return
	 * @throws Exception
	 */
	public static List getExcelSheetNames(String exceFlilePath) {
		HSSFWorkbook bookTemplate;
		FileInputStream inStream = null;
		try {
			if (exceFlilePath == null || "".equals(exceFlilePath)) {
				throw new BusinessException("模板文件为空");
			}
			inStream = new FileInputStream(exceFlilePath);
			bookTemplate = new HSSFWorkbook(new POIFSFileSystem(inStream));
			List templtSheetNames = new ArrayList();
			for (int i = 0; i < bookTemplate.getNumberOfSheets(); i++) {
				templtSheetNames.add(bookTemplate.getSheetName(i));
			}
			return templtSheetNames;
		} catch (Exception e) {
			e.printStackTrace();
			throw new BusinessException("Excel文件未找到");
		} finally {
			try {
				inStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}
	}

	/**
	 * 根据Excel模板将ListData转换成Excel文件
	 * 
	 * @param templateFilePath
	 * @param outFilePath
	 * @param propertyNames
	 * @param sheetDataList
	 * @throws Exception
	 */
	public static void convertObjListIntoExcelByTemplate(int startRowIndex, int startColIndex, String templateFilePath, String outFilePath, List propertyNames, List sheetDataList, List otherSheetDataList, List otherSheetDataListPosition)
			throws Exception {
		HSSFSheet sheetTemplt;
		HSSFRow row;
		HSSFCell cell;
		HSSFWorkbook bookTemplate;
		FileInputStream inStream = null;
		FileOutputStream outStream = null;
		List sheetData;
		Object rowData;
		Object cellValue;
		try {
			// 读取模板book
			inStream = new FileInputStream(templateFilePath);
			bookTemplate = new HSSFWorkbook(new POIFSFileSystem(inStream));
			// 检查数据的sheet数量是否符合模板
			if (sheetDataList.size() != bookTemplate.getNumberOfSheets()) {
				throw new BusinessException("传入数据sheet页数与模板不符" + "传入数据的页数：" + sheetDataList.size() + "模板页数：" + bookTemplate.getNumberOfSheets());
			}
			for (int sheetDataIndex = 0; sheetDataIndex < sheetDataList.size(); sheetDataIndex++) {
				sheetData = (List) sheetDataList.get(sheetDataIndex);
				// 得模板sheet
				sheetTemplt = bookTemplate.getSheetAt(sheetDataIndex);
				for (int rowDataIndex = 0; rowDataIndex < sheetData.size(); rowDataIndex++) {
					rowData = sheetData.get(rowDataIndex);
					row = sheetTemplt.getRow(startRowIndex);
					row = row == null ? sheetTemplt.createRow(startRowIndex) : row;
					for (int colDataIndex = startColIndex; colDataIndex < propertyNames.size() + startColIndex; colDataIndex++) {
						cellValue = PropertyUtils.getProperty(rowData, propertyNames.get(colDataIndex - startColIndex).toString());
						cell = row.getCell(colDataIndex);
						setCellValue(bookTemplate, cell, cellValue);
					}
					startRowIndex++;
				}
			}

			if (otherSheetDataList != null) {
				List sheetDataPosition;
				Map otherSheetDataMap;
				for (int otherSheetDataIndex = 0; otherSheetDataIndex < otherSheetDataList.size(); otherSheetDataIndex++) {
					otherSheetDataMap = (Map) otherSheetDataList.get(otherSheetDataIndex);
					// 数据安放位置
					sheetDataPosition = (List) otherSheetDataListPosition.get(otherSheetDataIndex);
					// 得模板sheet
					sheetTemplt = bookTemplate.getSheetAt(otherSheetDataIndex);
					Map sheetDataPositionMap;
					for (int rowDataIndex = 0; rowDataIndex < sheetDataPosition.size(); rowDataIndex++) {
						sheetDataPositionMap = (Map) sheetDataPosition.get(rowDataIndex);
						String integer = sheetDataPositionMap.get("rowNum").toString();
						row = sheetTemplt.getRow(Integer.parseInt(integer) - 1);
						row = row == null ? sheetTemplt.createRow(((Integer) sheetDataPositionMap.get("rowNum")).intValue()) : row;
						cell = row.getCell(Integer.parseInt(sheetDataPositionMap.get("colNum").toString()));
						String keyValue = sheetDataPositionMap.get("keyValue").toString();
						setCellValue(bookTemplate, cell, otherSheetDataMap == null ? "" : otherSheetDataMap.get(keyValue));
					}
				}
			}
			outStream = new FileOutputStream(outFilePath);
			bookTemplate.write(outStream);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (outStream != null) {
				outStream.close();
			}
			if (inStream != null) {
				inStream.close();
			}
		}
	}

	/**
	 * 写入单元格数据
	 * 
	 * @param cell
	 * @param data
	 */
	private static void setCellValue(HSSFWorkbook workBook, HSSFCell cell, Object data) {
		boolean isInteger = true;
		if (data == null) {
			cell.setCellType(HSSFCell.CELL_TYPE_BLANK);
			return;
		}
		HSSFCellStyle numberStyle ;
		if (data instanceof Number) {
			if (data instanceof Integer) {
				isInteger = true;
				Integer value = (Integer) data;
				cell.setCellValue(value.intValue());
			} else if (data instanceof Long) {
				isInteger = true;
				Long value = (Long) data;
				cell.setCellValue(value.longValue());
			} else if (data instanceof Float) {
				isInteger = false;
				Float value = (Float) data;
				cell.setCellValue(value.floatValue());
			} else if (data instanceof Double) {
				isInteger = false;
				Double value = (Double) data;
				cell.setCellValue(value.doubleValue());
			} else if (data instanceof BigDecimal) {
				isInteger = false;
				BigDecimal value = (BigDecimal) data;
				cell.setCellValue(value.doubleValue());
			}
			if (!isInteger) {
				numberStyle = getCellStyleByCellFormat(FLOAT_FORMAT, workBook);
				cell.setCellStyle(numberStyle);
			}
			if (isInteger) {
				numberStyle = getCellStyleByCellFormat(INTEGER_FORMAT, workBook);
				cell.setCellStyle(numberStyle);
			}
		} else if (data instanceof String) {
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			String value = data.toString().trim();
			cell.setCellValue(value);
		} else if (data instanceof Date) {
			Date d = (Date) data;
			cell.setCellValue(sdf.format(d));
		} else {
			cell.setCellType(HSSFCell.CELL_TYPE_BLANK);
		}
	}

	/**
	 * 取得居中对齐style
	 * 
	 * @param wb workbook
	 * @return style
	 */
	public static HSSFCellStyle getAlignCenterStyle(HSSFWorkbook wb) {
		HSSFCellStyle style = wb.createCellStyle();
		style.setAlignment(CellStyle.ALIGN_CENTER);
		return style;
	}

	public static HSSFCellStyle getCellStyleByCellFormat(String cellFormat, HSSFWorkbook wb) {
		HSSFCellStyle style = wb.createCellStyle();
		style.setDataFormat(HSSFDataFormat.getBuiltinFormat(cellFormat));
		return style;
	}

	/**
	 * 取得日期style
	 * 
	 * @param wb workbook
	 * @param fmt format
	 * @return style
	 */
	public static HSSFCellStyle getDateStyle(HSSFWorkbook wb, String fmt) {
		HSSFCellStyle style = wb.createCellStyle();
		CreationHelper helper = wb.getCreationHelper();
		style.setDataFormat(helper.createDataFormat().getFormat(fmt));
		return style;
	}

	/**
	 * 取得首行title style
	 * 
	 * @param wb workbook
	 * @return style
	 */
	public static HSSFCellStyle getTitleStyle(HSSFWorkbook wb) {
		HSSFCellStyle style = wb.createCellStyle();
		short titleBackGroundColor = 64;
		style.setFillBackgroundColor(titleBackGroundColor);
		return style;
	}

	public static String getSystemTime() {
		String path=DATE_FORMAT_YYYYMMDDHH24MISS.format(Calendar.getInstance().getTime());
		return path;
	}

}
