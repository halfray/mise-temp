package com.neteast.rmp.export.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

/**
 * @描述: 导出excel服务接口
 */
public interface ExportDataExcelService {

	public byte[] getExportData(String exporterId,  Map formatMap, List fieldList, List titleList, List params, Class[] paramsTypes,String excelPath);

	public File createExportData(String exporterId,  Map formatMap, List fieldList, List titleList, List params, Class[] paramsTypes,String excelPath);
	
	public File createExportDataByCSV(String exportId, List fieldList, List params, Class[] paramsTypes,File excelFile);

	public long getExportDataCount(String exporterCountId,  List params, Class[] paramsTypes);
	
	public Class[] getParameterTypes(String exporterId);

}
