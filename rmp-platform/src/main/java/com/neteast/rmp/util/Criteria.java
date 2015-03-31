package com.neteast.rmp.util;

import java.util.List;

/**
 * 条件查询类
 */
public interface Criteria {
  public List<String> getFields();

  public void setFields(List<String> fields);

  public List<Condition> getCondition();

  public void setCondition(List<Condition> condition);

  public int getStart();

  public void setStart(int start);

  public int getFetchSize();

  public void setFetchSize(int fetchSize);

  public List<String> getOrder();

  public void setOrder(List<String> order);

  public int getPageNo();

  public void setPageNo(int pageNo);

  public String toString();
}
