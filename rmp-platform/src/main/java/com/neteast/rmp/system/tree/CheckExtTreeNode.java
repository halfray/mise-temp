package com.neteast.rmp.system.tree;

public class CheckExtTreeNode extends ExtTreeNode{
	protected boolean checked = false;
	
	public boolean isChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
	
}
