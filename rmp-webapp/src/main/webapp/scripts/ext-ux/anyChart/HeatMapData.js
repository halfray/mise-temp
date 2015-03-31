var HeatMapData = Ext.extend(ChartData, {
			type : "heatMap",
			default_series_type : 'pie',
			dataDefaults : {
					    "charts": {
					      "chart": {
					        "plot_type": "HeatMap",
					        "palettes": {
					          "palette": {
					            "name": "custom",
					            "type": "Distinct",
					            "item": [
					              { "color": "#00A957" },
					              { "color": "#4DBA72" },
					              { "color": "#9CD088" },
					              { "color": "#D1E4A0" },
					              { "color": "#F0F2B8" }
					            ]
					          }
					        },
					        "thresholds": {
					          "threshold": {
					            "name": "autoTr",
					            "type": "AbsoluteDeviation",
					            "range_count": "5",
					            "palette": "custom"
					          }
					        },
					        "data_plot_settings": {
					          "heat_map": {
					            "heat_map_style": {
					              "fill": {
					                "type": "Gradient",
					                "gradient": {
					                  "angle": "90",
					                  "key": [
					                    { "color": "Blend(DarkColor(%Color),%Color,0.3)" },
					                    { "color": "%Color" }
					                  ]
					                }
					              },
					              "effects": {
					                "enabled": "true",
					                "bevel": {
					                  "enabled": "true",
					                  "highlight_opacity": "0.3",
					                  "shadow_opacity": "0.3",
					                  "distance": "2"
					                }
					              },
					              "states": {
					                "hover": {
					                  "fill": {
					                    "type": "Gradient",
					                    "gradient": {
					                      "angle": "90",
					                      "key": [
					                        { "color": "%Color" },
					                        { "color": "Blend(LightColor(%Color),%Color,0.5)" }
					                      ]
					                    }
					                  },
					                  "effects": {
					                    "enabled": "true",
					                    "bevel": {
					                      "enabled": "true",
					                      "highlight_opacity": "0.7",
					                      "shadow_opacity": "0.7",
					                      "distance": "3"
					                    }
					                  }
					                },
					                "pushed": {
					                  "effects": {
					                    "enabled": "true",
					                    "bevel": {
					                      "enabled": "true",
					                      "highlight_opacity": "0.5",
					                      "shadow_opacity": "0.5",
					                      "distance": "2",
					                      "highlight_color": "Black",
					                      "shadow_color": "White"
					                    }
					                  }
					                },
					                "selected_normal": {
					                  "hatch_fill": {
					                    "enabled": "true",
					                    "type": "Percent50",
					                    "opacity": "1",
					                    "color": "Red"
					                  }
					                },
					                "selected_hover": {
					                  "hatch_fill": {
					                    "enabled": "true",
					                    "type": "Percent50",
					                    "opacity": "1",
					                    "color": "Yellow"
					                  }
					                }
					              }
					            },
					            "tooltip_settings": {
					              "enabled": "true",
					              "format": "{%Row}-{%Column} : {%YValue}{numDecimals:0}",
					              "background": {
					                "corners": {
					                  "type": "Rounded",
					                  "all": "3"
					                }
					              }
					            },
					            "label_settings": {
					              "enabled": "true",
					              "position": {
					                "anchor": "Center",
					                "valign": "Center",
					                "halign": "Center",
					                "padding": "0"
					              },
					              "format": "{%Value}{numDecimals:0}",
					              "states": {
					                "hover": {
					                  "font": {
					                    "effects": {
					                      "enabled": "true",
					                      "glow": {
					                        "enabled": "true",
					                        "color": "White",
					                        "blur_x": "3",
					                        "blur_y": "3",
					                        "opacity": "1",
					                        "strength": "2"
					                      }
					                    }
					                  }
					                }
					              }
					            }
					          }
					        },
					        "chart_settings": {
					          "legend": {
					            "enabled": "true",
					            "ignore_auto_item": "True",
					            "rows_padding": "2",
					            "format": "{%Icon} {%RangeMin}{numDecimals:0}  {%RangeMax}{numDecimals:0}",
					            "title": { "enabled": "False" },
					            "items": {
					              "item": { "source": "Thresholds" }
					            }
					          }
					        },
					        "data": {
					          "series": {}
					        }
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
