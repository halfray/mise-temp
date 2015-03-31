package com.neteast.rmp.dao;

import com.neteast.rmp.dao.domain.ScHomepageCfg;
import com.neteast.rmp.dao.domain.ScHomepageCfgExample;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import java.util.List;

public interface ScHomepageCfgDAO {
    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    Integer insert(ScHomepageCfg record);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    List selectByExample(ScHomepageCfgExample example, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    List selectByExample(ScHomepageCfgExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    int deleteByExample(ScHomepageCfgExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    int selectCountByExample(ScHomepageCfgExample example);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    PageBox selectByExampleWithPaging(ScHomepageCfgExample example, int pageSize, int pageNum, String orderByClause);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    PageBox selectByExampleWithPaging(ScHomepageCfgExample example, int pageSize, int pageNum);

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_homepage_cfg
     *
     * @abatorgenerated Tue Nov 06 14:43:17 CST 2012
     */
    int updateByPrimaryKeyForCgs(ScHomepageCfg record);
}