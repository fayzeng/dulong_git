/**
 * 字体rem 设计稿大小/32(640*28)
 * */
(window.__setFontSize__ = function() {
	document.documentElement.style.fontSize = Math.min(640, Math.max(document.documentElement.clientWidth, 320)) / 320 * 14 + 'px'
})()

/**
 * 接口域名
 * */
function getDomain() {
	var siteUrl = 'http:// 124.232.133.207:8080';
	return siteUrl;
}

function isEmail(b) {
	var a = /^[a-zA-Z0-9]{1,40}[\w\.]*@[a-zA-Z0-9]{1,40}\.{1}[\w\.]{2,40}$/;
	//var a = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/;
	return a.test(b);
}

function isPhone(b) {
	var a = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
	if(!a.exec(b)) {
		return false
	} else {
		return true
	}
}

function isMobile(a) {
	var b = /^(((1[3-8][0-9]{1}))+\d{8})$/;
	if(!b.test(a)) {
		return false
	} else {
		return true
	}
};
//var b = /^0?1[3|4|5|7|8][\d]{1}[-\s]?[\d]{4}[-\s]?[\d]{4}$/ ;

function Trim(str, is_global) {
	var result;
	result = str.replace(/(^\s+)|(\s+$)/g, "");
	if(is_global.toLowerCase() == "g") {
		result = result.replace(/\s/g, "");
	}
	return result;
}

function isIdentity(b) {
	//var a = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
	var a = /^[1-9]{8}$|^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
	if(!a.test(b)) {
		return false
	} else {
		return true
	}
}

function isBank(b) {
	var a = /^\d{15}|\d{16}|\d{19}$/;
	if(!a.test(b)) {
		return false
	} else {
		return true
	}
}

function is6Pwd(a) {
	var b = /^\d{6}$/;
	if(!b.test(a)) {
		return false
	} else {
		return true
	}
};

/*自动添加单位
 * 参数:Integral:需要添加单位的数字
 * num:保留的小数位
 * 逻辑:根据传进去的参数去除以10000然后添加单位
 */
function abbreviation(Integral, num) {
	if(!Integral|| Integral == null || Integral == '' || Integral == 'null' || Integral == 'false') {
		Integral = 0;
	}	
	Integral = Integral-0;
	if(Integral < 10000) {
		Integral = Integral.toFixed(num);
	} else if(Integral >= 10000) {
		Integral = (Integral / 10000).toFixed(2) + '万';
	} else if(Integral <= 0) {
		Integral = 0;
	}
	return Integral;
};

function quotation(Integral, num) {
	if(!Integral|| Integral == null || Integral == '' || Integral == 'null' || Integral == 'false') {
		Integral = 0;
	}	
	Integral = Integral-0;
	if(Integral < 10000) {
		Integral = Integral.toFixed(num);
	} else if(Integral >= 10000) {
		Integral = (Integral / 10000).toFixed(num) + 'w';
	} else if(Integral <= 0) {
		Integral = 0;
	}
	return Integral;
};
/*处理null和空字符串
 * 参数:Integral:需要处理的null,空字符串等
 * 
 */
function dealnull(Integral) {
	if(!Integral|| Integral == null || Integral == '' || Integral == 'null' || Integral == 'false') {
		return '0';
	} else {
		return Integral;
	}
}

function objID(id) {
	return typeof id === 'string' ? document.getElementById(id) : id;
}

function userType(n, c) {
	if(c) {
		return c;
	} else {
		switch(n) {
			case '0':
				return '支付宝用户';
				break;
			case '1':
				return '微信用户';
				break;
			case '2':
				return '银联用户';
				break;
			default:
				return '未知用户';
				break;
		}
	}
}
//付款账单状态
function payStatus(n) {
	switch(n) {
		case '0':
			return '付款失败';
			break;
		case '1':
			return '付款成功';
			break;
		default:
			return '付款失败';
			break;
	}
}
//兑换积分审核状态
function payStatuss(n) {
	switch(n) {
		case '10':
			return '待审核';
			break;
		case '20':
			return '审核通过';
			break;
		default:
			return '审核失败';
			break;
	}
}

