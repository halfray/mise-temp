// functions 全文件
Ext.ns('Main.fun');
Main.fun.isEmpty = function(v)
{
	return Ext.isEmpty(v);
}
//创建一个绑定对象的执行函数
//如果第三个参数不为空,则执行时使用该参数否则使用用户指定的参数
Main.fun.Fun = function(target, fun,args) {
	// 第二个参数为空,且第一个参数为function，则直接返回
	if (!fun && (typeof (target) == 'function'))
		return target;
	return function() {
			fun.apply(target, Main.fun.isEmpty(args)?arguments:args)
	};
}
// 当值为空 的时候，返回默认值
Main.fun.nvl = function(v, df) {
	if (v === null || v === undefined)
		return Main.fun.nvl(df, '');
	return v;
}
/**
 * 尝试执行函数 check - function 执行的前提条件，如果不满足则循环尝试，否则直接执行 fun - function 需要循环执行的方法
 * times - 循环的最大次数 time - 每次循环的时间
 */
Main.fun.tryRun = function(check, fun, times, time) {
	if (Ext.isEmpty(check) || typeof check != 'function')
		return;
	if (check.call()) {
		if (!Ext.isEmpty(fun))
			fun.call();
		return;
	}
	if (Ext.isEmpty(fun))
		return;
	if (Ext.isEmpty(times))
		times = 0;
	if (Ext.isEmpty(time))
		time = 1000;
	var i = 0;
	var con = setInterval(function() {
		if (check.call() || (++i > times && times!=-1))
			clearInterval(con);
		fun.call();
	}, time);
}
Main.fun.getTooltipObject = function(str) {
	return str || "";
}
Main.fun.getYesNoCnValue = function(id) {
	var types = net.uni.in1.boolean_yesnovalue;
	for ( var i = 0; i < types.length; i++) {
		if (types[i][0] == id)
			return types[i][1];
	}
};
Main.fun.getApplyBillStatus = function(id) {
	var types = net.uni.in1.ApplyBill_status;
	for ( var i = 0; i < types.length; i++) {
		if (types[i][0] == id)
			return types[i][1];
	}
};
Main.fun.getDateTemp = function(cur) {// 时间转换
	if (cur == null) {
		return null;
	} else {
		cur = cur.substring(0, 10);
		var datestr = cur.split("-");
		return new Date(datestr[0], datestr[1] - 1, datestr[2]).getTime();
	}
}
Main.fun.getYear = function() {// 至今年以后十年的年数
	var years = [];
	var year = new Date().getYear();
	for ( var i = 0; i < 10; i++) {
		years[i] = [ year + i, year + i ];
	}
	return years;
};
// 从字节转换为兆
Main.fun.getMFromByte = function(value) {
	if (Ext.isEmpty(value))
		value = 0;
	else
		value = value / 1024 / 1024;
	return Main.fun.NumberFormat(value);
}
// 百分化 (本身就是百分比数)
Main.fun.getPerForpercent = function(value) {
	if (Ext.isEmpty(value))
		value == 0;
	return (value).toFixed(2) + "%";
}

// 百分化 (本身是整数)
Main.fun.getPercentage = function(value) {
	if (Ext.isEmpty(value))
		value == 0;
	return (value / 100).toFixed(2) + "%";
}
// 百分率 格式化 （本身是小数)
Main.fun.getPerByReal = function(value) {
	if (Ext.isEmpty(value))
		value == 0;
	return (value * 100).toFixed(2) + "%";
}

//百分率 格式化 （本身是小数,保留四位)
Main.fun.getPerByRealForFour = function(value) {
	if (Ext.isEmpty(value))
		value == 0;
	return (value * 100).toFixed(4) + "%";
}

Main.fun.NumberFormat = function(v) {
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
			+ "0" : v);
	v = String(v);
	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? '.' + ps[1] : '.00';
	var r = /(\d+)(\d{3})/;
	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + ',' + '$2');
	}
	v = whole + sub;
	if (v.charAt(0) == '-') {
		return '-' + v.substr(1);
	}
	return v;
}
Main.fun.DX = function(n) {// 小写金额转换为大写
	var strOutput = "";
	var strUnit = '千百拾亿千百拾万千百拾元角分';
	n += "00";
	var intPos = n.indexOf('.');
	if (intPos >= 0)
		n = n.substring(0, intPos) + n.substr(intPos + 1, 2);
	strUnit = strUnit.substr(strUnit.length - n.length);
	for ( var i = 0; i < n.length; i++)
		strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(n.substr(i, 1), 1)
				+ strUnit.substr(i, 1);
	return strOutput;
}

