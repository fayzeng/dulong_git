/*
* 静默更新插件
* 直接appUpadata.init()去调用此插件
 */
!function(window, undefined) {
	var appUpdata = window.appUpdata = {
		init: function() {
			var that = this;
			if(plus) {
				plus.runtime.getProperty(plus.runtime.appid, function(inf) {
					var wgtVer = inf.version;
					bpAjax("/index/common/getNewResourcesVersion", {
						version: plus.runtime.version,
						resVersion: wgtVer
					}, function(d) {
						that.downFn(d.data.url);
					}, function(d) {
						//mui.toast(d.info)
					}, 1, "版本")
				});

			}
		},
		downFn: function(wgtUrl) {
			var that = this;
			if(plus) {
				plus.downloader.createDownload(wgtUrl, {
					filename: "_doc/update/"
				}, function(d, status) {
					if(status == 200) {
						that.installWgt(d.filename);
					} else {
						console.log("版本失败！");
					}
				}).start();
			}
		},
		installWgt: function(path) {
			if(plus) {
				plus.runtime.install(path, {}, function() {
					console.log("安装版本成功！");
				}, function(e) {
					console.log("安装版本失败[" + e.code + "]：" + e.message);
				});
			}
		}
	}
}(window)