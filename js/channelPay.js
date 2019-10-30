!function(window, undefined){
	var wachannel = null;
	var callback = null;
	var ChannelPay = window.ChannelPay = function(option){
		this.el = option.el || "";
		this.cl = option.cl || "";
		this.isAliPayLink = false; // 判断是否是支付宝链接支付
		this.aliPayData = {}; // 支付宝链接支付查询时用的数据
		this.fillHtml();
		callback = option.aliwxFn || function(){} // 支付宝微信支付成功后回调函数
	}
	
	// 填充支付类型到页面
	ChannelPay.prototype.fillHtml = function(){
		var that = this;
		var payName;
		if(plus){
			plus.payment.getChannels(function(channel) {
				that.channel = channel;
				var $ul = $('<ul id="selcl">');
				var isAli = true, iswx = true;
				for(var i = 0; i < channel.length; i++){
					if(channel[i].id == "alipay"){
						isAli = channel[i].serviceReady;
					}else if(channel[i].id == "wxpay"){
						iswx = channel[i].serviceReady;
					}
				}
				
				for(var i = 0; i < that.cl.length; i++){
					payName = that.cl[i].userCanKnowName ? that.cl[i].userCanKnowName : that.getUnionpayText(that.cl[i].payway.substr(1,1));
					if(that.cl[i].msg == '1'){
						var payHtml = '<li  data-info ="' + that.cl[i].info + '" data-msg ="' + that.cl[i].msg + '">';
					}
					else if(that.cl[i].msg == '0'){
						var payHtml = '<li class="not-available"  data-info ="' + that.cl[i].info + '" data-msg ="' + that.cl[i].msg + '">';
					} else if(that.cl[i].msg == '2'){
						continue;
					}
					if(that.cl[i].msg == '1') {
						if(that.cl[i].payway.substr(1,1) == "U" || (that.cl[i].payway.substr(1,1) == "A" && that.getUnionpayMsg("U") != '1' ) || (that.cl[i].payway.substr(1,1) == "W" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1')|| (that.cl[i].payway.substr(1,1) == "Q" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1') || (that.cl[i].payway.substr(1,1) == "E" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1' && that.getUnionpayMsg("Q") != '1')  || (that.cl[i].payway.substr(1,1) == "H" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1' && that.getUnionpayMsg("Q") != '1' && that.getUnionpayMsg("E") != '1')  || (that.cl[i].payway.substr(1,1) == "E" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1' && that.getUnionpayMsg("Q") != '1')  || (that.cl[i].payway.substr(1,1) == "O" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1' && that.getUnionpayMsg("Q") != '1' && that.getUnionpayMsg("E") != '1'  && that.getUnionpayMsg("H") != '1')        || (that.cl[i].payway.substr(1,1) == "F" && that.getUnionpayMsg("U") != '1' && that.getUnionpayMsg("A") != '1' && that.getUnionpayMsg("W") != '1' && that.getUnionpayMsg("Q") != '1' && that.getUnionpayMsg("E") != '1'  && that.getUnionpayMsg("H") != '1'  && that.getUnionpayMsg("O") != '1') ) {
							payHtml += '<div class = "check_bigbox"><span class="check_box cur" data-type="' + that.cl[i].payway + '"  data-banktype="' + that.cl[i].paybanktype + '"></span></div>';
							that.payType = that.cl[i].payway;
							that.paybanktype = that.cl[i].paybanktype ;
							console.log('that.paybanktype'+that.paybanktype);
						} else {
							payHtml += '<div class = "check_bigbox"><span class="check_box " data-type="' + that.cl[i].payway + '"  data-banktype="' + that.cl[i].paybanktype + '"></span></div>';
						}
					}
					else {
						payHtml += '<div class = "check_bigbox"><span class="check_box" data-type="' + that.cl[i].payway + '"></span></div>';
					}
					payHtml += '<p class="check_zhi">';
					if(that.cl[i].payway.substr(1,1) == "A" && that.cl[i].msg !== "2"){
						payHtml += '<span class="check_zhiimg"><i class="iconfont icon-zhifubao"></i></span>';
						payHtml += '<span class="check_zhico">  '+ payName +' </span>';
					}else if(that.cl[i].payway.substr(1,1) == "W" && that.cl[i].msg !== "2"){
						payHtml += '<img src="images/wei.png" class="check_zhiimg" />';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					}else if(that.cl[i].payway.substr(1,1) == "U" && that.cl[i].msg !== "2"){
						payHtml += '<img src="images/lian.png" class="check_zhiimg" />';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					}else if(that.cl[i].payway .substr(1,1) == "E"  && that.cl[i].msg !== "2"){
						payHtml += '<span class="check_zhiimgtwo"><i class="iconfont icon-footer-commission"></i></span>';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					}else if(that.cl[i].payway .substr(1,1) == "H"  && that.cl[i].msg !== "2"){
						payHtml += '<span class="check_zhiimgfour"><i class="iconfont icon-hebao"></i></span>';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					}else if(that.cl[i].payway .substr(1,1) == "O"  && that.cl[i].msg !== "2"){
						payHtml += '<img src="images/Qtwo.png" class="check_zhiimg" />';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					} else if(that.cl[i].payway .substr(1,1) == "F"  && that.cl[i].msg !== "2"){
						payHtml += '<span class="check_zhiimgfour"><i class="iconfont icon-tag"></i></span>';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';						
					}else if(that.cl[i].payway .substr(1,1) == "Q"  && that.cl[i].msg !== "2"){
						payHtml += '<span class="check_zhiimgthree"><i class="iconfont icon-kuaijiezhifu-01"></i></span>';
						payHtml += '<span class="check_zhico">'+ payName +'</span><a data-href="bank_quick.html" class="support-Bank">支持银行</a>';
					} else{
						payHtml += '<span class="check_zhiimgfour"><i class="iconfont icon-jiaoyi1"></i></span>';
						payHtml += '<span class="check_zhico">'+ payName +'</span>';
					}
					
					
					payHtml += '</p>';
					payHtml += '</li>';
					
					if(that.cl[i].payway == "alipay" && !!isAli){
						$ul.append(payHtml);
					}
					
					if(that.cl[i].payway == "wxpay" && !!iswx){
						$ul.append(payHtml);
					}
					
					if(that.cl[i].payway != "wxpay" && that.cl[i].payway != "alipay"){
						$ul.append(payHtml);
					}
				}
				
				$(that.el).html($ul);
				
			})
			
			//选择支付通道
			$(that.el).on("tap", ".check_bigbox", function() {
				that.selectPay($(this).parents("li"));
				
			})
		}
	}
	
	// 选择支付类型
	ChannelPay.prototype.selectPay = function($this){
		var newtype = $this.find(".check_box").data("type");
		var newbanktype = $this.find(".check_box").data("banktype");
		var info = $this.data("info");
		var msgs =  $this.data("msg");
		if(msgs == "0"){	
			mui.alert(info);
		}else {
			this.payType = newtype;
			this.paybanktype = newbanktype;
			$this.find(".check_box").addClass("cur");
			$this.siblings().find(".check_box").removeClass("cur");
		}
		
	}
	
	// 提交支付返回通道类型0-支付宝、1-微信、2-银联、2T0-钱包、2T1-易联快捷,A-支付宝，W-微信，U-银联，E-钱包，Q-快捷，H-快捷，O-QQ。
	ChannelPay.prototype.submitPay = function(){
		console.log('this.payType'+this.payType);
		var payTypes = this.payType.substr(1,1);
		if(payTypes == 'U') return this.payType; 
		else if(payTypes == 'A') {
			this.isAliPayLink = true;
			wachannel = this.getPay('alipay');
			return this.payType;
		} else if(payTypes == 'W') {
			wachannel = this.getPay('wxpay');
			return this.payType;
		} else if(payTypes == 'E') return this.payType;
		  else if(payTypes == 'Q') return this.payType;
		  else if(payTypes == 'H') return this.payType; 
		  else if(payTypes == 'O') return this.payType;
		  else if(payTypes == 'F') return this.payType;
		  else{
			mui.toast('请选择支付方式');
			return false;
		}
	}
	
	// 设置订单信息，根据不同的订单类型跳转0-支付宝、1-微信、2-银联、2T0-钱包、2T1-易联快捷,A-支付宝，W-微信，U-银联，E-钱包，Q-快捷，H-快捷，O-QQ。
	ChannelPay.prototype.setOrder = function(d, amount, types, qrCode, unionOrdId){
//		console.log('this.paybanktype'+ this.paybanktype);
		var selfPaytype = types.substr(1,1);
		if(selfPaytype == 'A') {
			
			if(d.data.payType == '1') {
//				this.isAliPayLink = true;
//				this.aliPayData.reqNo = d.data.reqNo;
//				this.aliPayData.b01id = d.data.b01id;
//				this.aliPayData.token = getUserInfo('token');
//				this.aliPayData.username = getUserInfo("username");
				payFn.aliLink(d.data);
			} else if(d.data.payType == '0') {
				payFn.aliwxFn(d.data.data);
			}
		}else if(selfPaytype == 'O'){
			payFn.aliLink(d.data);
		}else if(selfPaytype == 'W') {
			payFn.aliLink(d.data);
		}else if(selfPaytype == 'F'){
			payFn.hQuick(d.data);
		}
		else if(selfPaytype == 'U' || selfPaytype == 'E' || selfPaytype == 'Q') {
//			payFn.Unionpay(d, d.payType, amount, qrCode, unionOrdId);
			if(this.paybanktype  == '2'){
				payFn.Quick(d, types, amount, qrCode, unionOrdId);
			}else if(this.paybanktype  == '1'){
				payFn.Unionpay(d, types, amount, qrCode, unionOrdId);
			}else{
				payFn.Unionpay(d, types, amount, qrCode, unionOrdId);
			}
		}else {
			mui.toast('暂不支持此支付方式');
		}
	}
	
	// 获取微信支付宝的支付通道
	ChannelPay.prototype.getPay = function(payName) {
		for(var i = 0; i < this.channel.length; i++) {
			if(this.channel[i].id == payName) {
				return this.channel[i];
			}
		}
	}
	
	// 查询支付宝链接支付的状态
	ChannelPay.prototype.queryAliPay = function() {
		var that = this;
		if(that.isAliPayLink){
			that.aliPayData.sign = ''
			bpAjax('/app/javaapi/getWxTradeInfo', that.aliPayData, function(d) {
				that.isAliPayLink = false;
				if(d.data.ddStatus == '1') {
					callback();
				} else if(d.data.ddStatus == '0') {
					mui.alert('支付失败');
				} else{
					mui.alert('支付失败');
				}
			}, function(d) {
				mui.toast(d.info)
			}, 3, '查询支付结果')
		}
	}
	
	// 获取银联支付的msg值，看是否开通此通道
	ChannelPay.prototype.getUnionpayMsg = function(payways){
		for(var i = 0; i < this.cl.length; i++){
			if(this.cl[i].payway.substr(1,1) == payways){
				return this.cl[i].msg;
			}
		}
	}
	
	//通过后台传过来的通道去绑定相对应的文字
	ChannelPay.prototype.getUnionpayText = function(n){
		if(n == "A") return '支付宝';
		if(n == "W") return '微信';
		if(n == "U") return '银联';
		if(n == "H") return '和包';
		if(n == "E") return '钱包支付';
		if(n == "Q") return '快捷支付';
		if(n == "O") return 'QQ支付';	
		if(n == "F") return 'H5快捷支付';
	}
	
	// 前往支付的方法（包括支付宝微信APP、支付宝链接、银联-钱包-易联支付）
	var payFn = {
		
		// 支付宝链接支付
//		aliLink: function(data) {
//			var url = '';
//			if(plus.os.name == "iOS") {
//				url = 'alipay://platformapi/startapp?appId=20000067&&url=' + data.data;
//			} else if(plus.os.name == "Android") {
//				url = 'alipays://platformapi/startapp?appId=20000067&&showTitleBar=YES&&showToolBar=NO&&showLoading=YES&&pullRefresh=YES&&url=' + data.data;
//			}
//			plus.runtime.openURL(url, "com.zhifubao.app.mall");
//		},
		
		aliLink: function(data){
//			var url = '';
//			if(plus.os.name == "iOS") {
//				if(~data.data.indexOf("[ALL]"))
//					url = data.data.replace("[ALL]","");
//				else
//					url = 'alipay://platformapi/startapp?appId=20000067&&url=' + data.data;
//			} else if(plus.os.name == "Android") {
//				if(~data.data.indexOf("[ALL]"))
//					url = data.data.replace("[ALL]","");
//				else
//					url = 'alipays://platformapi/startapp?appId=20000067&&showTitleBar=YES&&showToolBar=NO&&showLoading=YES&&pullRefresh=YES&&url=' + data.data;
//			}
			
			var url = data.data.replace("[ALL]","");
			console.log('222');
			plus.runtime.openURL(url, "com.zhifubao.app.mall");
//			document.addEventListener("resume", function() {
//				that.queryAliPay(); // TODO:此处无法使用this调用构造原型的其他方法
//			}, false);
	},

		//支付宝微信APP支付
		aliwxFn: function(data) {
			plus.payment.request(wachannel, data, function(e) {
				console.log('支付宝支付');
				callback();
			}, function(e) {
				mui.toast("支付失败！")
			});
		},
		
		hQuick: function(data){
			var url = '';
			if(~data.data.indexOf("[ALL]")){
				url = data.data.replace("[ALL]","");
				openWV('href_new.html', {pUrl:pId, hre:url, hPriceo:'H5快捷支付'});
			}else{
				url = data.data;
				openWV('href_new.html', {pUrl:pId, hre:url, hPriceo:'H5快捷支付'});				
			}
		},
		
		//银联-钱包-易联支付
		Unionpay: function(d, type, amount, qrCode, unionOrdId) {			
			if(d.msg == 1){
				var id = 'pay_password.html';
				mui.openWindow({
					id: id,
					url: id,
					waiting: {
						autoShow: true,
						options: {   
							background: 'rgba(100,100,100,0.8)'
						}
					},
					extras: {
						pUrl: pId,
						data: d.data,
						type: type,
						pPrice:amount,
						pCode:qrCode,
						unionOrdId: unionOrdId
					}
				});
			}
		},
         Quick: function(d, type, amount, qrCode, unionOrdId) {
           if(d.msg == 1){
                mui.confirm('是否选择多卡支付','支付选择',['是','否'],function(e){
                    if(e.index == 0){
                        openWV('rec_recharge.html',{pUrl: pId,data: d.data,type: type,pPrice:amount,pCode:qrCode,unionOrdId: unionOrdId});
                    }else{
                        openWV('pay_password.html',{pUrl: pId,data: d.data,type: type,pPrice:amount,pCode:qrCode,unionOrdId: unionOrdId});
                    }
                })
            }
         },

	}
}(window)
