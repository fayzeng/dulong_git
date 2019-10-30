/**
 * 上拉加载下拉刷新插件
 * varstion 1.0.0
 * by Allen-Fei
 * tipefi@126.com
 * 参数列表：
 * el——内容DOM
 * downEl——下拉刷新的提示文字DOM
 * upEl——上拉加载的提示文字DOM
 * downArea——向下滑动距离
 * isLock——是否关闭下拉刷新
 * isBt——是否关闭上拉加载
 * downFn——向下滑动回调方法
 * upFn——向上滑动回调方法
 * 用法：
 * var udp = new Updownpull({
 * el: ".bill_scroll",
 * downEl: ".slideDown",
 * upEl: ".loadMore",
 * downArea: 50,
 * downFn: function(){
 * 		that.PAGE = 1;
 * },
 * upFn: function(){
 * 		that.PAGE++;
 * }
 * });
 * 版权：使用请说明出处
 * 基于zepto或jq、mui------仅限手机端
 */
var Updownpull = window.Updownpull = function(option){
	var o = {
        el:option.el || "#warpper",			// 内容DOM
        downArea: option.downArea || 60,	// 向下滑动距离
        downFn: option.downFn,				// 向下滑动回调方法
        upFn: option.upFn,					// 向上滑动回调方法
        downEl: option.downEl,				// 下拉刷新的提示文字DOM
		upEl: option.upEl,					// 上拉加载的提示文字DOM
		isLock: option.isLock || false,		// 是否关闭下拉刷新
		isBt: option.isBt || false			// 是否关闭上拉加载
    }
	var winH = $(window).height();		// 窗口高度
	var $el = $(o.el); 					// 内容框
	var $elParent = $el.parent();		// 内容父框
	var $downEl = $(o.downEl);			// 下拉刷新的提示文字DOM
	var $upEl = $(o.upEl); 				// 上拉加载的提示文字DOM
	var startY, 						// 开始移动的Y坐标
		moveY,							// 移动中的Y坐标
		distance, 						// 移动的距离
		isCanDo = false, 				// 是否移动滑块
		isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),  	// 检测当前设备是否是hp产品
		hasTouch = 'ontouchstart' in window && !isTouchPad;			// 判断当前设置是否包含滑动事件
		
	$el.on("touchstart", moveStart); 	// 开始移动事件
	$el.on("touchmove", moveIng); 		// 移动中事件
	$el.on("touchend", moveEnd); 		// 移动结束事件
	
	// 内容父框滚动事件
	$elParent.scroll(function(){
		var $this = $(this);
		//判断是否到了底部（内容父框的高度+滚动条的距离>=内容框高度时）
		if($this.height() + $this.scrollTop() >= $el.height() && !o.isBt){ 
			o.isBt = true;
			o.upFn();
		}
	});
	
	// 设置上拉状态（参数：page请求的页数，size每页的总数，len请求返回的数据长度）
	// 数据请求成功后，可调用此方法，控制底部的文字提示
	this.setIsBt = function(page, size, len){
		if(len){
			if(len < size  && page >= 1){
				if(page == 1){
					setTimeout(function(){
						if($el.height() > $elParent.height()){
							$upEl.html('到此为止');
						}else{
							$upEl.html('');
						}
					},300)
				}else{
					$upEl.html('到此为止');
				}
				o.isBt = true;
			}else{
				$upEl.html('努力加载中...');
				
				o.isBt = false;
			}
		}else{
			if(page > 1){
				$upEl.html('到此为止');
			}else{
				$upEl.html('空空如也');
			}
			o.isBt = true;
		}
	}
	
	function moveStart(e){
		distance = 0; //再次刷新时重置拉动距离		
		if($elParent.scrollTop() <= 0 && !o.isLock) {
			var even = typeof event == "undefined" ? e : event;
			o.isLock = true;
			isCanDo = true;
			offsetY = 0;

			//保存开始滑动Y坐标
			startY = hasTouch ? even.touches[0].pageY : even.pageY;
			//消除滑块动画时间
			fn.setTranslition(0);
		}
	}
	
	function moveIng(e){
		if($elParent.scrollTop() <= 0 && isCanDo) {
			var even = typeof event == "undefined" ? e : event;
			var goDistance = 0;
			moveY = hasTouch ? even.touches[0].pageY : even.pageY; // 保存当前移动Y坐标

			distance = moveY - startY; // 计算移动的Y轴距离（结束位置减去开始位置）

			if(distance > 0) {
				even.preventDefault();
				//消除滑块动画时间
				fn.setTranslition(0);
				//移动滑块
				if(distance <= o.downArea) {
					goDistance = distance;
					fn.translateY(goDistance);
					$downEl.html('下拉可刷新')
				} else if(distance < o.downArea * 2) {
					goDistance = o.downArea + (distance - o.downArea) * 0.5;
					fn.translateY(goDistance);
					$downEl.html('松开立即刷新');
				} else {
					goDistance = o.downArea + o.downArea * 0.5 + (distance - o.downArea * 2) * 0.2;
					fn.translateY(goDistance);
					$downEl.html('松开立即刷新');
				}
				
				
				
				if((startY + distance + 8) > winH) {
					moveEnd(e)
				}
			} else {
				fn.back();
				return;
			}

		}
	}
	
	function moveEnd(e){
		if(isCanDo){
			fn.setTranslition(0.2);									//设置滑块回弹时间
			isCanDo = false;
			if(distance > o.downArea) {								//判断滑动距离是否大于等于指定值
				fn.translateY(50);									//保留提示部分
				$downEl.html('正在刷新中...');
				
				//执行回调函数
				if(typeof o.downFn == "function") {
					o.downFn();
					var t = setTimeout(function() { 				//0.5秒后回归初始状态
						fn.back();
						clearTimeout(t);
					}, 500);
				}
			} else {
				
				fn.back();
			}
		}
	}
	
	// 动画方法
	var fn = {
		translateY: function(diff) {	// 移动容器
			$el.css({
				"-webkit-transform": "translate3d(0," + diff + "px,0)",
				"transform": "translate3d(0," + diff + "px,0)"
			});
			$downEl.html("下拉可刷新");
		},
		setTranslition: function(time) {	// 设置效果时间
			$el.css({
				"-webkit-transition": "all " + time + "s linear",
				"transition": "all " + time + "s linear"
			});
		},
		back: function() {			// 返回初始状态
			fn.translateY(0);
			$downEl.html('下拉可刷新');
			o.isLock = false;
		}
	};
}
