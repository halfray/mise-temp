package com.neteast.rmp.web.test;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.neteast.rmp.rpc.BaseActionController;
import com.neteast.rmp.system.tree.ExtTreeNode;


@Controller
@RequestMapping("/testAction.do")
public class TestActionController extends  BaseActionController{
	public String getName(Map<String, String> map)
	{
		return map.get("name");
	}
	public Set getMap(HashSet<String> name)
	{
		Iterator iter = name.iterator();
		while(iter.hasNext())
		{
			System.out.println(iter.next());
		}
		return name;
	}
	public int[] add(int[] a)
	{
		return new int[]{a[0] + a[1]};
	}
	public static void main(String[] args)
	{
		JSONObject obj = JSONObject.fromObject("{method:[[check]]}");
		System.out.println(obj.getJSONArray("method").getJSONArray(0).get(0));
	}
}
