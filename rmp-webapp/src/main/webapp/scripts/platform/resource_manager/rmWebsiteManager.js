/**
 * rmWebsiteManager.js Power by YUI-EXT and JSON.
 * 
 * @author
 * @email
 */

var rmWebsiteManager = {
	author : "xxx",
	version : "1.0"
};

// -> Action URL
var URL = {
	queryList : 'rmWebsiteManagerListProvider.do',
	action : 'rmWebsiteManagerAction.do'
};

// -> Primary key
var PK = [ "websiteId" ];

// -> Column name in Chinese. e.g: CN[1]
var CN = {
	0 : "网站主键",
	1 : "网站",
	2 : "网站主页",
	3 : "网站类型",
	4 : "网站状态",
	5 : "创建时间",
	6 : "修改时间",
	7 : "操作人",
	8 : "数据来源",
	9 : "备注"
};

// -> Column name in English
var EN = {
	0 : "websiteId",
	1 : "websiteName",
	2 : "websiteUrl",
	3 : "websiteType",
	4 : "websiteState",
	5 : "createTime",
	6 : "updateTime",
	7 : "operatorUser",
	8 : "dataSource",
	9 : "websiteDesc",
	10 : "websiteId_old"
};

// -> Cell width
var WD = {
	0 : "19",
	1 : "150",
	2 : "150",
	3 : "15",
	4 : "1",
	5 : "10",
	6 : "10",
	7 : "255",
	8 : "2",
	9 : "255"
};

// -> Data type e.g: float,int,string
var TY = {
	0 : "-5",
	1 : "string",
	2 : "string",
	3 : "string",
	4 : "1",
	5 : "string",
	6 : "string",
	7 : "string",
	8 : "1",
	9 : "string"
};

var storeFields = [ {
	name : EN[0],
	type : TY[0]
}, {
	name : EN[1],
	type : TY[1]
}, {
	name : EN[2],
	type : TY[2]
}, {
	name : EN[3],
	type : TY[3]
}, {
	name : EN[4],
	type : TY[4]
}, {
	name : EN[5],
	type : TY[5]
}, {
	name : EN[6],
	type : TY[6]
}, {
	name : EN[7],
	type : TY[7]
}, {
	name : EN[8],
	type : TY[8]
}, {
	name : EN[9],
	type : TY[9]
}, {
	name : EN[10],
	type : TY[0]
}, {
	name : 'relation',
	type : 'string'
}, {
	name : 'domains',
	type : 'string'
}, {
	name : 'icp',
	type : 'string'
} ];

var ipsName = [];
var ipsValue = [];
var webSiteRecordNums = [];

var webtype = new Ext.ux.seraph.DictCombo( {
	url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST',
	displayField : 'codeLabel',
	width:120,
	valueField : 'codeValue'
});

