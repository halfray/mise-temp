package com.neteast.rmp.export.util;

import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSON;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.StrutsException;
import org.apache.struts2.dispatcher.StrutsResultSupport;

import com.opensymphony.xwork2.ActionInvocation;

/**
 * JSON类型的Struts Result。<br/>
 * 将自定义JSON类型的文本发送至HttpServletResponse对象。<br/>
 */
public class JSONResult extends StrutsResultSupport {
	private static final long serialVersionUID = 2318438574179079021L;

	private static final Log log = LogFactory.getLog(JSONResult.class);

	public static final String DEFAULT_PARAM = "jsonObjectProperty";

	private String jsonObjectProperty = "jsonObject";

	private String contentType = "text/html;charset=gbk";

	/**
	 * Returns the property which will be used to lookup {@link JSONObject} in Struts's ValueStack. Default to 'jsonObject'.
	 * 
	 * @return String
	 */
	public String getJsonObjectProperty() {
		return jsonObjectProperty;
	}

	/**
	 * Set the property which will be used to lookup {@link JSON} in Struts's ValueStack. Default to 'jsonObject'.
	 * 
	 * @param jsonObject
	 */
	public void setJsonObjectProperty(String jsonObjectProperty) {
		this.jsonObjectProperty = jsonObjectProperty;
	}

	/**
	 * Returns the content-type header to be used. Default to 'application/json'.
	 * 
	 * @return String
	 */
	public String getContentType() {
		return contentType;
	}

	/**
	 * Set the content-type header to be used. Default to 'application/json'.
	 * 
	 * @param contentType
	 */
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	/**
	 * @see org.apache.struts2.dispatcher.StrutsResultSupport#doExecute(java.lang.String, com.opensymphony.xwork2.ActionInvocation)
	 */
	protected void doExecute(String finalLocation, ActionInvocation invocation) throws Exception {

		if (log.isDebugEnabled()) {
			log.debug("executing JSONResult");
		}

		JSON jsonObject = getJSON(invocation);
		if (jsonObject != null) {
			String json = jsonObject.toString();
			HttpServletResponse response = getServletResponse(invocation);
			response.setContentType(getContentType());
			response.setContentLength(json.getBytes().length);
			OutputStream os = response.getOutputStream();
			os.write(json.getBytes());
			os.flush();

			if (log.isDebugEnabled()) {
				log.debug("written [" + json + "] to HttpServletResponse outputstream");
			}
		}
	}

	/**
	 * Attempt to look up a {@link net.sf.json.JSON} instance through the property ({@link #getJSONObjectProperty()}) by looking up the property in Struts's
	 * ValueStack. It shall be found if there's accessor method for the property in Struts's action itself. <p/> Returns null if one cannot be found. <p/> We
	 * could override this method to return the desired JSONObject when writing testcases.
	 * 
	 * @param invocation
	 * @return {@link link net.sf.json.JSON} or null if one cannot be found
	 */
	protected JSON getJSON(ActionInvocation invocation) throws JSONException {
		Object obj = invocation.getStack().findValue(conditionalParse(jsonObjectProperty, invocation));

		if (obj == null) {
			log.error("property [" + jsonObjectProperty + "] returns null, expecting JSON", new StrutsException());
			return null;
		}
		if (!JSON.class.isInstance(obj)) {
			log.error("property [" + jsonObjectProperty + "] is [" + obj + "] especting an instance of JSON", new StrutsException());
			return null;
		}
		return (JSON) obj;
	}

	/**
	 * Returns a {@link javax.servlet.http.HttpServletResponse} by looking it up through Struts's ActionContext Map.
	 * </p>
	 * We could override this method to return the desired Mock HttpServletResponse when writing testcases.
	 * 
	 * @param invocation
	 * @return {@link javax.servlet.http.HttpServletResponse}
	 */
	protected HttpServletResponse getServletResponse(ActionInvocation invocation) {
		return (HttpServletResponse) invocation.getInvocationContext().get(HTTP_RESPONSE);
	}
}