//付款账单状态
function jiaoStatus(n) {
	switch(n) {
		case '30':
			return '交易失败';
			break;
		case '20':
			return '交易成功';
			break;
		case '10':
			return '生成交易';
			break;
		case '23':
			return '部分成功';
			break;			
		case '100':
			return '';
			break;	
		case undefined:
			return '';
			break;	
		case null:
			return '';
			break;	
		case '':
			return '';
			break;				
		default:
			return '交易失败';
			break;
	}
}

//充值账单状态
function rechange(n) {
	switch(n) {
		case '30':
			return '交易失败';
			break;
		case '20':
			return '交易成功';
			break;
		case '10':
			return '未付款';
			break;
		case '100':
			return '';
			break;			
		default:
			return '交易失败';
			break;
	}
}


//红包账单状态
function redbags(n){
	switch (n){
		case '30':
			return '已过期';
			break;
		case '20':
			return '已完成';
			break;
		case '10':
			return '待领取';
			break;
		case '21':
			return '有退款';
			break;			
		case '23':
			return '进行中';
			break;	
		case '12':
			return '审核成功';
			break;				
		default:
			return '已失效';
			break;
	}
}

function payWay(n) {
	switch(n) {
		case '0':
			return '支付宝10';
			break;
		case '1':
			return '微信10';
			break;
		case '2':
			return '银联支付';
			break;
		case '3':
			return '手动记账';
			break;
		case '40T0':
			return '支付宝秒到';
			break;
		case '41T0':
			return '微信秒到';
			break;
		case '40T1':
			return '支付宝20';
			break;
		case '41T1':
			return '微信20';
			break;
		default:
			return '未知通道';
			break;
	}
}

//暂时隐藏  无人用
function storeWay(t) {
	if(t == '2') {
		//return '商户银联账户';
		return '小额测试商户';
	} else {
		return '商家余额';
	}
}

function custN(n, c) {
	if(!!c) {
		return c;
	} else {
		return n;
	}
}

function iconType(n) {
	switch(n) {
		case '0':
			return 'way_zhi';//支付宝
			break;
		case '1':
			return 'way_wechat';//微信
			break;
		case '2':
			return 'way_yin';//银联
			break;
		case '3':
			return 'way_yin';//银联
			break;
		case '40T0':
			return 'way_zhi';//支付宝
			break;
		case '41T0':
			return 'way_wechat';//微信
			break;
		case '40T1':
			return 'way_zhi';//支付宝
			break;
		case '41T1':
			return 'way_wechat';//微信
			break;
		case '24T0':
			return 'way_wallet';//钱包
			break;
		case '2T0':
			return 'way_wallet';//微信
			break;	
		case '25T1':
			return 'way_easy';//微信
			break;
		default:
			return 'way_yin';//银联
			break;
	}
}

/**
 * 根据后台传过来的通道数据去判断是属于哪一个支付通道
 **/
function payIconType(n){
	if(n == "A") return 'way_zhi';
	if(n == "W") return 'way_wechat';
	if(n == "U") return 'way_yin';
	if(n == "H") return 'way_hebao';
	if(n == "E") return 'way_wallet';
	if(n == "Q") return 'way_easy';
	if(n == "O") return 'way_qq';
}

/**
 * t 类型  收款：1 付款：2
 * c 收款渠道  支付宝 0 微信 1 银联 2
 * r 已读 or 未读
 * n 银行卡的名字
 * */
//function billImg(t, c, r, n){
//	if(t == '1'){
//		return '<span class="'+ iconType(c) +'"></span>'+ readyYet(r);
//	}else{
//		return '<img src="images/bank/bankLogo'+ bankLogo(n) +'.png" />'
//	}
//}

function billImg(n) {
	return '<img src="images/bank/bankLogo' + bankLogo(n) + '.png" />'
}

/**
 * d 支付是否状态
 * */
function billStatus(t, d) {
	if(t == '1') {
		return stateType(d);
	} else {
		return cStateType(d);
	}
}

/**
 * w 付款对象
 * */
function billWho(t, c, w) {
	if(t == '1') {
		return userType(c);
	} else {
		return notNull(w);
	}
}

