package com.neteast.rmp.export.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;



/**
 * @描述: 文件相关处理工具类。
 */
public class FileUtils {
	/**
	 * 系统路径分割符
	 */
	public final static String SYSTEM_PATH_SEPARATOR = getPathSeparator();
	
	/**
	 * 返回系统路径分割符。<br/>
	 * 
	 * @return 系统路径分割符
	 */
	public static String getPathSeparator() {
		return System.getProperty("file.separator");
	}
	
	/**
	 * 创建文件目录。<br/>
	 * 
	 * @param pathname 路径名称
	 */
	public static void createDirectory(String pathname) {
		File file = new File(pathname);
		if (!file.exists()) {
			file.mkdirs();
		}
	}
	
	  /**
     * 根据文件后缀得到相应文件类型。<br/>
     *
     * @param fileName 文件名称
     *
     * @return String
     *
     */
    public static String getContentType(String fileName) {
        String fileNameTmp = fileName.toLowerCase();
        String ret = "";
        if (fileNameTmp.endsWith("txt")) {
            ret = "text/plain";
        }
        if (fileNameTmp.endsWith("gif")) {
            ret = "image/gif";
        }
        if (fileNameTmp.endsWith("jpg")) {
            ret = "image/jpeg";
        }
        if (fileNameTmp.endsWith("jpeg")) {
            ret = "image/jpeg";
        }
        if (fileNameTmp.endsWith("jpe")) {
            ret = "image/jpeg";
        }
        if (fileNameTmp.endsWith("zip")) {
            ret = "application/zip";
        }
        if (fileNameTmp.endsWith("rar")) {
            ret = "application/rar";
        }
        if (fileNameTmp.endsWith("doc")) {
            ret = "application/msword";
        }
        if (fileNameTmp.endsWith("ppt")) {
            ret = "application/vnd.ms-powerpoint";
        }
        if (fileNameTmp.endsWith("xls")) {
            ret = "application/vnd.ms-excel";
        }
        if (fileNameTmp.endsWith("html")) {
            ret = "text/html";
        }
        if (fileNameTmp.endsWith("htm")) {
            ret = "text/html";
        }
        if (fileNameTmp.endsWith("tif")) {
            ret = "image/tiff";
        }
        if (fileNameTmp.endsWith("tiff")) {
            ret = "image/tiff";
        }
        if (fileNameTmp.endsWith("pdf")) {
            ret = "application/pdf";
        }
        return ret;
    }
    
    public static void downFile(HttpServletResponse response, String name,
			String path) {
		OutputStream fos = null;
		InputStream fis = null;

		try {
			response.setContentType(FileUtils.getContentType(name));
			response.setHeader("Content-disposition", "attachment;filename="
					+ new String(name.getBytes("gb2312"), "iso8859-1"));
			fis = new FileInputStream(path);

			fos = response.getOutputStream();

			byte[] buffer = new byte[1024];
			int i = 0;
			while ((i = fis.read(buffer)) != -1) {
				fos.write(buffer, 0, i);
			}
		} catch (IOException e) {
//			e.printStackTrace();
			response.reset();
		} finally {
			try {
				if (fos != null) {
					fos.close();
				}
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
//				e.printStackTrace();
			}
		}
	}
	  /**
     * 获得物理路径，根据中间件的不同判断是否需要增加斜线。<br/>
     *
     * @param filePath 绝对路径
     *
     * @return String 返回物理路径，并且最后带有斜线。
     *
     */
    public static String getFilePath(String path){
    	String filePath = path.replace("\\", "/");
		String temp = filePath.substring(filePath.length()-1,filePath.length());
		if(!temp.equals("/"))
			filePath += "/";
		return filePath;
    }
	public static String readFile(String path) throws IOException {
		StringBuffer sb = new StringBuffer();
		File f = new File(path);
		InputStreamReader read = new InputStreamReader(new FileInputStream(f),
				"gb2312");
		BufferedReader reader = new BufferedReader(read);
		String line;
		while ((line = reader.readLine()) != null) {
			sb.append(line + "\n");
		}
		return sb.toString();
	}
    /**
     * 下载文件，默认字符集编码为GBK。<br/>
     *
     * @param response HttpServletResponse
     * @param fileName 文件名称
     * @param is InputStream
     *
     */
    public static void downFile(HttpServletResponse response, String fileName, InputStream is) {
        downFile(response, fileName, is, "GBK");
    }
	/**
     * 下载文件。<br/>
     *
     * @param response HttpServletResponse
     * @param fileName 文件名称
     * @param is InputStream
     * @param charset 字符集编码
     *
     */
    public static void downFile(HttpServletResponse response, String fileName, InputStream is, String charset) {
        OutputStream fos = null;
        InputStream fis = is;

        try {
            response.setContentType(getContentType(fileName));
            response.setHeader("Content-disposition", "attachment;filename=" + new String(fileName.getBytes(charset), "iso8859-1"));
            fos = response.getOutputStream();
            byte[] buffer = new byte[1024];
            int i = 0;
            while ((i = fis.read(buffer)) != -1) {
                fos.write(buffer, 0, i);
            }
        } catch (IOException e) {
            e.printStackTrace();
            response.reset();
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
                if (fis != null) {
                    fis.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
