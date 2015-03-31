package com.neteast.rmp.bean;


import java.io.FileWriter;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.web.context.ServletContextAware;

import com.seraph.bi.suite.support.core.SpringContext;
import com.seraph.bi.suite.support.core.resources.ConvertDataDeclareCell;
import com.seraph.bi.suite.support.core.resources.LocalResourcesDeclareProxy;
import com.seraph.bi.suite.support.util.json.JsonUtils;

public class LocalResourcesInit extends JdbcDaoSupport
    implements ServletContextAware, ApplicationContextAware
{

	private static final Logger logger = Logger.getLogger(LocalResourcesInit.class);
    private static final char SEPARATOR = 32;
    private static final String SPLIT_SIGN = "_";
    private static final String SUFFIX_MAP = "MAP";
    private static final String SUFFIX_LIST = "LIST";
    private static List convertDataCellList;
    private ServletContext servletContext;
    private LocalResourcesDeclareProxy localResourcesDeclareProxy;
    
    public LocalResourcesInit()
    {
    }
    public static void main(String[] args) throws IOException {
    	LocalResourcesInit initialize = new LocalResourcesInit();
    	try {
			initialize.initialize();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
    //系统启动初始化，生成local-resource.js字典文件
    public void initialize() throws SQLException, IOException
    {
        logger.debug("\u52A0\u8F7D\u9875\u9762\u8F6C\u6362\u7528\u672C\u5730\u5316\u8D44\u6E90...");
//        convertDataCellList = this.getConvertDataDeclareCells();
        convertDataCellList = localResourcesDeclareProxy.getConvertDataDeclareCells();
        if(convertDataCellList != null && convertDataCellList.size() > 0)
        {
        	String path = "/scripts/utils/local-resource.js";
        	ConvertDataDeclareCell cell;
        	FileWriter fw = createDictFileForHead(path);
        	for(int i=0;i<convertDataCellList.size();i++){
        		cell = (ConvertDataDeclareCell)convertDataCellList.get(i);
        		setConvertMapByCondition(fw, cell);
        	}
        	fw.append("END:[]};");
            fw.close();
        }
    }

   
    public FileWriter createDictFileForHead(String path) throws IOException { 
    	Resource  res = SpringContext.getApplicationContext().getResource(path);
    	StringBuilder resoruce = new StringBuilder();
    	String prefix = "\r\n";
		FileWriter fw = new FileWriter(res.getFile());
		resoruce.append("Ext.namespace('System.common.dict.stores');"+prefix);
    	resoruce.append("System.common.dict.stores = {"+prefix);
    	fw.append(resoruce);
    	
		return fw;
	}
    
    public void createDictFileForContent(FileWriter fw, ConvertDataDeclareCell cell, String content) throws IOException { 
    	StringBuilder resoruce = new StringBuilder();
    	resoruce.append(cell.getListReturnType()+": "+"new Ext.data.JsonStore({\r\n");
    	resoruce.append("fields: ['codeLabel', 'codeValue'],\r\n");
    	resoruce.append("data: "+content+"\r\n");
    	resoruce.append("}),\r\n");
    	
//    	resoruce.append(cell.getMapReturnType()+": "+"new Ext.data.JsonStore({\r\n");
//    	resoruce.append("fields: ['codeLabel', 'codeValue'],\r\n");
//    	resoruce.append("data: "+content+"\r\n");
//    	resoruce.append("}),\r\n");
    	
    	fw.write(resoruce.toString());
	}
    
    
    private void setConvertMapByCondition(FileWriter fw , ConvertDataDeclareCell cell) throws SQLException
    {
        String listReturnType = null;
        String mapReturnType = null;
        setConvertName(cell);
        listReturnType = cell.getListReturnType();
        mapReturnType = cell.getMapReturnType();
        logger.debug((new StringBuilder("[CODE_TYPE = ")).append(listReturnType).append("]").toString());
        logger.debug((new StringBuilder("[CODE_TYPE = ")).append(mapReturnType).append("]").toString());
        final String codeValueName = cell.getCodeValueName();
        final String codeLabelName = cell.getCodeLabelName();
        String sql = getQuerySql(cell);
        Object params[] = new Object[0];
        final Map resultMap = new HashMap();
        List resultList = new ArrayList();
        
        JdbcTemplate jdbcTemplate = getJdbcTemplate();
        try
        {
//            jdbcTemplate.query(sql, params, new RowCallbackHandler() {
//
//                public void processRow(ResultSet rs)
//                {
//                    try
//                    {
//                        String key = rs.getString(codeValueName);
//                        String value = rs.getString(codeLabelName);
//                        resultMap.put(key, value);
//                        CodeTransformEntity entity = new CodeTransformEntity();
//                        entity.setCodeValue(key);
//                        entity.setCodeLabel(value);
//                        resultList.add(entity);
//                        System.out.println(resultList.toString());
//                        System.out.println((new StringBuilder("[Key, Value = ")).append(key.toUpperCase()).append(", ").append(value).append("]").toString());
//                    }
//                    catch(SQLException e)
//                    {
//                        LocalResourcesInit.logger.error("$RowCallbackHandler.processRow(ResultSet)", e);
//                    }
//                  
//                }
//                
//            });
        	resultList = (List) servletContext.getAttribute(listReturnType);
            createDictFileForContent(fw, cell, JsonUtils.toJson(resultList));
            logger.debug("-------------"+JsonUtils.toJson(resultList));
        }
        catch(Exception e)
        {
            logger.debug("Table not found");
        }
    }
    private void setConvertName(ConvertDataDeclareCell cell)
    {
        String tableName = cell.getTableName().toUpperCase();
        String entityName = cell.getEntityName().toUpperCase();
        if(StringUtils.isEmpty(entityName))
        {
            cell.setListReturnType((new StringBuilder(String.valueOf(tableName))).append("_").append("LIST").toString());
            cell.setMapReturnType((new StringBuilder(String.valueOf(tableName))).append("_").append("MAP").toString());
        } else
        {
            cell.setListReturnType((new StringBuilder(String.valueOf(entityName))).append("_").append("LIST").toString());
            cell.setMapReturnType((new StringBuilder(String.valueOf(entityName))).append("_").append("MAP").toString());
        }
    }
    
    private String getQuerySql(ConvertDataDeclareCell cell)
    {
        String tableName = cell.getTableName();
        String codeValueName = cell.getCodeValueName();
        String codeLabelName = cell.getCodeLabelName();
        String condition = cell.getCondition();
        if(StringUtils.isBlank(cell.getQuerySql()))
        {
            String columnName = (new StringBuilder(String.valueOf(codeValueName))).append(",").append(codeLabelName).toString();
            List list = new LinkedList();
            list.add("select");
            list.add(columnName);
            list.add("from");
            list.add(tableName);
            if(StringUtils.isNotBlank(condition))
            {
                list.add("where");
                list.add(condition);
            }
            return StringUtils.join(list.iterator(), ' ');
        } else
        {
            return cell.getQuerySql();
        }
    }

    public static void setConvertDataCellList(List convertDataCellList)
    {
        convertDataCellList = convertDataCellList;
    }

    public LocalResourcesDeclareProxy getLocalResourcesDeclareProxy()
    {
        return localResourcesDeclareProxy;
    }

    public void setLocalResourcesDeclareProxy(LocalResourcesDeclareProxy localResourcesDeclareProxy)
    {
        this.localResourcesDeclareProxy = localResourcesDeclareProxy;
    }

    public Object getPersistentResource(String key)
    {
        return servletContext.getAttribute(key);
    }

    public void setServletContext(ServletContext servletContext)
    {
        this.servletContext = servletContext;
    }

    public void setApplicationContext(ApplicationContext applicationContext)
        throws BeansException
    {
        SpringContext.setApplicationContext(applicationContext);
    }
}
