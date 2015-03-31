var AnyChartUtil = {};
AnyChartUtil.getAttributeValue = function(str,name)
{
	var regstr ='/<!\\[CDATA\\[(.*?)\\]\\]>/mi';
	var reg=  eval(regstr);
	var match =  str.match(reg);
	return match[1];
}