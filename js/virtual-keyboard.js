/**
 * 虚拟键盘插件
 * varstion 1.0.0
 * by Allen-Fei
 * tipefi@126.com
 * 基于zepto或jq、mui------仅限手机端
 */
!function(window, undefined){
	var $body = document.getElementsByTagName('body');
	var keyHtml = '<div class="epay-input" style="display: none;" id="epay">'
		keyHtml += '<ul>'
		keyHtml += '<li class="epay-bts" data-id="1"><span class="epay-num">1</span></li>'
		keyHtml += '<li class="epay-bts" data-id="2"><span class="epay-num">2</span></li>'
		keyHtml += '<li class="epay-bts" data-id="3"><span class="epay-num">3</span></li>'
		keyHtml += '<li class="epay-bts" data-id="4"><span class="epay-num">4</span></li>'
		keyHtml += '<li class="epay-bts" data-id="5"><span class="epay-num">5</span></li>'
		keyHtml += '<li class="epay-bts" data-id="6"><span class="epay-num">6</span></li>'
		keyHtml += '<li class="epay-bts" data-id="7"><span class="epay-num">7</span></li>'
		keyHtml += '<li class="epay-bts" data-id="8"><span class="epay-num">8</span></li>'
		keyHtml += '<li class="epay-bts" data-id="9"><span class="epay-num">9</span></li>'
		keyHtml += '<li class="epay-bts" data-id="."><span class="epay-num">.</span></li>'
		keyHtml += '<li class="epay-bts" data-id="0"><span class="epay-num">0</span></li>'
		keyHtml += '<li class="epay-emp" id="epay-delete"><img src="images/key_delete.png" /></li>'
		keyHtml += '</ul>'
		keyHtml += '</div>'
	
	var Keyboard = window.Keyboard = function(o){
		$("body").append(keyHtml);
		this.add = o.add;
		this.del = o.del;
		this.addEvent();
	}
	
	Keyboard.prototype.show = function(type){
		document.getElementById('epay').style.display = 'block';
		this.type = type;
	}
	
	Keyboard.prototype.hide = function(){
		document.getElementById('epay').style.display = 'none';
	}
	
	Keyboard.prototype.addEvent = function(o){
		var _this = this;
		
		$('body').on('touchstart', '.epay-bts', function() {
			this.style.backgroundColor = '#bfbfbf';
		})
	
		$('body').on('touchmove', '.epay-bts', function() {
			this.style.backgroundColor = '#ffffff';
		})
		
		$('body').on('touchend', '.epay-bts', function() {
			this.style.backgroundColor = '#ffffff';
			_this.add(this.getAttribute('data-id'), _this.type);
		})
		
		//删除按钮
		$('body').on('touchstart', '#epay-delete', function() {
			this.style.backgroundColor = '#bfbfbf';
		})
	
		$('body').on('touchmove', '#epay-delete', function() {
			this.style.backgroundColor = 'none';
		})
	
		$('body').on('touchend', '#epay-delete', function() {
			this.style.backgroundColor = '#e0e0e0';
			_this.del(this.getAttribute('data-id'), _this.type);
		});
	}
}(window)