function stateType(n) {
	switch(n) {
		case '0':
			return '<h6 class="tfail">等待收款</h6>';
			break;
		case '1':
			return '<h6>收款成功</h6>';
			break;
		case '2':
			return '<h6 class="tfail">收款失败</h6>';
			break;
		default:
			break;
	}
}

function stateType3(n) {
	switch(n) {
		case '0':
			return '等待收款';
			break;
		case '1':
			return '收款成功';
			break;
		case '2':
			return '收款失败';
			break;
		default:
			break;
	}
}

function stateType2(n) {
	switch(n) {
		case '0':
			return '<h6 class="tfail">等待支付</h6>';
			break;
		case '1':
			return '<h6>支付成功</h6>';
			break;
		case '2':
			return '<h6 class="tfail">支付失败</h6>';
			break;
		default:
			break;
	}
}

function paySF(n, s) {
	if(n != 1) {
		return '<em class="pfail">' + floatNum(s) + '</em>';
	} else {
		return '<em>+' + floatNum(s) + '</em>'
	}
}

function payF(n, s) {
	if(n != 1) {
		return '<em class="pfail">' + floatNum(s) + '</em>';
	} else {
		return '<em>-' + floatNum(s) + '</em>'
	}
}

function payFF(n, s) {
	if(n == '10') {
		return '<em class="pfail">' + floatNum(s) + '<span class="yuan">元</span>' + '</em>';
	} else if(n == '20') {
		return '<em class="pfail">' + floatNum(s) + '<span class="yuan">元</span>' + '</em>';
	} else if(n == '30') {
		return '<em class="pfail">' + floatNum(s) + '<span class="yuan">元</span>' + '</em>';
	}
}

function payFs(n, s) {
	if(n != 20) {
		return '<em class="pfail">' + floatNum(s) + '</em>';
	} else {
		return '<em>' + floatNum(s) + '</em>'
	}
}

//合并参数
function paySF1(t, n, s) {
	//	var str;
	//	t == '1' ? n == '1' ? str = '<em>+'+ floatNum(s) +'</em>' : str = '<em class="pfail">'+ floatNum(s) +'</em>' : str = '<em>-'+ floatNum(s) +'</em>'
	//	return str;

	if(t == '1') {
		if(n != 1) {
			return '<em class="pfail">' + floatNum(s) + '</em>';
		} else {
			return '<em>+' + floatNum(s) + '</em>'
		}
	} else {
		if(n != 1) {
			return '<em class="pfail">' + floatNum(s) + '</em>';
		} else {
			return '<em>-' + floatNum(s) + '</em>'
		}
	}
}

function refundTip(t, s) {
	var n = t - s;

	if(n == 0) {
		return '<i>已全部退款</i>';
	} else if(n < t) {
		return '<i>部分退款(-' + floatNum(s / 100) + ')</i>';
	} else {
		return '';
	}
}

function payFee(n, s) {
	if(n != 1) {
		return '<em class="pfail">' + floatNum(s) + '</em>';
	} else {
		return '<em>+' + floatNum(s) + '</em>'
	}
}

//天
function dateHtml(day, come) {
	var html = '';
	html += '<div class="bill_date opacity">';
	html += '<span>支出：￥' + floatNum(come / 100) + '</span>';
	html += '<p>' + day + '</p>';
	html += '</div>';

	return html;
}

//日期和日历
function dateHtmlrili(day, come) {
	var html = '';
	html += '<div class="bill_date opacity">';
	html += '<span class="iconfont icon-rili" id="calendar"></span>';
	html += '<p>' + day + '</p>';
	html += '</div>';

	return html;
}

//天
function datHtml(day, come) {
	var html = '';
	html += '<div class="bill_date opacity">';
	html += '<span>收入：￥' + floatNum(come / 100) + '</span>';
	html += '<p>' + day + '</p>';
	html += '</div>';

	return html;
}

//天
function dateTit(day) {
	var html = '';
	html += '<div class="bill_date">';
	html += '<p>' + day + '</p>';
	html += '</div>';

	return html;
}

