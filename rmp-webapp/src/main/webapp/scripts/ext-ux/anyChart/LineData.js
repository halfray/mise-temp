var LineData = Ext.extend(ChartData, {
			type : "line",
			default_series_type : 'Spline',
			dataDefaults : {
				charts : {
					chart : {
						data_plot_settings : {
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
