/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.seraph.bi.suite.support.domain.pagination.ExtPagingGridBean;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.web.base.BaseCondition;
import com.seraph.bi.suite.support.web.base.BaseHelper;
import com.seraph.bi.suite.support.web.json.JsonPagingProviderController;

import ${javaControllerGenerator.daoPackage}.${entity.name?cap_first}DAO;
import ${javaControllerGenerator.daoPackage}.domain.${entity.name?cap_first}Example;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email: <br>
 */
@Controller
@RequestMapping("/${entity.id}ListProvider.do")
public class ${entity.name?cap_first}ListProviderController extends JsonPagingProviderController{

	@Autowired
	private ${entity.name?cap_first}DAO ${entity.name}DAO;
	
	public void set${entity.name?cap_first}DAO(${entity.name?cap_first}DAO ${entity.name}DAO) {
		this.${entity.name}DAO = ${entity.name}DAO;
	}

	@RequestMapping(method = { RequestMethod.GET })
	protected ExtPagingGridBean handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
			
		try {	
			String orderByClause = request.getParameter("orderBy");
			String condition = request.getParameter("condition");
			List<BaseCondition> filters = BaseHelper.createFilter(condition);

			${entity.name?cap_first}Example example = new ${entity.name?cap_first}Example();
			example = (${entity.name?cap_first}Example) BaseHelper.createExample(${entity.name?cap_first}Example.class, filters);

			totalCount=${entity.name}DAO.selectCountByExample(example);
			
			PageBox pageBox = (PageBox) ${entity.name}DAO.selectByExampleWithPaging(example, pageSize, pageNum,orderByClause);
			List<?> dataList = pageBox.getPageList();

			ExtPagingGridBean bean = new ExtPagingGridBean();
			bean.setDataList(dataList);
			bean.setTotalCount(totalCount);
			
            return bean;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}