/**
 * 
 */
package com.neteast.rmp.web.system;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.seraph.bi.suite.support.core.resources.CodeTransformEntity;
import com.seraph.bi.suite.support.core.resources.LocalResourcesManager;
import com.seraph.bi.suite.support.security.BaseUser;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明: 系统参数数据提供<br>
 * 创建时间: 2008-8-27 上午10:29:48<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/systemParmsProvider.do")
public class SystemParmsProviderController extends JsonProviderController {

	private LocalResourcesManager localResourcesManager;

	public void setLocalResourcesManager(
			LocalResourcesManager localResourcesManager) {
		this.localResourcesManager = localResourcesManager;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {
		BaseUser user = LoginUtil.getUser();
		List list = new ArrayList();
		String type = request.getParameter("type");
		String province = request.getParameter("province");
		type = type.toUpperCase();

		List result = localResourcesManager.getCodeInfoListByType(type);
		if("TB_OP_W_0103_LIST".equals(type)){
			// 是一级机构登录，直接返回结果
			if("10001".equals(user.getOrgCode())||"20001".equals(user.getOrgCode())||"1".equals(user.getOrgCode())){ //本想机构级别，但是登陆用户信息中无此信息。暂时先硬编码
				if (result != null) {
					list = result;
				}
				return list;
			}
			// 其他机构登录情况
			if(province == null || !"false".equals(province)){// 用省份权限控制过滤
				for(int i = 0; i< result.size(); i++ ){
					CodeTransformEntity codeTransformEntity = (CodeTransformEntity)result.get(i);
					if(user.getOrgCode().equals(codeTransformEntity.getCodeValue())){
//					if("510000".equals(codeTransformEntity.getCodeValue())){
						list.add(codeTransformEntity);
						break;
					}
				}
			}else{// 不用省份权限过滤，直接返回结果
				if (result != null) {
					list = result;
				}
			}
		}else{
			if (result != null) {
				list = result;
			}
		}

		return list;
	}

}
