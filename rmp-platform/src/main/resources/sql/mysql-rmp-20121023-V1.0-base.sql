DROP TABLE rpt_column_meta;
CREATE TABLE rpt_column_meta ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', COL_NAME varchar(50) COMMENT '报表物理列名', COL_ALIAS varchar(50) COMMENT '报表中文列名', COL_INDEX int COMMENT '报表列索引', COL_TYPE int COMMENT '报表列类型', TOTAL_ENABLE int COMMENT '是否合计', SUB_TOTAL_ENABLE int COMMENT '是否小计', VISIBLE int COMMENT '是否可见', PRIMARY KEY (ID), CONSTRAINT Index_1 UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE rpt_formula;
CREATE TABLE rpt_formula ( ID double NOT NULL AUTO_INCREMENT COMMENT '序号', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', ROW_INDEX int COMMENT '报表行索引', COL_INDEX int COMMENT '报表列索引', RPT_FORMULA varchar(200) COMMENT '报表公式', PRIMARY KEY (ID), CONSTRAINT RPT_FORMULA_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE rpt_instance;
CREATE TABLE rpt_instance ( ID double NOT NULL AUTO_INCREMENT COMMENT '序号', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', ORG_CODE varchar(50) NOT NULL COMMENT '机构代码', RPT_DATE date COMMENT '报表日期', RPT_STATUS int COMMENT '报表状态', AUDIT_STATUS int COMMENT '审核状态', AUDIT_DATE date COMMENT '审核日期', AUDIT_USER_NAME varchar(50) COMMENT '审核人用户名', AUDIT_USER_ALIAS varchar(50) COMMENT '审核人中文名', AUDIT_MSG varchar(200) COMMENT '审核人意见', LOCKED int COMMENT '锁状态', PRIMARY KEY (ID), CONSTRAINT RPT_INSTANCE_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE rpt_meta;
CREATE TABLE rpt_meta ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', RPT_NAME varchar(50) COMMENT '报表名称', STORAGE_TYPE int COMMENT '存储类型', PHYSICS_TABLE varchar(50) COMMENT '物理表名', TEMPLATE_PATH varchar(200) COMMENT '模板路径', DESCRIPTION varchar(200) COMMENT '描述', PRIMARY KEY (ID), CONSTRAINT RPT_INFO_IDX UNIQUE (ID), INDEX AK_AK_RPT_META (RPT_CODE) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE rpt_template;
CREATE TABLE rpt_template ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', PHYSICS_TABLE varchar(50) COMMENT '物理表名', TEMPLATE_PATH varchar(200) COMMENT '模板路径', PRIMARY KEY (ID), CONSTRAINT Index_1 UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE sc_global_parm;
CREATE TABLE sc_global_parm ( ID int NOT NULL AUTO_INCREMENT COMMENT 'ID', PARM_CODE varchar(50) NOT NULL COMMENT '参数代码', PARM_NAME varchar(50) NOT NULL COMMENT '参数名称', PARM_VALUE varchar(50) NOT NULL COMMENT '参数值', DESCRIPTION varchar(100) COMMENT '描述', PRIMARY KEY (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统全局参数信息表';
DROP TABLE sc_opt;
CREATE TABLE sc_opt ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', OPT_CODE varchar(20) NOT NULL COMMENT '操作代码', OPT_NAME varchar(20) COMMENT '操作名称', DESCRIPTION varchar(100) COMMENT '描述', PRIMARY KEY (ID), CONSTRAINT SC_OPT_IDX1 UNIQUE (ID), INDEX AK_AK_SC_OPT (OPT_CODE), INDEX SC_OPT_IDX2 (OPT_CODE) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE sc_org;
CREATE TABLE sc_org ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', ORG_CODE varchar(50) NOT NULL COMMENT '机构代码', ORG_NAME varchar(50) COMMENT '机构名称', ORG_SHORT_NAME varchar(20) COMMENT '机构简称', ORG_LEVEL int COMMENT '机构等级', PRIMARY KEY (ID), CONSTRAINT SC_ORG_IDX UNIQUE (ID), INDEX AK_AK_SC_ORG (ORG_CODE) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_org (ID, ORG_CODE, ORG_NAME, ORG_SHORT_NAME, ORG_LEVEL) values (1, '10001', '中国', '中国', 100);
insert into sc_org (ID, ORG_CODE, ORG_NAME, ORG_SHORT_NAME, ORG_LEVEL) values (3, '20001', '北京市', '北京市', 200);
DROP TABLE sc_org_relation;
CREATE TABLE sc_org_relation ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', CURR_ORG_CODE varchar(50) COMMENT '本级机构代码', PARENT_ORG_CODE varchar(50) COMMENT '上级机构代码', LEAF_SIGN int COMMENT '有无下级机构', PRIMARY KEY (ID), CONSTRAINT SC_ORG_REL_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='国家，省，市，县';
insert into sc_org_relation (ID, CURR_ORG_CODE, PARENT_ORG_CODE, LEAF_SIGN) values (2, '20001', '10001', 1);
DROP TABLE sc_org_seq;
CREATE TABLE sc_org_seq ( ORG_CODE varchar(50) NOT NULL COMMENT '部门编号', CUR_SEQ int NOT NULL COMMENT '当前序列', PRIMARY KEY (ORG_CODE) ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部门序列参数表';
insert into sc_org_seq (ORG_CODE, CUR_SEQ) values ('10001', 0);
insert into sc_org_seq (ORG_CODE, CUR_SEQ) values ('20001', 16);
DROP TABLE sc_parm_info;
CREATE TABLE sc_parm_info ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', PARM_CODE varchar(50) NOT NULL COMMENT '字典代码', PARM_NAME varchar(100) NOT NULL COMMENT '字典名称', TYPE_CODE varchar(50) NOT NULL COMMENT '类型代码', PARM_SORT int COMMENT '排序', DESCRIPTION varchar(200) COMMENT '描述', PRIMARY KEY (ID), CONSTRAINT SC_PARM_INFO_IDX1 UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (-2, '0', '否', 'BOOLEAN_VALUE', 2, null);
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (-1, '1', '是', 'BOOLEAN_VALUE', 1, null);
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (1, '200', '二级机构', 'ORG_LEVEL', 2, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (2, '100', '一级机构', 'ORG_LEVEL', 1, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (3, '300', '三级机构', 'ORG_LEVEL', 3, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (4, '1', '1月', 'TIME_MONTH', 1, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (5, '2', '2月', 'TIME_MONTH', 2, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (6, '3', '3月', 'TIME_MONTH', 3, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (7, '4', '4月', 'TIME_MONTH', 4, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (8, '5', '5月', 'TIME_MONTH', 5, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (9, '6', '6月', 'TIME_MONTH', 6, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (10, '7', '7月', 'TIME_MONTH', 7, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (11, '8', '8月', 'TIME_MONTH', 8, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (12, '9', '9月', 'TIME_MONTH', 9, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (13, '10', '10月', 'TIME_MONTH', 10, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (14, '11', '11月', 'TIME_MONTH', 11, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (15, '12', '12月', 'TIME_MONTH', 12, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (32, '2001', '2001', 'FINCAL_YEAR', 1, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (33, '2002', '2002', 'FINCAL_YEAR', 2, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (34, '2003', '2003', 'FINCAL_YEAR', 3, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (35, '2004', '2004', 'FINCAL_YEAR', 4, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (36, '2005', '2005', 'FINCAL_YEAR', 5, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (37, '2006', '2006', 'FINCAL_YEAR', 6, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (38, '2007', '2007', 'FINCAL_YEAR', 7, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (39, '2008', '2008', 'FINCAL_YEAR', 8, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (40, '2009', '2009', 'FINCAL_YEAR', 9, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (41, '2010', '2010', 'FINCAL_YEAR', 10, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (42, '2011', '2011', 'FINCAL_YEAR', 11, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (43, '2012', '2012', 'FINCAL_YEAR', 12, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (44, '2013', '2013', 'FINCAL_YEAR', 13, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (45, '2014', '2014', 'FINCAL_YEAR', 14, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (46, '2015', '2015', 'FINCAL_YEAR', 15, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (47, '2016', '2016', 'FINCAL_YEAR', 16, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (48, '2017', '2017', 'FINCAL_YEAR', 17, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (49, '2018', '2018', 'FINCAL_YEAR', 18, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (50, '2019', '2019', 'FINCAL_YEAR', 19, '');
insert into sc_parm_info (ID, PARM_CODE, PARM_NAME, TYPE_CODE, PARM_SORT, DESCRIPTION) values (51, '2020', '2020', 'FINCAL_YEAR', 20, '');
DROP TABLE sc_parm_type;
CREATE TABLE sc_parm_type ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', TYPE_CODE varchar(50) NOT NULL COMMENT '类型代码', TYPE_NAME varchar(100) NOT NULL COMMENT '类型名称', SYSTEM_SIGN int COMMENT '是否系统类型', PRIMARY KEY (ID), CONSTRAINT SC_PARM_TYPE_IDX UNIQUE (TYPE_CODE), INDEX AK_AK_SC_PARM_TYPE (TYPE_CODE) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_parm_type (ID, TYPE_CODE, TYPE_NAME, SYSTEM_SIGN) values (-1, 'BOOLEAN_VALUE', '布尔值', 1);
insert into sc_parm_type (ID, TYPE_CODE, TYPE_NAME, SYSTEM_SIGN) values (1, 'ORG_LEVEL', '机构等级', 1);
insert into sc_parm_type (ID, TYPE_CODE, TYPE_NAME, SYSTEM_SIGN) values (2, 'TIME_MONTH', '月份维度', 1);
insert into sc_parm_type (ID, TYPE_CODE, TYPE_NAME, SYSTEM_SIGN) values (6, 'FINCAL_YEAR', '年度', 1);
DROP TABLE sc_role;
CREATE TABLE sc_role ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', ROLE_NAME varchar(30) NOT NULL COMMENT '角色名称', ROLE_ALIAS varchar(30) COMMENT '角色别名', DESCRIPTION varchar(50) COMMENT '角色描述', PRIMARY KEY (ID), CONSTRAINT SC_ROLE_IDX1 UNIQUE (ID), INDEX AK_AK_AUTH_ROLE_INFO (ROLE_NAME), INDEX SC_ROLE_IDX2 (ROLE_NAME) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_role (ID, ROLE_NAME, ROLE_ALIAS, DESCRIPTION) values (1, 'ROLE_ADMIN', '系统管理员', '结控中心系统管理员');
insert into sc_role (ID, ROLE_NAME, ROLE_ALIAS, DESCRIPTION) values (2, 'ROLE_TEST', '系统测试员', '系统测试员');
insert into sc_role (ID, ROLE_NAME, ROLE_ALIAS, DESCRIPTION) values (3, 'ROLE_DEVELOP', '系统开发员', '系统开发员');
DROP TABLE sc_role_menu;
CREATE TABLE sc_role_menu ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', ROLE_NAME varchar(30) NOT NULL COMMENT '角色名称', MENU_ID int NOT NULL COMMENT '菜单ID', PRIMARY KEY (ID), CONSTRAINT SC_ROLE_MENU_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (1, 'ROLE_ADMIN', -1);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (2, 'ROLE_ADMIN', -2);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (3, 'ROLE_ADMIN', -10);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (4, 'ROLE_ADMIN', -101);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (5, 'ROLE_ADMIN', -102);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (6, 'ROLE_ADMIN', -20);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (7, 'ROLE_ADMIN', -201);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (8, 'ROLE_ADMIN', -202);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (9, 'ROLE_ADMIN', -203);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (14, 'ROLE_ADMIN', -30);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (15, 'ROLE_ADMIN', -301);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (16, 'ROLE_ADMIN', -302);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (23, 'ROLE_ADMIN', -204);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (33, 'ROLE_ADMIN', -103);
insert into sc_role_menu (ID, ROLE_NAME, MENU_ID) values (34, 'ROLE_ADMIN', -104);
DROP TABLE sc_role_opt;
CREATE TABLE sc_role_opt ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', ROLE_NAME varchar(30) NOT NULL COMMENT '角色名称', OPT_CODE varchar(20) NOT NULL COMMENT '操作代码', PRIMARY KEY (ID), CONSTRAINT SC_ROLE_OPT_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE sc_role_rpt;
CREATE TABLE sc_role_rpt ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', ROLE_NAME varchar(30) NOT NULL COMMENT '角色名称', RPT_CODE varchar(50) NOT NULL COMMENT '报表代码', PRIMARY KEY (ID), CONSTRAINT SC_ROLE_RPT_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE sc_tree_menu;
CREATE TABLE sc_tree_menu ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', MENU_ID int NOT NULL COMMENT '菜单ID', PARENT_ID int NOT NULL COMMENT '父菜单ID', TEXT varchar(50) NOT NULL COMMENT '菜单名称', LEAF varchar(5) COMMENT '是否叶子结点', DISABLED varchar(5) COMMENT '禁用', CLS varchar(10) COMMENT '节点样式', ICON_CLS varchar(50) COMMENT '节点图标', HREF varchar(100) COMMENT '链接', VISIBILITY varchar(10) COMMENT '可见', TYPE varchar(10) COMMENT '菜单类型', SORT int COMMENT '排序', HREF_TARGET varchar(100) COMMENT '链接目标', PRIMARY KEY (ID), CONSTRAINT SC_TREE_MENU_IDX UNIQUE (MENU_ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (1, -1, 0, '菜单', 'false', 'false', null, null, null, null, 'tree', 1, null);
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (2, -2, 0, '配置', 'false', 'false', null, null, null, null, 'tree', 2, null);
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (3, -10, -2, '权限管理', 'false', 'false', null, null, null, null, 'tree', 1, null);
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (4, -101, -10, '系统用户管理', 'true', 'false', null, null, null, null, 'tree', 1, 'baseRecordList.do?bean=scUser&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (5, -102, -10, '角色菜单管理', 'true', 'false', null, null, null, null, 'tree', 2, 'baseRecordList.do?bean=scRoleMenu&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (6, -20, -2, '系统管理', 'false', 'false', null, null, null, null, 'tree', 1, null);
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (7, -201, -20, '参数类型管理', 'true', 'false', null, null, null, null, 'tree', 1, 'baseRecordList.do?bean=scParmType&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (8, -202, -20, '参数信息管理', 'true', 'false', null, null, null, null, 'tree', 2, 'baseRecordList.do?bean=scParmInfo&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (9, -203, -20, '系统缓存刷新', 'true', 'false', null, null, null, null, 'tree', 3, 'cacheRefresh.do');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (10, -30, -2, '机构管理', 'false', 'false', null, null, null, null, 'tree', 1, null);
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (11, -301, -30, '机构信息管理', 'true', 'false', null, null, null, null, 'tree', 1, 'baseRecordList.do?bean=scOrg&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (12, -302, -30, '机构关系管理', 'true', 'false', null, null, null, null, 'tree', 2, 'baseRecordList.do?bean=scOrgRelation&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (19, -204, -20, '全局参数管理', 'true', 'false', null, null, null, null, 'tree', null, 'baseRecordList.do?bean=scGlobalParm&module=systemconfig');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (30, -103, -10, '角色管理', 'true', 'false', null, null, null, null, 'tree', 1, 'baseRecordList.do?bean=scRole&module=authorization');
insert into sc_tree_menu (ID, MENU_ID, PARENT_ID, TEXT, LEAF, DISABLED, CLS, ICON_CLS, HREF, VISIBILITY, TYPE, SORT, HREF_TARGET) values (31, -104, -10, '用户角色关系', 'true', 'false', null, null, null, null, 'tree', 1, 'baseRecordList.do?bean=scUserRole&module=authorization');
DROP TABLE sc_user;
CREATE TABLE sc_user ( USER_ID int NOT NULL AUTO_INCREMENT COMMENT '序号', USER_NAME varchar(50) NOT NULL COMMENT '用户名', ORG_CODE varchar(50) NOT NULL COMMENT '机构代码', USER_ALIAS varchar(50) COMMENT '用户中文名', PASSWORD varchar(50) COMMENT '用户密码', CELLPHONE_NUM varchar(20) COMMENT '移动电话', PHONE_NUM varchar(20) COMMENT '固定电话', EMAIL varchar(50) COMMENT '电子邮箱', START_DATE date COMMENT '启用日期', END_DATE date COMMENT '结束日期', ACCOUNT_ENABLED int COMMENT '用户启用', ACCOUNT_EXPIRED int COMMENT '用户失效', ACCOUNT_LOCKED int COMMENT '用户锁定', CREDENTIALS_EXPIRED int COMMENT '权限失效', PRIMARY KEY (USER_ID), CONSTRAINT SC_USER_IDX UNIQUE (USER_ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_user (USER_ID, USER_NAME, ORG_CODE, USER_ALIAS, PASSWORD, CELLPHONE_NUM, PHONE_NUM, EMAIL, START_DATE, END_DATE, ACCOUNT_ENABLED, ACCOUNT_EXPIRED, ACCOUNT_LOCKED, CREDENTIALS_EXPIRED) values (1, 'admin', '20001', '中心管理员', 'admin', '123456789', '010-12345678', 'admin@gmail.com', '2012-10-01', '2099-10-01', 1, 0, 0, 0);
DROP TABLE sc_user_role;
CREATE TABLE sc_user_role ( ID int NOT NULL AUTO_INCREMENT COMMENT '序号', USER_NAME varchar(50) COMMENT '用户名', ROLE_NAME varchar(30) NOT NULL COMMENT '角色名称', PRIMARY KEY (ID), CONSTRAINT SC_USER_ROLE_IDX UNIQUE (ID) ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
insert into sc_user_role (ID, USER_NAME, ROLE_NAME) values (1, 'admin', 'ROLE_ADMIN');
