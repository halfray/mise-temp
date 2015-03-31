package com.neteast.rmp.web.test;

public class Test
{
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	String name;
	String value;
	
	public static void main(String[] args) {
		try {
			testArrayClass();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void testArrayClass() throws InstantiationException, IllegalAccessException, InstantiationException, ClassNotFoundException
	{
		String[] list = new String[]{};
		System.out.println(list.getClass());
		System.out.println(list.getClass().getName());
		System.out.println(list.getClass().isArray());
		String[][] list2 = {};
		System.out.println(list2.getClass().getName());
		
		
		System.out.println(Class.forName("["+list.getClass().getName()).getName());
	}
	
	public static void testExceptionThrow() throws AE
	{
		try
		{
			
		}catch(Exception e)
		{
			throw new BE();
		}
	}
}

class AE extends Exception{}
class BE extends RuntimeException{}

