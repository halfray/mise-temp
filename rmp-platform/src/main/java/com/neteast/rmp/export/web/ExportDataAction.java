package com.neteast.rmp.export.web;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.neteast.rmp.export.service.ExportDataExcelService;
import com.neteast.rmp.export.util.CSVUtils;
import com.neteast.rmp.export.util.FileUtils;
import com.neteast.rmp.export.util.JsonUtil;
import com.opensymphony.xwork2.ActionSupport;

public class ExportDataAction extends ActionSupport{

	private static final long serialVersionUID = -4772375266742569219L;

	public static final String CHARSET_UTF_8 = "UTF-8";
	
	private ExportDataExcelService exportDataExcelService;
	
	private String params; // 参数

	private String fields; // 文件属性

	private String titles; // 文件表头

	private String fileName; // 文件名称

	private String exporterId; //导出数据列表
	
	private String exporterCountId ; //导出数据总数
	
	private JSON jsonObject ; // 返回值
	
	private String filePath ; // 生成文件后文件下载地址

	private String formatMapStr;

	private String exportPath = "E:/export/";
	
	private String maxResultsStr = "5000";
	
	public void setFormatMapStr(String formatMapStr) {
		this.formatMapStr = formatMapStr;
	}

	/**
	 * 创建CSV
	 * @author 赫振军
	 * @date 2013-07-20
	 *
	 */

