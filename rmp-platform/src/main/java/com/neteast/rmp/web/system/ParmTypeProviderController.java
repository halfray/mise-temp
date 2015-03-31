/**
 * 
 */
package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.ScParmTypeDAO;
import com.neteast.rmp.dao.domain.ScParmType;
import com.neteast.rmp.dao.domain.ScParmTypeExample;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明: 为Combobox组件提供JSON形式的参数类型数据<br>
 * 创建时间: 2008-9-1 上午09:47:22<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/parmTypeProvider.do")
public class ParmTypeProviderController extends JsonProviderController {

	private ScParmTypeDAO scParmTypeDAO;

	public void setScParmTypeDAO(ScParmTypeDAO scParmTypeDAO) {
		this.scParmTypeDAO = scParmTypeDAO;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		List<ScParmType> list = new ArrayList<ScParmType>();
		
		ScParmTypeExample example = new ScParmTypeExample();
		List<ScParmType> results = scParmTypeDAO.selectByExample(example);

		if(results != null) {
			list = results;
		}
		
		return list;
	}

}

