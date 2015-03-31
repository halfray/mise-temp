
/**
 * 用于导出文件。<br/>
 */
Ext.namespace('Prophet');
Ext.namespace('Prophet.exportfile');

/**
 * 此方法是针对少量数据直接导出。
 */
Prophet.exportfile.ExportExcelUtil = function(){
    this.POIFormat = {
        PERCENT_FORMAT: "0.00%",
        FLOAT_FORMAT: "#,##0.00",
        INTEGER_FORMAT: "#,##0",
        DATE_FORMAT_YYYY_MM_DD: "YYYY-MM-DD"
    }
    this.titleLine = new Array();
    this.fields = new Array();
    this.exportExcelAction = ROOT_PATH + "/export/exportDataExcelAction.action";
};

Prophet.exportfile.ExportExcelUtil.prototype.getGridPanelTitle = function(grid, isRenderer){
    var columnModel = grid.getColumnModel();
    for (var j = 0; j < columnModel.getColumnCount(); j++) {
        if (!columnModel.isHidden(j) && columnModel.getDataIndex(j)) {
            this.fields.push(columnModel.getDataIndex(j));
            this.titleLine.push(Ext.util.Format.htmlDecode(columnModel.getColumnHeader(j)));
            
        }
    }
}

Prophet.exportfile.ExportExcelUtil.prototype.exportExcel = function(exporterId, params, titles, fields, fileName, formatMapStr){
    var formId = "hiddenForm";
    for (var i = 0; i < params.length; i++) {
        var p = params[i];
        if (Ext.isEmpty(p) || p == "undefined") {
            params[i] = "";
        }
    }
    if (!Ext.get(formId)) {
        Ext.DomHelper.append(Ext.getBody(), {
            tag: 'form',
            id: formId,
            method: 'post',
            children: [{
                tag: 'input',
                id: 'exportData',
                name: 'exportData',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'titleLine',
                name: 'titleLine',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'fileName',
                name: 'fileName',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'params',
                name: 'params',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'titles',
                name: 'titles',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'fields',
                name: 'fields',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'exporterId',
                name: 'exporterId',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'formatMapStr',
                name: 'formatMapStr',
                type: 'hidden'
            }]
        });
    }
    
    Ext.getDom('params').value = window.encodeURI(Ext.encode(this.convertParamsToJson(params)));
    Ext.getDom('titles').value = window.encodeURI(Ext.encode(titles));
    Ext.getDom('fields').value = window.encodeURI(Ext.encode(fields));
    Ext.getDom('fileName').value = window.encodeURI(fileName);
    Ext.getDom('exporterId').value = window.encodeURI(exporterId);
    Ext.getDom('formatMapStr').value = window.encodeURI(Ext.encode(formatMapStr));
    Ext.getDom(formId).target = "_self";
    Ext.getDom(formId).action = this.exportExcelAction;
    Ext.getDom(formId).submit();
}

Prophet.exportfile.ExportExcelUtil.prototype.convertParamsToJson = function(params){
    var jsonParams = {};
    for (var i = 0; i < params.length; i++) {
        jsonParams[i] = params[i];
    }
    return jsonParams;
}


/**
 * 大数据量分页CSV导出
 */
Prophet.exportfile.ExportCSVUtil = function(){
    this.POIFormat = {
        PERCENT_FORMAT: "0.00%",
        FLOAT_FORMAT: "#,##0.00",
        INTEGER_FORMAT: "#,##0",
        DATE_FORMAT_YYYY_MM_DD: "YYYY-MM-DD"
    }
    this.titleLine = new Array();
    this.fields = new Array();
    this.createExportCsvAction = Main.contextPath+ '/createExportDataCSVAction.action';
    this.doDownloadExportCsvAction = Main.contextPath+ '/doDownloadExportDataCSVAction.action';
};

