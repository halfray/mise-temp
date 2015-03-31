package com.neteast.rmp.service.syscontant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.neteast.rmp.dao.sys.SystemConstantDAO;
import com.neteast.rmp.service.main.SystemParamsManager;
@Component
public class SysContantService {
	@Autowired
	SystemConstantDAO systemContentDAO;
	@Autowired
	SystemParamsManager systemParamsManager;
	
	public SystemConstantDAO getSystemContentDAO() {
		return systemContentDAO;
	}

	public void setSystemContentDAO(SystemConstantDAO systemContentDAO) {
		this.systemContentDAO = systemContentDAO;
	}
	
	/** 
	 * 功能说明:获取本系统的NODEID<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:34:10<br> 
	 * @return 
	 */ 
	public String getSystemNodeId()
	{
		return systemParamsManager.getSystemParamsValue("DY_NODEID");
	}
	
	/** 
	 * 功能说明:获取引入策略ID(ID越小优先级越高)<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:21:05<br> 
	 * @param websign 网内网外标识 1网内 0网外 2网内网外
	 * @param areasign 本省标识 1是0否
	 * @param systemcode 系统编码
	 * @return 
	 */ 
	public String getIntruPlot(String websign,String areasign,String systemcode)
	{
		return systemContentDAO.getIntruPlot(websign, areasign, systemcode);
	}
	
	/** 
	 * 功能说明:.获取本运营商标识，默认为移动<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:37:06<br> 
	 * @return 
	 */ 
	public String getSelfOperatorCode()
	{
		return systemContentDAO.getSelfOperatorCode();
	}
	/** 
	 * 功能说明:获取运营商的本网标识<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:43:37<br> 
	 * @param operatorCode
	 * @return 
	 */ 
	public String getWebSign(String operatorCode)
	{
		return systemContentDAO.getWebSign(operatorCode);
	}
	/** 
	 * 功能说明:获取本省编码<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:41:49<br> 
	 * @return 
	 */ 
	public String getSelfAreaCode()
	{
		return systemContentDAO.getSelfAreaCode();
	}
	/** 
	 * 功能说明:获取省份的本省标识<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:43:37<br> 
	 * @param operatorCode
	 * @return 
	 */ 
	public String getAreaSign(String areaCode)
	{
		return systemContentDAO.getAreaSign(areaCode);
	}
	
	/** 
	 * 功能说明:通过运营商编码，区域编码，系统编码获取引入策略编码<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午5:06:44<br> 
	 * @param operatorCode 运营商编码
	 * @param areaCode 区域编码
	 * @param systemCode 系统编码
	 * @return 
	 */ 
	public String getIntruPlotWithOperatorAreaSystem(String operatorCode,String areaCode,String systemCode)
	{
		String websign = getWebSign(operatorCode);
		String areasign = getAreaSign(areaCode);
		return getIntruPlot(websign,areasign,systemCode);
	}
}
