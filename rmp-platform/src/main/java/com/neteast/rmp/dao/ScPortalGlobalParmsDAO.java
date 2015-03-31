package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.ScPortalGlobalParms;
import com.neteast.rmp.dao.domain.ScPortalGlobalParmsExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface ScPortalGlobalParmsDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    Integer insert(ScPortalGlobalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int updateByPrimaryKey(ScPortalGlobalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int updateByPrimaryKeySelective(ScPortalGlobalParms record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    List selectByExample(ScPortalGlobalParmsExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    List selectByExample(ScPortalGlobalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    ScPortalGlobalParms selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int deleteByExample(ScPortalGlobalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int selectCountByExample(ScPortalGlobalParmsExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    PageBox selectByExampleWithPaging(ScPortalGlobalParmsExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    PageBox selectByExampleWithPaging(ScPortalGlobalParmsExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_global_parms
     *
     * @abatorgenerated Mon Apr 08 20:00:15 CST 2013
     */
    int updateByPrimaryKeyForCgs(ScPortalGlobalParms record);
}