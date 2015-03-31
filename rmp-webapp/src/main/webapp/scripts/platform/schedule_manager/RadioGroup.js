Ext.override(Ext.form.RadioGroup, {
				getValue : function() {
					var v;
					if (this.rendered) {
						this.items.each(function(item) {
									if (!item.getValue())
										return true;
									v = item.getRawValue();
									return false;
								});
					} else {
						for (var k in this.items) {
							if (this.items[k].checked) {
								v = this.items[k].inputValue;
								break;
							}
						}
					}
					return v;
				},
				setValue : function(v) {
					if (this.rendered)
						this.items.each(function(item) {
									item.setValue(item.getRawValue() == v);
								});
					else {
						for (var k in this.items) {
							this.items[k].checked = this.items[k].inputValue == v;
						}
					}
				}
			});