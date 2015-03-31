package com.neteast.rmp.system.page;

import java.util.ArrayList;
import java.util.List;

public class Page {
	public static Integer DEFAULT_PAGESIZE = 15;
	private List list = new ArrayList();
	private Integer pageno = 1;
	private Integer pagesize = 1;
	private Integer total = 1;
	private Integer rowstotal;
	private Integer startrow;

	public Page() {
		this.list = new ArrayList();
	}

	public Page(Criteria c) {
		this.setPageSize(c.getFetchSize());
		this.setPageno(c.getPageNo());
	}
	
	public Page(Criteria c,List list ,Integer rowstotal)
	{
		this(c);
		this.list = list;
		this.rowstotal = rowstotal;
		if(list.size() > 0 && rowstotal >0)
			this.excecute();
	}

	public static Page getEmptyPage() {
		Page page = new Page();
		page.setPageSize(1);
		page.setList(new ArrayList());
		page.setTotal(1);
		page.setPageno(1);
		return page;
	}

	public Integer getRowsTotal() {
		return this.rowstotal;
	}

	public void setRowsTotal(Integer rowstotal) {
		this.rowstotal = rowstotal;
	}

	public List getList() {
		return this.list;
	}

	public Integer getPageno() {
		return this.pageno;
	}

	public Integer getPageSize() {
		return this.pagesize;
	}

	public Integer getTotal() {
		return this.total;
	}

	public void setList(List list) {
		this.list = list;
	}

	public void setPageno(Integer i) {
		this.pageno = i;
	}

	public void setPageSize(Integer i) {
		this.pagesize = i;
	}

	public void setTotal(Integer i) {
		this.total = i;
	}

	public void excecute() {
		if (this.pageno <= 0)
			this.pageno = 1;
		if (this.pagesize <= 0)
			this.pagesize = DEFAULT_PAGESIZE;
		Integer startrow = 1;

		if (this.rowstotal <= (this.pageno - 1) * this.pagesize) {
			if (this.rowstotal % this.pagesize == 0)
				this.pageno = (this.rowstotal / this.pagesize);
			else {
				this.pageno = (this.rowstotal / this.pagesize + 1);
			}
		}

		if (this.pageno <= 0)
			this.pageno = 1;
		startrow = this.pagesize * (this.pageno - 1);
		Integer totalpage = 1;

		if (this.rowstotal % this.pagesize == 0)
			totalpage = this.rowstotal / this.pagesize;
		else {
			totalpage = this.rowstotal / this.pagesize + 1;
		}
		this.total = totalpage;
		this.startrow = startrow;
	}

	public Integer getStartRow() {
		return this.startrow;
	}

	public void setStartRow(Integer startrow) {
		this.startrow = startrow;
	}
}
