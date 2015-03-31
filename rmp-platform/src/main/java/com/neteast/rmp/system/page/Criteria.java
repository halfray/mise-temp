package com.neteast.rmp.system.page;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 条件查询类
 */
public class Criteria {
  /** 要排序的字段 */
  private List<String> order;
  /** 条件查询数据 */
  private Map<String,String> data = new HashMap<String,String>();
  
  public Map<String, String> getData() {
	return data;
}

public void setData(Map<String, String> data) {
	this.data = data;
}

/** 当前页数 */
  private int pageNo = 1;
  /** 第一条记录 */
  private int start;
  /** 最大记录数 */
  private int fetchSize = 10;


  public int getStart() {
    return start;
  }

  public void setStart(int start) {
    this.start = start;
  }

  public int getFetchSize() {
    return fetchSize;
  }

  public void setFetchSize(int fetchSize) {
    this.fetchSize = fetchSize;
  }

  public List<String> getOrder() {
    return order;
  }

  public void setOrder(List<String> order) {
    this.order = order;
  }

  public int getPageNo() {
    return pageNo;
  }

  public void setPageNo(int pageNo) {
    this.pageNo = pageNo;
  }
}