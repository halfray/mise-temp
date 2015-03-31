/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first};
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Key;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email:<br>
 */
public class ${entity.name?cap_first}Controller extends JsonProviderController {

	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;
	
	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		String id = request.getParameter("id");
		
		${entity.name?cap_first}Key ${entity.name}Key = new ${entity.name?cap_first}Key();
		<#list entity.columns as u >
		<#if u.isPK?exists && u.isPK='true'>
		<#if u.dataType = 'int'>
		${entity.name}Key.set${u.id?cap_first}(Integer.parseInt(id));
		<#else>
		${entity.name}Key.set${u.id?cap_first}(id);
		</#if>
		</#if>
		</#list>
		
		${entity.name?cap_first} ${entity.name} = ${entity.name}DAO.selectByPrimaryKey(${entity.name}Key);

		return ${entity.name};
	}

}