//提现记录状态
function cashState(n) {
	switch(n) {
		case '0':
			return '审核中';
			break;
		case '1':
			return '审核通过';
			break;
		case '12':
			return '提现中';
			break;
		case '2':
			return '提现成功';
			break;
		case '3':
			return '提现失败';
			break;
		case '4':
			return '审核失败';
			break;
		default:
			break;
	}
}

function cashStatetwo(n){
	switch(n) {
		case '10':
			return '审核中';
			break;
		case '12':
			return '审核成功';
			break;
		case '13':
			return '审核失败';
			break;
		case '20':
			return '交易成功';
			break;
		case '30':
			return '交易失败';
			break;
		case '23':
			return '部分成功';
			break;
		default:
			break;
	}	
}

//银行卡号后4位
function bankEnd(str) {
	if(str) {
		return str.substr(str.length - 4);
	} else {
		return;
	}
}

//截取月份
function MonthData(m) {
	var o = m.substr(5, 2);
	return o.replace(/\b(0+)/gi, "");
}

//月份栏
function MonthHtml(mon) {
	var html = '<h6 class="cr_month">' + mon + '月</h6>';
	return html;
}

function recordSt(n) {
	var st,
		stateT;
	switch(n) {
		case '0':
			st = 'iconfont icon-jinxingzhong';
			stateT = '审核中';
			break;
		case '1':
			st = 'iconfont icon-jinxingzhong';
			stateT = '审核通过';
			break;
		case '12':
			st = 'iconfont icon-jinxingzhong';
			stateT = '提现中';
			break;
		case '2':
			st = 'iconfont icon-chenggong';
			stateT = '提现成功';
			break;
		case '3':
			st = 'iconfont icon-shibai';
			stateT = '提现失败';
			break;
		case '4':
			st = 'iconfont icon-shibai';
			stateT = '审核失败';
			break;
		default:
			break;
	}
	var html = '<p>';
	html += '<span class="' + st + '"></span>';
	html += '<em>' + stateT + '</em>';
	html += '</p>';

	return html;
}

//弹出等待框
function showLoad() {
	var html = '';
	html += '<div class="loadCircle"><img src="images/loading.png" /></div>';

	$('body').prepend(html);
	$('.loadCircle').fadeIn(500);
}

function closeLoad() {
	$('.loadCircle').remove();
}

function billTime(t) {
	return t.substr(11, 8);
}

function readyYet(t) {
	if(t + '' == '1') {
		return '<i class="bill_tag hide"></i>'
	} else {
		return '<i class="bill_tag"></i>'
	}
}

function codeType(n) {
	if(n == 'unicon') {
		return '银联二维码';
	} else if(n == 'test') {
		return '测试商户二维码';
	} else {
		return '支付宝微信二维码';
	}
}

//保留小数点后面两位
function floatNum(n) {
	n = n + '';
	var b = n.indexOf('.');

	if(b < 0) {
		return(n + '.00');
	} else {
		if(n.length - b == '2') {
			return(n + '0');
		} else {
			return n.substr(0, b + 3);
		}
	}
}

//银行卡logo
function bankLogo(n) {
	if(!!n && n.indexOf('-') > 0) {
		n = n.split('-')[0]
	}

	switch(n) {
		case '建设银行':
			return '1';
			break;
		case '邮政储蓄':
			return '2';
			break;
		case '农业银行':
			return '3';
			break;
		case '中国银行':
			return '4';
			break;
		case '浦发银行':
			return '5';
			break;
		case '中国农村信用社':
			return '6';
			break;
		case '工商银行':
			return '7';
			break;
		case '广发银行':
			return '8';
			break;
		case '中国民生银行':
			return '9';
			break;
		case '中国光大银行':
			return '10';
			break;
		case '兴业银行':
			return '11';
			break;
		case '渤海银行':
			return '12';
			break;
		case '招商银行':
			return '13';
			break;
		case '中信银行':
			return '14';
			break;
		case '长沙银行':
			return '15';
			break;
		case '交通银行':
			return '16';
			break;
		case '华夏银行':
			return '17';
			break;
		case '湖南省农村商业银行':
			return '18';
			break;
		case '广州银行':
			return '19';
			break;
		case '平安银行':
			return '20';
			break;
		default:
			return '21';
			break;
	}
}


