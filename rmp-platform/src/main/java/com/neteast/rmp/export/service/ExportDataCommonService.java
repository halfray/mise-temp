package com.neteast.rmp.export.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 类说明: 导出文件公共服务类<br>
 * 创建时间: 2013-07-20<br>
 * @author 赫振军<br>
 */
public interface ExportDataCommonService {
	
	public List getExportFile(Map map);
	
	public Integer getExportFileCount(Map map);
}