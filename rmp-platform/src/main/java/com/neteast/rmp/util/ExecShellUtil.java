package com.neteast.rmp.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class ExecShellUtil {
	/**
	 * 功能说明:执行本地程序方法<br>
	 * 创建者: 李祥辉<br>
	 * 创建时间: 2013-3-5 下午4:01:58<br>
	 * 
	 * @param cmmand
	 *            - 程序命令
	 * @param envs 
	 * 				- 环境变量
	 * @param directory
	 *            - 路径
	 * @return - 命令输出的结果信息
	 * @throws IOException
	 */
	public static String execute(String[] cmmand, Map<String,String> envs,String directory)
			throws IOException {
		String result = "";
		ProcessBuilder builder = new ProcessBuilder(cmmand);

		//设置环境变量
		if(envs!=null)
			builder.environment().putAll(envs);
		//设置执行路径
		if (directory != null)
			builder.directory(new File(directory));
		builder.redirectErrorStream(true);
		InputStream is = null;
		Process process = null;
		try {
			process = builder.start();

			// 得到命令执行后的结果
			is = process.getInputStream();
			BufferedReader br=new BufferedReader(new InputStreamReader(is));
			byte[] buffer = new byte[1024];
			while (is.read(buffer) != -1) {
				result = result + new String(buffer);
			}
			process.waitFor();
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (is != null)
				is.close();
			if(process!=null)
				process.destroy();
		}
		return result;
	}

	public static void main(String[] args) throws IOException {
		String[] command = new String[] { "curl -I -x 202.108.33.96:80 http://www.sina.com.cn |grep \"200 OK\"|"};
		Map<String,String> envs = new HashMap<String,String>();
		envs.put("LANG", "zh_CN.UTF-8");
		String directory = null;
		String result = (execute(command, envs,directory));
		System.out.println(result);
	}

}