//银行卡logotwo
function bankLogotwo(n) {
	if(!!n && n.indexOf('-') > 0) {
		n = n.split('-')[0]
	}

	switch(n) {
		case '建设银行':
			return 'images/bank/bankLogo1.png';
			break;
		case '邮政储蓄':
			return 'images/bank/bankLogo2.png';;
			break;
		case '农业银行':
			return 'images/bank/bankLogo3.png';;
			break;
		case '中国银行':
			return 'images/bank/bankLogo4.png';;
			break;
		case '浦发银行':
			return 'images/bank/bankLogo5.png';;
			break;
		case '中国农村信用社':
			return 'images/bank/bankLogo6.png';;
			break;
		case '工商银行':
			return 'images/bank/bankLogo7.png';;
			break;
		case '广发银行':
			return 'images/bank/bankLogo8.png';;
			break;
		case '中国民生银行':
			return 'images/bank/bankLogo9.png';;
			break;
		case '中国光大银行':
			return 'images/bank/bankLogo10.png';;
			break;
		case '兴业银行':
			return 'images/bank/bankLogo11.png';;
			break;
		case '渤海银行':
			return 'images/bank/bankLogo12.png';;
			break;
		case '招商银行':
			return 'images/bank/bankLogo13.png';;
			break;
		case '中信银行':
			return 'images/bank/bankLogo14.png';;
			break;
		case '长沙银行':
			return 'images/bank/bankLogo15.png';;
			break;
		case '交通银行':
			return 'images/bank/bankLogo16.png';;
			break;
		case '华夏银行':
			return 'images/bank/bankLogo17.png';;
			break;
		case '湖南省农村商业银行':
			return 'images/bank/bankLogo18.png';;
			break;
		case '广州银行':
			return 'images/bank/bankLogo19.png';;
			break;
		case '平安银行':
			return 'images/bank/bankLog20.png';;
			break;
		default:
			return '21';
			break;
	}
}

//充值方式
function rechargeMethod(n){
	switch (n){
		case 'PA-ET1':
			return 801;
			break;
		case 'PW-ET1':
			return 802;
			break;
		case 'PU-ET1':
			return 803;
			break;
		case 'PA-ZT1':
			return 804;
			break;	
		case 'PW-ZT1':
			return 805;
			break;	
		case 'PU-ZT1':
			return 806;
			break;
		case 'XA-ZT0':
			return 807;
			break;
		case 'XW-ZT0':
			return 808;
			break;
		case 'XA-ZT1':
			return 809;
			break;
		case 'XW-ZT1':
			return 810;
			break;
		case 'YE-ZT0':
			return 811;
			break;	
		case 'YQ-ZT1':
			return 812;
			break;
		case 'NA-ZT1': 
			return 813;
			break;
		case 'NW-ZT1':
			return 814;
			break;	 
		case 'LQ-ZT1':
			return 815;
			break;
		case 'MH-ZT0':
			return 816;
			break;	
		case 'MH-ZT1':
			return 817;
			break;
		case 'GA-ZT0':
			return 818;
			break;	 
		case 'GW-ZT0':
			return 819;
			break;
		case 'WA-ZT0':
			return 820;
			break;	
		case 'WA-ZT1': 
			return 821;
			break;			
		default:		
			break;
	}
}

//当Logo值为空或为其他任意假值时，定义为默认图片名;
function logoDefault(bankLogo) {
	if(bankLogo == 'null' || bankLogo == undefined || !bankLogo)
		return 'default';
	else
		return bankLogo
}

function initBank(n) {
	if(n == '0') {
		return 'selected';
	} else {
		return '';
	}
}

function pwd6(t) {
	var b = /^\d{6}$/;
	if(!b.test(t)) {
		return false
	} else {
		return true
	}
};

function bankType(n) {
	if(n.length == '19') {
		return '储蓄卡';
	} else {
		return '信用卡';
	}
}