Prophet.exportfile.ExportCSVUtil.prototype.getGridPanelTitle = function(grid, isRenderer){
    var columnModel = grid.getColumnModel();
    for (var j = 0; j < columnModel.getColumnCount(); j++) {
        if (!columnModel.isHidden(j) && columnModel.getDataIndex(j)) {
            this.fields.push(columnModel.getDataIndex(j));
            this.titleLine.push(Ext.util.Format.htmlDecode(columnModel.getColumnHeader(j)));
            
        }
    }
}
Prophet.exportfile.ExportCSVUtil.prototype.exportCSV = function(exporterId, params, titles, fields, fileName, formatMapStr,exporterCountId){
    var formId = "hiddenForm";
    for (var i = 0; i < params.length; i++) {
        var p = params[i];
        if (Ext.isEmpty(p) || p == "undefined") {
            params[i] = "";
        }
    }
    if (!Ext.get(formId)) {
        Ext.DomHelper.append(Ext.getBody(), {
            tag: 'form',
            id: formId,
            method: 'post',
            children: [{
                tag: 'input',
                id: 'exportData',
                name: 'exportData',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'titleLine',
                name: 'titleLine',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'fileName',
                name: 'fileName',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'params',
                name: 'params',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'titles',
                name: 'titles',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'fields',
                name: 'fields',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'exporterId',
                name: 'exporterId',
                type: 'hidden'
            },{
                tag: 'input',
                id: 'exporterCountId',
                name: 'exporterCountId',
                type: 'hidden'
            }, {
                tag: 'input',
                id: 'formatMapStr',
                name: 'formatMapStr',
                type: 'hidden'
            }]
        });
    }
    
//    Ext.getDom('params').value = window.encodeURI(Ext.encode(this.convertParamsToJson(params)));
//    Ext.getDom('titles').value = window.encodeURI(Ext.encode(titles));
//    Ext.getDom('fields').value = window.encodeURI(Ext.encode(fields));
//    Ext.getDom('fileName').value = window.encodeURI(fileName);
//    Ext.getDom('exporterId').value = window.encodeURI(exporterId);
//    if( null != exporterCountId){
//	    Ext.getDom('exporterCountId').value = window.encodeURI(exporterCountId);
//    }
//    
//    Ext.getDom('formatMapStr').value = window.encodeURI(Ext.encode(formatMapStr));
	
	Ext.getDom('params').value = Ext.encode(this.convertParamsToJson(params));
    Ext.getDom('titles').value = Ext.encode(titles);
    Ext.getDom('fields').value = Ext.encode(fields);
    Ext.getDom('fileName').value = fileName;
    Ext.getDom('exporterId').value = exporterId;
    if( null != exporterCountId){
	    Ext.getDom('exporterCountId').value = exporterCountId;
    }
    
    Ext.getDom('formatMapStr').value = Ext.encode(formatMapStr);
    Ext.getDom(formId).target = "_self";
    if(this.createExportCsvAction.length != 0 && this.doDownloadExportCsvAction.length != 0 ){
    	var doUrl = this.doDownloadExportCsvAction;
		Ext.MessageBox.wait("导出数据在生成中","提示");
		Ext.Ajax.request({
   			url:this.createExportCsvAction,
   			form:formId,
   			timeout : 600000 ,
   			success:function(jsonStr){
   				var jsonObj = Ext.util.JSON.decode(jsonStr.responseText);
   				if( jsonObj.success == true ){
	    			Ext.getDom(formId).action = doUrl+"?filePath="+jsonObj.filePath;
	        		Ext.getDom(formId).submit();
	        		Ext.MessageBox.hide();
   				}else{
   					Ext.MessageBox.alert("提示",jsonObj.filePath);
   				}
   			}
   		});
	}
}

Prophet.exportfile.ExportCSVUtil.prototype.convertParamsToJson = function(params){
    var jsonParams = {};
    for (var i = 0; i < params.length; i++) {
        jsonParams[i] = params[i];
    }
    return jsonParams;
}
