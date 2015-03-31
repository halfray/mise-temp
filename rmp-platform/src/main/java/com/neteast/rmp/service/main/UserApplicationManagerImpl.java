/**
 * 
 */
package com.neteast.rmp.service.main;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.acegisecurity.GrantedAuthority;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.ScUserDAO;
import com.neteast.rmp.dao.domain.ScUser;
import com.neteast.rmp.dao.domain.ScUserExample;
import com.seraph.bi.suite.support.core.resources.CodeTransformEntity;
import com.seraph.bi.suite.support.core.resources.LocalResourcesManager;
import com.seraph.bi.suite.support.security.LoginUtil;

import edu.emory.mathcs.backport.java.util.Arrays;

/**
 * Description:<br>
 * Origin Time: 2009-5-13 下午02:01:21<br>
 * 
 * @author Seraph<br>
 * @email:seraph115@gmail.com<br>
 */
@Service
public class UserApplicationManagerImpl extends JdbcDaoSupport implements
		UserApplicationManager {

	private ScUserDAO scUserDAO;
	
	private LocalResourcesManager localResourcesManager;

	public void setLocalResourcesManager(LocalResourcesManager localResourcesManager) {
		this.localResourcesManager = localResourcesManager;
	}

	public void setScUserDAO(ScUserDAO scUserDAO) {
		this.scUserDAO = scUserDAO;
	}

	@SuppressWarnings("unchecked")
	public Object getUserAuthorities() {

		Map<String, String> roleMap = localResourcesManager.getCodeInfoMapByType("SC_ROLE_MAP");
		List<GrantedAuthority> authorities = Arrays.asList(LoginUtil.getAuthentication().getAuthorities());
		
		List<CodeTransformEntity> result = new ArrayList<CodeTransformEntity>();
		for (Iterator<GrantedAuthority> iterator = authorities.iterator(); iterator.hasNext();) {
			GrantedAuthority ga = (GrantedAuthority) iterator.next();
			String role = ga.getAuthority();
			String roleCN = roleMap.get(role);
			result.add(new CodeTransformEntity(role, roleCN));			
		}

		return result;
	}

	public ScUser getUserDetail() {
		
		ScUserExample example = new ScUserExample();
		example.setUserName(LoginUtil.getUser().getUsername());
		example.setUserName_Indicator(ScUserExample.EXAMPLE_EQUALS);
		// TODO: Handle NullPointException
		return (ScUser) scUserDAO.selectByExample(example).get(0);
	}

}
