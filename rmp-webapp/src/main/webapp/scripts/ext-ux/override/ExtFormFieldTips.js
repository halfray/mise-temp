
/**
 * 适用于TextField、NumberField
 */
Ext.override(Ext.form.TextField, {
			sideText : '',
			onRender : function(ct, position) {
				Ext.form.TextField.superclass.onRender.call(this, ct, position);
				if (this.sideText != '' && !this.triggerAction) {
					this.sideEl = ct.createChild({
								tag : 'div',
								html : this.sideText
							});
					this.sideEl.addClass('x-form-sideText');
				}
			}
		});
/**
 * 适用于ComboBox
 */

// 如果开发人员没有指定textfield的验证输入,则默认不允许输入特殊字符
//Ext.form.TextField.prototype.regex = /^((?!--)[^~ ！ @ # ￥ % × + = ： ， ”“ ？ 《 》 。 ‘ ’ 、 & | \\ \/ ； {} …… ^ * ※ ◎ （）<>])*$/; // 特殊字符集，可以根据需要扩展
//Ext.form.TextField.prototype.regexText = "请不要输入以下特殊字符<br>~ ！ @ # ￥ % × + = ： ， ”“ ？ 《 》 。 ‘ ’ 、 & | \\ / ; \ ； {} …… ^ * ※ ◎ （）<> ";
//Ext.form.TextField.prototype.validateOnBlur = false;
	
Ext.override(Ext.form.ComboBox, {
			sideText : '',
			onRender : function(ct, position) {
				Ext.form.ComboBox.superclass.onRender.call(this, ct, position);
				if (this.sideText != '') {
					this.sideEl = ct.first('div').createChild({
								tag : 'div',
								style : 'padding-left: 19px; ',
								html : this.sideText
							});
					this.sideEl.addClass('x-form-sideText');
				}
				if (this.hiddenName) {
					this.hiddenField = this.el.insertSibling({
								tag : 'input',
								type : 'hidden',
								name : this.hiddenName,
								id : (this.hiddenId || this.hiddenName)
							}, 'before', true);
					// prevent input submission
					this.el.dom.removeAttribute('name');
				}
				if (Ext.isGecko) {
					this.el.dom.setAttribute('autocomplete', 'off');
				}
				if (!this.lazyInit) {
					this.initList();
				} else {
					this.on('focus', this.initList, this, {
								single : true
							});
				}
			}
		});