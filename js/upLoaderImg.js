/**
 * 上传图片插件
 * varstion 1.0.0
 * by Allen-Fei
 * tipefi@126.com
 * 参数列表：
 * el——图片容器（建议用class，可用于多个）
 * closeId——图片容器里的关闭按钮
 * bg——用于判断容器内是否存在图片
 * submitId——提交按钮ID
 * size——上传图片的文件大小
 * url——上传图片的服务器API
 * addData——上传图片时需要附带的其他参数（比如token）
 * success——上传成功的回调
 * error——上传失败的回调
 * 流程：
 * 先选择图片到图片容器（添加的图片会填充为容器背景），再点提交按钮提交到服务器
 * 用法：
 * var upLoader = new UpLoader(); // 先new出来
 * upLoader.init({}) // 再调用init初始化，传入相应参数
 * 基于zepto或jq、mui------仅限手机端
 */
(function(window, undefined) {
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
	var $this = null,
		tapInt = 0;
	var UpLoader = window.UpLoader = function() {
		this.imgUrl = []; //存放待上传的图片
		this.zoomLevel = 0; //放大状态
		this.zoomLeft = 0; //图片移动的暂存数据（左边位置）
		this.zoomTop = 0; //图片移动的暂存数据（顶部位置）
		this.o = {}; //存放传过来的参数
		this.index = 0; //当前操作的索引值
		this.m = 2; //放大倍数
		this.$imgBox = null; //浏览图片的外框Dom
	}

	UpLoader.prototype.init = function(option) {
		var that = this;
		that.o = option;
		//点击图标上传事件
		$("body").on("tap", that.o.el, function() {
			$this = $(this);
			that.index = $(that.o.el).index($this);
			if($this.hasClass(that.o.bg)) {
				that.browseImg();
				return false;
			} else {
				if($("#selectLayer").size() <= 0) {
					$("body").append(layer);

				}
			}
			mui('#selectLayer').popover('toggle');
		})
		//选择方式事件
		$("body").on("tap", "#imgLayer li", function() {
			var i = $(this).parent().children().index(this)
			switch(i) {
				case 0:
					that.getImages();
					break;
				case 1:
					that.getPhoto();
					break;
				default:
					break;
			}
			mui('#selectLayer').popover('hide');
		})
		//移除图片事件
		$("body").on("tap", that.o.closeId, function() {
			that.index = $(that.o.closeId).index(this);
			that.removeImg($(this));
		})
		//单击退出浏览事件
		$("body").on("tap", "#imgBox", function(event) {
			var _this = $(this);
			tapInt = 0;
			if(!tapInt) {
				setTimeout(function() {
					if(tapInt == 0) {
						_this.remove();
						tapInt = 0
					}
				}, 500)
			}
		})
		//双击放大事件
		$("body").on("doubletap", "#imgBox", function() {
			var _this = $(this);
			if(that.zoomLevel) {
				that.zoomOut()
			} else {
				that.zoomIn()
			}
			tapInt = 2;
		})

		//拖动中事件
		$("body").on("drag", "#imgBox img", function(e) {
			if(that.zoomLeft == 0) return false;
			$("#imgBox").children("img").css({
				"margin-left": that.zoomLeft + event.detail.deltaX + "px",
				"margin-top": that.zoomTop + event.detail.deltaY + "px"
			})
		})
		//拖动结束
		$("body").on("dragend", "#imgBox img", function(e) {
			if(that.zoomLeft == 0) return false;
			that.zoomLeft += event.detail.deltaX; //要在拖动结束后保存位置
			that.zoomTop += event.detail.deltaY;
		})
		//提交事件
		$("body").on("tap", that.o.submitId, function() {
			that.imgSubmit();
		})
	}

	//拍照获取图片
	UpLoader.prototype.getImages = function() {
		var that = this;
		var cmr = plus.camera.getCamera();
		cmr.captureImage(function(p) {
				plus.io.resolveLocalFileSystemURL(p, function(entry) {
					//转化本地绝对路径
					that.displayImg(entry.fullPath);
				});
			}, function(error) {
				console.log("---" + "捕获图像失败: " + error.message);
			}, {} //建议使用系统匹配路径
		);
	}

	//从相册获取图片
	UpLoader.prototype.getPhoto = function() {
		var that = this;
		plus.gallery.pick(function(path) {
			that.displayImg(path);
		}, function(error) {
			console.log("---" + "捕获图像失败: " + error.message);
		})
	}

	//填充图片
	UpLoader.prototype.displayImg = function(p) {
		var that = this;
		that.rotateImg(p)
	}

	//处理旋转，iOS上坚向照片填充时会自动逆时钟旋转90，故用压缩方法旋转0度
	UpLoader.prototype.rotateImg = function(p) {
		var that = this;
		if(p.indexOf('http') < 0) {
			~p.indexOf("file:") ? p : p = "file:///" + p;
			plus.zip.compressImage({
				src: p,
				dst: p,
				overwrite: true,
				rotate: 0 // 不管有没有被旋转，统一旋转0度
			}, function() {
				that.imgUrl[that.index] = p;
				$this.addClass(that.o.bg).css({
					"background-image": "url(" + p + ")"
				})
			}, function(error) {
				mui.toast("图片旋转时发生错误!");
			});
		} else {
			var index = that.imgUrl.indexOf(p);
			$(that.o.el).eq(index).addClass(that.o.bg).css({
				"background-image": "url(" + p + ")"
			})
		}

	}

	//移除图片
	UpLoader.prototype.removeImg = function(_this) {
		var that = this;
		that.imgUrl[that.index] = "";
		_this.next(that.o.el).removeClass(that.o.bg).removeAttr("style");
	}

	//放大追加图片浏览DOM
	UpLoader.prototype.browseImg = function(index) {
		$("body").append('<div id="imgBox"></div>');
		var that = this;
		that.$imgBox = $("#imgBox");
		that.$imgBox.css({
			"position": "absolute",
			"top": 0,
			"left": 0,
			"width": "100%",
			"height": "100%",
			"background": "#000",
			"z-index": 9999,
			"overflow": "hidden;"
		}).append('<img>').children("img").attr("src", that.imgUrl[that.index]).css("width", "100%");
		that.zoomLeft = 0;
		that.zoomTop = (window.screen.height - 20 - that.$imgBox.children("img").height()) / 2;
		that.upImgPostion();
	}

	//更新图片显示位置
	UpLoader.prototype.upImgPostion = function(type) {
		var that = this;
		var imgH = that.$imgBox.children("img").height();
		var imgW = that.$imgBox.children("img").width();
		var winH = window.screen.height - 20;
		var winW = window.screen.width;
		if(imgH < winH) {
			that.$imgBox.children("img").css({
				"margin-top": (winH - imgH) / 2 + "px"
			})
		}
		if(type == "in") {
			that.$imgBox.children("img").css({
				"margin-left": (that.zoomLeft - imgW / that.m / that.m) + "px",
				"margin-top": (that.zoomTop - imgH / that.m / that.m) + "px"
			})
			that.zoomLeft = that.zoomLeft - imgW / that.m / that.m;
			that.zoomTop = that.zoomTop - imgH / that.m / that.m;
		}
		if(type == "out") {
			that.$imgBox.children("img").css({
				"margin-left": "0px",
				"margin-top": (winH - imgH) / 2 + "px"
			})
			that.zoomLeft = 0;
			that.zoomTop = (winH - imgH) / 2;
		}
	}

	//图片放大 
	UpLoader.prototype.zoomIn = function() {
		var that = this;
		that.$imgBox.children("img").width(that.$imgBox.children("img").width() * that.m); //不要设置高度，因为高度是随宽度变化的
		that.zoomLevel = 1;
		that.upImgPostion("in");
	}

	//图片缩小
	UpLoader.prototype.zoomOut = function() {
		var that = this;
		that.$imgBox.children("img").width(that.$imgBox.children("img").width() / that.m);
		that.zoomLevel = 0;
		that.upImgPostion("out");
	}

	//添加数据
	UpLoader.prototype.addData = function(obj) {
		this.data = obj;
	}

	//添加图片
	UpLoader.prototype.addImg = function(arr) {
		if(arr instanceof Array) {
			for(var i = 0; i < arr.length; i++) {
				this.imgUrl.push(arr[i]);
				this.displayImg(arr[i])
			}
		} else {
			this.displayImg(arr)
		}
	}

	//提交图片
	UpLoader.prototype.imgSubmit = function() {
		var that = this;
		that.data = that.o.addData instanceof Function ? that.o.addData() : '';
		if(that.data === false) return false;
		var task = plus.uploader.createUpload(that.o.url, {
			method: "POST",
			blocksize: that.o.size,
			priority: 100
		}, function(t, status) {
			// 上传完成
			if(status == 200) {
				that.o.success(t, status);
			} else {
				that.o.error(t, status);
			}
		})
		for(var i = 0; i < that.imgUrl.length; i++) {
			if(that.imgUrl[i]) { //遍历图片数组，去除空的值
				task.addFile(that.imgUrl[i], {
					key: "img" + i
				});
			}
		}

		if(JSON.stringify(that.data) != "{}" || !JSON.stringify(that.data)) {
			for(var key in that.data) {
				task.addData(key, that.data[key]);
			}

		}

		task.start();
	}

})(window)