package com.neteast.rmp.dao;

import java.util.HashMap;
import java.util.List;

public interface BaseDBDAO {
	public List<String> getAllTableNames(String tableNameLike);
	public List<HashMap> getIPS(String value);
	public HashMap getIPValuess(HashMap value);
	public void updatetest(HashMap value);
}
