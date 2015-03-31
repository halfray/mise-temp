package com.neteast.rmp.export.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.neteast.rmp.export.util.CSVUtils;
import com.neteast.rmp.export.util.ExportExcelUtil;
import com.neteast.rmp.export.util.ReflectionUtils;
import com.neteast.rmp.export.util.SpringContextHolder;

/**
 * @日期: 2010-7-22
 * @描述: 导出excel服务类
 */
public class ExportDataExcelServiceImpl implements ExportDataExcelService {

	private Log logger = LogFactory.getLog(ExportDataExcelServiceImpl.class);

	private ExportExcelConfigParser exportExcelConfigParser;
	
	/**
	 * 少量数据，通用导出excel
	 * 
	 */
	public byte[] getExportData(String exportId, Map formatMap, List fieldList, List titleList, List params, Class[] paramsTypes,String excelPath) {

		String methodTag = (String) exportExcelConfigParser.getExportMethodConfigMap().get(exportId);
		ExportExcelConfigParser.checkMethodGrammar(methodTag);

		String methodName = ExportExcelConfigParser.getMethodName(methodTag);
		String beanName = ExportExcelConfigParser.getBeanName(methodTag);
		Object bean = SpringContextHolder.getApplicationContext().getBean(beanName);

		List data = (List) ReflectionUtils.invokeMethod(bean, methodName, paramsTypes, params.toArray());
		return ExportExcelUtil.convertObjListIntoExcel(data, formatMap, fieldList, titleList,excelPath);
	}
	
	/**
	 * 生成Excel文件
	 * 
	 */
	public File createExportData(String exportId, Map formatMap, List fieldList, List titleList, List params, Class[] paramsTypes,String excelPath) {

		String methodTag = (String) exportExcelConfigParser.getExportMethodConfigMap().get(exportId);
		ExportExcelConfigParser.checkMethodGrammar(methodTag);

		String methodName = ExportExcelConfigParser.getMethodName(methodTag);//得到方法名
		String beanName = ExportExcelConfigParser.getBeanName(methodTag);//得到bean名
		
		Object bean = SpringContextHolder.getApplicationContext().getBean(beanName);
		
		//2013 分页取数,便于后期扩展
		String maxResultsStr  = "5000";
		int maxResultsNum = maxResultsStr.equals( "" ) ? 5000 : Math.max( Integer.valueOf( maxResultsStr ).intValue() , 5000 );  //每次查询的条数
		List data = new ArrayList();
		for( int c = 0 ; c < params.size() ; c++ ){
			
			JSONObject temp = ((JSONObject)params.get( c ));
			temp.put( "sort" , temp.get( "sort" ) == null ? "1" : temp.get( "sort" ) ) ;
			
			for( int j = 0 ; true ; j++ ){
				((JSONObject)params.get( c )).put( "firstResult" , j*maxResultsNum );
				((JSONObject)params.get( c )).put( "maxResults" , maxResultsNum );
				List tempData = (List) ReflectionUtils.invokeMethod(bean, methodName, paramsTypes, params.toArray());
				if( null != tempData && tempData.size() == maxResultsNum){
					data.addAll( tempData );
					continue ;
				}else if(tempData.size() > 0 && tempData.size() != maxResultsNum){
					data.addAll( tempData );
					break ;
				}else{
					break ;
				}
			}
		}
		
		return ExportExcelUtil.convertObjListIntoExcelByFile(data, formatMap, fieldList, titleList,excelPath);
	}

	/**
	 * 生成CSV文件
	 * 
	 */
	public File createExportDataByCSV( String exportId , List fieldList , List params , Class[] paramsTypes , File excelFile ){

		String methodTag = (String) exportExcelConfigParser.getExportMethodConfigMap().get(exportId);
		ExportExcelConfigParser.checkMethodGrammar(methodTag);

		String methodName = ExportExcelConfigParser.getMethodName(methodTag);
		String beanName = ExportExcelConfigParser.getBeanName(methodTag);
		Object bean = SpringContextHolder.getApplicationContext().getBean(beanName);

		List data = (List) ReflectionUtils.invokeMethod(bean, methodName, paramsTypes, params.toArray());
		List values = convertData(data,fieldList);
		
		return CSVUtils.writerContentDataToCsv( excelFile , values , true ) ;
	}
	/**
	 * 获取数据总数
	 */
	public long getExportDataCount( String exporterCountId , List params , Class[] paramsTypes ){

		String methodTag = (String) exportExcelConfigParser.getExportMethodConfigMap().get(exporterCountId);
		ExportExcelConfigParser.checkMethodGrammar(methodTag);
		String methodName = ExportExcelConfigParser.getMethodName(methodTag);
		String beanName = ExportExcelConfigParser.getBeanName(methodTag);
		Object bean = SpringContextHolder.getApplicationContext().getBean(beanName);
		Object obj = ReflectionUtils.invokeMethod(bean, methodName, paramsTypes, params.toArray());
		
		return null == obj ? 0 : ((Integer)obj);
	}
	/**
	 * 将List<Map>转为List<String[]>   按顺序
	 * @param data
	 * @param fieldList
	 * @return
	 *
	 */
	private List<String[]> convertData(List data , List fieldList){
		List <String[]> list = null ;
		try{
			if( null != data && null != fieldList && !data.isEmpty() && !fieldList.isEmpty()){
				list = new ArrayList<String []>();
				for( int i = 0 ; i < data.size() ; i++ ){
					Object bean = data.get( i ) ;
					int size = fieldList.size();
					String temp [] = new String[size];
					for( int c = 0 ; c < size  ; c++ ){
						Object value = PropertyUtils.getProperty(bean, (String) fieldList.get(c));
						String valueStr = this.convertObjectToString( value ) ; 
						temp[c] = valueStr ;
					}
					list.add( temp ) ;
				}
				data.clear() ;
			}
		}catch(Exception e){
			System.out.println("数据转换失败:"+this.getClass().getCanonicalName());
			e.printStackTrace();
		}
		return list ;
	}
	
	/**
	 * 转换对象为string
	 */
	public static String convertObjectToString( Object obj ){

		if( null == obj ) return "";
		return obj.toString().trim();
	}
	

	public Class[] getParameterTypes(String exportId) {
		String methodTag = (String) exportExcelConfigParser.getExportMethodConfigMap().get(exportId);
		return exportExcelConfigParser.getParameterTypes(methodTag);
	}

	public void setExportExcelConfigParser(ExportExcelConfigParser exportExcelConfigParser) {
		this.exportExcelConfigParser = exportExcelConfigParser;
	}
}
