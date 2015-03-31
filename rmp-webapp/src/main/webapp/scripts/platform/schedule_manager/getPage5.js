function getPage5()
{
	var trigger = Ext.extend(Ext.form.TriggerField, {
		hideTrigger:true,
		defaultAutoCreate : {tag: "textarea", autocomplete: "off",rows:10},
		triggerClass : 'x-form-ref-trigger',
		ipsName:[],
		ipsValue:[],
		ips : new Ext.util.MixedCollection(),
		setValue : function(value) {
			this.setRawValue('');
			this.ipsName=[];
			this.ipsValue=[];
			Ext.form.TriggerField.superclass.initComponent.call(this);
			this.userGrid.getStore().reload();
			this.leftIpStore.removeAll();
			this.rightIpStore.removeAll();
			if(!Ext.isEmpty(value))
			{
				var res = new Ajax("rmDomainManagerActions.do").call('getDomainsByIds',{ids:value});
				
				if(Ext.isEmpty(res)) res = [];
				
				this.leftgrid.getStore().loadData({list:res});
				
				this.ipsValue = value.split(",");
				ipsName = [];
				for(var i = 0; i<res.length;i++)
				{
					ipsName[i] = res[i].domainUrl;
				}
				Ext.form.ComboBox.superclass.setValue.call(this,value);
				this.setRawValue(ipsName.join("\r\n"));
			}else
			{
				Ext.form.ComboBox.superclass.setValue.call(this,value);
				this.setRawValue();
				this.leftgrid.getStore().loadData({list:[]});
			}
		  },
		setIpValue:function(value)
		{
			this.ips = new Ext.util.MixedCollection();
			if(Ext.isEmpty(value)) return;
			var self = this;
			for(var i =0 ;i < self.ipsValue.length;i++)
			{
				var domainId = self.ipsValue[i];
				var ipstr = value[domainId];
				if(!Ext.isEmpty(ipstr))
				{
					var iparray = ipstr.split(',');
					if(Ext.isArray(iparray))
					{
						var ipValueArr = [];
						for(var j = 0; j < iparray.length;j++)	//初始化 域名下的IP列表信息
						{
							var ipValue = {ipValue:iparray[j]};
							ipValueArr[j] = ipValue;
						}
						this.ips.add(domainId,ipValueArr);
					}
				}else
				{
					this.ips.add(domainId,[]);//初始化空列表,用于添加数据
				}
			}
		},
		getValue: function()
		{
			return this.ipsValue.join(",");
		},
		getIpValue:function()
		{
			var ipvalue = {};
			for(var i = 0; i<this.ipsValue.length;i++)
			{
				var domainId = this.ipsValue[i];
				var iparray = this.ips.key(domainId);
				var domainip = {};
				domainip[domainId] =  this.toIpstr(iparray);
				Ext.apply(ipvalue,domainip);
			}
			return {domainIpValue:ipvalue};
		},
		toIpstr:function(iparray)
		{
			if(Ext.isEmpty(iparray))return "";
			var resultarray = [];
			for(var i = 0; i < iparray.length; i++)
			{
				resultarray[i] = iparray[i].ipValue;
			}
			return resultarray.join(",");
		},
		initComponent : function() {
			Ext.form.TriggerField.superclass.initComponent.call(this);

			var newURL = {
				queryList : 'rmDomainManagerListProvider.do',
				action : 'rmDomainManagerAction.do'
			};
			var PK = ["domainId"];
			var CN = {
				0 : "域名ID",
				1 : "域名地址",
				2 : "域名名称",
				3 : "域名级别",
				4 : "域名状态",
				5 : "父域名id",
				6 : "父域名",
				7 : "泛域名ID",
				8 : "泛域名",
				9 : "创建时间",
				10 : "修改时间",
				11 : "操作人",
				12 : "数据来源",
				13 : "备注"
			};
			var EN = {
				0 : "domainId",
				1 : "domainUrl",
				2 : "domainName",
				3 : "domainLevel",
				4 : "domainState",
				5 : "fatherDomainId",
				6 : "fatherDomainUrl",
				7 : "mainDomainId",
				8 : "mainDomainurl",
				9 : "createTime",
				10 : "updateTime",
				11 : "operatorUser",
				12 : "dataSource",
				13 : "domainDesc",
				14 : "domainId_old"
			};

			var WD = {
				0 : "19",
				1 : 150,
				2 : "25",
				3 : "2",
				4 : "1",
				5 : "19",
				6 : "100",
				7 : "19",
				8 : "100",
				9 : "10",
				10 : "10",
				11 : "255",
				12 : "2",
				13 : "255"
			};
			var TY = {
				0 : "-5",
				1 : "string",
				2 : "string",
				3 : "1",
				4 : "1",
				5 : "-5",
				6 : "string",
				7 : "-5",
				8 : "string",
				9 : "date",
				10 : "date",
				11 : "string",
				12 : "1",
				13 : "string"
			};

			var storeFields = [{
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
						type : TY[10]
					}, {
						name : EN[11],
						type : TY[11]
					}, {
						name : EN[12],
						type : TY[12]
					}, {
						name : EN[13],
						type : TY[13]
					}, {
						name : EN[14],
						type : TY[0]
					}];
			var lvlurl = 'systemParmsProvider.do?type=TB_WS_W_0004_LIST';
			var lvlfield = new Ext.ux.seraph.DictCombo({
						name : EN[3],
						allowBlank : false,
						fieldLabel : CN[3],
						url : lvlurl,
						displayField : 'codeLabel',
						valueField : 'codeValue'
					});
			var userColumns = [{
						header : CN[0],
						width : WD[0],
						sortable : true,
						dataIndex : "domainId",
						hidden : true,
						hideable : false,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : CN[1],
						width : WD[1],
						id:'domainUrl',
						sortable : true,
						dataIndex : EN[1],
						hidden : false,
						hideable : false,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : CN[2],
						width : WD[2],
						sortable : true,
						dataIndex : EN[2],
						hidden : false,
						hideable : false,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : CN[3],
						width : WD[3],
						sortable : true,
						dataIndex : EN[3],
						hidden : false,
						hideable : false,
						editor : {
							xtype : 'textfield'
						},
						renderer : Ext.ux.renderer.Combo(lvlfield)
					}];

			var queryFields = [{
						text : CN[1]
					}, {
						xtype : 'textfield',
						id : '#domainUrl',
						width : 90
					}, {
						text : CN[3]
					}, new Ext.ux.seraph.DictCombo({
								id : '#domainLevel',
								width:100,
								url : 'systemParmsProvider.do?type=TB_WS_W_0004_LIST',
								displayField : 'codeLabel',
								valueField : 'codeValue'
							})];

			// 
			var queryParms = [{
						name : EN[1],
						indicator : 'EXAMPLE_LIKE'
					}, {
						name : EN[3],
						indicator : 'EXAMPLE_LIKE'
					}];
			var leftstore = new Ext.data.JsonStore({
						root : 'list',
						totalProperty : 'totalCount',
						fields : storeFields
					});
			var self = this;
			var userGridSelf = Ext.extend(Ext.ux.self.FormEditorGrid, {
				 buildSelectionModel : function() {
			    	return new Ext.grid.CheckboxSelectionModel();
			    },
						buildTbar : function(queryFields) {
							var gridSelf = this;
							return [{
								text : '添加',
								iconCls : 'dataTableList-add-icon',
								handler : function() {
									var recordArray = gridSelf.getSelectionModel().getSelections()
									if(Ext.isArray(recordArray))
									{
										for(var i = 0; i<recordArray.length;i++)
										{
											var record = recordArray[i];
											if(addDomainStore(leftstore,record))
											{
												self.leftgrid.getSelectionModel().selectRow(leftstore.getCount() - 1);
												self.addBlackLeftIpMap(record.data.domainId);
												self.loadLeftIpList(record.data.domainId);
											}
										}
									}
								}
							}, '-', queryFields, {
								text : '查询',
								iconCls : 'dataTable-preview-icon',
								handler : function() {
									gridSelf.loadData();
								}
							}, '-', {
								text : '刷新',
								iconCls : 'role-user-reset',
								handler : function() {
									gridSelf.clearData();
								}
							}]
						},
						listeners:{
							rowclick:function()
							{
								var record = this.getSelectionModel().getSelected();
								var list = new Ajax('rmTaskGroups.do').call('getIpsByDomainUrl',{domainId:record.data.domainUrl});
								if(!Ext.isEmpty(list) && list.length>0)
								{
									self.rightIpStore.loadData({list:list});
									self.loadLeftIpList(record.data.domainId);
								}else
								{
									self.rightIpStore.removeAll();
								}
							}
						}
					});
			var formFields = [];
			this.userGrid = new userGridSelf({
						width : 300,
						height : 430,
						autoExpandColumn :'domainUrl',
						style:'border-right:solid 1px #add9c0;',
						storeFields : storeFields,
						formFields : formFields,
						queryFields : queryFields,
						queryParms : queryParms,
						columns : userColumns,
						pk : PK,
						url : newURL
					});
			this.userGrid.un('rowdblclick', this.userGrid.onUpdate,
					this.userGrid);

			var sm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
			this.leftgrid = new Ext.grid.GridPanel({
				width : 150,
				height : 430,
				border: false,
				autoExpandColumn :'domainUrl',
				style:'border-right:solid 1px #add9c0;',
				columns : [sm].concat([{
						header : CN[0],
						width : WD[0],
						sortable : true,
						dataIndex : "domainId",
						hidden : true,
						hideable : false,
						editor : {
							xtype : 'textfield'
						}
					}, {
						header : CN[1],
						width : WD[1],
						id:'domainUrl',
						sortable : true,
						dataIndex : EN[1],
						hidden : false,
						hideable : false,
						editor : {
							xtype : 'textfield'
						}
					}]),
				sm : sm,
				tbar : [{
		    		text:'下载模板',
		    		iconCls:'toolbar-down-icon',
		    		handler:function()
		    		{
		    			window.open(path+'/scripts/platform/schedule_manager/domainTemplate.xls');
		    		}
		    	},{
		    		text:'上传文件',
		    		iconCls:'toolbar-up-icon',
		    		handler:function(){upload(self);}
		    	},{
					text : '删除',
					iconCls : 'dataTableList-delete-icon',
					scope : this,
					handler : function() {

						var gridSelf = this.leftgrid;

						var record = gridSelf.getSelectionModel().getSelected();
						if (!record) {
							Ext.Msg.alert('提示', '请先选择一条记录！');
							return;
						}
						gridSelf.getStore().remove(record);
						self.removeLeftIpMap(record.data.domainId);
					}
				}],
				listeners:{
					rowclick:function()
					{
						var record = this.getSelectionModel().getSelected();
						self.loadLeftIpList(record.data.domainId);
					}
				},
				store : leftstore
			});

			
			var ipstoreFields = [{name:'ipValue',type:'string'}];
			this.leftIpStore = new Ext.data.JsonStore({
						root : 'list',
						totalProperty : 'totalCount',
						fields : ipstoreFields
					});
			var IpColumns = [{
						header : 'IP',
						id:'ip',
						width : '80',
						sortable : true,
						dataIndex : "ipValue",
						hidden : false,
						hideable : false
					}];
			var leftIpSm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
			this.leftIpGrid = new Ext.grid.GridPanel({
				width : 100,
				height : 430,
				border: false,
				style:'border-right:solid 1px #add9c0;',
				columns : [leftIpSm].concat(IpColumns),
				sm : leftIpSm,
				tbar : [{
					text : '删除',
					iconCls : 'dataTableList-delete-icon',
					scope : this,
					handler : function() {
						var gridSelf = this.leftIpGrid;
						var record = gridSelf.getSelectionModel().getSelected();
						if (!record) {
							Ext.Msg.alert('提示', '请先选择一条记录！');
							return;
						}
						var currdomainid = self.leftgrid.getSelectionModel().getSelected().data.domainId;
						var ipValue = self.leftIpGrid.getSelectionModel().getSelected().data;
						self.removeLeftIp(currdomainid,ipValue);
					}
				}],
				store : this.leftIpStore
			}); 
			this.rightIpStore = new Ext.data.JsonStore({
						root : 'list',
						totalProperty : 'totalCount',
						fields : ipstoreFields
					});

			var rightIpSm = new Ext.grid.CheckboxSelectionModel({
						singleSelect : true
					});
			this.rightIpGrid = new Ext.grid.GridPanel({
				width : 100,
				height : 430,
				border: false,
				columns : [rightIpSm].concat(IpColumns),
				sm : rightIpSm,
				tbar : [{
					text : '添加',
					iconCls : 'dataTableList-add-icon',
					scope : this,
					handler : function() {;
					var record = self.rightIpGrid.getSelectionModel().getSelected();
					if (!record) {
						Ext.Msg.alert('提示', '请先选择一条记录！');
						return;
					}
					var currdomainid = self.userGrid.getSelectionModel().getSelected().data.domainId;
					var ipvalue = record.data;
					self.addLeftIp(currdomainid,ipvalue);
						
					}
				}],
				store : this.rightIpStore
			}); 
		},
		loadLeftIpList:function(domainId)
		{
			var store = this.leftgrid.getStore();
			var index = store.findBy(function(record){
				if(record.data.domainId == domainId)
					return true;
			});
			if(index!=-1)
			{
				this.leftgrid.getSelectionModel().selectRow(index);
				var iparray = this.ips.key(domainId);
				if(!Ext.isEmpty(iparray))
					this.leftIpStore.loadData({list:iparray});
				else
					this.leftIpStore.removeAll();
			}
		},
		addBlackLeftIpMap:function(domainId)
		{
			var iparray = new Array();
			this.ips.add(domainId,iparray);
		},
		removeLeftIpMap:function(domainId)
		{
			this.ips.removeKey(domainId);
		},
		addLeftIp:function(domainId,ipValue)
		{
			var iparray = this.ips.key(domainId);
			if(Ext.isArray(iparray))
			{
				if(!ArrayUtil.contains(iparray,ipValue,function(obj,value){return obj.ipValue == value.ipValue})) 
				{
					iparray[iparray.length]=ipValue;
				}else
				{
					Ext.Msg.alert('提示','IP已存在!');
				}
				this.loadLeftIpList(domainId);
			}else
			{
				Ext.Msg.alert('提示','请先添加域名');
			}
		},
		removeLeftIp:function(domainId,ipValue)
		{
			var iparray = this.ips.key(domainId);
			var obj = ArrayUtil.get(iparray,ipValue,function(obj,value){return obj.ipValue == value.ipValue});
				iparray.remove(obj);
			this.loadLeftIpList(domainId);
		},
		addList:function(list)
		{
			var recordTmp = Ext.data.Record.create([
			     {name: 'domainId', mapping: 'domainId'},
				{name: 'domainUrl', mapping: 'domainUrl'}
				]);
			for(var i = 0;i < list.length;i++)
			{
				var record = new recordTmp(list[i]);
				addDomainStore(this.leftgrid.getStore(),record);
			}
		},
		onTriggerClick : function() {
			var self = this;
			var win = new Ext.Window({
				title:'域名配置',
				width : 950,
				autoHeight:true,
//				height : 500,
				closeAction : 'hide',
				buttonAlign : 'center',
				items : [{
							xtype : 'panel',
							layout : 'column',
							baseCls: 'x-plain',
							items : [{
										layout : 'fit',
										baseCls: 'x-plain',
										columnWidth : .23,
										items : [self.leftgrid]
									}, {
										layout : 'fit',
										baseCls: 'x-plain',
										columnWidth : .12,
										items : [self.leftIpGrid]
									},{
										layout : 'fit',
										baseCls: 'x-plain',
										columnWidth : .53,
										items : [self.userGrid]
									},{
										layout : 'fit',
										baseCls: 'x-plain',
										columnWidth : .12,
										items : [self.rightIpGrid]
									}]
						}],
				buttons : [{
					text : '确定',
					handler : function() {
						self.ipsName = [];
						self.ipsValue = [];
						var store = self.leftgrid.getStore();
						store.each(function(record) {
									self.ipsName[self.ipsName.length] = record.data.domainUrl;
									self.ipsValue[self.ipsValue.length] = record.data.domainId;
								});
						self.setRawValue(self.ipsName.join("\r\n"));
						win.hide();
					}
				}, {
					text : '取消',
					handler : function() {
						win.hide();
					}
				}]

			});
			win.show();
		}
	});


	var name = new Ext.form.TextField({
			fieldLabel : '任务组名称',
			allowBlank:false,
			maxLength:200,
			name : 'taskName'
		});
		
	var domain = new trigger({
			fieldLabel : '域名与IP配置',
			name : 'domains',
			editable:false
		});
	var main = new Ext.form.FormPanel({
		id : "c5",
//		title:'任务组名及关联域名和IP配置',
		items:[name,domain],
		defaults:{width:250},
		baseCls: 'x-plain',
		re:function()
		{
			this.getForm().reset();
			name.setValue();
			domain.setValue();
			domain.setIpValue();
		},
		isValueValid:function()
		{
			return true;
		},
		getAllValues:function()
		{
			var values =  this.getForm().getFieldValues();
			var domainip = domain.getIpValue();
			Ext.apply(values,domainip);
			return values;
		},
		setAllValues:function(values)
		{
			this.getForm().setValues(values);
			domain.setIpValue(values.domainIps);
		},
		getWinWidth:function(){return 614;},
		getWinHeight:function(){return 430;}
	})
	
	return main;
}