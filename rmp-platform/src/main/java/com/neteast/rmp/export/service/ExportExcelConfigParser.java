package com.neteast.rmp.export.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.util.Assert;
/**
 * @日期: 2010-7-22
 * @描述: 导出excel配置解析类
 */
public class ExportExcelConfigParser implements InitializingBean {

	private static Log logger = LogFactory.getLog(ExportExcelConfigParser.class);
	/**
	 * 导入的包
	 */
	private List packageImports = new ArrayList();

	/**
	 * 导入的类
	 */
	private Map classImports = new HashMap();

	/**
	 * 导出方法配置的Map
	 */
	private Map exportMethodConfigMap;

	/**
	 * 导入包及类配置字符串
	 */
	private String importPackageAndClassStr;

	public Class[] getParameterTypes(String methodTag) {
		Assert.notNull(methodTag);
		int openBrace = methodTag.indexOf('(');
		int closeBrace = methodTag.indexOf(')');

		String paramsStr = methodTag.substring(openBrace + 1, closeBrace);
		String[] types = split(paramsStr);
		Class[] parameterTypes = new Class[types.length];
		for (int i = 0; i < types.length; i++) {
			parameterTypes[i] = findClass(types[i].trim());
		}
		return parameterTypes;
	}

	private void parseImportLine(String line) {
		if (!packageImports.contains("java.lang")) {
			packageImports.add("java.lang");
		}
		String shortcut = line.substring(7, line.length());
		shortcut = shortcut.trim();
		if (line.endsWith(".*")) {
			shortcut = shortcut.substring(0, shortcut.length() - 2);
			packageImports.add(shortcut);
		} else {
			int lastDot = line.lastIndexOf('.');
			if (lastDot == -1) {
				logger.error("Missing . from import statement: " + line);
				return;
			}

			String leaf = line.substring(lastDot + 1);
			classImports.put(leaf, shortcut);
		}
	}

	public static String getMethodName(String methodTag) {
		int openBrace = methodTag.indexOf('(');
		int dot = methodTag.indexOf('.');
		return methodTag.substring(dot + 1, openBrace).trim();
	}

	public static String getBeanName(String methodTag) {
		int dot = methodTag.indexOf('.');
		return methodTag.substring(0, dot).trim();
	}

	public static void checkMethodGrammar(String methodTag) {
		int openBrace = methodTag.indexOf('(');
		int closeBrace = methodTag.indexOf(')');

		if (openBrace == -1) {
			throw new IllegalArgumentException("Missing ( in : " + methodTag);
		}

		if (closeBrace == -1) {
			throw new IllegalArgumentException("Missing ) in : " + methodTag);
		}

		if (openBrace > closeBrace) {
			throw new IllegalArgumentException("( Must come before ) in : " + methodTag);
		}
	}

	public void parseImportPacageAndClass(String sigtext) {
//		try {
//			String reply = JavascriptUtil.stripMultiLineComments(sigtext);
//			reply = JavascriptUtil.stripSingleLineComments(reply);
//			String process = reply;
//
//			process = process.replace('\n', ' ');
//			process = process.replace('\r', ' ');
//			process = process.replace('\t', ' ');
//
//			StringTokenizer st = new StringTokenizer(process, ";");
//			while (st.hasMoreTokens()) {
//				String line = st.nextToken();
//				line = line.trim();
//				if (line.length() == 0) {
//					continue;
//				}
//
//				if (line.startsWith("import ")) {
//					parseImportLine(line);
//				}
//			}
//		} catch (Exception ex) {
//			logger.error("Unexpected Error", ex);
//		}
	}

	private Class findClass(String type) {
		String itype = type;
		// Handle inner classes
		if (itype.indexOf('.') != -1) {
			logger.debug("Inner class detected: " + itype);
			itype = itype.replace('.', '$');
		}

		try {
			classImports.put("Map", "java.util.Map");
			classImports.put("String", "java.lang.String");
			String full = (String) classImports.get(itype);
			if (full == null) {
				full = itype;
			}
			return Thread.currentThread().getContextClassLoader().loadClass(full);
		} catch (Exception ex) {
			// log.debug("Trying to find class in package imports");
		}

		for (Iterator it = packageImports.iterator(); it.hasNext();) {
			String pkg = (String) it.next();
			String lookup = pkg + '.' + itype;
			try {
				return Thread.currentThread().getContextClassLoader().loadClass(lookup);
			} catch (Exception ex) {
				// log.debug("Not found: " + lookup);
			}
		}
		return null;
	}

	private static String[] split(String paramDecl) {
		List params = new ArrayList();

		boolean inGeneric = false;
		int start = 0;
		for (int i = 0; i < paramDecl.length(); i++) {
			char c = paramDecl.charAt(i);
			if (c == '<') {
				if (inGeneric) {
					logger.error("Found < while parsing generic section: " + paramDecl);
					break;
				}

				inGeneric = true;
			}

			if (c == '>') {
				if (!inGeneric) {
					logger.error("Found > while not parsing generic section: " + paramDecl);
					break;
				}

				inGeneric = false;
			}

			if (!inGeneric && c == ',') {
				String param = paramDecl.substring(start, i);
				params.add(param);
				start = i + 1;
			}
		}

		// Add in the bit at the end:
		String param = paramDecl.substring(start, paramDecl.length());
		params.add(param);

		return (String[]) params.toArray(new String[params.size()]);
	}

	public void afterPropertiesSet() throws Exception {
		parseImportPacageAndClass(importPackageAndClassStr);
	}

	public List getPackageImports() {
		return packageImports;
	}

	public Map getClassImports() {
		return classImports;
	}

	public Map getExportMethodConfigMap() {
		return exportMethodConfigMap;
	}

	public void setExportMethodConfigMap(Map exportMethodConfigMap) {
		this.exportMethodConfigMap = exportMethodConfigMap;
	}

	public String getImportPackageAndClassStr() {
		return this.importPackageAndClassStr;
	}

	public void setImportPackageAndClassStr(String importPackageAndClassStr) {
		this.importPackageAndClassStr = importPackageAndClassStr;
	}

	public void setPackageImports(List packageImports) {
		this.packageImports = packageImports;
	}

}
