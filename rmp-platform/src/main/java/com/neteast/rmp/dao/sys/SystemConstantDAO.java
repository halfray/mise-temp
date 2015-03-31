package com.neteast.rmp.dao.sys;

public interface SystemConstantDAO {
	/** 
	 * 功能说明:获取引入策略ID(ID越小优先级越高)<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:21:05<br> 
	 * @param websign 网内网外标识 1网内 0网外 2网内网外
	 * @param areasign 本省标识 1是0否
	 * @param systemcode 运营商系统编码
	 * @return 
	 */ 
	public String getIntruPlot(String websign,String areasign,String systemcode);
	/** 
	 * 功能说明:获取本网运营商编码<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:41:49<br> 
	 * @return 
	 */ 
	public String getSelfOperatorCode();
	/** 
	 * 功能说明:获取运营商的本网标识<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:43:37<br> 
	 * @param operatorCode
	 * @return 
	 */ 
	public String getWebSign(String operatorCode);
	/** 
	 * 功能说明:获取本省编码<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:41:49<br> 
	 * @return 
	 */ 
	public String getSelfAreaCode();
	/** 
	 * 功能说明:获取省份的本省标识<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-2-25 下午4:43:37<br> 
	 * @param operatorCode
	 * @return 
	 */ 
	public String getAreaSign(String areaCode);
}
