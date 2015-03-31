package com.neteast.rmp.rpc;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

import com.neteast.rmp.util.JsonRpcUtil;
import com.seraph.bi.suite.support.util.ResponseUtils;

@Controller
public class BaseActionController extends AbstractController {
	
	static Logger log = Logger.getLogger(BaseActionController.class);

	protected HttpServletRequest request;
	protected HttpServletResponse reponse;

	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		this.request = request;
		this.reponse = response;

		// 设置输出信息类型
		ResponseUtils.setJsonHeader(response);
		OutputStream out = response.getOutputStream();

		JSONObject json_req = null;
		JSONRPCResult json_res = null;
		// 进行调用
		try {
			json_req = JsonRpcUtil.changeParameterMapToJson(request.getParameterMap());
			json_res = new JSONRPCBridge().call(new Object[] { request,
					response }, json_req);
		} catch (Exception e) {
			log.error("can't parse call  " + json_req, e);
			json_res = new JSONRPCResult(JSONRPCResult.CODE_ERR_PARSE, null,
					JSONRPCResult.MSG_ERR_PARSE);
		}

		// 输出结果信息
		String sendString = json_res.toString();
		//获取直接结果
	    if(request.getParameter("result")!=null &&"direct".equals(request.getParameter("result").replaceAll("\"", "").replace("'", "")) && json_res.getErrorCode() == JSONRPCResult.CODE_SUCCESS){
	    	sendString = JSONArray.fromObject(json_res.getResult()).toString();
	    }
	    
		log.info("the result is :" +prettyPrintJson(sendString));

		// Write the response
		byte[] bout = sendString.getBytes("UTF-8");

		out.write(bout);
		out.flush();
		out.close();

		return null;
	}
	
	  protected String prettyPrintJson(String unformattedJSON)
	  {
	    if (unformattedJSON == null || "".equals(unformattedJSON))
	    {
	      return unformattedJSON;
	    }
	    if(unformattedJSON.startsWith("{"))
	    	return  JSONObject.fromObject(unformattedJSON).toString(2);
	    else if(unformattedJSON.startsWith("["))
	    	return JSONArray.fromObject(unformattedJSON).toString(2);
	   
	    return  JSONObject.fromObject(unformattedJSON).toString(2);
	  }
}
