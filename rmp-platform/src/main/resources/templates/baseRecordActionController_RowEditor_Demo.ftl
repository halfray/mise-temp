
<#global pkMum=0>
 <#list entity.columns as u >
   <#if u.isPK?exists && u.isPK = 'true'> 
   	   <#global pkMum=pkMum+1>  
   </#if>	     
 </#list>
/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.seraph.bi.suite.support.util.json.JsonUtils;
import com.seraph.bi.suite.support.util.BeanUtils;
import com.seraph.bi.suite.support.web.base.BaseResponse;
import com.seraph.bi.suite.support.web.json.JsonActionProviderController;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first};
<#if (pkMum==1)>
<#global pkDataType='string'>
 <#list entity.columns as u >
   <#if u.isPK?exists && u.isPK = 'true'> 
   	   <#global pkDataType='${u.dataType}'>  
   </#if>	     
 </#list>
<#elseif (pkMum>1)>
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Key;
<#else>
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Example;				
</#if>
/**
 * 类说明:<br>
 * 创建时间: 2011-01-12<br>
 * @author <br>
 * @email:<br>
 */
@Controller
@RequestMapping("/${entity.id}Action.do")
public class ${entity.id?cap_first}ActionController extends JsonActionProviderController {


	private static final Logger log = Logger.getLogger(${entity.name?cap_first}ActionController.class);
	
	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;

	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	/**
	 * 功能说明: 查询单条记录<br>
	 * 创建时间: 2011-1-12 <br>
	 * @author: 徐信信<br>
	 */
	public Object onRetrieve(String[] keyNames, Object entity) {		
		${entity.name?cap_first} ${entity.name}=null;

		try{		
		<#if (pkMum==1)>		   
		   <#if (pkDataType=='int')>
		   		${entity.name}= ${entity.name}DAO.selectByPrimaryKey(Integer.parseInt(BeanUtils.getProperty(entity, keyNames[0])));
		   <#else>		
		   		${entity.name}= ${entity.name}DAO.selectByPrimaryKey(BeanUtils.getProperty(entity, keyNames[0]));
		   </#if>
		<#elseif (pkMum>1)>
		   ${entity.name?cap_first}Key ${entity.name}Key = new ${entity.name?cap_first}Key();
		   BeanUtils.copyProperties(${entity.name}Key, entity);		   		
		   ${entity.name}= ${entity.name}DAO.selectByPrimaryKey(${entity.name}Key);
		<#else>
		   ${entity.name?cap_first}Example ${entity.name}Example = new ${entity.name?cap_first}Example();
		   BeanUtils.copyProperties(${entity.name}Key, entity);		   		
		   ${entity.name}= ${entity.name}DAO.selectByPrimaryKey(${entity.name}Example);				
		</#if>			
		} catch(Exception e){
			Throwable t = e.getCause();
			if (t.getMessage() == null || "".endsWith(t.getMessage())) {
				t = t.getCause();
			}
			String message = "查询失败！异常信息：[" + t.getMessage() + "]";
			log.debug(message);
			return new BaseResponse(BaseResponse.FALSE, message);
		}
		return ${entity.name};
	}

	/**
	 * 
	 */
	public Object onCreate(String[] keyNames, Object entity) {
		//添加信息
		BaseResponse baseResponse = null;
		try {
			${entity.name}DAO.insert((${entity.name?cap_first})entity);
			baseResponse = new BaseResponse(BaseResponse.TRUE, "添加成功！");
		} catch (Exception e) {
			Throwable t = e.getCause();
			if (t.getMessage() == null || "".endsWith(t.getMessage())) {
				t = t.getCause();
			}
			String message = "操作失败！异常信息：[" + t.getMessage() + "]";
			log.debug(message);
			baseResponse = new BaseResponse(BaseResponse.FALSE, message);
		}
		return baseResponse;
	}

	/**
	 * 
	 */
	public Object onUpdate(String[] keyNames, Object entity) {

		//修改信息
		BaseResponse baseResponse = null;
		try {
			${entity.name}DAO.updateByPrimaryKeyForCgs((${entity.name?cap_first})entity);
			baseResponse = new BaseResponse(BaseResponse.TRUE, "修改成功！");
		} catch (Exception e) {
			Throwable t = e.getCause();
			if (t.getMessage() == null || "".endsWith(t.getMessage())) {
				t = t.getCause();
			}
			String message = "修改失败！异常信息：[" + t.getMessage() + "]";
			log.debug(message);
			baseResponse = new BaseResponse(BaseResponse.FALSE, message);
		}
		return baseResponse;
	}

	/**
	 * 
	 */
	public Object onDelete(String[] keyNames, Object entity) {

		BaseResponse baseResponse=null;
		try{		
		<#if (pkMum==1)>
		   <#if (pkDataType=='int')>
		   		${entity.name}DAO.deleteByPrimaryKey(Integer.parseInt(BeanUtils.getProperty(entity, keyNames[0])));
		   <#else>		
		   		${entity.name}DAO.deleteByPrimaryKey(BeanUtils.getProperty(entity, keyNames[0]));
		   </#if>		
		<#elseif (pkMum>1)>
		   ${entity.name?cap_first}Key ${entity.name}Key = new ${entity.name?cap_first}Key();
		   BeanUtils.copyProperties(${entity.name}Key, entity);		   		
		   ${entity.name}DAO.deleteByPrimaryKey(${entity.name}Key);
		<#else>
		   ${entity.name?cap_first}Example ${entity.name}Example = new ${entity.name?cap_first}Example();
		   BeanUtils.copyProperties(${entity.name}Key, entity);		   		
		   ${entity.name}DAO.deleteByExample(${entity.name}Example);				
		</#if>	
		   baseResponse = new BaseResponse(BaseResponse.TRUE, "删除成功！");						
		} catch(Exception e){
			Throwable t = e.getCause();
			if (t.getMessage() == null || "".endsWith(t.getMessage())) {
				t = t.getCause();
			}
			String message = "删除失败！异常信息：[" + t.getMessage() + "]";
			log.debug(message);
			baseResponse = new BaseResponse(BaseResponse.FALSE, message);	
		}
		return baseResponse;		
	}

	@Override
	protected Object onBind(HttpServletRequest request,
			HttpServletResponse response) {
		
		String record = request.getParameter("record");	
		return JsonUtils.toBean(record, ${entity.name?cap_first}.class);
	}

}
