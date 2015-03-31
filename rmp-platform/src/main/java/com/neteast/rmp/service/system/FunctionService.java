package com.neteast.rmp.service.system;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.service.tree.TreeManager;
import com.neteast.rmp.service.tree.TreeSortComparator;
import com.seraph.bi.suite.support.domain.tree.AsyncTreeNode;

@Service
public class FunctionService {
	@Autowired
	private TreeManager treeManager;
	
	public List<AsyncTreeNode> getRootFunctionsByParenetId(String id)
	{
		if(id==null || id.trim().length()<=0) return null;
		
		List<AsyncTreeNode> result = new ArrayList<AsyncTreeNode>();
		List<AsyncTreeNode> list = treeManager.getLowerTreeNodeByRole(id);

		if (null != list) {
			result = list;
			// Sort
			TreeSortComparator comparator = new TreeSortComparator(false);
			Collections.sort(result, comparator);
		}

		return result;
	}
}
