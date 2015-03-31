/**
 * Create on Aug 18, 2006
 */
package com.neteast.rmp.util;
/**
 * @author Ren yulin
 */

import java.io.*;

public class FileManager {
    public static void createFile(String fileName, String content) throws IOException {
        File file = new File(fileName);
        file.createNewFile();
        writeFile(file, content.getBytes());
    }

    public static void createFile(String fileName, byte[] bytes) throws IOException {
        File file = new File(fileName);
        file.createNewFile();
        writeFile(file, bytes);
    }

    public static void deleteFile(String fileName) {
        File file = new File(fileName);
        file.delete();
    }

    public static String readFile(String fileName) throws Exception {
        File file = new File(fileName);
        InputStream inputStream = new FileInputStream(file);
        byte[] b = new byte[inputStream.available()];
        inputStream.read(b);
        inputStream.close();
        inputStream = null;
        return new String(b);
    }


    private static void writeFile(File file, byte[] bytes) throws IOException {
        FileOutputStream out = new FileOutputStream(file);
        out.write(bytes);
        out.flush();
        out.close();
        out = null;
        file = null;
    }
}


