/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

/**
 * @author seraph
 *
 */
public interface Creator {
	
	public abstract String create(String portalCode) throws Exception;
	
	public abstract String createToolbar(String portalCode,String flag) throws Exception;

}
