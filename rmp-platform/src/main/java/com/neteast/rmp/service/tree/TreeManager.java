/**
 * 
 */
package com.neteast.rmp.service.tree;

import java.util.List;

import com.seraph.bi.suite.support.domain.tree.AsyncTreeNode;
import com.seraph.bi.suite.support.domain.tree.CheckTreeNode;
import com.seraph.bi.suite.support.domain.tree.SyncTreeNode;

/**
 * 类说明: 树的实现<br>
 * 创建时间: 2008-8-13 上午10:59:02<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
public interface TreeManager {

	/**
	 * 功能说明: 获取同步加载完整的树型结点<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2008-9-9 下午05:46:15<br>
	 * 
	 * @param treeNode
	 * @return
	 */
	public SyncTreeNode getTreeNode(SyncTreeNode treeNode);
	
	/**
	 * 功能说明: 获取具有权限的同步加载完整的树型结点<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2008-9-9 下午05:46:15<br>
	 * 
	 * @param treeNode
	 * @return
	 */
	public SyncTreeNode getTreeNodeByRole(SyncTreeNode treeNode);

	/**
	 * 功能说明: 获取异步加载树型子结点<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2008-9-9 下午05:46:02<br>
	 * 
	 * @param menuId
	 * @return
	 */
	public List<AsyncTreeNode> getLowerTreeNode(String menuId);
	
	/**
	 * 功能说明：获取树型带复选框的子节点
	 * 创建者：姜宏业<br>
	 * 创建时间：2013-6-5 下午06:09:49<br>
	 * @param menuId
	 * @return
	 */
	public List<CheckTreeNode> getCheckTreeNode(String menuId);
	
	/**
	 * 功能说明: 获取具有权限的异步加载树型子结点<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2008-9-9 下午05:46:02<br>
	 * 
	 * @param menuId
	 * @return
	 */
	public List<AsyncTreeNode> getLowerTreeNodeByRole(String menuId);

	/**
	 * 功能说明: 根据给定类转换链表中的实体<br>
	 * 创建者: 刘岩松<br>
	 * 创建时间: 2008-9-9 下午05:46:30<br>
	 * 
	 * @param list
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List createTreeNodes(List list, Class clazz);

}
