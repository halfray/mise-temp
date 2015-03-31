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

import com.neteast.rmp.dao.ScCellParmsDAO;
import com.neteast.rmp.dao.domain.ScCellParmsExample;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email: <br>
 */
@Controller
@RequestMapping("/scCellParmsListProvider.do")
public class ScCellParmsListProviderController extends JsonPagingProviderController{

	@Autowired
	private ScCellParmsDAO scCellParmsDAO;
	
	public void setScCellParmsDAO(ScCellParmsDAO scCellParmsDAO) {
		this.scCellParmsDAO = scCellParmsDAO;
	}

	@RequestMapping(method = { RequestMethod.GET })
	protected ExtPagingGridBean handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
			
		try {	
			String orderByClause = request.getParameter("orderBy");
			String condition = request.getParameter("condition");
			List<BaseCondition> filters = BaseHelper.createFilter(condition);

			ScCellParmsExample example = new ScCellParmsExample();
			example = (ScCellParmsExample) BaseHelper.createExample(ScCellParmsExample.class, filters);

			totalCount=scCellParmsDAO.selectCountByExample(example);
			
			PageBox pageBox = (PageBox) scCellParmsDAO.selectByExampleWithPaging(example, pageSize, pageNum,orderByClause);
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