package com.neteast.rmp.web.test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.rpc.BaseActionController;
import com.neteast.rmp.system.tree.CheckExtTreeNode;
import com.neteast.rmp.system.tree.ExtTreeNode;
import com.neteast.rmp.web.util.DateUtil;

@Service
public class TestRpcActionController {
	public int getInt(int i)
	{
		return i + 1;
	}
	
	public float getFloat(float f)
	{
		return f*2;
	}
	public double getDouble(double d)
	{
		return d*3;
	}
	public String getString(String value)
	{
		return value + "anything";
	}
	public Date getDate(Date date)
	{
		return DateUtil.getDownDate(date, -1, 0, 0);
	}
	public Map getMap(Map map)
	{
		 map.put("name", "lxh");

		 return map;
	}
	public List getArrayList(List list)
	{
		ArrayList ar = null;
		if(list instanceof ArrayList)
		{
			ar = (ArrayList)list;
		}
		ar.add("lxh");
		return ar;
	}
	public Set getSet(Set set)
	{
		set.add("lxh");
		return set;
	}
	public Boolean getBoolean(Boolean b)
	{
		return b;
	}
	public Integer getCallBack(Integer i)
	{
		return i * 2;
	}
	public Bean getBean(Bean bean)
	{
		bean.setName(bean.getName() + "123");
		bean.setValue(bean.getValue() + "123");
		return bean;
	}
	public static List<ExtTreeNode> testTreeField()
	{
		List list = new ArrayList();
		ExtTreeNode treeNode = new ExtTreeNode();
		treeNode.setId("1");
		treeNode.setText("国家");
		
		ExtTreeNode treeNode1 = new ExtTreeNode();
		treeNode1.setId("2");
		treeNode1.setText("省份");
		treeNode1.setParentid("1");
		
		ExtTreeNode treeNode2 = new ExtTreeNode();
		treeNode2.setId("3");
		treeNode2.setText("城市");
		treeNode2.setParentid("2");
		
		ExtTreeNode treeNode3 = new ExtTreeNode();
		treeNode3.setId("4");
		treeNode3.setText("省份");
		treeNode3.setParentid("3");
		
		ExtTreeNode treeNode4 = new CheckExtTreeNode();
		treeNode4.setId("5");
		treeNode4.setText("城市fasdfasdfasdfsadfadsd");
		treeNode4.setParentid("4");
		
		treeNode.getChildren().add(treeNode1);
		treeNode1.getChildren().add(treeNode2);
		treeNode2.getChildren().add(treeNode3);
		treeNode3.getChildren().add(treeNode4);
		list.add(treeNode);
		
		return list;
	}
}