var trigger = Ext.extend(
				Ext.form.TriggerField,
				{
					hideTrigger : true,
					defaultAutoCreate : {
						tag : "textarea",
						autocomplete : "off",
						rows : 10
					},
					triggerClass : 'x-form-ref-trigger',
					setValue : function(value) {
						this.setRawValue('');
						Ext.form.ComboBox.superclass.initComponent.call(this);

						var map = {
							ids : value,
							websiteId : Ext.getCmp('websiteId').getValue()
						};
						var res = M.rpc._call("rmWebSiteDomainRelationAction.getDomainsByIds", {
									javaClass : "java.util.HashMap",
									map : map
								});

						if (Ext.isEmpty(res))
							res = [];

						this.leftgrid.getStore().loadData( {
							list : res
						});
						//this.userGrid.getStore().reload();

						ipsValue = value.split(",");
						ipsName = [];
						for ( var i = 0; i < res.length; i++) {
							ipsName[i] = res[i].domainId;
							// ipsName[i] = res[i].domainUrl;
							webSiteRecordNums[i] = res[i].webSiteRecordNum;
						}
						this.setRawValue(ipsName.join("\r\n"));
					},

					initComponent : function() {

						Ext.form.ComboBox.superclass.initComponent.call(this);

						var storeFields = [ {
							name : 'domainId',
							type : 'string'
						},{
							name : 'webSiteRecordNum',
							type : 'string'
						}];
						
						var leftstore = new Ext.data.JsonStore( {
							root : 'list',
							totalProperty : 'totalCount',
							fields : storeFields
						});

						var userColumns = [ {
							header : '域名',
							width : 210,
							sortable : true,
							dataIndex : 'domainId',
							editor:new Ext.form.TextField({
								name:'domainId'
							})
						},{
							header : '网站备案号',
							width : 210,
							sortable : true,
							dataIndex : 'webSiteRecordNum',
							editor:new Ext.form.TextField({
								name:'webSiteRecordNum'
							})
						}];
						var sm = new Ext.grid.CheckboxSelectionModel( {
							singleSelect : true
						});
						this.leftgrid = new Ext.grid.EditorGridPanel( {
							border : false,
							frame : false,
							style : 'border-right:solid 1px #add9c0;',
							width : 466,
							height : 386,
							autoScroll : true,
							columns : [ sm ].concat(userColumns),
							sm : sm,
							columnLines : true,
							tbar : [ {
								text : '添加',
								iconCls : 'dataTableList-add-icon',
								scope : this,
								handler : function() {

									var gridSelf = this.leftgrid;

									var record = new Ext.data.Record({
										domainId : '',
										webSiteRecordNum : ''
									});
									gridSelf.getStore().add(record);
								}
							},{
								text : '删除',
								iconCls : 'dataTableList-delete-icon',
								scope : this,
								handler : function() {

									var gridSelf = this.leftgrid;

									var record = gridSelf.getSelectionModel()
											.getSelected();
									if (!record) {
										Ext.Msg.alert('提示', '请先选择一条记录！');
										return;
									}
									gridSelf.getStore().remove(record);
								}
							} ],
							store : leftstore
						});

					},
					onTriggerClick : function() {
						var self = this;
						var win = new Ext.Window(
								{
									width : 480,
									height : 454,
									closeAction : 'hide',
									buttonAlign : 'center',
									items : [ {
										xtype : 'panel',
										layout : 'column',
										baseCls : 'x-plain',
										items : [ {
											layout : 'fit',
											baseCls : 'x-plain',
											//columnWidth : .35,
											items : [ self.leftgrid ]
										}/*, {
											layout : 'fit',
											baseCls : 'x-plain',
											columnWidth : .65,
											items : [ self.userGrid ]
										} */]
									} ],
									buttons : [
											{
												text : '确定',
												handler : function() {
													ipsName = [];
													ipsValue = [];
													webSiteRecordNums = [];
													var store = self.leftgrid
															.getStore();
													store.each(function(record) {
																ipsName[ipsName.length] = record.data.domainId;
																ipsValue[ipsValue.length] = record.data.domainId;
																webSiteRecordNums[webSiteRecordNums.length] = record.data.webSiteRecordNum;
															});
													self.setRawValue(ipsName.join("\r\n"));
													Ext.getCmp('webSiteRecordNum').setValue(webSiteRecordNums.join(","));
													win.hide();
												}
											}, {
												text : '取消',
												handler : function() {
													win.hide();
												}
											} ]

								});
						win.show();
					}
				});
