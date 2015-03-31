/**
 * 在页面中动态加载js 文件
 */
function LinkLoader() {
};

LinkLoader.prototype.load = function(url) {
	// 获取所有的<link>标记
	var ss = document.getElementsByTagName("link");
	// 判断指定的文件是否已经包含，如果已包含则触发onsuccess事件并返回
	for (i = 0; i < ss.length; i++) {
		if (ss[i].href && ss[i].href.indexOf(url) != -1) {
			this.onsuccess();
			return;
		}
	}
	// 创建link结点
	s = document.createElement("link");
	s.type = "text/css";
	s.rel = "stylesheet";
	s.href = url;
	// 获取head结点，并将<script>插入到其中
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(s);
	// 获取对象自身的引用
	var self = this;
	// 对于IE浏览器，使用readystatechange事件判断是否载入成功
	// 对于其他浏览器，使用onload事件判断载入是否成功
	s.onload = s.onreadystatechange = function() {
		// 在此函数中this指针指的是s结点对象，而不是LinkLoader实例，
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

LinkLoader.prototype.remove = function(url) {
	// 获取head
	var head = document.getElementsByTagName("head")[0];
	// 获取所有的<link>标记
	var ss = document.getElementsByTagName("link");
	// 判断指定的文件是否已经包含，如果已包含则触发onsuccess事件并返回
	for (i = 0; i < ss.length; i++) {
		if (ss[i].href && ss[i].href.indexOf(url) != -1) {
			head.removeChild(ss[i]);
			return;
		}
	}
}
// 定义载入成功事件
LinkLoader.prototype.onsuccess = function() {
};
// 定义载入失败事件
LinkLoader.prototype.onfailure = function() {
};
