package com.neteast.rmp.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.ScParmInfoDAO;
import com.neteast.rmp.dao.domain.ScParmInfo;
import com.neteast.rmp.dao.domain.ScParmInfoExample;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.domain.pagination.PageObject;

@Repository
public class ScParmInfoDAOImpl extends BaseSqlMapClientDaoSupport implements ScParmInfoDAO {

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public ScParmInfoDAOImpl() {
        super();
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer insert(ScParmInfo record) {
        Object newKey = getSqlMapClientTemplate().insert("sc_parm_info.abatorgenerated_insert", record);
        return (Integer) newKey;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKey(ScParmInfo record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_info.abatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeySelective(ScParmInfo record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_info.abatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(ScParmInfoExample example, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        List list = getSqlMapClientTemplate().queryForList("sc_parm_info.abatorgenerated_selectByExample", parms);
        return list;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(ScParmInfoExample example) {
        return selectByExample(example, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public ScParmInfo selectByPrimaryKey(Integer id) {
        ScParmInfo key = new ScParmInfo();
        key.setId(id);
        ScParmInfo record = (ScParmInfo) getSqlMapClientTemplate().queryForObject("sc_parm_info.abatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByExample(ScParmInfoExample example) {
        int rows = getSqlMapClientTemplate().delete("sc_parm_info.abatorgenerated_deleteByExample", getExampleParms(example));
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByPrimaryKey(Integer id) {
        ScParmInfo key = new ScParmInfo();
        key.setId(id);
        int rows = getSqlMapClientTemplate().delete("sc_parm_info.abatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getIDExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getId_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NULL", "Y");
            } else {
                parms.put("AND_ID_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_NULL", "Y");
            } else {
                parms.put("AND_ID_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_EQUALS", "Y");
            } else {
                parms.put("AND_ID_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_ID_NOT_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GT", "Y");
            } else {
                parms.put("AND_ID_GT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GE", "Y");
            } else {
                parms.put("AND_ID_GE", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_LT", "Y");
            } else {
                parms.put("AND_ID_LT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_LE", "Y");
            } else {
                parms.put("AND_ID_LE", "Y");
            }
            parms.put("id", example.getId());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getPARM_CODEExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getParmCode_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_NULL", "Y");
            } else {
                parms.put("AND_PARM_CODE_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_NOT_NULL", "Y");
            } else {
                parms.put("AND_PARM_CODE_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_CODE_EQUALS", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_CODE_NOT_EQUALS", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_GT", "Y");
            } else {
                parms.put("AND_PARM_CODE_GT", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_GE", "Y");
            } else {
                parms.put("AND_PARM_CODE_GE", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_LT", "Y");
            } else {
                parms.put("AND_PARM_CODE_LT", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_LE", "Y");
            } else {
                parms.put("AND_PARM_CODE_LE", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        case ScParmInfoExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_CODE_LIKE", "Y");
            } else {
                parms.put("AND_PARM_CODE_LIKE", "Y");
            }
            parms.put("parmCode", example.getParmCode());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getPARM_NAMEExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getParmName_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_NULL", "Y");
            } else {
                parms.put("AND_PARM_NAME_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_NOT_NULL", "Y");
            } else {
                parms.put("AND_PARM_NAME_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_NAME_EQUALS", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_NAME_NOT_EQUALS", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_GT", "Y");
            } else {
                parms.put("AND_PARM_NAME_GT", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_GE", "Y");
            } else {
                parms.put("AND_PARM_NAME_GE", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_LT", "Y");
            } else {
                parms.put("AND_PARM_NAME_LT", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_LE", "Y");
            } else {
                parms.put("AND_PARM_NAME_LE", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        case ScParmInfoExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_NAME_LIKE", "Y");
            } else {
                parms.put("AND_PARM_NAME_LIKE", "Y");
            }
            parms.put("parmName", example.getParmName());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getTYPE_CODEExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getTypeCode_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NULL", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NOT_NULL", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_CODE_EQUALS", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NOT_EQUALS", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_GT", "Y");
            } else {
                parms.put("AND_TYPE_CODE_GT", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_GE", "Y");
            } else {
                parms.put("AND_TYPE_CODE_GE", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_LT", "Y");
            } else {
                parms.put("AND_TYPE_CODE_LT", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_LE", "Y");
            } else {
                parms.put("AND_TYPE_CODE_LE", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmInfoExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_LIKE", "Y");
            } else {
                parms.put("AND_TYPE_CODE_LIKE", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getPARM_SORTExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getParmSort_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_NULL", "Y");
            } else {
                parms.put("AND_PARM_SORT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_NOT_NULL", "Y");
            } else {
                parms.put("AND_PARM_SORT_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_SORT_EQUALS", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PARM_SORT_NOT_EQUALS", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_GT", "Y");
            } else {
                parms.put("AND_PARM_SORT_GT", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_GE", "Y");
            } else {
                parms.put("AND_PARM_SORT_GE", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_LT", "Y");
            } else {
                parms.put("AND_PARM_SORT_LT", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PARM_SORT_LE", "Y");
            } else {
                parms.put("AND_PARM_SORT_LE", "Y");
            }
            parms.put("parmSort", example.getParmSort());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getDESCRIPTIONExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        switch (example.getDescription_Indicator()) {
        case ScParmInfoExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NULL", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NOT_NULL", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NOT_NULL", "Y");
            }
            break;
        case ScParmInfoExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_EQUALS", "Y");
            } else {
                parms.put("AND_DESCRIPTION_EQUALS", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NOT_EQUALS", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_GT", "Y");
            } else {
                parms.put("AND_DESCRIPTION_GT", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_GE", "Y");
            } else {
                parms.put("AND_DESCRIPTION_GE", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_LT", "Y");
            } else {
                parms.put("AND_DESCRIPTION_LT", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_LE", "Y");
            } else {
                parms.put("AND_DESCRIPTION_LE", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case ScParmInfoExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_LIKE", "Y");
            } else {
                parms.put("AND_DESCRIPTION_LIKE", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getExampleParms(ScParmInfoExample example) {
        Map parms = new HashMap();
        parms.putAll(getIDExampleParms(example));
        parms.putAll(getPARM_CODEExampleParms(example));
        parms.putAll(getPARM_NAMEExampleParms(example));
        parms.putAll(getTYPE_CODEExampleParms(example));
        parms.putAll(getPARM_SORTExampleParms(example));
        parms.putAll(getDESCRIPTIONExampleParms(example));
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int selectCountByExample(ScParmInfoExample example) {
        Map parms = getExampleParms(example);
        int count = ((Integer)getSqlMapClientTemplate().queryForObject("sc_parm_info.abatorgenerated_selectCountByExample", parms)).intValue();
        return count;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(ScParmInfoExample example, int pageSize, int pageNum, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        PageBox pageBox = new PageBox();
        PageObject pageObject = new PageObject();
        pageObject.setPageSize(pageSize);
        pageObject.setPageIndex(pageNum);
        int itemAmount = selectCountByExample(example);
        pageObject.setItemAmount(itemAmount);
        List pageList = null;
        if (pageObject.getBeginIndex() <= pageObject.getItemAmount()) {
            pageList = (getSqlMapClientTemplate().queryForList("sc_parm_info.abatorgenerated_selectByExample", parms, pageObject.getBeginIndex() - 1, pageSize));
        }
        pageBox.setPageObject(pageObject);
        pageBox.setPageList(pageList);
        return pageBox;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(ScParmInfoExample example, int pageSize, int pageNum) {
        return selectByExampleWithPaging(example, pageSize, pageNum, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_info
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeyForCgs(ScParmInfo record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_info.abatorgenerated_updateByPrimaryKeyForCgs", record);
        return rows;
    }
}