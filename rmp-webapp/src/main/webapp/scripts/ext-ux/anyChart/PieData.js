var PieData = Ext.extend(ChartData, {
			type : "pie",
			default_series_type : 'pie',
			dataDefaults : {
				charts : {
					chart : {
						plot_type : 'Pie',
						chart_settings : {
							legend : {
								 ignore_auto_item:true,
								items : {
									item : {
										"source" : "Points"
									}
								}
							},
							chart_background: {
					     	    "border": {
					     	      "enabled": "True",
					     	      "thickness": "1",
					     	      "type": "Solid",
					     	      "color": "#CCCCCC"
					     	    },
					     	    "fill": {
					     	      "type": "Solid",
					     	      "color": "#fafafa"
					     	    },
					     	    "corners": {
					     	        "all": "10",
					     	        "type": "Square"
					     	    },
					     	    "inside_margin": {
					     	    	"all": "5"
					     	    }
						}
						},
						data_plot_settings : {
							"pie_series" : {
								"label_settings" : {
									"position" : {
										"anchor" : "Center",
										"valign" : "Center",
										"halign" : "Center",
										"padding" : "20"
									}
								}
							}
						}
					}
				},
				"settings" : {
					"animation" : {
						"enabled" : "false"
					}
				}
			},
			formatDefaults : {
				valuePre : 0, // 展示数值的小数位
				perPre : 2, // 占比的百分位
				tooltipFormat : '{%Name}：{%Value}{numDecimals: #valuePre#} ',
				labelFormat : '{%YPercentOfSeries}{numDecimals:#perPre#}%',
				legendFomat : '{%Icon} {%Name} : {%Value}{numDecimals: #valuePre#} '
			}
		});
PieData.prototype.setPosition = function(text) {
	this.data.charts.chart.chart_settings.legend.position = text;
}
