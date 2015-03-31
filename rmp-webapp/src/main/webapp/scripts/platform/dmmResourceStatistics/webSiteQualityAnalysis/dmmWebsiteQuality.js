base.portal.dmmWebsiteQuality = Ext.extend(Main.portal.PortalPage, {
			init : function(params) {
	
				var row = [
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '质量分数>=85', colspan: 3, align: 'center' },
				           { header: '质量分数>=60', colspan: 3, align: 'center' },
				           { header: '质量分数<60', colspan: 3, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' },
				           { header: '', colspan: 1, align: 'center' }
				          ];
				var group = new Ext.ux.grid.ColumnHeaderGroup({
				    rows: [row]
				});
				var columns = [
				{header:'id',dataIndex:'id',hidden:true},
				{header:'省份',dataIndex:'local',hidden:true},
				{header:'网站ID',dataIndex:'webSite_Id',hidden:true},
				{header:'网站',dataIndex:'webSite',width:100},
				{header:'域名数量',dataIndex:'domain_Count',width:100},
				{header:'本省引入率',dataIndex:'domain_In_Rate',width:100,
					renderer:function(value){
						return (value*100).toFixed(2)+'%';
					}
				},
				{header:'质量分数',dataIndex:'local_Avg_Quality',width:130},
				{header:'本省域名数量',dataIndex:'RQG_GT_85_LocalPDomain_Count',width:100},
				{header:'他省域名数量',dataIndex:'RQG_GT_85_otherPDomain_Count',width:100},
				{header:'外网域名数量',dataIndex:'RQG_GT_85_otherWDomain_Count',width:100},
				{header:'本省域名数量',dataIndex:'RQG_GT_60_LocalPDomain_Count',width:100},
				{header:'他省域名数量',dataIndex:'RQG_GT_60_otherPDomain_Count',width:100},
				{header:'外网域名数量',dataIndex:'RQG_GT_60_otherWDomain_Count',width:100},
				{header:'本省域名数量',dataIndex:'RQG_LD_60_LocalPDomain_Count',width:100},
				{header:'他省域名数量',dataIndex:'RQG_LD_60_otherPDomain_Count',width:100},
				{header:'外网域名数量',dataIndex:'RQG_LD_60_otherWDomain_Count',width:100},				
				{header:'DNS解析次数',dataIndex:'domainDNSResolNum',width:110},
				{header:'请求次数',dataIndex:'req_num',width:100},
				{header:'上行流量(MB)',dataIndex:'upload_Flow',width:100,renderer:Main.fun.getMFromByte},
				{header:'下行流量(MB)',dataIndex:'download_Flow',width:100,renderer:Main.fun.getMFromByte},
				{header:'总流量(MB)',dataIndex:'all_Flow',width:100,renderer:Main.fun.getMFromByte},
				{header:'更新日期',dataIndex:'updateDate',width:100}
				];
				var self = this;
				this.grid = new Ext.ux.Grid({
					dataMethod:'dmmWebSiteQualityAnalysisAction.getListWebsiteQuality',
					viewData:false,
					frame : false,
					border: false,
					plugins: group,
					columns:columns,
					columnLines : true,
					fetchSize : 10,					
					height:260,
					listeners : {
						rowclick : function() {
							var row = self.grid.getSelected();
							self.notice(row.data);
						}
					}
				});
			},
			updateData : function(data) {
				this.grid.updateParams(data);
			},
			render : function(div) {
				this.grid.render(div);
			},
			run : function(data){
				this.updateData(data);
			},
			refresh:function(data)
			{
				this.updateData(data);
			}
		});