function cStateType(n) {
	switch(n) {
		case '0':
			return '等待付款';
			break;
		case '1':
			return '付款成功';
			break;
		case '2':
			return '付款失败';
			break;
		default:
			break;
	}
}

function notNull(n) {
	var m = n + '';
	return(m == 'null') ? '未知商户' : n;
}

//店员列表公司类
function employCom(t, m) {
	var html = '';
	html += '<div class="empm_tit cl">';
	html += '<span>' + m + '人</span>';
	html += '<h4>' + t + '</h4>';
	html += '</div>';

	return html;
}

function secondStatus(n, t) {
	var m = n.length;
	if(t == 'T0') {
		if(m == 5) {
			return '秒到成功';
		} else if(m == 1) {
			return '秒到失败';
		} else {
			return '部分成功';
		}
	} else {
		if(m == 5) {
			return '到账成功';
		} else if(m == 1) {
			return '到账失败';
		} else {
			return '部分成功';
		}
	}
}

function secondStatus2(n, t) {
	if(t == 'T0') {
		if(n == '00') {
			return '秒到成功';
		} else {
			return '秒到失败';
		}
	} else {
		if(n == '00') {
			return '到账成功';
		} else {
			return '到账失败';
		}
	}
}

function secChannel(m) {
	switch(m) {
		case '40T0':
			return '支付宝秒到';
			break;
		case '41T0':
			return '微信秒到';
			break;
		default:
			break;
	}
}

function secType(t) {
	if(t == 'T0') {
		return '秒到T0';
	} else {
		return 'T+1';
	}
}

var timer = null;

function timeOut(obj) {
	timer = setTimeout(function() {
		if($(obj).html() == '' && $('.loadMore').text() != '暂无数据') {
			plus.nativeUI.closeWaiting();
			mui.toast('加载超时');
		}
	}, 20000);
}

var timer8 = null;

function timeOut8() {
	timer8 = setTimeout(function() {
		plus.nativeUI.closeWaiting();
		mui.toast('加载超时');
	}, 12000);
}

var judge,
	yt = false;
var loadH = 50;
var slide = function(obj, callback) {
	var winH = $(window).height();
	var winW = $(window).width();
	var startY,
		endY,
		offsetY,
		isLock = false, //是否锁定整个操作
		isCanDo = false, //是否移动滑块
		isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		hasTouch = 'ontouchstart' in window && !isTouchPad;

	//将对象转换为jquery的对象
	obj = $(obj);

	var objParent = obj.parent();

	/*操作方法*/
	var fn = {
		//移动容器
		translateY: function(diff) {
			obj.css({
				"-webkit-transform": "translate3d(0," + diff + "px,0)",
				"transform": "translate3d(0," + diff + "px,0)"
			});
			$('.slideDown').innerHTML = '下拉可刷新';
		},
		//设置效果时间
		setTranslition: function(time) {
			obj.css({
				"-webkit-transition": "all " + time + "s linear",
				"transition": "all " + time + "s linear"
			});
		},
		//返回到初始位置
		back: function() {
			fn.translateY(0);
			//标识操作完成
			isLock = false;
		}
	};

	//滑动开始
	obj.bind("touchstart", function(e) {
		if(objParent.scrollTop() <= 0 && !isLock) {
			var even = typeof event == "undefined" ? e : event;
			//标识操作进行中
			isLock = true;
			isCanDo = true;
			offsetY = 0;
			startTime = new Date();
			//even.preventDefault();

			//保存当前鼠标Y坐标
			startY = hasTouch ? even.touches[0].pageY : even.pageY;
			//消除滑块动画时间
			fn.setTranslition(0);
		}
	});

	//滑动中
	obj.bind("touchmove", function(e) {
		if(objParent.scrollTop() <= 0 && isCanDo) {
			var even = typeof event == "undefined" ? e : event;

			//保存当前鼠标Y坐标
			endY = hasTouch ? even.touches[0].pageY : even.pageY;

			offsetY = endY - startY;

			if(offsetY > 0) {
				even.preventDefault();
				//消除滑块动画时间
				fn.setTranslition(0);
				//移动滑块
				if(offsetY < loadH) {
					fn.translateY(offsetY);
					$('.slideDown').text('下拉可刷新')
				} else if(offsetY > loadH && offsetY < loadH * 2) {
					fn.translateY(loadH + (offsetY - loadH) * 0.5);
					$('.slideDown').text('松开以刷新');
				} else {
					fn.translateY(loadH + loadH * 0.5 + (offsetY - loadH * 2) * 0.2)
					$('.slideDown').text('松开以刷新');
				}

				if((startY + offsetY + 8) > winH) {
					//console.log('432');
					obj.ontouchend();
					obj.removeAttr("touchend");
				}
			} else {
				isCanDo = false;
				fn.back();
				return;
			}

		}
	});

	obj.ontouchend = function() {
		if(isCanDo) {
			//console.log('超出边界啦');
			isCanDo = false;
			//判断滑动距离是否大于等于指定值
			if(offsetY > 50) {
				//设置滑块回弹时间
				fn.setTranslition(0.2);
				//保留提示部分
				fn.translateY(50);

				$('.slideDown').text('正在刷新中...');
				//执行回调函数
				if(typeof callback == "function") {
					//callback.call(fn, e);
					//console.log(pId);
					plus.webview.getWebviewById(pId).evalJS('billRefresh()');
					var t = setTimeout(function() {
						//that.back.call();
						fn.translateY(0);
						isLock = false; //标识操作完成
						$('.slideDown').text('下拉可刷新');
						clearTimeout(t);
					}, 500);
				}
			} else {
				//返回初始状态
				fn.back();
			}
		}
	}

	//滑动结束
	obj.bind("touchend", function(e) {
		if(isCanDo) {
			isCanDo = false;
			//判断滑动距离是否大于等于指定值
			if(offsetY > 50) {
				//设置滑块回弹时间，
				fn.setTranslition(0.2);
				//保留提示部分
				fn.translateY(50);

				$('.slideDown').text('正在刷新中...');
				//执行回调函数
				if(typeof callback == "function") {
					callback.call(fn, e);
				}
			} else {
				//返回初始状态
				fn.back();
			}
		}
	});

}

