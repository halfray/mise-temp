Ext.ns("Ext.ux.anyChart");
Ext.ux.anyChart.chartDataModel=function(){
	this.data ={
	charts : {
		chart : {
			"type" : "CategorizedVertical",
			"chart_settings" : {
				"title" : {
					"text" : "",
					"background" : {
						"enabled" : "false"
					}
				},
				"legend" : {
					"enabled" : "true",
					"position" : "Bottom",
					"rows_padding": "0",
					"format" : "{%Icon} {%Name} ",
					"title" : {
						"enabled" : "false"
					},
					"columns_separator" : {
						"enabled" : "false"
					}
				},
				"axes" : {
					"y_axis" : {
						"scale": {
							 "minimum": "default",
							 "maximum": "default"
						},
						"title" : {
							"enabled" : "False"
						},
						"labels" : {
							"format" : "{%Value}{numDecimals:0}"
						},
						"minor_grid":
						{
							"enable":"true",
							"line":{
								"opacity":'0.0'
							}
						}
					},
					"x_axis" : {
						"title" : {
							"enabled" : "False"
						},
						"labels" : {
							"rotation" : "0"
						}
					}
				},
				   "chart_background": {
			     	    "border": {
			     	      "enabled": "True",
			     	      "thickness": "1",
			     	      "type": "Solid",
			     	      "color": "#CCCCCC"
			     	    },
			     	    "fill": {
			     	      "type": "Solid",
			     	      "color": "#ffffff"
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
				"pie_series":{
					"style":"default",
					"radius":"100",
					"pie_style":{
						"border":{
							"enabled":"false"
						}
					},
					"label_settings":{
						
					}
				},
				"default_series_type" : "",
				"series" : {
					"group_padding" : "1",
					"tooltip_settings" : {
						"enabled" : "True",
						"format" : "{%SeriesName}:{%YValue}{numDecimals:2}"
					},
					"label_settings" : {
						"enabled" : "true",
						"rotation" : "0",
						"background" : {
							"enabled" : "false"
						},
						"font" : {
							"color" : "DarkColor(%Color)"
						},
						"format" : "{%YValue}{numDecimals:0}",
						"effects" : {
							"drop_shadow" : {
								"enabled" : "true",
								"opacity" : "1"
							}
						}
					},
					"style" : {
						"line" : {
							"enabled" : "true",
							"color" : "DarkColor(%Color)",
							thickness: "1"
						},
						"fill" : {
							"color" : "%Color"
						},
						"states" : {
							"hover" : {
								"fill" : {
									"color" : "LightColor(%Color)"
								}
							}
						}
					}
				}
			},
			data : {
				series : {
					"threshold" : "autoTr",
					point : []
				}
			}
		}
	},
	"settings" : {
		"animation" : {
			"enabled" : "True"
		}
	},
	"margin" : {
		"all" : "5"
	}
}
}
Ext.ux.anyChart.chartDataModel.prototype.getDataModel = function()
{
	return this.data;
}