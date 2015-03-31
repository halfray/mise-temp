/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Example;
import com.seraph.bi.suite.support.domain.pagination.ExtPagingGridBean;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.web.base.BaseCondition;
import com.seraph.bi.suite.support.web.base.BaseHelper;
import com.seraph.bi.suite.support.web.json.JsonPagingProviderController;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * 
 * @author <br>
 * @email:<br>
 */
public class ${entity.id?cap_first}ListProviderController extends
		JsonPagingProviderController {

	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;
	
	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	@Override
	protected ExtPagingGridBean handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		BaseHelper baseHelper = new BaseHelper();
		
		String orderByClause = request.getParameter("orderBy");

		String condition = request.getParameter("condition");
		List<BaseCondition> filters = baseHelper.createFilter(condition);

		${entity.name?cap_first}Example example = new ${entity.name?cap_first}Example();
		example = (${entity.name?cap_first}Example) baseHelper.createExample(${entity.name?cap_first}Example.class, filters);

		PageBox pageBox = (PageBox) ${entity.name}DAO.selectByExample(example,
				orderByClause);
		List<?> dataList = pageBox.getPageList();

		ExtPagingGridBean bean = new ExtPagingGridBean();
		bean.setDataList(dataList);
		bean.setTotalCount(totalCount);

		return bean;
	}

}
