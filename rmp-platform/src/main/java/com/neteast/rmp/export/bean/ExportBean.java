package com.neteast.rmp.export.bean;

import net.sf.json.JSON;

import com.seraph.model.anychart.base.Action;

public class ExportBean extends Action{

	private static final long serialVersionUID = -4772375266742569219L;

	public static final String CHARSET_UTF_8 = "UTF-8";

	private String params;

	private String fields;

	private String titles;

	private String fileName;

	private String exporterId;
	
	private String exporterCountId ; //20130111 mengfanyu 导出数据总数
	
	private JSON jsonObject ; //20130111 mengfanyu 回值
	
	private String filePath ; //20130114 mengfanyu 下载文件地址

	private String formatMapStr;

	private String excelPath;

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}

	public String getFields() {
		return fields;
	}

	public void setFields(String fields) {
		this.fields = fields;
	}

	public String getTitles() {
		return titles;
	}

	public void setTitles(String titles) {
		this.titles = titles;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getExporterId() {
		return exporterId;
	}

	public void setExporterId(String exporterId) {
		this.exporterId = exporterId;
	}

	public String getExporterCountId() {
		return exporterCountId;
	}

	public void setExporterCountId(String exporterCountId) {
		this.exporterCountId = exporterCountId;
	}

	public JSON getJsonObject() {
		return jsonObject;
	}

	public void setJsonObject(JSON jsonObject) {
		this.jsonObject = jsonObject;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getFormatMapStr() {
		return formatMapStr;
	}

	public void setFormatMapStr(String formatMapStr) {
		this.formatMapStr = formatMapStr;
	}

	public String getExcelPath() {
		return excelPath;
	}

	public void setExcelPath(String excelPath) {
		this.excelPath = excelPath;
	}
}
