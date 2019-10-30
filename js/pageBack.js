/**
 * 返回事件，并调用上一个页面的推送事件
 * */
var oldBack = mui.back;

mui.back = function() {
	if(self.pUrl){
		plus.webview.getWebviewById(self.pUrl).evalJS('reLink()');
		//console.log(self.pUrl);
	}

	oldBack();
};
