package com.neteast.rmp.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.RptMetaDAO;
import com.neteast.rmp.dao.domain.RptMeta;
import com.neteast.rmp.dao.domain.RptMetaExample;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.domain.pagination.PageObject;

@Repository
public class RptMetaDAOImpl extends BaseSqlMapClientDaoSupport implements RptMetaDAO {

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public RptMetaDAOImpl() {
        super();
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public Integer insert(RptMeta record) {
        Object newKey = getSqlMapClientTemplate().insert("rpt_meta.abatorgenerated_insert", record);
        return (Integer) newKey;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKey(RptMeta record) {
        int rows = getSqlMapClientTemplate().update("rpt_meta.abatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeySelective(RptMeta record) {
        int rows = getSqlMapClientTemplate().update("rpt_meta.abatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(RptMetaExample example, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        List list = getSqlMapClientTemplate().queryForList("rpt_meta.abatorgenerated_selectByExample", parms);
        return list;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public List selectByExample(RptMetaExample example) {
        return selectByExample(example, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public RptMeta selectByPrimaryKey(Integer id) {
        RptMeta key = new RptMeta();
        key.setId(id);
        RptMeta record = (RptMeta) getSqlMapClientTemplate().queryForObject("rpt_meta.abatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByExample(RptMetaExample example) {
        int rows = getSqlMapClientTemplate().delete("rpt_meta.abatorgenerated_deleteByExample", getExampleParms(example));
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int deleteByPrimaryKey(Integer id) {
        RptMeta key = new RptMeta();
        key.setId(id);
        int rows = getSqlMapClientTemplate().delete("rpt_meta.abatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getIDExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getId_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NULL", "Y");
            } else {
                parms.put("AND_ID_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_NULL", "Y");
            } else {
                parms.put("AND_ID_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_EQUALS", "Y");
            } else {
                parms.put("AND_ID_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_ID_NOT_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GT", "Y");
            } else {
                parms.put("AND_ID_GT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GE", "Y");
            } else {
                parms.put("AND_ID_GE", "Y");
            }
            parms.put("id", example.getId());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_LT", "Y");
            } else {
                parms.put("AND_ID_LT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
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
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getRPT_CODEExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getRptCode_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_NULL", "Y");
            } else {
                parms.put("AND_RPT_CODE_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_NOT_NULL", "Y");
            } else {
                parms.put("AND_RPT_CODE_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_EQUALS", "Y");
            } else {
                parms.put("AND_RPT_CODE_EQUALS", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_RPT_CODE_NOT_EQUALS", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_GT", "Y");
            } else {
                parms.put("AND_RPT_CODE_GT", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_GE", "Y");
            } else {
                parms.put("AND_RPT_CODE_GE", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_LT", "Y");
            } else {
                parms.put("AND_RPT_CODE_LT", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_LE", "Y");
            } else {
                parms.put("AND_RPT_CODE_LE", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        case RptMetaExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_CODE_LIKE", "Y");
            } else {
                parms.put("AND_RPT_CODE_LIKE", "Y");
            }
            parms.put("rptCode", example.getRptCode());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getRPT_NAMEExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getRptName_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_NULL", "Y");
            } else {
                parms.put("AND_RPT_NAME_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_NOT_NULL", "Y");
            } else {
                parms.put("AND_RPT_NAME_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_EQUALS", "Y");
            } else {
                parms.put("AND_RPT_NAME_EQUALS", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_RPT_NAME_NOT_EQUALS", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_GT", "Y");
            } else {
                parms.put("AND_RPT_NAME_GT", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_GE", "Y");
            } else {
                parms.put("AND_RPT_NAME_GE", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_LT", "Y");
            } else {
                parms.put("AND_RPT_NAME_LT", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_LE", "Y");
            } else {
                parms.put("AND_RPT_NAME_LE", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        case RptMetaExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_RPT_NAME_LIKE", "Y");
            } else {
                parms.put("AND_RPT_NAME_LIKE", "Y");
            }
            parms.put("rptName", example.getRptName());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getSTORAGE_TYPEExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getStorageType_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_NULL", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_NOT_NULL", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_EQUALS", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_EQUALS", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_NOT_EQUALS", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_GT", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_GT", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_GE", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_GE", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_LT", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_LT", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_STORAGE_TYPE_LE", "Y");
            } else {
                parms.put("AND_STORAGE_TYPE_LE", "Y");
            }
            parms.put("storageType", example.getStorageType());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getPHYSICS_TABLEExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getPhysicsTable_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_NULL", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_NOT_NULL", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_EQUALS", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_EQUALS", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_NOT_EQUALS", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_GT", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_GT", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_GE", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_GE", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_LT", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_LT", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_LE", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_LE", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        case RptMetaExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PHYSICS_TABLE_LIKE", "Y");
            } else {
                parms.put("AND_PHYSICS_TABLE_LIKE", "Y");
            }
            parms.put("physicsTable", example.getPhysicsTable());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getTEMPLATE_PATHExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getTemplatePath_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_NULL", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_NOT_NULL", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_EQUALS", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_EQUALS", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_NOT_EQUALS", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_GT", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_GT", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_GE", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_GE", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_LT", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_LT", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_LE", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_LE", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        case RptMetaExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_TEMPLATE_PATH_LIKE", "Y");
            } else {
                parms.put("AND_TEMPLATE_PATH_LIKE", "Y");
            }
            parms.put("templatePath", example.getTemplatePath());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getDESCRIPTIONExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        switch (example.getDescription_Indicator()) {
        case RptMetaExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NULL", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NOT_NULL", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NOT_NULL", "Y");
            }
            break;
        case RptMetaExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_EQUALS", "Y");
            } else {
                parms.put("AND_DESCRIPTION_EQUALS", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_DESCRIPTION_NOT_EQUALS", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_GT", "Y");
            } else {
                parms.put("AND_DESCRIPTION_GT", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_GE", "Y");
            } else {
                parms.put("AND_DESCRIPTION_GE", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_LT", "Y");
            } else {
                parms.put("AND_DESCRIPTION_LT", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_DESCRIPTION_LE", "Y");
            } else {
                parms.put("AND_DESCRIPTION_LE", "Y");
            }
            parms.put("description", example.getDescription());
            break;
        case RptMetaExample.EXAMPLE_LIKE:
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
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    private Map getExampleParms(RptMetaExample example) {
        Map parms = new HashMap();
        parms.putAll(getIDExampleParms(example));
        parms.putAll(getRPT_CODEExampleParms(example));
        parms.putAll(getRPT_NAMEExampleParms(example));
        parms.putAll(getSTORAGE_TYPEExampleParms(example));
        parms.putAll(getPHYSICS_TABLEExampleParms(example));
        parms.putAll(getTEMPLATE_PATHExampleParms(example));
        parms.putAll(getDESCRIPTIONExampleParms(example));
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int selectCountByExample(RptMetaExample example) {
        Map parms = getExampleParms(example);
        int count = ((Integer)getSqlMapClientTemplate().queryForObject("rpt_meta.abatorgenerated_selectCountByExample", parms)).intValue();
        return count;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(RptMetaExample example, int pageSize, int pageNum, String orderByClause) {
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
            pageList = (getSqlMapClientTemplate().queryForList("rpt_meta.abatorgenerated_selectByExample", parms, pageObject.getBeginIndex() - 1, pageSize));
        }
        pageBox.setPageObject(pageObject);
        pageBox.setPageList(pageList);
        return pageBox;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public PageBox selectByExampleWithPaging(RptMetaExample example, int pageSize, int pageNum) {
        return selectByExampleWithPaging(example, pageSize, pageNum, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_meta
     *
     * @abatorgenerated Tue Sep 20 22:24:44 CST 2011
     */
    public int updateByPrimaryKeyForCgs(RptMeta record) {
        int rows = getSqlMapClientTemplate().update("rpt_meta.abatorgenerated_updateByPrimaryKeyForCgs", record);
        return rows;
    }
}