var regex=/^\S*$/;
var formFields = [ {
	id : EN[0],
	name : EN[0],
	fieldLabel : CN[0],
	xtype : 'textfield',
	hidden : true
}, {
	id : EN[1],
	name : EN[1],
	maxLength : 150,
	regex : regex,
	regexText : '任务号中不能包含空格!',
	fieldLabel : CN[1],
	xtype : 'textfield',
	allowBlank : false
}, {
	id : EN[2],
	name : EN[2],
	regex : regex,
	regexText : '任务号中不能包含空格!',
	maxLength : 1000,
	fieldLabel : CN[2],
	xtype : 'textfield',
	allowBlank : false
},
/*
 * new Ext.ux.seraph.DictCombo( { name : EN[3], fieldLabel : CN[3], allowBlank :
 * false, url : 'systemParmsProvider.do?type=TB_WS_W_0003_LIST', displayField :
 * 'codeLabel', valueField : 'codeValue' }),
 */
new Ext.ux.TreeField( {
	id : EN[3],
	name : EN[3],
	fieldLabel : CN[3],
	allowBlank : false,
	dataMethod : 'webSiteTypeTreeActionController.getTreeField',
	displayField : 'text',
	valueField : 'id',
	listWidth : 230,
	onlyLeafSelect : true,
	rootVisible : false,
	layerHeight : 250
}), {
	id : EN[4],
	name : EN[4],
	fieldLabel : CN[4],
	xtype : 'textfield',
	allowBlank : false,
	hidden : true,
	value : 1
}, {
	id : EN[5],
	name : EN[5],
	fieldLabel : CN[5],
	xtype : 'textfield',
	hidden : true
}, {
	id : EN[6],
	name : EN[6],
	fieldLabel : CN[6],
	xtype : 'textfield',
	hidden : true
}, {
	id : EN[7],
	name : EN[7],
	fieldLabel : CN[7],
	xtype : 'textfield',
	hidden : true
}, {
	id : EN[8],
	name : EN[8],
	fieldLabel : CN[8],
	xtype : 'textfield',
	value : 1,
	hidden : true
}, {
	id : 'icp',
	name : 'icp',
	fieldLabel : 'ICP',
	xtype : 'textfield',
	hidden : false
},
// {id: "relation", name:"relation", fieldLabel:'关联域名', xtype:
// 'textarea',hidden:false},
new trigger( {
	id : "domains",
	name : "domains",
	fieldLabel : '关联域名',
	hidden : false,
	editable : false
}), {
	id : EN[9],
	name : EN[9],
	maxLength : WD[9],
	fieldLabel : CN[9],
	xtype : 'textarea',
	hidden : false
}, {
	id : 'webSiteRecordNum',
	name : 'webSiteRecordNum',
	fieldLabel : '网站备案号',
	xtype : 'textfield',
	hidden : true
} ];

var userColumns = [ {
	header : CN[0],
	width : WD[0],
	sortable : true,
	dataIndex : EN[0],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[1],
	width : 200,
	sortable : true,
	dataIndex : EN[1],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[2],
	width : 250,
	sortable : true,
	dataIndex : EN[2],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[3],
	width : 120,
	sortable : true,
	dataIndex : EN[3],
	hidden : false,
	hideable : false,
	editor : {
		xtype : 'textfield'
	},
	renderer : Ext.ux.renderer.Combo(webtype)
}, {
	header : CN[4],
	width : WD[4],
	sortable : true,
	dataIndex : EN[4],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : 'ICP',
	width : 150,
	sortable : true,
	dataIndex : 'icp'
}, {
	header : '关联域名',
	width : 300,
	sortable : true,
	dataIndex : 'domains',
	hidden : false,
	hideable : false
}, {
	header : CN[5],
	width : WD[5],
	sortable : true,
	dataIndex : EN[5],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[6],
	width : WD[6],
	sortable : true,
	dataIndex : EN[6],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[7],
	width : WD[7],
	sortable : true,
	dataIndex : EN[7],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[8],
	width : WD[8],
	sortable : true,
	dataIndex : EN[8],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
}, {
	header : CN[9],
	width : WD[9],
	sortable : true,
	dataIndex : EN[9],
	hidden : true,
	hideable : false,
	editor : {
		xtype : 'textfield'
	}
} ];

// TODO: default xtype, width
var typeList = new Ext.ux.TreeField( {
	dataMethod : 'webSiteTypeTreeActionController.getTreeField',
	displayField : 'text',
	valueField : 'id',
	width : 120,
	onlyLeafSelect : true,
	rootVisible : false,
	layerHeight : 250,
	readonly:true,
	id : '#websiteType'
});

