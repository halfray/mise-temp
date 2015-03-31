package com.neteast.rmp.util;

/**
 * 条件查询子类
 */
public class Condition {
  public static final char VALUE_TYPE_STRING = 'S'; 
  public static final char VALUE_TYPE_LONG = 'L'; 
  public static final char VALUE_TYPE_DOUBLE = 'D'; 
  public static final char VALUE_TYPE_DATE = 'T'; 

  /** 属性名称 */
  protected String field;
  /** 匹配条件；in,like,=,>,<等 */
  protected String relation;
  /** 所要匹配的值 */
  protected String value;
  /** 逻辑判断条件：or或者and */
  protected String type = "and";
  /** 值类型: S=String，L=LONG, D=DOUBLE, T=Date **/
  protected char valueType= 'S';

  public String getField() {
    return field;
  }

  public void setField(String field) {
    this.field = field;
  }

  public String getRelation() {
    return relation;
  }

  public void setRelation(String relation) {
    this.relation = relation;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public char getValueType() {
	return valueType;
  }

  public void setValueType(char valueType) {
	this.valueType = valueType;
  }

}
