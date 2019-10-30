var USERINFO = {
	CH_APPWEB:'http://bp.timesdata.net/appweb/dulong',
//	DL_HOST:'http://124.232.133.207:8402',
//	DL_HOST:'http://124.232.133.207:8500',   神利金
	DL_HOST:'https://dlapp.x2x.cn', 
	DL_DEVICEID: localStorage.getItem('DL_DEVICEID'),
	DL_APPID: localStorage.getItem('DL_APPID'), 
	
//	测试
//	DL_PUBLIC_KEY: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnuYCdk/txq3O1zicQLmZEIBK6LsiWPvk3yRNmqd+hiLGp6aC+rtuc/AYW6h63M3U1yvDSwIE00ZKWCp9WAfc6NdZ3FWRpwI3tCF7C3hrYCWDhlFcwTW5ItD7o1iQdQhqD0PM/wdK4z0ixCx3kZI+YK2qCQ8zbm9VUmZKJco4b9ewmr1y6DojU57uHgymAmXRq2i1Oj4Qn1mpaYGlvQyq5HVcJPTMNLwweSj3vwvkqBA9sTCckCc5PqSqP0bH8teZTkIfNE0Jd/HFGZ+OX48tGSi6IAKU9yrvZ2g4wpus6CYtWknQg5mer1QVhvjRxOuVJqU0MaVl478dnyZynGBthwIDAQAB',
//正式
	DL_PUBLIC_KEY: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxau4xYhlccyGAiK5q/qLRfhDWNuUeLjpFmo/zTWHh7JGiIa6Ftc97OZKdMSVhxX82RFYe7W2tFbga7r+f4s+ygezCHYay6vzENIuiRKbg+iaAEaL1uUnR8zyOcgLBiX0GnG4uWysjAIFPClq2neVh8hQ2xveMZD3wmFtmkmjraYFP1f610akxx1UxQBNdcxW6nLOSBi6+ffXI43VKJAEePb2WGnx+wIi5O3ijxX5DzpvJPMLpFcmCcB8i4lYkFxLrHm6MtVRBvYWXnP67bPGHRRAG97C5B2qwWSMIZtZSqH/emW6Yq+KuXsAzOrK2exRFm8RMWah4ER5oEO8EO1/AQIDAQAB'
}

//判断商家信息是否完善--暂时不用--170114
function checkInfo(t, p){
	var url	= host+'/index/Center/checkInfo';
	var dataType = 'json';
	var data = {
		deviceid: deviceid,
		username: JSON.parse(localStorage.getItem('DL_USERINFO')).username
	}
	
	mui.post(url, data, function(data){
		//console.log(data);
		var d = JSON.parse(data);
		wt = false;
		
		if(d.msg == '1'){
			//去完善资料 
			plus.nativeUI.closeWaiting();
			mui.openWindow({
				id: 'completeInfo.html',
				url: 'completeInfo.html',
				waiting:{
					autoShow: false
				},
				extras: {
					pUrl: p
				}
			});
		}else{
			plus.nativeUI.closeWaiting();
			mui.openWindow({
				id: t,
				url: t,
				waiting:{
					autoShow: false
				},
				extras: {
					pUrl: p
				}
			});
		}
		
	}, dataType);
}

//是否绑定提现银行卡
function cashBindAjax(t, p){
	var url	= host+'/index/center/checkBank';
	var dataType = 'json';
	var data = {
		deviceid: deviceid,
		username: JSON.parse(localStorage.getItem('DL_USERINFO')).username
	}
	
	mui.post(url, data, function(data){
		//console.log(data);
		var d = JSON.parse(data);
		
		if(d.msg == '1'){
			//未绑卡
			plus.nativeUI.closeWaiting();
			mui.openWindow({
				id: 'cashBankCard.html',
				url: 'cashBankCard.html',
				waiting:{
					autoShow: false
				},
				extras: {
					pUrl: p
				}
			});
		}else if(d.msg == '3'){
			loginView(d)
		}else{
			plus.nativeUI.closeWaiting();
			mui.openWindow({
				id: t,
				url: t,
				waiting:{
					autoShow: false
				},
				extras: {
					pUrl: p
				}
			});
		}
		
	}, dataType);
}

function getPage(t){
	var n = t.toString().lastIndexOf("/");
	var r = t.substr(n+1);
	
	if(r && ~r.indexOf('.html')){
		return r;
	}else{
		return '';
	}
}

/**
 * 提交数据等待 12s 超时
 * 调用waitSec()，更改 wt = false  clearTimeout(wtTimer) plus.nativeUI.closeWaiting(); 来终止
 * */
var wt; 
var wtTimer = null;
function waitSec(){
	wt = true;
	plus.nativeUI.showWaiting('', {background:'rgba(100,100,100,0.8)'});
	
	wtTimer = setTimeout(function(){
		if(wt){
			plus.nativeUI.closeWaiting();
			mui.toast('加载超时');
		}else{
			plus.nativeUI.closeWaiting();
			clearTimeout(wtTimer);
		}
	}, 12000);
}

	//计算两个经纬度的距离
	var DEF_PI = 3.14159265359; // PI
    var DEF_2PI = 6.28318530712; // 2*PI
    var DEF_PI180 = 0.01745329252; // PI/180.0
    var DEF_R = 6370693.5; // radius of earth
    function getShortDistance(lon1, lat1, lon2, lat2) {
        var ew1, ns1, ew2, ns2;
        var dx, dy, dew;
        var distance;
        // 角度转换为弧度
        ew1 = lon1 * DEF_PI180;
        ns1 = lat1 * DEF_PI180;
        ew2 = lon2 * DEF_PI180;
        ns2 = lat2 * DEF_PI180;
        // 经度差
        dew = ew1 - ew2;
        // 若跨东经和西经180 度，进行调整
        if (dew > DEF_PI)
            dew = DEF_2PI - dew;
        else if (dew < -DEF_PI)
            dew = DEF_2PI + dew;
        dx = DEF_R * Math.cos(ns1) * dew; // 东西方向长度(在纬度圈上的投影长度)
        dy = DEF_R * (ns1 - ns2); // 南北方向长度(在经度圈上的投影长度)
        // 勾股定理求斜边长
        distance = Math.sqrt(dx * dx + dy * dy).toFixed(0);
        return distance;
    }
    //getShortDistance(116.357428,39.90923,116.397428,39.90923);
    //getShortDistance(28.19321, 112.890443, 28.17321, 112.890443);

//打开登录窗口
function loginView(d){
	plus.nativeUI.closeWaiting();
	mui.toast(d.info);
	localStorage.removeItem('DL_USERINFO');
	localStorage.removeItem('DL_IDENTTYPE');
	clearTimeout(wtTimer);								
	var loginView = plus.webview.getWebviewById('login.html');
	if(loginView){
		plus.webview.show(loginView, 300);
	}else{
		mui.openWindow({
			id: 'login.html',
			url: 'login.html',
			waiting:{
				autoShow: true,
				options:{
					background:'rgba(100,100,100,0.8)'
				}
			}
		});
	}
	return false;
}




