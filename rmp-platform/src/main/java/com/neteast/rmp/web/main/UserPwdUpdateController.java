/**
 * 
 */
package com.neteast.rmp.web.main;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.acegisecurity.providers.encoding.PasswordEncoder;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.neteast.rmp.dao.ScUserDAO;
import com.neteast.rmp.dao.domain.ScUser;
import com.neteast.rmp.dao.domain.ScUserExample;
import com.seraph.bi.suite.support.security.LoginUtil;
import com.seraph.bi.suite.support.web.BaseResponse;
import com.seraph.bi.suite.support.web.json.JsonProviderController;

/**
 * 类说明: 用户密码修改服务<br>
 * 创建时间: 2011-1-28 下午04:52:09<br>
 * 
 * @author 刘岩松<br>
 * @email: seraph115@gmail.com<br>
 */
@Controller
@RequestMapping("/userPwdUpdate.do")
public class UserPwdUpdateController extends JsonProviderController {

	private ScUserDAO scUserDAO;

	private PasswordEncoder passwordEncoder;
	
	@RequestMapping(method = { RequestMethod.POST })
	protected Object handleJsonRequest(HttpServletRequest request,
			HttpServletResponse response) {

		String originPassword = request.getParameter("originPassword");
		String newPassword = request.getParameter("newPassword");
		String repeatPassword = request.getParameter("repeatPassword");

		if (StringUtils.isNotBlank(originPassword)
				&& StringUtils.isNotBlank(newPassword)
				&& StringUtils.isNotBlank(repeatPassword)) {

			if (!newPassword.equals(repeatPassword)) {
				BaseResponse baseResponse = new BaseResponse();
				Map<String, String> map = new HashMap<String, String>();
				map.put("msg", "密码修改失败!原因：确认密码与新密码不符。");
				baseResponse.setSuccess(Boolean.valueOf(BaseResponse.FALSE));
				baseResponse.setErrors(map);
				return baseResponse;
			}

			String userName = LoginUtil.getUser().getUsername();

			ScUserExample example = new ScUserExample();
			example.setUserName(userName);
			example.setUserName_Indicator(ScUserExample.EXAMPLE_EQUALS);
			List<?> list = scUserDAO.selectByExample(example);

			if (list.size() > 0) {

				String userPassword = ((ScUser) list.get(0)).getPassword();
				String encodePassword = passwordEncoder.encodePassword(
						newPassword, null);

				if (passwordEncoder.isPasswordValid(userPassword,
						originPassword, null)) {

					if (StringUtils.isNotBlank(userName)) {
//						ScUserExample example1 = new ScUserExample();
//						example.setUserId(userCode);
//						example.setUserId_Indicator(ScUserExample.EXAMPLE_EQUALS);
//						scUserDAO.deleteByExample(example1);

						ScUser scUser = (ScUser) list.get(0);
						scUser.setPassword(encodePassword);
						scUserDAO.updateByPrimaryKey(scUser);
						
						BaseResponse baseResponse = new BaseResponse();
						Map<String, String> map = new HashMap<String, String>();
						map.put("msg", "密码修改成功！");
						baseResponse.setSuccess(Boolean
								.valueOf(BaseResponse.TRUE));
						baseResponse.setErrors(map);
						return baseResponse;
					} else {
						BaseResponse baseResponse = new BaseResponse();
						Map<String, String> map = new HashMap<String, String>();
						map.put("msg", "密码修改失败!原因：用户名不存在。");
						baseResponse.setSuccess(Boolean
								.valueOf(BaseResponse.FALSE));
						baseResponse.setErrors(map);
						return baseResponse;
					}
				} else {
					BaseResponse baseResponse = new BaseResponse();
					Map<String, String> map = new HashMap<String, String>();
					map.put("msg", "密码修改失败!原因：原始密码不正确。");
					baseResponse
							.setSuccess(Boolean.valueOf(BaseResponse.FALSE));
					baseResponse.setErrors(map);
					return baseResponse;
				}
			} else {
				BaseResponse baseResponse = new BaseResponse();
				Map<String, String> map = new HashMap<String, String>();
				map.put("msg", "密码修改失败!原因：用户名不存在。");
				baseResponse.setSuccess(Boolean.valueOf(BaseResponse.FALSE));
				baseResponse.setErrors(map);
				return baseResponse;
			}
		} else {
			BaseResponse baseResponse = new BaseResponse();
			Map<String, String> map = new HashMap<String, String>();
			map.put("msg", "密码修改失败!原因：更改信息不完整。");
			baseResponse.setSuccess(Boolean.valueOf(BaseResponse.FALSE));
			baseResponse.setErrors(map);
			return baseResponse;
		}
	}

	@Autowired
	public void setScUserDAO(ScUserDAO scUserDAO) {
		this.scUserDAO = scUserDAO;
	}

	@Autowired
	public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}

}
