/*
Navicat MySQL Data Transfer

Source Server         : 10.0.30.14(开发环境）
Source Server Version : 50617
Source Host           : 10.0.30.14:3306
Source Database       : dbmeta

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-31 16:59:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `c3p0testtable`
-- ----------------------------
DROP TABLE IF EXISTS `c3p0testtable`;
CREATE TABLE `c3p0testtable` (
  `a` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of c3p0testtable
-- ----------------------------

-- ----------------------------
-- Table structure for `sc_cell_cfg`
-- ----------------------------
DROP TABLE IF EXISTS `sc_cell_cfg`;
CREATE TABLE `sc_cell_cfg` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `PARENT_ID` int(11) DEFAULT NULL COMMENT '父Cell序号',
  `PORTAL_CODE` varchar(100) DEFAULT NULL COMMENT 'Portal代码',
  `CELL_TITLE` varchar(100) DEFAULT NULL COMMENT 'Cell标题',
  `HREF` varchar(500) DEFAULT NULL COMMENT '链接',
  `ROW_NUM` int(11) DEFAULT NULL COMMENT '行宽',
  `COL_NUM` int(11) DEFAULT NULL COMMENT '列宽',
  `WIDTH` int(11) DEFAULT NULL COMMENT '单元格宽',
  `HEIGHT` int(11) DEFAULT NULL COMMENT '单元格宽',
  `NOTICE_ME` int(11) DEFAULT NULL COMMENT '参数刷新',
  `SORT` int(11) DEFAULT NULL COMMENT '排序',
  `DESCRIPTION` text COMMENT '描述',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_HCFG_IDX` (`ID`),
  KEY `AK_SC_HCFG` (`PORTAL_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=394 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_cell_cfg
-- ----------------------------
INSERT INTO `sc_cell_cfg` VALUES ('1', '0', 'portalTest', '测试1', 'dmIpLibraryPatternList.do', '2', '1', '0', '0', '0', '1', 'aaaaaaaa');
INSERT INTO `sc_cell_cfg` VALUES ('2', '1', 'portalTest', '测试2', 'portalAssembleTest.do', '1', '1', '0', '0', '1', '2', '<b>测试</b>');
INSERT INTO `sc_cell_cfg` VALUES ('3', '0', 'allProvinceResourcesContrast', '本网网站资源各省情况地图', 'portalPage.do?js=/scripts/platform/resource_manager/portal/resourceInChinaMap.js', '1', '3', '0', '400', '1', '1', 'aaaaaa');
INSERT INTO `sc_cell_cfg` VALUES ('4', '3', 'tt', '省份下各质量分占比', 'portalPage.do?js=/scripts/platform/resource_manager/portal/resourcePieMap.js', '1', '2', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('5', '1', 'portalTest', '测试3', 'portalAssembleTest.do', '1', '1', '0', '0', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('6', '0', 'portalTest', '测试4', 'portalAssembleTest.do', '1', '1', null, null, '0', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('7', '0', 'portalTest', '测试5', 'portalAssembleTest.do', '1', '1', '0', '0', '0', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('8', '0', 'allProvinceResourcesContrast', '各省系统资源情况条形图', 'portalPage.do?js=/scripts/platform/resource_manager/portal/resourceBarMap.js', '1', '5', '0', '400', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('9', '0', 'allProvinceResourcesContrast', '各省资源情况树形图', 'portalPage.do?js=/scripts/platform/resource_manager/portal/resourceTreePanel.js', '1', '5', '0', '400', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('10', '0', 'allProvinceResourcesContrast', '全网网内网外域名情况图', 'portalPage.do?js=/scripts/platform/resource_manager/portal/resourceBarForMap.js', '1', '2', '0', '400', '0', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('11', '0', 'allRepeatResource', '省内重复资源情况', 'portalPage.do?js=/scripts/platform/repeatResource/dmLocalProviceRepeatResource.js', '2', '3', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('12', '11', 'allRepeatResource', '省内资源重复图', 'portalPage.do?js=/scripts/platform/repeatResource/dmLPRRAnychartBar.js', '1', '2', '0', '0', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('13', '0', 'allRepeatResource', '本省Cache外省IDC协同列表', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/localCacheOutIdcRepeat.js', '1', '3', '0', '0', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('14', '11', 'allRepeatResource', '重复域名详细', 'portalPage.do?js=/scripts/platform/repeatResource/dmLPRRDetail.js', '1', '2', '0', '0', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('15', '13', 'allRepeatResource', '本省Cache外省IDC协同重复占比图', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/localCacheOutIdcRepeatPie.js', '1', '2', '0', '0', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('16', '0', 'allRepeatResource', '各省IDC重复引入网站资源情况', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/allProvinceIDCRepeatWebSiteBar.js', '1', '5', '0', '0', '0', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('17', '0', 'allRepeatResource', '各省IDC重复引入网站资源情况列表', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/allProvinceIDCRepeatDomain.js', '1', '3', '0', '0', '1', '7', '');
INSERT INTO `sc_cell_cfg` VALUES ('18', '17', 'allRepeatResource', '各省IDC重复引入网站资源分布列表', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/allProvinceIDCDomain.js', '1', '2', '0', '0', '1', '8', '');
INSERT INTO `sc_cell_cfg` VALUES ('19', '0', 'allRepeatResource', '各运营商引入网站资源图', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/allOperatorRepeatResourceBar.js', '1', '5', '0', '0', '0', '9', '');
INSERT INTO `sc_cell_cfg` VALUES ('20', '0', 'allRepeatResource', '运营商重复引入网站资源情况列表', 'portalPage.do?js=/scripts/platform/resource_manager/allNetRepeatResource/allOperatorDomain.js', '1', '5', '0', '500', '1', '10', '');
INSERT INTO `sc_cell_cfg` VALUES ('21', '0', 'monitorBoard', '广东一级平台', 'tbWsM0003Total.do', '1', '5', '0', '255', '0', '1', '<b>展示目的:</b><br>从全网的角度查看各系统上报的数据信息<br><b>指标算法:<br></b>对各系统的数据进行排重汇总<br><b>使用方式:</b><br>无需查询,全部显示<br><b><b>​数据源:<br></b></b><ol><li>网站信息来源于平台基础信息库</li><li>域名信息来源于爬虫系统</li><li>Cache大文件来源于cache系统</li><li>DNS处理域名数来源于DNS系统</li><li>DNS热点上报来源于DNS系统<br></li></ol><b>钻取:</b>无<b><br>其他:</b>无<br>');
INSERT INTO `sc_cell_cfg` VALUES ('22', '0', 'monitorBoard', 'Cache', 'tbDM0006Cache.do', '1', '1', '0', '215', '0', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('23', '0', 'monitorBoard', '探测系统', 'tbDM0006IDC.do', '1', '1', '0', '215', '0', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('24', '0', 'monitorBoard', 'DPI', 'tbDM0006DPI.do', '1', '1', '0', '215', '0', '6', null);
INSERT INTO `sc_cell_cfg` VALUES ('25', '0', 'monitorBoard', '拨测系统', 'tbDM0006POT.do', '1', '1', '0', '215', '0', '5', null);
INSERT INTO `sc_cell_cfg` VALUES ('26', '0', 'monitorBoard', 'DNS日志', 'tbDM0006IDNS.do', '1', '1', '0', '215', '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('27', '0', 'testPortal', '总体质量监测', 'tbDM0006Chart.do ', '1', '5', '0', '0', '0', '7', '');
INSERT INTO `sc_cell_cfg` VALUES ('28', '0', 'websiteBelongs', '资源大小', 'websiteBelongsOne.do', '1', '1', null, null, '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('29', '0', 'websiteBelongs', '资源数量', 'websiteBelongsTwo.do', '1', '1', null, null, '0', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('30', '0', 'websiteBelongs', '资源大小占比', 'websiteBelongsThree.do', '1', '1', null, null, '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('31', '0', 'websiteBelongs', '资源个数占比', 'websiteBelongsFour.do', '1', '1', null, null, '0', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('32', '0', 'domainBelongs', '资源大小', 'domainBelongsOne.do', '1', '3', null, null, '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('33', '0', 'domainBelongs', '资源数量', 'domainBelongsTwo.do', '1', '1', null, null, '0', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('34', '0', 'domainBelongs', '资源大小占比', 'domainBelongsThree.do', '1', '1', null, null, '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('35', '0', 'domainBelongs', '资源个数占比', 'domainBelongsFour.do', '1', '1', null, null, '0', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('36', '0', 'tbDM0004Chart', '质量分数', 'tbDM0004ChartOne.do', '1', '1', null, null, '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('37', '0', 'tbDM0004Chart', '成本', 'tbDM0004ChartTwo.do', '1', '1', null, null, '0', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('38', '0', 'tbDM0004Chart', '速度', 'tbDM0004ChartThree.do', '1', '1', null, null, '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('39', '0', 'tbDM0004Chart', '响应时间', 'tbDM0004ChartFour.do', '1', '1', null, null, '0', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('40', '0', 'tbDM0002Chart', '质量分数', 'tbDM0002ChartOne.do', '1', '1', null, null, '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('41', '0', 'tbDM0002Chart', '成本', 'tbDM0002ChartTwo.do', '1', '1', null, null, '0', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('42', '0', 'tbFsM0001chart', 'IDC引入率', 'tbFsM0001ChartOne.do', '1', '1', '0', '0', '0', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('43', '0', 'tbFsM0001chart', 'Cache引入率', 'tbFsM0001ChartTwo.do', '1', '1', '0', '0', '0', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('44', '0', 'tbFsM0001chart', '本网引入率', 'tbFsM0001ChartThree.do', '1', '1', '0', '0', '0', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('45', '0', 'tbFsM0001chart', '直连引入率', 'tbFsM0001ChartFour.do', '1', '1', '0', '0', '0', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('59', '0', 'webSiteQualityAnalysis', '网站质量分析', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteQualityAnalysis/dmWebsiteQuality.js', '1', '5', '1100', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('61', '59', 'webSiteQualityAnalysis', '资源服务本省质量', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteQualityAnalysis/dmResourceLocalQuality.js', '1', '5', '1100', '360', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('62', '0', 'resourceViewMap', '分省资源视图', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewMap.js', '1', '1', '500', '450', '1', '1', '<b>展示目的:</b><br>从全国各个省、市的角度，以图表的形式来展示网站、域名、URL、大文件的引入数量，以及本网请求次数和本省用户感知质量中的其中一种类型的数据信息<br><b>指标算法:<br></b>对各系统的数据进行排重汇总<br><b>使用方式:</b><br>选择要查询的类型以及系统<br><b><b>​数据源:<br></b></b><ol><li>网站信息来源于平台基础信息库</li><li>域名信息来源于爬虫系统</li><li>URL信息来源于爬虫系统</li><li>本网请求次数来源于DPI</li><li>大文件信息来源于爬虫系统</li><li>用户感知质量来源于质量拨测系统<br></li></ol><b>钻取:</b>无<b><br>其他:</b>无');
INSERT INTO `sc_cell_cfg` VALUES ('63', '0', 'resourceView', '网站全网总览', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewWebSite.js', '1', '2', '500', '300', '0', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('64', '0', 'resourceView', '域名全网总览', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewDomain.js', '1', '2', '500', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('66', '0', 'dispDeffectAnalisys', '调度前后指标对比情况', 'portalPage.do?js=/scripts/platform/dispAnalisys/dispDeffect.js', '1', '4', '0', '400', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('67', '0', 'dispDeffectAnalisys', '调度前后5天质量对比', 'portalPage.do?js=/scripts/platform/dispAnalisys/dispContrast.js', '1', '4', '0', '400', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('68', '0', 'dispCorrErrEval', 'IDC资源调度分析', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispCorrErrEval/DmDispCorrErrEvalIDC.js', '1', '5', '0', '450', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('69', '1', 'dispCorrErrEval', 'Cache资源调度分析', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispCorrErrEval/DmDispCorrErrEvalCache.js', '1', '5', '0', '440', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('70', '2', 'dispCorrErrEval', '对等直连资源调度分析', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispCorrErrEval/DmDispCorrErrEvalPDC.js', '1', '5', '0', '450', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('71', '3', 'dispCorrErrEval', 'CDN资源调度分析', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispCorrErrEval/DmDispCorrErrEvalCDN.js', '1', '5', '0', '450', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('72', '0', 'dmNetsiteLibrariesSecondPlatform', '分省网站库概览', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteLibrariesSecondPlatform/dmNetsiteLibrariesSecondPlatform.js', '1', '4', '0', '400', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('73', '0', 'dmmDispCorrErrEval', 'IDC资源调度评估', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispCorrErrEval/DmmDispCorrErrEvalIDC.js', '1', '5', '0', '450', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('74', '1', 'dmmDispCorrErrEval', 'Cache资源调度分析', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispCorrErrEval/DmmDispCorrErrEvalCache.js', '1', '5', '0', '440', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('75', '2', 'dmmDispCorrErrEval', '对等直连资源调度分析', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispCorrErrEval/DmmDispCorrErrEvalPDC.js', '1', '5', '0', '450', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('76', '3', 'dmmDispCorrErrEval', 'CDN资源调度分析', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispCorrErrEval/DmmDispCorrErrEvalCDN.js', '1', '5', '0', '450', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('77', '0', 'dmNetsiteLibrariesSecondPlatform', '网站概览', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteLibrariesSecondPlatform/websiteLibrariesWebSite.js', '1', '2', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('78', '0', 'dmNetsiteLibrariesSecondPlatform', '域名概览', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteLibrariesSecondPlatform/websiteLibrariesDomain.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('79', '0', 'dmNetsiteLibrariesSecondPlatform', 'URL概览', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteLibrariesSecondPlatform/websiteLibrariesURL.js', '1', '2', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('80', '0', 'dmNetsiteLibrariesSecondPlatform', '大文件概览', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteLibrariesSecondPlatform/websiteLibrariesBigFile.js', '1', '2', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('81', '0', 'dmOutgoingDomainEval', '域名出网情况', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispOutgoingDomainEval/DmDomainOutgoingDetail.js', '1', '5', '0', '500', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('82', '81', 'dmOutgoingDomainEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispOutgoingDomainEval/DmIpQuaDetail.js', '1', '5', '0', '500', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('83', '0', 'webSiteBelongEvaluation', '网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluation.js', '1', '3', '0', '430', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('84', '0', 'testPortal', '测试模块1', 'portalPage.do?js=/scripts/platform/resource_statistics/DispCorrErrEval/DispCorrErrEvalCache.js', '1', '5', '0', '0', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('85', '0', 'dmmDispOutgoingDomainEval', '域名出网情况', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispOutgoingDomainEval/DmmDomainOutgoingDetail.js', '1', '5', '0', '330', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('86', '85', 'dmmDispOutgoingDomainEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispOutgoingDomainEval/DmmIpQuaDetail.js', '1', '5', '0', '430', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('87', '0', 'dmDomainBelongEvaluation', '热点域名概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongEvaluation.js', '1', '5', '0', '440', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('88', '0', 'webSiteBelongEvaluation', '系统--热点网站匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluationAllsystem.js', '1', '2', '0', '425', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('89', '0', 'dmWebSiteView', '全网系统热点网站匹配度信息', 'portalPage.do?js=/scripts/platform/resourceView/DmWebSiteView/DmWebsiteDelongevaluationAllsystem.js', '1', '5', '0', '260', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('90', '83', 'webSiteBelongEvaluation', '运营商--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluationBelong.js', '1', '2', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('92', '83', 'webSiteBelongEvaluation', '省份--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluationProvince.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('94', '92', 'webSiteBelongEvaluation', '系统--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluationSystem.js', '1', '3', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('95', '89', 'dmWebSiteView', '全网系统热点网站匹配明细信息', 'portalPage.do?js=/scripts/platform/resourceView/DmWebSiteView/DmWebsiteSystemMatchDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('96', '94', 'webSiteBelongEvaluation', 'IP--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluationIP.js', '1', '2', '0', '300', '1', '7', '');
INSERT INTO `sc_cell_cfg` VALUES ('97', '0', 'dmDomainBelongEvaluation', '运营商--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongOperator.js', '1', '3', '0', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('98', '0', 'dmDomainBelongEvaluation', '全网系统--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongSystem.js', '1', '2', '0', '300', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('99', '0', 'dmDomainBelongEvaluation', '区域--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongProvince.js', '1', '3', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('100', '99', 'dmDomainBelongEvaluation', '系统--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongProvinceSystem.js', '1', '2', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('101', '100', 'dmDomainBelongEvaluation', 'IP--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation/dmDomainBelongIP.js', '1', '5', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('102', '0', 'webSiteBelongEvaluationSecondPlatform', '网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/secondPlatform/dmWebsiteBelongevaluation.js', '1', '5', '0', '425', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('103', '102', 'webSiteBelongEvaluationSecondPlatform', '系统--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/secondPlatform/dmWebsiteBelongevaluationSystem.js', '1', '3', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('104', '103', 'webSiteBelongEvaluationSecondPlatform', 'IP--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/secondPlatform/dmWebsiteBelongevaluationIP.js', '1', '2', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('105', '0', 'dmWebsiteDomainView', '全网系统热点域名匹配度信息', 'portalPage.do?js=/scripts/platform/resourceView/DmWebsiteDomainView/DmDomainBelongSystem.js', '1', '5', '0', '260', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('106', '105', 'dmWebsiteDomainView', '全网热点域名匹配明细信息', 'portalPage.do?js=/scripts/platform/resourceView/DmWebsiteDomainView/DmDomainSystemMatchDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('107', '0', 'dmDomainBelongEvaluationSecondPlatform', '热点域名概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation2/dmDomainBelongEvaluation.js', '1', '5', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('108', '0', 'dmDomainBelongEvaluationSecondPlatform', '系统--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation2/dmDomainBelongProvinceSystem.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('109', '108', 'dmDomainBelongEvaluationSecondPlatform', 'IP--域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmDomainBelongEvaluation2/dmDomainBelongIP.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('111', '0', 'dmmDomainBelongEvaluation', '热点域名概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongEvaluation.js', '1', '5', '0', '440', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('112', '0', 'dmmDomainBelongEvaluation', '运营商-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongOperator.js', '1', '3', '0', '200', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('113', '0', 'dmmDomainBelongEvaluation', '全网系统-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongSystem.js', '1', '2', '0', '200', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('114', '0', 'dmmDomainBelongEvaluation', '区域-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongProvince.js', '1', '3', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('115', '114', 'dmmDomainBelongEvaluation', '系统-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongProvinceSystem.js', '1', '2', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('116', '115', 'dmmDomainBelongEvaluation', 'IP-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation/dmmDomainBelongIP.js', '1', '5', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('117', '0', 'dmmDomainBelongEvaluationSecondPlatform', '热点域名概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation2/dmmDomainBelongEvaluation.js', '1', '5', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('118', '0', 'dmmDomainBelongEvaluationSecondPlatform', '系统-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation2/dmmDomainBelongProvinceSystem.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('119', '118', 'dmmDomainBelongEvaluationSecondPlatform', 'IP-域名热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmDomainBelongEvaluation2/dmmDomainBelongIP.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('120', '0', 'resourceViewMap', '分省资源视图明细', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewMapDetail.js', '1', '1', '600', '450', '1', '1', '<b>展示目的:</b><br>从全国各个省、市的角度，以列表的形式来展示网站、域名、URL、大文件的引入数量，以及本网请求次数和本省用户感知质量的数据信息<br><b>指标算法:<br></b>对各系统的数据进行排重汇总<br><b>使用方式:</b><br>选择要查询的类型以及系统<br><b><b>​数据源:<br></b></b><ol><li>网站信息来源于平台基础信息库</li><li>域名信息来源于爬虫系统</li><li>URL信息来源于爬虫系统</li><li>本网请求次数来源于DPI</li><li>大文件信息来源于爬虫系统</li><li>用户感知质量来源于质量拨测系统<br></li></ol><b>钻取:</b>无<b><br>其他:</b>无');
INSERT INTO `sc_cell_cfg` VALUES ('121', '0', 'dmDomainDetail', '域名明细信息', 'portalPage.do?js=/scripts/platform/resourceView/DmDomainDetail/DmHotbomainSort.js', '1', '5', '0', '310', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('122', '121', 'dmDomainDetail', '域名对应IP明细信息', 'portalPage.do?js=/scripts/platform/resourceView/DmDomainDetail/DmDomainipHotDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('123', '0', 'dmOutgoingBigFileEval', '大文件出网情况', 'portalPage.do?js=/scripts/platform/resource_statistics/DmOutgoingBigFileEval/DmBigFileOutgoingDetail.js', '1', '5', '0', '330', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('124', '0', 'dmBigFileBelongEvaluation', '热点大文件概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongEvaluation.js', '1', '5', '0', '440', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('125', '0', 'dmBigFileBelongEvaluation', '运营商--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongOperator.js', '1', '3', '0', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('126', '0', 'dmBigFileBelongEvaluation', '全网系统--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongSystem.js', '1', '2', '0', '300', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('127', '0', 'dmBigFileBelongEvaluation', '区域--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongProvince.js', '1', '3', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('128', '123', 'dmOutgoingBigFileEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispOutgoingDomainEval/DmIpQuaDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('129', '127', 'dmBigFileBelongEvaluation', '系统--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongProvinceSystem.js', '1', '2', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('130', '129', 'dmBigFileBelongEvaluation', 'IP--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation/dmBigFileBelongIP.js', '1', '5', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('131', null, 'dmBigFileBelongEvaluationSecondPlatform', '热点大文件概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation2/dmBigFileBelongEvaluation.js', '1', '5', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('132', '0', 'dmBigFileBelongEvaluationSecondPlatform', '系统--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation2/dmBigFileBelongProvinceSystem.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('133', '132', 'dmBigFileBelongEvaluationSecondPlatform', 'IP--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation2/dmBigFileBelongIP.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('134', '0', 'dmmWebSiteBelongEvaluation', '网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluation.js', '1', '3', '0', '425', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('135', '0', 'dmmWebSiteBelongEvaluation', '全网系统--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluationAllsystem.js', '1', '2', '0', '425', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('136', '134', 'dmmWebSiteBelongEvaluation', '运营商--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluationOperator.js', '1', '2', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('137', '134', 'dmmWebSiteBelongEvaluation', '省份--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluationProvince.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('138', '137', 'dmmWebSiteBelongEvaluation', '系统--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluationSystem.js', '1', '3', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('139', '138', 'dmmWebSiteBelongEvaluation', 'IP--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/dmmWebsiteBelongevaluationIP.js', '1', '2', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('140', '0', 'dmmWebSiteBelongEvaluationSecondPlatform', '网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/secondPlatform/dmmWebsiteBelongevaluation.js', '1', '5', '0', '425', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('141', '140', 'dmmWebSiteBelongEvaluationSecondPlatform', '系统--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/secondPlatform/dmmWebsiteBelongevaluationSystem.js', '1', '3', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('142', '141', 'dmmWebSiteBelongEvaluationSecondPlatform', 'IP--域名引入率', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dmm/secondPlatform/dmmWebsiteBelongevaluationIP.js', '1', '2', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('143', '0', 'dmmOutgoingBigFileEval', '大文件出网情况', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmOutgoingBigFileEval/DmmBigFileOutgoingDetail.js', '1', '5', '0', '330', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('144', '143', 'dmmOutgoingBigFileEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmDispOutgoingDomainEval/DmmIpQuaDetail.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('145', '0', 'dmmBigFileBelongEvaluation', '热点大文件概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongEvaluation.js', '1', '5', '0', '440', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('146', '0', 'dmmBigFileBelongEvaluation', '运营商-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongOperator.js', '1', '3', '0', '200', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('147', '0', 'dmmBigFileBelongEvaluation', '全网系统--大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongSystem.js', '1', '2', '0', '200', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('148', null, 'dmmBigFileBelongEvaluation', '区域-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongProvince.js', '1', '3', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('149', '148', 'dmmBigFileBelongEvaluation', '系统-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongProvinceSystem.js', '1', '2', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('150', '149', 'dmmBigFileBelongEvaluation', 'IP-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation/dmmBigFileBelongIP.js', '1', '5', '0', '300', '1', '6', '');
INSERT INTO `sc_cell_cfg` VALUES ('151', null, 'dmmBigFileBelongEvaluationSecondPlatform', '热点大文件概览', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation2/dmmBigFileBelongEvaluation.js', '1', '5', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('152', null, 'dmmBigFileBelongEvaluationSecondPlatform', '系统-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBigFileBelongEvaluation2/dmBigFileBelongProvinceSystem.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('153', '152', 'dmmBigFileBelongEvaluationSecondPlatform', 'IP-大文件热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBigFileBelongEvaluation2/dmmBigFileBelongIP.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('154', '0', 'dmWebsiteProvinceView', '分省网站热点匹配度信息', 'portalPage.do?js=/scripts/platform/resourceView/DmWebsiteProvinceView/DmWebsiteHotmatchProvinceSystem.js', '1', '5', '0', '260', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('155', '154', 'dmWebsiteProvinceView', '分省热点网站明细', 'portalPage.do?js=/scripts/platform/resourceView/DmWebsiteProvinceView/DmWebsiteHotProvinceSystem.js', '1', '5', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('156', '0', 'dmDomainView', '分省域名热点匹配度信息', 'portalPage.do?js=/scripts/platform/resourceView/DmDomainView/DmDomainHotmatchProvinceSystem.js', '1', '5', '0', '0', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('157', '156', 'dmDomainView', '分省系统域名热点明细', 'portalPage.do?js=/scripts/platform/resourceView/DmDomainView/DmDomainHotProvinceSystem.js', '1', '5', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('158', '0', 'webSitePanorama', '网站域名资源关系图', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSitePanorama.js', '1', '5', '0', '660', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('160', '0', 'webSiteLibrariesDetail', '热点网站', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/hotWebSiteSort.js', '1', '5', '0', '410', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('161', '0', 'dmBigFileOverview', '大文件数量分协议统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigFileProtocol.js', '1', '5', '0', '445', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('162', '160', 'webSiteLibrariesDetail', '网站下域名级别资源汇总', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/webSiteLevelTree.js', '1', '5', '0', '400', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('163', '0', 'portalTest', '网站下域名资源情况', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/webSiteDomainTree.js', '1', '5', '0', '400', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('164', '0', 'webSiteLibrariesDetailSecondPlatform', '热点网站', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/secondPlatform/hotWebSiteSort.js', '1', '5', '0', '410', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('165', '164', 'webSiteLibrariesDetailSecondPlatform', '网站下域名级别资源汇总', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/webSiteLevelTree.js', '1', '5', '0', '400', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('166', '0', 'portalTest', '网站下域名资源情况', 'portalPage.do?js=/scripts/platform/resourceView/webSiteLibraries/webSiteLibrariesDetail/secondPlatform/webSiteDomainTree.js', '1', '5', '0', '400', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('167', '0', 'dmBigFileResType', '大文件数量分资源类型统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigFileResType.js', '1', '5', '0', '445', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('168', '0', 'dmBigfileSizeType', '大文件数量分大小统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigfileSizeType.js', '1', '5', '0', '445', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('169', '0', 'dmIpOverview', '运营商IP分布', 'portalPage.do?js=/scripts/platform/resourceView/DmIpOverview/DmIpOperatorDistribution.js', '1', '1', '500', '470', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('170', '0', 'dmIpOverview', '分省系统IP分布', 'portalPage.do?js=/scripts/platform/resourceView/DmIpOverview/DmIpLibraryPattern.js', '1', '1', '600', '470', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('171', '0', 'rmImportantResOverview', '重要资源库概览', 'portalPage.do?js=/scripts/platform/resourceView/RmImportantResOverview/RmImportantResourceManagerOverview.js', '1', '5', '0', '440', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('172', '0', 'dmQuaWorseDomainEval', '域名热点质量分信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmQuaWorseDomainEval/DmDomainHotQualityDetail.js', '1', '5', '0', '330', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('173', '172', 'dmQuaWorseDomainEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispOutgoingDomainEval/DmIpQuaDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('174', '0', 'dmBigFileOverview', '大文件大小分协议统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigFileSizeProtocol.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('175', '0', 'dmBigfileSizeType', '大文件大小分大小统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigfileSizeSizeType.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('176', '0', 'dmBigFileResType', '大文件大小分资源类型统计', 'portalPage.do?js=/scripts/platform/resourceView/DmBigFileOverview/DmBigFileSizeResType.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('177', '0', 'dmBelongEvalOverview', '热点网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluation.js', '1', '5', '0', '420', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('178', '0', 'dmBelongEvalOverview', '运营商--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview/dmWebSiteBelongEvalOper.js', '1', '3', '0', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('179', '0', 'dmBelongEvalOverview', '全网系统--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview/dmWebSiteBelongEvalSystem.js', '1', '2', '0', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('180', '0', 'dmBelongEvalOverview', '区域--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview/dmWebSiteBelongEvalProvince.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('181', '180', 'dmBelongEvalOverview', '系统--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview/dmWebSiteBelongEvalProvinceSystem.js', '1', '2', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('182', '181', 'dmBelongEvalOverview', 'IP--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview/dmWebSiteBelongEvalSystemIp.js', '1', '5', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('183', '0', 'dmBelongEvalOverviewSecondPlatform', '热点网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/secondPlatform/dmWebsiteBelongevaluation.js', '1', '5', '0', '425', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('184', '0', 'dmBelongEvalOverviewSecondPlatform', '系统--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview2/dmWebSiteBelongEvalProvinceSystem.js', '1', '3', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('185', '184', 'dmBelongEvalOverviewSecondPlatform', 'IP--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmBelongEvalOverview2/dmWebSiteBelongEvalSystemIp.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('186', '0', 'dmmBelongEvalOverview', '热点网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluation.js', '1', '5', '0', '300', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('187', '0', 'dmmBelongEvalOverview', '运营商--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalOper.js', '1', '3', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('188', '0', 'dmmBelongEvalOverview', '全网系统--网站热点评估', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalSystem.js', '1', '2', '0', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('189', '0', 'dmmBelongEvalOverview', '区域--网站热点评估', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalProvince.js', '1', '3', '0', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('190', '189', 'dmmBelongEvalOverview', '系统--网站热点评估', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalProvinceSystem.js', '1', '2', '0', '300', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('191', '190', 'dmmBelongEvalOverview', 'IP--网站热点评估', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalSystemIp.js', '1', '5', '0', '300', '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('192', '0', 'dmmBelongEvalOverviewSecondPlatform', '热点网站概览', 'portalPage.do?js=/scripts/platform/resource_analysis/belongEvaluation/dm/dmWebsiteBelongevaluation.js', '1', '5', '0', '300', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('193', '0', 'dmmBelongEvalOverviewSecondPlatform', '系统--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalProvinceSystem.js', '1', '3', '0', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('194', '193', 'dmmBelongEvalOverviewSecondPlatform', 'IP--网站热点匹配度', 'portalPage.do?js=/scripts/platform/resource_analysis/dmmBelongEvalOverview/dmmWebSiteBelongEvalSystemIp.js', '1', '2', '0', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('195', '0', 'dcDomainResource', '内容探测系统域名资源明细', 'portalPage.do?js=/scripts/platform/interfaceManager/DcRpsDomainResDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('196', '0', 'dcHotDataReport', '智能DNS系统热点数据上报', 'portalPage.do?js=/scripts/platform/interfaceManager/DcDnsSubmitTopDomainResDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('197', '0', 'dcIcprrSiteTopnSystem', '网站备案系统明细', 'portalPage.do?js=/scripts/platform/interfaceManager/DcIcprrSiteTopnSystemDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('198', '0', 'dnslLogSystem', 'DNS日志分析系统明细', 'portalPage.do?js=/scripts/platform/interfaceManager/DcDnslLog_systemDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('199', '0', 'dcCacheBlackWhiteListSetReq', 'Cache系统黑白名单上报请求明细', 'portalPage.do?js=/scripts/platform/interfaceManager/DcCacheBlackWhiteListSetReqDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('200', '0', 'dcCacheContentViewReportReq', 'Cache系统热点内容视图上报明细', 'portalPage.do?js=/scripts/platform/interfaceManager/DcCacheContentViewReportReqDetail.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('201', '0', 'contentIeadIntoIndicat', '分省域名热点匹配信息', 'portalPage.do?js=/scripts/platform/scheduleManager/ContentIntroIndi/Dmdomainhotmatchprovinceidcsystem.js', '1', '5', '0', '0', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('202', '0', 'dmmQuaWorseDomainEval', '域名热点质量分信息', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/DmmQuaWorseDomainEval/DmmDomainHotQualityDetail.js', '1', '5', '0', '330', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('203', '202', 'dmmQuaWorseDomainEval', '域名IP质量分信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispOutgoingDomainEval/DmIpQuaDetail.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('204', '0', 'dmQualityIndicat', '页面打开延时', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/DmQualityIndicatDetail.js', '1', '5', null, null, '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('205', '0', 'dmQualityIndicat', '页面下载速率', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/PageDownloadSpeed.js', '1', '5', null, null, '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('206', '0', 'dmQualityIndicat', 'Ping延时', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/PingDelay.js', '1', '5', null, null, '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('207', '0', 'dmQualityIndicat', 'DNS延时', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/DNSDelay.js', '1', '5', null, null, '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('208', '0', 'dmQualityIndicat', 'TCP建链延时', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/TCPBlchainDelay.js', '1', '5', '0', '0', '1', '4', '');
INSERT INTO `sc_cell_cfg` VALUES ('209', '0', 'dmQualityIndicat', '首包响应延时', 'portalPage.do?js=/scripts/platform/scheduleManager/DmQualityIndicat/FirstPackageResDelay.js', '1', '5', null, null, '1', '5', '');
INSERT INTO `sc_cell_cfg` VALUES ('210', '59', 'webSiteQualityAnalysis', '网站质量分历史信息', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteQualityAnalysis/dmWebsiteQuaHistoryDetail.js', '1', '5', '1100', '300', '1', '3', '');
INSERT INTO `sc_cell_cfg` VALUES ('211', '0', 'dmmWebSiteQualityAnalysis', '网站质量分析', 'portalPage.do?js=/scripts/platform/dmmResourceStatistics/webSiteQualityAnalysis/dmmWebsiteQuality.js', '1', '5', '1100', '300', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('212', '211', 'dmmWebSiteQualityAnalysis', '资源服务本省质量', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteQualityAnalysis/dmResourceLocalQuality.js', '1', '5', '1100', '300', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('213', '211', 'dmmWebSiteQualityAnalysis', '网站质量分历史信息', 'portalPage.do?js=/scripts/platform/resource_statistics/webSiteQualityAnalysis/dmWebsiteQuaHistoryDetail.js', '1', '5', '1100', '300', '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('214', '0', 'smDnsRuleResolveIssue', '智能DNS系统DNS解析规则下发', 'portalPage.do?js=/scripts/platform/interfaceManager/smDispatchDecisionGroupDe.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('215', '0', 'heatMapTest', 'heatMapTest', 'portalPage.do?js=/scripts/platform/example/test.js', '4', '4', '0', '300', '1', '1', 'heatMapTest');
INSERT INTO `sc_cell_cfg` VALUES ('216', '0', 'dpiSystem', 'DPI系统明细', 'portalPage.do?js=/scripts/platform/interfaceManager/TBRW0005.js', '1', '5', '0', '450', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('217', '0', 'dmWebSiteRepeatResEval', '省内重复域名总览', 'portalPage.do?js=/scripts/platform/resource_statistics/DmWebSiteRepeatResEval/dmDomainLocalRepeatOverview.js', '1', '5', '0', '300', '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('218', '217', 'dmWebSiteRepeatResEval', '省内重复域名明细', 'portalPage.do?js=/scripts/platform/resource_statistics/DmWebSiteRepeatResEval/dmDomainLocalRepeatDetail.js', '1', '5', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('219', '218', 'dmWebSiteRepeatResEval', '省内重复域名访问明细', 'portalPage.do?js=/scripts/platform/resource_statistics/DmWebSiteRepeatResEval/dmDomainLocalRepeatViewDetail.js', '1', '5', null, null, '1', '2', '');
INSERT INTO `sc_cell_cfg` VALUES ('220', '0', 'hotEvalOverview', '热点网站数量占总量趋势图', 'portalPage.do?js=/scripts/platform/resource_analysis/dmHotEvalOverview/overview_trend.js', '1', '4', '0', '0', '1', '1', '<i><b>热点网站占总量趋势图</b></i>');
INSERT INTO `sc_cell_cfg` VALUES ('221', '0', 'hotEvalOverview', '热点网站热点信息', 'portalPage.do?js=/scripts/platform/resource_analysis/dmHotEvalOverview/overview_pro.js', '1', '4', '0', '0', '1', '2', '热点网站占总量');
INSERT INTO `sc_cell_cfg` VALUES ('222', '0', 'hotEvalOverview', '网站热度图', 'portalPage.do?js=/scripts/platform/resource_analysis/dmHotEvalOverview/overview_heat.js', '1', '4', '0', '0', '1', '3', '网站热度图');
INSERT INTO `sc_cell_cfg` VALUES ('223', '0', 'dmQualityEvaluateOverview', '本省资源服务质量信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmQualityEvaluateOverview/dmLocalResourceQuality.js', '1', '5', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('224', '0', 'dmQualityEvaluateOverview', '本省网站质量分历史信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmQualityEvaluateOverview/dmLocalWebsiteQuaHistoryDetail.js', '1', '5', '0', '0', '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('225', '0', 'dmDispatchOverview', '调度域名及节省流量信息', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispatchOverview/dmDomainDispSaveFlowDetail.js', '1', '5', null, null, '1', '0', '');
INSERT INTO `sc_cell_cfg` VALUES ('226', '0', 'dmDispatchOverview', '质量分变化分布情况', 'portalPage.do?js=/scripts/platform/resource_statistics/DmDispatchOverview/dmQualityScoreChangeDistributionDetail.js', '1', '5', null, null, '1', '1', '');
INSERT INTO `sc_cell_cfg` VALUES ('227', '230', 'analysisReport', '一、网站基本情况', 'analysisReportController.do?url=/platform/resource_analysis/analysisReport/analysisReport', '1', '4', '0', '350', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('228', '0', 'smBigfileCacheViewDetail', '大文件明细列表', 'portalPage.do?js=/scripts/platform/dispatcher/smBigfileCacheViewDetail.js', '1', '5', '0', '410', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('229', '0', 'analysisReportHandler', '网站分析报告-网站信息', 'analysisReportController.do?url=/platform/resource_analysis/analysisReport/analysisReportWebSiteList', '1', '4', '1150', '750', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('230', '0', 'analysisReport', '网站分析报告-网站列表', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/analysisReportWebSiteList.js', '8', '1', '0', '4090', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('232', '230', 'analysisReport', '二、网站资源全网分布情况', 'analysisReportNetWorkWebSiteResDistr.do', '1', '4', '0', '1100', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('233', '0', 'smBigfileCacheViewDetail', '各省份回源流量明细', 'portalPage.do?js=/scripts/platform/dispatcher/smBigfileCacheViewDetailProvince.js', '1', '5', '0', '0', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('234', '230', 'analysisReport', '三、网站域名资源本省分布情况', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/dmAnalysisReportLocalDomainResDistrDetail.js', '1', '4', '0', '0', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('235', '230', 'analysisReport', '四、本省热点资源情况', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/analysisReport4.js', '1', '4', '0', '400', '1', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('236', '230', 'analysisReport', '五、网站资源本省热点分布', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/dmAnalysisReportLocalWebSiteResFlowDistr.js', '1', '4', '0', '400', '1', '5', null);
INSERT INTO `sc_cell_cfg` VALUES ('237', '230', 'analysisReport', '六、网站资源本省访问质量情况', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/dmAnalysisReportR6RequestQuaDistr.js', '1', '4', '0', '800', '1', '6', null);
INSERT INTO `sc_cell_cfg` VALUES ('238', '230', 'analysisReport', '七、本省资源调度情况', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/analysisReport7.js', '1', '4', '0', '400', '1', '7', null);
INSERT INTO `sc_cell_cfg` VALUES ('239', '230', 'analysisReport', '八、总结', 'portalPage.do?js=/scripts/platform/resource_analysis/analysisReport/analysisReport8.js', '1', '4', '0', '150', '1', '8', '资源数量：url资源在1000以下为较少,url资源在1000-10000中等,url资源在100000以上为较多<br><br>资源访问热度：日访问次数在1000以下为低,1000-100000为中,100000以上为高<br><br>本省引入率：引入率小于50为低,50-80为中,80为高<br><br>重复引入情况：重复引入小于5为低,5到20为中,大于20为高<br><br>出网流量：出网流量占总流量小于5为低,5到10为中,大于10为高<br><br>总体访问质量：质量分小于60为差,60-80为一般,80以上为较好<br><br>ICP调度错误率：错误率小于5为低,5到15为一般,15以上为较高<span style=\"font-family:Heiti SC;font-size:13px;font-weight:normal;font-style:normal;text-decoration:none;color:#333333;\"></span>');
INSERT INTO `sc_cell_cfg` VALUES ('240', '0', 'dmUserVisitAnalysisReport', '用户访问视图--ICP', 'portalPage.do?js=/scripts/platform/dispatcher/resourceReport/dmUserVisitViewICP.js', '1', '5', '0', '450', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('241', '0', 'dmUserVisitAnalysisReport', 'HostIP详细信息', 'portalPage.do?js=/scripts/platform/dispatcher/resourceReport/hostIPdetail.js', '1', '5', '0', '420', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('242', '0', 'dmResourceFlowAnalysisReport', '资源流量视图--ICP', 'portalPage.do?js=/scripts/platform/dispatcher/resourceReport/dmResourceFlowViewICP.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('243', '0', 'dmResourceFlowAnalysisReport', '资源流量视图--频道/域名', 'portalPage.do?js=/scripts/platform/dispatcher/resourceReport/dmResourceFlowViewChannelDomain.js', '1', '5', '0', '420', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('244', '0', 'bigFileSynergy', '局点间协同统计信息', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/bigFileSynergy/staList.js', '1', '4', '0', '310', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('245', '0', 'bigFileSynergy', '局点协同历史信息', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/bigFileSynergy/synHis.js', '1', '4', '0', '0', '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('246', '0', 'bigFileSynFailure', '', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/bigFileSynFailure/smBigfileSynfailueDetail.js', '1', '5', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('247', '0', 'bigFileSynergy', '局点协同TOPN排序', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/bigFileSynergy/synTopN.js', '1', '4', '0', '0', '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('248', '0', 'dmProvinceUnintroduceHotdomainAnalysis', '各省未引入热点域名', 'portalPage.do?js=/scripts/platform/resource_analysis/introduceEval/unIntroduce/dmProvinceUnintroduceHotdomainEval.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('249', '248', 'dmProvinceUnintroduceHotdomainAnalysis', '域名详细', 'portalPage.do?js=/scripts/platform/resource_analysis/introduceEval/unIntroduce/dmProvinceUnintroduceHotdomainEvalDetail.js', '1', '5', '0', '420', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('250', '0', 'resourceViewProvince', '分省资源总览', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewProvinceChartPanel.js', '1', '4', '1000', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('251', '0', 'resourceViewProvince', '分省资源明细', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewProvinceGridPanel.js', '1', '4', '1000', '500', '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('252', '0', 'testPortal', '网内系统资源分布情况', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewSystem.js', '1', '4', '1050', '400', '1', '6', null);
INSERT INTO `sc_cell_cfg` VALUES ('253', '0', 'domainDetail', '网内资源', 'portalPage.do?js=/scripts/platform/dispatcher/domainDispatchScene/domainDetail.js', '1', '5', '0', '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('254', '0', 'domainDetail', '出网IP', 'portalPage.do?js=/scripts/platform/dispatcher/domainDispatchScene/outIPDetail.js', '1', '5', null, '420', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('255', '0', 'IDCReport', 'IDC引入报表', 'portalPage.do?js=/scripts/platform/resource_report/allnetwork/IDCReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('256', '0', 'cacheReport', 'Cache引入报表', 'portalPage.do?js=/scripts/platform/resource_report/allnetwork/CacheReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('257', '0', 'PDNReport', '直连引入报表', 'portalPage.do?js=/scripts/platform/resource_report/allnetwork/PDNReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('258', '0', 'CDNReport', 'CDN引入报表', 'portalPage.do?js=/scripts/platform/resource_report/allnetwork/CDNReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('259', '0', 'selfdefineReport', '自定义报表', 'portalPage.do?js=/scripts/platform/resource_report/allnetwork/SelfDefineReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('260', '0', 'provinceIDCReport', '分省IDC引入报表', 'portalPage.do?js=/scripts/platform/resource_report/provinceReport/ProvinceIDCReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('261', '0', 'provinceCacheReport', '分省Cache引入报表', 'portalPage.do?js=/scripts/platform/resource_report/provinceReport/ProvinceCacheReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('262', '0', 'provincePDCReport', '分省直连引入报表', 'portalPage.do?js=/scripts/platform/resource_report/provinceReport/ProvincePDCReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('263', '0', 'provinceCDNReport', '分省CDN引入报表', 'portalPage.do?js=/scripts/platform/resource_report/provinceReport/ProvinceCDNReport.js', '1', '4', '0', '0', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('264', '0', 'outIpDetail', '出网IP', 'portalPage.do?js=/scripts/platform/dispatcher/domainDispatchScene/outIPDetail.js', '1', '5', null, '420', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('265', '0', 'baotaTest', 'a', 'portalPage.do?js=/scripts/platform/baotaTest.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('266', '0', 'idcCacheShare', '网内资源去重', 'portalPage.do?js=/scripts/platform/resource_statistics/IDCCacheShare/dmDomainBetterResOverview.js', '1', '5', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('267', '266', 'idcCacheShare', '分省域名更优资源总览', 'portalPage.do?js=/scripts/platform/resource_statistics/IDCCacheShare/dmDomainBetterResOverviewDrillLater.js', '1', '5', '0', '0', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('268', '0', 'webSiteIntroView', '分省网站引入视图', 'portalPage.do?js=/scripts/platform/groupFunction/webSiteIntroView.js', '1', '4', '0', '0', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('269', '0', 'domainIntroView', '分省域名引入视图', 'portalPage.do?js=/scripts/platform/groupFunction/domainIntroView.js', '1', '4', '0', '0', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('270', '267', 'idcCacheShare', '分省域名更优资源明细', 'portalPage.do?js=/scripts/platform/resource_statistics/IDCCacheShare/dmDomainBetterResDetail.js', '1', '5', '0', '0', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('271', '0', 'idcCacheRepeat', '本省资源去重', 'portalPage.do?js=/scripts/platform/resource_analysis/idcCacheRepeat/idcCacheRepeatList.js', '1', '4', '0', '0', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('272', '0', 'resReportProvinceTOP200', 'TOP200分省热点域名网内外解析比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportProvinceTOP200.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('273', '0', 'resReportWholeTOP200', 'TOP200全网热点域名网内外解析比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportWholeTOP200.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('274', null, 'resReportAllTOP1000', 'TOP1000全网热点域名网内外解析比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportAllTOP1000.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('275', null, 'resReportProvinceTOP1000', 'TOP1000分省热点域名网内外解析比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportProvinceTOP1000.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('276', '0', 'resReportAllTOP10', 'TOP10全网热点网站点击比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportAllTOP10.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('277', null, 'resReportProvinceTOP10', 'TOP10分省热点网站点击比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportProvinceTOP10.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('278', '0', 'resReportAllInOutTOP10', 'TOP10全网热点网站网内外比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportAllInOutTOP10.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('279', null, 'resReportProvinceInOutTOP10', 'TOP10分省热点网站网内外比例', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/resReportProvinceInOutTOP10.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('282', '0', 'cacheCollaborativeStatistics', 'Cache协同统计', 'portalPage.do?js=/scripts/platform/resourceView/resourceReport/cacheCollaborativeStatistics.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('283', '0', 'ipwebisteAearch', 'IP地址反查', 'portalPage.do?js=/scripts/platform/resourceView/IpwebisteAearch/DmIpwebisteSearch.js', '1', '5', '0', '440', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('284', '0', 'cacheShareExtranetDomainTop100', '按流量统计域名列表', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/cacheShareExtranetDomainTop100/DmCacheshareAgoExtranetSourceDomainTOP100Flow.js', '1', '1', '550', '370', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('285', '0', 'cacheShareExtranetDomainTop100', '按次数统计域名列表', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/cacheShareExtranetDomainTop100/DmCacheshareAgoExtranetSourceDomainTOP100Frequency.js', '1', '1', '550', '370', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('286', '0', 'cacheShareExtranetURLTop100', '按流量统计URL列表', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/CacheShareExtranetURLTop100/DmCacheshareAgoExtranetSourceDomainUrltop100Flow.js', '1', '1', '550', '370', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('287', '0', 'cacheShareExtranetURLTop100', '按次数统计URL列表', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/CacheShareExtranetURLTop100/DmCacheshareAgoExtranetSourceDomainUrltop100Frequency.js', '1', '1', '550', '370', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('288', '0', 'cacheShareExtranetAllDomain', '去外网回源文件后缀', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/cacheShareExtranetAllDomain/cacheShareExtranetAllDomain.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('289', null, 'extranetRate', '回源速率', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/extranetRate/extranetRate.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('290', '0', 'afterExtranetRate', '协同后回源速率', 'portalPage.do?js=/scripts/platform/smBigFileSynergy/extranetRate/afterExtranetRate.js', '1', '4', '0', '0', '1', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('291', null, '', '', '', null, null, null, null, null, null, null);
INSERT INTO `sc_cell_cfg` VALUES ('292', '0', 'externalLxDispatch', '视频调度查询', 'portalPage.do?js=/scripts/platform/external.lx/externalLxDispatch.js', '1', '4', '0', '500', '0', '0', null);
INSERT INTO `sc_cell_cfg` VALUES ('293', '0', 'externalWsDomainCache', '缓存域名清单', 'portalPage.do?js=/scripts/platform/external.ws/externalWsDomainCache.js', '1', '4', '0', '500', '0', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('297', '0', 'flowAnalysisAllForUser', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('298', '0', 'IDCKeyIndicator', 'ICD关键指标', 'portalPage.do?js=/scripts/platform/systemAnalysis/IDCEvaluate/idcKeyIndicator.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('299', '0', 'flowAnalysisAllForUser', '用户流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('300', '0', 'flowAnalysisAllForUser', '用户类型流量明细', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('301', null, 'IDCHotWebsite', 'ICD内热点网站', 'portalPage.do?js=/scripts/platform/systemAnalysis/IDCEvaluate/idcHotWebsite.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('302', '0', 'IDCOptimizeOffer', 'IDC', 'portalPage.do?js=/scripts/platform/systemAnalysis/IDCEvaluate/idcOptimizeOffer.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('303', '0', 'otherFlowDistributedForUser', '归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/belongFlowDistributedFromUser.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('304', '0', 'otherFlowDistributedForUser', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/appFlowDistributedFromUser.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('305', '0', 'flowAnalysisAllForBelong', '整体流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/belongAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('306', '0', 'flowAnalysisAllForBelong', '整体流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/belongAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('307', '0', 'flowAnalysisAllForBelong', '归属流量明细', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/belongAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('308', '0', 'otherFlowDistributedForBelong', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/belongAnalysis/userFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('309', '0', 'otherFlowDistributedForBelong', '应用类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/belongAnalysis/appFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('310', '0', 'flowAnalysisAllForApp', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('311', '0', 'flowAnalysisAllForApp', '应用流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('312', '0', 'flowAnalysisAllForApp', '应用流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('313', '0', 'otherFlowDistributedForApp', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/userFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('314', '0', 'otherFlowDistributedForApp', '归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/belongFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('315', '0', 'flowAnalysisInForUser', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/userAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('316', '0', 'flowAnalysisInForUser', '用户类型流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/userAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('317', '0', 'flowAnalysisInForUser', '用户类型流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/userAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('318', '0', 'flowAnalysisInForBelong', '网内流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/belongAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('319', '0', 'flowAnalysisInForBelong', '网内流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/belongAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('320', '0', 'flowAnalysisInForBelong', '网内流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/belongAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('321', '0', 'flowAnalysisInForApp', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/appAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('322', '0', 'flowAnalysisInForApp', '应用流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/appAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('323', '0', 'flowAnalysisInForApp', '应用流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/appAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('324', '0', 'flowAnalysisOutForUser', '用户类型流量分析', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/userAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('325', '0', 'flowAnalysisOutForUser', '用户类型流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/userAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('326', '0', 'flowAnalysisOutForUser', '用户类型流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/userAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('327', '0', 'flowAnalysisOutForBelong', '网外归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/belongAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('328', '0', 'flowAnalysisOutForBelong', '网外归属流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/belongAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('329', '0', 'flowAnalysisOutForBelong', '网外流量归属列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/belongAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('330', '0', 'flowAnalysisOutForApp', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/appAnalysis/flowDistributed.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('331', '0', 'flowAnalysisOutForApp', '应用流量趋势', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/appAnalysis/flowTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('332', '0', 'flowAnalysisOutForApp', '应用流量列表', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/appAnalysis/flowDetail.js', '2', '5', '1030', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('333', null, 'top10WebsiteAnalysis', 'TOP10网站分析', 'portalPage.do?js=/scripts/platform/appAnalysis/top10WebsiteAnalysis.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('334', '0', 'P2PcacheEvaluation', '关键指标', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/P2PcacheEvaluateKeyBasis.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('335', '0', 'P2PcacheEvaluation', '工作状态', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/P2PcacheEvaluateStatus.js', '1', '1', '1000', '500', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('336', null, 'P2PcacheOptimization', '建议列表', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/P2PcacheOptimizelist.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('338', '0', 'P2PUserAnalysis', 'P2P流量用户分布', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PUserAnalysis/P2PFlowUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('339', '0', 'P2PUserAnalysis', 'P2P流量用户趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PUserAnalysis/P2PFlowUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('340', '0', 'P2PUserAnalysis', 'P2P用户分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PUserAnalysis/P2PFlowUserList.js', '2', '5', '1000', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('341', '0', 'otherFlowDistributedForBelongIn', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/belongAnalysis/userFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('342', '0', 'otherFlowDistributedForBelongIn', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/belongAnalysis/appFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('343', '0', 'otherFlowDistributedForUserIn', '归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/userAnalysis/belongFlowDistributedFromUserType.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('344', '0', 'otherFlowDistributedForUserIn', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/userAnalysis/appFlowDistributedFromUser.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('345', '0', 'otherFlowDistributedForAppIn', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisAll/appAnalysis/userFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('346', '0', 'otherFlowDistributedForAppIn', '归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisIn/appAnalysis/belongFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('347', null, 'P2PBelongAnalysis', 'P2P流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PBelongAnalysis/P2PFlowUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('348', null, 'P2PBelongAnalysis', 'P2P流量趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PBelongAnalysis/P2PFlowUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('349', null, 'P2PBelongAnalysis', 'P2P归属分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PBelongAnalysis/P2PFlowUserList.js', '2', '5', '1000', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('350', null, 'HTTPUserAnalysis', 'HTTP流量用户分布', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPUserAnalysis/HTTPUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('351', null, 'HTTPUserAnalysis', 'HTTP流量用户趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPUserAnalysis/HTTPUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('352', null, 'HTTPUserAnalysis', 'HTTP用户分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPUserAnalysis/HTTPUserList.js', '2', '5', '1000', '400', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('353', '0', 'otherFlowDistributedForUserOut', '网外流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/userAnalysis/belongFlowDistributedFromUser.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('354', '0', 'otherFlowDistributedForUserOut', '网外应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/userAnalysis/appFlowDistributedFromUser.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('355', null, 'HTTPBelongAnalysis', 'HTTP流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPBelongAnalysis/HTTPUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('356', null, 'HTTPBelongAnalysis', 'HTTP流量趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPBelongAnalysis/HTTPUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('357', '0', 'HTTPBelongAnalysis', 'HTTP归属分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPBelongAnalysis/HTTPUserList.js', '2', '5', '1000', '300', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('358', null, 'HTTPAppAnalysis', 'HTTP流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPAppAnalysis/HTTPUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('359', '0', 'HTTPAppAnalysis', 'HTTP流量趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPAppAnalysis/HTTPUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('360', '0', 'HTTPAppAnalysis', 'HTTP应用分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPAppAnalysis/HTTPUserList.js', '2', '5', '1000', '300', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('361', '0', 'otherFlowDistributedForBelongOut', '网外用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/belongAnalysis/userFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('362', '0', 'otherFlowDistributedForBelongOut', '网外应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/belongAnalysis/appFlowDistributedFromBelong.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('363', '0', 'P2PAppAnalysis', 'P2P流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PAppAnalysis/P2PFlowUserdistribution.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('364', null, 'P2PAppAnalysis', 'P2P流量趋势', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PAppAnalysis/P2PFlowUserTrend.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('365', null, 'P2PAppAnalysis', 'P2P应用分析列表', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PAppAnalysis/P2PFlowUserList.js', '2', '5', '1000', '300', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('366', '0', 'otherFlowDistributedForAppOut', '网外用户类型流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/appAnalysis/userFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('367', '0', 'otherFlowDistributedForAppOut', '网外归属流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowAnalysisOut/appAnalysis/belongFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('368', '0', 'flowOptimizationTips', '应用流量分布', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/flowDistributed.js', '1', '1', '600', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('369', '0', 'flowOptimizationTips', '高价值应用类型流量', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/highValueFlow.js', '1', '1', '1030', '330', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('370', null, 'P2POtherDistribution', '用户类型流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PAppAnalysis/userFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('371', null, 'P2POtherDistribution', '归属流量分布', 'portalPage.do?js=/scripts/platform/appAnalysis/P2PAppAnalysis/belongFlowDistributedFromApp.js', '1', '2', '400', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('374', '0', 'webCacheEvaluation', '关键指标', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/webCacheEvaluateCacheKey.js', '1', '2', '500', '300', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('375', '0', 'webCacheEvaluation', '关键指标', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/webCacheEvaluateDelayKey.js', '1', '2', '500', '300', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('376', '0', 'webCacheEvaluation', '缓存工作状态', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/webCacheEvaluateWorkStatus.js', '2', '5', '1030', '440', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('377', '0', 'HTTPOptimizeSuggestion', 'IDC建议引入列表', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPOptimize/idcOptimizeOffer.js', '1', '1', '1000', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('378', '0', 'WebCacheOptimize', '建议列表', 'portalPage.do?js=/scripts/platform/systemAnalysis/cacheEvaluate/webCacheOptimizeTipsList.js', '2', '5', '1030', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('379', '0', 'HTTPOptimizeSuggestion', 'webCache建议列表', 'portalPage.do?js=/scripts/platform/appAnalysis/HTTPOptimize/webCacheOptimizeOffer.js', '1', '1', '1000', '400', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('380', null, 'P2PAnalysisOptimize', '优化建议列表', 'portalPage.do?js=/scripts/platform/appAnalysis/P2POptimize/P2PAnalysisOptimizelist.js', '1', '1', '1030', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('381', null, 'resourceView', '网站分省概览', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewWebSiteProvince.js', '1', '2', '500', '300', '0', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('382', null, 'resourceView', '域名分省概览', 'portalPage.do?js=/scripts/platform/resource_statistics/resource_view/resourceViewDomainProvince.js', '1', '2', '500', '300', '0', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('383', null, 'inwebClickRate', '点击本网率趋势图', 'portalPage.do?js=/scripts/platform/resource_report/inwebClickRate/dmHotRateIn.js', '1', '1', null, null, '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('384', null, 'systemIntroReport', '分系统引入报表', 'report.do?rpt=全网-分系统引入报表.brt', '0', '0', null, null, '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('385', '0', 'inwebClickRateReport', '本网点击率报表', 'report.do?rpt=点击本网率报表.brt', '1', '1', '0', '0', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('386', '0', 'flowOptimizationTips', '中价值应用类型流量', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/middleValueFlow.js', '1', '1', '1030', '200', '1', '3', null);
INSERT INTO `sc_cell_cfg` VALUES ('387', '0', 'flowOptimizationTips', '低价值应用类型流量', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/lowValueFlow.js', '1', '1', '1030', '200', '1', '4', null);
INSERT INTO `sc_cell_cfg` VALUES ('388', '0', 'highAppTypeFlow', '高价值应用类型流量明细', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/highAppTypeFlowDetail.js', '1', '1', '900', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('389', '388', 'highAppTypeFlow', '优化建议', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/optimizationTipsList.js', '1', '1', '900', '660', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('390', '392', 'middleAppTypeFlow', '优化建议', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/optimizationTipsList.js', '1', '1', '900', '660', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('391', '393', 'lowAppTypeFlow', '优化建议', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/optimizationTipsList.js', '1', '1', '900', '660', '1', '2', null);
INSERT INTO `sc_cell_cfg` VALUES ('392', '0', 'middleAppTypeFlow', '中价值应用类型流量明细', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/middleAppTypeFlowDetail.js', '1', '1', '900', '400', '1', '1', null);
INSERT INTO `sc_cell_cfg` VALUES ('393', '0', 'lowAppTypeFlow', '低价值应用类型流量明细', 'portalPage.do?js=/scripts/platform/flowAnalysis/flowOptimizationTips/lowAppTypeFlowDetail.js', '1', '1', '900', '400', '1', '1', null);

-- ----------------------------
-- Table structure for `sc_org`
-- ----------------------------
DROP TABLE IF EXISTS `sc_org`;
CREATE TABLE `sc_org` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `ORG_CODE` varchar(50) NOT NULL COMMENT '机构代码',
  `ORG_NAME` varchar(50) DEFAULT NULL COMMENT '机构名称',
  `ORG_SHORT_NAME` varchar(20) DEFAULT NULL COMMENT '机构简称',
  `ORG_LEVEL` int(11) DEFAULT NULL COMMENT '机构等级',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_ORG_IDX` (`ID`),
  KEY `AK_AK_SC_ORG` (`ORG_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_org
-- ----------------------------
INSERT INTO `sc_org` VALUES ('1', '10001', '中国', '中国', '100');
INSERT INTO `sc_org` VALUES ('4', '510000', '广东省分公司', '广东省分公司', '200');
INSERT INTO `sc_org` VALUES ('7', '010000', '内蒙古省分公司', '内蒙古省分公司', '200');
INSERT INTO `sc_org` VALUES ('8', '030000', '山西省分公司', '山西省分公司', '200');
INSERT INTO `sc_org` VALUES ('9', '050000', '河北省分公司', '河北省分公司', '200');
INSERT INTO `sc_org` VALUES ('10', '1', '集团公司', '集团公司', '200');
INSERT INTO `sc_org` VALUES ('11', '100000', '北京市省分公司', '北京市省分公司', '200');
INSERT INTO `sc_org` VALUES ('12', '110000', '辽宁省分公司', '辽宁省分公司', '200');
INSERT INTO `sc_org` VALUES ('13', '130000', '吉林省分公司', '吉林省分公司', '200');
INSERT INTO `sc_org` VALUES ('14', '150000', '黑龙江省分公司', '黑龙江省分公司', '200');
INSERT INTO `sc_org` VALUES ('15', '2', '研究院省分公司', '研究院省分公司', '200');
INSERT INTO `sc_org` VALUES ('16', '200000', '上海市省分公司', '上海市省分公司', '200');
INSERT INTO `sc_org` VALUES ('17', '210000', '江苏省分公司', '江苏省分公司', '200');
INSERT INTO `sc_org` VALUES ('18', '230000', '安徽省分公司', '安徽省分公司', '200');
INSERT INTO `sc_org` VALUES ('19', '250000', '山东省分公司', '山东省分公司', '200');
INSERT INTO `sc_org` VALUES ('20', '3', '南方基地省分公司', '南方基地省分公司', '200');
INSERT INTO `sc_org` VALUES ('21', '300000', '天津市省分公司', '天津市省分公司', '200');
INSERT INTO `sc_org` VALUES ('22', '310000', '浙江省分公司', '浙江省分公司', '200');
INSERT INTO `sc_org` VALUES ('23', '330000', '江西省分公司', '江西省分公司', '200');
INSERT INTO `sc_org` VALUES ('24', '350000', '福建省分公司', '福建省分公司', '200');
INSERT INTO `sc_org` VALUES ('25', '400000', '重庆市省分公司', '重庆市省分公司', '200');
INSERT INTO `sc_org` VALUES ('26', '410000', '湖南省分公司', '湖南省分公司', '200');
INSERT INTO `sc_org` VALUES ('27', '430000', '湖北省分公司', '湖北省分公司', '200');
INSERT INTO `sc_org` VALUES ('28', '450000', '河南省分公司', '河南省分公司', '200');
INSERT INTO `sc_org` VALUES ('29', '510000', '广东省分公司', '广东省分公司', '200');
INSERT INTO `sc_org` VALUES ('30', '530000', '广西省分公司', '广西省分公司', '200');
INSERT INTO `sc_org` VALUES ('31', '550000', '贵州省分公司', '贵州省分公司', '200');
INSERT INTO `sc_org` VALUES ('32', '570000', '海南省分公司', '海南省分公司', '200');
INSERT INTO `sc_org` VALUES ('33', '610000', '四川省分公司', '四川省分公司', '200');
INSERT INTO `sc_org` VALUES ('34', '650000', '云南省分公司', '云南省分公司', '200');
INSERT INTO `sc_org` VALUES ('35', '710000', '陕西省分公司', '陕西省分公司', '200');
INSERT INTO `sc_org` VALUES ('36', '730000', '甘肃省分公司', '甘肃省分公司', '200');
INSERT INTO `sc_org` VALUES ('37', '750000', '宁夏省分公司', '宁夏省分公司', '200');
INSERT INTO `sc_org` VALUES ('38', '810000', '青海省分公司', '青海省分公司', '200');
INSERT INTO `sc_org` VALUES ('39', '830000', '新疆省分公司', '新疆省分公司', '200');
INSERT INTO `sc_org` VALUES ('40', '850000', '西藏省分公司', '西藏省分公司', '200');
INSERT INTO `sc_org` VALUES ('41', '999999', '其他省分公司', '其他省分公司', '200');

-- ----------------------------
-- Table structure for `sc_org_relation`
-- ----------------------------
DROP TABLE IF EXISTS `sc_org_relation`;
CREATE TABLE `sc_org_relation` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `CURR_ORG_CODE` varchar(50) DEFAULT NULL COMMENT '本级机构代码',
  `PARENT_ORG_CODE` varchar(50) DEFAULT NULL COMMENT '上级机构代码',
  `LEAF_SIGN` int(11) DEFAULT NULL COMMENT '有无下级机构',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_ORG_REL_IDX` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='国家，省，市，县';

-- ----------------------------
-- Records of sc_org_relation
-- ----------------------------
INSERT INTO `sc_org_relation` VALUES ('2', '20001', '10001', '1');
INSERT INTO `sc_org_relation` VALUES ('3', '510000', '510000', '1');
INSERT INTO `sc_org_relation` VALUES ('11', '10001', '10001', '0');
INSERT INTO `sc_org_relation` VALUES ('12', '10001', '10001', '0');

-- ----------------------------
-- Table structure for `sc_parm_info`
-- ----------------------------
DROP TABLE IF EXISTS `sc_parm_info`;
CREATE TABLE `sc_parm_info` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `PARM_CODE` varchar(50) NOT NULL COMMENT '字典代码',
  `PARM_NAME` varchar(100) NOT NULL COMMENT '字典名称',
  `TYPE_CODE` varchar(50) NOT NULL COMMENT '类型代码',
  `PARM_SORT` int(11) DEFAULT NULL COMMENT '排序',
  `DESCRIPTION` varchar(200) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_PARM_INFO_IDX1` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=249 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_parm_info
-- ----------------------------
INSERT INTO `sc_parm_info` VALUES ('-2', '0', '否', 'BOOLEAN_VALUE', '2', null);
INSERT INTO `sc_parm_info` VALUES ('-1', '1', '是', 'BOOLEAN_VALUE', '1', null);
INSERT INTO `sc_parm_info` VALUES ('1', '200', '二级机构', 'ORG_LEVEL', '2', '');
INSERT INTO `sc_parm_info` VALUES ('2', '100', '一级机构', 'ORG_LEVEL', '1', '');
INSERT INTO `sc_parm_info` VALUES ('3', '300', '三级机构', 'ORG_LEVEL', '3', '');
INSERT INTO `sc_parm_info` VALUES ('4', '1', '1月', 'TIME_MONTH', '1', '');
INSERT INTO `sc_parm_info` VALUES ('5', '2', '2月', 'TIME_MONTH', '2', '');
INSERT INTO `sc_parm_info` VALUES ('6', '3', '3月', 'TIME_MONTH', '3', '');
INSERT INTO `sc_parm_info` VALUES ('7', '4', '4月', 'TIME_MONTH', '1', '');
INSERT INTO `sc_parm_info` VALUES ('8', '5', '5月', 'TIME_MONTH', '5', '');
INSERT INTO `sc_parm_info` VALUES ('9', '6', '6月', 'TIME_MONTH', '2', '');
INSERT INTO `sc_parm_info` VALUES ('10', '7', '7月', 'TIME_MONTH', '7', '');
INSERT INTO `sc_parm_info` VALUES ('11', '8', '8月', 'TIME_MONTH', '8', '');
INSERT INTO `sc_parm_info` VALUES ('12', '9', '9月', 'TIME_MONTH', '9', '');
INSERT INTO `sc_parm_info` VALUES ('13', '10', '10月', 'TIME_MONTH', '10', '');
INSERT INTO `sc_parm_info` VALUES ('14', '11', '11月', 'TIME_MONTH', '11', '');
INSERT INTO `sc_parm_info` VALUES ('15', '12', '12月', 'TIME_MONTH', '12', '');
INSERT INTO `sc_parm_info` VALUES ('32', '2001', '2001', 'FINCAL_YEAR', '1', '');
INSERT INTO `sc_parm_info` VALUES ('33', '2002', '2002', 'FINCAL_YEAR', '2', '');
INSERT INTO `sc_parm_info` VALUES ('34', '2003', '2003', 'FINCAL_YEAR', '3', '');
INSERT INTO `sc_parm_info` VALUES ('35', '2004', '2004', 'FINCAL_YEAR', '4', '');
INSERT INTO `sc_parm_info` VALUES ('36', '2005', '2005', 'FINCAL_YEAR', '5', '');
INSERT INTO `sc_parm_info` VALUES ('37', '2006', '2006', 'FINCAL_YEAR', '6', '');
INSERT INTO `sc_parm_info` VALUES ('38', '2007', '2007', 'FINCAL_YEAR', '7', '');
INSERT INTO `sc_parm_info` VALUES ('39', '2008', '2008', 'FINCAL_YEAR', '8', '');
INSERT INTO `sc_parm_info` VALUES ('40', '2009', '2009', 'FINCAL_YEAR', '9', '');
INSERT INTO `sc_parm_info` VALUES ('41', '2010', '2010', 'FINCAL_YEAR', '10', '');
INSERT INTO `sc_parm_info` VALUES ('42', '2011', '2011', 'FINCAL_YEAR', '11', '');
INSERT INTO `sc_parm_info` VALUES ('43', '2012', '2012', 'FINCAL_YEAR', '12', '');
INSERT INTO `sc_parm_info` VALUES ('44', '2013', '2013', 'FINCAL_YEAR', '13', '');
INSERT INTO `sc_parm_info` VALUES ('45', '2014', '2014', 'FINCAL_YEAR', '14', '');
INSERT INTO `sc_parm_info` VALUES ('46', '2015', '2015', 'FINCAL_YEAR', '15', '');
INSERT INTO `sc_parm_info` VALUES ('47', '2016', '2016', 'FINCAL_YEAR', '16', '');
INSERT INTO `sc_parm_info` VALUES ('48', '2017', '2017', 'FINCAL_YEAR', '17', '');
INSERT INTO `sc_parm_info` VALUES ('49', '2018', '2018', 'FINCAL_YEAR', '18', '');
INSERT INTO `sc_parm_info` VALUES ('50', '2019', '2019', 'FINCAL_YEAR', '19', '');
INSERT INTO `sc_parm_info` VALUES ('51', '2020', '2020', 'FINCAL_YEAR', '20', '');
INSERT INTO `sc_parm_info` VALUES ('52', '1', '流量', 'HOT_FOUNDATION', '1', '');
INSERT INTO `sc_parm_info` VALUES ('53', '2', '请求次数', 'HOT_FOUNDATION', '2', '');
INSERT INTO `sc_parm_info` VALUES ('54', '1', '运营商', 'ANALYSIS_DIMENSION', '1', '');
INSERT INTO `sc_parm_info` VALUES ('55', '2', '运营商+区域', 'ANALYSIS_DIMENSION', '2', '');
INSERT INTO `sc_parm_info` VALUES ('56', '3', '运营商+系统', 'ANALYSIS_DIMENSION', '3', '');
INSERT INTO `sc_parm_info` VALUES ('57', '4', '运营商+区域+系统', 'ANALYSIS_DIMENSION', '4', '');
INSERT INTO `sc_parm_info` VALUES ('58', '1', '文本输入框', 'XTYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('60', '2', '下拉输入框', 'XTYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('61', '3', '日期输入框', 'XTYPE', '3', '');
INSERT INTO `sc_parm_info` VALUES ('62', '4', '数字输入框', 'XTYPE', '4', '');
INSERT INTO `sc_parm_info` VALUES ('63', '5', '单选输入框', 'XTYPE', '5', '');
INSERT INTO `sc_parm_info` VALUES ('64', '6', '复选输入框', 'XTYPE', '6', '');
INSERT INTO `sc_parm_info` VALUES ('65', '0', '拒收通知', 'NOTICE_ME', '2', '');
INSERT INTO `sc_parm_info` VALUES ('66', '1', '接收通知', 'NOTICE_ME', '1', '');
INSERT INTO `sc_parm_info` VALUES ('67', 'domainCount', '域名数量', 'AN_DIM_FOR_ALLWEBPROVICESOURCE', null, '');
INSERT INTO `sc_parm_info` VALUES ('68', 'urlCount', 'URL数量', 'AN_DIM_FOR_ALLWEBPROVICESOURCE', null, '');
INSERT INTO `sc_parm_info` VALUES ('69', '7', '搜索输入框', 'XTYPE', '7', '');
INSERT INTO `sc_parm_info` VALUES ('74', '8', '树形下拉框', 'XTYPE', '8', '');
INSERT INTO `sc_parm_info` VALUES ('113', 'sum(webSiteNum)', '网站引入数量', 'SELECT_DATA', '1', '');
INSERT INTO `sc_parm_info` VALUES ('114', 'sum(domainNum)', '域名引入数量', 'SELECT_DATA', '2', '');
INSERT INTO `sc_parm_info` VALUES ('115', 'sum(urlNum)', 'URL引入数量', 'SELECT_DATA', '3', '');
INSERT INTO `sc_parm_info` VALUES ('116', 'sum(inRequestNum)', '本网请求次数', 'SELECT_DATA', '4', '');
INSERT INTO `sc_parm_info` VALUES ('117', 'res_time', '响应时间', 'ANALYSIS_DISP_INDICAT', '1', '');
INSERT INTO `sc_parm_info` VALUES ('118', 'res_speed', '响应速度', 'ANALYSIS_DISP_INDICAT', '2', '');
INSERT INTO `sc_parm_info` VALUES ('119', 'dns_search_time', 'DNS查询时间', 'ANALYSIS_DISP_INDICAT', '3', '');
INSERT INTO `sc_parm_info` VALUES ('120', 'build_chain_time', '建链时间', 'ANALYSIS_DISP_INDICAT', '4', '');
INSERT INTO `sc_parm_info` VALUES ('121', 'first_byte_time', '首字节时间', 'ANALYSIS_DISP_INDICAT', '5', '');
INSERT INTO `sc_parm_info` VALUES ('122', 'remain_byte_time', '剩余字节时间', 'ANALYSIS_DISP_INDICAT', '6', '');
INSERT INTO `sc_parm_info` VALUES ('123', 'DNSResolNum', 'DNS解析次数', 'HOT_BASIS_ALL', '1', '');
INSERT INTO `sc_parm_info` VALUES ('130', '1000', '1000', 'TOPN', '3', '');
INSERT INTO `sc_parm_info` VALUES ('133', 'DNSResolNum', 'DNS解析次数', 'HOT_BASIS', '1', '');
INSERT INTO `sc_parm_info` VALUES ('134', 'sum(bigFileNum)', '大文件引入数量', 'SELECT_DATA', '5', '');
INSERT INTO `sc_parm_info` VALUES ('135', 'sum(inCustQuaScore)', '本省用户感知质量', 'SELECT_DATA', '6', '');
INSERT INTO `sc_parm_info` VALUES ('136', '1', '外链', 'ISINNER', '2', '');
INSERT INTO `sc_parm_info` VALUES ('137', '0', '否', 'YES_NO', '2', '');
INSERT INTO `sc_parm_info` VALUES ('138', '1', '运行中', 'OPERATING_STATE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('139', '2', '暂停中', 'OPERATING_STATE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('140', '3', '未启动', 'OPERATING_STATE', '3', '');
INSERT INTO `sc_parm_info` VALUES ('141', '1', 'DPI', 'IF_SYSTEM_TYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('142', '2', 'DNS', 'IF_SYSTEM_TYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('143', '3', 'Cache', 'IF_SYSTEM_TYPE', '3', '');
INSERT INTO `sc_parm_info` VALUES ('144', '4', 'IDC', 'IF_SYSTEM_TYPE', '4', '');
INSERT INTO `sc_parm_info` VALUES ('145', '5', '省级资源管理平台', 'IF_SYSTEM_TYPE', '5', '');
INSERT INTO `sc_parm_info` VALUES ('146', '6', '网站备案库', 'IF_SYSTEM_TYPE', '6', '');
INSERT INTO `sc_parm_info` VALUES ('147', '7', '质量检测系统', 'IF_SYSTEM_TYPE', '7', '');
INSERT INTO `sc_parm_info` VALUES ('148', '8', '智能DNS', 'IF_SYSTEM_TYPE', '8', '');
INSERT INTO `sc_parm_info` VALUES ('149', '1', 'HTTP', 'IF_PROTOCOL_TYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('150', '2', 'FTP', 'IF_PROTOCOL_TYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('151', '1', '未下发', 'ISSUED_STATE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('152', '2', '已下发', 'ISSUED_STATE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('153', '1', '是', 'YES_NO', '2', '');
INSERT INTO `sc_parm_info` VALUES ('154', '0', '内链', 'ISINNER', '1', '');
INSERT INTO `sc_parm_info` VALUES ('155', '9', '爬虫', 'IF_SYSTEM_TYPE', '9', '');
INSERT INTO `sc_parm_info` VALUES ('156', '0', '小于等于0', 'QUASCORE_CHANGE_SECTION', '1', '');
INSERT INTO `sc_parm_info` VALUES ('157', '10', '10', 'QUASCORE_CHANGE_SECTION', '2', '');
INSERT INTO `sc_parm_info` VALUES ('158', '20', '20', 'QUASCORE_CHANGE_SECTION', '3', '');
INSERT INTO `sc_parm_info` VALUES ('159', '30', '30', 'QUASCORE_CHANGE_SECTION', '4', '');
INSERT INTO `sc_parm_info` VALUES ('160', '40', '40', 'QUASCORE_CHANGE_SECTION', '5', '');
INSERT INTO `sc_parm_info` VALUES ('161', '50', '50', 'QUASCORE_CHANGE_SECTION', '6', '');
INSERT INTO `sc_parm_info` VALUES ('162', '60', '60', 'QUASCORE_CHANGE_SECTION', '7', '');
INSERT INTO `sc_parm_info` VALUES ('163', '70', '70', 'QUASCORE_CHANGE_SECTION', '8', '');
INSERT INTO `sc_parm_info` VALUES ('164', '80', '80', 'QUASCORE_CHANGE_SECTION', '9', '');
INSERT INTO `sc_parm_info` VALUES ('165', '90', '90', 'QUASCORE_CHANGE_SECTION', '10', '');
INSERT INTO `sc_parm_info` VALUES ('166', '100', '100', 'QUASCORE_CHANGE_SECTION', '11', '');
INSERT INTO `sc_parm_info` VALUES ('167', '0', '普通', 'SYNFAILUE_TYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('168', '1', '超时', 'SYNFAILUE_TYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('171', '1', '网内IDC有资源出网', 'DOMAIN_DISPATCH_SENCE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('172', '2', '网内Cache有资源出网', 'DOMAIN_DISPATCH_SENCE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('173', '3', '网内对等直连有资源出网', 'DOMAIN_DISPATCH_SENCE', '3', '');
INSERT INTO `sc_parm_info` VALUES ('174', '4', '网内CDN有资源出网', 'DOMAIN_DISPATCH_SENCE', '4', '');
INSERT INTO `sc_parm_info` VALUES ('175', '5', '网内无资源可缓存', 'DOMAIN_DISPATCH_SENCE', '5', '');
INSERT INTO `sc_parm_info` VALUES ('176', '0', '普通资源', 'CRAWLER_TYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('177', '1', '视频资源', 'CRAWLER_TYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('178', '0', '无建议', 'DOMAIN_INTRO_SUG', '1', '');
INSERT INTO `sc_parm_info` VALUES ('179', '1100', 'IDC', 'DOMAIN_INTRO_SUG', '2', '');
INSERT INTO `sc_parm_info` VALUES ('180', '1200', 'Cache', 'DOMAIN_INTRO_SUG', '3', '');
INSERT INTO `sc_parm_info` VALUES ('181', 'outDnsNum', '出网DNS解析次数', 'OUT_BASIS', '3', '');
INSERT INTO `sc_parm_info` VALUES ('182', '11', '1', '1', '1', '11');
INSERT INTO `sc_parm_info` VALUES ('185', '0', '失败', 'RETURN_RESULT', '1', '');
INSERT INTO `sc_parm_info` VALUES ('186', '1', '成功', 'RETURN_RESULT', '2', '');
INSERT INTO `sc_parm_info` VALUES ('189', 'r', '', '', '1', '');
INSERT INTO `sc_parm_info` VALUES ('190', 'haveIDC', '网内IDC有资源出网', 'REPORT_QUA_DISPATCH', '1', '');
INSERT INTO `sc_parm_info` VALUES ('191', 'haveCache', '网内Cache有资源出网', 'REPORT_QUA_DISPATCH', '2', '');
INSERT INTO `sc_parm_info` VALUES ('192', 'haveDirect', '网内直连有资源出网', 'REPORT_QUA_DISPATCH', '3', '');
INSERT INTO `sc_parm_info` VALUES ('193', 'haveCDN', '网内CDN有资源出网', 'REPORT_QUA_DISPATCH', '4', '');
INSERT INTO `sc_parm_info` VALUES ('194', '6', '各省自主上报', 'DOMAIN_DISPATCH_SENCE', '6', '');
INSERT INTO `sc_parm_info` VALUES ('195', '8', '8', 'DIALTEST_HOUR', '1', '');
INSERT INTO `sc_parm_info` VALUES ('196', '9', '9', 'DIALTEST_HOUR', '2', '');
INSERT INTO `sc_parm_info` VALUES ('197', '10', '10', 'DIALTEST_HOUR', '3', '');
INSERT INTO `sc_parm_info` VALUES ('198', '11', '11', 'DIALTEST_HOUR', '4', '');
INSERT INTO `sc_parm_info` VALUES ('199', '12', '12', 'DIALTEST_HOUR', '5', '');
INSERT INTO `sc_parm_info` VALUES ('200', '13', '13', 'DIALTEST_HOUR', '6', '');
INSERT INTO `sc_parm_info` VALUES ('201', '14', '14', 'DIALTEST_HOUR', '7', '');
INSERT INTO `sc_parm_info` VALUES ('202', '15', '15', 'DIALTEST_HOUR', '8', '');
INSERT INTO `sc_parm_info` VALUES ('203', '16', '16', 'DIALTEST_HOUR', '9', '');
INSERT INTO `sc_parm_info` VALUES ('204', '17', '17', 'DIALTEST_HOUR', '10', '');
INSERT INTO `sc_parm_info` VALUES ('205', '18', '18', 'DIALTEST_HOUR', '11', '');
INSERT INTO `sc_parm_info` VALUES ('206', '19', '19', 'DIALTEST_HOUR', '11', '');
INSERT INTO `sc_parm_info` VALUES ('207', '0', '0', 'DIALTEST_MINUTE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('208', '10', '10', 'DIALTEST_MINUTE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('209', '20', '20', 'DIALTEST_MINUTE', '3', '');
INSERT INTO `sc_parm_info` VALUES ('210', '30', '30', 'DIALTEST_MINUTE', '4', '');
INSERT INTO `sc_parm_info` VALUES ('211', '40', '40', 'DIALTEST_MINUTE', '5', '');
INSERT INTO `sc_parm_info` VALUES ('212', '50', '50', 'DIALTEST_MINUTE', '6', '');
INSERT INTO `sc_parm_info` VALUES ('225', '20', '20', 'UNREALTIME_DIALTEST_HOUR', '1', '');
INSERT INTO `sc_parm_info` VALUES ('226', '21', '21', 'UNREALTIME_DIALTEST_HOUR', '2', '');
INSERT INTO `sc_parm_info` VALUES ('227', '22', '22', 'UNREALTIME_DIALTEST_HOUR', '3', '');
INSERT INTO `sc_parm_info` VALUES ('228', '23', '23', 'UNREALTIME_DIALTEST_HOUR', '4', '');
INSERT INTO `sc_parm_info` VALUES ('229', '0', '0', 'UNREALTIME_DIALTEST_HOUR', '5', '');
INSERT INTO `sc_parm_info` VALUES ('230', '1', '1', 'UNREALTIME_DIALTEST_HOUR', '6', '');
INSERT INTO `sc_parm_info` VALUES ('231', '2', '2', 'UNREALTIME_DIALTEST_HOUR', '7', '');
INSERT INTO `sc_parm_info` VALUES ('232', '3', '3', 'UNREALTIME_DIALTEST_HOUR', '8', '');
INSERT INTO `sc_parm_info` VALUES ('233', '4', '4', 'UNREALTIME_DIALTEST_HOUR', '9', '');
INSERT INTO `sc_parm_info` VALUES ('234', '5', '5', 'UNREALTIME_DIALTEST_HOUR', '10', '');
INSERT INTO `sc_parm_info` VALUES ('235', '6', '6', 'UNREALTIME_DIALTEST_HOUR', '11', '');
INSERT INTO `sc_parm_info` VALUES ('236', '7', '7', 'UNREALTIME_DIALTEST_HOUR', '11', '');
INSERT INTO `sc_parm_info` VALUES ('241', 'ddd', 'fff', 'sdfds', '1', '');
INSERT INTO `sc_parm_info` VALUES ('242', 'ddd', 'fff', 'sddf', '1', '');
INSERT INTO `sc_parm_info` VALUES ('243', 'ddd', 'ddd', 'fdsfds', '1', '');
INSERT INTO `sc_parm_info` VALUES ('244', 'bbbb', 'bbbb', 'test', '1', '');
INSERT INTO `sc_parm_info` VALUES ('245', 'ccc', 'ccc', 'test', '2', 'ccc');
INSERT INTO `sc_parm_info` VALUES ('246', '0', '本地', 'BELONG_TYPE', '1', '');
INSERT INTO `sc_parm_info` VALUES ('247', '1', '网内', 'BELONG_TYPE', '2', '');
INSERT INTO `sc_parm_info` VALUES ('248', '2', '网外', 'BELONG_TYPE', '3', '');

-- ----------------------------
-- Table structure for `sc_parm_type`
-- ----------------------------
DROP TABLE IF EXISTS `sc_parm_type`;
CREATE TABLE `sc_parm_type` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `TYPE_CODE` varchar(50) NOT NULL COMMENT '类型代码',
  `TYPE_NAME` varchar(100) NOT NULL COMMENT '类型名称',
  `SYSTEM_SIGN` int(11) DEFAULT NULL COMMENT '是否系统类型',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_PARM_TYPE_IDX` (`TYPE_CODE`),
  KEY `AK_AK_SC_PARM_TYPE` (`TYPE_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_parm_type
-- ----------------------------
INSERT INTO `sc_parm_type` VALUES ('-1', 'BOOLEAN_VALUE', '布尔值', '1');
INSERT INTO `sc_parm_type` VALUES ('1', 'ORG_LEVEL', '机构等级', '1');
INSERT INTO `sc_parm_type` VALUES ('2', 'TIME_MONTH', '月份维度', '1');
INSERT INTO `sc_parm_type` VALUES ('6', 'FINCAL_YEAR', '年度', '1');
INSERT INTO `sc_parm_type` VALUES ('7', 'HOT_FOUNDATION', '热点依据', '1');
INSERT INTO `sc_parm_type` VALUES ('8', 'ANALYSIS_DIMENSION', '分析维度', '1');
INSERT INTO `sc_parm_type` VALUES ('9', 'XTYPE', 'Portal参数类型', '1');
INSERT INTO `sc_parm_type` VALUES ('10', 'NOTICE_ME', 'Portal参数刷新', '1');
INSERT INTO `sc_parm_type` VALUES ('11', 'AN_DIM_FOR_ALLWEBPROVICESOURCE', '全网资源分析维度', '1');
INSERT INTO `sc_parm_type` VALUES ('12', 'HOT_BASIS', '全网热点依据', '1');
INSERT INTO `sc_parm_type` VALUES ('14', 'SELECT_DATA', '资源概览Map参数', '1');
INSERT INTO `sc_parm_type` VALUES ('15', 'ANALYSIS_DISP_INDICAT', '调度分析指标', '1');
INSERT INTO `sc_parm_type` VALUES ('16', 'HOT_BASIS_ALL', '热点依据(名称规范调整后)', '1');
INSERT INTO `sc_parm_type` VALUES ('17', 'TOPN', 'TOPN', '1');
INSERT INTO `sc_parm_type` VALUES ('18', 'YES_NO', '是否指标', '1');
INSERT INTO `sc_parm_type` VALUES ('19', 'OPERATING_STATE', '运行状态', '1');
INSERT INTO `sc_parm_type` VALUES ('20', 'IF_SYSTEM_TYPE', '接口系统类别', '1');
INSERT INTO `sc_parm_type` VALUES ('21', 'IF_PROTOCOL_TYPE', '协议类型', null);
INSERT INTO `sc_parm_type` VALUES ('22', 'ISSUED_STATE', '下发状态', '1');
INSERT INTO `sc_parm_type` VALUES ('23', 'ISINNER', '内、外链', '1');
INSERT INTO `sc_parm_type` VALUES ('24', 'QUASCORE_CHANGE_SECTION', '质量分变化分段', '1');
INSERT INTO `sc_parm_type` VALUES ('25', 'SYNFAILUE_TYPE', '协同失误类型', '1');
INSERT INTO `sc_parm_type` VALUES ('26', 'OUT_BASIS', '出网热点', '1');
INSERT INTO `sc_parm_type` VALUES ('27', 'DOMAIN_DISPATCH_SENCE', '域名调度场景', '1');
INSERT INTO `sc_parm_type` VALUES ('28', 'CRAWLER_TYPE', '爬虫类型', '1');
INSERT INTO `sc_parm_type` VALUES ('29', 'DOMAIN_INTRO_SUG', '域名引入建议', '1');
INSERT INTO `sc_parm_type` VALUES ('36', 'RETURN_RESULT', '返回结果', '1');
INSERT INTO `sc_parm_type` VALUES ('38', 'DIALTEST_HOUR', '实时质量拨测下发小时', '1');
INSERT INTO `sc_parm_type` VALUES ('39', 'DIALTEST_MINUTE', '质量拨测下发分钟', '1');
INSERT INTO `sc_parm_type` VALUES ('40', 'UNREALTIME_DIALTEST_HOUR', '非实时质量拨测下发小时', '1');
INSERT INTO `sc_parm_type` VALUES ('52', 'BELONG_TYPE', '归属类型', '1');

-- ----------------------------
-- Table structure for `sc_portal_parms`
-- ----------------------------
DROP TABLE IF EXISTS `sc_portal_parms`;
CREATE TABLE `sc_portal_parms` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `PORTAL_CODE` varchar(100) DEFAULT NULL COMMENT 'Portal代码',
  `PARM_CODE` varchar(100) DEFAULT NULL COMMENT '参数代码',
  `PARM_NAME` varchar(100) DEFAULT NULL COMMENT '参数中文名',
  `PARM_TYPE` int(11) DEFAULT NULL COMMENT '参数类型',
  `PARM_VALUE` varchar(200) DEFAULT NULL COMMENT '参数默认值',
  `DIC_URL` varchar(200) DEFAULT NULL COMMENT '字典表URL',
  `DIC_DISPLAY_FIELD` varchar(100) DEFAULT NULL COMMENT '字典表展示用字段名',
  `DIC_VALUE_FIELD` varchar(100) DEFAULT NULL COMMENT '字典表数据用字段名',
  `SORT` int(11) DEFAULT NULL COMMENT '排序',
  `DESCRIPTION` varchar(500) DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_HCFG_IDX` (`ID`),
  KEY `AK_SC_HCFG` (`PARM_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=248 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_portal_parms
-- ----------------------------
INSERT INTO `sc_portal_parms` VALUES ('1', 'portalTest', 'webSite', '网站', '8', '省份', 'testRpcActionController.testTreeField', 'text', 'id', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('2', 'portalTest', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('4', 'portalTest', 'selectValue', '待统计数据', '7', '新浪', 'allProvinceResourcesContrastAction.getWebSiteList', 'name', 'name', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('5', 'portalTest', 'parm4', '测试参数4', '3', '2013-04-15', '', '', '', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('6', 'portalTest', 'parm5', '测试参数5', '4', '12313', '', '', '', '5', '');
INSERT INTO `sc_portal_parms` VALUES ('10', 'allRepeatResource', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('11', 'allRepeatResource', 'webSiteType', '网站分类', '8', '', 'webSiteTypeTreeActionController.getTreeField', 'text', 'id', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('12', 'allRepeatResource', 'webSiteName', '网站', '1', '', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('15', 'allProvinceResourcesContrast', 'webSite_ID', '网站', '7', '1', 'allProvinceResourcesContrastAction.getWebSiteList', 'name', 'webSite_ID', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('16', 'webSiteQualityAnalysis', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('17', 'webSiteQualityAnalysis', 'webSiteType', '网站分类', '8', '', 'webSiteTypeTreeActionController.getTreeField', 'text', 'id', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('18', 'webSiteQualityAnalysis', 'webSiteName', '网站', '7', '', 'webSiteQualityAnalysisAction.getWebSiteList', 'name', 'name', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('19', 'webSiteQualityAnalysis', 'topN', '', '4', '1000', '', '', '', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('20', 'webSiteQualityAnalysis', 'hotBasis', 'TOP', '2', '', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('21', 'resourceViewMap', 'selectValue', '类型', '2', 'sum(webSiteNum)', 'parmInfoProvider.do?parmType=SELECT_DATA', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('22', 'resourceViewMap', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('23', 'dispDeffectAnalisys', 'domain', '域名', '7', 'sina.com', 'dispDeffectAction.getDomains', 'name', 'name', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('24', 'dispCorrErrEval', 'provinceName', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('25', 'dispCorrErrEval', 'topN', '', '4', '1000', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('26', 'dispCorrErrEval', 'hotOrderBy', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('27', 'dmNetsiteLibrariesSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('28', 'dmmDispCorrErrEval', 'provinceName', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('29', 'dmmDispCorrErrEval', 'hotOrderBy', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('30', 'dmmDispCorrErrEval', 'topN', '', '4', '1000', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('31', 'dmOutgoingDomainEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('32', 'dmOutgoingDomainEval', 'hotOrderBy', '域名TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('33', 'dmOutgoingDomainEval', 'topN', '', '4', '1000', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('34', 'dmmDispOutgoingDomainEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('35', 'dmmDispOutgoingDomainEval', 'hotOrderBy', '域名TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('36', 'dmmDispOutgoingDomainEval', 'topN', '', '4', '1000', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('41', 'dmDomainBelongEvaluation', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('43', 'dmWebSiteView', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('44', 'dmWebSiteView', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('45', 'webSiteBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('46', 'webSiteBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('47', 'webSiteBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('48', 'dmDomainBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('49', 'dmWebsiteDomainView', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('50', 'dmWebsiteDomainView', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('51', 'dmDomainBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('52', 'dmDomainBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('53', 'dmDomainBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('54', 'dmmDomainBelongEvaluation', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('55', 'dmmDomainBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('56', 'dmmDomainBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('57', 'dmmDomainBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('58', 'dmmDomainBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('59', 'dmDomainDetail', 'webSite', '网站', '1', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('60', 'dmDomainDetail', 'domain', '域名', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('61', 'dmDomainDetail', 'hotOrderBy', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('62', 'dmDomainDetail', 'topN', '', '1', '1000', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('63', 'dmOutgoingBigFileEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('64', 'dmOutgoingBigFileEval', 'hotOrderBy', '大文件TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('65', 'dmOutgoingBigFileEval', 'topN', '', '4', '1000', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('66', 'dmBigFileBelongEvaluation', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('67', 'dmBigFileBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('68', 'dmBigFileBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('69', 'dmBigFileBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('70', 'dmBigFileBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('71', 'dmmWebSiteBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('72', 'dmmWebSiteBelongEvaluation', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('73', 'dmmWebSiteBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('74', 'dmmWebSiteBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('75', 'dmmWebSiteBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('76', 'dmmOutgoingBigFileEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('77', 'dmmOutgoingBigFileEval', 'hotOrderBy', '大文件TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('78', 'dmmOutgoingBigFileEval', 'topN', '', '4', '1000', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('79', 'dmWebsiteProvinceView', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('80', 'dmWebsiteProvinceView', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('81', 'dmDomainView', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('82', 'dmDomainView', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('83', 'webSitePanorama', 'webSiteId', '网站', '7', '1', 'dmNetsiteLibrariesDetailAction.searchWebSiteForGrid', 'name', 'webSiteId', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('84', 'webSiteLibrariesDetail', 'webSiteType', '网站类型', '8', '', 'webSiteTypeTreeActionController.getTreeField', 'text', 'id', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('85', 'webSiteLibrariesDetail', 'webSite', '网站', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('86', 'webSiteLibrariesDetail', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('87', 'webSiteLibrariesDetail', 'topN', '', '4', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('88', 'webSiteLibrariesDetailSecondPlatform', 'webSite', '网站', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('89', 'webSiteLibrariesDetailSecondPlatform', 'webSiteType', '网站类型', '8', '', 'webSiteTypeTreeActionController.getTreeField', 'text', 'id', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('90', 'webSiteLibrariesDetailSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('91', 'webSiteLibrariesDetailSecondPlatform', 'topN', '', '4', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '5', '');
INSERT INTO `sc_portal_parms` VALUES ('93', 'dmBigFileOverview', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('94', 'dmBigFileOverview', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('95', 'dmBigFileResType', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('96', 'dmBigFileResType', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('97', 'dmIDCIntroduceEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('98', 'dmIDCIntroduceEval', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('99', 'dmIDCIntroduceEval', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('100', 'dmIDCIntroduceEval', 'website', '网站', '1', '', '', '', '', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('101', 'dmIDCIntroduceEval', 'websiteType', '网站类型', '8', '', 'ebSiteTypeTreeActionController.getTreeField', 'text', 'id', '5', '');
INSERT INTO `sc_portal_parms` VALUES ('102', 'dmIDCIntroduceEval', 'introduceDepth', 'IDC引入深度<', '1', '', '', '', '', '6', '');
INSERT INTO `sc_portal_parms` VALUES ('103', 'dmIDCIntroduceEval', 'introducePrecision', '% IDC引入精度', '4', '', '', '', '', '8', '');
INSERT INTO `sc_portal_parms` VALUES ('104', 'dmBigfileSizeType', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('105', 'dmBigfileSizeType', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('106', 'dmmBigFileBelongEvaluation', 'hotBasis', 'TOP', '2', 'ReqNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('107', 'dmmBigFileBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('108', 'dmmBigFileBelongEvaluationSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('109', 'dmmBigFileBelongEvaluationSecondPlatform', 'hotBasis', 'TOP', '2', 'ReqNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('110', 'dmmBigFileBelongEvaluationSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('111', 'dmQuaWorseDomainEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('112', 'dmQuaWorseDomainEval', 'hotOrderBy', '域名TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('113', 'dmQuaWorseDomainEval', 'topN', '', '4', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('114', 'dmQuaWorseDomainEval', 'num', '质量分数<', '1', '', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('115', 'dmBigFileOverview', 'resType', '资源类型', '2', '0000', 'systemParmsProvider.do?type=tb_c_w_0101_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('116', 'dmBigFileOverview', 'size', '文件大小', '2', '0000', 'systemParmsProvider.do?type=code_url_size_para_LIST', 'codeLabel', 'codeValue', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('117', 'dmBigfileSizeType', 'resType', '资源类型', '2', '0000', 'systemParmsProvider.do?type=tb_c_w_0101_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('118', 'dmBigfileSizeType', 'protocolType', '协议类型', '2', '0000', 'systemParmsProvider.do?type=tb_url_w_0001_LIST', 'codeLabel', 'codeValue', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('119', 'dmBigFileResType', 'protocolType', '协议类型', '2', '0000', 'systemParmsProvider.do?type=tb_url_w_0001_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('120', 'dmBigFileResType', 'size', '文件大小', '2', '0000', 'systemParmsProvider.do?type=code_url_size_para_LIST', 'codeLabel', 'codeValue', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('121', 'dmBelongEvalOverview', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('122', 'dmBelongEvalOverview', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('123', 'dmBelongEvalOverviewSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('124', 'dmBelongEvalOverviewSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('125', 'dmBelongEvalOverviewSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('126', 'dmmBelongEvalOverview', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('127', 'dmmBelongEvalOverview', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN ', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('128', 'dmmBelongEvalOverviewSecondPlatform', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('129', 'dmmBelongEvalOverviewSecondPlatform', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('130', 'dmmBelongEvalOverviewSecondPlatform', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('131', 'dcDomainResource', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('132', 'dcDomainResource', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('133', 'dcHotDataReport', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('134', 'dcHotDataReport', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('135', 'dcIcprrSiteTopnSystem', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('136', 'dcIcprrSiteTopnSystem', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('137', 'dnslLogSystem', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('138', 'dnslLogSystem', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('139', 'dcCacheBlackWhiteListSetReq', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('140', 'dcCacheBlackWhiteListSetReq', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('141', 'dcCacheContentViewReportReq', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('142', 'dcCacheContentViewReportReq', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('143', 'contentIeadIntoIndicat', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('144', 'contentIeadIntoIndicat', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('145', 'dmmQuaWorseDomainEval', 'hotOrderBy', '域名TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('146', 'dmmQuaWorseDomainEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('147', 'dmmQuaWorseDomainEval', 'topN', '', '4', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('148', 'dmmQuaWorseDomainEval', 'num', '质量分数<', '1', '', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('149', 'dmQualityIndicat', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('150', 'dmQualityIndicat', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('151', 'webSiteBelongEvaluation', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('152', 'webSiteBelongEvaluation', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('153', 'webSiteQualityAnalysis', 'num', '质量分数<', '1', '', '', '', '', '5', '');
INSERT INTO `sc_portal_parms` VALUES ('154', 'dmmWebSiteQualityAnalysis', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('155', 'dmmWebSiteQualityAnalysis', 'webSiteType', '网站分类', '8', '', 'webSiteTypeTreeActionController.getTreeField', 'text', 'id', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('156', 'dmmWebSiteQualityAnalysis', 'webSiteName', '网站', '7', '', 'webSiteQualityAnalysisAction.getWebSiteList', 'name', 'name', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('157', 'dmmWebSiteQualityAnalysis', 'topN', 'TOP', '4', '1000', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('158', 'dmmWebSiteQualityAnalysis', 'hotBasis', '热点依据', '2', '', 'parmInfoProvider.do?parmType=HOT_BASIS', 'parmName', 'parmCode', '4', '');
INSERT INTO `sc_portal_parms` VALUES ('159', 'dmmWebSiteQualityAnalysis', 'num', '质量分数<', '1', '', '', '', '', '5', '');
INSERT INTO `sc_portal_parms` VALUES ('160', 'smDnsRuleResolveIssue', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('161', 'smDnsRuleResolveIssue', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('162', 'dpiSystem', 'Begin', '上报起始日期', '3', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('163', 'dpiSystem', 'Finish', '上报终止日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('164', 'dmWebSiteRepeatResEval', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('165', 'dmQualityEvaluateOverview', 'local', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('166', 'hotEvalOverview', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('167', 'hotEvalOverview', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('168', 'analysisReportHandler', 'webSiteName', '网站', '1', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('169', 'smBigfileCacheViewDetail', 'nodeId', 'cache节点', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('170', 'smBigfileCacheViewDetail', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('171', 'dmUserVisitAnalysisReport', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('172', 'dmUserVisitAnalysisReport', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('173', 'dmUserVisitAnalysisReport', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('174', 'dmResourceFlowAnalysisReport', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('175', 'dmResourceFlowAnalysisReport', 'hotBasis', 'TOP', '2', 'DNSResolNum', 'parmInfoProvider.do?parmType=HOT_BASIS_ALL', 'parmName', 'parmCode', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('176', 'dmResourceFlowAnalysisReport', 'topN', '', '2', '1000', 'parmInfoProvider.do?parmType=TOPN', 'parmName', 'parmCode', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('177', 'portalTest', 'webSiteName', '网站名称', '1', '', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('178', 'dmProvinceUnintroduceHotdomainAnalysis', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('179', 'dmProvinceUnintroduceHotdomainAnalysis', 'domain', '域名', '1', '', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('180', 'dmProvinceUnintroduceHotdomainAnalysis', 'webSite', '网站', '1', '', '', '', '', '3', '');
INSERT INTO `sc_portal_parms` VALUES ('181', 'dmWebSiteView', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('182', 'dmWebsiteProvinceView', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('183', 'dmWebsiteProvinceView', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('185', 'dmDomainView', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('186', 'domainDetail', 'domain', '域名', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('187', 'domainDetail', 'system', '系统', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('188', 'outIpDetail', 'domain', '域名', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('189', 'idcCacheShare', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('190', 'webSiteIntroView', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('191', 'webSiteIntroView', 'webSiteName', '网站', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('192', 'domainIntroView', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('193', 'domainIntroView', 'webSiteName', '网站', '1', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('194', 'domainIntroView', 'domain', '域名', '1', '', '', '', '', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('195', 'idcCacheRepeat', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('199', 'cacheShareExtranetDomainTop100', 'Firm', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('200', 'cacheShareExtranetDomainTop100', 'Query_time', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('201', 'portalTest', 'province', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('202', 'cacheShareExtranetURLTop100', 'Query_time', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('203', 'cacheShareExtranetURLTop100', 'Firm', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('204', 'cacheShareExtranetAllDomain', 'Firm', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('205', 'cacheShareExtranetAllDomain', 'Query_time', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('206', 'extranetRate', 'Firm', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('207', 'extranetRate', 'Query_time', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('208', 'afterExtranetRate', 'Firm', '省份', '2', '', 'systemParmsProvider.do?type=TB_OP_W_0103_LIST&province=true', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('209', 'afterExtranetRate', 'Query_time', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('210', 'dmWebsiteDomainView', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '2', '');
INSERT INTO `sc_portal_parms` VALUES ('211', 'dmDomainView', 'system', '系统', '2', '0000', 'systemParmsProvider.do?type=TB_OP_W_0002_LIST', 'codeLabel', 'codeValue', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('213', 'IDCKeyIndicator', 'bizDate', '日期', '3', '20130909', '', '', '', '0', '');
INSERT INTO `sc_portal_parms` VALUES ('214', 'IDCHotWebsite', 'basis', '热点依据', '2', '', 'parmInfoProvider.do?parmType=HOT_FOUNDATION', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('215', 'IDCHotWebsite', 'bizDate', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('216', 'flowAnalysisAllForUser', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('217', 'IDCOptimizeOffer', 'basis', '热点依据', '2', '', 'parmInfoProvider.do?parmType=HOT_FOUNDATION', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('218', 'IDCOptimizeOffer', 'bizdate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('219', 'flowAnalysisAllForBelong', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('220', 'flowAnalysisAllForApp', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('221', 'flowAnalysisInForUser', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('222', 'flowAnalysisInForBelong', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('223', 'flowAnalysisInForApp', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('224', 'flowAnalysisOutForUser', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('225', 'flowAnalysisOutForBelong', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('226', 'flowAnalysisOutForApp', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('227', 'top10WebsiteAnalysis', 'bizDate', '日期', '3', '', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('228', 'top10WebsiteAnalysis', 'basis', '热点依据', '2', '', 'parmInfoProvider.do?parmType=HOT_FOUNDATION', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('229', 'top10WebsiteAnalysis', 'topNum', 'TOP', '1', '10', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('230', 'top10WebsiteAnalysis', 'belongType', '归属', '2', '0', 'parmInfoProvider.do?parmType=BELONG_TYPE', 'parmName', 'parmCode', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('231', 'P2PcacheEvaluation', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('232', 'P2PcacheOptimization', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('233', 'P2PUserAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('234', 'P2PBelongAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('235', 'HTTPUserAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('236', 'HTTPBelongAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('237', 'HTTPAppAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('238', 'P2PAppAnalysis', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('239', 'flowOptimizationTips', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('240', 'webCacheEvaluation', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('242', 'WebCacheOptimize', 'businessDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('243', 'HTTPOptimizeSuggestion', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('244', 'P2PAnalysisOptimize', 'bizDate', '日期', '3', 'businessDate', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('245', 'systemIntroReport', 'updatedate', 'DNS日志批次', '3', '', '', '', '', null, '');
INSERT INTO `sc_portal_parms` VALUES ('246', 'inwebClickRateReport', 'updatedate', 'DNS日志批次', '3', '20131223', '', '', '', '1', '');
INSERT INTO `sc_portal_parms` VALUES ('247', 'inwebClickRateReport', 'type', '是否含直连', '2', '1', 'parmInfoProvider.do?parmType=BOOLEAN_VALUE', 'parmName', 'parmCode', '0', '2');

-- ----------------------------
-- Table structure for `sc_portal_sty`
-- ----------------------------
DROP TABLE IF EXISTS `sc_portal_sty`;
CREATE TABLE `sc_portal_sty` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `PORTAL_CODE` varchar(100) DEFAULT NULL COMMENT 'Portal代码',
  `PORTAL_TITLE` varchar(500) DEFAULT NULL COMMENT 'Portal标题',
  `COLUMN_COUNT` int(11) DEFAULT NULL COMMENT '列数',
  `CELL_WIDTH` int(11) DEFAULT NULL COMMENT '单元格宽',
  `CELL_HEIGHT` int(11) DEFAULT NULL COMMENT '单元格高',
  `SCROLL_WIDTH` int(11) DEFAULT NULL COMMENT '滚动条宽',
  `PADDING` int(11) DEFAULT NULL COMMENT '边宽',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_HSTY_IDX` (`ID`),
  KEY `AK_SC_HSTY` (`PORTAL_CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_portal_sty
-- ----------------------------
INSERT INTO `sc_portal_sty` VALUES ('1', 'portalTest', 'Portal测试', '3', '300', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('2', 'allProvinceResourcesContrast', '各省网站资源对比', '5', '200', '200', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('3', 'allRepeatResource', '全网重复资源', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('5', 'monitorBoard', '监控面板', '5', '210', '255', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('6', 'websiteBelongs', '网站归属分析', '2', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('7', 'domainBelongs', '域名归属分析', '3', '330', '330', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('8', 'tbDM0004Chart', '质量分析', '2', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('9', 'tbDM0002Chart', '热点域名归属区域分析', '2', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('10', 'tbFsM0001chart', '域名引入考核', '1', '1000', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('11', 'webSiteQualityAnalysis', '网站质量分析', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('12', 'resourceView', '全网资源总览', '4', '200', '400', '1', '20');
INSERT INTO `sc_portal_sty` VALUES ('13', 'dispDeffectAnalisys', '调度效果分析', '4', '250', '200', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('14', 'dispCorrErrEval', '调度纠错评估', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('15', 'dmNetsiteLibrariesSecondPlatform', '网站库概览--二级平台', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('16', 'dmmDispCorrErrEval', '调度纠错评估（移动）', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('17', 'dmOutgoingDomainEval', '出网监测域名评估', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('18', 'testPortal', '测试portal', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('19', 'webSiteBelongEvaluation', '网站归属评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('20', 'dmmDispOutgoingDomainEval', '出网监测域名评估（移动）', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('21', 'dmDomainBelongEvaluation', '域名归属评估', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('22', 'dmWebSiteView', '全网系统网站视图', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('23', 'webSiteBelongEvaluationSecondPlatform', '网站归属评估二级平台', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('24', 'dmWebsiteDomainView', '全网系统域名视图', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('25', 'dmDomainBelongEvaluationSecondPlatform', '域名归属评估二级平台', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('26', 'resourceViewMap', '分省资源总览', '2', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('27', 'dmmDomainBelongEvaluation', '移动域名归属评估', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('28', 'dmmDomainBelongEvaluationSecondPlatform', '移动域名归属评估二级平台', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('29', 'dmDomainDetail', '域名库明细', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('30', 'dmOutgoingBigFileEval', '出网监测大文件评估', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('31', 'dmBigFileBelongEvaluation', '大文件归属评估', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('32', 'dmBigFileBelongEvaluationSecondPlatform', '大文件归属评估二级平台', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('33', 'dmmWebSiteBelongEvaluation', '移动网站归属评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('34', 'dmmWebSiteBelongEvaluationSecondPlatform', '移动网站归属二级平台', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('35', 'dmmOutgoingBigFileEval', '移动出网监测大文件评估', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('36', 'dmmBigFileBelongEvaluation', '移动大文件归属评估', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('37', 'dmmBigFileBelongEvaluationSecondPlatform', '移动大文件归属评估二级平台', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('38', 'dmWebsiteProvinceView', '分省网站视图', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('39', 'dmDomainView', '分省域名视图', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('40', 'webSitePanorama', '网站全景图', '5', '200', '600', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('41', 'webSiteLibrariesDetail', '网站库明细', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('42', 'dmBigFileOverview', '大文件分协议类型概览', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('43', 'webSiteLibrariesDetailSecondPlatform', '网站库明细二级平台', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('44', 'dmBigFileResType', '大文件分资源类型概览', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('45', 'dmIDCIntroduceEval', 'IDC资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('46', 'dmCacheIntroduceEval', 'Cache资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('47', 'dmPDCIntroduceEval', '对等直连资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('48', 'dmCDNIntroduceEval', 'CDN资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('49', 'dmmIDCIntroduceEval', '移动IDC资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('50', 'dmmCacheIntroduceEval', '移动Cache资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('51', 'dmmPDCIntroduceEval', '移动对等直连资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('52', 'dmCDNIntroduceEval', '移动CDN资源引入评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('53', 'dmBigfileSizeType', '大文件分大小概览', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('54', 'dmIpOverview', 'IP地址库总览', '2', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('55', 'rmImportantResOverview', '重要资源库概览', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('56', 'dmQuaWorseDomainEval', '质差监测域名评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('57', 'dmBelongEvalOverview', '归属评估概览', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('58', 'dmBelongEvalOverviewSecondPlatform', '归属评估概览--二级平台', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('59', 'dmmBelongEvalOverview', '移动归属评估概览', '5', '200', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('60', 'dmmBelongEvalOverviewSecondPlatform', '移动归属评估概览--二级平台', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('61', 'dcDomainResource', '域名资源', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('62', 'dcHotDataReport', '热点数据上报', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('63', 'dcIcprrSiteTopnSystem', '网站备案系统', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('64', 'dnslLogSystem', 'DNS日志分析系统', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('65', 'dcCacheBlackWhiteListSetReq', '黑白名单上报请求', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('66', 'dcCacheContentViewReportReq', '热点内容视图上报', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('67', 'contentIeadIntoIndicat', '内容引入指标', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('68', 'dmmQuaWorseDomainEval', '移动质差监测域名评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('69', 'dmQualityIndicat', '服务质量指标', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('70', 'dmmWebSiteQualityAnalysis', '移动网站质量评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('71', 'smDnsRuleResolveIssue', 'DNS解析规则下发', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('72', 'heatMapTest', 'heatMapTest', '4', '250', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('73', 'dpiSystem', 'DPI系统', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('74', 'dmWebSiteRepeatResEval', '省内重复资源评估', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('75', 'hotEvalOverview', '热点评估概览', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('76', 'dmQualityEvaluateOverview', '质量评估概览', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('77', 'dmDispatchOverview', '调度概览', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('78', 'analysisReport', '网站分析报告', '5', '265', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('79', 'smBigfileCacheViewDetail', '同厂家大文件调度', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('80', 'analysisReportHandler', '网站分析报告-网站信息', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('81', 'dmUserVisitAnalysisReport', '用户访问分析报表', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('82', 'dmResourceFlowAnalysisReport', '资源流量分析报表', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('83', 'bigFileSynergy', '大文件协同统计', '4', '250', '400', '1', '0');
INSERT INTO `sc_portal_sty` VALUES ('84', 'bigFileSynFailure', '大文件协同失误明细', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('85', 'resourceViewProvince', '分省资源总览（新）', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('86', 'dmProvinceUnintroduceHotdomainAnalysis', '各省未引入热点域名分析', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('87', 'domainDetail', '域名详细', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('88', 'IDCReport', 'IDC引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('89', 'cacheReport', 'cache引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('90', 'PDNReport', '直连引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('91', 'CDNReport', 'CDN引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('92', 'selfdefineReport', '自定义报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('93', 'provinceIDCReport', '分省IDC引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('94', 'provinceCacheReport', '分省Cache引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('95', 'provincePDCReport', '分省直连引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('96', 'provinceCDNReport', '分省CDN引入报表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('97', 'outIpDetail', '网内无资源缓冲出网IP', '5', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('98', 'baotaTest', 'baotaTest', '3', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('99', 'idcCacheShare', '域名IDC及Cache共享', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('100', 'webSiteIntroView', '各省网站引入视图', '4', '250', '440', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('101', 'domainIntroView', '各省域名引入视图', '4', '250', '440', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('102', 'idcCacheRepeat', 'IDC/Cache排重', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('103', 'resourceTable', '资源总览', '1', '200', '200', '1', '20');
INSERT INTO `sc_portal_sty` VALUES ('104', 'resReportWholeTOP200', 'TOP200全网热点域名网内外解析比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('105', 'resReportProvinceTOP200', 'TOP200分省热点域名网内外解析比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('106', 'resReportAllTOP1000', 'TOP1000全网热点域名网内外解析比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('107', 'resReportProvinceTOP1000', 'TOP1000分省热点域名网内外解析比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('108', 'resReportAllTOP10', ' TOP10全网热点网站点击比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('109', 'resReportProvinceTOP10', 'TOP10分省热点网站点击比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('110', 'resReportAllInOutTOP10', 'TOP10全网热点网站网内外比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('111', 'resReportProvinceInOutTOP10', 'TOP10分省热点网站网内外比例', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('112', 'tt', 'tt', '1', '1', '1', '1', '1');
INSERT INTO `sc_portal_sty` VALUES ('120', 'cacheCollaborativeStatistics', 'Cache协同统计', '0', '270', '420', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('121', 'ipwebisteAearch', 'IP地址反查', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('122', 'cacheShareExtranetDomainTop100', '缓存协同回源TOP域名列表', '2', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('124', 'cacheShareExtranetURLTop100', '缓存协同回源TOPURL列表', '2', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('125', 'cacheShareExtranetAllDomain', '缓存协同回源完整域名+后缀列表', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('126', 'extranetRate', '协同前回源速率', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('127', 'afterExtranetRate', '协同后回源速率', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('128', 'extranetFlow', '协同流量', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('131', 'testing20131129', '1129', '2', '2', '2', '2', '2');
INSERT INTO `sc_portal_sty` VALUES ('140', 'externalLxDispatch', '视频调度查询', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('141', 'externalWsWebSite', '可缓存域名分析', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('142', 'externalWsDomainCache', '缓存域名清单', '4', '250', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('149', 'flowAnalysisAllForUser', '整体流量用户分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('150', 'IDCKeyIndicator', 'IDC关键指标', '1', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('151', 'IDCHotWebsite', 'IDC内热点网站', '1', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('152', 'IDCOptimizeOffer', 'IDC优化建议', '1', '300', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('154', 'otherFlowDistributedForUser', '用户类型中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('156', 'top10WebsiteAnalysis', 'TOP10网站分析', '1', '300', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('157', 'flowAnalysisAllForBelong', '整体流量归属分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('158', 'otherFlowDistributedForBelong', '归属中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('159', 'flowAnalysisAllForApp', '整体流量应用分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('160', 'otherFlowDistributedForApp', '应用中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('161', 'flowAnalysisInForUser', '网内流量用户分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('162', 'flowAnalysisInForBelong', '网内流量归属分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('163', 'flowAnalysisInForApp', '网内流量应用分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('164', 'flowAnalysisOutForUser', '网外流量用户分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('165', 'flowAnalysisOutForBelong', '网外流量归属分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('166', 'flowAnalysisOutForApp', '网外流量应用分析', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('167', 'top10WebsiteAnalysis', 'TOP10网站分析', '1', '500', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('168', 'P2PcacheEvaluation', 'P2Pcache评估', '1', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('169', 'P2PcacheOptimization', 'P2Pcache优化', '1', '300', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('170', 'P2PUserAnalysis', 'P2P分析用户分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('171', 'otherFlowDistributedForBelongIn', '网内归属中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('172', 'otherFlowDistributedForUserIn', '网内用户类型中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('173', 'P2PBelongAnalysis', 'P2P分析归属分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('174', 'otherFlowDistributedForAppIn', '网内应用中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('175', 'HTTPUserAnalysis', 'HTTP用户分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('176', 'otherFlowDistributedForUserOut', '网外用户类型中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('177', 'HTTPBelongAnalysis', 'HTTP归属分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('178', 'HTTPAppAnalysis', 'HTTP应用分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('179', 'otherFlowDistributedForBelongOut', '网外归属中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('180', 'P2PAppAnalysis', 'P2P分析应用分析', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('181', 'otherFlowDistributedForAppOut', ' 网外应用中其他类型流量分布', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('182', 'flowOptimizationTips', '流量流向优化建议', '1', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('183', 'P2POtherDistribution', 'P2P应用分析其他类型分布', '4', '200', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('184', 'webCacheEvaluation', 'WebCache评估', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('185', 'HTTPOptimizeSuggestion', 'HTTP优化建议', '1', '300', '300', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('186', 'WebCacheOptimize', 'WebCache优化', '4', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('188', 'P2PAnalysisOptimize', 'P2P分析优化建议列表', '1', '500', '400', '1', '5');
INSERT INTO `sc_portal_sty` VALUES ('189', 'inwebClickRate', '点击本网率报表', '1', '0', '0', '0', '0');
INSERT INTO `sc_portal_sty` VALUES ('190', 'systemIntroReport', '分系统引入报表', '1', '0', '0', '0', '0');
INSERT INTO `sc_portal_sty` VALUES ('191', 'inwebClickRateReport', '本网点击率报表', '1', '0', '0', '0', '0');
INSERT INTO `sc_portal_sty` VALUES ('192', 'highAppTypeFlow', '高价值应用类型流量分布', '1', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('193', 'middleAppTypeFlow', '中价值应用类型流量明细', '1', '200', '400', '1', '10');
INSERT INTO `sc_portal_sty` VALUES ('194', 'lowAppTypeFlow', '低价值应用类型流量明细', '1', '200', '400', '1', '10');

-- ----------------------------
-- Table structure for `sc_role`
-- ----------------------------
DROP TABLE IF EXISTS `sc_role`;
CREATE TABLE `sc_role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `ROLE_NAME` varchar(30) NOT NULL COMMENT '角色名称',
  `ROLE_ALIAS` varchar(30) DEFAULT NULL COMMENT '角色别名',
  `DESCRIPTION` varchar(50) DEFAULT NULL COMMENT '角色描述',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_ROLE_IDX1` (`ID`),
  KEY `AK_AK_AUTH_ROLE_INFO` (`ROLE_NAME`),
  KEY `SC_ROLE_IDX2` (`ROLE_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_role
-- ----------------------------
INSERT INTO `sc_role` VALUES ('1', 'ROLE_ADMIN', '系统管理员', '系统管理员');
INSERT INTO `sc_role` VALUES ('2', 'ROLE_TEST', '系统测试员', '系统测试员');
INSERT INTO `sc_role` VALUES ('3', 'ROLE_DEVELOP', '系统开发员', '系统开发员');
INSERT INTO `sc_role` VALUES ('4', 'ROLE_GUEST', '访问来宾', '访问来宾');
INSERT INTO `sc_role` VALUES ('5', 'ROLE_ANONYMOUS', '匿名用户', '匿名登录用户');
INSERT INTO `sc_role` VALUES ('6', 'ROLE_USER', '所有用户', '所有用户');
INSERT INTO `sc_role` VALUES ('8', 'ROLE_SHOW', '展示角色', '用于领导展示');
INSERT INTO `sc_role` VALUES ('9', 'ROLE_LWG', '测试', '测试用1');

-- ----------------------------
-- Table structure for `sc_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sc_role_menu`;
CREATE TABLE `sc_role_menu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `ROLE_NAME` varchar(30) NOT NULL COMMENT '角色名称',
  `MENU_ID` int(11) DEFAULT NULL COMMENT '菜单ID',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_ROLE_MENU_IDX` (`ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=38650 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_role_menu
-- ----------------------------
INSERT INTO `sc_role_menu` VALUES ('102', 'ROLE_DEVELOP', '40');
INSERT INTO `sc_role_menu` VALUES ('103', 'ROLE_DEVELOP', '45');
INSERT INTO `sc_role_menu` VALUES ('104', 'ROLE_DEVELOP', '46');
INSERT INTO `sc_role_menu` VALUES ('105', 'ROLE_DEVELOP', '51');
INSERT INTO `sc_role_menu` VALUES ('106', 'ROLE_DEVELOP', null);
INSERT INTO `sc_role_menu` VALUES ('107', 'ROLE_DEVELOP', '53');
INSERT INTO `sc_role_menu` VALUES ('108', 'ROLE_DEVELOP', '59');
INSERT INTO `sc_role_menu` VALUES ('109', 'ROLE_DEVELOP', '84');
INSERT INTO `sc_role_menu` VALUES ('110', 'ROLE_DEVELOP', '172');
INSERT INTO `sc_role_menu` VALUES ('111', 'ROLE_DEVELOP', '88');
INSERT INTO `sc_role_menu` VALUES ('112', 'ROLE_DEVELOP', '89');
INSERT INTO `sc_role_menu` VALUES ('113', 'ROLE_DEVELOP', null);
INSERT INTO `sc_role_menu` VALUES ('114', 'ROLE_DEVELOP', '91');
INSERT INTO `sc_role_menu` VALUES ('115', 'ROLE_DEVELOP', '92');
INSERT INTO `sc_role_menu` VALUES ('116', 'ROLE_DEVELOP', '93');
INSERT INTO `sc_role_menu` VALUES ('256', 'ROLE_ANONYMOUS', '99');
INSERT INTO `sc_role_menu` VALUES ('257', 'ROLE_ANONYMOUS', '100');
INSERT INTO `sc_role_menu` VALUES ('258', 'ROLE_ANONYMOUS', '101');
INSERT INTO `sc_role_menu` VALUES ('259', 'ROLE_ANONYMOUS', '102');
INSERT INTO `sc_role_menu` VALUES ('260', 'ROLE_ANONYMOUS', '103');
INSERT INTO `sc_role_menu` VALUES ('261', 'ROLE_ANONYMOUS', '104');
INSERT INTO `sc_role_menu` VALUES ('262', 'ROLE_ANONYMOUS', '105');
INSERT INTO `sc_role_menu` VALUES ('263', 'ROLE_ANONYMOUS', '106');
INSERT INTO `sc_role_menu` VALUES ('658', 'ROLE_GUEST', '1');
INSERT INTO `sc_role_menu` VALUES ('659', 'ROLE_GUEST', '37');
INSERT INTO `sc_role_menu` VALUES ('660', 'ROLE_GUEST', '41');
INSERT INTO `sc_role_menu` VALUES ('661', 'ROLE_GUEST', '113');
INSERT INTO `sc_role_menu` VALUES ('662', 'ROLE_GUEST', '48');
INSERT INTO `sc_role_menu` VALUES ('663', 'ROLE_GUEST', '50');
INSERT INTO `sc_role_menu` VALUES ('664', 'ROLE_GUEST', '56');
INSERT INTO `sc_role_menu` VALUES ('665', 'ROLE_GUEST', '61');
INSERT INTO `sc_role_menu` VALUES ('666', 'ROLE_GUEST', '57');
INSERT INTO `sc_role_menu` VALUES ('667', 'ROLE_GUEST', '62');
INSERT INTO `sc_role_menu` VALUES ('668', 'ROLE_GUEST', '63');
INSERT INTO `sc_role_menu` VALUES ('669', 'ROLE_GUEST', '58');
INSERT INTO `sc_role_menu` VALUES ('670', 'ROLE_GUEST', '64');
INSERT INTO `sc_role_menu` VALUES ('671', 'ROLE_GUEST', '67');
INSERT INTO `sc_role_menu` VALUES ('672', 'ROLE_GUEST', '133');
INSERT INTO `sc_role_menu` VALUES ('673', 'ROLE_GUEST', '145');
INSERT INTO `sc_role_menu` VALUES ('674', 'ROLE_GUEST', '15');
INSERT INTO `sc_role_menu` VALUES ('675', 'ROLE_GUEST', '16');
INSERT INTO `sc_role_menu` VALUES ('676', 'ROLE_GUEST', '40');
INSERT INTO `sc_role_menu` VALUES ('677', 'ROLE_GUEST', '166');
INSERT INTO `sc_role_menu` VALUES ('678', 'ROLE_GUEST', '59');
INSERT INTO `sc_role_menu` VALUES ('679', 'ROLE_GUEST', '53');
INSERT INTO `sc_role_menu` VALUES ('680', 'ROLE_GUEST', '88');
INSERT INTO `sc_role_menu` VALUES ('681', 'ROLE_GUEST', '84');
INSERT INTO `sc_role_menu` VALUES ('682', 'ROLE_GUEST', '51');
INSERT INTO `sc_role_menu` VALUES ('683', 'ROLE_GUEST', '117');
INSERT INTO `sc_role_menu` VALUES ('684', 'ROLE_GUEST', '89');
INSERT INTO `sc_role_menu` VALUES ('685', 'ROLE_GUEST', '91');
INSERT INTO `sc_role_menu` VALUES ('686', 'ROLE_GUEST', '92');
INSERT INTO `sc_role_menu` VALUES ('687', 'ROLE_GUEST', '93');
INSERT INTO `sc_role_menu` VALUES ('688', 'ROLE_GUEST', '115');
INSERT INTO `sc_role_menu` VALUES ('689', 'ROLE_GUEST', '108');
INSERT INTO `sc_role_menu` VALUES ('690', 'ROLE_GUEST', '196');
INSERT INTO `sc_role_menu` VALUES ('691', 'ROLE_GUEST', '39');
INSERT INTO `sc_role_menu` VALUES ('692', 'ROLE_GUEST', '96');
INSERT INTO `sc_role_menu` VALUES ('693', 'ROLE_GUEST', '168');
INSERT INTO `sc_role_menu` VALUES ('694', 'ROLE_GUEST', '169');
INSERT INTO `sc_role_menu` VALUES ('695', 'ROLE_GUEST', '65');
INSERT INTO `sc_role_menu` VALUES ('696', 'ROLE_GUEST', '32');
INSERT INTO `sc_role_menu` VALUES ('697', 'ROLE_GUEST', '13');
INSERT INTO `sc_role_menu` VALUES ('698', 'ROLE_GUEST', '14');
INSERT INTO `sc_role_menu` VALUES ('699', 'ROLE_GUEST', '17');
INSERT INTO `sc_role_menu` VALUES ('700', 'ROLE_GUEST', '36');
INSERT INTO `sc_role_menu` VALUES ('701', 'ROLE_GUEST', '47');
INSERT INTO `sc_role_menu` VALUES ('702', 'ROLE_GUEST', '68');
INSERT INTO `sc_role_menu` VALUES ('703', 'ROLE_GUEST', '107');
INSERT INTO `sc_role_menu` VALUES ('704', 'ROLE_GUEST', '69');
INSERT INTO `sc_role_menu` VALUES ('705', 'ROLE_GUEST', '71');
INSERT INTO `sc_role_menu` VALUES ('706', 'ROLE_GUEST', '73');
INSERT INTO `sc_role_menu` VALUES ('707', 'ROLE_GUEST', '80');
INSERT INTO `sc_role_menu` VALUES ('708', 'ROLE_GUEST', '70');
INSERT INTO `sc_role_menu` VALUES ('709', 'ROLE_GUEST', '85');
INSERT INTO `sc_role_menu` VALUES ('710', 'ROLE_GUEST', '172');
INSERT INTO `sc_role_menu` VALUES ('711', 'ROLE_GUEST', '72');
INSERT INTO `sc_role_menu` VALUES ('712', 'ROLE_GUEST', '74');
INSERT INTO `sc_role_menu` VALUES ('713', 'ROLE_GUEST', '75');
INSERT INTO `sc_role_menu` VALUES ('714', 'ROLE_GUEST', '76');
INSERT INTO `sc_role_menu` VALUES ('715', 'ROLE_GUEST', '77');
INSERT INTO `sc_role_menu` VALUES ('716', 'ROLE_GUEST', '78');
INSERT INTO `sc_role_menu` VALUES ('717', 'ROLE_GUEST', '79');
INSERT INTO `sc_role_menu` VALUES ('718', 'ROLE_GUEST', '81');
INSERT INTO `sc_role_menu` VALUES ('719', 'ROLE_GUEST', '97');
INSERT INTO `sc_role_menu` VALUES ('720', 'ROLE_GUEST', '100');
INSERT INTO `sc_role_menu` VALUES ('721', 'ROLE_GUEST', '99');
INSERT INTO `sc_role_menu` VALUES ('722', 'ROLE_GUEST', '101');
INSERT INTO `sc_role_menu` VALUES ('723', 'ROLE_GUEST', '102');
INSERT INTO `sc_role_menu` VALUES ('724', 'ROLE_GUEST', '98');
INSERT INTO `sc_role_menu` VALUES ('725', 'ROLE_GUEST', '103');
INSERT INTO `sc_role_menu` VALUES ('726', 'ROLE_GUEST', '104');
INSERT INTO `sc_role_menu` VALUES ('727', 'ROLE_GUEST', '105');
INSERT INTO `sc_role_menu` VALUES ('728', 'ROLE_GUEST', '106');
INSERT INTO `sc_role_menu` VALUES ('729', 'ROLE_GUEST', '33');
INSERT INTO `sc_role_menu` VALUES ('730', 'ROLE_GUEST', '35');
INSERT INTO `sc_role_menu` VALUES ('24110', 'ROLE_TEST', '1');
INSERT INTO `sc_role_menu` VALUES ('24111', 'ROLE_TEST', '37');
INSERT INTO `sc_role_menu` VALUES ('30905', 'ROLE_SHOW', '1');
INSERT INTO `sc_role_menu` VALUES ('30906', 'ROLE_SHOW', '37');
INSERT INTO `sc_role_menu` VALUES ('30907', 'ROLE_SHOW', '373');
INSERT INTO `sc_role_menu` VALUES ('30908', 'ROLE_SHOW', '374');
INSERT INTO `sc_role_menu` VALUES ('30909', 'ROLE_SHOW', '133');
INSERT INTO `sc_role_menu` VALUES ('30910', 'ROLE_SHOW', '134');
INSERT INTO `sc_role_menu` VALUES ('30911', 'ROLE_SHOW', '236');
INSERT INTO `sc_role_menu` VALUES ('30912', 'ROLE_SHOW', '329');
INSERT INTO `sc_role_menu` VALUES ('30913', 'ROLE_SHOW', '357');
INSERT INTO `sc_role_menu` VALUES ('30914', 'ROLE_SHOW', '358');
INSERT INTO `sc_role_menu` VALUES ('30915', 'ROLE_SHOW', '360');
INSERT INTO `sc_role_menu` VALUES ('30916', 'ROLE_SHOW', '369');
INSERT INTO `sc_role_menu` VALUES ('30917', 'ROLE_SHOW', '363');
INSERT INTO `sc_role_menu` VALUES ('30918', 'ROLE_SHOW', '364');
INSERT INTO `sc_role_menu` VALUES ('30919', 'ROLE_SHOW', '361');
INSERT INTO `sc_role_menu` VALUES ('30920', 'ROLE_SHOW', '362');
INSERT INTO `sc_role_menu` VALUES ('30921', 'ROLE_SHOW', '370');
INSERT INTO `sc_role_menu` VALUES ('30922', 'ROLE_SHOW', '365');
INSERT INTO `sc_role_menu` VALUES ('30923', 'ROLE_SHOW', '366');
INSERT INTO `sc_role_menu` VALUES ('30924', 'ROLE_SHOW', '371');
INSERT INTO `sc_role_menu` VALUES ('30925', 'ROLE_SHOW', '367');
INSERT INTO `sc_role_menu` VALUES ('30926', 'ROLE_SHOW', '368');
INSERT INTO `sc_role_menu` VALUES ('30927', 'ROLE_SHOW', '333');
INSERT INTO `sc_role_menu` VALUES ('30928', 'ROLE_SHOW', '334');
INSERT INTO `sc_role_menu` VALUES ('30929', 'ROLE_SHOW', '338');
INSERT INTO `sc_role_menu` VALUES ('30930', 'ROLE_SHOW', '339');
INSERT INTO `sc_role_menu` VALUES ('30931', 'ROLE_SHOW', '340');
INSERT INTO `sc_role_menu` VALUES ('30932', 'ROLE_SHOW', '395');
INSERT INTO `sc_role_menu` VALUES ('30933', 'ROLE_SHOW', '398');
INSERT INTO `sc_role_menu` VALUES ('30934', 'ROLE_SHOW', '405');
INSERT INTO `sc_role_menu` VALUES ('30935', 'ROLE_SHOW', '406');
INSERT INTO `sc_role_menu` VALUES ('30936', 'ROLE_SHOW', '336');
INSERT INTO `sc_role_menu` VALUES ('30937', 'ROLE_SHOW', '337');
INSERT INTO `sc_role_menu` VALUES ('30938', 'ROLE_SHOW', '342');
INSERT INTO `sc_role_menu` VALUES ('30939', 'ROLE_SHOW', '343');
INSERT INTO `sc_role_menu` VALUES ('30940', 'ROLE_SHOW', '344');
INSERT INTO `sc_role_menu` VALUES ('30941', 'ROLE_SHOW', '396');
INSERT INTO `sc_role_menu` VALUES ('30942', 'ROLE_SHOW', '399');
INSERT INTO `sc_role_menu` VALUES ('30943', 'ROLE_SHOW', '407');
INSERT INTO `sc_role_menu` VALUES ('30944', 'ROLE_SHOW', '408');
INSERT INTO `sc_role_menu` VALUES ('30945', 'ROLE_SHOW', '382');
INSERT INTO `sc_role_menu` VALUES ('30946', 'ROLE_SHOW', '141');
INSERT INTO `sc_role_menu` VALUES ('30947', 'ROLE_SHOW', '327');
INSERT INTO `sc_role_menu` VALUES ('30948', 'ROLE_SHOW', '149');
INSERT INTO `sc_role_menu` VALUES ('30949', 'ROLE_SHOW', '377');
INSERT INTO `sc_role_menu` VALUES ('30950', 'ROLE_SHOW', '152');
INSERT INTO `sc_role_menu` VALUES ('30951', 'ROLE_SHOW', '40');
INSERT INTO `sc_role_menu` VALUES ('30952', 'ROLE_SHOW', '156');
INSERT INTO `sc_role_menu` VALUES ('30953', 'ROLE_SHOW', '186');
INSERT INTO `sc_role_menu` VALUES ('30954', 'ROLE_SHOW', '389');
INSERT INTO `sc_role_menu` VALUES ('30955', 'ROLE_SHOW', '390');
INSERT INTO `sc_role_menu` VALUES ('30956', 'ROLE_SHOW', '391');
INSERT INTO `sc_role_menu` VALUES ('30957', 'ROLE_SHOW', '392');
INSERT INTO `sc_role_menu` VALUES ('30958', 'ROLE_SHOW', '393');
INSERT INTO `sc_role_menu` VALUES ('30959', 'ROLE_SHOW', '394');
INSERT INTO `sc_role_menu` VALUES ('30960', 'ROLE_SHOW', '187');
INSERT INTO `sc_role_menu` VALUES ('30961', 'ROLE_SHOW', '229');
INSERT INTO `sc_role_menu` VALUES ('30962', 'ROLE_SHOW', '284');
INSERT INTO `sc_role_menu` VALUES ('30963', 'ROLE_SHOW', '230');
INSERT INTO `sc_role_menu` VALUES ('30964', 'ROLE_SHOW', '231');
INSERT INTO `sc_role_menu` VALUES ('30965', 'ROLE_SHOW', '117');
INSERT INTO `sc_role_menu` VALUES ('30966', 'ROLE_SHOW', '262');
INSERT INTO `sc_role_menu` VALUES ('30967', 'ROLE_SHOW', '263');
INSERT INTO `sc_role_menu` VALUES ('30968', 'ROLE_SHOW', '264');
INSERT INTO `sc_role_menu` VALUES ('30969', 'ROLE_SHOW', '265');
INSERT INTO `sc_role_menu` VALUES ('30970', 'ROLE_SHOW', '116');
INSERT INTO `sc_role_menu` VALUES ('30971', 'ROLE_SHOW', '316');
INSERT INTO `sc_role_menu` VALUES ('30972', 'ROLE_SHOW', '191');
INSERT INTO `sc_role_menu` VALUES ('30973', 'ROLE_SHOW', '198');
INSERT INTO `sc_role_menu` VALUES ('30974', 'ROLE_SHOW', '159');
INSERT INTO `sc_role_menu` VALUES ('30975', 'ROLE_SHOW', '277');
INSERT INTO `sc_role_menu` VALUES ('30976', 'ROLE_SHOW', '226');
INSERT INTO `sc_role_menu` VALUES ('30977', 'ROLE_SHOW', '213');
INSERT INTO `sc_role_menu` VALUES ('30978', 'ROLE_SHOW', '318');
INSERT INTO `sc_role_menu` VALUES ('30979', 'ROLE_SHOW', '321');
INSERT INTO `sc_role_menu` VALUES ('30980', 'ROLE_SHOW', '196');
INSERT INTO `sc_role_menu` VALUES ('30981', 'ROLE_SHOW', '387');
INSERT INTO `sc_role_menu` VALUES ('30982', 'ROLE_SHOW', '317');
INSERT INTO `sc_role_menu` VALUES ('30983', 'ROLE_SHOW', '383');
INSERT INTO `sc_role_menu` VALUES ('30984', 'ROLE_SHOW', '353');
INSERT INTO `sc_role_menu` VALUES ('30985', 'ROLE_SHOW', '354');
INSERT INTO `sc_role_menu` VALUES ('30986', 'ROLE_SHOW', '306');
INSERT INTO `sc_role_menu` VALUES ('30987', 'ROLE_SHOW', '273');
INSERT INTO `sc_role_menu` VALUES ('30988', 'ROLE_SHOW', '331');
INSERT INTO `sc_role_menu` VALUES ('30989', 'ROLE_SHOW', '349');
INSERT INTO `sc_role_menu` VALUES ('30990', 'ROLE_SHOW', '335');
INSERT INTO `sc_role_menu` VALUES ('30991', 'ROLE_SHOW', '345');
INSERT INTO `sc_role_menu` VALUES ('30992', 'ROLE_SHOW', '346');
INSERT INTO `sc_role_menu` VALUES ('30993', 'ROLE_SHOW', '347');
INSERT INTO `sc_role_menu` VALUES ('30994', 'ROLE_SHOW', '348');
INSERT INTO `sc_role_menu` VALUES ('30995', 'ROLE_SHOW', '384');
INSERT INTO `sc_role_menu` VALUES ('30996', 'ROLE_SHOW', '376');
INSERT INTO `sc_role_menu` VALUES ('30997', 'ROLE_SHOW', '372');
INSERT INTO `sc_role_menu` VALUES ('30998', 'ROLE_SHOW', '359');
INSERT INTO `sc_role_menu` VALUES ('30999', 'ROLE_SHOW', '356');
INSERT INTO `sc_role_menu` VALUES ('31000', 'ROLE_SHOW', '325');
INSERT INTO `sc_role_menu` VALUES ('31001', 'ROLE_SHOW', '375');
INSERT INTO `sc_role_menu` VALUES ('31002', 'ROLE_SHOW', '2');
INSERT INTO `sc_role_menu` VALUES ('31003', 'ROLE_SHOW', '6');
INSERT INTO `sc_role_menu` VALUES ('31004', 'ROLE_SHOW', '7');
INSERT INTO `sc_role_menu` VALUES ('31005', 'ROLE_SHOW', '8');
INSERT INTO `sc_role_menu` VALUES ('31006', 'ROLE_SHOW', '19');
INSERT INTO `sc_role_menu` VALUES ('31007', 'ROLE_SHOW', '203');
INSERT INTO `sc_role_menu` VALUES ('31008', 'ROLE_SHOW', '274');
INSERT INTO `sc_role_menu` VALUES ('31009', 'ROLE_SHOW', '9');
INSERT INTO `sc_role_menu` VALUES ('31010', 'ROLE_SHOW', '10');
INSERT INTO `sc_role_menu` VALUES ('31011', 'ROLE_SHOW', '11');
INSERT INTO `sc_role_menu` VALUES ('31012', 'ROLE_SHOW', '12');
INSERT INTO `sc_role_menu` VALUES ('31013', 'ROLE_SHOW', '42');
INSERT INTO `sc_role_menu` VALUES ('31014', 'ROLE_SHOW', '43');
INSERT INTO `sc_role_menu` VALUES ('31015', 'ROLE_SHOW', '44');
INSERT INTO `sc_role_menu` VALUES ('31016', 'ROLE_SHOW', '154');
INSERT INTO `sc_role_menu` VALUES ('31017', 'ROLE_SHOW', '310');
INSERT INTO `sc_role_menu` VALUES ('31018', 'ROLE_SHOW', '311');
INSERT INTO `sc_role_menu` VALUES ('31019', 'ROLE_SHOW', '351');
INSERT INTO `sc_role_menu` VALUES ('31020', 'ROLE_SHOW', '3');
INSERT INTO `sc_role_menu` VALUES ('31021', 'ROLE_SHOW', '4');
INSERT INTO `sc_role_menu` VALUES ('31022', 'ROLE_SHOW', '5');
INSERT INTO `sc_role_menu` VALUES ('31023', 'ROLE_SHOW', '30');
INSERT INTO `sc_role_menu` VALUES ('31024', 'ROLE_SHOW', '31');
INSERT INTO `sc_role_menu` VALUES ('31025', 'ROLE_SHOW', '49');
INSERT INTO `sc_role_menu` VALUES ('38387', 'ROLE_ADMIN', '1');
INSERT INTO `sc_role_menu` VALUES ('38388', 'ROLE_ADMIN', '37');
INSERT INTO `sc_role_menu` VALUES ('38389', 'ROLE_ADMIN', '373');
INSERT INTO `sc_role_menu` VALUES ('38390', 'ROLE_ADMIN', '374');
INSERT INTO `sc_role_menu` VALUES ('38391', 'ROLE_ADMIN', '133');
INSERT INTO `sc_role_menu` VALUES ('38392', 'ROLE_ADMIN', '134');
INSERT INTO `sc_role_menu` VALUES ('38393', 'ROLE_ADMIN', '236');
INSERT INTO `sc_role_menu` VALUES ('38394', 'ROLE_ADMIN', '329');
INSERT INTO `sc_role_menu` VALUES ('38395', 'ROLE_ADMIN', '357');
INSERT INTO `sc_role_menu` VALUES ('38396', 'ROLE_ADMIN', '358');
INSERT INTO `sc_role_menu` VALUES ('38397', 'ROLE_ADMIN', '360');
INSERT INTO `sc_role_menu` VALUES ('38398', 'ROLE_ADMIN', '476');
INSERT INTO `sc_role_menu` VALUES ('38399', 'ROLE_ADMIN', '369');
INSERT INTO `sc_role_menu` VALUES ('38400', 'ROLE_ADMIN', '363');
INSERT INTO `sc_role_menu` VALUES ('38401', 'ROLE_ADMIN', '364');
INSERT INTO `sc_role_menu` VALUES ('38402', 'ROLE_ADMIN', '361');
INSERT INTO `sc_role_menu` VALUES ('38403', 'ROLE_ADMIN', '362');
INSERT INTO `sc_role_menu` VALUES ('38404', 'ROLE_ADMIN', '470');
INSERT INTO `sc_role_menu` VALUES ('38405', 'ROLE_ADMIN', '471');
INSERT INTO `sc_role_menu` VALUES ('38406', 'ROLE_ADMIN', '472');
INSERT INTO `sc_role_menu` VALUES ('38407', 'ROLE_ADMIN', '473');
INSERT INTO `sc_role_menu` VALUES ('38408', 'ROLE_ADMIN', '474');
INSERT INTO `sc_role_menu` VALUES ('38409', 'ROLE_ADMIN', '370');
INSERT INTO `sc_role_menu` VALUES ('38410', 'ROLE_ADMIN', '365');
INSERT INTO `sc_role_menu` VALUES ('38411', 'ROLE_ADMIN', '366');
INSERT INTO `sc_role_menu` VALUES ('38412', 'ROLE_ADMIN', '371');
INSERT INTO `sc_role_menu` VALUES ('38413', 'ROLE_ADMIN', '367');
INSERT INTO `sc_role_menu` VALUES ('38414', 'ROLE_ADMIN', '368');
INSERT INTO `sc_role_menu` VALUES ('38415', 'ROLE_ADMIN', '333');
INSERT INTO `sc_role_menu` VALUES ('38416', 'ROLE_ADMIN', '334');
INSERT INTO `sc_role_menu` VALUES ('38417', 'ROLE_ADMIN', '338');
INSERT INTO `sc_role_menu` VALUES ('38418', 'ROLE_ADMIN', '339');
INSERT INTO `sc_role_menu` VALUES ('38419', 'ROLE_ADMIN', '340');
INSERT INTO `sc_role_menu` VALUES ('38420', 'ROLE_ADMIN', '341');
INSERT INTO `sc_role_menu` VALUES ('38421', 'ROLE_ADMIN', '395');
INSERT INTO `sc_role_menu` VALUES ('38422', 'ROLE_ADMIN', '398');
INSERT INTO `sc_role_menu` VALUES ('38423', 'ROLE_ADMIN', '405');
INSERT INTO `sc_role_menu` VALUES ('38424', 'ROLE_ADMIN', '406');
INSERT INTO `sc_role_menu` VALUES ('38425', 'ROLE_ADMIN', '336');
INSERT INTO `sc_role_menu` VALUES ('38426', 'ROLE_ADMIN', '337');
INSERT INTO `sc_role_menu` VALUES ('38427', 'ROLE_ADMIN', '342');
INSERT INTO `sc_role_menu` VALUES ('38428', 'ROLE_ADMIN', '343');
INSERT INTO `sc_role_menu` VALUES ('38429', 'ROLE_ADMIN', '344');
INSERT INTO `sc_role_menu` VALUES ('38430', 'ROLE_ADMIN', '396');
INSERT INTO `sc_role_menu` VALUES ('38431', 'ROLE_ADMIN', '399');
INSERT INTO `sc_role_menu` VALUES ('38432', 'ROLE_ADMIN', '407');
INSERT INTO `sc_role_menu` VALUES ('38433', 'ROLE_ADMIN', '408');
INSERT INTO `sc_role_menu` VALUES ('38434', 'ROLE_ADMIN', '382');
INSERT INTO `sc_role_menu` VALUES ('38435', 'ROLE_ADMIN', '141');
INSERT INTO `sc_role_menu` VALUES ('38436', 'ROLE_ADMIN', '327');
INSERT INTO `sc_role_menu` VALUES ('38437', 'ROLE_ADMIN', '149');
INSERT INTO `sc_role_menu` VALUES ('38438', 'ROLE_ADMIN', '377');
INSERT INTO `sc_role_menu` VALUES ('38439', 'ROLE_ADMIN', '152');
INSERT INTO `sc_role_menu` VALUES ('38440', 'ROLE_ADMIN', '135');
INSERT INTO `sc_role_menu` VALUES ('38441', 'ROLE_ADMIN', '136');
INSERT INTO `sc_role_menu` VALUES ('38442', 'ROLE_ADMIN', '214');
INSERT INTO `sc_role_menu` VALUES ('38443', 'ROLE_ADMIN', '258');
INSERT INTO `sc_role_menu` VALUES ('38444', 'ROLE_ADMIN', '260');
INSERT INTO `sc_role_menu` VALUES ('38445', 'ROLE_ADMIN', '251');
INSERT INTO `sc_role_menu` VALUES ('38446', 'ROLE_ADMIN', '232');
INSERT INTO `sc_role_menu` VALUES ('38447', 'ROLE_ADMIN', '142');
INSERT INTO `sc_role_menu` VALUES ('38448', 'ROLE_ADMIN', '163');
INSERT INTO `sc_role_menu` VALUES ('38449', 'ROLE_ADMIN', '252');
INSERT INTO `sc_role_menu` VALUES ('38450', 'ROLE_ADMIN', '234');
INSERT INTO `sc_role_menu` VALUES ('38451', 'ROLE_ADMIN', '241');
INSERT INTO `sc_role_menu` VALUES ('38452', 'ROLE_ADMIN', '145');
INSERT INTO `sc_role_menu` VALUES ('38453', 'ROLE_ADMIN', '259');
INSERT INTO `sc_role_menu` VALUES ('38454', 'ROLE_ADMIN', '261');
INSERT INTO `sc_role_menu` VALUES ('38455', 'ROLE_ADMIN', '268');
INSERT INTO `sc_role_menu` VALUES ('38456', 'ROLE_ADMIN', '201');
INSERT INTO `sc_role_menu` VALUES ('38457', 'ROLE_ADMIN', '147');
INSERT INTO `sc_role_menu` VALUES ('38458', 'ROLE_ADMIN', '150');
INSERT INTO `sc_role_menu` VALUES ('38459', 'ROLE_ADMIN', '275');
INSERT INTO `sc_role_menu` VALUES ('38460', 'ROLE_ADMIN', '151');
INSERT INTO `sc_role_menu` VALUES ('38461', 'ROLE_ADMIN', '276');
INSERT INTO `sc_role_menu` VALUES ('38462', 'ROLE_ADMIN', '64');
INSERT INTO `sc_role_menu` VALUES ('38463', 'ROLE_ADMIN', '434');
INSERT INTO `sc_role_menu` VALUES ('38464', 'ROLE_ADMIN', '435');
INSERT INTO `sc_role_menu` VALUES ('38465', 'ROLE_ADMIN', '436');
INSERT INTO `sc_role_menu` VALUES ('38466', 'ROLE_ADMIN', '437');
INSERT INTO `sc_role_menu` VALUES ('38467', 'ROLE_ADMIN', '457');
INSERT INTO `sc_role_menu` VALUES ('38468', 'ROLE_ADMIN', '438');
INSERT INTO `sc_role_menu` VALUES ('38469', 'ROLE_ADMIN', '439');
INSERT INTO `sc_role_menu` VALUES ('38470', 'ROLE_ADMIN', '440');
INSERT INTO `sc_role_menu` VALUES ('38471', 'ROLE_ADMIN', '442');
INSERT INTO `sc_role_menu` VALUES ('38472', 'ROLE_ADMIN', '445');
INSERT INTO `sc_role_menu` VALUES ('38473', 'ROLE_ADMIN', '446');
INSERT INTO `sc_role_menu` VALUES ('38474', 'ROLE_ADMIN', '443');
INSERT INTO `sc_role_menu` VALUES ('38475', 'ROLE_ADMIN', '447');
INSERT INTO `sc_role_menu` VALUES ('38476', 'ROLE_ADMIN', '448');
INSERT INTO `sc_role_menu` VALUES ('38477', 'ROLE_ADMIN', '444');
INSERT INTO `sc_role_menu` VALUES ('38478', 'ROLE_ADMIN', '449');
INSERT INTO `sc_role_menu` VALUES ('38479', 'ROLE_ADMIN', '450');
INSERT INTO `sc_role_menu` VALUES ('38480', 'ROLE_ADMIN', '411');
INSERT INTO `sc_role_menu` VALUES ('38481', 'ROLE_ADMIN', '412');
INSERT INTO `sc_role_menu` VALUES ('38482', 'ROLE_ADMIN', '415');
INSERT INTO `sc_role_menu` VALUES ('38483', 'ROLE_ADMIN', '416');
INSERT INTO `sc_role_menu` VALUES ('38484', 'ROLE_ADMIN', '417');
INSERT INTO `sc_role_menu` VALUES ('38485', 'ROLE_ADMIN', '418');
INSERT INTO `sc_role_menu` VALUES ('38486', 'ROLE_ADMIN', '424');
INSERT INTO `sc_role_menu` VALUES ('38487', 'ROLE_ADMIN', '427');
INSERT INTO `sc_role_menu` VALUES ('38488', 'ROLE_ADMIN', '428');
INSERT INTO `sc_role_menu` VALUES ('38489', 'ROLE_ADMIN', '429');
INSERT INTO `sc_role_menu` VALUES ('38490', 'ROLE_ADMIN', '425');
INSERT INTO `sc_role_menu` VALUES ('38491', 'ROLE_ADMIN', '430');
INSERT INTO `sc_role_menu` VALUES ('38492', 'ROLE_ADMIN', '431');
INSERT INTO `sc_role_menu` VALUES ('38493', 'ROLE_ADMIN', '432');
INSERT INTO `sc_role_menu` VALUES ('38494', 'ROLE_ADMIN', '426');
INSERT INTO `sc_role_menu` VALUES ('38495', 'ROLE_ADMIN', '413');
INSERT INTO `sc_role_menu` VALUES ('38496', 'ROLE_ADMIN', '453');
INSERT INTO `sc_role_menu` VALUES ('38497', 'ROLE_ADMIN', '455');
INSERT INTO `sc_role_menu` VALUES ('38498', 'ROLE_ADMIN', '456');
INSERT INTO `sc_role_menu` VALUES ('38499', 'ROLE_ADMIN', '461');
INSERT INTO `sc_role_menu` VALUES ('38500', 'ROLE_ADMIN', '465');
INSERT INTO `sc_role_menu` VALUES ('38501', 'ROLE_ADMIN', '454');
INSERT INTO `sc_role_menu` VALUES ('38502', 'ROLE_ADMIN', '458');
INSERT INTO `sc_role_menu` VALUES ('38503', 'ROLE_ADMIN', '459');
INSERT INTO `sc_role_menu` VALUES ('38504', 'ROLE_ADMIN', '460');
INSERT INTO `sc_role_menu` VALUES ('38505', 'ROLE_ADMIN', '464');
INSERT INTO `sc_role_menu` VALUES ('38506', 'ROLE_ADMIN', '433');
INSERT INTO `sc_role_menu` VALUES ('38507', 'ROLE_ADMIN', '414');
INSERT INTO `sc_role_menu` VALUES ('38508', 'ROLE_ADMIN', '419');
INSERT INTO `sc_role_menu` VALUES ('38509', 'ROLE_ADMIN', '421');
INSERT INTO `sc_role_menu` VALUES ('38510', 'ROLE_ADMIN', '422');
INSERT INTO `sc_role_menu` VALUES ('38511', 'ROLE_ADMIN', '423');
INSERT INTO `sc_role_menu` VALUES ('38512', 'ROLE_ADMIN', '420');
INSERT INTO `sc_role_menu` VALUES ('38513', 'ROLE_ADMIN', '451');
INSERT INTO `sc_role_menu` VALUES ('38514', 'ROLE_ADMIN', '452');
INSERT INTO `sc_role_menu` VALUES ('38515', 'ROLE_ADMIN', '462');
INSERT INTO `sc_role_menu` VALUES ('38516', 'ROLE_ADMIN', '463');
INSERT INTO `sc_role_menu` VALUES ('38517', 'ROLE_ADMIN', '466');
INSERT INTO `sc_role_menu` VALUES ('38518', 'ROLE_ADMIN', '467');
INSERT INTO `sc_role_menu` VALUES ('38519', 'ROLE_ADMIN', '468');
INSERT INTO `sc_role_menu` VALUES ('38520', 'ROLE_ADMIN', '469');
INSERT INTO `sc_role_menu` VALUES ('38521', 'ROLE_ADMIN', '40');
INSERT INTO `sc_role_menu` VALUES ('38522', 'ROLE_ADMIN', '156');
INSERT INTO `sc_role_menu` VALUES ('38523', 'ROLE_ADMIN', '186');
INSERT INTO `sc_role_menu` VALUES ('38524', 'ROLE_ADMIN', '389');
INSERT INTO `sc_role_menu` VALUES ('38525', 'ROLE_ADMIN', '390');
INSERT INTO `sc_role_menu` VALUES ('38526', 'ROLE_ADMIN', '391');
INSERT INTO `sc_role_menu` VALUES ('38527', 'ROLE_ADMIN', '392');
INSERT INTO `sc_role_menu` VALUES ('38528', 'ROLE_ADMIN', '393');
INSERT INTO `sc_role_menu` VALUES ('38529', 'ROLE_ADMIN', '394');
INSERT INTO `sc_role_menu` VALUES ('38530', 'ROLE_ADMIN', '187');
INSERT INTO `sc_role_menu` VALUES ('38531', 'ROLE_ADMIN', '315');
INSERT INTO `sc_role_menu` VALUES ('38532', 'ROLE_ADMIN', '188');
INSERT INTO `sc_role_menu` VALUES ('38533', 'ROLE_ADMIN', '229');
INSERT INTO `sc_role_menu` VALUES ('38534', 'ROLE_ADMIN', '284');
INSERT INTO `sc_role_menu` VALUES ('38535', 'ROLE_ADMIN', '230');
INSERT INTO `sc_role_menu` VALUES ('38536', 'ROLE_ADMIN', '231');
INSERT INTO `sc_role_menu` VALUES ('38537', 'ROLE_ADMIN', '285');
INSERT INTO `sc_role_menu` VALUES ('38538', 'ROLE_ADMIN', '313');
INSERT INTO `sc_role_menu` VALUES ('38539', 'ROLE_ADMIN', '233');
INSERT INTO `sc_role_menu` VALUES ('38540', 'ROLE_ADMIN', '235');
INSERT INTO `sc_role_menu` VALUES ('38541', 'ROLE_ADMIN', '244');
INSERT INTO `sc_role_menu` VALUES ('38542', 'ROLE_ADMIN', '245');
INSERT INTO `sc_role_menu` VALUES ('38543', 'ROLE_ADMIN', '243');
INSERT INTO `sc_role_menu` VALUES ('38544', 'ROLE_ADMIN', '117');
INSERT INTO `sc_role_menu` VALUES ('38545', 'ROLE_ADMIN', '262');
INSERT INTO `sc_role_menu` VALUES ('38546', 'ROLE_ADMIN', '263');
INSERT INTO `sc_role_menu` VALUES ('38547', 'ROLE_ADMIN', '264');
INSERT INTO `sc_role_menu` VALUES ('38548', 'ROLE_ADMIN', '265');
INSERT INTO `sc_role_menu` VALUES ('38549', 'ROLE_ADMIN', '330');
INSERT INTO `sc_role_menu` VALUES ('38550', 'ROLE_ADMIN', '116');
INSERT INTO `sc_role_menu` VALUES ('38551', 'ROLE_ADMIN', '51');
INSERT INTO `sc_role_menu` VALUES ('38552', 'ROLE_ADMIN', '316');
INSERT INTO `sc_role_menu` VALUES ('38553', 'ROLE_ADMIN', '191');
INSERT INTO `sc_role_menu` VALUES ('38554', 'ROLE_ADMIN', '198');
INSERT INTO `sc_role_menu` VALUES ('38555', 'ROLE_ADMIN', '159');
INSERT INTO `sc_role_menu` VALUES ('38556', 'ROLE_ADMIN', '277');
INSERT INTO `sc_role_menu` VALUES ('38557', 'ROLE_ADMIN', '226');
INSERT INTO `sc_role_menu` VALUES ('38558', 'ROLE_ADMIN', '213');
INSERT INTO `sc_role_menu` VALUES ('38559', 'ROLE_ADMIN', '242');
INSERT INTO `sc_role_menu` VALUES ('38560', 'ROLE_ADMIN', '318');
INSERT INTO `sc_role_menu` VALUES ('38561', 'ROLE_ADMIN', '321');
INSERT INTO `sc_role_menu` VALUES ('38562', 'ROLE_ADMIN', '166');
INSERT INTO `sc_role_menu` VALUES ('38563', 'ROLE_ADMIN', '59');
INSERT INTO `sc_role_menu` VALUES ('38564', 'ROLE_ADMIN', '160');
INSERT INTO `sc_role_menu` VALUES ('38565', 'ROLE_ADMIN', '53');
INSERT INTO `sc_role_menu` VALUES ('38566', 'ROLE_ADMIN', '88');
INSERT INTO `sc_role_menu` VALUES ('38567', 'ROLE_ADMIN', '84');
INSERT INTO `sc_role_menu` VALUES ('38568', 'ROLE_ADMIN', '196');
INSERT INTO `sc_role_menu` VALUES ('38569', 'ROLE_ADMIN', '387');
INSERT INTO `sc_role_menu` VALUES ('38570', 'ROLE_ADMIN', '317');
INSERT INTO `sc_role_menu` VALUES ('38571', 'ROLE_ADMIN', '383');
INSERT INTO `sc_role_menu` VALUES ('38572', 'ROLE_ADMIN', '353');
INSERT INTO `sc_role_menu` VALUES ('38573', 'ROLE_ADMIN', '354');
INSERT INTO `sc_role_menu` VALUES ('38574', 'ROLE_ADMIN', '306');
INSERT INTO `sc_role_menu` VALUES ('38575', 'ROLE_ADMIN', '273');
INSERT INTO `sc_role_menu` VALUES ('38576', 'ROLE_ADMIN', '331');
INSERT INTO `sc_role_menu` VALUES ('38577', 'ROLE_ADMIN', '349');
INSERT INTO `sc_role_menu` VALUES ('38578', 'ROLE_ADMIN', '335');
INSERT INTO `sc_role_menu` VALUES ('38579', 'ROLE_ADMIN', '345');
INSERT INTO `sc_role_menu` VALUES ('38580', 'ROLE_ADMIN', '346');
INSERT INTO `sc_role_menu` VALUES ('38581', 'ROLE_ADMIN', '347');
INSERT INTO `sc_role_menu` VALUES ('38582', 'ROLE_ADMIN', '348');
INSERT INTO `sc_role_menu` VALUES ('38583', 'ROLE_ADMIN', '397');
INSERT INTO `sc_role_menu` VALUES ('38584', 'ROLE_ADMIN', '384');
INSERT INTO `sc_role_menu` VALUES ('38585', 'ROLE_ADMIN', '376');
INSERT INTO `sc_role_menu` VALUES ('38586', 'ROLE_ADMIN', '372');
INSERT INTO `sc_role_menu` VALUES ('38587', 'ROLE_ADMIN', '359');
INSERT INTO `sc_role_menu` VALUES ('38588', 'ROLE_ADMIN', '356');
INSERT INTO `sc_role_menu` VALUES ('38589', 'ROLE_ADMIN', '403');
INSERT INTO `sc_role_menu` VALUES ('38590', 'ROLE_ADMIN', '404');
INSERT INTO `sc_role_menu` VALUES ('38591', 'ROLE_ADMIN', '402');
INSERT INTO `sc_role_menu` VALUES ('38592', 'ROLE_ADMIN', '301');
INSERT INTO `sc_role_menu` VALUES ('38593', 'ROLE_ADMIN', '322');
INSERT INTO `sc_role_menu` VALUES ('38594', 'ROLE_ADMIN', '323');
INSERT INTO `sc_role_menu` VALUES ('38595', 'ROLE_ADMIN', '324');
INSERT INTO `sc_role_menu` VALUES ('38596', 'ROLE_ADMIN', '39');
INSERT INTO `sc_role_menu` VALUES ('38597', 'ROLE_ADMIN', '168');
INSERT INTO `sc_role_menu` VALUES ('38598', 'ROLE_ADMIN', '281');
INSERT INTO `sc_role_menu` VALUES ('38599', 'ROLE_ADMIN', '282');
INSERT INTO `sc_role_menu` VALUES ('38600', 'ROLE_ADMIN', '283');
INSERT INTO `sc_role_menu` VALUES ('38601', 'ROLE_ADMIN', '169');
INSERT INTO `sc_role_menu` VALUES ('38602', 'ROLE_ADMIN', '325');
INSERT INTO `sc_role_menu` VALUES ('38603', 'ROLE_ADMIN', '326');
INSERT INTO `sc_role_menu` VALUES ('38604', 'ROLE_ADMIN', '328');
INSERT INTO `sc_role_menu` VALUES ('38605', 'ROLE_ADMIN', '375');
INSERT INTO `sc_role_menu` VALUES ('38606', 'ROLE_ADMIN', '378');
INSERT INTO `sc_role_menu` VALUES ('38607', 'ROLE_ADMIN', '379');
INSERT INTO `sc_role_menu` VALUES ('38608', 'ROLE_ADMIN', '380');
INSERT INTO `sc_role_menu` VALUES ('38609', 'ROLE_ADMIN', '381');
INSERT INTO `sc_role_menu` VALUES ('38610', 'ROLE_ADMIN', '36');
INSERT INTO `sc_role_menu` VALUES ('38611', 'ROLE_ADMIN', '279');
INSERT INTO `sc_role_menu` VALUES ('38612', 'ROLE_ADMIN', '278');
INSERT INTO `sc_role_menu` VALUES ('38613', 'ROLE_ADMIN', '280');
INSERT INTO `sc_role_menu` VALUES ('38614', 'ROLE_ADMIN', '304');
INSERT INTO `sc_role_menu` VALUES ('38615', 'ROLE_ADMIN', '289');
INSERT INTO `sc_role_menu` VALUES ('38616', 'ROLE_ADMIN', '291');
INSERT INTO `sc_role_menu` VALUES ('38617', 'ROLE_ADMIN', '292');
INSERT INTO `sc_role_menu` VALUES ('38618', 'ROLE_ADMIN', '293');
INSERT INTO `sc_role_menu` VALUES ('38619', 'ROLE_ADMIN', '294');
INSERT INTO `sc_role_menu` VALUES ('38620', 'ROLE_ADMIN', '309');
INSERT INTO `sc_role_menu` VALUES ('38621', 'ROLE_ADMIN', '295');
INSERT INTO `sc_role_menu` VALUES ('38622', 'ROLE_ADMIN', '296');
INSERT INTO `sc_role_menu` VALUES ('38623', 'ROLE_ADMIN', '297');
INSERT INTO `sc_role_menu` VALUES ('38624', 'ROLE_ADMIN', '298');
INSERT INTO `sc_role_menu` VALUES ('38625', 'ROLE_ADMIN', '299');
INSERT INTO `sc_role_menu` VALUES ('38626', 'ROLE_ADMIN', '312');
INSERT INTO `sc_role_menu` VALUES ('38627', 'ROLE_ADMIN', '2');
INSERT INTO `sc_role_menu` VALUES ('38628', 'ROLE_ADMIN', '6');
INSERT INTO `sc_role_menu` VALUES ('38629', 'ROLE_ADMIN', '7');
INSERT INTO `sc_role_menu` VALUES ('38630', 'ROLE_ADMIN', '203');
INSERT INTO `sc_role_menu` VALUES ('38631', 'ROLE_ADMIN', '274');
INSERT INTO `sc_role_menu` VALUES ('38632', 'ROLE_ADMIN', '9');
INSERT INTO `sc_role_menu` VALUES ('38633', 'ROLE_ADMIN', '10');
INSERT INTO `sc_role_menu` VALUES ('38634', 'ROLE_ADMIN', '11');
INSERT INTO `sc_role_menu` VALUES ('38635', 'ROLE_ADMIN', '12');
INSERT INTO `sc_role_menu` VALUES ('38636', 'ROLE_ADMIN', '42');
INSERT INTO `sc_role_menu` VALUES ('38637', 'ROLE_ADMIN', '43');
INSERT INTO `sc_role_menu` VALUES ('38638', 'ROLE_ADMIN', '44');
INSERT INTO `sc_role_menu` VALUES ('38639', 'ROLE_ADMIN', '154');
INSERT INTO `sc_role_menu` VALUES ('38640', 'ROLE_ADMIN', '310');
INSERT INTO `sc_role_menu` VALUES ('38641', 'ROLE_ADMIN', '311');
INSERT INTO `sc_role_menu` VALUES ('38642', 'ROLE_ADMIN', '351');
INSERT INTO `sc_role_menu` VALUES ('38643', 'ROLE_ADMIN', '410');
INSERT INTO `sc_role_menu` VALUES ('38644', 'ROLE_ADMIN', '3');
INSERT INTO `sc_role_menu` VALUES ('38645', 'ROLE_ADMIN', '4');
INSERT INTO `sc_role_menu` VALUES ('38646', 'ROLE_ADMIN', '5');
INSERT INTO `sc_role_menu` VALUES ('38647', 'ROLE_ADMIN', '30');
INSERT INTO `sc_role_menu` VALUES ('38648', 'ROLE_ADMIN', '31');
INSERT INTO `sc_role_menu` VALUES ('38649', 'ROLE_ADMIN', '49');

-- ----------------------------
-- Table structure for `sc_taglib_manager`
-- ----------------------------
DROP TABLE IF EXISTS `sc_taglib_manager`;
CREATE TABLE `sc_taglib_manager` (
  `scTagLibManagerId` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父ID',
  `tagName` varchar(50) DEFAULT NULL COMMENT '标签名称',
  PRIMARY KEY (`scTagLibManagerId`)
) ENGINE=MyISAM AUTO_INCREMENT=268 DEFAULT CHARSET=utf8 COMMENT='使用于标签库维护';

-- ----------------------------
-- Records of sc_taglib_manager
-- ----------------------------
INSERT INTO `sc_taglib_manager` VALUES ('21', '0', '电视剧');
INSERT INTO `sc_taglib_manager` VALUES ('4', '2', '哎13');
INSERT INTO `sc_taglib_manager` VALUES ('5', '1', '视频');
INSERT INTO `sc_taglib_manager` VALUES ('6', '1', '电视剧1');
INSERT INTO `sc_taglib_manager` VALUES ('20', '0', '视频');
INSERT INTO `sc_taglib_manager` VALUES ('8', '2', 'test3');
INSERT INTO `sc_taglib_manager` VALUES ('13', '12', '桃子');
INSERT INTO `sc_taglib_manager` VALUES ('14', '12', '橘子');
INSERT INTO `sc_taglib_manager` VALUES ('15', '12', '香蕉');
INSERT INTO `sc_taglib_manager` VALUES ('22', '0', '电影');
INSERT INTO `sc_taglib_manager` VALUES ('23', '0', '微电影');
INSERT INTO `sc_taglib_manager` VALUES ('24', '0', '综艺');
INSERT INTO `sc_taglib_manager` VALUES ('25', '0', '电视台');
INSERT INTO `sc_taglib_manager` VALUES ('26', '0', '影视资讯');
INSERT INTO `sc_taglib_manager` VALUES ('27', '0', '动漫');
INSERT INTO `sc_taglib_manager` VALUES ('28', '0', '娱乐');
INSERT INTO `sc_taglib_manager` VALUES ('29', '0', '爱情');
INSERT INTO `sc_taglib_manager` VALUES ('30', '0', '喜剧');
INSERT INTO `sc_taglib_manager` VALUES ('31', '0', '动作');
INSERT INTO `sc_taglib_manager` VALUES ('32', '0', '伦理');
INSERT INTO `sc_taglib_manager` VALUES ('33', '0', '恐怖');
INSERT INTO `sc_taglib_manager` VALUES ('34', '0', '犯罪');
INSERT INTO `sc_taglib_manager` VALUES ('35', '0', '惊悚');
INSERT INTO `sc_taglib_manager` VALUES ('36', '0', '战争');
INSERT INTO `sc_taglib_manager` VALUES ('37', '0', '科幻');
INSERT INTO `sc_taglib_manager` VALUES ('38', '0', '剧情');
INSERT INTO `sc_taglib_manager` VALUES ('39', '0', '青春偶像');
INSERT INTO `sc_taglib_manager` VALUES ('40', '0', '情感');
INSERT INTO `sc_taglib_manager` VALUES ('41', '0', '古装');
INSERT INTO `sc_taglib_manager` VALUES ('42', '0', '经典');
INSERT INTO `sc_taglib_manager` VALUES ('43', '0', '内地');
INSERT INTO `sc_taglib_manager` VALUES ('44', '0', '韩国');
INSERT INTO `sc_taglib_manager` VALUES ('45', '0', '香港');
INSERT INTO `sc_taglib_manager` VALUES ('46', '0', '台湾');
INSERT INTO `sc_taglib_manager` VALUES ('47', '0', '美国');
INSERT INTO `sc_taglib_manager` VALUES ('48', '0', '日本');
INSERT INTO `sc_taglib_manager` VALUES ('49', '0', '头条');
INSERT INTO `sc_taglib_manager` VALUES ('50', '0', '军事');
INSERT INTO `sc_taglib_manager` VALUES ('51', '0', '游戏');
INSERT INTO `sc_taglib_manager` VALUES ('52', '0', '新闻');
INSERT INTO `sc_taglib_manager` VALUES ('53', '0', '体育');
INSERT INTO `sc_taglib_manager` VALUES ('54', '0', '邮箱');
INSERT INTO `sc_taglib_manager` VALUES ('55', '0', '小说');
INSERT INTO `sc_taglib_manager` VALUES ('56', '0', '购物');
INSERT INTO `sc_taglib_manager` VALUES ('57', '0', '商城');
INSERT INTO `sc_taglib_manager` VALUES ('58', '0', '直播');
INSERT INTO `sc_taglib_manager` VALUES ('59', '0', 'NBA');
INSERT INTO `sc_taglib_manager` VALUES ('60', '0', '足球');
INSERT INTO `sc_taglib_manager` VALUES ('61', '0', '图片');
INSERT INTO `sc_taglib_manager` VALUES ('62', '0', '美女');
INSERT INTO `sc_taglib_manager` VALUES ('63', '0', '团购');
INSERT INTO `sc_taglib_manager` VALUES ('64', '0', '特卖');
INSERT INTO `sc_taglib_manager` VALUES ('65', '0', '汽车');
INSERT INTO `sc_taglib_manager` VALUES ('66', '0', '二手车');
INSERT INTO `sc_taglib_manager` VALUES ('67', '0', '房产');
INSERT INTO `sc_taglib_manager` VALUES ('68', '0', '爱好');
INSERT INTO `sc_taglib_manager` VALUES ('69', '0', '社区');
INSERT INTO `sc_taglib_manager` VALUES ('70', '0', '交友');
INSERT INTO `sc_taglib_manager` VALUES ('71', '0', '软件');
INSERT INTO `sc_taglib_manager` VALUES ('72', '0', '音乐');
INSERT INTO `sc_taglib_manager` VALUES ('73', '0', '生活');
INSERT INTO `sc_taglib_manager` VALUES ('74', '0', '星座');
INSERT INTO `sc_taglib_manager` VALUES ('75', '0', '宠物');
INSERT INTO `sc_taglib_manager` VALUES ('76', '0', '数码');
INSERT INTO `sc_taglib_manager` VALUES ('77', '0', '手机');
INSERT INTO `sc_taglib_manager` VALUES ('78', '0', '杀毒');
INSERT INTO `sc_taglib_manager` VALUES ('79', '0', '考试');
INSERT INTO `sc_taglib_manager` VALUES ('80', '0', '文库');
INSERT INTO `sc_taglib_manager` VALUES ('81', '0', '大学');
INSERT INTO `sc_taglib_manager` VALUES ('82', '0', '英语');
INSERT INTO `sc_taglib_manager` VALUES ('83', '0', '彩票');
INSERT INTO `sc_taglib_manager` VALUES ('84', '0', '团购');
INSERT INTO `sc_taglib_manager` VALUES ('85', '0', '页游');
INSERT INTO `sc_taglib_manager` VALUES ('86', '0', '网游');
INSERT INTO `sc_taglib_manager` VALUES ('87', '0', '双色球');
INSERT INTO `sc_taglib_manager` VALUES ('88', '0', '地图');
INSERT INTO `sc_taglib_manager` VALUES ('89', '0', '旅游');
INSERT INTO `sc_taglib_manager` VALUES ('90', '0', '女性');
INSERT INTO `sc_taglib_manager` VALUES ('91', '0', '儿童');
INSERT INTO `sc_taglib_manager` VALUES ('92', '0', '银行');
INSERT INTO `sc_taglib_manager` VALUES ('93', '0', '股票');
INSERT INTO `sc_taglib_manager` VALUES ('94', '0', '基金');
INSERT INTO `sc_taglib_manager` VALUES ('95', '0', '地方');
INSERT INTO `sc_taglib_manager` VALUES ('96', '0', '国外');
INSERT INTO `sc_taglib_manager` VALUES ('97', '0', '小清新');
INSERT INTO `sc_taglib_manager` VALUES ('98', '0', '财经');
INSERT INTO `sc_taglib_manager` VALUES ('99', '0', '招聘');
INSERT INTO `sc_taglib_manager` VALUES ('100', '0', '美图');
INSERT INTO `sc_taglib_manager` VALUES ('101', '0', '查询');
INSERT INTO `sc_taglib_manager` VALUES ('102', '0', '天气');
INSERT INTO `sc_taglib_manager` VALUES ('103', '0', '相册');
INSERT INTO `sc_taglib_manager` VALUES ('104', '0', '单机');
INSERT INTO `sc_taglib_manager` VALUES ('105', '0', '综合人才');
INSERT INTO `sc_taglib_manager` VALUES ('106', '0', '鞋包');
INSERT INTO `sc_taglib_manager` VALUES ('107', '0', '女装');
INSERT INTO `sc_taglib_manager` VALUES ('108', '0', '冷笑话');
INSERT INTO `sc_taglib_manager` VALUES ('109', '0', '娱乐八卦');
INSERT INTO `sc_taglib_manager` VALUES ('110', '0', '棋牌');
INSERT INTO `sc_taglib_manager` VALUES ('111', '0', '曲艺');
INSERT INTO `sc_taglib_manager` VALUES ('112', '0', '菜谱');
INSERT INTO `sc_taglib_manager` VALUES ('113', '0', '毕业生招聘');
INSERT INTO `sc_taglib_manager` VALUES ('114', '0', '健康');
INSERT INTO `sc_taglib_manager` VALUES ('115', '0', '移动');
INSERT INTO `sc_taglib_manager` VALUES ('116', '0', '保险');
INSERT INTO `sc_taglib_manager` VALUES ('117', '0', '电脑');
INSERT INTO `sc_taglib_manager` VALUES ('118', '0', '桌面');
INSERT INTO `sc_taglib_manager` VALUES ('119', '0', '行业');
INSERT INTO `sc_taglib_manager` VALUES ('120', '0', '摄影');
INSERT INTO `sc_taglib_manager` VALUES ('121', '0', '学习');
INSERT INTO `sc_taglib_manager` VALUES ('122', '0', '设计');
INSERT INTO `sc_taglib_manager` VALUES ('123', '0', '知识');
INSERT INTO `sc_taglib_manager` VALUES ('124', '0', '公益');
INSERT INTO `sc_taglib_manager` VALUES ('125', '0', '法律');
INSERT INTO `sc_taglib_manager` VALUES ('126', '0', '空间');
INSERT INTO `sc_taglib_manager` VALUES ('127', '0', '微博');
INSERT INTO `sc_taglib_manager` VALUES ('128', '0', '聊天');
INSERT INTO `sc_taglib_manager` VALUES ('129', '0', '地图');
INSERT INTO `sc_taglib_manager` VALUES ('130', '0', '政府');
INSERT INTO `sc_taglib_manager` VALUES ('131', '0', '交通');
INSERT INTO `sc_taglib_manager` VALUES ('132', '0', '论坛');
INSERT INTO `sc_taglib_manager` VALUES ('133', '0', '通信');
INSERT INTO `sc_taglib_manager` VALUES ('134', '0', '特色招聘');
INSERT INTO `sc_taglib_manager` VALUES ('135', '0', '求职节目');
INSERT INTO `sc_taglib_manager` VALUES ('136', '0', '教育');
INSERT INTO `sc_taglib_manager` VALUES ('137', '0', '美食');
INSERT INTO `sc_taglib_manager` VALUES ('138', '0', '休闲');
INSERT INTO `sc_taglib_manager` VALUES ('139', '0', '旅行社');
INSERT INTO `sc_taglib_manager` VALUES ('140', '0', '酒店');
INSERT INTO `sc_taglib_manager` VALUES ('141', '0', '机票');
INSERT INTO `sc_taglib_manager` VALUES ('142', '0', '基金资讯');
INSERT INTO `sc_taglib_manager` VALUES ('143', '0', '基金公司');
INSERT INTO `sc_taglib_manager` VALUES ('144', '0', '理财交流');
INSERT INTO `sc_taglib_manager` VALUES ('145', '0', '热门贷款');
INSERT INTO `sc_taglib_manager` VALUES ('146', '0', '电子支付');
INSERT INTO `sc_taglib_manager` VALUES ('147', '0', '分类推广');
INSERT INTO `sc_taglib_manager` VALUES ('148', '0', '亲子');
INSERT INTO `sc_taglib_manager` VALUES ('149', '0', '自驾');
INSERT INTO `sc_taglib_manager` VALUES ('150', '38', '登山');
INSERT INTO `sc_taglib_manager` VALUES ('151', '0', '徒步');
INSERT INTO `sc_taglib_manager` VALUES ('152', '0', '历史');
INSERT INTO `sc_taglib_manager` VALUES ('153', '0', '背包客');
INSERT INTO `sc_taglib_manager` VALUES ('154', '0', '租房');
INSERT INTO `sc_taglib_manager` VALUES ('155', '0', '建筑行业');
INSERT INTO `sc_taglib_manager` VALUES ('156', '0', '数据行情');
INSERT INTO `sc_taglib_manager` VALUES ('157', '0', '财经博客');
INSERT INTO `sc_taglib_manager` VALUES ('158', '0', '证券机构');
INSERT INTO `sc_taglib_manager` VALUES ('159', '0', '股市周边');
INSERT INTO `sc_taglib_manager` VALUES ('160', '0', '炒股软件');
INSERT INTO `sc_taglib_manager` VALUES ('161', '0', '快餐');
INSERT INTO `sc_taglib_manager` VALUES ('162', '0', '违章');
INSERT INTO `sc_taglib_manager` VALUES ('163', '0', '航空');
INSERT INTO `sc_taglib_manager` VALUES ('164', '0', '各地铁路');
INSERT INTO `sc_taglib_manager` VALUES ('165', '0', '租车');
INSERT INTO `sc_taglib_manager` VALUES ('166', '0', '拼车');
INSERT INTO `sc_taglib_manager` VALUES ('167', '0', '医疗健康');
INSERT INTO `sc_taglib_manager` VALUES ('168', '0', '保健养生');
INSERT INTO `sc_taglib_manager` VALUES ('169', '0', '健康社区');
INSERT INTO `sc_taglib_manager` VALUES ('170', '0', '网上药店');
INSERT INTO `sc_taglib_manager` VALUES ('171', '0', '医学行业');
INSERT INTO `sc_taglib_manager` VALUES ('172', '0', 'QQ');
INSERT INTO `sc_taglib_manager` VALUES ('173', '0', '婚嫁');
INSERT INTO `sc_taglib_manager` VALUES ('174', '0', '居家');
INSERT INTO `sc_taglib_manager` VALUES ('175', '0', '服饰');
INSERT INTO `sc_taglib_manager` VALUES ('176', '0', '原创');
INSERT INTO `sc_taglib_manager` VALUES ('177', '0', '科技');
INSERT INTO `sc_taglib_manager` VALUES ('178', '0', '纪录片');
INSERT INTO `sc_taglib_manager` VALUES ('179', '0', '拍客');
INSERT INTO `sc_taglib_manager` VALUES ('180', '0', '时尚');
INSERT INTO `sc_taglib_manager` VALUES ('181', '0', '奢侈品');
INSERT INTO `sc_taglib_manager` VALUES ('182', '0', '达人');
INSERT INTO `sc_taglib_manager` VALUES ('183', '0', '广告');
INSERT INTO `sc_taglib_manager` VALUES ('184', '0', '品牌');
INSERT INTO `sc_taglib_manager` VALUES ('185', '0', '武侠');
INSERT INTO `sc_taglib_manager` VALUES ('186', '0', '警匪');
INSERT INTO `sc_taglib_manager` VALUES ('187', '0', '悬疑');
INSERT INTO `sc_taglib_manager` VALUES ('188', '0', '农村');
INSERT INTO `sc_taglib_manager` VALUES ('189', '0', '都市');
INSERT INTO `sc_taglib_manager` VALUES ('190', '0', '家庭');
INSERT INTO `sc_taglib_manager` VALUES ('191', '0', '时装');
INSERT INTO `sc_taglib_manager` VALUES ('192', '0', '华语');
INSERT INTO `sc_taglib_manager` VALUES ('193', '0', '好莱坞');
INSERT INTO `sc_taglib_manager` VALUES ('194', '0', '好玩');
INSERT INTO `sc_taglib_manager` VALUES ('195', '0', '酷站');
INSERT INTO `sc_taglib_manager` VALUES ('196', '0', '文艺范儿');
INSERT INTO `sc_taglib_manager` VALUES ('197', '0', '我爱搜罗');
INSERT INTO `sc_taglib_manager` VALUES ('198', '0', '慢生活');
INSERT INTO `sc_taglib_manager` VALUES ('199', '0', '吃货据点');
INSERT INTO `sc_taglib_manager` VALUES ('200', '0', '光影斑驳');
INSERT INTO `sc_taglib_manager` VALUES ('201', '0', '电影时光');
INSERT INTO `sc_taglib_manager` VALUES ('202', '0', '叫醒耳朵');
INSERT INTO `sc_taglib_manager` VALUES ('203', '0', '发现新鲜');
INSERT INTO `sc_taglib_manager` VALUES ('204', '0', '爱旅行');
INSERT INTO `sc_taglib_manager` VALUES ('205', '0', '科技有意思');
INSERT INTO `sc_taglib_manager` VALUES ('206', '0', '悦读汇');
INSERT INTO `sc_taglib_manager` VALUES ('207', '0', '旅游探索');
INSERT INTO `sc_taglib_manager` VALUES ('208', '0', '知识趣味');
INSERT INTO `sc_taglib_manager` VALUES ('209', '0', '科技媒体');
INSERT INTO `sc_taglib_manager` VALUES ('210', '0', '特色资源');
INSERT INTO `sc_taglib_manager` VALUES ('211', '0', '日常生活');
INSERT INTO `sc_taglib_manager` VALUES ('212', '0', '囧人糗事');
INSERT INTO `sc_taglib_manager` VALUES ('213', '0', '有趣电商');
INSERT INTO `sc_taglib_manager` VALUES ('214', '0', '兴趣爱好');
INSERT INTO `sc_taglib_manager` VALUES ('215', '21', '喜剧');
INSERT INTO `sc_taglib_manager` VALUES ('231', '22', '，');
INSERT INTO `sc_taglib_manager` VALUES ('247', '239', '.');
INSERT INTO `sc_taglib_manager` VALUES ('248', '20', '334534534');
INSERT INTO `sc_taglib_manager` VALUES ('259', '21', '电视剧');
INSERT INTO `sc_taglib_manager` VALUES ('262', '253', '22');

-- ----------------------------
-- Table structure for `sc_taskmanager`
-- ----------------------------
DROP TABLE IF EXISTS `sc_taskmanager`;
CREATE TABLE `sc_taskmanager` (
  `jobName` varchar(100) DEFAULT NULL COMMENT '任务名称',
  `className` varchar(200) DEFAULT NULL COMMENT '类名称',
  `cronExpression` varchar(200) DEFAULT NULL COMMENT '定时方式',
  `cronTrigger` varchar(100) DEFAULT NULL COMMENT '触发器名称',
  `jobIsvalid` varchar(1) DEFAULT NULL COMMENT '是否有效',
  `jobstate` varchar(1) DEFAULT NULL COMMENT '任务状态',
  `startTime` varchar(19) DEFAULT NULL COMMENT '开始时间',
  `taskmanager_id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  PRIMARY KEY (`taskmanager_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='系统级通用任务管理';

-- ----------------------------
-- Records of sc_taskmanager
-- ----------------------------
INSERT INTO `sc_taskmanager` VALUES ('test2', 'com.neteast.rmp.web.systemTaskManager.SystemTaskTestJob', '0/25 * * * * ?', 'test2Trigger', '1', '2', '2013-07-23 16:03:23', '1');
INSERT INTO `sc_taskmanager` VALUES ('test1', 'com.neteast.rmp.web.systemTaskManager.SystemTaskTestJob', '0/30 * * * * ?', 'test1Trigger', '1', '2', '2013-07-23 16:04:08', '2');

-- ----------------------------
-- Table structure for `sc_tree_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sc_tree_menu`;
CREATE TABLE `sc_tree_menu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `MENU_ID` int(11) DEFAULT NULL COMMENT '菜单ID',
  `PARENT_ID` int(11) NOT NULL COMMENT '父菜单ID',
  `TEXT` varchar(50) NOT NULL COMMENT '菜单名称',
  `LEAF` varchar(5) DEFAULT NULL COMMENT '是否叶子结点',
  `DISABLED` varchar(5) DEFAULT NULL COMMENT '禁用',
  `CLS` varchar(10) DEFAULT NULL COMMENT '节点样式',
  `ICON_CLS` varchar(50) DEFAULT NULL COMMENT '节点图标',
  `HREF` varchar(100) DEFAULT NULL COMMENT '链接',
  `VISIBILITY` varchar(10) DEFAULT NULL COMMENT '可见',
  `TYPE` varchar(10) DEFAULT NULL COMMENT '菜单类型',
  `SORT` int(11) DEFAULT NULL COMMENT '排序',
  `HREF_TARGET` varchar(100) DEFAULT NULL COMMENT '链接目标',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_TREE_MENU_IDX` (`MENU_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=477 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_tree_menu
-- ----------------------------
INSERT INTO `sc_tree_menu` VALUES ('1', null, '0', '菜单', 'false', 'false', null, null, null, null, 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('2', null, '1', '系统管理', 'false', 'false', 'xtgl', 'xtgl', null, null, 'tree', '9', null);
INSERT INTO `sc_tree_menu` VALUES ('3', null, '2', '权限管理', 'false', 'false', null, null, null, null, 'tree', '99', null);
INSERT INTO `sc_tree_menu` VALUES ('4', null, '3', '系统用户管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scUser&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('5', null, '3', '角色菜单管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scRoleMenu&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('6', null, '2', '系统管理', 'false', 'false', null, null, null, null, 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('7', null, '6', '数据字典', 'true', 'false', null, 'default-icon', null, '1', 'tree', '0', 'baseRecordList.do?bean=scParmType&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('8', null, '6', '参数信息管理', 'true', '1', null, 'default-icon', null, '0', 'tree', null, 'baseRecordList.do?bean=scParmInfo&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('9', null, '6', '系统缓存刷新', 'true', 'false', null, null, null, null, 'tree', '3', 'cacheRefresh.do');
INSERT INTO `sc_tree_menu` VALUES ('10', null, '2', '机构管理', 'false', 'false', null, null, null, null, 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('11', null, '10', '机构信息管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scOrg&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('12', null, '10', '机构关系管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scOrgRelation&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('13', null, '32', '视频管理', 'false', 'false', null, null, null, null, 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('14', null, '32', '域名管理', 'false', 'false', null, null, null, null, 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('15', null, '145', '视频大文件明细', 'true', 'false', null, 'media-resource-icon', null, null, 'tree', '4', 'viewVideoResourceList.do');
INSERT INTO `sc_tree_menu` VALUES ('16', null, '145', '视频大文件统计', 'true', 'false', null, 'media-statistics-icon', null, null, 'tree', '5', 'stVideoList.do');
INSERT INTO `sc_tree_menu` VALUES ('17', null, '14', '域名列表', 'true', 'false', null, 'domain-list-icon', null, null, 'tree', '1', 'stDomainList.do?orderBy=domain');
INSERT INTO `sc_tree_menu` VALUES ('19', null, '6', '全局参数管理', 'true', '1', null, null, null, '0', 'tree', '0', 'baseRecordList.do?bean=scGlobalParm&module=systemconfig');
INSERT INTO `sc_tree_menu` VALUES ('30', null, '3', '角色管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scRole&module=authorization');
INSERT INTO `sc_tree_menu` VALUES ('31', null, '3', '用户角色关系', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scUserRole&module=authorization');
INSERT INTO `sc_tree_menu` VALUES ('35', null, '40', '报表管理', 'false', 'false', 'bbgl', null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('39', null, '196', '调度管理', 'false', 'false', null, '', null, null, 'tree', '5', null);
INSERT INTO `sc_tree_menu` VALUES ('41', null, '236', '资源管理', 'false', 'false', 'zygl', 'zygl', null, null, '', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('42', null, '2', 'Portal管理', 'false', 'false', null, null, null, null, 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('43', null, '42', 'Portal页面配置', 'true', 'false', null, null, null, null, 'tree', '1', 'scPortalStyList.do');
INSERT INTO `sc_tree_menu` VALUES ('44', null, '42', 'Portal单元配置', 'true', 'false', null, null, null, null, 'tree', '2', 'scCellCfgList.do');
INSERT INTO `sc_tree_menu` VALUES ('45', null, '172', '网站归属分析图', 'true', '1', null, 'website-belongs-icon', null, '1', 'tree', null, 'portalPixel.do?portalCode=websiteBelongs');
INSERT INTO `sc_tree_menu` VALUES ('46', null, '172', '域名归属分析', 'true', '1', null, 'domain-belongs-icon', null, '1', 'tree', null, 'portalPixel.do?portalCode=domainBelongs');
INSERT INTO `sc_tree_menu` VALUES ('47', null, '36', 'DPI接口数据', 'true', 'false', null, 'data-interface-icon', null, '1', 'tree', null, 'tbDpiM0001List.do');
INSERT INTO `sc_tree_menu` VALUES ('48', null, '113', 'IP库管理', 'true', 'false', null, 'default-icon', null, '1', 'tree', null, 'rmIpManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('49', null, '3', '菜单管理', 'true', 'false', null, null, null, null, 'tree', null, 'treeMenu.do');
INSERT INTO `sc_tree_menu` VALUES ('50', null, '113', '网站库管理', '1', '0', null, null, null, '1', 'tree', '0', 'rmWebsiteManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('51', null, '116', '质量评估', '1', '0', null, null, null, '1', '', '0', 'tbDM0004List.do');
INSERT INTO `sc_tree_menu` VALUES ('53', null, '166', '热点域名评估', '1', '0', null, null, null, '1', 'tree', '1', 'tbDM0002List.do');
INSERT INTO `sc_tree_menu` VALUES ('56', null, '142', '域名库管理', '1', '0', null, null, null, null, 'tree', '2', 'rmDomainManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('57', null, '41', '资源统计', 'false', 'false', null, null, null, null, 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('58', null, '57', '域名统计', 'true', 'false', null, null, null, 'null', 'tree', '2', 'tbDM00012List.do');
INSERT INTO `sc_tree_menu` VALUES ('59', null, '166', '热点网站评估', '1', '0', null, null, null, '1', 'tree', '0', 'tbWsM0003List.do');
INSERT INTO `sc_tree_menu` VALUES ('61', null, '113', '重要资源库管理', '1', '0', null, null, null, '1', 'tree', '3', 'rmImportantResourceManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('62', null, '57', '网站库概览', '1', '0', null, null, null, '1', 'tree', '0', 'rmWebsiteTotalViewList.do');
INSERT INTO `sc_tree_menu` VALUES ('63', null, '57', '网站库', '1', '0', null, null, null, '1', 'tree', '1', 'rmWebsiteTotalList.do');
INSERT INTO `sc_tree_menu` VALUES ('64', null, '151', '重要资源库', '1', '0', null, null, null, '1', 'tree', '3', 'rmImportanResourceTotalList.do');
INSERT INTO `sc_tree_menu` VALUES ('65', null, '39', '拨测任务管理', '1', '0', null, null, null, '1', 'tree', '17', 'rmTaskGroupList.do');
INSERT INTO `sc_tree_menu` VALUES ('67', null, '57', 'URL统计', '1', '0', null, null, null, '1', 'tree', '4', 'tbRM0001List.do');
INSERT INTO `sc_tree_menu` VALUES ('68', null, '36', '全网探测', '0', '0', null, null, null, '1', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('69', null, '68', '域名统计', '0', '0', null, null, null, null, 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('70', null, '69', '广东省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '4', 'httpDomain44List.do?provinceString=44');
INSERT INTO `sc_tree_menu` VALUES ('71', null, '69', '北京市', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '1', 'httpDomain44List.do?provinceString=11');
INSERT INTO `sc_tree_menu` VALUES ('72', null, '69', '内蒙古自治区', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '6', 'httpDomain44List.do?provinceString=15');
INSERT INTO `sc_tree_menu` VALUES ('73', null, '69', '上海市', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '2', 'httpDomain44List.do?provinceString=31');
INSERT INTO `sc_tree_menu` VALUES ('74', null, '69', '江苏省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '7', '	 httpDomain44List.do?provinceString=32');
INSERT INTO `sc_tree_menu` VALUES ('75', null, '69', '浙江省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '8', '	 httpDomain44List.do?provinceString=33');
INSERT INTO `sc_tree_menu` VALUES ('76', null, '69', '安徽省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '9', '	 httpDomain44List.do?provinceString=34');
INSERT INTO `sc_tree_menu` VALUES ('77', null, '69', '福建省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '10', '	 httpDomain44List.do?provinceString=35');
INSERT INTO `sc_tree_menu` VALUES ('78', null, '69', '江西省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '11', '	 httpDomain44List.do?provinceString=36');
INSERT INTO `sc_tree_menu` VALUES ('79', null, '69', '湖南省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '12', '	 httpDomain44List.do?provinceString=43');
INSERT INTO `sc_tree_menu` VALUES ('80', null, '69', '重庆市', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '3', 'httpDomain44List.do?provinceString=50');
INSERT INTO `sc_tree_menu` VALUES ('81', null, '69', '四川省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '13', 'httpDomain44List.do?provinceString=51');
INSERT INTO `sc_tree_menu` VALUES ('84', null, '166', '网站归属分析', '1', '0', null, null, null, '1', '', '4', 'externalPage.do?link=reportProxy.do?reportKey=wzgs');
INSERT INTO `sc_tree_menu` VALUES ('85', null, '69', '山西省', '1', '0', null, 'domain-list-icon', null, '1', '', '5', 'httpDomain44List.do?provinceString=61');
INSERT INTO `sc_tree_menu` VALUES ('88', null, '166', '域名归属分析', '1', '0', null, null, null, '1', '', '3', 'externalPage.do?link=reportProxy.do?reportKey=ymfx');
INSERT INTO `sc_tree_menu` VALUES ('89', null, '117', '引入策略分析', '1', '0', null, 'domain-list-icon', null, '1', '', '2', 'externalPage.do?link=reportProxy.do?reportKey=yrcl');
INSERT INTO `sc_tree_menu` VALUES ('91', null, '117', '热点引导场景分析', '1', '0', null, 'domain-list-icon', null, '1', '', '3', 'externalPage.do?link=reportProxy.do?reportKey=rdyd');
INSERT INTO `sc_tree_menu` VALUES ('92', null, '117', '按策略引导场景分析', '1', '0', null, 'domain-list-icon', null, '1', '', '4', 'externalPage.do?link=reportProxy.do?reportKey=clyd');
INSERT INTO `sc_tree_menu` VALUES ('93', null, '117', 'Cache/IDC协从场景分析', '1', '0', null, 'domain-list-icon', null, '1', '', '5', 'externalPage.do?link=reportProxy.do?reportKey=xccj');
INSERT INTO `sc_tree_menu` VALUES ('96', null, '39', '域名调度管理', '1', '0', null, null, null, '1', '', '0', 'dispatchList.do');
INSERT INTO `sc_tree_menu` VALUES ('97', null, '68', '视频资源', '0', '0', null, null, null, '1', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('98', null, '68', '视频统计', '0', '0', null, null, null, '0', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('99', null, '97', '北京市', '1', '0', null, null, null, '0', 'tree', '1', 'viewVideoResourceList.do');
INSERT INTO `sc_tree_menu` VALUES ('100', null, '97', '浙江省', '1', '0', null, null, null, '0', 'tree', '0', 'viewVideoResourceListzj.do');
INSERT INTO `sc_tree_menu` VALUES ('101', null, '97', '江西省', '1', '0', null, null, null, '0', 'tree', '2', 'viewVideoResourceListjx.do');
INSERT INTO `sc_tree_menu` VALUES ('102', null, '97', '广东省', '1', '0', null, null, null, '0', 'tree', '3', 'viewVideoResourceListgd.do');
INSERT INTO `sc_tree_menu` VALUES ('103', null, '98', '北京市', '1', '0', null, null, null, '1', 'tree', null, 'stVideoList.do');
INSERT INTO `sc_tree_menu` VALUES ('104', null, '98', '浙江省', '1', '0', null, null, null, '1', 'tree', null, 'stVideoListzj.do');
INSERT INTO `sc_tree_menu` VALUES ('105', null, '98', '江西省', '1', '0', null, null, null, '1', 'tree', null, 'stVideoListjx.do');
INSERT INTO `sc_tree_menu` VALUES ('106', null, '98', '广东省', '1', '0', null, null, null, '1', 'tree', null, 'stVideoListgd.do');
INSERT INTO `sc_tree_menu` VALUES ('107', null, '68', '域名引入考核', '1', '0', null, 'medal-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=tbFsM0001chart');
INSERT INTO `sc_tree_menu` VALUES ('108', null, '115', '深度分析', '1', '0', null, null, null, '1', '', '0', 'externalPage.do?link=reportProxy.do?reportKey=sdfx');
INSERT INTO `sc_tree_menu` VALUES ('112', null, '69', '统计查询', '1', '0', null, null, null, '0', 'tree', '0', 'httpDomain44AllList.do');
INSERT INTO `sc_tree_menu` VALUES ('113', null, '41', '基础数据管理', 'false', '0', null, null, null, '1', '', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('114', null, '40', '热点统一视图', 'false', 'false', null, null, null, '1', '', '8', null);
INSERT INTO `sc_tree_menu` VALUES ('115', null, '40', '深度评估', 'false', 'false', null, null, null, '1', 'tree', '9', null);
INSERT INTO `sc_tree_menu` VALUES ('116', null, '40', '质量评估', 'false', 'false', null, null, null, '1', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('117', null, '40', '引入评估', '0', '0', null, null, null, '1', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('118', null, '117', '引入策略分析', 'false', 'false', null, null, null, '1', '', '6', null);
INSERT INTO `sc_tree_menu` VALUES ('119', null, '117', '引入效果分析', 'false', 'false', null, null, null, '1', '', '10', null);
INSERT INTO `sc_tree_menu` VALUES ('120', null, '39', '成本质量场景调度', '1', '0', null, null, null, '1', 'tree', '15', 'dispathcerWithCostAndQualityList.do');
INSERT INTO `sc_tree_menu` VALUES ('121', null, '39', '他省缓存域名调度', '1', '0', null, null, null, '1', 'tree', '16', 'otherAreaCacheDispatcherList.do');
INSERT INTO `sc_tree_menu` VALUES ('122', null, '39', 'DNS域名清除调度', '1', '0', null, null, null, '1', '', '1', 'clearDNSDispathcher.do');
INSERT INTO `sc_tree_menu` VALUES ('123', null, '57', '各省网站资源对比', '1', '0', null, null, null, '1', 'tree', null, 'allProvinceResourcesContrast.do');
INSERT INTO `sc_tree_menu` VALUES ('124', null, '57', '全网资源深度', '1', '0', null, null, null, '1', 'tree', null, 'dmNetResourceDepthList.do');
INSERT INTO `sc_tree_menu` VALUES ('125', null, '57', '各省域名资源对比', '1', '0', null, null, null, '1', 'tree', null, 'allProvinceDomainResourcesContrast.do');
INSERT INTO `sc_tree_menu` VALUES ('126', null, '57', '网站库明细', '1', '0', null, null, null, '1', 'tree', null, 'dmNetsiteLibrariesDetailList.do');
INSERT INTO `sc_tree_menu` VALUES ('127', null, '114', '热点调度分析', '0', '0', null, null, null, '1', '', null, null);
INSERT INTO `sc_tree_menu` VALUES ('130', null, '127', '监测目标评估', '1', '0', null, null, null, '1', 'tree', null, 'dmMtAnalysisList.do');
INSERT INTO `sc_tree_menu` VALUES ('131', null, '117', '各省本网资源引入评估', '1', '0', null, null, null, '1', 'tree', '11', 'allProvinceResourcesBC.do');
INSERT INTO `sc_tree_menu` VALUES ('132', null, '57', '资源视图', '0', '0', null, null, null, null, 'tree', null, 'resourceViewList.do');
INSERT INTO `sc_tree_menu` VALUES ('134', null, '133', '资源总览', '0', '0', null, null, null, '1', 'tree', '0', 'portalAssemble.do?portalCode=resourceView');
INSERT INTO `sc_tree_menu` VALUES ('135', null, '133', '网站库', '0', '0', null, null, null, '0', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('136', null, '135', '网站库概览', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'dmNetsiteLibrariesList.do');
INSERT INTO `sc_tree_menu` VALUES ('137', null, '135', '网站库明细', '1', '0', null, null, null, '1', 'tree', '7', 'dmNetsiteLibrariesDetailList.do');
INSERT INTO `sc_tree_menu` VALUES ('138', null, '135', '分省网站概览', '1', '0', null, null, null, '1', 'tree', '8', 'portalAssemble.do?portalCode=allProvinceResourcesContrast');
INSERT INTO `sc_tree_menu` VALUES ('139', null, '135', '网站引入概览', '1', '0', null, null, null, '1', 'tree', '9', 'dmNetResourceDepthList.do');
INSERT INTO `sc_tree_menu` VALUES ('140', null, '115', '全网重复资源', '1', '0', null, null, null, '1', 'tree', null, 'portalAssemble.do?portalCode=allRepeatResource');
INSERT INTO `sc_tree_menu` VALUES ('141', null, '382', '网站映射表', '1', '0', null, null, null, '1', 'tree', '0', 'rmWebsiteManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('142', null, '133', '域名库', '0', '0', null, null, null, '1', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('143', null, '142', '分省域名概览', '1', '0', null, null, null, '1', 'tree', '4', 'allProvinceDomainResourcesContrast.do');
INSERT INTO `sc_tree_menu` VALUES ('144', null, '142', '域名资源明细', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'httpDomain44List.do?provinceString=44');
INSERT INTO `sc_tree_menu` VALUES ('145', null, '133', '大文件库', '0', '0', null, null, null, '1', 'tree', '5', null);
INSERT INTO `sc_tree_menu` VALUES ('146', null, '145', '大文件明细', '1', '0', null, null, null, '1', 'tree', '1', 'tbRM0001List.do');
INSERT INTO `sc_tree_menu` VALUES ('147', null, '133', 'IP地址库', '0', '0', null, null, null, '1', 'tree', '6', null);
INSERT INTO `sc_tree_menu` VALUES ('148', null, '57', '网站库3.1', '1', '0', null, null, null, '1', 'tree', null, 'dmNetsiteLibrariesList.do');
INSERT INTO `sc_tree_menu` VALUES ('149', null, '382', 'IP地址库维护', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'rmIpManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('150', null, '147', 'IP地址库分省概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmIpLibraryPatternList.do');
INSERT INTO `sc_tree_menu` VALUES ('151', null, '133', '重要资源库', '0', '0', null, null, null, '1', 'tree', '7', null);
INSERT INTO `sc_tree_menu` VALUES ('152', null, '382', '重要资源库明细', '1', '0', null, null, null, '1', 'tree', '4', 'rmImportantResourceManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('154', null, '42', 'Portal参数配置', 'true', 'false', null, null, null, '1', 'tree', '3', 'scPortalParmsList.do');
INSERT INTO `sc_tree_menu` VALUES ('155', null, '57', '域名库', '1', '0', null, null, null, '1', 'tree', null, 'dmIpLiberaryList.do');
INSERT INTO `sc_tree_menu` VALUES ('156', null, '40', '热度评估', '0', '0', null, '', null, '1', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('159', null, '40', '调度评估', '0', '0', null, null, null, '1', 'tree', '5', null);
INSERT INTO `sc_tree_menu` VALUES ('160', null, '166', '分析报告', '0', '0', null, null, null, '1', null, null, null);
INSERT INTO `sc_tree_menu` VALUES ('161', null, '145', '大文件概览', '1', '0', null, null, null, '1', 'tree', '2', '');
INSERT INTO `sc_tree_menu` VALUES ('162', null, '159', '监测目标评估', '1', '0', null, null, null, '1', 'tree', '4', 'dmMtAnalysisList.do');
INSERT INTO `sc_tree_menu` VALUES ('163', null, '142', '域名库概览', '1', '0', null, null, null, '1', 'tree', '0', 'dmIpLiberaryList.do');
INSERT INTO `sc_tree_menu` VALUES ('166', null, '40', '热点评估', '0', '0', null, null, null, '1', '', '7', 'tbDM0002List.do');
INSERT INTO `sc_tree_menu` VALUES ('168', null, '39', '调度策略配置', '1', 'true', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('169', null, '39', '调度任务配置', '1', 'true', null, null, null, '1', 'tree', '14', '');
INSERT INTO `sc_tree_menu` VALUES ('170', null, '33', '考核指标监测', '0', 'true', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('171', null, '33', '自定义报表', '0', 'true', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('172', null, '69', '天津市', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=12');
INSERT INTO `sc_tree_menu` VALUES ('173', null, '69', '河北省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=13');
INSERT INTO `sc_tree_menu` VALUES ('174', null, '69', '山西省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=14');
INSERT INTO `sc_tree_menu` VALUES ('175', null, '69', '辽宁省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=21');
INSERT INTO `sc_tree_menu` VALUES ('176', null, '69', '吉林省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=22');
INSERT INTO `sc_tree_menu` VALUES ('177', null, '69', '山东省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=37');
INSERT INTO `sc_tree_menu` VALUES ('178', null, '69', '河南省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=41');
INSERT INTO `sc_tree_menu` VALUES ('179', null, '69', '湖北省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=42');
INSERT INTO `sc_tree_menu` VALUES ('180', null, '69', '广西省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=45');
INSERT INTO `sc_tree_menu` VALUES ('181', null, '69', '海南省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=46');
INSERT INTO `sc_tree_menu` VALUES ('182', null, '69', '贵州省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=52');
INSERT INTO `sc_tree_menu` VALUES ('183', null, '69', '云南省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=53');
INSERT INTO `sc_tree_menu` VALUES ('184', null, '69', '甘肃省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=62');
INSERT INTO `sc_tree_menu` VALUES ('185', null, '69', '新疆省', '1', '0', null, 'domain-list-icon', null, '1', 'tree', '5', 'httpDomain44List.do?provinceString=65');
INSERT INTO `sc_tree_menu` VALUES ('186', null, '156', '热点网站评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'dmHotwebsiteSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('187', null, '156', '热点域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'dmHotdomainSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('188', null, '156', '热点大文件评估', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'dmHoturlSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('189', null, '117', '网站资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', '7', 'dmWebsiteResourceIntroduceWebsiteList.do');
INSERT INTO `sc_tree_menu` VALUES ('190', null, '115', '网站资源有效期评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmWebsiteResourceEffectivedateWebsiteList.do');
INSERT INTO `sc_tree_menu` VALUES ('191', null, '116', '网站质量评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=webSiteQualityAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('193', null, '192', '监控面板', 'true', 'false', null, null, null, '1', 'tree', null, 'portalAssemble.do?portalCode=monitorBoard');
INSERT INTO `sc_tree_menu` VALUES ('197', null, '47', 'DPI接口数据', 'true', 'false', null, null, null, '1', 'tree', null, 'tbDpiM0001List.do');
INSERT INTO `sc_tree_menu` VALUES ('198', null, '116', '域名质量评估', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'dmDomainQualityList.do');
INSERT INTO `sc_tree_menu` VALUES ('199', null, '159', '调度效果评估', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=dispDeffectAnalisys');
INSERT INTO `sc_tree_menu` VALUES ('201', null, '145', '大文件明细查询', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'dmBigFileDetailList.do');
INSERT INTO `sc_tree_menu` VALUES ('202', null, '151', '重要资源库明细查询', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'dmImptantResourceDetailList.do');
INSERT INTO `sc_tree_menu` VALUES ('203', null, '6', '系统参数管理', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'dmSystemmanageList.do');
INSERT INTO `sc_tree_menu` VALUES ('213', null, '159', '调度错误评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=dispCorrErrEval');
INSERT INTO `sc_tree_menu` VALUES ('214', null, '135', '网站库概览(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=dmNetsiteLibrariesSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('216', null, '215', '热点评估', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('218', null, '215', '归属评估', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('219', null, '215', '引入评估', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('220', null, '215', '质量评估', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('221', null, '215', '调度评估', '0', '0', null, null, null, '0', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('225', null, '221', '调度纠错评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=dmmDispCorrErrEval');
INSERT INTO `sc_tree_menu` VALUES ('226', null, '159', '出网域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=dmOutgoingDomainEval');
INSERT INTO `sc_tree_menu` VALUES ('227', null, '159', '测试菜单', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'portalAssemble.do?portalCode=testPortal');
INSERT INTO `sc_tree_menu` VALUES ('228', null, '221', '出网监测域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=dmmDispOutgoingDomainEval');
INSERT INTO `sc_tree_menu` VALUES ('229', null, '40', '归属评估', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('230', null, '229', '网站归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=webSiteBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('231', null, '229', '域名归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=dmDomainBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('232', null, '135', '全网系统网站视图', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'portalAssemble.do?portalCode=dmWebSiteView');
INSERT INTO `sc_tree_menu` VALUES ('233', null, '229', '网站归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=webSiteBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('234', null, '142', '全网系统域名视图', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=dmWebsiteDomainView');
INSERT INTO `sc_tree_menu` VALUES ('235', null, '229', '域名归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'portalAssemble.do?portalCode=dmDomainBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('236', null, '134', '全网资源总览', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=resourceView');
INSERT INTO `sc_tree_menu` VALUES ('237', null, '134', '分省资源总览(old)', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=resourceViewMap');
INSERT INTO `sc_tree_menu` VALUES ('238', null, '218', '域名归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=dmmDomainBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('239', null, '218', '域名归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=dmmDomainBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('241', null, '142', '域名库明细', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=dmDomainDetail');
INSERT INTO `sc_tree_menu` VALUES ('242', null, '159', '出网监测大文件评估', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=dmOutgoingBigFileEval');
INSERT INTO `sc_tree_menu` VALUES ('243', null, '229', '大文件', '1', '1', null, 'default-icon', null, '1', 'tree', '9', 'portalAssemble.do?portalCode=dmBigFileBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('244', null, '229', '大文件归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '7', 'portalAssemble.do?portalCode=dmBigFileBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('245', null, '229', '大文件归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '8', 'portalAssemble.do?portalCode=dmBigFileBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('246', null, '218', '网站归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=dmmWebSiteBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('247', null, '218', '网站归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=dmmWebSiteBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('248', null, '221', '出网监测大文件评估', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=dmmOutgoingBigFileEval');
INSERT INTO `sc_tree_menu` VALUES ('249', null, '218', '大文件归属评估', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'portalAssemble.do?portalCode=dmmBigFileBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('250', null, '218', '大文件归属评估(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=dmmBigFileBelongEvaluationSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('251', null, '135', '分省网站视图', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=dmWebsiteProvinceView');
INSERT INTO `sc_tree_menu` VALUES ('252', null, '142', '分省域名视图', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=dmDomainView');
INSERT INTO `sc_tree_menu` VALUES ('253', null, '215', '热度评估', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('254', null, '216', '热点网站评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmHotwebsiteSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('255', null, '216', '热点域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmHotdomainSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('256', null, '216', '热点大文件评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmHoturlSortList.do');
INSERT INTO `sc_tree_menu` VALUES ('257', null, '135', '网站全景图', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'portalAssemble.do?portalCode=webSitePanorama');
INSERT INTO `sc_tree_menu` VALUES ('258', null, '135', '网站库明细', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=webSiteLibrariesDetail');
INSERT INTO `sc_tree_menu` VALUES ('259', null, '145', '大文件分协议类型概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmBigFileOverview');
INSERT INTO `sc_tree_menu` VALUES ('260', null, '135', '网站库明细(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=webSiteLibrariesDetailSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('261', null, '145', '大文件分资源类型概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmBigFileResType');
INSERT INTO `sc_tree_menu` VALUES ('262', null, '117', 'IDC资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'dmIDCIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('263', null, '117', 'Cache资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'dmCacheIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('264', null, '117', '对等直连资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', '8', 'dmPDCIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('265', null, '117', 'CDN资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', '9', 'dmCDNIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('266', null, '259', '大文件分类型统计', '1', '1', null, 'default-icon', null, '1', 'tree', null, 'dmBigfileSizeType');
INSERT INTO `sc_tree_menu` VALUES ('268', null, '145', '大文件分大小概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmBigfileSizeType');
INSERT INTO `sc_tree_menu` VALUES ('269', null, '219', 'IDC资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmIDCIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('270', null, '219', 'Cache资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmCacheIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('271', null, '219', '对等直连资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmPDCIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('272', null, '219', 'CDN资源引入评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmCDNIntroduceEvalList.do');
INSERT INTO `sc_tree_menu` VALUES ('273', null, '383', 'IP地址核查', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'quartzTaskList.do');
INSERT INTO `sc_tree_menu` VALUES ('274', null, '6', '系统通用任务管理', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'scTaskmanagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('275', null, '147', 'IP地址库总览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmIpOverview');
INSERT INTO `sc_tree_menu` VALUES ('276', null, '151', '重要资源库概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=rmImportantResOverview');
INSERT INTO `sc_tree_menu` VALUES ('277', null, '159', '质差域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=dmQuaWorseDomainEval');
INSERT INTO `sc_tree_menu` VALUES ('278', null, '279', '下发接口类型配置', '1', '0', null, 'default-icon', null, '1', 'tree', null, '/ifReceinterfaceInfoList.do');
INSERT INTO `sc_tree_menu` VALUES ('279', null, '36', '接口配置', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('280', null, '279', '下发接口配置', '1', '0', null, 'default-icon', null, '1', 'tree', null, '/ifReceinterfaceServerInfoList.do');
INSERT INTO `sc_tree_menu` VALUES ('281', null, '39', 'IDC调度', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'IDCDispatcher.do');
INSERT INTO `sc_tree_menu` VALUES ('282', null, '39', '域名调度策略配置', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'domainDispatchPolicyConf.do');
INSERT INTO `sc_tree_menu` VALUES ('283', null, '39', '调度决策组(域名)', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'smDispatchDecisionGroupDomainList.do');
INSERT INTO `sc_tree_menu` VALUES ('284', null, '229', '归属评估概览', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=dmBelongEvalOverview');
INSERT INTO `sc_tree_menu` VALUES ('285', null, '229', '归属评估概览(二级平台)', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=dmBelongEvalOverviewSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('286', null, '218', '归属评估概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmmBelongEvalOverview');
INSERT INTO `sc_tree_menu` VALUES ('287', null, '218', '归属评估概览（二级平台）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmmBelongEvalOverviewSecondPlatform');
INSERT INTO `sc_tree_menu` VALUES ('289', null, '36', '资源采集', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('291', null, '289', '全网内容探测系统', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('292', null, '291', '域名资源', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dcDomainResource');
INSERT INTO `sc_tree_menu` VALUES ('293', null, '289', '智能DNS系统', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('294', null, '293', '热点数据上报', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dcHotDataReport');
INSERT INTO `sc_tree_menu` VALUES ('295', null, '289', '网站备案系统', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dcIcprrSiteTopnSystem');
INSERT INTO `sc_tree_menu` VALUES ('296', null, '289', 'DNS日志分析系统', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dnslLogSystem');
INSERT INTO `sc_tree_menu` VALUES ('297', null, '289', 'Cache系统', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('298', null, '297', '黑白名单上报请求', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dcCacheBlackWhiteListSetReq');
INSERT INTO `sc_tree_menu` VALUES ('299', null, '297', '热点内容视图上报', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dcCacheContentViewReportReq');
INSERT INTO `sc_tree_menu` VALUES ('301', null, '196', '考核管理支撑', '0', '0', null, null, null, '1', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('302', null, '301', '内容引入指标', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=contentIeadIntoIndicat');
INSERT INTO `sc_tree_menu` VALUES ('303', null, '221', '质差监测域名评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmmQuaWorseDomainEval');
INSERT INTO `sc_tree_menu` VALUES ('304', null, '279', 'NODEID配置', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'ifNodeidconfigurationList.do');
INSERT INTO `sc_tree_menu` VALUES ('305', null, '301', '服务质量指标', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmQualityIndicat');
INSERT INTO `sc_tree_menu` VALUES ('306', null, '383', '质量拨测', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'smDialtestTaskgroupManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('307', null, '220', '网站质量评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmmWebSiteQualityAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('308', null, '220', '域名质量评估', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'dmmDomainQualityList.do');
INSERT INTO `sc_tree_menu` VALUES ('309', null, '293', 'DNS解析规则下发', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=smDnsRuleResolveIssue');
INSERT INTO `sc_tree_menu` VALUES ('310', null, '2', 'TEST', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('311', null, '310', 'HeatMap', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=heatMapTest');
INSERT INTO `sc_tree_menu` VALUES ('312', null, '289', 'DPI系统', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dpiSystem');
INSERT INTO `sc_tree_menu` VALUES ('313', null, '229', '省内重复资源评估', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'portalAssemble.do?portalCode=dmWebSiteRepeatResEval');
INSERT INTO `sc_tree_menu` VALUES ('314', null, '39', '域名深度评估任务', '1', '0', null, 'default-icon', null, '1', 'tree', '10', 'smDomaindeepEvaluationTaskList.do');
INSERT INTO `sc_tree_menu` VALUES ('315', null, '156', '热点评估概览', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=hotEvalOverview');
INSERT INTO `sc_tree_menu` VALUES ('316', null, '116', '质量评估概览', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=dmQualityEvaluateOverview');
INSERT INTO `sc_tree_menu` VALUES ('317', null, '387', '调度概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmDispatchOverview');
INSERT INTO `sc_tree_menu` VALUES ('318', null, '40', '分析报告', '0', '0', null, null, null, '1', 'tree', '6', null);
INSERT INTO `sc_tree_menu` VALUES ('319', null, '318', '网站分析报告详情', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=analysisReport');
INSERT INTO `sc_tree_menu` VALUES ('320', null, '39', '同厂家大文件调度', '1', '0', null, 'default-icon', null, '1', 'tree', '11', 'portalAssemble.do?portalCode=smBigfileCacheViewDetail');
INSERT INTO `sc_tree_menu` VALUES ('321', null, '318', '网站分析报告', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=analysisReportHandler');
INSERT INTO `sc_tree_menu` VALUES ('322', null, '301', '资源报表', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('323', null, '322', '用户访问分析报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmUserVisitAnalysisReport');
INSERT INTO `sc_tree_menu` VALUES ('324', null, '322', '资源流量分析报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmResourceFlowAnalysisReport');
INSERT INTO `sc_tree_menu` VALUES ('325', null, '196', '缓存协同', '0', '0', null, null, null, '1', 'tree', '6', null);
INSERT INTO `sc_tree_menu` VALUES ('326', null, '325', '大文件协同统计', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=bigFileSynergy');
INSERT INTO `sc_tree_menu` VALUES ('327', null, '382', '标签库维护', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'scTagLibManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('328', null, '325', '大文件协同失误明细', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=bigFileSynFailure');
INSERT INTO `sc_tree_menu` VALUES ('329', null, '134', '分省资源概览', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=resourceViewProvince');
INSERT INTO `sc_tree_menu` VALUES ('330', null, '117', '各省未引入热点域名分析', '1', '0', null, 'default-icon', null, '1', 'tree', '12', 'portalAssemble.do?portalCode=dmProvinceUnintroduceHotdomainAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('331', null, '196', '调度场景', '0', '0', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('332', null, '331', '域名详细', '1', '0', null, 'default-icon', null, '1', 'tree', '8', 'portalAssemble.do?portalCode=domainDetail');
INSERT INTO `sc_tree_menu` VALUES ('333', null, '360', '全网资源报表', '0', '0', null, null, null, '1', 'tree', '5', null);
INSERT INTO `sc_tree_menu` VALUES ('334', null, '333', 'IDC引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=IDCReport');
INSERT INTO `sc_tree_menu` VALUES ('335', null, '331', '网内IDC有资源出网', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'SmInIDCResourceOut.do');
INSERT INTO `sc_tree_menu` VALUES ('336', null, '360', '分省资源报表', '0', '0', null, null, null, '1', 'tree', '6', null);
INSERT INTO `sc_tree_menu` VALUES ('337', null, '336', 'IDC引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=provinceIDCReport');
INSERT INTO `sc_tree_menu` VALUES ('338', null, '333', 'Cache引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=cacheReport');
INSERT INTO `sc_tree_menu` VALUES ('339', null, '333', '直连引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=PDNReport');
INSERT INTO `sc_tree_menu` VALUES ('340', null, '333', 'CDN引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=CDNReport');
INSERT INTO `sc_tree_menu` VALUES ('341', null, '333', '自定义引入报表', '1', null, null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=selfdefineReport');
INSERT INTO `sc_tree_menu` VALUES ('342', null, '336', 'Cache引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=provinceCacheReport');
INSERT INTO `sc_tree_menu` VALUES ('343', null, '336', '直连引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=provincePDCReport');
INSERT INTO `sc_tree_menu` VALUES ('344', null, '336', 'CDN引入报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=provinceCDNReport');
INSERT INTO `sc_tree_menu` VALUES ('345', null, '331', '网内Cache有资源出网', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'SmInCacheResourceOut.do');
INSERT INTO `sc_tree_menu` VALUES ('346', null, '331', '网内直连有资源出网', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'SmInDirectConResourceOut.do');
INSERT INTO `sc_tree_menu` VALUES ('347', null, '331', '网内CDN有资源出网', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'SmInCDNResourceOut.do');
INSERT INTO `sc_tree_menu` VALUES ('348', null, '331', '网内无资源可缓存', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'SmInNoResourceOut.do');
INSERT INTO `sc_tree_menu` VALUES ('349', null, '331', '调度执行', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'dispTaskManagerList.do');
INSERT INTO `sc_tree_menu` VALUES ('351', null, '310', 'baotaTest', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/websiteAnalysis_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('352', null, '331', '域名调度任务明细', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'domainDispatchTaskDetail.do');
INSERT INTO `sc_tree_menu` VALUES ('353', null, '383', '网站探测', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'SmWebSiteCrawlerTask.do');
INSERT INTO `sc_tree_menu` VALUES ('354', null, '383', '域名探测', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'SmDomainCrawlerTask.do');
INSERT INTO `sc_tree_menu` VALUES ('355', null, '134', '集团功能', '0', '0', null, null, null, '1', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('356', null, '384', '网内资源去重', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=idcCacheShare');
INSERT INTO `sc_tree_menu` VALUES ('357', null, '134', '分省网站引入视图', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=webSiteIntroView');
INSERT INTO `sc_tree_menu` VALUES ('358', null, '134', '分省域名引入视图', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=domainIntroView');
INSERT INTO `sc_tree_menu` VALUES ('359', null, '384', '本省资源去重', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=idcCacheRepeat');
INSERT INTO `sc_tree_menu` VALUES ('360', null, '133', '资源报表', '0', '0', null, null, null, '1', 'tree', '1', 'portalAssemble.do?portalCode=resourceTable');
INSERT INTO `sc_tree_menu` VALUES ('361', null, '369', 'TOP200全网热点域名', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=resReportWholeTOP200');
INSERT INTO `sc_tree_menu` VALUES ('362', null, '369', 'TOP200分省热点域名', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'portalAssemble.do?portalCode=resReportProvinceTOP200');
INSERT INTO `sc_tree_menu` VALUES ('363', null, '369', 'TOP1000全网热点域名', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=resReportAllTOP1000');
INSERT INTO `sc_tree_menu` VALUES ('364', null, '369', 'TOP1000分省热点域名', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=resReportProvinceTOP1000');
INSERT INTO `sc_tree_menu` VALUES ('365', null, '370', 'TOP10全网热点网站', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=resReportAllTOP10');
INSERT INTO `sc_tree_menu` VALUES ('366', null, '370', 'TOP10分省热点网站', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=resReportProvinceTOP10');
INSERT INTO `sc_tree_menu` VALUES ('367', null, '371', 'TOP10全网热点网站', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=resReportAllInOutTOP10');
INSERT INTO `sc_tree_menu` VALUES ('368', null, '371', 'TOP10分省热点网站', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=resReportProvinceInOutTOP10');
INSERT INTO `sc_tree_menu` VALUES ('369', null, '360', '热点域名网内外解析报表', '0', null, null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('370', null, '360', '热点网站点击比例报表', '0', null, null, null, null, '1', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('371', null, '360', '热点网站网内外比例报表', '0', null, null, null, null, '1', 'tree', '4', null);
INSERT INTO `sc_tree_menu` VALUES ('372', null, '384', '故障自主分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'realTimeErrorsChecked.do');
INSERT INTO `sc_tree_menu` VALUES ('373', null, '37', '监控面板', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('374', null, '373', '监控面板', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=monitorBoard');
INSERT INTO `sc_tree_menu` VALUES ('375', null, '325', '协同统计', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=cacheCollaborativeStatistics');
INSERT INTO `sc_tree_menu` VALUES ('376', null, '384', '异常流量检测', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'exceptionFlowChecked.do');
INSERT INTO `sc_tree_menu` VALUES ('377', null, '382', 'IP地址反查', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=ipwebisteAearch');
INSERT INTO `sc_tree_menu` VALUES ('378', null, '325', '去外网回源TOP100URL', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=cacheShareExtranetDomainTop100');
INSERT INTO `sc_tree_menu` VALUES ('379', null, '325', '去外网回源TOP100域名', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=cacheShareExtranetURLTop100');
INSERT INTO `sc_tree_menu` VALUES ('380', null, '325', '去外网回源文件后缀', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=cacheShareExtranetAllDomain');
INSERT INTO `sc_tree_menu` VALUES ('381', null, '325', '回源速率', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=extranetRate');
INSERT INTO `sc_tree_menu` VALUES ('382', null, '133', '基础资源库', '0', '0', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('383', null, '196', '任务管理', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('384', null, '196', '生产支撑', '0', '0', null, null, null, '1', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('385', null, '317', '调度概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmDispatchOverview');
INSERT INTO `sc_tree_menu` VALUES ('386', null, '317', '调度概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmDispatchOverview');
INSERT INTO `sc_tree_menu` VALUES ('387', null, '196', '调度概览', '0', '0', null, null, null, '1', 'tree', null, null);
INSERT INTO `sc_tree_menu` VALUES ('389', null, '156', '网站区间分析（全量）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/websiteAnalysis_all.html');
INSERT INTO `sc_tree_menu` VALUES ('390', null, '156', '网站区间分析（固网）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/websiteAnalysis.html');
INSERT INTO `sc_tree_menu` VALUES ('391', null, '156', '网站区间分析（移动）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/websiteAnalysis_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('392', null, '156', '域名区间分析（全量）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/domainAnalysis_all.html');
INSERT INTO `sc_tree_menu` VALUES ('393', null, '156', '域名区间分析（固网）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/domainAnalysis.html');
INSERT INTO `sc_tree_menu` VALUES ('394', null, '156', '域名区间分析（移动）', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/domainAnalysis_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('395', null, '333', 'TOP10000域名(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP10000_all_domain_all.html');
INSERT INTO `sc_tree_menu` VALUES ('396', null, '336', 'TOP10000域名(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/Top10000_province_domain_all.html');
INSERT INTO `sc_tree_menu` VALUES ('397', null, '331', '各省自主上报', '1', '0', null, 'default-icon', null, '1', 'tree', '7', 'SmProvincesLibertyReported.do');
INSERT INTO `sc_tree_menu` VALUES ('398', null, '333', 'TOP1000网站(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP1000_all_website_all.html');
INSERT INTO `sc_tree_menu` VALUES ('399', null, '336', 'TOP1000网站(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/top1000_province_website_all.html');
INSERT INTO `sc_tree_menu` VALUES ('401', null, '363', '视频调度查询', null, null, null, 'default-icon', null, null, null, null, null);
INSERT INTO `sc_tree_menu` VALUES ('402', null, '384', '视频调度查询', '1', '0', null, 'default-icon', null, '1', 'tree', '6', 'portalAssemble.do?portalCode=externalLxDispatch');
INSERT INTO `sc_tree_menu` VALUES ('403', null, '384', '可缓存域名分析', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'externalWebSiteController.do');
INSERT INTO `sc_tree_menu` VALUES ('404', null, '384', '缓存域名清单', '1', '0', null, 'default-icon', null, '1', 'tree', '5', 'portalAssemble.do?portalCode=externalWsDomainCache');
INSERT INTO `sc_tree_menu` VALUES ('405', null, '333', 'TOP10000域名(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP10000_all_domain_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('406', null, '333', 'TOP1000网站(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP1000_all_website_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('407', null, '336', 'TOP10000域名(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/Top10000_province_domain_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('408', null, '336', 'TOP1000网站(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/top1000_province_website_mobile.html');
INSERT INTO `sc_tree_menu` VALUES ('410', null, '310', 'ttttt', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=teeeeest');
INSERT INTO `sc_tree_menu` VALUES ('412', null, '411', '流量分析', '0', '0', null, null, null, '1', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('413', null, '411', '应用分析', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('414', null, '411', '系统分析', '0', '0', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('415', null, '412', '整体流量分析', '0', '0', null, null, null, '0', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('416', null, '415', '用户分析', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=flowAnalysisAllForUser');
INSERT INTO `sc_tree_menu` VALUES ('417', null, '415', '归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=flowAnalysisAllForBelong');
INSERT INTO `sc_tree_menu` VALUES ('418', null, '415', '应用分析', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=flowAnalysisAllForApp');
INSERT INTO `sc_tree_menu` VALUES ('419', null, '414', 'IDC评估', '0', '0', null, null, null, '1', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('420', null, '414', 'cache评估', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('421', null, '419', 'IDC关键指标', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=IDCKeyIndicator');
INSERT INTO `sc_tree_menu` VALUES ('422', null, '419', 'IDC内热点网站', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=IDCHotWebsite');
INSERT INTO `sc_tree_menu` VALUES ('423', null, '419', 'IDC优化建议', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=IDCOptimizeOffer');
INSERT INTO `sc_tree_menu` VALUES ('424', null, '412', '网内流量流向分析', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('425', null, '412', '网外流量分析', '0', '0', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('426', null, '412', '流量流向优化建议', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=flowOptimizationTips');
INSERT INTO `sc_tree_menu` VALUES ('427', null, '424', '用户分析', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=flowAnalysisInForUser');
INSERT INTO `sc_tree_menu` VALUES ('428', null, '424', '归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=flowAnalysisInForBelong');
INSERT INTO `sc_tree_menu` VALUES ('429', null, '424', '应用分析', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=flowAnalysisInForApp');
INSERT INTO `sc_tree_menu` VALUES ('430', null, '425', '用户分析', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=flowAnalysisOutForUser');
INSERT INTO `sc_tree_menu` VALUES ('431', null, '425', '归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=flowAnalysisOutForBelong');
INSERT INTO `sc_tree_menu` VALUES ('432', null, '425', '应用分析', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=flowAnalysisOutForApp');
INSERT INTO `sc_tree_menu` VALUES ('433', null, '454', 'TOP10网站分析', '1', '0', null, 'default-icon', null, '1', 'tree', '4', 'portalAssemble.do?portalCode=top10WebsiteAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('434', null, '133', '本省资源分布情况', '0', '0', null, null, null, '1', 'tree', '8', null);
INSERT INTO `sc_tree_menu` VALUES ('435', null, '434', '1.1.1 分网站类型查看网站引入情况', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v111WebsiteTypeIntroductionList.do');
INSERT INTO `sc_tree_menu` VALUES ('436', null, '434', '1.1.2 网站分系统引入情况', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v112WebsiteSystemIntroductionList.do');
INSERT INTO `sc_tree_menu` VALUES ('437', null, '434', '1.1.3 网站域名数量概览', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v113WebsiteDomainnumList.do');
INSERT INTO `sc_tree_menu` VALUES ('438', null, '133', '省内系统资源去重', '0', '0', null, null, null, '1', 'tree', '9', null);
INSERT INTO `sc_tree_menu` VALUES ('439', null, '438', '2.1.1 本省IDC与Cache系统的资源去重', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v211IdcCacheRepeatList.do');
INSERT INTO `sc_tree_menu` VALUES ('440', null, '438', '2.1.2 本省Cache与CDN之间的资源去重', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v212IdcCacheRepeatCmnetList.do');
INSERT INTO `sc_tree_menu` VALUES ('442', null, '133', '系统建设指导建议', '0', '0', null, null, null, '1', 'tree', '10', null);
INSERT INTO `sc_tree_menu` VALUES ('443', null, '133', '热点资源质量情况', '0', '0', null, null, null, '1', 'tree', '11', null);
INSERT INTO `sc_tree_menu` VALUES ('444', null, '133', '优质资源调度服务', '0', '0', null, null, null, '1', 'tree', '12', null);
INSERT INTO `sc_tree_menu` VALUES ('445', null, '442', '3.1.1 本省Top100的热点域名引入概览 ', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v311HotdomainSummaryList.do');
INSERT INTO `sc_tree_menu` VALUES ('446', null, '442', '3.1.2本省Top100的热点域名引入明细', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v312HotdomainMxList.do');
INSERT INTO `sc_tree_menu` VALUES ('447', null, '443', '4.1.1 网站访问质量', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v411WebsiteQualityList.do');
INSERT INTO `sc_tree_menu` VALUES ('448', null, '443', '4.1.2 域名访问质量', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v412DomainQualityList.do');
INSERT INTO `sc_tree_menu` VALUES ('449', null, '444', '5.1.1 网内已有资源却仍出网访问的Top100域名', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v511HotdomainNotcmnetList.do');
INSERT INTO `sc_tree_menu` VALUES ('450', null, '444', '5.1.2 出网且可调度至网内Top100域名的IP信息', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v512IpNotcmnetList.do');
INSERT INTO `sc_tree_menu` VALUES ('451', null, '420', 'P2Pcache评估', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=P2PcacheEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('452', null, '420', 'P2Pcache优化', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=P2PcacheOptimization');
INSERT INTO `sc_tree_menu` VALUES ('453', null, '413', 'P2P分析', '0', '0', null, null, null, '1', 'tree', '0', null);
INSERT INTO `sc_tree_menu` VALUES ('454', null, '413', 'HTTP分析', '0', '0', null, null, null, '1', 'tree', '1', null);
INSERT INTO `sc_tree_menu` VALUES ('455', null, '453', '用户分析', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=P2PUserAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('456', null, '453', '归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=P2PBelongAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('457', null, '434', '1.1.4 域名IP归属情况', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'v114DomainIpBelongSystemList.do');
INSERT INTO `sc_tree_menu` VALUES ('458', null, '454', '用户分析', '1', '0', null, 'default-icon', null, '1', 'tree', '0', 'portalAssemble.do?portalCode=HTTPUserAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('459', null, '454', '归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', '1', 'portalAssemble.do?portalCode=HTTPBelongAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('460', null, '454', '应用分析', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=HTTPAppAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('461', null, '453', '应用分析', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=P2PAppAnalysis');
INSERT INTO `sc_tree_menu` VALUES ('462', null, '420', 'WebCache评估', '1', '0', null, 'default-icon', null, '1', 'tree', '2', 'portalAssemble.do?portalCode=webCacheEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('463', null, '420', 'WebCache优化', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=WebCacheOptimize');
INSERT INTO `sc_tree_menu` VALUES ('464', null, '454', '优化建议', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=HTTPOptimizeSuggestion');
INSERT INTO `sc_tree_menu` VALUES ('465', null, '453', '优化建议', '1', '0', null, 'default-icon', null, '1', 'tree', '3', 'portalAssemble.do?portalCode=P2PAnalysisOptimize');
INSERT INTO `sc_tree_menu` VALUES ('466', null, '411', '专题分析', '0', null, null, null, null, '1', 'tree', '3', null);
INSERT INTO `sc_tree_menu` VALUES ('467', null, '466', '网站归属分析', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=webSiteBelongEvaluation');
INSERT INTO `sc_tree_menu` VALUES ('468', null, '466', '省内重复资源分析', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dmWebSiteRepeatResEval');
INSERT INTO `sc_tree_menu` VALUES ('469', null, '466', '调度纠错分析', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=dispCorrErrEval');
INSERT INTO `sc_tree_menu` VALUES ('470', null, '360', '本省资源报表', '0', '0', null, null, null, '1', 'tree', '2', null);
INSERT INTO `sc_tree_menu` VALUES ('471', null, '470', 'TOP10000域名(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/Top10000_province_domain_all_bj.html');
INSERT INTO `sc_tree_menu` VALUES ('472', null, '470', 'TOP1000网站(全网)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP1000_province_website_all_bj.html');
INSERT INTO `sc_tree_menu` VALUES ('473', null, '470', 'TOP10000域名(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/Top10000_province_domain_mobile_bj.html');
INSERT INTO `sc_tree_menu` VALUES ('474', null, '470', 'TOP1000网站(移动)', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'reports/TOP1000_province_website_mobile_bj.html');
INSERT INTO `sc_tree_menu` VALUES ('476', null, '360', '本网点击率报表', '1', '0', null, 'default-icon', null, '1', 'tree', null, 'portalAssemble.do?portalCode=inwebClickRateReport');

-- ----------------------------
-- Table structure for `sc_user`
-- ----------------------------
DROP TABLE IF EXISTS `sc_user`;
CREATE TABLE `sc_user` (
  `USER_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `USER_NAME` varchar(50) NOT NULL COMMENT '用户名',
  `ORG_CODE` varchar(50) NOT NULL COMMENT '机构代码',
  `USER_ALIAS` varchar(50) DEFAULT NULL COMMENT '用户中文名',
  `PASSWORD` varchar(50) DEFAULT NULL COMMENT '用户密码',
  `CELLPHONE_NUM` varchar(20) DEFAULT NULL COMMENT '移动电话',
  `PHONE_NUM` varchar(20) DEFAULT NULL COMMENT '固定电话',
  `EMAIL` varchar(50) DEFAULT NULL COMMENT '电子邮箱',
  `START_DATE` date DEFAULT NULL COMMENT '启用日期',
  `END_DATE` date DEFAULT NULL COMMENT '结束日期',
  `ACCOUNT_ENABLED` int(11) DEFAULT NULL COMMENT '用户启用',
  `ACCOUNT_EXPIRED` int(11) DEFAULT NULL COMMENT '用户失效',
  `ACCOUNT_LOCKED` int(11) DEFAULT NULL COMMENT '用户锁定',
  `CREDENTIALS_EXPIRED` int(11) DEFAULT NULL COMMENT '权限失效',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `SC_USER_IDX` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_user
-- ----------------------------
INSERT INTO `sc_user` VALUES ('1', 'admin', '10001', '中心管理员', 'Uu#KX)d%', '123456789', '010-12345678', 'admin@gmail.com', '2012-10-01', '2099-10-01', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('2', 'ydtest01', '10001', '移动测试用户01', '1q2w3e4r5T', '', '', '', '2012-11-08', '2013-01-02', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('3', 'ydtest02', '10001', '移动测试用户02', '1q2w3e4r5T', '', '', '', '2012-11-08', '2013-01-09', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('4', 'tdtest01', '10001', '移动测试用户03', '1q2w3e4r5T', '', '', '', '2012-11-08', '2013-01-09', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('5', 'fansi', '10001', 'fansi', 'i!xT.GEu', '', '', '', '2012-12-13', '2013-04-11', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('6', 'guest', '10001', '访问来宾', 'chinamobile', '123456789', '010-12345678', 'guest@gmail.com', '2012-10-01', '2099-10-01', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('7', 'root', '10001', 'root', 'i!xT.GEu', '', '', '', '2013-04-26', '2013-04-26', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('8', 'gd', '510000', '测试01', '123', '', '', '', '2013-10-20', '2018-10-31', '1', '0', '0', '0');
INSERT INTO `sc_user` VALUES ('12', 'test001', '100000', '测试测试', '1', '', '', '', '2014-03-17', '2014-03-17', '1', '0', '0', '0');

-- ----------------------------
-- Table structure for `sc_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sc_user_role`;
CREATE TABLE `sc_user_role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '序号',
  `USER_NAME` varchar(50) DEFAULT NULL COMMENT '用户名',
  `ROLE_NAME` varchar(30) NOT NULL COMMENT '角色名称',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `SC_USER_ROLE_IDX` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sc_user_role
-- ----------------------------
INSERT INTO `sc_user_role` VALUES ('1', 'admin', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('2', 'gd', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('3', 'ydtest02', 'ROLE_DEVELOP');
INSERT INTO `sc_user_role` VALUES ('4', 'tdtest01', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('6', 'fansi', 'ROLE_ANONYMOUS');
INSERT INTO `sc_user_role` VALUES ('7', 'guest', 'ROLE_SHOW');
INSERT INTO `sc_user_role` VALUES ('8', 'root', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('9', 'ceshi01', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('15', 'admin', 'ROLE_ADMIN');
INSERT INTO `sc_user_role` VALUES ('16', 'test001', 'ROLE_ADMIN');

-- ----------------------------
-- Table structure for `tb_ws_w_0001`
-- ----------------------------
DROP TABLE IF EXISTS `tb_ws_w_0001`;
CREATE TABLE `tb_ws_w_0001` (
  `WS_0001` int(11) NOT NULL,
  `WS_0002` varchar(255) NOT NULL,
  `WS_0004` char(4) NOT NULL,
  `WS_0005` varchar(20) NOT NULL,
  `WS_0006` char(4) NOT NULL,
  `WS_0007` varchar(20) NOT NULL,
  `PP_0103` varchar(8) NOT NULL,
  PRIMARY KEY (`WS_0001`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_ws_w_0001
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_ws_w_0003`
-- ----------------------------
DROP TABLE IF EXISTS `tb_ws_w_0003`;
CREATE TABLE `tb_ws_w_0003` (
  `WS_0004` varchar(20) NOT NULL,
  `WS_0005` varchar(20) NOT NULL,
  PRIMARY KEY (`WS_0004`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_ws_w_0003
-- ----------------------------

-- ----------------------------
-- Table structure for `temp1`
-- ----------------------------
DROP TABLE IF EXISTS `temp1`;
CREATE TABLE `temp1` (
  `op_0201` varchar(2000) DEFAULT NULL,
  `op_0102` varchar(100) NOT NULL DEFAULT '',
  `ws_0002` varchar(2000) DEFAULT NULL,
  `dd_0001` varchar(2000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp1
-- ----------------------------

-- ----------------------------
-- Table structure for `temp2`
-- ----------------------------
DROP TABLE IF EXISTS `temp2`;
CREATE TABLE `temp2` (
  `op_020c` varchar(100) NOT NULL DEFAULT '',
  `op_0102` varchar(100) NOT NULL DEFAULT '',
  `ws_0002` varchar(2000) DEFAULT NULL,
  `dd_0001` varchar(2000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp2
-- ----------------------------

-- ----------------------------
-- Table structure for `temp_20131104`
-- ----------------------------
DROP TABLE IF EXISTS `temp_20131104`;
CREATE TABLE `temp_20131104` (
  `op_0201` varchar(2000) DEFAULT NULL,
  `op_0101` varchar(2000) DEFAULT NULL,
  `ws_0002` varchar(2000) DEFAULT NULL,
  `dd_0001` varchar(2000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_20131104
-- ----------------------------

-- ----------------------------
-- Table structure for `temp_20131104_bak`
-- ----------------------------
DROP TABLE IF EXISTS `temp_20131104_bak`;
CREATE TABLE `temp_20131104_bak` (
  `op_0201` varchar(2000) DEFAULT NULL,
  `op_0101` varchar(2000) DEFAULT NULL,
  `ws_0002` varchar(2000) DEFAULT NULL,
  `dd_0001` varchar(2000) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of temp_20131104_bak
-- ----------------------------

-- ----------------------------
-- View structure for `view_video_resource`
-- ----------------------------
DROP VIEW IF EXISTS `view_video_resource`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `view_video_resource` AS select `p`.`id` AS `httpid`,`p`.`name` AS `name`,`p`.`episodes` AS `episodes`,`p`.`pageurl` AS `pageurl`,`p`.`swfurl` AS `swfurl`,`p`.`channel` AS `channel`,`p`.`host_id` AS `host_id`,`v`.`dpi` AS `dpi`,`v`.`idc` AS `idc`,sum(`v`.`size`) AS `video_size`,`p`.`addtime` AS `addtime` from (`http_videodownurl` `v` join `http_playurl` `p` on((`v`.`httpid` = `p`.`id`))) group by `v`.`httpid`,`v`.`dpi` ;

-- ----------------------------
-- Function structure for `AS_PERCENT`
-- ----------------------------
DROP FUNCTION IF EXISTS `AS_PERCENT`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `AS_PERCENT`(`aspercent` decimal(10,7),`point` smallint) RETURNS varchar(20) CHARSET utf8
BEGIN
	

	RETURN concat(ROUND(aspercent*100,point),'%');
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GET_IPID`
-- ----------------------------
DROP FUNCTION IF EXISTS `GET_IPID`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `GET_IPID`(ipvalue VARCHAR(20)) RETURNS bigint(20)
    DETERMINISTIC
BEGIN
	DECLARE  result bigint ;
	DECLARE ipintvalue bigint ;

	set ipintvalue = GET_IP_INTVALUE(ipvalue);
select IP_ID into result from rm_ip_manager where ipintvalue >= IP_START_INT AND ipintvalue <= IP_end_INT order by (IP_end_INT - IP_START_INT) limit 1;
return result;
end
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `GET_IP_INTVALUE`
-- ----------------------------
DROP FUNCTION IF EXISTS `GET_IP_INTVALUE`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `GET_IP_INTVALUE`(ipvalue varchar(20)) RETURNS bigint(20)
    DETERMINISTIC
BEGIN
	
	declare ip1 varchar(4);
	declare ip2 varchar(4);
	declare ip3 varchar(4);
	declare ip4 varchar(4);

	set ip1 = SPLIT_STR(ipvalue,'.',1);
	set ip2 = SPLIT_STR(ipvalue,'.',2);
	set ip3 = SPLIT_STR(ipvalue,'.',3);
	set ip4 = SPLIT_STR(ipvalue,'.',4);

	return (cast(ip1 as signed)*256*256*256 + cast(ip2 as signed)*256*256 + cast(ip3 as signed)*256 + cast(ip4 as signed));
END
;;
DELIMITER ;

-- ----------------------------
-- Function structure for `SPLIT_STR`
-- ----------------------------
DROP FUNCTION IF EXISTS `SPLIT_STR`;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `SPLIT_STR`(    x VARCHAR(255),    delim VARCHAR(12),    pos INT  ) RETURNS varchar(255) CHARSET utf8
    DETERMINISTIC
RETURN REPLACE(SUBSTRING(SUBSTRING_INDEX(x, delim, pos),         LENGTH(SUBSTRING_INDEX(x, delim, pos -1)) + 1),         delim, '')
;;
DELIMITER ;
