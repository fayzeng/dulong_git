	/**
	 * 更新分享服务
	 */
	function updateSerivces(){
		plus.share.getServices( function(s){
			shares={};
			for(var i in s){
				var t=s[i];
				shares[t.id]=t;
			}
			console.log('s'+JSON.stringify(s));
			console.log('shares'+JSON.stringify(shares));
		}, function(e){
			console.log( "获取分享服务列表失败："+e.message );
		} );
	}

	/*
	 * 分享 
	 */
	function shareShow(shareData){
		var ids=[{id:"weixin",ex:"WXSceneSession"},{id:"weixin",ex:"WXSceneTimeline"},{id:"sinaweibo"}],
		bts=[{title:"发送给微信好友"},{title:"分享到微信朋友圈"},{title:"分享到新浪微博"}];
		plus.nativeUI.actionSheet({cancel:"取消",buttons:bts},
			function(e){
				var i=e.index;
				if(i>0){
					shareAction(ids[i-1].id,ids[i-1].ex,shareData);
				}
			}
		);
	}
	
	/**
	 * 分享操作
	 * @param {JSON} id 分享操作对象s.s为分享通道对象(plus.share.ShareService)
	 * @param {Boolean} ex 是否分享链接
	 */
	function shareAction (id,ex,shareData){
		var s = null;
		
		if(!id || !(s = shares[id])){
			console.log( "无效的分享服务！" );
			return;
		}
		if(s.authenticated){
			console.log("---已授权---");
			shareMessage(s,ex,shareData);
		} else {
			console.log("---未授权---");
			//TODO 授权无法回调，有bug
			s.authorize( function(){
				console.log("授权成功...");
				shareMessage(s,ex,shareData);
			},function(e){
				console.log( "认证授权失败："+e.code+" - "+e.message );
			});
		}
	}


	var sharecount = 0;
	/**
	 * 发送分享消息
	 * @param {JSON} msg
	 * @param {plus.share.ShareService} s
    */
	function shareMessage(s,ex,shareData){
		console.log('shareData'+ JSON.stringify(shareData));
		//console.log("分享前的参数"+JSON.stringify(shareData))
		var msg={content:'独龙分享',extra:{scene:ex}};
		msg.href=shareData.share_url;
		msg.title=shareData.title;
		//msg.title='扫码123';
		//msg.content=shareData.author;
		msg.content='独龙，您的生活好助手';
		msg.thumbs=["_www/images/logo.png"];
		msg.pictures=["_www/images/logo.png"];
		console.log("分享前的参数"+JSON.stringify(msg))
		if (~s.id.indexOf('weibo')) {
            msg.content = "；独龙，您的生活好助手："+shareData.share_url;
        }
		s.send( msg, function(){
			console.log('成功了');
			evalId('wallet.html', ['moneyExchange']);
			mui.alert('分享成功');
		}, function(e){
			evalId('wallet.html', ['moneyExchange']);
			mui.alert("分享失败");
		} );
	}   