// 时间判断
Ext
		.apply(
				Ext.form.VTypes,
				{
					daterange : function(val, field) {
						var date = field.parseDate(val);
						if (!date) {
							return false;
						}
						var dispUpd = function(picker) {
							var ad = picker.activeDate;
							picker.activeDate = null;
							picker.update(ad);
						};

						if (Ext.getCmp(field.startDateField)
								&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
										.getTime()))) {
							var sd = Ext.getCmp(field.startDateField);
							sd.maxValue = date;
							this.dateRangeMax = date;
							if (sd.menu && sd.menu.picker) {
								sd.menu.picker.maxDate = date;
								dispUpd(sd.menu.picker);
							}
						} else if (Ext.getCmp(field.endDateField)
								&& (!this.dateRangeMax || (date.getTime() != this.dateRangeMax
										.getTime()))) {
							var ed = Ext.getCmp(field.endDateField);
							ed.minValue = date;
							this.dateRangeMin = date;
							if (ed.menu && ed.menu.picker) {
								ed.menu.picker.minDate = date;
								dispUpd(ed.menu.picker);
							}
						}
						return true;
					},
					password : function(val, field) {
						if (field.initialPassField) {
							var pwd = Ext.getCmp(field.initialPassField);
							return (val == pwd.getValue());
						}
						return true;
					},
					passwordText : '两次输入的密码不相等',
					email : function(val, field) {// email
						try {
							if (/^[_.a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/
									.test(val)
									|| val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					emailText : '请输入正确的邮件地址',
					phone : function(val, field) {// 电话，传真
						try {
							if (/^[_.A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[a-z0-9]{2,3}$/
									.test(val)
									|| val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					phoneText : '请输入正确的电话号码',
					mobilephone : function(val, field) {
						try {
							if (/(^0?[1][35][0-9]{9}$)/.test(val)
									|| val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					mobilephoneText : '请输入正确的手机号码',
					commonphone : function(val, field) {
						try {
							if (/(^0?[1][35][0-9]{9}$)/.test(val)
									|| val.length == 0)
								return true;
							else if (/^[_.A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[a-z0-9]{2,3}$/
									.test(val)
									|| val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					mobilephoneText : '请输入正确的电话号码',
					ip : function(val, field) {
						try {
							if (/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
									.test(val)
									|| val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					ipText : '请输入正确的IP地址',
					postcode : function(val, field) {
						try {
							if (/^[1-9]\d{5}$/.test(val) || val.length == 0)
								return true;
							return false;
						} catch (e) {
							return false;
						}
					},
					postcodeText : '请输入正确的邮编',

					checkCard : function(val, field) {
						try {
							var area = {
								11 : "北京",
								12 : "天津",
								13 : "河北",
								14 : "山西",
								15 : "内蒙古",
								21 : "辽宁",
								22 : "吉林",
								23 : "黑龙江",
								31 : "上海",
								32 : "江苏",
								33 : "浙江",
								34 : "安徽",
								35 : "福建",
								36 : "江西",
								37 : "山东",
								41 : "河南",
								42 : "湖北",
								43 : "湖南",
								44 : "广东",
								45 : "广西",
								46 : "海南",
								50 : "重庆",
								51 : "四川",
								52 : "贵州",
								53 : "云南",
								54 : "西藏",
								61 : "陕西",
								62 : "甘肃",
								63 : "青海",
								64 : "宁夏",
								65 : "新疆",
								71 : "台湾",
								81 : "香港",
								82 : "澳门",
								91 : "国外"
							};
							var idcard = val, Y, JYM;
							var S, M;
							var idcard_array = new Array();
							idcard_array = idcard.split("");
							// 地区检验
							if (area[parseInt(idcard.substr(0, 2))] == null)
								return false;
							// 身份号码位数及格式检验
							switch (idcard.length) {
							case 15:
								if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0
										|| ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard
												.substr(6, 2)) + 1900) % 4 == 0)) {
									ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;// 测试出生日期的合法性
								} else {
									ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;// 测试出生日期的合法性
								}
								if (ereg.test(idcard))
									return true;
								else
									return false;
								break;
							case 18:
								// 18位身份号码检测
								// 出生日期的合法性检查
								// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
								// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
								if (parseInt(idcard.substr(6, 4)) % 4 == 0
										|| (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard
												.substr(6, 4)) % 4 == 0)) {
									ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
								} else {
									ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
								}
								if (ereg.test(idcard)) {// 测试出生日期的合法性
									// 计算校验位
									S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
											* 7
											+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
											* 9
											+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
											* 10
											+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
											* 5
											+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
											* 8
											+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
											* 4
											+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
											* 2
											+ parseInt(idcard_array[7])
											* 1
											+ parseInt(idcard_array[8])
											* 6
											+ parseInt(idcard_array[9]) * 3;
									Y = S % 11;
									M = "F";
									JYM = "10X98765432";
									M = JYM.substr(Y, 1);// 判断校验位
									if (M == idcard_array[17])
										return true; // 检测ID的校验位
									else
										return false;
								} else
									return false;
								break;
							default:
								return false;
								break;
							}

						} catch (e) {
							return false;
						}
					},
					checkCardText : '请输入正确的身份证号!',

					checkArmyCode : function(val, field) {
						try {
							var re = /\d{6}(19|20)[\d]{6}0000/;
							var s = re.test(val);
							function cdate(d) {
								var t = d.substring(10, 14);
								var m = parseInt(t.substring(0, 2));
								var day = parseInt(t.substring(2, 4));
								if (m > 12)
									return false;
								if (day > 31)
									return false;
								if (m == 2 && day > 29)
									return false;
								return true;
							}
							return s && cdate(val);
						} catch (e) {
							return false;
						}
					},
					checkArmyCodeText : '请输入正确的军官证!',
					checkPassportCode : function(val, field) {
						try {
							var str = val;
							// 在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
							var Expression = /(P\d{7})|(G\d{8})/;
							var objExp = new RegExp(Expression);
							if (objExp.test(str) == true) {
								return true;
							} else
								return false;
						} catch (e) {
							return false;
						}
					},
					checkPassportCodeText : '请输入正确的护照编号!'
				});

Main.fun.addTab = function(conf) {
	parent.parent.Main.frame.centerPanel.loadPage(conf);
};

Main.fun.openWin = function(conf, flag) {
	if(flag == 'window'){
		/**
		 * 如果弹出window框，则需在conf中加入如height和width参数，里面规定需要弹出框大小的百分比
		 */
		var h;
		var w;
		if(conf.height != ''){
			h = conf.height;
		}else{
			h = '1';
		}
		if(conf.width != ''){
			w = conf.width;
		}else{
			w = '1';
		}
		Main.fun.OpenModalDialogWindowBySize(conf.href, conf.params, h, w);
	}
	else if(flag == 'browser') {
		window.open(conf.href);
	}
	else{
		Main.fun.addTab(conf);
	}
};

Main.fun.OpenModalDialogWindowBySize = function (newURL, objParams, h, w) {
	try {
		// 初始化变量，用于接收页面反回值。
		var recdata = false;
		var width,height;
		if(h <= 1 && w <= 1){
//			width = 1024 * w;
//			height = 768 * h;
			width = screen.width * w;
			height = screen.height * h;
		}else{
			width = w; height = h;
		}

		// 模式窗口打开指定的窗口链接
		/*recdata = showModalDialog(newURL, objParams, "dialogWidth:" + width
				+ "px;dialogHeight:" + height
				+ "px;center=1;help=0;status=0;resizable:Yes");
		return recdata;*/
		recdata = window.open(newURL, 'newwin','modal=yes,width='+width+',height='+height+',resizable=no,scrollbars=no');
		return recdata;
	} catch (err) {
	}
}
Main.fun.getMoney = function(v) {
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v
			+ "0" : v);
	v = String(v);
	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? '.' + ps[1] : '.00';
	var r = /(\d+)(\d{3})/;
	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + ',' + '$2');
	}
	v = whole + sub;
	if (v.charAt(0) == '-') {
		return net.uni.in1.moneySign + '-' + v.substr(1);
	}
	return net.uni.in1.moneySign + v;
}
Main.fun.changeMoney = function(v) {
	return Ext.isNumber(v) ? '<span style="color:green">' + getMoney(v)
			+ '</span>' : '';
}
Main.fun.click = function(e) { // 屏蔽右键
	if (document.all) {
		if (event.button == 2 || event.button == 3) {
			oncontextmenu = 'return false';
		}
	}
}
// document.onmousedown=click;
//document.oncontextmenu = new Function("return false;");

Main.fun.wonload = function() {
	var olink = document.links;
	for ( var i = 0; i < olink.length; i++) {
		olink[i].onmouseover = function() {
			window.status = '';
			return true;
		}
	}
}
Main.fun.formatCSTDate = function(dateString) {
	var d = new Date(dateString);
	var mm = ((d.getMonth() + 1) > 9) ? (d.getMonth() + 1) : '0'
			+ (d.getMonth() + 1);
	var t = dateString.replace(/\w+ \w+ (\d+) (\d+):(\d+):(\d+) \w+ (\d+)/,
			'$5-' + mm + '-$1 $2:$3:$4');
	return t;
}

Main.fun.getDateStingByObject = function(object) {
	if (object && object != null && object != "") {
		return formatCSTDate(object.time);
	} else
		return "";
}
Main.fun.arrayToString = function(array, text, sep) {// Array to String
	var separator = sep ? sep : ",";
	if (!array || !array instanceof Array)
		return "";
	var arrayStr = "";
	for ( var i = 0; i < array.length; i++) {
		arrayStr += separator + (text ? array[i][text] : array[i]);
	}
	return arrayStr.substr(1);
}
Main.fun.trimStr = function(str) {
	return str.replace(/\s/g, "");
}

Main.fun.showProcessWait = function(content) {
	Ext.MessageBox.show({
		msg : content ? content : '数据处理中, 请稍候 ...',
		progressText : '数据处理中 ...',
		width : 300,
		wait : true
	});
}
Main.fun.closeProcessWait = function() {
	Ext.MessageBox.hide();
}
Main.fun.showLoadProcessWait = function() {
	Ext.MessageBox.show({
		msg : '数据加载中, 请稍候 ...',
		progressText : '数据加载中 ...',
		interval : 200,
		duration : 5000,
		increment : 15,
		width : 300,
		wait : true
	});
}
Main.fun.closeLoadProcessWait = function() {
	Ext.MessageBox.hide();
}
function JsLoader() {
	this.load = function(url) {
		// 获取所有的<scrcipt>标记
		var ss = document.getElementsByTagName("script");
		// 判断指定的文件是否已经包含，如果已包含则触发onsuccess事件并返回
		for (i = 0; i < ss.length; i++) {
			if (ss[i].src && ss[i].src.indexOf(url) != -1) {
				this.onsuccess();
				return;
			}
		}
		// 创建script结点，并将其属性设为为外联JavaScript文件
		s = document.createElement("script");
		s.type = "text/javascript";
		s.src = url;
		// 获取head结点，并将<script>插入到其中
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(s);
		// 获取对象自身的引用
		var self = this;
		// 对于IE浏览器，使用readystatechange事件判断是否载入成功
		// 对于其他浏览器，使用onload事件判断载入是否成功
		s.onload = s.onreadystatechange = function() {
			// 在此函数中this指针指的是s结点对象，而不是JsLoader实例，
			// 所以必须用self来调用onsuccess事件，下同。
			if (this.readyState && this.readyState == "loading")
				return;
			self.onsuccess();
		}
		s.onerror = function() {
			// 如果发生错误，则删除插入的结点，并触发失败事件
			head.removeChild(s);
			self.onfailure();
		}
	};
	this.remove = function(url) {
		// 获取head
		var head = document.getElementsByTagName("head")[0];
		// 获取所有的<scrcipt>标记
		var ss = document.getElementsByTagName("script");
		// 判断指定的文件是否已经包含，如果已包含则触发onsuccess事件并返回
		for (i = 0; i < ss.length; i++) {
			if (ss[i].src && ss[i].src.indexOf(url) != -1) {
				head.removeChild(ss[i]);
				return;
			}
		}
	}
	// 定义载入成功事件
	this.onsuccess = function() {
	};
	// 定义载入失败事件
	this.onfailure = function() {
	};
}
/**
 * 返回带空格的字符串
 * 
 * @param {}
 *            str
 * @return {}
 */
Main.fun.num_to_string = function(str) {
	return str + " ";
};
Main.fun.removeRefreshTreeNode = function(obj) {
	obj.getSelectionModel().getSelectedNode.remove();
}
Main.fun.updateRefreshTreeNode = function(obj, node) {
	obj.getSelectionModel().select(node).reload();
}
Main.fun.addRefreshTreeNode = function(obj) {
	obj.getSelectionModel().getSelectedNode().reload();
}
Main.fun.getHboxGrid = function(obj, height, frame) {
	return {
		frame : Ext.isDefined(frame) && Ext.isBoolean(frame) ? frame : false,
		height : Ext.isDefined(height) && Ext.isNumber(height) ? height
				: Main.cts.Height,
		border : false,
		layout : 'hbox',
		layoutConfig : {
			align : 'stretch'
		},
		defaults : {
			flex : 1
		},
		items : obj
	};
}
/**
 * 两个grid数据拖动
 * 
 * @param {}
 *            left
 * @param {}
 *            right
 */
Main.fun.gridToGrid = function(firstGrid, secondGrid) {
	// This will make sure we only drop to the view scroller element
	var firstGridDropTargetEl = firstGrid.getView().scroller.dom;
	var firstGridDropTarget = new Ext.dd.DropTarget(firstGridDropTargetEl, {
		ddGroup : secondGrid.ddGroup,
		notifyDrop : function(ddSource, e, data) {
			var records = ddSource.dragData.selections;
			Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
			firstGrid.store.add(records);
			return true
		}
	});
	// This will make sure we only drop to the view scroller element
	var secondGridDropTargetEl = secondGrid.getView().scroller.dom;
	var secondGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
		ddGroup : firstGrid.ddGroup,
		notifyDrop : function(ddSource, e, data) {
			var records = ddSource.dragData.selections;
			Ext.each(records, ddSource.grid.store.remove, ddSource.grid.store);
			secondGrid.store.add(records);
			return true
		}
	});
}
/**
 * 提示框
 */
Main.fun.commonAlert = function(str) {
	Ext.MessageBox.alert("提示", str || "请选择要操作数据！");
};
/**
 * 合并两个数据
 */
Main.fun.unionArray = function(arrayA, arrayB) {
	for ( var i = 0; i < arrayA.length; ++i) {
		arrayB.push(arrayA[i]);
	}
	return arrayB;
}

/**
 * 四则运算精度修正函数 m 数值1(number) n 数值2(number) op 操作符(string)
 */
Main.fun.fixMath = function(m, n, op) {
	var a = (m + "");
	var b = (n + "");
	var x = 1;
	var y = 1;
	var c = 1;
	if (a.indexOf(".") > 0) {
		x = Math.pow(10, a.length - a.indexOf(".") - 1);
	}
	if (b.indexOf(".") > 0) {
		y = Math.pow(10, b.length - b.indexOf(".") - 1);
	}
	switch (op) {
	case '+':
	case '-':
		c = Math.max(x, y);
		m = Math.round(m * c);
		n = Math.round(n * c);
		break;
	case '*':
		c = x * y
		m = Math.round(m * x);
		n = Math.round(n * y);
		break;
	case '/':
		c = Math.max(x, y);
		m = Math.round(m * c);
		n = Math.round(n * c);
		c = 1;
		break;
	}
	return eval("(" + "(" + m + ")" + op + "(" + n + ")" + ")/" + c);
	// return eval("("+m+op+n+")/"+c);
}
/**
 * 用于query 方法的完全匹配
 */
Main.fun.getQueryRepExp = function(value) {
	return new RegExp('^' + Ext.escapeRe(String(value)) + '$');
}
/**
 * 用于grid中进行信息展示 1 将\r\n 替换为<br>
 * 
 */
Main.fun.displayText = function(value) {
	if (value && Ext.isDefined(value))
		return value.toString().replace(/\r\n/gi, "<br>");
	return value;
}
/**
 * 获取多层嵌套中的formpanel中的值
 */
Main.fun.getValues = function(panel) {
	var data = {};
	if (!Ext.isDefined(panel.getValue) && panel.items) {
		Ext.each(panel.items, function(item) {
			Ext.apply(data, Main.fun.getValues(item));
		});
	} else if (Ext.isDefined(panel.getValue)) {
		var value = panel.getValue();
		if (Ext.isDate(value)) {
			var format = 'Y-m-d';
			if (Ext.isDefined(panel.format))
				format = panel.format;
			value = panel.getValue().format(format);
		}
		data[panel.getName()] = value;
	}
	return data;
}
/**
 * 设置多层嵌套中的formpanel中的值
 */
Main.fun.setValues = function(panel, data) {
	if (!Ext.isDefined(panel.setValue) && panel.items) {
		Ext.each(panel.items, function(item) {
			Main.fun.setValues(item, data)
		});
	} else if (Ext.isDefined(panel.setValue)) {
		panel.setValue(data[panel.getName()]);
	}
};
// 将url中的参数信息转换为json对象
Main.fun.params2Json = function(paramsValue) {
	var params = {};
	if (paramsValue) {
		var ar = paramsValue.split("&");
		for ( var i = 0; i < ar.length; i++) {
			var va = ar[i].split('=');
			params[va[0]] = va[1];
		}
	}
	;

	return params;
}
//打印控制台信息
Main.fun.printLog=function()
{
	try {
		console.log(arguments);
	} catch (e) {
		// not support console method (ex: IE)
	}
}
Main.fun.ableToCNStr = function(value){
	if(value === 1) 
		return '是'
	else 
		return '否'
}
Main.fun.booleanToStr = function(value){
	if(value == 1) 
		return '是'
	else 
		return '否'
}
/**
 * 数字千分符-格式化整数
 * @param {Object} v 数据源
 * @param {Object} flag 是否保留2位小数
 */
Main.fun.NumberFormatStr = function(v, flag) {  
    if(isNaN(v)){  
        return v;  
    }
	flag =(flag ? (flag == true?true:false) : false); //是否存在，且是否等于true
	if(flag){ //等于true，保留两位小数
	    v = (Math.round((v - 0) * 100)) / 100; //四舍五入
		// 向下取整
	    v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v  
	            + "0" : v);  
	} 
	v = String(v); 
    var ps = v.split('.'); 
    var whole = ps[0]; //整数部分
    var sub = flag==true ? ( ps[1] ? '.' + ps[1] : '.00') : "";  //小数数部分
    var r = /(\d+)(\d{3})/;  
    while (r.test(whole)) {  
        whole = whole.replace(r, '$1' + ',' + '$2');  
    }  
    v = whole + sub;
    return v;  
} 
 
//显示提示窗口
Main.fun.showTipWindow = function(tipinfo,iconCls,title,time){
	var window = new Ext.Window( {
		width : 250,
		height : 150,
		shadow : false,
		html : tipinfo,
		title : "温馨提示:"
	});
	window.iconCls = iconCls; 
	window.title = title;
	function show() {
		this.el.alignTo(Ext.getBody(), 'br-br');
		this.el.fadeIn('b', {
			easing : 'easeOut',
			endOpacity: 1, 
			duration: 5,
			callback : function() {
				alert();
				this.close.defer(time, this); // 定时关闭窗口
		},
		scope : this,
		duration : 1
		});

	}
	function hide() {
		if (this.isClose === true) { // 防止点击关闭和定时关闭处理
			return false;
		}
		this.isClose = true;
		this.el.fadeOut('b', {
			easing : 'easeOut',
			callback : function() {
				this.un('beforeclose', hide, this);
				this.close();
			},
			scope : this,
			duration : 2
		});
		return false;
	}
	window.on('show', show, window);
	window.on('beforeclose', hide, window);
	window.show();
	var delay = new Ext.util.DelayedTask(function(){
		window.close();
	});
	delay.delay(3000);
}

