/**
 * 
 */
package ${javaControllerGenerator.webPackage}.${entity.module};

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;

import com.seraph.bi.suite.support.web.BaseController;

/**
 * 类说明:<br>
 * 创建时间: <br>
 * @author <br>
 * @email:<br>
 */
public class ${entity.id?cap_first}ListController extends BaseController {

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return new ModelAndView(getViewName());
	}

}