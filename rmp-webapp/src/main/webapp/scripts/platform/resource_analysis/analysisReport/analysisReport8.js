base.portal.analysisReport8 = Ext.extend(Main.portal.PortalPage, {
			imports : ['/scripts/anychart/AnyChart.js',
					'/scripts/anychart/AnyChartUtil.js',
					'/scripts/utils/main-funs-debug.js',
					'/scripts/ext-ux/anyChart/PieData.js'],
					
			links: ['/styles/platform/ui/base.css'],
			
			init : function(params) {
				
				this.panel = new Ext.Panel({
					width : 970,
					frame: true,
					baseCls : 'x-plain',
					html : '<div id="analysisReportResult"></div>'
				});
			},
			getData:function(data)
			{
				var mapData = {};
				mapData.webSiteId = data.webSiteId;
				M.rpc._call(Main.fun.Fun(this,this.updateData),"analysisReport8ResultService.getAnalysisReportResult", {
					javaClass: 'java.util.HashMap',
					map: mapData
				});	
			},
			updateData:function(data)
			{
				if (!data || data.result == null) {
					document.getElementById('analysisReportResult').innerHTML = '总结还未生成';
					return;
				}
	
				var resultArray = new Array();
				resultArray.push('<div class="sumUp_box">');
				resultArray.push('<div class="sumUp_title">该网站：<span>' + data.result.webSiteName + '</span></div>');
				resultArray.push('<ul class="sumUp">')
				resultArray.push('<li>资源数量：<span>' + data.result.resNum + '</span></li>');
				resultArray.push('<li>资源访问热度：<span>' + data.result.resHot + '</span></li>');
				resultArray.push('<li>本省引入率：<span>' + data.result.localIntroduce + ' </span></li>');
				resultArray.push('<li>重复引入情况：<span>' + data.result.repeatIntroduce + ' </span></li>');
				resultArray.push('<li>出网流量：<span>' + data.result.outFlow + '</span></li>');
				resultArray.push('<li>总体访问质量：<span>' + data.result.accessQuality + ' </span></li>');
				/*resultArray.push('<li>ICP调度错误率：<span>' + data.result.ICPErrorRate + '</span></li>');*/
				resultArray.push('</ul>')
				resultArray.push('</div>')
				var analysisReportResult = resultArray.join('');
				document.getElementById('analysisReportResult').innerHTML = analysisReportResult;
				
			},
			run:function()
			{
			},
			render : function(div) {
				var obj = (Ext.getDom(div));
				this.panel.width = obj.offsetWidth;
				this.panel.height = obj.offsetHeight;
				this.panel.render(div);
			},
			refresh : function(data) {
				this.getData(data);
			}
		});