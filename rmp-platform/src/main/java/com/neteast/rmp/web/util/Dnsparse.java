package com.neteast.rmp.web.util;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.List;
import java.util.regex.Pattern;

public class Dnsparse {

	    static String[] natianal_toplevel_domains = {"ac","ad","ae","af","ag","ai","al","am","an","ao","aq","ar","as","asia","at","au","aw","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bm","bn","bo","br",

	"bs","bt","bv","bw","by","bz","ca","cat","cc","cd","cf","cg","ch","ci","ck","cl","cm","co","uk","uz","kr","jp","nr","il","id","cq","cr","cu","cv","cx","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","eh","es","et",".eu","ev"

	,"fi","fj","fk","fm","fo","fr","ga","gb","gd","ge","gf","gh","gi","gl","gm","gn","gp","gr","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","il","in","io","iq","ir","is","it","jm","jo","jp","ke","kg","kh","ki","km","kn","kp",

	"kr","kw","ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","ml","mm","mn","mo","mp","mq","mr","ms","mt","mv","mw"

	,"mx","my","mz","na","nc","ne","nf","ng","ni","nl","no","np","nr","nt","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","pt","pw","py","qa","re","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","sh","si","sj","sk","sl",

	"sm","sn","so","sr","st","su","sy","sz","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tp","tr","tt","tv","tw","tz","ua","ug","uk","us","uy","va","vc","ve","vg","vn","vu","wf","ws","ye","za","zm","zw" };

	    static String[] interna_domains = { "com", "gov", "net", "org", "mil", "edu", "int", "firm", "store", "web", "arts", "rec", "info", "nom", "biz", "name", "ws", "sh", "pro", "io", "museum", "coop", "aero" };

	    static String[] local_field = { "ac", "com", "edu", "gov", "net", "org" };

	    static String[] local_admin = {"bj","sh","tj","cq","he","sx","nm","ln","jl","hl","js","zj","ah","fj","jx","sd","ha",
	                                         "hb","hn","gd","gx","hi","sc","gz","yn","xz","sn","gs","qh","nx","xj","tw","hk","mo"};

	    static List natianal_toplevel_domains_list = Arrays.asList(natianal_toplevel_domains);
	    static List interna_domains_list = Arrays.asList(interna_domains);
	    static List local_field_list = Arrays.asList(local_field);
	    static List local_admin_list = Arrays.asList(local_admin);
	    
	    public class domain
	    {
	        public String dm = new String();
	        //public ArrayList ips = new ArrayList();
	        public int port = 0;
	        public String site = new String();
	        public domain(String _domain, int _port, String _site)
	        {
	            dm = _domain;
	            port = _port;
	            site = _site;
	            //ips.Clear();
	        }
	        //public void addips(ArrayList _ips)
	        //{
	        //    ips.AddRange(_ips);
	        //}
	    }
	    /// <summary>
	    /// caller call this function
	    /// </summary>
	    /// <param name="hosts">all new urls from pages of a subtask</param>
	    /// <returns>pairs containing a domain and corresponding ips</returns>
	    public ArrayList dnsParse(ArrayList list)
	    {
	    	return null;
//	        if (list == null || list.size() <= 0)
//	            return null;
//	        String[] hosts = new String[list.size()];
//	        for (int i = 0; i < list.size(); i++)
//	        {
//	            URLProperty up = list[i] as URLProperty;
//	            if (up == null)
//	            {
//	                output.writeDebug("object to URLProperty convert fails in dnsParse", output.GetFileName(), output.GetLine());
//	                continue;
//	            }
//	            hosts[i] = up.url;
//	        }
//	        if (hosts == null || hosts.length <= 0)
//	        {
//	            return null;
//	        }
//	        domain[] cuttedurl = cutPath(hosts);
//	        if (cuttedurl == null || cuttedurl.length <= 0)
//	            return null;
//	        ArrayList domainlist = new ArrayList();
//	        domainlist.AddRange(cuttedurl);
//	        return domainlist;


	        //IAsyncResult[] array_Iasync = new IAsyncResult[totalnum];
	        //ArrayList[] array_list = new ArrayList[totalnum];
	        //DateTime x1 = DateTime.Now;
	        //for (int i = 0; i < totalnum; i++)
	        //{
	        //    try
	        //    {
	        //        IAsyncResult res = Dns.BeginGetHostAddresses(cuttedurl[i].domain, null, null);
	        //        array_Iasync[i] = res;
	        //    }
	        //    catch (Exception ee)
	        //    {
	        //        Console.WriteLine("domain:" + cuttedurl[i].domain + "  GetHostAddresses fail!" + ee.ToString());
	        //        array_Iasync[i] = null;
	        //    }
	        //}
	        //for (int i = 0; i < totalnum; i++)
	        //{
	        //    try
	        //    {
	        //        if (array_Iasync[i] == null)
	        //            continue;
	        //        IPAddress[] addres = Dns.EndGetHostAddresses(array_Iasync[i]);
	        //        ArrayList tmparray = new ArrayList(addres);
	        //        array_list[i] = tmparray;
	        //    }
	        //    catch (Exception ee)
	        //    {
	        //        Console.WriteLine("domain:" + cuttedurl[i].domain + "  GetHostAddresses fail!" + ee.ToString());
	        //        array_list[i] = null;
	        //    }
	        //}
	        //TimeSpan x2 = DateTime.Now - x1;
	        //Console.WriteLine(x2.TotalSeconds.ToString());


	        //for (int i = 0; i < totalnum; i++)
	        //{
	        //    if (array_list[i] == null)
	        //        continue;
	        //    cuttedurl[i].addips(array_list[i]);
	        //    domain2ippair_array.Add(cuttedurl[i]);
	        //}

	        //return domain2ippair_array;
	    }

