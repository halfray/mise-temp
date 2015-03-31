package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.dao.domain.ScPortalParmsExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface ScPortalParmsDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    Integer insert(ScPortalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int updateByPrimaryKey(ScPortalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int updateByPrimaryKeySelective(ScPortalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    List selectByExample(ScPortalParmsExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    List selectByExample(ScPortalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    ScPortalParms selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int deleteByExample(ScPortalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int selectCountByExample(ScPortalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    PageBox selectByExampleWithPaging(ScPortalParmsExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    PageBox selectByExampleWithPaging(ScPortalParmsExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_parms
     *
     * @abatorgenerated Mon Apr 08 19:59:23 CST 2013
     */
    int updateByPrimaryKeyForCgs(ScPortalParms record);
}