package com.neteast.rmp.web.test;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.neteast.rmp.system.page.Criteria;
import com.seraph.bi.suite.support.domain.pagination.ExtPagingGridBean;

@Service
public class TestGridService {
	public ExtPagingGridBean getList(Criteria criteria,Map map)
	{
		System.out.println(criteria);
		System.out.println(map);
		return null;
	}
}