//typeList.on('expand',function(){
//	var root = typeList.root;
//	findchildnode(root);
//	root.collapseChildNodes(true);
//})

	//获取所有的子节点 
//function findchildnode(node){
//	 var childnodes = node.childNodes;
//	 Ext.each(childnodes, function (){ //从节点中取出子节点依次遍历
//		 var nd = this;
//		 nd.getUI().addClass("x-treenodeColor");
//		 if(nd.hasChildNodes()){ //判断子节点下是否存在子节点
//			 nd.expand(false,false,function(){
//				 findchildnode(nd); //如果存在子节点 递归
//			 });
//		 }
//	 });
//}

var queryFields = [ {
	text : '网站'
}, {
	xtype : 'textfield',
	id : '#websiteName'
},{
	text : '网站主页'
}, {
	xtype : 'textfield',
	id : '#websiteUrl'
}, {
	text : '网站类型'
}, typeList ];

// 
var queryParms = [ {
	name : EN[1],
	indicator : 'EXAMPLE_LIKE'
}, {
	name : EN[2],
	indicator : 'EXAMPLE_LIKE'
}, {
	name : EN[3],
	indicator : 'EXAMPLE_EQUALS'
} ];
function trim(str) { // 删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
Ext.onReady(function() {

	Ext.QuickTips.init();
	
	  var userGridSlef = Ext.extend(Ext.ux.self.FormEditorGrid,{
	    	 buildTbar : function(queryFields) {
	    	var gridSelf = this;
	    	return [{
	            text: '添加',
	            iconCls: 'dataTableList-add-icon',
	            scope: this,
	            handler : gridSelf.onCreate
		    }, '-', {
		        text: '修改',
		        iconCls: 'dataTableList-modify-icon',
	            scope: this,
		        handler: gridSelf.onUpdate
		    }, '-', {
	            text: '删除',
	            iconCls: 'dataTableList-delete-icon',
	            scope: this,
	            handler : gridSelf.onDelete
		    },'-',{
	    		text:'下载模板',
	    		iconCls:'toolbar-down-icon',
	    		handler:function()
	    		{
	    			window.open(path+'/scripts/platform/resource_manager/网站映射表模板.xls');
	    		}
	    	},'-',{
	    		text:'上传文件',
	    		iconCls:'toolbar-up-icon',
	    		handler:upload
	    	},'-', queryFields, {
	    		text : '<span style="margin-left:20px;">查询</span>',
	    		cls:'search-button',
	    		minWidth:82,
	    		height:27,
	        	handler : function() {
	        		gridSelf.loadData();
	        	}
	        }, '-', {
	        	text : '<span style="margin-left:20px;">刷新</span>',
	        	cls: 'refresh-button', 
	        	minWidth:82,
	        	height:27,
	        	handler : function() {
	        		gridSelf.clearData();
	        	}
	        }]
	    }
	    });
	  
	  function upload(){
	    	var form = uploadForm();
	    	   var wWindow = new Ext.Window	({									//定义对象
	    	  	    width: 500,													//宽度
	    	  	    height:200,													//高度
	    	  	    layout: 'fit',												//布局方式		
	    	  	    plain:true,													//
	    	  	    modal : true,												//产出阴影,遮盖其他部分
	    	  	    bodyStyle:'padding:5px;',													
	    	  	    buttonAlign:'center',										//按钮摆放位置
	    	  	    items: form,											//将定义的form放在window上	
	    	  	    buttons: [{													//按钮
	    	  	      text: '提交',
	    	  	      handler: createObject//按钮触发的方法
	    	  	    },{
	    	  	      text: '取消',
	    	  	      handler: cancel
	    	  	    }]
	    	  	  });
	    	  	  
	    	  	  wWindow.show();
	    		  function cancel(){wWindow.close();}
	    		  function createObject(){
    				 if(form.getForm().isValid()){
    					form.getForm().submit({
    						waitTitle:'信息',
                            waitMsg:'正在提交，请稍候……',
    						url:path+"/webSiteUpload.do",
    						success:function(form,action){
    							if(action.result.msg == 'checkHeadFaile'){
    								Ext.Msg.alert("内容", '上传文件格式不对,请确认后再上传',
      										function() {
      									         wWindow.close();
      									         userGrid.getStore().reload();
      										});
    							}else{
    								
    								if(action.result.msg == 'checkFaile'){//
          								
          								Ext.Msg.alert("内容", '上传文件校验没通过,点击确定导出校验结果',
          										function() {
          									           wWindow.close();
          									           window.open('exportCheckWebsiteMsg.do');
          										});
          								
          							}else{
          								
          								Ext.Msg.alert("内容", action.result.msg,
          										function() {
          											wWindow.close();
          											userGrid.getStore().reload();
          										});
          								
          							}
    								
    							}
    							
    						},
    						failure : function(form, action) {
								Ext.Msg.alert("内容", action.result.msg);
							}
    					 });
    				  }
	    		  }
	    	function uploadForm(){	
	    			var name = new Ext.form.TextField({
						allowBlank : false,
						inputType:'file',
						fieldLabel : '上传文件',
						blankText : "请选择上传的文件",
						invalidText : "上传文件不能为空",
						name : 'uploadFile',
						anchor : '90%'
					});
	    			var objectForm = new Ext.form.FormPanel({
						frame:true,
						baseCls: 'x-plain',
						fileUpload:true,			//设置为上传
						items : [name]
					});
	    			return objectForm;
	    	}
	    }
	

	Ext.ux.self.FormEditor = Ext.extend(Ext.ux.seraph.FormEditor, {
		doSave1 : function() {
			var windowSelf = this;
			this.formPanel.getForm().findField('createTime').setValue(new Date().format('Ymd'));
			this.formPanel.getForm().findField('updateTime').setValue(new Date().format('Ymd'));
			if (this.formPanel.getForm().isValid()) {
				var websiteName = this.formPanel.getForm().findField('websiteName').getValue();
				var websiteUrl = this.formPanel.getForm().findField('websiteUrl').getValue();
				if (Ext.isEmpty(trim(websiteName))) {
					Ext.Msg.alert('Error', '网站名称不能为空格');
					return false;
				}
				if (Ext.isEmpty(trim(websiteUrl))) {
					Ext.Msg.alert('Error', '网站主页不能为空格');
					return false;
				}
				if (!Ext.isEmpty(ipsName)) {
					Ext.getCmp('domains').setRawValue(ipsValue.join(","));
				}
				if(!Ext.isEmpty(webSiteRecordNums)){
					Ext.getCmp('webSiteRecordNum').setValue(webSiteRecordNums.join(","));
				}
				var record = this.formPanel.form.getFieldValues(); // 修改行,获取valueField数据
				
				var old_record = this.formPanel.oldRecord;
				if (old_record) {
					this.setOldValues(record, old_record);
				}

				this.formPanel.form.submit( {
					url : windowSelf.gridPanel.url.action,
					method : 'post',
					success : function(form, action) {
						windowSelf.hide();
						windowSelf.gridPanel.store.reload();
					},
					failure : function(form, action) {
						windowSelf.hide();
						Ext.Msg.alert('温馨提示', action.result.msg);
					},
					params : {
						action : this.formPanel.actionType,
						record : Ext.util.JSON.encode(record)
					},
					clientValidation : true,
					waitMsg : Message.waitMsg
				});
			}
	}
	});

	var userGrid = new userGridSlef( {
		renderTo : 'user-grid',
		width : Ext.get("content").getWidth(),
		height : Ext.get("content").getHeight(),
		storeFields : storeFields,
		formFields : formFields,
		queryFields : queryFields,
		queryParms : queryParms,
		columns : userColumns,
		pk : PK,
		url : URL
	});

	userGrid.setDefVal( {
		websiteState : 1,
		dataSource : 1
	})
});