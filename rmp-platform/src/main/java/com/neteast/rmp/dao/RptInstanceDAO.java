package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.RptInstance;
import com.neteast.rmp.dao.domain.RptInstanceExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface RptInstanceDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    Double insert(RptInstance record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKey(RptInstance record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeySelective(RptInstance record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(RptInstanceExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    List selectByExample(RptInstanceExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    RptInstance selectByPrimaryKey(Double id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByExample(RptInstanceExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int deleteByPrimaryKey(Double id);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int selectCountByExample(RptInstanceExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(RptInstanceExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    PageBox selectByExampleWithPaging(RptInstanceExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_instance
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    int updateByPrimaryKeyForCgs(RptInstance record);
}