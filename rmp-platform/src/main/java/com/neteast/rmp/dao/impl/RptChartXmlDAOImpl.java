package com.neteast.rmp.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.neteast.rmp.dao.RptChartXmlDAO;
import com.neteast.rmp.dao.domain.RptChartXml;
import com.neteast.rmp.dao.domain.RptChartXmlExample;
import com.neteast.rmp.dao.ibatis.ext.BaseSqlMapClientDaoSupport;
import com.seraph.bi.suite.support.domain.pagination.PageBox;
import com.seraph.bi.suite.support.domain.pagination.PageObject;

@Repository
public class RptChartXmlDAOImpl extends BaseSqlMapClientDaoSupport implements RptChartXmlDAO {

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public RptChartXmlDAOImpl() {
        super();
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public void insert(RptChartXml record) {
        getSqlMapClientTemplate().insert("rpt_chart_xml.abatorgenerated_insert", record);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int updateByPrimaryKey(RptChartXml record) {
        int rows = getSqlMapClientTemplate().update("rpt_chart_xml.abatorgenerated_updateByPrimaryKey", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int updateByPrimaryKeySelective(RptChartXml record) {
        int rows = getSqlMapClientTemplate().update("rpt_chart_xml.abatorgenerated_updateByPrimaryKeySelective", record);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public List selectByExample(RptChartXmlExample example, String orderByClause) {
        Map parms = getExampleParms(example);
        if (orderByClause != null) {
            parms.put("ABATOR_ORDER_BY_CLAUSE", orderByClause);
        }
        List list = getSqlMapClientTemplate().queryForList("rpt_chart_xml.abatorgenerated_selectByExample", parms);
        return list;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public List selectByExample(RptChartXmlExample example) {
        return selectByExample(example, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public RptChartXml selectByPrimaryKey(String chartId) {
        RptChartXml key = new RptChartXml();
        key.setChartId(chartId);
        RptChartXml record = (RptChartXml) getSqlMapClientTemplate().queryForObject("rpt_chart_xml.abatorgenerated_selectByPrimaryKey", key);
        return record;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int deleteByExample(RptChartXmlExample example) {
        int rows = getSqlMapClientTemplate().delete("rpt_chart_xml.abatorgenerated_deleteByExample", getExampleParms(example));
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int deleteByPrimaryKey(String chartId) {
        RptChartXml key = new RptChartXml();
        key.setChartId(chartId);
        int rows = getSqlMapClientTemplate().delete("rpt_chart_xml.abatorgenerated_deleteByPrimaryKey", key);
        return rows;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    private Map getchart_idExampleParms(RptChartXmlExample example) {
        Map parms = new HashMap();
        switch (example.getChartId_Indicator()) {
        case RptChartXmlExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_NULL", "Y");
            } else {
                parms.put("AND_chart_id_NULL", "Y");
            }
            break;
        case RptChartXmlExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_NOT_NULL", "Y");
            } else {
                parms.put("AND_chart_id_NOT_NULL", "Y");
            }
            break;
        case RptChartXmlExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_EQUALS", "Y");
            } else {
                parms.put("AND_chart_id_EQUALS", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_chart_id_NOT_EQUALS", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_GT", "Y");
            } else {
                parms.put("AND_chart_id_GT", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_GE", "Y");
            } else {
                parms.put("AND_chart_id_GE", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_LT", "Y");
            } else {
                parms.put("AND_chart_id_LT", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_LE", "Y");
            } else {
                parms.put("AND_chart_id_LE", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        case RptChartXmlExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_id_LIKE", "Y");
            } else {
                parms.put("AND_chart_id_LIKE", "Y");
            }
            parms.put("chartId", example.getChartId());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    private Map getchart_xmlExampleParms(RptChartXmlExample example) {
        Map parms = new HashMap();
        switch (example.getChartXml_Indicator()) {
        case RptChartXmlExample.EXAMPLE_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_NULL", "Y");
            } else {
                parms.put("AND_chart_xml_NULL", "Y");
            }
            break;
        case RptChartXmlExample.EXAMPLE_NOT_NULL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_NOT_NULL", "Y");
            } else {
                parms.put("AND_chart_xml_NOT_NULL", "Y");
            }
            break;
        case RptChartXmlExample.EXAMPLE_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_EQUALS", "Y");
            } else {
                parms.put("AND_chart_xml_EQUALS", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_NOT_EQUALS:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_NOT_EQUALS", "Y");
            } else {
                parms.put("AND_chart_xml_NOT_EQUALS", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_GREATER_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_GT", "Y");
            } else {
                parms.put("AND_chart_xml_GT", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_GREATER_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_GE", "Y");
            } else {
                parms.put("AND_chart_xml_GE", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_LESS_THAN:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_LT", "Y");
            } else {
                parms.put("AND_chart_xml_LT", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_LESS_THAN_OR_EQUAL:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_LE", "Y");
            } else {
                parms.put("AND_chart_xml_LE", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        case RptChartXmlExample.EXAMPLE_LIKE:
            if (example.isCombineTypeOr()) {
                parms.put("OR_chart_xml_LIKE", "Y");
            } else {
                parms.put("AND_chart_xml_LIKE", "Y");
            }
            parms.put("chartXml", example.getChartXml());
            break;
        }
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    private Map getExampleParms(RptChartXmlExample example) {
        Map parms = new HashMap();
        parms.putAll(getchart_idExampleParms(example));
        parms.putAll(getchart_xmlExampleParms(example));
        return parms;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int selectCountByExample(RptChartXmlExample example) {
        Map parms = getExampleParms(example);
        int count = ((Integer)getSqlMapClientTemplate().queryForObject("rpt_chart_xml.abatorgenerated_selectCountByExample", parms)).intValue();
        return count;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public PageBox selectByExampleWithPaging(RptChartXmlExample example, int pageSize, int pageNum, String orderByClause) {
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
            pageList = (getSqlMapClientTemplate().queryForList("rpt_chart_xml.abatorgenerated_selectByExample", parms, pageObject.getBeginIndex() - 1, pageSize));
        }
        pageBox.setPageObject(pageObject);
        pageBox.setPageList(pageList);
        return pageBox;
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public PageBox selectByExampleWithPaging(RptChartXmlExample example, int pageSize, int pageNum) {
        return selectByExampleWithPaging(example, pageSize, pageNum, null);
    }

    /**
     * This method was generated by Abator for iBATIS.
     * This method corresponds to the database table rpt_chart_xml
     *
     * @abatorgenerated Wed Nov 28 13:45:30 CST 2012
     */
    public int updateByPrimaryKeyForCgs(RptChartXml record) {
        int rows = getSqlMapClientTemplate().update("rpt_chart_xml.abatorgenerated_updateByPrimaryKeyForCgs", record);
        return rows;
    }
}