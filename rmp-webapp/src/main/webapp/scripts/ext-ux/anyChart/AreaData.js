var AreaData = Ext.extend(ChartData, {
			type : "area",
			default_series_type : 'SplineArea',
			dataDefaults : {
				charts : {
					chart : {
						data_plot_settings : {
							area_series : {
								"marker_settings" : {
									"enabled" : "True",
									"marker" : {
										"type" : "Circle",
										"size" : "6"
									}
								},
								area_style : {
									fill : {
										"opacity" : "0.5"
									}
								}
							}
						}
					}
				}
			},
			formatDefaults : {
				valuePre : 0, // 展示数值的小数位
				perPre : 2, // 占比的百分位
				tooltipFormat : '{%SeriesName}:{%YValue}{numDecimals:#valuePre#}',
				labelFormat : '{%YValue}{numDecimals:#valuePre#}',
				legendFomat : '{%Icon} {%Name}'
			}
		});
