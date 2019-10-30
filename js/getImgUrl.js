/**
 * 获取图片地址
 * varstion 1.0.0
 * by Allen-Fei
 * tipefi@126.com
 * 参数列表：
 * success(picUrl)——图片地址获取成功的回调,返回图片地址
 * 基于zepto或jq、mui------仅限手机端
 */
(function(window, undefind) {
	var layer = '<div id="selectLayer" class="mui-popover mui-popover-bottom mui-popover-action ">'
	layer += '<ul class="mui-table-view" id="imgLayer">'
	layer += '<li class="mui-table-view-cell">'
	layer += '<span>拍照</span>'
	layer += '</li>'
	layer += '<li class="mui-table-view-cell">'
	layer += '<span>从相册选择</span>'
	layer += '</li>'
	layer += '</ul>'
	layer += '<ul class="mui-table-view">'
	layer += '<li class="mui-table-view-cell">'
	layer += '<a href="#selectLayer"><b>取消</b></a>'
	layer += '</li>'
	layer += '</ul>'
	layer += '</div>'
	$("body").append(layer);
	//选择方式事件
	$("body").on("tap", "#imgLayer li", function() {
		var i = $(this).parent().children().index(this)
		if(i == 0) {
			getImgURL.getImages();
		}else{
			getImgURL.getPhoto();
		}
		mui('#selectLayer').popover('hide');
	})
	
	var getImgURL = window.getImgURL = {
		init: function(option){
			var that = this;
			that.o = option;
			mui('#selectLayer').popover('toggle');
			
		},
		getImages: function() {
			var that = this;
			var cmr = plus.camera.getCamera();
			cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						//转化本地绝对路径
						that.rotateImg(entry.fullPath);
					});
				}, function(error) {
					console.log("---" + "捕获图像失败: " + error.message);
				}, {} //建议使用系统匹配路径
			);
		},
		getPhoto: function() {
			var that = this;
			plus.gallery.pick(function(path) {
				that.rotateImg(path);
			}, function(error) {
				console.log("---" + "捕获图像失败: " + error.message);
			})
		},
		rotateImg: function(p) {
			var that = this;
			if(p.indexOf('http') < 0) {
				~p.indexOf("file:") ? p : p = "file:///" + p;
				plus.zip.compressImage({
					src: p,
					dst: p,
					overwrite: true,
					rotate: 0 // 不管有没有被旋转，统一旋转0度
				}, function() {
					that.o.success(p)
				}, function(error) {
					mui.toast("图片旋转时发生错误!");
				});
			} else {
				that.o.success(p)
			}
	
		}
	}
	
	
})(window)