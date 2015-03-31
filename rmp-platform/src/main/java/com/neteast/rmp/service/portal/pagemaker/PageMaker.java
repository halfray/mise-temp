/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;


/**
 * 类说明:<br>
 * 创建时间: 2013-4-9 下午7:11:59<br>
 * 
 * @author 刘岩松<br>
 * @email liuys@neteast.com<br>
 */
public interface PageMaker {
	
	public abstract String getNameDefine(String portalCode);
	
	public abstract String isEditable(String portalCode);
	
	public abstract String isDeleteable(String portalCode);
	
	public abstract String getFieldDefine(String portalCode);
	
	public abstract String getColumnDefine(String portalCode);
	
	public abstract String getTbarDefine(String portalCode,String flag);
	
	public abstract String getFormDefine(String portalCode);
	
	public abstract String getParameterDefine(String portalCode);
	
	public abstract String getParmCodeArray(String portalCode);
	
	public abstract String getNoticeCellArray(String portalCode);
	
	public abstract String getNeighbourCellHash(String portalCode);

	public abstract String getParmDefaultValueArray(String portalCode);

}
