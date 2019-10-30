!function(window, undefined){
	var rePush = window.rePush = {
		init: function(){
			var that = this;
			//var p = plus.audio.createPlayer( "images/2478.wav" );
			//plus.push.setAutoNotification( false );//不显示透传信息
			//p.play()
			// APP在后台时，点击消息栏事件
			plus.push.addEventListener("click", function(msg) {
				console.log('APP在后台接收消息');
				mui.alert("msg__"+JSON.stringify(msg))
				var payload = (plus.os.name == 'iOS') ? msg.payload : JSON.parse(msg.payload);
				that.pushGetRun(payload);
			}, false);     
	
			// APP在前台时，监听推送消息
			plus.push.addEventListener("receive", function(msg) {
				console.log('APP前台接收消息');
				mui.alert("msg__"+JSON.stringify(msg.payload))
				var payload = (plus.os.name == 'iOS') ? msg.payload.payload : JSON.parse(msg.payload);
				//mui.alert("payload__"+JSON.stringify(payload))
				if(payload) {
			        that.createLocalPushMsg(payload);
			   }		
			}, false);
		},
		createLocalPushMsg: function(payload){
			var that = this;
			mui.alert('createLocalPushMsg' + payload.messType);
		    if(payload.messType == "30"){		
				that.addBill(payload);
				if(plus.os.name != 'iOS'){
					plus.push.createMessage(payload.messTitle, payload, {cover:false} );
				}
			}else{
				that.setRedDot(payload);
				if(plus.os.name != 'iOS'){
					plus.push.createMessage(payload.messTitle, payload, {cover:false} );
				}
			}		
		},
		setRedDot: function(payload){ // 消息类型为10，20时，未读状态存入本地
			var msg = JSON.parse(localStorage.getItem("SC_MESSAGE"));
			mui.alert("payload__"+JSON.stringify(payload))
			var o = {};
			o.id = payload.messId;
			o.type = payload.messType;
			o.data = payload.data || "";
			o.state = '0';
			mui.alert("O__"+JSON.stringify(o))
			if(msg) {
				msg.push(o);
			} else {
				msg = [o];
			}
			localStorage.setItem("SC_MESSAGE", JSON.stringify(msg));
			setTimeout(function() {
				isRedDotbill(); 
				evalId("msg_index.html", ["isRedDot"]);
			}, 300)
		},
		pushGetRun: function(payload){ // 点击消息时进入相关页面
			var that = this;
			if(payload.messType == "30"){
				openWV('money_detail.html', {
					pUrl: pId,
					bID: payload.data.t01id,
					bStatus: payload.data.ddStatus,
					messType: payload.messType
				})
			}else{
				openWV('msg_activiList.html', {
					pUrl: pId,
					messType: payload.messType
				})
			}
		},
		addBill: function(payload){
			plus.webview.getWebviewById('tab_store.html').evalJS('pushMsg('+JSON.stringify(payload)+')');
			plus.webview.getWebviewById('index.html').evalJS('addTip()');
		}
	}
}(window)
