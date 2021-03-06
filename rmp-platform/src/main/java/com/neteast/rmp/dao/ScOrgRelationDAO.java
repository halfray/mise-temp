package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.ScOrgRelation;
import com.neteast.rmp.dao.domain.ScOrgRelationExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface ScOrgRelationDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    Integer insert(ScOrgRelation record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKey(ScOrgRelation record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeySelective(ScOrgRelation record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(ScOrgRelationExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(ScOrgRelationExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    ScOrgRelation selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByExample(ScOrgRelationExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int selectCountByExample(ScOrgRelationExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(ScOrgRelationExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(ScOrgRelationExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_org_relation
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeyForCgs(ScOrgRelation record);
}