/**
 * 
 */
package com.neteast.rmp.web.menu;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.service.tree.TreeManager;
import com.neteast.rmp.service.tree.TreeSortComparator;
import com.seraph.bi.suite.support.domain.tree.AsyncTreeNode;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明:<br>
 * 创建时间: 2008-8-15 上午11:07:55<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/asyncMenuProvider.do")
public class AsyncMenuProviderController extends JsonProviderController {

	@Autowired
	private TreeManager treeManager;

	public void setTreeManager(TreeManager treeManager) {
		this.treeManager = treeManager;
	}

	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		String rootId = request.getParameter("id");

		List<AsyncTreeNode> result = new ArrayList<AsyncTreeNode>();
		List<AsyncTreeNode> list = treeManager.getLowerTreeNodeByRole(rootId);

		if (null != list) {
			result = list;
			// Sort
			TreeSortComparator comparator = new TreeSortComparator(false);
			Collections.sort(result, comparator);
		}

		return result;
	}

}
