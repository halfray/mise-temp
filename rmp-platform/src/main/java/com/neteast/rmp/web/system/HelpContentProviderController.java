/**
 * 
 */
package com.neteast.rmp.web.system;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.seraph.bi.suite.support.util.UrlUtils;
import com.seraph.bi.suite.support.web.json.StringProviderController;


/**
 * 类说明: 帮助窗口的内容提供<br>
 * 创建时间: 2008-9-12 上午10:54:53<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public class HelpContentProviderController extends StringProviderController {

	private String path;

	public void setPath(String path) {
		this.path = path;
	}

	@Override
	protected String handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		return UrlUtils.readFile(path);
	}

}

