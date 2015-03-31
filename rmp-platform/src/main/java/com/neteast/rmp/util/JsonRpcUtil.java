package com.neteast.rmp.util;

import java.io.BufferedReader;
import java.io.CharArrayWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

/**
 * 模块名称: 类名称： JsonRpcUtil 类描述： 创建时间：2009-12-2 上午09:33:33 修改时间：2009-12-2
 * 上午09:33:33 修改备注：
 * 
 * @version
 * 
 */
public class JsonRpcUtil {
	private final static int buf_size = 4096;

	public static JSONObject changeRequestToJson(HttpServletRequest request)
			throws UnsupportedEncodingException, IOException, JSONException {
		String charset = request.getCharacterEncoding();
		if (charset == null) {
			charset = "UTF-8";
		}
		BufferedReader in = new BufferedReader(new InputStreamReader(
				request.getInputStream(), charset));

		// Read the request
		CharArrayWriter data = new CharArrayWriter();
		char buf[] = new char[buf_size];
		int ret;
		while ((ret = in.read(buf, 0, buf_size)) != -1) {
			data.write(buf, 0, ret);
		}

		String receiveString = data.toString();
		return JSONObject.fromObject(receiveString);
	}

	public static JSONObject changeParameterMapToJson(
			Map<String, String[]> parameterMap)
			throws UnsupportedEncodingException, IOException, JSONException {
		StringBuffer buffer = new StringBuffer();
		buffer.append("{");
		for (Map.Entry<String, String[]> entry : parameterMap.entrySet()) {
			if (entry.getKey().equals("method")
					|| entry.getKey().equals("params")) {
				buffer.append(entry.getKey().toString());
				buffer.append(":");
				String values = ArrayUtil.toString(entry.getValue(),	new JsonRpcUtil.ParamFormat());
				if(entry.getKey().equals("params") && !values.startsWith("[["))
					values = "[" + values + "]";
				buffer.append(values);
				buffer.append(",");
			}
		}
		if (buffer.length() > 1)
			buffer.delete(buffer.length() - 1, buffer.length());
		buffer.append("}");
		return JSONObject.fromObject(buffer.toString());
	}

	public static class ParamFormat implements ArrayUtil.SingleToString {
		public String toString(Object obj) {
			String str = obj.toString();
			if (str == null || str.length() == 0 || StringUtils.isNum(str)
					|| str.startsWith("'") || str.startsWith("\"")||str.startsWith("["))
				return str;
			else
				return "'" + str + "'";
		}
	}
}
