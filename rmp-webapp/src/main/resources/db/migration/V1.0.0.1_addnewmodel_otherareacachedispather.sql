INSERT INTO `sc_tree_menu` (`ID`, `MENU_ID`, `PARENT_ID`, `TEXT`, `LEAF`, `DISABLED`, `ICON_CLS`, `VISIBILITY`, `TYPE`, `HREF_TARGET`) VALUES ('121', '8004', '80', '他省缓存域名调度', '1', '0', 'default-icon', '1', 'tree', 'otherAreaCacheDispatherList.do');
INSERT INTO `sc_role_menu` (`ID`, `ROLE_NAME`, `MENU_ID`) VALUES ('273', 'ROLE_ADMIN', '8004');

CREATE TABLE `sm_other_area_cache_dispatcher_log` (
`ID`  bigint NOT NULL AUTO_INCREMENT ,
`DAY_ID`  datetime NULL COMMENT '日期' ,
`DOMAIN_NAME`  varchar(2000) NULL COMMENT '被调度域名' ,
`IPS`  varchar(2000) NULL COMMENT '被调度IP，多个ip之间用逗号隔开' ,
`RESULT`  int NULL COMMENT '是否执行成功' ,
`OPERATOR`  varchar(200) NULL COMMENT '操作人' ,
PRIMARY KEY (`ID`)
)
;

