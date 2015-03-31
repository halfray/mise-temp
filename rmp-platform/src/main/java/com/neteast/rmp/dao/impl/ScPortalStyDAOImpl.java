package com.neteast.rmp.dao.impl;

import com.neteast.rmp.dao.ScPortalStyDAO;
import com.neteast.rmp.dao.domain.ScPortalSty;
import com.neteast.rmp.dao.domain.ScPortalStyExample;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.domain.pagination.PageObject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public class ScPortalStyDAOImpl extends BaseSqlMapClientDaoSupport implements ScPortalStyDAO {

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public ScPortalStyDAOImpl() {
        super();
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public Integer insert(ScPortalSty record) {
        Object newKey = getSqlMapClientTemplate().insert("sc_portal_sty.abatorgenerated_insert", record);
        return (Integer) newKey;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int updateByPrimaryKey(ScPortalSty record) {
        int rows = getSqlMapClientTemplate().update("sc_portal_sty.abatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int updateByPrimaryKeySelective(ScPortalSty record) {
        int rows = getSqlMapClientTemplate().update("sc_portal_sty.abatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public List selectByExample(ScPortalStyExample example, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        List list = getSqlMapClientTemplate().queryForList("sc_portal_sty.abatorgenerated_selectByExample", parms);
        return list;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public List selectByExample(ScPortalStyExample example) {
        return selectByExample(example, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public ScPortalSty selectByPrimaryKey(Integer id) {
        ScPortalSty key = new ScPortalSty();
        key.setId(id);
        ScPortalSty record = (ScPortalSty) getSqlMapClientTemplate().queryForObject("sc_portal_sty.abatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int deleteByExample(ScPortalStyExample example) {
        int rows = getSqlMapClientTemplate().delete("sc_portal_sty.abatorgenerated_deleteByExample", getExampleParms(example));
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int deleteByPrimaryKey(Integer id) {
        ScPortalSty key = new ScPortalSty();
        key.setId(id);
        int rows = getSqlMapClientTemplate().delete("sc_portal_sty.abatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getIDExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getId_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NULL", "Y");
            } else {
                parms.put("AND_ID_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_NULL", "Y");
            } else {
                parms.put("AND_ID_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_EQUALS", "Y");
            } else {
                parms.put("AND_ID_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_ID_NOT_EQUALS", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GT", "Y");
            } else {
                parms.put("AND_ID_GT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_GE", "Y");
            } else {
                parms.put("AND_ID_GE", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_ID_LT", "Y");
            } else {
                parms.put("AND_ID_LT", "Y");
            }
            parms.put("id", example.getId());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
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
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getPORTAL_CODEExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getPortalCode_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_NULL", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_NOT_NULL", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_EQUALS", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_EQUALS", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_NOT_EQUALS", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_GT", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_GT", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_GE", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_GE", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_LT", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_LT", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_LE", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_LE", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        case ScPortalStyExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_CODE_LIKE", "Y");
            } else {
                parms.put("AND_PORTAL_CODE_LIKE", "Y");
            }
            parms.put("portalCode", example.getPortalCode());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getPORTAL_TITLEExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getPortalTitle_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_NULL", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_NOT_NULL", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_EQUALS", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_EQUALS", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_NOT_EQUALS", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_GT", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_GT", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_GE", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_GE", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_LT", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_LT", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_LE", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_LE", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        case ScPortalStyExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PORTAL_TITLE_LIKE", "Y");
            } else {
                parms.put("AND_PORTAL_TITLE_LIKE", "Y");
            }
            parms.put("portalTitle", example.getPortalTitle());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getCOLUMN_COUNTExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getColumnCount_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_NULL", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_NOT_NULL", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_EQUALS", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_EQUALS", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_NOT_EQUALS", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_GT", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_GT", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_GE", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_GE", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_LT", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_LT", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_COLUMN_COUNT_LE", "Y");
            } else {
                parms.put("AND_COLUMN_COUNT_LE", "Y");
            }
            parms.put("columnCount", example.getColumnCount());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getCELL_WIDTHExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getCellWidth_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_NULL", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_NOT_NULL", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_EQUALS", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_EQUALS", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_NOT_EQUALS", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_GT", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_GT", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_GE", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_GE", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_LT", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_LT", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_WIDTH_LE", "Y");
            } else {
                parms.put("AND_CELL_WIDTH_LE", "Y");
            }
            parms.put("cellWidth", example.getCellWidth());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getCELL_HEIGHTExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getCellHeight_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_NULL", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_NOT_NULL", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_EQUALS", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_EQUALS", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_NOT_EQUALS", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_GT", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_GT", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_GE", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_GE", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_LT", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_LT", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_CELL_HEIGHT_LE", "Y");
            } else {
                parms.put("AND_CELL_HEIGHT_LE", "Y");
            }
            parms.put("cellHeight", example.getCellHeight());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getSCROLL_WIDTHExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getScrollWidth_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_NULL", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_NOT_NULL", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_EQUALS", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_EQUALS", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_NOT_EQUALS", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_GT", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_GT", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_GE", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_GE", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_LT", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_LT", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_SCROLL_WIDTH_LE", "Y");
            } else {
                parms.put("AND_SCROLL_WIDTH_LE", "Y");
            }
            parms.put("scrollWidth", example.getScrollWidth());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getPADDINGExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        switch (example.getPadding_Indicator()) {
        case ScPortalStyExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_NULL", "Y");
            } else {
                parms.put("AND_PADDING_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_NOT_NULL", "Y");
            } else {
                parms.put("AND_PADDING_NOT_NULL", "Y");
            }
            break;
        case ScPortalStyExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_EQUALS", "Y");
            } else {
                parms.put("AND_PADDING_EQUALS", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        case ScPortalStyExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_PADDING_NOT_EQUALS", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_GT", "Y");
            } else {
                parms.put("AND_PADDING_GT", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        case ScPortalStyExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_GE", "Y");
            } else {
                parms.put("AND_PADDING_GE", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_LT", "Y");
            } else {
                parms.put("AND_PADDING_LT", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        case ScPortalStyExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_PADDING_LE", "Y");
            } else {
                parms.put("AND_PADDING_LE", "Y");
            }
            parms.put("padding", example.getPadding());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    private Map getExampleParms(ScPortalStyExample example) {
        Map parms = new HashMap();
        parms.putAll(getIDExampleParms(example));
        parms.putAll(getPORTAL_CODEExampleParms(example));
        parms.putAll(getPORTAL_TITLEExampleParms(example));
        parms.putAll(getCOLUMN_COUNTExampleParms(example));
        parms.putAll(getCELL_WIDTHExampleParms(example));
        parms.putAll(getCELL_HEIGHTExampleParms(example));
        parms.putAll(getSCROLL_WIDTHExampleParms(example));
        parms.putAll(getPADDINGExampleParms(example));
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int selectCountByExample(ScPortalStyExample example) {
        Map parms = getExampleParms(example);
        int count = ((Integer)getSqlMapClientTemplate().queryForObject("sc_portal_sty.abatorgenerated_selectCountByExample", parms)).intValue();
        return count;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public PageBox selectByExampleWithPaging(ScPortalStyExample example, int pageSize, int pageNum, String orderByClause) {
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
            pageList = (getSqlMapClientTemplate().queryForList("sc_portal_sty.abatorgenerated_selectByExample", parms, pageObject.getBeginIndex() - 1, pageSize));
        }
        pageBox.setPageObject(pageObject);
        pageBox.setPageList(pageList);
        return pageBox;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public PageBox selectByExampleWithPaging(ScPortalStyExample example, int pageSize, int pageNum) {
        return selectByExampleWithPaging(example, pageSize, pageNum, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table sc_portal_sty
     *
     * @abatorgenerated Sun Apr 07 19:51:43 CST 2013
     */
    public int updateByPrimaryKeyForCgs(ScPortalSty record) {
        int rows = getSqlMapClientTemplate().update("sc_portal_sty.abatorgenerated_updateByPrimaryKeyForCgs", record);
        return rows;
    }
}