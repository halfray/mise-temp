package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.ScUserRole;
import com.neteast.rmp.dao.domain.ScUserRoleExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface ScUserRoleDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    Integer insert(ScUserRole record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKey(ScUserRole record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeySelective(ScUserRole record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(ScUserRoleExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(ScUserRoleExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    ScUserRole selectByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByExample(ScUserRoleExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByPrimaryKey(Integer id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int selectCountByExample(ScUserRoleExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(ScUserRoleExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(ScUserRoleExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_user_role
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeyForCgs(ScUserRole record);
}