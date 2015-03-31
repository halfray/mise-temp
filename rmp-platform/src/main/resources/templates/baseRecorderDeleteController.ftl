/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.apache.commons.lang.StringUtils;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Key;
import com.seraph.bi.suite.support.web.BaseResponse;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email:<br>
 */
public class ${entity.name?cap_first}DeleteController extends JsonProviderController {

	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;
	
	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		String[] keys = {};
		String key = request.getParameter("key");
		if (StringUtils.isNotBlank(key)) {
			keys = key.split(",");
		}
		
		for (int i = 0; i < keys.length; i++) {
			if (StringUtils.isNotBlank(keys[i])) {
				${entity.name?cap_first}Key ${entity.name}Key = new ${entity.name?cap_first}Key();
				<#list entity.columns as u >
				<#if u.isPK?exists && u.isPK='true'>
				<#if u.dataType = 'int'>
				${entity.name}Key.set${u.id?cap_first}(Integer.parseInt(keys[i]));
				<#else>
				${entity.name}Key.set${u.id?cap_first}(keys[i]);
				</#if>
				</#if>
				</#list>
				${entity.name}DAO.deleteByPrimaryKey(${entity.name}Key);
			}
		}
		
		BaseResponse baseResponse = new BaseResponse();
		Map<String, String> map = new HashMap<String, String>();
		map.put("msg", "保存成功");
		baseResponse.setSuccess(Boolean.valueOf(BaseResponse.TRUE));
		baseResponse.setErrors(map);
		
		return baseResponse;
	}

}