	public String createExportCSVData() {
		File csvFile = new File(exportPath,System.currentTimeMillis()+".csv") ;
		List titleList = getListFromJson(this.getTitles());
		List fieldList = getListFromJson(this.getFields());
		Map formatMap = getFormatMapFromJson(this.formatMapStr);
		Map map = JsonUtil.convertJsonParamsToMap(this.getParams());
		try {
			this.params = JsonUtil.getJSONString(map);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			Class[] paramsTypes = exportDataExcelService.getParameterTypes(this.getExporterId());
			List paramList = convertJsonParamsToList(this.params, paramsTypes);
			
			//分页获取数据
			long count = exportDataExcelService.getExportDataCount( this.getExporterCountId() , paramList , paramsTypes ) ; //需要导出的总数
			int maxResultsNum = maxResultsStr.equals( "" ) ? 5000 : Math.max( Integer.valueOf( maxResultsStr ).intValue() , 5000 );  //每次查询的条数
			
			CSVUtils.writerHeaderDataToCsv( csvFile , (String[])titleList.toArray(new String[]{}) ); //生成csv头信息
			
			for( int i = 0 , cycle = (int)(count/maxResultsNum) ; i <= cycle ; i++ ){
				for( int c = 0 ; c < paramList.size() ; c++ ){
					((JSONObject)paramList.get( c )).put( "start" , i*maxResultsNum );
					((JSONObject)paramList.get( c )).put( "fetchSize" , maxResultsNum );
				}
				exportDataExcelService.createExportDataByCSV(this.getExporterId(), fieldList, paramList, paramsTypes,csvFile);
				break;
			}
			if( null == csvFile){
				throw new Exception("生成csv文件失败");
			}else{
				setResult(Boolean.TRUE , csvFile.getPath() ) ;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			setResult(Boolean.FALSE , "生成csv文件发生异常" ) ;
		}
		return SUCCESS;
	}
	/**
	 * 执行下载csv的方法
	 * @author 赫振军
	 * @date 2013-07-20
	 */
	public String doDownloadExportCSVData(){
		try{
			if(filePath == null || "".equals(filePath)){
				throw new Exception("生成csv文件失败");
			}
			final File downFile = new File(filePath);
			
			FileUtils.downFile( ServletActionContext.getResponse() , this.getFileName() , new FileInputStream(downFile) ) ;
			
			final Timer timer = new Timer();
			timer.schedule( new TimerTask(){
				public void run(){
					downFile.delete();
					timer.cancel();
				}} , 1000*60*5 ) ;
		}catch(Exception e){
			setResult(Boolean.FALSE , "生成csv文件发生异常" ) ;
			e.printStackTrace();
		}
		return null ;
	}

	
	
	/**
	 * 函数功能：公共导出excel
	 * 作	者：赫振军
	 * 日	期：2013-07-20
	 * 特别说明: 数据量较小一次把数据加载到内存中
	 */
	public String exportExcel() {
		List titleList = getListFromJson(this.titles);
		List fieldList = getListFromJson(this.fields);
		Map formatMap = getFormatMapFromJson(this.formatMapStr);
		Map map = JsonUtil.convertJsonParamsToMap(this.params);
		try {
			this.params = JsonUtil.getJSONString(map);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			Class[] paramsTypes = exportDataExcelService.getParameterTypes(exporterId);
			List paramList = convertJsonParamsToList(this.params, paramsTypes);
			
			byte[] bytes = exportDataExcelService.getExportData(exporterId, formatMap, fieldList, titleList, paramList, paramsTypes,exportPath);
			FileUtils.downFile(ServletActionContext.getResponse(), fileName, new ByteArrayInputStream(bytes));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 先生成xls文件
	 *
	 */
	public String createExportExcelData() {
		File file = null ;
		List titleList = getListFromJson(this.titles);
		List fieldList = getListFromJson(this.fields);
		Map formatMap = getFormatMapFromJson(this.formatMapStr);
		Map map = JsonUtil.convertJsonParamsToMap(this.params);
		try {
			this.params = JsonUtil.getJSONString(map);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try{
			Class[] paramsTypes = exportDataExcelService.getParameterTypes(exporterId);
			List paramList = convertJsonParamsToList(this.params, paramsTypes);
			file = exportDataExcelService.createExportData(exporterId, formatMap, fieldList, titleList, paramList, paramsTypes,exportPath);
			if( null != file ){
				this.setResult( Boolean.TRUE , file.getPath() );
				return SUCCESS ;
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.setResult( Boolean.FALSE , "导出数据异常" );
		}
		return SUCCESS ;
	}
	
	/**
	 * 下载xls的方法
	 */
	public String doDownloadExportXLSData(){
		try{
			if( filePath == null || "".equals(filePath)){
				throw new Exception("生成xls文件失败");
			}
			final File downFile = new File(filePath);
			
			FileUtils.downFile( ServletActionContext.getResponse() , this.getFileName() , new FileInputStream(downFile) ) ;
			
			final Timer timer = new Timer();
			timer.schedule( new TimerTask(){
				public void run(){
					downFile.delete();
					timer.cancel();
				}} , 1000*60*5 ) ;
		}catch(Exception e){
			setResult(Boolean.FALSE , "生成xls文件发生异常" ) ;
			e.printStackTrace();
		}
		return null ;
	}
	
	public void setResult(Boolean result, String filePath ) {
		Map resultMap = new HashMap();
		resultMap.put("success", result);
		resultMap.put("filePath", filePath);
		JSONObject json = JSONObject.fromObject(resultMap);
		setJsonObject(json);
	}
	
	/**
	 * 将json转换为FormatMap
	 * @param formatMapStr
	 * @return
	 */
	public Map getFormatMapFromJson(String formatMapStr) {
		JSONObject jsonObj = JSONObject.fromObject(formatMapStr);
		return (Map) JSONObject.toBean(jsonObj, Map.class);
	}

	public List getListFromJson(String jsonString) {
		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		List list = new ArrayList(Arrays.asList(jsonArray.toArray()));
		int i = 0;
		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			Object object = (Object) iterator.next();
			if (object instanceof JSONArray) {
				object = new ArrayList(Arrays.asList(((JSONArray) object).toArray()));
				list.set(i, object);
			}
			i++;
		}
		return list;
	}

	public List convertJsonParamsToList(String jsonParams, Class[] paramsClasses) {
		HashMap map = new HashMap();
		if (paramsClasses == null) {
			return null;
		}
		for (int i = 0; i < paramsClasses.length; i++) {
			Class parameterClass = paramsClasses[i];
			map.put(i, paramsClasses[i]);
		}
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setClassMap(map);
		JSONObject jSONObject = JSONObject.fromObject(jsonParams);
		List params = new ArrayList();
		for (int i = 0; i < paramsClasses.length; i++) {
			params.add(jSONObject.get(new Integer(i).toString()));
		}
		return params;
	}

	public String getExporterId() {
		return exporterId;
	}

	public void setExporterId(String exporterId) {
		this.exporterId = exporterId;
	}

	public String getParams() {
		return params;
	}

	public void setParams(String params) throws Exception {
		this.params = StringUtils.isEmpty(params) ? StringUtils.EMPTY : URLDecoder.decode(params, CHARSET_UTF_8);
	}

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) throws Exception {
		this.fields = StringUtils.isEmpty(fields) ? StringUtils.EMPTY : URLDecoder.decode(fields, CHARSET_UTF_8);
	}

	public String getTitles() {
		return titles;
	}

	public void setTitles(String titles) throws Exception {
		this.titles = StringUtils.isEmpty(titles) ? StringUtils.EMPTY : URLDecoder.decode(titles, CHARSET_UTF_8);
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getExportPath() {
		return exportPath;
	}

	public void setExportPath(String exportPath) {
		this.exportPath = exportPath;
	}

	public String getExporterCountId(){
	
		return exporterCountId;
	}
	
	public void setExporterCountId( String exporterCountId ){
	
		this.exporterCountId = exporterCountId;
	}
	
	public JSON getJsonObject(){
	
		return jsonObject;
	}
	
	public void setJsonObject( JSON jsonObject ){
	
		this.jsonObject = jsonObject;
	}
	
	public String getFilePath(){
	
		return filePath;
	}
	
	public void setFilePath( String filePath ){
	
		this.filePath = filePath;
	}

	public String getMaxResultsStr() {
		return maxResultsStr;
	}

	public void setMaxResultsStr(String maxResultsStr) {
		this.maxResultsStr = maxResultsStr;
	}

	public ExportDataExcelService getExportDataExcelService() {
		return exportDataExcelService;
	}

	public void setExportDataExcelService(
			ExportDataExcelService exportDataExcelService) {
		this.exportDataExcelService = exportDataExcelService;
	}
}
