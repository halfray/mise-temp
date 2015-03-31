package com.neteast.rmp.export.util;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.supercsv.io.CsvListWriter;
import org.supercsv.prefs.CsvPreference;

/**
 * @日期: 2010-03-27
 * @描述: CSV导出工具 <br>
 *      大数据量导出数据替代方案<br>。
 * 
 * 
 * 
 * 使用了superCSV重写生成csv相关方法.
 * 
 */
public class CSVUtils {

	private static final Log log = LogFactory.getLog( CSVUtils.class );

	/**
	 * 写头部信息
	 * 
	 * @author mengfanyu
	 * @data 2013-1-11
	 * @param writer
	 * @param Header
	 * @throws IOException
	 * 
	 */
	private static void writeHeader( CsvListWriter writer , String... Header ) throws IOException{
		writer.writeHeader( Header );
		writer.flush();
	}

	/**
	 * 写内容
	 * 
	 * @author mengfanyu
	 * @data 2013-1-11
	 * @param writer
	 * @param contents
	 * @throws IOException
	 * 
	 */
	private static void wirteContent( CsvListWriter writer , List<Object[]> contents ) throws IOException{

		for( Iterator<Object[]> i = contents.iterator() ; i.hasNext() ; ){
			Object[] oneLine = i.next();
			writer.write( oneLine );
		}
		writer.flush();
	}

	/**
	 * 
	 * @author mengfanyu
	 * @data 2013-1-11
	 * @param file
	 * @param contents
	 * @param append
	 * @return
	 * @throws Exception
	 *
	 */
	public static File writerContentDataToCsv( File file , List<Object[]> contents , boolean append ) {
		
		if( null == contents || contents.isEmpty())
			return null ;
		
		CsvListWriter writer = null;
		File newFile = null;
		try{
			newFile = null == file ? File.createTempFile( UUIDGenerator.getUUID() , ".csv" ) : file;

			writer = new CsvListWriter( new FileWriter( file , append ) , CsvPreference.EXCEL_PREFERENCE );

			if( null != contents && !contents.isEmpty() ){
				wirteContent( writer , contents );
			}
		}catch ( Exception e ){
			System.err.println( e.getMessage() );
		}finally{
			if( null != writer ){
				try{
					writer.flush();
					writer.close();
				}catch(Exception e){
				
				}
			}
		}
		return newFile;
	}

	/**
	 * 写头信息 第一行
	 * 
	 * @author mengfanyu
	 * @data 2013-1-11
	 * @param file
	 * @param header
	 * @return
	 * @throws Exception
	 * 
	 */
	public static File writerHeaderDataToCsv( File file , String[] header ) throws Exception{

		CsvListWriter writer = null;
		File newFile = null;
		try{
			newFile = null == file ? File.createTempFile( UUIDGenerator.getUUID() , ".csv" ) : file;

			writer = new CsvListWriter( new FileWriter( file ) , CsvPreference.EXCEL_PREFERENCE );

			if( null != header && header.length > 0 ){
				writeHeader( writer , header );
			}

		}catch ( Exception e ){
			System.err.println( e.getMessage() );
			throw e;
		}finally{
			if( null != writer ){
				writer.flush();
				writer.close();
			}
		}
		return newFile;
	}

	public static void main( String args[] ) throws Exception{

		File file = new File( "d:/erui.csv" );
		String header[] = new String[] { "1111", "2222", "aaa", "@#$%^^", "圣达菲", "撒旦法", "２３４３４", "＆＊）＆％＠＊）", "撒旦法", "２３圣达菲", "３４ｆｓｓｅ是", "０８１２８９３９８" };
		writerHeaderDataToCsv( file , header );
		List list = new ArrayList();
		long start = System.currentTimeMillis();
		for( int i = 0 ; i < 1000000 ; i++ ){
			String content[] = { "aaaa" + i, "cccc" + i, "1231245" + i, "司法所地方" + i, "45各个dd" + i, "阿斯多夫,豆腐干" + i, "23第三方" + i, };
			list.add( content );
			if( list.size() % 5000 == 0 ){
				writerContentDataToCsv( file , list , true );
				System.out.println( "生成50000条了" );
				list.clear();
			}
		}
		writerContentDataToCsv( file , list , true );
		list.clear();
		System.err.println((System.currentTimeMillis() - start) / 1000);
	}

	/**
	 * 导出为CVS文件
	 * 
	 * @param exportData
	 * @param rowMapper
	 *            数据映射，[{key=对象属性名, value=对象属性值}, ...]
	 * @param outPutPath
	 *            输出文件路径
	 * @return
	 */
	public static File createCSVFile( List exportData , LinkedHashMap rowMapper , String outPutPath ){

		File csvFile = null;
		BufferedWriter csvFileOutputStream = null;
		try{
			csvFile = File.createTempFile( "temp" , ".csv" , new File( outPutPath ) );

			// GB2312使正确读取分隔符","
			csvFileOutputStream = new BufferedWriter( new OutputStreamWriter( new FileOutputStream( csvFile ) , "GB2312" ) , 1024 );
			// 写入文件头部
			for( Iterator propertyIterator = rowMapper.entrySet().iterator() ; propertyIterator.hasNext() ; ){
				java.util.Map.Entry propertyEntry = (java.util.Map.Entry)propertyIterator.next();
				csvFileOutputStream.write( "\"" + propertyEntry.getValue().toString() + "\"" );
				if( propertyIterator.hasNext() ){
					csvFileOutputStream.write( "," );
				}
			}

			csvFileOutputStream.newLine();

			// 写入文件内容
			for( Iterator iterator = exportData.iterator() ; iterator.hasNext() ; ){
				Object row = (Object)iterator.next();
				for( Iterator propertyIterator = rowMapper.entrySet().iterator() ; propertyIterator.hasNext() ; ){
					java.util.Map.Entry propertyEntry = (java.util.Map.Entry)propertyIterator.next();
					csvFileOutputStream.write( "\"" + PropertyUtils.getProperty( row , propertyEntry.getKey().toString() ).toString() + "\"" );
					if( propertyIterator.hasNext() ){
						csvFileOutputStream.write( "," );
					}
				}
				if( iterator.hasNext() ){
					csvFileOutputStream.newLine();
				}
			}
			csvFileOutputStream.flush();

		}catch ( Exception e ){
			e.printStackTrace();
		}finally{
			try{
				csvFileOutputStream.close();
			}catch ( IOException e ){
				e.printStackTrace();
			}
		}
		return csvFile;
	}

	/**
	 * 导出为CSV文件
	 * 
	 * @param response
	 * @param exportData
	 * @param propertyNames
	 * @param fileName
	 * @param outputPath
	 * @throws FileNotFoundException
	 */
	public static void exportToCSVFile( HttpServletResponse response , List exportData , LinkedHashMap rowMapper , String fileName , String outputPath )
			throws FileNotFoundException{

		File csvFile = createCSVFile( exportData , rowMapper , outputPath );
		FileUtils.downFile( response , fileName , new FileInputStream( csvFile ) );
		csvFile.delete();
	}

}
