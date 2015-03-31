/**
 * 
 * Cache协同统计
 */
base.portal.cacheCollaborativeStatistics = Ext.extend(Main.portal.PortalPage, {
	imports:['/scripts/platform/smBigFileSynergy/bigFileSynergy/common.js'],
	init : function(params){	
	 
	var self = this;
     this.synProvCombo = new Ext.form.ComboBox({
    	valueField: 'value',
    	name:'synProv',
    	displayField:'name',
    	value:'350000',
    	mode:'local',
    	typeAhead:true, 
    	triggerAction : 'all',
    	store:provinceAllStore
    });
	var province = new Ext.ux.seraph.DictCombo( {
		url : 'systemParmsProvider.do?type=TB_OP_W_0103_LIST',
		displayField : 'codeLabel',
		valueField : 'codeValue'
	});
     //统计开始时间
     this.Begin = new Ext.form.DateField({
    	 name:'Begin',
    	 value:new Date(),
    	 format:'Ymd'
     });
    //统计结束时间
     this.Finish = new Ext.form.DateField({
    	 name:'Query_time',
    	 value:new Date(),
    	 format:'Ymd'
     });
    
     this.search = new Ext.Button({
    		text : '查询',
    		iconCls: 'search-button', 
    		handler : upData
    	});
     this.reset = new Ext.Button({
    		text : '刷新',
    		iconCls: 'refresh-button', 
    		 handler : function()
    		{
    			var tbar = self.mainPanel.getTopToolbar();
    			var mainPanel = tbar.findByType('field');
    			for(var i = 0; i < mainPanel.length;i++)
    			{
    				mainPanel[i].reset();
    			}
     			upData();
    		} 
    	});
     function upData() {
    		var data = getData();
    		updateGrid(data);
    		//alert(Ext.encode(getData()));
    	}
     function getData() {    	 
    	 
    		var tbar =self.mainPanel.getTopToolbar();
    		var queryFields = tbar.findByType('field');
    		var data = {};
    		for(var i = 0; i < queryFields.length;i++)
    		{
    			data[queryFields[i].getName()] = queryFields[i].getValue();
    		}
//    		data.Begin=Ext.isEmpty(data.Begin)?"":data.Begin.format("Ymd");
//    		data.Query_time=Ext.isEmpty(data.Query_time)?"":data.Query_time.format("Ymd");
    		//alert(Ext.encode(data));
    		return data;
    	}
     
     function dispatchDetail(val,cell,record,rowIndex,columnIndex,store){
    		var domain = record.get("domain");
    		var contentId = Ext.id();   
    		var btn = createGridButton.defer(1, this, [contentId]);   
    		function createGridButton(){   
    		 return new Ext.Button({   
    			text: '局点信息',   
    			handler: function(){   
    			 	getDispatchResult(domain);
    			}   
    		}).render(document.body, contentId);   
    		}   
    		return('<div id="'+contentId+'"/>');  
    	}
      
     function getDispatchResult(domain){
    		
    		var resultColumns = [new Ext.grid.RowNumberer(),
    		  {header:'被调度IP',dataIndex:'ip',hidden:false,width:120},
    		  {header:'所属运营商',dataIndex:'operator',hidden:false,renderer:Ext.ux.renderer.Combo(operator),width:70},
    		  {header:'所属省份',dataIndex:'area',hidden:false,renderer:Ext.ux.renderer.Combo(province),width:70},
    		  {header:'所属系统',dataIndex:'system',hidden:false,renderer:Ext.ux.renderer.Combo(system),width:70},
    		  {header:'质量分',dataIndex:'quaScore',hidden:false,width:70},
    		  {header:'调度时间',dataIndex:'dispatchDate',hidden:false,width:130}];
    		
    		var resultGrid = new Ext.ux.Grid({
    			dataMethod : 'cacheCollaborativeStatistics.getDispatchResult',
    			columns : resultColumns,
    			width : 586,
    			height : 276,
    			border : false,
    			frame : false,
    			sortBar : false,
    			litePagingBar : true,
    			fetchSize : 10,
    			columnLines : true,
    			colspan : 8
    		});
    		
    		
    		
    	}
     
     function updateGrid(data)
     {
    	self.detailGrid.setParams(data);
    	self.detailGrid.doSearchList();
     }	
	 
	var columns = [ 
	              new Ext.grid.RowNumberer(),
//	              {header:'局点详细',renderer : dispatchDetail,width:70},
	              {header : '省份',dataIndex : 'province',width:100,hidden : false,
	            	  renderer: function(v, p, record, rowIndex, index, store)
	            	  {
						var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="showPolicy(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetDomainTop100\',\'缓存协同回源TOP域名列表\')"><span>', v , '</span></a>&nbsp;'].join('');
	            		}},
				  {header : '省份',dataIndex : 'Firm',width:100,hidden : true},
				  {header : '日期',dataIndex : 'Query_time',width:100,hidden : false},
	              {header : '回源总流量(GB)',dataIndex : 'Inquiries_total_flow',width:100,renderer:Ext.ux.renderer.Combo(synProvCombo),hidden : false,
					  renderer:function(value){
		          		return (value/1024/1024).toFixed(2);
	          	  	}},
	              {header:  '回源总次数',dataIndex: 'total_number_inquiries',hidden:false,width:100},
	              {header:  '去外网回源总流量(GB)',dataIndex: 'extranet_Inquiries_total_flow',hidden:false,width:150,
	            	  renderer:function(value){
		          		return (value/1024/1024).toFixed(2);
	          	  	}},
	              {header:  '去外网回源总次数',dataIndex: 'extranet_total_number_inquiries',hidden:false,width:150},
	              {header:  '去外网回源比例',dataIndex: 'scale',hidden:false,width:150,
	            	  renderer:function(value){
	            	  return (value*100).toFixed(2)+'%';
	          	  	}},
	              {header:  '去外网回源比例(按次数)',dataIndex: 'Frequency',hidden:false,width:150,
	          	  		renderer:function(value){
	            	  return (value*100).toFixed(2)+'%';
	          	  	}},
	              {header : '去外网回源域名TOP 100（按流量）',width : 200,
	            	  renderer: function(v, p, record, rowIndex, index, store){
						var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetDomainTop100\',\'缓存协同回源TOP域名列表\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	              {header : '去外网回源域名TOP 100(按次数)',width : 200,
	            	  renderer: function(v, p, record, rowIndex, index, store){
	          			var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetDomainTop100\',\'缓存协同回源TOP域名列表\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	              {header : '去外网回源URLTOP 100(按流量)',width : 200,
	            	  renderer: function(v, p, record, rowIndex, index, store){
	          			var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetURLTop100\',\'缓存协同回源TOPURL列表\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	              {header : '去外网回源URLTOP 100(按次数)',width : 200,
	            	  renderer: function(v, p, record, rowIndex, index, store){
	          			var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetURLTop100\',\'缓存协同回源TOPURL列表\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	              {header : '去外网回源完整域名+后缀列表',width : 200,
	            	  renderer: function(v, p, record, rowIndex, index, store){
					  	var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'cacheShareExtranetAllDomain\',\'缓存协同回源完整域名+后缀列表\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	              {header : '回源速率',width : 100,
	            	  renderer: function(v, p, record, rowIndex, index, store){
	          			var Firm = record.data.Firm;
						var Query_time = record.data.Query_time;
						
	            		return ['<a href="#" onclick="openWin(\''+Firm+'\',\''+Query_time+'\',\'extranetRate\',\'回源速率\')"><span>', '查询' , '</span></a>&nbsp;'].join('');}
	          	  },
	          	  	{header:  '回源成功率',
	          		  dataIndex: 'Source_Success_rate',
	          		  hidden:false,
	          		  width:100,
	          		  renderer:function(value){	          		return (value*100).toFixed(2)+'%';	          	  	}
	          	  }
              ];
				var self=this;
				this.data = {};
        	    this.detailGrid = new Ext.ux.Grid({
		    	dataMethod:'cacheCollaborativeStatistics.getList',
		    	viewData:false,
				frame : false,
				border: false,
				columns:columns,
		    	columnLines : true,
		    	fetchSize : 15
		    	});       	           	    
        	    this.mainPanel = new Ext.Panel({
					layout : 'fit',
					frame : true,
					baseCls : 'x-plain',
					tbar : [{
						text : '时间'},
						{
		                    xtype: 'searchComboBox', 
							dataMethod : 'reportExportForDateUtil.getCacheColl',
							dataParams: {table: 'dm_cacheshare_ago_Flow_Views'},
							width : 120,
							valueField : 'codeValue',
							displayField : 'codeLabel',
							id : 'Query_time',
							name : 'Query_time',
							hidden: false,
		                    maxLength: 128,
		                    anchor: '95%'
	                	},this.search,'-',this.reset],		
                     items : [this.detailGrid]       	    			
				});       	       
        },	        
		render : function(div) {
			var obj = (Ext.getDom(div));
			this.detailGrid.width = obj.offsetWidth-27;
			this.detailGrid.height = obj.offsetHeight-60;
			this.mainPanel.render(div);
		},
	
		run : function(data){
			this.upData();
		} 
});
var formPanel;
var html;
//var win;
function showPolicy(Firm, Query_time) {
	var map={};
	map.Query_time = Query_time;
	map.Firm = Firm;
	M.rpc._call(setQualityExpressions, 'cacheCollaborativeStatistics.getrecord',{
		javaClass : 'java.util.HashMap', map : map
	});
 }

function setQualityExpressions(result){
	html="";
	if(result!=null){
		html+='协同字节数: '+result.Collaborative_Bytes+'<br>';
		html+='协同文件个数: '+result.Collaborative_files+'<br>';
		html+='协同失败次数: '+result.Collaborative_failures+'<br>';
		html+=['<a href="#" onclick="openWin(\''+result.Firm+'\',\''+result.Query_time+'\',\'afterExtranetRate\',\'协同后回源速率\')"><span>', '协同后回源速率' , '</span></a>&nbsp;'].join('')+'<br>';
		html+='回源成功率: '+result.source_Success_rate+'<br>';
	}

	var win = new Ext.Window({
		id : 'window',
		width : 300,
		height : 300,
		title : '局点协同明细信息',
		html: html
	});
	win.show();
}

function openWin(Firm, Query_time, portalCode, text) {
 	
 	var data = {};
    data.Firm = Firm;
    data.Query_time = Query_time;
    var conf = {
		href : 'portalAssemble.do?portalCode='+portalCode+'&uxParams='+ encodeURI(Ext.encode(data)),
		text:  text,
		icon: '',
		tipinfo: '',
		params: data
	};
	Main.fun.openWin(conf, 'tab' );
}

