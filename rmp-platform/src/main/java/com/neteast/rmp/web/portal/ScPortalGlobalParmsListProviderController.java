/**
 * 
 */
package com.neteast.rmp.web.portal;

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

import com.neteast.rmp.dao.ScPortalGlobalParmsDAO;
import com.neteast.rmp.dao.domain.ScPortalGlobalParmsExample;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email: <br>
 */
@Controller
@RequestMapping("/scPortalGlobalParmsListProvider.do")
public class ScPortalGlobalParmsListProviderController extends JsonPagingProviderController{

	@Autowired
	private ScPortalGlobalParmsDAO scPortalGlobalParmsDAO;
	
	public void setScPortalGlobalParmsDAO(ScPortalGlobalParmsDAO scPortalGlobalParmsDAO) {
		this.scPortalGlobalParmsDAO = scPortalGlobalParmsDAO;
	}

	@RequestMapping(method = { RequestMethod.GET })
	protected ExtPagingGridBean handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
			
		try {	
			String orderByClause = request.getParameter("orderBy");
			String condition = request.getParameter("condition");
			List<BaseCondition> filters = BaseHelper.createFilter(condition);

			ScPortalGlobalParmsExample example = new ScPortalGlobalParmsExample();
			example = (ScPortalGlobalParmsExample) BaseHelper.createExample(ScPortalGlobalParmsExample.class, filters);

			totalCount=scPortalGlobalParmsDAO.selectCountByExample(example);
			
			PageBox pageBox = (PageBox) scPortalGlobalParmsDAO.selectByExampleWithPaging(example, pageSize, pageNum,orderByClause);
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