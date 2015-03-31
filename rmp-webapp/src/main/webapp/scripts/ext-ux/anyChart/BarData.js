var BarData = Ext.extend(ChartData, {
			type : "bar",
			default_series_type : 'bar',
			dataDefaults : {
				charts : {
					chart : {
						data_plot_settings : {
							bar_series:
							{
								label_settings:{
									position:{
									},
									font:{
										color:'default'
									}
								}
							}
						}
					}
				}
			},
			formatDefaults : {
				valuePre :0, // 展示数值的小数位
				perPre : 2, // 占比的百分位
				tooltipFormat : '{%SeriesName}:{%YValue}{numDecimals:#valuePre#}',
				labelFormat : '{%YValue}{numDecimals:#valuePre#}',
				legendFomat : '{%Icon} {%Name}'
			}
		});