//ignore for the moment
var callbackF = function(e) {
	var that = this;

	plus.webview.getWebviewById(pId).evalJS('billRefresh()');
	var timer = setTimeout(function() {
		that.back.call();
		$('.slideDown').text('下拉可刷新');
		clearTimeout(timer);
	}, 500);
}

/* 参数列表
 * url 请求的地址后缀（必填）
 * params 请求的参数（必填：如果没有参数，则传个空对象）
 * onSuccess 请求成功的回调方法（选填）
 * noData 请求成功但无数据的回调方法（选填）
 * retry 请求自动重试的次数（选填）
 * describe 请求的描述，用来提示错误信息（选填）
 */
function bpAjax(url, params, onSuccess, noData, retry, describe) {
	plus.nativeUI.showWaiting();
	var address = arguments[0];
	var url = USERINFO.DL_HOST + arguments[0];
	var onSuccess = arguments[2] ? arguments[2] : function() {};
	var noData = arguments[3] ? arguments[3] : function() {};
	var retry = arguments[4] ? arguments[4] : 3;
	var params = params;
	console.log(describe + '参数' + JSON.stringify(params));
	if(!params.sign) params.sign = getRSA(params, describe) //当sign为空时，自动给键值排序生成sign
	mui.ajax(url, {
		data: params,
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			plus.nativeUI.closeWaiting();
			console.log(describe + '——' + data);
//			console.log(describe + '798' + JSON.stringify(data));
			var d = JSON.parse(data);
			if(d.msg == '1') {
				onSuccess(d);
			} else if(d.msg == '3') {
				//localStorage.clear();
				mui.toast(d.info);
				onError('INVALID_TOKEN');
			} else if(d.msg == '99'){
				mui.toast(d.info);
			}else {
				noData(d);
			}
		},
		error: function(xhr, type, errorThrown) {
			plus.nativeUI.closeWaiting();
			console.log(describe + '__' + errorThrown);
			retry--;
			if(retry > 0) return bpAjax(address, params, onSuccess, noData, retry, describe);
			onError('FAILED_NETWORK', describe);
		}
	});
}

