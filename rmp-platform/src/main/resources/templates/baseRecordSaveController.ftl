/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first};
import com.seraph.bi.suite.support.web.base.BaseHelper;
import com.seraph.bi.suite.support.web.base.BaseRecordSaveController;
import com.seraph.bi.suite.support.web.base.BaseResponse;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email:<br>
 */
public class ${entity.name?cap_first}SaveController extends JsonProviderController {
	
	private static final Logger log = Logger.getLogger(${entity.name?cap_first}SaveController.class);
	
	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;

	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	@Override
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		
		String primaryKey = request.getParameter("pk");
		log.debug("PrimaryKey Name: [" + primaryKey + "]");
		
		String id = request.getParameter(primaryKey);
		
		BaseResponse baseResponse = null;
		try {
			BaseHelper baseHelper = new BaseHelper();
			
			${entity.name?cap_first} record = (${entity.name?cap_first}) baseHelper.createRecord(${entity.name?cap_first}.class, request);
			if (StringUtils.isBlank(id)) {
				${entity.name}DAO.insert(record);
			} else {
				${entity.name}DAO.updateByPrimaryKey(record);
			}
			
			baseResponse = new BaseResponse();
			Map<String, String> map = new HashMap<String, String>();
			map.put("msg", "保存成功!");
			baseResponse.setSuccess(Boolean.valueOf(BaseResponse.TRUE));
			baseResponse.setErrors(map);
			
		} catch (Exception e) {
			baseResponse = new BaseResponse();
			Map<String, String> map = new HashMap<String, String>();
			map.put("msg", "保存失败!");
			baseResponse.setSuccess(Boolean.valueOf(BaseResponse.FALSE));
			baseResponse.setErrors(map);
			e.printStackTrace();
		}
		
		return baseResponse;
	}
	
}