	    private domain[] cutPath(String[] allurls)
	    {
	        if (allurls == null || allurls.length == 0)
	        {
	            return null;
	        }
	        ArrayList trans_allurls = new ArrayList();
	        Hashtable key_ht = new Hashtable();
	        for (String url : allurls)
	        {
	            if (url == null || url.trim().length()==0)
	                continue;
	            String real_url = realDomain(url);
	            if (key_ht.keySet().contains(real_url))
	            {
	                continue;
	            }
	            key_ht.put(real_url, "");
	            int real_port = realPort(url);
	            if (real_port <= 0)
	            {
	                continue;
	            }
	            String site = parseSite(real_url);
	            domain pair = new domain(real_url, real_port, site);
	            trans_allurls.add(pair);
	        }
	        
	        domain[] strings = new domain[trans_allurls.size()];

	        trans_allurls.toArray(strings);
	        
	        return strings;
	    }

	    public static String realDomain(String url)
	    {
	        int proto_start = url.indexOf("//");
	        if (proto_start == -1)
	        {
	            //invalid url
	            return "";
	        }
	        int domain_start = proto_start + 2;
	        int port_pre = url.indexOf(":", domain_start);
	        if (port_pre == -1)
	        {
	            port_pre = url.indexOf("/", domain_start);
	        }
	        if (port_pre == -1)
	        {
	            port_pre = url.length();
	        }
	        int domain_length = port_pre - domain_start;
	        String real_domain = url.substring(domain_start, domain_length);
	        return real_domain;
	    }

	    private int realPort(String url)
	    {
	        try
	        {
	            int proto_start = url.indexOf("//");
	            if (proto_start == -1)
	            {
	                //invalid url
	                return -1;
	            }
	            int domain_start = proto_start + 2;
	            int port_pre = url.indexOf(":", domain_start);
	            if (port_pre == -1)
	            {
	                return 80;
	            }
	            int port_end = url.indexOf("/", port_pre);
	            if (port_end == -1)
	            {
	                return 80;
	            }
	            int port_num = Integer.parseInt(url.substring(port_pre + 1, port_end - port_pre - 1));
	            return port_num;
	        }
	        catch (Exception ee)
	        {
	            return 80;
	        }
	    }

	    //获取泛域名方法
	    private static String   parseSite(String url)
	    {
	        if (url == null || url.trim().length()==0)
	            return url;
	        String[] values = url.split("\\.");
	        if (values == null || values.length == 0)
	            return url;
	        int arr_length = values.length;
	        
	        if (Pattern.compile("^\\d*$").matcher(values[arr_length - 1]).find()) //特殊情况，如果url是点分十进制ip地址的形式，那么就直接用ip地址作为网站名
	        {
	            return url;
	        }

	        if (interna_domains_list.contains(values[arr_length - 1]))//如果顶级域名是一般顶级域名，则取最后两个域名作为网站名
	        {
	            if (arr_length == 1)
	                return url;
	            if (arr_length >= 2)
	            {
	                return values[arr_length - 2] + "." + values[arr_length - 1];
	            }
	            return url;
	        }

	        if (natianal_toplevel_domains_list.contains(values[arr_length - 1]))//如果顶级域名是非“cn”的国家代码顶级域名，则取最后两个域名作为网站名
	        {
	            if (arr_length < 3)
	                return url;
	            else
	                return values[arr_length - 3] + "." + values[arr_length - 2] + "." + values[arr_length - 1];
	        }

	        else //顶级域名为“cn“，二级域名分为local_field_list和local_admin_list
	        {
	            if (arr_length == 1)
	            {
	                return url;
	            }
	            else if (arr_length == 2)
	            {
	                return values[arr_length - 2] + "." + values[arr_length - 1];
	            }
	            else if (arr_length >= 3)
	            {
	                if (local_field_list.contains(values[arr_length - 2]) || local_admin_list.contains(values[arr_length - 2]))
	                {
	                    if (arr_length < 3)
	                        return url;
	                    return values[arr_length - 3] + "." + values[arr_length - 2] + "." + values[arr_length - 1];
	                }
	                else //顶级域名为“cn“,但没有二级域名
	                {
	                    if (arr_length == 1)
	                        return url;
	                    else
	                        return values[arr_length - 2] + "." + values[arr_length - 1];
	                }
	            }
	            return url;
	        }
	        //10.15 modified by quanjie
	    }
	    
	  //获取域名级别
	    public static String   getLevel(String url)
	    {
	    	return String.valueOf(getLevelInt(url));
	    }
	    public static int   getLevelInt(String url)
	    {
	    	String fan = parseSite(url);
	    	
	    	String temp = url.substring(0,url.lastIndexOf(fan));
	    	if(temp.length()==0) return 1;
	    	
	    	String[] list = temp.split("\\.");
	    	return list.length + 1;
	    }
	    
	    //获得上级域名
	    public static String   getFatherUrl(String url)
	    {
	    	if(getLevelInt(url)==1) return url;
	    	else
	    		return url.substring(url.indexOf(".")+1);
	    }
	    //获取主域名
	    public static String getMain(String url)
	    {
	    	return parseSite(url);
	    }
	    public static void main(String[] args) {
			String url = "boya.blog.sina.com.cn";
			System.out.println("zhu:"+parseSite(url));
			System.out.println("level:"+getLevel(url));
			System.out.println("father:"+getFatherUrl(url));
			System.out.println("main:"+getMain(url));
		}

	
}
