package com.neteast.rmp.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.ScParmTypeDAO;
import com.neteast.rmp.dao.domain.ScParmType;
import com.neteast.rmp.dao.domain.ScParmTypeExample;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.domain.pagination.PageObject;

@Repository
public class ScParmTypeDAOImpl extends BaseSqlMapClientDaoSupport implements ScParmTypeDAO {

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public ScParmTypeDAOImpl() {
        super();
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer insert(ScParmType record) {
        Object newKey = getSqlMapClientTemplate().insert("sc_parm_type.abatorgenerated_insert", record);
        return (Integer) newKey;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKey(ScParmType record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_type.abatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeySelective(ScParmType record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_type.abatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(ScParmTypeExample example, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        List list = getSqlMapClientTemplate().queryForList("sc_parm_type.abatorgenerated_selectByExample", parms);
        return list;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(ScParmTypeExample example) {
        return selectByExample(example, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public ScParmType selectByPrimaryKey(Integer id) {
        ScParmType key = new ScParmType();
        key.setId(id);
        ScParmType record = (ScParmType) getSqlMapClientTemplate().queryForObject("sc_parm_type.abatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByExample(ScParmTypeExample example) {
        int rows = getSqlMapClientTemplate().delete("sc_parm_type.abatorgenerated_deleteByExample", getExampleParms(example));
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByPrimaryKey(Integer id) {
        ScParmType key = new ScParmType();
        key.setId(id);
        int rows = getSqlMapClientTemplate().delete("sc_parm_type.abatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getIDExampleParms(ScParmTypeExample example) {
        Map parms = new HashMap();
        switch (example.getId_Indicator()) {
        case ScParmTypeExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NULL", "Y");
            } else {
                parms.put("AND_ID_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_NULL", "Y");
            } else {
                parms.put("AND_ID_NOT_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_EQUALS", "Y");
            } else {
                parms.put("AND_ID_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmTypeExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_ID_NOT_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GT", "Y");
            } else {
                parms.put("AND_ID_GT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GE", "Y");
            } else {
                parms.put("AND_ID_GE", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_LT", "Y");
            } else {
                parms.put("AND_ID_LT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN_OR_EQUAL:
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
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getTYPE_CODEExampleParms(ScParmTypeExample example) {
        Map parms = new HashMap();
        switch (example.getTypeCode_Indicator()) {
        case ScParmTypeExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NULL", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NOT_NULL", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NOT_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_CODE_EQUALS", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_CODE_NOT_EQUALS", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_GT", "Y");
            } else {
                parms.put("AND_TYPE_CODE_GT", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_GE", "Y");
            } else {
                parms.put("AND_TYPE_CODE_GE", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_LT", "Y");
            } else {
                parms.put("AND_TYPE_CODE_LT", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_CODE_LE", "Y");
            } else {
                parms.put("AND_TYPE_CODE_LE", "Y");
            }
            parms.put("typeCode", example.getTypeCode());
            break;
        case ScParmTypeExample.EXAMPLE_LIKE:
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
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getTYPE_NAMEExampleParms(ScParmTypeExample example) {
        Map parms = new HashMap();
        switch (example.getTypeName_Indicator()) {
        case ScParmTypeExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_NULL", "Y");
            } else {
                parms.put("AND_TYPE_NAME_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_NOT_NULL", "Y");
            } else {
                parms.put("AND_TYPE_NAME_NOT_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_NAME_EQUALS", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_TYPE_NAME_NOT_EQUALS", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_GT", "Y");
            } else {
                parms.put("AND_TYPE_NAME_GT", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_GE", "Y");
            } else {
                parms.put("AND_TYPE_NAME_GE", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_LT", "Y");
            } else {
                parms.put("AND_TYPE_NAME_LT", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_LE", "Y");
            } else {
                parms.put("AND_TYPE_NAME_LE", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        case ScParmTypeExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TYPE_NAME_LIKE", "Y");
            } else {
                parms.put("AND_TYPE_NAME_LIKE", "Y");
            }
            parms.put("typeName", example.getTypeName());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getSYSTEM_SIGNExampleParms(ScParmTypeExample example) {
        Map parms = new HashMap();
        switch (example.getSystemSign_Indicator()) {
        case ScParmTypeExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_NULL", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_NOT_NULL", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_NOT_NULL", "Y");
            }
            break;
        case ScParmTypeExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_EQUALS", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_EQUALS", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        case ScParmTypeExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_NOT_EQUALS", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_GT", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_GT", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        case ScParmTypeExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_GE", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_GE", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_LT", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_LT", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        case ScParmTypeExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SYSTEM_SIGN_LE", "Y");
            } else {
                parms.put("AND_SYSTEM_SIGN_LE", "Y");
            }
            parms.put("systemSign", example.getSystemSign());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getExampleParms(ScParmTypeExample example) {
        Map parms = new HashMap();
        parms.putAll(getIDExampleParms(example));
        parms.putAll(getTYPE_CODEExampleParms(example));
        parms.putAll(getTYPE_NAMEExampleParms(example));
        parms.putAll(getSYSTEM_SIGNExampleParms(example));
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int selectCountByExample(ScParmTypeExample example) {
        Map parms = getExampleParms(example);
        int count = ((Integer)getSqlMapClientTemplate().queryForObject("sc_parm_type.abatorgenerated_selectCountByExample", parms)).intValue();
        return count;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(ScParmTypeExample example, int pageSize, int pageNum, String orderByClause) {
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
            pageList = (getSqlMapClientTemplate().queryForList("sc_parm_type.abatorgenerated_selectByExample", parms, pageObject.getBeginIndex() - 1, pageSize));
        }
        pageBox.setPageObject(pageObject);
        pageBox.setPageList(pageList);
        return pageBox;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(ScParmTypeExample example, int pageSize, int pageNum) {
        return selectByExampleWithPaging(example, pageSize, pageNum, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_parm_type
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeyForCgs(ScParmType record) {
        int rows = getSqlMapClientTemplate().update("sc_parm_type.abatorgenerated_updateByPrimaryKeyForCgs", record);
        return rows;
    }
}