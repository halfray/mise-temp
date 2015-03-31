package com.neteast.rmp.system.tree;

import java.util.ArrayList;
import java.util.List;

public class ExtTreeNode{
	protected String id;
	protected String submitValue;
	protected String text;
	protected String uiProvider;
	protected String parentid;
	protected String href;
	protected String cls;
	protected String iconCls;
	protected Boolean leaf = null;
	protected List<ExtTreeNode> children = new ArrayList<ExtTreeNode>();
	
	public ExtTreeNode() {
		super();
	}
	
	public ExtTreeNode(String id) {
		super();
		this.id = id;
	}

	public ExtTreeNode(String id, String text) {
		super();
		this.id = id;
		this.text = text;
	}

	public ExtTreeNode(String id, String text, String parentid) {
		super();
		this.id = id;
		this.text = text;
		this.parentid = parentid;  
	}

	public ExtTreeNode(String id, String text, String parentid, String href) {
		super();
		this.id = id;
		this.text = text;
		this.parentid = parentid;  
		this.href = href;
	}

	public ExtTreeNode(String id, String text, String parentid, String href, String cls) {
		super();
		this.id = id;
		this.text = text;
		this.parentid = parentid;  
		this.href = href;
		this.cls = cls;
	}
	
	public ExtTreeNode(Long id) {
		super();
		this.id = id.toString().trim();
	}

	public ExtTreeNode(Long id, String text) {
		super();
		this.id = id.toString().trim();
		this.text = text;
	}

	public ExtTreeNode(Long id, String text, Long parentid) {
		super();
		this.id = id.toString().trim();
		this.text = text;
		if(parentid != null)
			this.parentid = parentid.toString().trim();  
	}

	public ExtTreeNode(Long id, String text, Long parentid, String href) {
		super();
		this.id = id.toString().trim();
		this.text = text;
		if(parentid != null)
			this.parentid = parentid.toString().trim();  
		this.href = href;
	}
	public ExtTreeNode(Long id, String text, Long parentid, String href, String cls) {
		super();
		this.id = id.toString().trim();
		this.text = text;
		if(parentid !=null)
			this.parentid = parentid.toString().trim(); 
		this.href = href;
		this.cls = cls;
	}
	
	public ExtTreeNode(int id) {
		super();
		this.id = String.valueOf(id);
	}

	public ExtTreeNode(int id, String text) {
		super();
		this.id = String.valueOf(id);
		this.text = text;
	}

	public ExtTreeNode(int id, String text, Long parentid) {
		super();
		this.id = String.valueOf(id);
		this.text = text;
		if(parentid !=null)
			this.parentid = parentid.toString().trim();  
	}

	public ExtTreeNode(int id, String text, Long parentid, String href) {
		super();
		this.id = String.valueOf(id);
		this.text = text;
		if(parentid !=null)
			this.parentid = parentid.toString().trim();  
		this.href = href;
	}
	public ExtTreeNode(int id, String text, Long parentid, String href, String cls) {
		super();
		this.id = String.valueOf(id);
		this.text = text;
		if(parentid !=null)
			this.parentid = parentid.toString().trim(); 
		this.href = href;
		this.cls = cls;
	}
	
	public List<ExtTreeNode> getChildren() {
		return this.children;
	}

	public String getCls() {
		return this.cls;
	}

	public String getId() {
		return this.id;
	}

	public boolean getLeaf() {
		if(this.leaf != null ) return this.leaf;
		
		if(this.children != null && this.children.size() > 0)
			return false;
		return true;
	}
	
	public void setLeaf(Boolean leaf)
	{
		this.leaf = leaf;
	}

	public String getText() {
		return this.text;
	}

	public void setChildren(List<ExtTreeNode> children) {
		this.children = children;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getParentid() {
		return parentid;
	}

	public void setParentid(String parentid) {
		this.parentid = parentid;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getUiProvider() {
		return uiProvider;
	}

	public void setUiProvider(String uiProvider) {
		this.uiProvider = uiProvider;
	}

	public String getSubmitValue() {
		return submitValue;
	}

	public void setSubmitValue(String submitValue) {
		this.submitValue = submitValue;
	}

}
