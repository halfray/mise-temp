/**
 * 
 */
package com.neteast.rmp.service.portal.pagemaker;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neteast.rmp.dao.domain.ScPortalParms;
import com.neteast.rmp.service.main.SystemParamsManager;
import com.neteast.rmp.service.portal.PortalManager;
import com.seraph.bi.suite.support.security.LoginUtil;

/**
 * 类说明: 根据ScPortalParms数据表的配置，生成PortalAssemble页面的工具栏<br> 
 * 创建时间: 2013-4-13 下午9:44:16<br> 
 * @author 刘岩松<br> 
 * @email liuys@neteast.com<br>
 */
@Service
public class TbarCreator implements Creator {
	
	@Autowired
	private PortalManager portalManager;
	
	@Autowired
	protected SystemParamsManager systemParamsManager;
	
	
	public void setPortalManager(PortalManager portalManager) {
		this.portalManager = portalManager;
	}

	private String getTbarsConfig(List<ScPortalParms> ScPortalParmsList,String flag) {
		
		StringBuffer sb = new StringBuffer();
		if(ScPortalParmsList.size() < 1) {
			sb.append("");
			return sb.toString();
		} else {
			sb.append("tbar: {\n");		
			sb.append(" height: 44,"); 
//			sb.append(" style: {marginTop: '10px'} ,");
			sb.append("items: [\n");
			for (ScPortalParms scPortalParms : ScPortalParmsList) {
	
				int parmType = scPortalParms.getParmType();
				switch (parmType) {
				case 1: // textfield
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("{ xtype: 'textfield',");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" width: 90" );
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("},\n");
					break;
				case 2: // combo
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					
					sb.append("new Ext.ux.seraph.DictCombo({");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" url: '" + scPortalParms.getDicUrl() + "',");
					sb.append(" showAllSelect: true,");
					sb.append(" displayField: '" + scPortalParms.getDicDisplayField() + "',");
					sb.append(" valueField: '" + scPortalParms.getDicValueField() + "',");
					if("province".equals(scPortalParms.getParmCode())){
						String parmValue = scPortalParms.getParmValue();
						if(parmValue.matches("[0-9]+")){ //是数字
							sb.append(" value: '" + scPortalParms.getParmValue() + "',");
						}else{
							if("10001".equals(LoginUtil.getUser().getOrgCode())){//是中国登陆
								sb.append(" value: '" + systemParamsManager.getSystemParamsValue("DY_PROVINCE") + "',");
							}else{
								sb.append(" value: '" + LoginUtil.getUser().getOrgCode() + "',");
							}
							
						}
					}else{
						sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					}
					sb.append(" width: 120");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("}),\n");
					break;		
				case 3: // datefield
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("{ xtype: 'datefield',");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" format:'Ymd',");
					sb.append(" width: 120");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("},\n");
					break;
				case 4: // numberfield
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("{ xtype: 'numberfield',");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" width: 90");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("},\n");
					break;
				case 5: // radio
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("{ xtype: 'radio',");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" width: 90");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("},\n");
					break;
				case 6: // checkbox
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("{ xtype: 'checkbox',");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" width: 90");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("},\n");
					break;
				case 7: // SearchCombo
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("new Ext.ux.SearchComboBox({");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" dataMethod: '" + scPortalParms.getDicUrl() + "',");
					sb.append(" displayField: '" + scPortalParms.getDicDisplayField() + "',");
					sb.append(" valueField: '" + scPortalParms.getDicValueField() + "',");
					sb.append(" width: 120");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("}),\n");
					break;	
				case 8: // TreeField
					if(scPortalParms.getParmName() != null && !"".equals(scPortalParms.getParmName())){
						sb.append("' ',{ text: '" + scPortalParms.getParmName() + "'},");
					}else{
						sb.append("' ',");
					}
					sb.append("new Ext.ux.TreeField({");
					sb.append(" id: '#" + scPortalParms.getParmCode() + "',");
					sb.append(" value: '" + scPortalParms.getParmValue() + "',");
					sb.append(" layerHeight: 230,");
					sb.append(" dataMethod: '" + scPortalParms.getDicUrl() + "',");
					sb.append(" displayField: '" + scPortalParms.getDicDisplayField() + "',");
					sb.append(" valueField: '" + scPortalParms.getDicValueField() + "',");
					sb.append("rootVisible : false,");
					sb.append(" width: 120");
					/*if("1".equals(flag)){
						sb.append(","+" readOnly : true");
						sb.append(","+" cls : 'readonly'");
					}*/
					sb.append("}),\n");
					break;		
				default:
					break;
				}
			}
			if (sb.length() > 2) {
				sb.setLength(sb.length() - 2);
			}
			sb.append(",' ',{text: '<span style=\"margin-left:5px;\">查询</span>', " +
					//"iconCls: 'dataTable-preview-icon'," +
					"iconCls: 'search-button',"+
					"minWidth:82,"+
					"height:27,"+					
					"handler: function() {" +
					"var portalParmStr = EventHandler.getPortalParmStr();" +
					"EventHandler.pageLevelNotice(portalParmStr);" +
					"}" +
					"}\n");
			if("1".equals(flag)){
				sb.append("]\n");
				sb.append("},\n");
			}else{
				sb.append(",'-',{text: '<span style=\"margin-left:5px;\">刷新</span>', " +
						//"iconCls: 'role-user-reset'," +
						"iconCls: 'refresh-button'," +
						"minWidth:82,"+
						"height:27,"+
						"handler: function() {" +
						"var portalParmStr = EventHandler.getPortalParmDefalutValue();" +
						"EventHandler.pageLevelNotice(portalParmStr);" +
						"}" +
						"}\n");
				sb.append("]\n");
				sb.append("},\n");
			}
		}
		return sb.toString();
	}

	public String createToolbar(String portalCode,String flag) throws Exception {
		
		List<ScPortalParms> scPortalParmsList = portalManager
				.getPortalParmsList(portalCode);
		return getTbarsConfig(scPortalParmsList,flag);
	}

	@Override
	public String create(String portalCode) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}
}
