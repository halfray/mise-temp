package com.neteast.rmp.util;

import java.io.File;
import java.io.IOException;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;

/**
 * 模块名称: 
 * 类名称：  FileUtil   
 * 类描述：  
 * 创建时间：2009-11-13 下午03:37:20  
 * 修改备注：  
 * @version    
 * 
 */
public class FileUtil {
	public static File file(String path)
	{
		return new File(path);
	}
	public static File file(String base, String s)
	{
	        return  new File(base, s);
	}
	public static File mkdir(String s) throws IOException
	{
		return mkdir(s,true);
	}
	public static File mkdirs(String s) throws IOException
    {
		return mkdirs(s,true);
    }
	public static File mkdir(HttpSession session ,String param) throws IOException
	{
		String path = session.getServletContext().getInitParameter(param);
		return mkdir(path);
	}
	public static File mkdirs(HttpSession session ,String param) throws IOException
	{
		String path = session.getServletContext().getInitParameter(param);
		return mkdirs(path);
	}
	public static File mkdir(String s ,boolean ignoreIfExitst) throws IOException
    {
		File f = new File(s);
		if(f.exists() && ignoreIfExitst) return f;
     	if(f.mkdir()) return f;
     	throw new IOException("Cannot create the directory = " + s);
    }
	public static File mkdirs(String s ,boolean ignoreIfExitst) throws IOException
    {
		File f = new File(s);
		if(f.exists() && ignoreIfExitst) return f;
     	if(f.mkdirs()) return f;
     	throw new IOException("Cannot create the directory = " + s);
    }
	/**
	 * 删除文件,当文件为目录,文件不存在及文件删除失败是都会抛出异常
	 * @param fileName			文件路径
	 * @throws IOException      
	 */
	public static void deleteFile(String fileName) throws IOException
	{
		 File file = new File(fileName);
	        if (file.isDirectory()) {
	            throw new IOException(
	                    "IOException -> BadInputException: not a file.");
	        }
	        if (file.exists() == false) {
	            throw new IOException(
	                    "IOException -> BadInputException: file is not exist.");
	        }
	        if (file.delete() == false) {
	            throw new IOException("Cannot delete file. filename = " + fileName);
	        }
	}
	
	/**
	 * 删除文件(安静模式),只有文件存在且不是目录而不能删除时会抛出异常
	 * @param fileName			文件路径
	 * @throws IOException
	 */
	public static void deleteFileQuiet(String fileName) throws IOException
	{
		 	File file = new File(fileName);
	        if (file.exists()  &&  !file.isDirectory() && file.delete() == false) {
	            throw new IOException("Cannot delete file. filename = " + fileName);
	        }
	}
	
	/**
	 * 根据传递的文件路径,创建文件,如果所在路径不存在会将路径也创建处理
	 * @param filePath				文件全路径
	 * @param sperator				路径分隔符
	 * @param ignoreIfExitst		是否忽略,为true时如果已有文件则忽略创建;否则强制创建
	 * @return
	 * @throws IOException
	 */
	public static File mkFile(String filePath ,String sperator, boolean ignoreIfExitst) throws IOException
	{
		File file = new File(filePath);
		if(file.exists() && ignoreIfExitst) return file;
		if(filePath.lastIndexOf(sperator) != -1)
		{
		String path = filePath.substring(0,filePath.lastIndexOf(sperator));
		mkdirs(path,ignoreIfExitst);
		}else
		{
			throw new IOException("IOException -> Cant find sperator :"+sperator);
		}
		if(file.createNewFile()) return file;
		else throw new IOException("IOException -> Cant mkFile :"+filePath); 
	}
	
	/**
	 * 序列化创建文件
	 * 默认的分割符为 _
	 * @param path
	 * @param name
	 * @return
	 * @throws IOException
	 */
	public static File getNextFile(String path,String name) throws IOException
	{
		return getNextFile(path,name,"_");
	}
	/**
	 * 序列化创建文件
	 * 如果需要创建的文件已存在,则在该文件的末尾添加序列化编号
	 * @param path		文件路径
	 * @param name		文件名称
	 * @param split		文件序列化编号和文件名称的分隔符
	 * @return
	 * @throws IOException
	 */
	public static File getNextFile(String path,String name,String split) throws IOException
	{
		String allPath = path+name;
		String newPath = allPath;
		for(int i = 1;FileUtil.haveFile(newPath);i++)
		{
			newPath = allPath.substring(0,allPath.indexOf("."))+split+i+allPath.substring(allPath.indexOf("."));
		}
		return mkFile(newPath);
	}
	public static File mkFile(String filePath ,boolean ignoreIfExitst) throws IOException
	{
		return mkFile(filePath,File.separator,ignoreIfExitst);
	}
	public static File mkFile(String filePath,String sperator) throws IOException
	{
		return mkFile(filePath,sperator,true);
	}
	public static File mkFile(String filePath) throws IOException
	{
		return mkFile(filePath,File.separator,true);
	}
	public static File mkFile(HttpSession session ,String param ,String fileName) throws IOException
	{
		return new File(mkdirs(session,param),fileName);
	}
	public static void copyFile(String src,String goal) throws IOException
	{
		FileUtils.copyFile(new File(src),new File(goal));
	}
	public static void copyFile(File src,File goal) throws IOException
	{
		FileUtils.copyFile(src, goal);
	}
	public static boolean haveFile(File file)
	{
		if(!file.isDirectory() && file.exists())return true;
		else return false;
	}
	public static boolean haveFile(String filePath)
	{
		return haveFile(new File(filePath));
	}
}
