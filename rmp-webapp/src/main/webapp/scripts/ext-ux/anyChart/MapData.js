var MapData = function(){};
MapData.prototype.data = {
	charts : {
		chart : {
			plot_type : 'Map',
		"palettes": {
          "palette": {
            "name": "trPalette",
            "type": "ColorRange",
            "color_count": "0",
            "gradient": {
              "key": [
                { "color": "Rgb(174,201,223)" },
                { "color": "Rgb(47,88,121)" }
              ]
            }
          }
        },
        "thresholds": {
          "threshold": {
            "name": "autoTr",
            "type": "Quantiles",
            "range_count": "0",
            "palette": "trPalette"
          }
        },
		"chart_settings": {
	          "title" : {
					"enabled" : "False"
				},
          "legend": {
            "enabled": "True",
            "rows_padding": "0",
            "inside_dataplot": "True",
            "position": "Bottom",
            "ignore_auto_item": "True",
            "title": {
              "enabled": "False",
              "text": "Index"
            },
            "format": "{%Icon} {%RangeMin}{numDecimals:0}-{%RangeMax}{numDecimals:0}",
            "items": {
              "item": { "source": "Thresholds" }
            }
          },
		 "data_plot_background": { "enabled": "False" },
         "chart_background": {
    	    "border": {
    	      "enabled": "True",
    	      "thickness": "1",
    	      "type": "Solid",
    	      "color": "#CCCCCC"
    	    },
    	    "fill": {
    	      "type": "Solid",
    	      "color": "#dfe8f6"
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
				map_series : {
					source : 'china.amap',
					id_column : "AREA",
					grid : {
						parallels : {
							enabled : 'False',
							labels : {
								enabled : 'False'
							}
						},
						meridians : {
							enabled : 'False',
							labels : {
								enabled : 'False'
							}
						},
						background : {
							enabled : 'False'
						}
					},
					projection : {
						type : 'equirectangular'
					},
					defined_map_region : {
						tooltip_settings : {
							enabled : 'True',
							format :'{%NAME},数量:{%YValue}{numDecimals:0}'
						}
					}
				}
			},
			data : {
				series : {
					"threshold": "autoTr",
					point : []
				}
			}
		}
	},
	"settings": {
		"animation": { 
			"enabled": "True" 
		}
	},
	"margin":{
		"all":"5"
	}
};
MapData.prototype.getData = function()
{
	return this.data;
}
MapData.prototype.setPoints = function(ps)
{
	this.data.charts.chart.data.series.point = ps;
	var points = [];
	for(var i = 0; i<ps.length;i++)
	{
		if(points.indexOf(ps[i].y) == -1)
			points[points.length] = ps[i].y;
	}
	this.setCount(points.length);
}
//private
MapData.prototype.setCount = function(count)
{
	this.data.charts.chart.thresholds.threshold.range_count = count;
	this.data.charts.chart.palettes.palette.color_count = count;
}
