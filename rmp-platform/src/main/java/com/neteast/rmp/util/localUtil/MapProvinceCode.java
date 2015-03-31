package com.neteast.rmp.util.localUtil;

import java.util.ArrayList;
import java.util.List;

public class MapProvinceCode {
	static private List<ProvinceInfo> proviceList = new ArrayList<ProvinceInfo>();
	
	static 
	{
		proviceList.add(new ProvinceInfo("11","100000","北京市"));
		proviceList.add(new ProvinceInfo("12","300000","天津市"));
		proviceList.add(new ProvinceInfo("13","050000","河北省"));
		proviceList.add(new ProvinceInfo("14","030000","山西省"));
		proviceList.add(new ProvinceInfo("15","010000","内蒙古自治区"));
		proviceList.add(new ProvinceInfo("21","110000","辽宁省"));
		proviceList.add(new ProvinceInfo("22","130000","吉林省"));
		proviceList.add(new ProvinceInfo("23","150000","黑龙江省"));
		proviceList.add(new ProvinceInfo("24","","沈阳市"));
		proviceList.add(new ProvinceInfo("25","","大连市"));
		proviceList.add(new ProvinceInfo("26","","哈尔滨市"));
		proviceList.add(new ProvinceInfo("27","","长春市"));
		proviceList.add(new ProvinceInfo("31","200000","上海市"));
		proviceList.add(new ProvinceInfo("32","210000","江苏省"));
		proviceList.add(new ProvinceInfo("33","310000","浙江省"));
		proviceList.add(new ProvinceInfo("34","230000","安徽省"));
		proviceList.add(new ProvinceInfo("35","350000","福建省"));
		proviceList.add(new ProvinceInfo("36","330000","江西省"));
		proviceList.add(new ProvinceInfo("37","250000","山东省"));
		proviceList.add(new ProvinceInfo("38","","青岛市"));
		proviceList.add(new ProvinceInfo("39","","宁波市"));
		proviceList.add(new ProvinceInfo("40","","厦门市"));
		proviceList.add(new ProvinceInfo("3A","","南京市"));
		proviceList.add(new ProvinceInfo("3B","","杭州市"));
		proviceList.add(new ProvinceInfo("3C","","济南市"));
		proviceList.add(new ProvinceInfo("41","450000","河南省"));
		proviceList.add(new ProvinceInfo("42","430000","湖北省"));
		proviceList.add(new ProvinceInfo("43","410000","湖南省"));
		proviceList.add(new ProvinceInfo("44","510000","广东省"));
		proviceList.add(new ProvinceInfo("45","530000","广西壮族自治区"));
		proviceList.add(new ProvinceInfo("46","570000","海南省"));
		proviceList.add(new ProvinceInfo("47","","武汉市"));
		proviceList.add(new ProvinceInfo("48","","广州市"));
		proviceList.add(new ProvinceInfo("49","","深圳市"));
		proviceList.add(new ProvinceInfo("50","","重庆市"));
		proviceList.add(new ProvinceInfo("51","610000","四川省"));
		proviceList.add(new ProvinceInfo("52","550000","贵州省"));
		proviceList.add(new ProvinceInfo("53","650000","云南省"));
		proviceList.add(new ProvinceInfo("54","850000","西藏自治区"));
		proviceList.add(new ProvinceInfo("56","","成都市"));
		proviceList.add(new ProvinceInfo("61","710000","陕西省"));
		proviceList.add(new ProvinceInfo("62","730000","甘肃省"));
		proviceList.add(new ProvinceInfo("63","810000","青海省"));
		proviceList.add(new ProvinceInfo("64","750000","宁夏回族自治区"));
		proviceList.add(new ProvinceInfo("65","830000","新疆维吾尔自治区"));
		proviceList.add(new ProvinceInfo("66","","西安市"));
		proviceList.add(new ProvinceInfo("71","","台湾省"));
		proviceList.add(new ProvinceInfo("81","","香港特别行政区"));
		proviceList.add(new ProvinceInfo("82","","澳门特别行政区"));
	}
	
	/** 
	 * 功能说明:通过数据库ID 获取对应的国家省份编码<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-28 上午9:46:27<br> 
	 * @param id
	 * @return 
	 */ 
	public static String getCodeById(String id)
	{
		if(id == null || id.trim().length() == 0) return null;
		
		for(ProvinceInfo info : proviceList)
		{
			if(info.getId().equals(id))
				return info.getCode();
		}
		return null;
	}
	/** 
	 * 功能说明:通过数据库ID 获取对应的国家省份名称<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-28 上午9:46:27<br> 
	 * @param id
	 * @return 
	 */ 
	public static String getNameById(String id)
	{
		if(id == null || id.trim().length() == 0) return null;
		
		for(ProvinceInfo info : proviceList)
		{
			if(info.getId().equals(id))
				return info.getName();
		}
		return null;
	}
	
	/** 
	 * 功能说明:通过国家省份编码获取数据库ID<br> 
	 * 创建者: 李祥辉<br> 
	 * 创建时间: 2013-3-28 上午9:46:51<br> 
	 * @param code
	 * @return 
	 */ 
	public static String getIdByCode(String code)
	{
		if(code == null || code.trim().length() == 0) return null;
		
		for(ProvinceInfo info : proviceList)
		{
			if(info.getCode().equals(code))
				return info.getId();
		}
		return null;
	}
}
class ProvinceInfo
{
	String code;
	String id;
	String name;
	
	public ProvinceInfo(String code, String id, String name) {
		super();
		this.code = code;
		this.id = id;
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