/* 参数列表
 * errcode 错误编码（必填）
 * 可选值：'FAILED_NETWORK' 重连多次不成功网络不佳
 * 可选值：'INVALID_TOKEN' 无效的token
 */
function onError(errcode, describe) {
	switch(errcode) {
		case 'FAILED_NETWORK':
			mui.toast('当前网络不佳');
			break;
		case 'INVALID_TOKEN':
			openWV('login.html');
			break;
		default:
			console.log(describe + '——' + errcode);
	}
}

/* 打开窗口参数列表
 * viewId 窗口的ID（必填）
 * obj 类型为Object 包含两键值对（close:需要关闭的页面，evalJs:需要加载方法的页面）
 * 逻辑：当窗口存在时，show出窗口，否则打开
 */
function openWV(viewId, extras) {
	var loginView = plus.webview.getWebviewById(viewId);
	if(loginView) {
		plus.webview.show(loginView, 300);
	} else {
		mui.openWindow({
			id: viewId,
			url: viewId,		
			waiting: {
				autoShow: true,
				options: {
					background: 'rgba(100,100,100,0.8)'
				}
			},
			extras: extras
		});
//		console.log('跳过打开页面');
//		plus.webview.getWebviewById(viewId).show('slide-in-right');
		
	}
}

/* 调用其他窗口里面的方法  参数列表
 * viewId: 窗口ID
 * fnName: 【数组】要运行的方法名
 */
function evalId(viewId, fnName) {
	if(plus.webview.getWebviewById(viewId)) {
		for(var i = 0; i < fnName.length; i++) {
			var n = fnName[i] + '()';
			plus.webview.getWebviewById(viewId).evalJS(n);
		}
	}
}

/* 关闭窗口方法  参数列表
 * viewId: 【数组】窗口ID
 */
function closeId(viewId) {
	for(var i = 0; i < viewId.length; i++) {
		if(plus.webview.getWebviewById(viewId[i])) {
			plus.webview.getWebviewById(viewId[i]).close();
		}
	}
}

/* 需要RSA加密的对象，按对象键值排序加密 参数列表
 * o参数为对象，
 * 逻辑：需要RSA加密的对象，按对象键值排序加密，并返回
 * DL_RED_PACKET 字符串是跟后台协定的
 */
function getRSA(o, describe) {
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(USERINFO.DL_PUBLIC_KEY); //设置公有key
	var keys = Object.keys(o).sort();
	if(arguments.length <= 0) return false;
	var str = '';
	for(var i = 0; i < keys.length; i++) {
		if(keys[i] != 'sign') {
			str += o[keys[i]];
		}
	}
	var sign = '';
	str = encodeURI(str + 'DL_RED_PACKET');
	for(var i = 0; i <= parseInt(str.length / 117); i++) {
		sign += encrypt.encrypt(str.substr(i * 117, 117))
	}
	return sign;
}

/* 获取userInfo数据 参数列表
 * name 参数为要获取的userInfo下的某个字段名，
 * 逻辑：当name为空时，返回整个userInfo
 */
function getUserInfo(name) {
	if(name == 'token') {
		var token = JSON.parse(localStorage.getItem('DL_TOKEN'));
//		var token = 'f4ffd15042edb84fe5a75ededce53a24';
		return token;
	} else {
		var userInfo = JSON.parse(localStorage.getItem('DL_USERINFO'));
		if(userInfo){
			if(!name){
				return userInfo;
			}else if(name in userInfo){
				return userInfo[name];
			}else{
				return '';
			}
		}else{
			return '';
		}
	}
}

/* 更新userInfo数据 参数列表
 * d 参数为要更新的userInfo下的某些字段，此参数为Obj
 * 逻辑：遍历d，把d的键值赋值给userinfo，并重新存储
 */
function upDataInfo(d) {
	var userInfo = JSON.parse(localStorage.getItem('DL_USERINFO'));
	for(item in d) {
		//if(userInfo[item] && d[item]){
		userInfo[item] = d[item];
		//}
	}
	localStorage.setItem('DL_USERINFO', JSON.stringify(userInfo));
}
