/**
 * 
 */
package com.neteast.rmp.web.reportproxy;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.neteast.rmp.service.reportproxy.EncryptUtil;
import com.neteast.rmp.service.reportproxy.ReportProxyKeyContainer;
import com.seraph.bi.suite.support.web.base.BaseHelper;

/**
 * 类说明: 报表代理控制器<br>
 * 创建时间: 2012-12-7 下午9:51:00<br>
 * 
 * @author 刘岩松<br>
 * @email liuys@neteast.com<br>
 */
public class ReportProxyController extends AbstractController {

	private static final Logger log = Logger
			.getLogger(ReportProxyController.class);

	@Autowired
	private String reportServerUrl;

	@Autowired
	private ReportProxyKeyContainer reportProxyKeyContainer;

	private static String getDate() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		return sdf.format(new Date());
	}

	private String getSecuritySign(String reportKey) {
		String content = reportKey + getDate()
				+ reportProxyKeyContainer.getKey();
		String sign = EncryptUtil.getKeyedDigest(content);
		return sign;
	}
	
	private String getActualUrl(String reportKey, String urlEncode) {
		
		StringBuffer url = new StringBuffer();
		if(!reportServerUrl.contains("http://")) {
			url.append("http://");
		}
		url.append(reportServerUrl);
		url.append("?");
		url.append(urlEncode);
		url.append("&sign=");
		url.append(getSecuritySign(reportKey));

		return url.toString();
	}

	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String reportKey = request.getParameter("reportKey");
		if (StringUtils.isBlank(reportKey)) {
			return new ModelAndView();
		}
		String urlEncode = BaseHelper.createTransParm(request);
		String actualUrl = getActualUrl(reportKey, urlEncode);
		log.debug("Report proxy request: " + actualUrl);
		response.sendRedirect(actualUrl);
		return null;
	}

	public String getReportServerUrl() {
		return reportServerUrl;
	}

	public void setReportServerUrl(String reportServerUrl) {
		this.reportServerUrl = reportServerUrl;
	}

	public ReportProxyKeyContainer getReportProxyKeyContainer() {
		return reportProxyKeyContainer;
	}

	public void setReportProxyKeyContainer(
			ReportProxyKeyContainer reportProxyKeyContainer) {
		this.reportProxyKeyContainer = reportProxyKeyContainer;
	}

}
