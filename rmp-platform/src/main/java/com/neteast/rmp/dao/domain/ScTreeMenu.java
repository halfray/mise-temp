package com.neteast.rmp.dao.domain;

import com.seraph.bi.suite.support.domain.annotations.PrimaryKey;

public class ScTreeMenu {
    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    @PrimaryKey
    private Integer id;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.MENU_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Integer menuId;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.PARENT_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Integer parentId;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.TEXT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String text;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.LEAF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String leaf;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.DISABLED
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String disabled;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String cls;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.ICON_CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String iconCls;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.HREF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String href;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.VISIBILITY
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String visibility;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.TYPE
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String type;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.SORT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Integer sort;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.HREF_TARGET
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private String hrefTarget;

    /**
     * This field was generated by Abator for iBATIS.
     * This field corresponds to the database column sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Integer id_old;

    private String parentname;
    public String getParentname() {
		return parentname;
	}

	public void setParentname(String parentname) {
		this.parentname = parentname;
	}

	/**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.ID
     *
     * @return the value of sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer getId() {
        return id;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.ID
     *
     * @param id the value for sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.MENU_ID
     *
     * @return the value of sc_tree_menu.MENU_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer getMenuId() {
        return menuId;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.MENU_ID
     *
     * @param menuId the value for sc_tree_menu.MENU_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.PARENT_ID
     *
     * @return the value of sc_tree_menu.PARENT_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer getParentId() {
        return parentId;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.PARENT_ID
     *
     * @param parentId the value for sc_tree_menu.PARENT_ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.TEXT
     *
     * @return the value of sc_tree_menu.TEXT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getText() {
        return text;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.TEXT
     *
     * @param text the value for sc_tree_menu.TEXT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setText(String text) {
        this.text = text;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.LEAF
     *
     * @return the value of sc_tree_menu.LEAF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getLeaf() {
        return leaf;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.LEAF
     *
     * @param leaf the value for sc_tree_menu.LEAF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setLeaf(String leaf) {
        this.leaf = leaf;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.DISABLED
     *
     * @return the value of sc_tree_menu.DISABLED
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getDisabled() {
        return disabled;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.DISABLED
     *
     * @param disabled the value for sc_tree_menu.DISABLED
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setDisabled(String disabled) {
        this.disabled = disabled;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.CLS
     *
     * @return the value of sc_tree_menu.CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getCls() {
        return cls;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.CLS
     *
     * @param cls the value for sc_tree_menu.CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setCls(String cls) {
        this.cls = cls;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.ICON_CLS
     *
     * @return the value of sc_tree_menu.ICON_CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getIconCls() {
        return iconCls;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.ICON_CLS
     *
     * @param iconCls the value for sc_tree_menu.ICON_CLS
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.HREF
     *
     * @return the value of sc_tree_menu.HREF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getHref() {
        return href;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.HREF
     *
     * @param href the value for sc_tree_menu.HREF
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setHref(String href) {
        this.href = href;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.VISIBILITY
     *
     * @return the value of sc_tree_menu.VISIBILITY
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getVisibility() {
        return visibility;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.VISIBILITY
     *
     * @param visibility the value for sc_tree_menu.VISIBILITY
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.TYPE
     *
     * @return the value of sc_tree_menu.TYPE
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getType() {
        return type;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.TYPE
     *
     * @param type the value for sc_tree_menu.TYPE
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.SORT
     *
     * @return the value of sc_tree_menu.SORT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer getSort() {
        return sort;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.SORT
     *
     * @param sort the value for sc_tree_menu.SORT
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setSort(Integer sort) {
        this.sort = sort;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.HREF_TARGET
     *
     * @return the value of sc_tree_menu.HREF_TARGET
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public String getHrefTarget() {
        return hrefTarget;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.HREF_TARGET
     *
     * @param hrefTarget the value for sc_tree_menu.HREF_TARGET
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setHrefTarget(String hrefTarget) {
        this.hrefTarget = hrefTarget;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method returns the value of the database column sc_tree_menu.ID
     *
     * @return the value of sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer getId_old() {
        return id_old;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method sets the value of the database column sc_tree_menu.ID
     *
     * @param id_old the value for sc_tree_menu.ID
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public void setId_old(Integer id_old) {
        this.id_old = id_old;
    }
}