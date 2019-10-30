// 创建悬浮窗口
!(function(){
	setTimeout(function(){ // 必须异步创建View 不然第一次无法显示 这是一个Bug
		var vW = 50,vH = 50;
		var view = new plus.nativeObj.View('contact', {
			bottom: '70px',
			left: '80%',
			height: vH + 'px',
			width: vW + 'px'
		}, [{
			tag: 'img',
			id: 'img',
			src: 'images/qqIcon.png',
			position: {
				top: '0px',
				left: '0px',
				width: '100%',
				height: '100%'
			}
		}]);
	
		view.show();
	
		view.addEventListener("touchmove",function(e){
			var viewW = window.screen.width;
		    var viewH = window.screen.height;
		    var x = e.screenX;
		    var y = e.scrrenY || e.screenY;
		    var right = viewW - x - vW/2, left = x - vW/2, bottom = viewH - y - vH/2;
		    view.setStyle({bottom:bottom + 'px',left:left + 'px'});
			//console.log(JSON.stringify(bottom))
		})
		
		view.addEventListener("touchend",function(e){
			view.setStyle({bottom:'70px',left:'80%'});
		})
		
		view.addEventListener("click",function(){
			location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=3127219645&version=1&src_type=web&web_src=qq.com'
		})
	
	},300)
})()

