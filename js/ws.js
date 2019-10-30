function reconnect(){
	var ws = new ReconnectingWebSocket('ws://139.224.94.49:2887');
	//var ws = new ReconnectingWebSocket('ws://59.110.20.214:9999');
	
	ws.onopen = function (){
		var uid = USERINFO.DL_DEVICEID;
		ws.send(USERINFO.DL_USERNAME+','+uid);
	};
	ws.onmessage = function(e){
	    console.log(e.data);
	    var d = e.data;
	    
	    if(d){
	    	console.log('推送'+ d);
	    	plus.webview.getWebviewById('tab_store.html').evalJS('pushMsg('+d+')');
	    	plus.webview.getWebviewById('index.html').evalJS('addTip()');
	    }
	};
}

function reLink(){
	reconnect();
}

reLink();