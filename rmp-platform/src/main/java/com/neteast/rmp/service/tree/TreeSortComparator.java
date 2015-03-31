/**
 * 
 */
package com.neteast.rmp.service.tree;

import java.util.Comparator;

import org.apache.commons.lang.math.NumberUtils;

import com.seraph.bi.suite.support.domain.tree.AsyncTreeNode;

/**
 * @author seraph
 * 
 */
public class TreeSortComparator implements Comparator<Object> {

	boolean desc = false;

	public TreeSortComparator(boolean desc) {
		super();
		this.desc = desc;
	}

	public int compare(Object arg0, Object arg1) {
		
		int c = 0;
		if (arg0 == arg1)
			return 0;
		else if (arg0 == null || arg1 == null) {
			c = arg1 == null ? 1 : -1;
		} else {
			AsyncTreeNode node0 = (AsyncTreeNode) arg0;
			AsyncTreeNode node1 = (AsyncTreeNode) arg1;

			c = NumberUtils.compare(node0.getSort(), node1.getSort());
		}
		return desc ? -c : c;
	}

}
